import { 
  users, blogPosts, series, seriesPosts,
  type User, type InsertUser, 
  type BlogPost, type InsertBlogPost,
  type Series, type InsertSeries, type SeriesWithPosts, type BlogPostWithSeries,
  type InsertSeriesPost
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and, lte, or } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostWithSeries(id: number): Promise<BlogPostWithSeries | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  getAllSeries(): Promise<Series[]>;
  getSeriesWithPosts(id: number): Promise<SeriesWithPosts | undefined>;
  getSeriesBySlug(slug: string): Promise<SeriesWithPosts | undefined>;
  getSeriesWithPostsBySlug(slug: string): Promise<SeriesWithPosts | undefined>;
  createSeries(data: InsertSeries): Promise<Series>;
  updateSeries(id: number, data: Partial<InsertSeries>): Promise<Series | undefined>;
  deleteSeries(id: number): Promise<boolean>;
  addPostToSeries(seriesId: number, postId: number, position?: number): Promise<void>;
  removePostFromSeries(seriesId: number, postId: number): Promise<void>;
  reorderSeriesPost(seriesId: number, postId: number, newPosition: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    const now = new Date();
    return await db.select().from(blogPosts)
      .where(
        and(
          eq(blogPosts.status, "published"),
          or(
            lte(blogPosts.publishedAt, now),
            eq(blogPosts.publishedAt, null as any)
          )
        )
      )
      .orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostWithSeries(id: number): Promise<BlogPostWithSeries | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    if (!post) return undefined;

    const [seriesLink] = await db.select().from(seriesPosts).where(eq(seriesPosts.postId, id));
    
    if (!seriesLink) {
      return post;
    }

    const [seriesData] = await db.select().from(series).where(eq(series.id, seriesLink.seriesId));
    const allSeriesPosts = await db.select().from(seriesPosts)
      .where(eq(seriesPosts.seriesId, seriesLink.seriesId))
      .orderBy(asc(seriesPosts.position));

    return {
      ...post,
      series: {
        id: seriesData.id,
        title: seriesData.title,
        slug: seriesData.slug,
        position: seriesLink.position,
        totalPosts: allSeriesPosts.length,
      }
    };
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getAllSeries(): Promise<Series[]> {
    return await db.select().from(series)
      .where(eq(series.isVisible, 1))
      .orderBy(desc(series.createdAt));
  }

  async getSeriesWithPosts(id: number): Promise<SeriesWithPosts | undefined> {
    const [seriesData] = await db.select().from(series).where(eq(series.id, id));
    if (!seriesData) return undefined;

    const links = await db.select().from(seriesPosts)
      .where(eq(seriesPosts.seriesId, id))
      .orderBy(asc(seriesPosts.position));

    const posts: BlogPost[] = [];
    for (const link of links) {
      const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, link.postId));
      if (post) posts.push(post);
    }

    return { ...seriesData, posts };
  }

  async getSeriesBySlug(slug: string): Promise<SeriesWithPosts | undefined> {
    const [seriesData] = await db.select().from(series).where(eq(series.slug, slug));
    if (!seriesData) return undefined;

    const links = await db.select().from(seriesPosts)
      .where(eq(seriesPosts.seriesId, seriesData.id))
      .orderBy(asc(seriesPosts.position));

    const posts: BlogPost[] = [];
    for (const link of links) {
      const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, link.postId));
      if (post) posts.push(post);
    }

    return { ...seriesData, posts };
  }

  async getSeriesWithPostsBySlug(slug: string): Promise<SeriesWithPosts | undefined> {
    return this.getSeriesBySlug(slug);
  }

  async createSeries(data: InsertSeries): Promise<Series> {
    const [newSeries] = await db.insert(series).values(data).returning();
    return newSeries;
  }

  async updateSeries(id: number, data: Partial<InsertSeries>): Promise<Series | undefined> {
    const [updated] = await db
      .update(series)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(series.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteSeries(id: number): Promise<boolean> {
    await db.delete(seriesPosts).where(eq(seriesPosts.seriesId, id));
    const result = await db.delete(series).where(eq(series.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async addPostToSeries(seriesId: number, postId: number, position?: number): Promise<void> {
    const existing = await db.select().from(seriesPosts)
      .where(eq(seriesPosts.seriesId, seriesId));
    
    const maxPosition = existing.reduce((max, p) => Math.max(max, p.position), -1);
    const newPosition = position ?? maxPosition + 1;

    await db.insert(seriesPosts).values({
      seriesId,
      postId,
      position: newPosition,
    });
  }

  async removePostFromSeries(seriesId: number, postId: number): Promise<void> {
    await db.delete(seriesPosts)
      .where(and(eq(seriesPosts.seriesId, seriesId), eq(seriesPosts.postId, postId)));
  }

  async reorderSeriesPost(seriesId: number, postId: number, newPosition: number): Promise<void> {
    await db.update(seriesPosts)
      .set({ position: newPosition })
      .where(eq(seriesPosts.postId, postId));
  }
}

export const storage = new DatabaseStorage();
