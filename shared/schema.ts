import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Series - groups of related blog posts (like Instagram story collections)
export const series = pgTable("series", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  coverImageUrl: text("cover_image_url"),
  accentColor: varchar("accent_color", { length: 7 }), // hex color like #ec4899
  isVisible: integer("is_visible").default(1).notNull(), // 1 = visible, 0 = hidden
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSeriesSchema = createInsertSchema(series).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertSeries = z.infer<typeof insertSeriesSchema>;
export type Series = typeof series.$inferSelect;

// Blog Posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  date: varchar("date", { length: 10 }).notNull(),
  tags: text("tags").array().notNull(),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  status: varchar("status", { length: 20 }).default("draft").notNull(), // draft, published
  publishedAt: timestamp("published_at"), // null = not scheduled, future = scheduled, past = published
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Junction table for series and posts (with ordering)
export const seriesPosts = pgTable("series_posts", {
  id: serial("id").primaryKey(),
  seriesId: integer("series_id").notNull(),
  postId: integer("post_id").notNull(),
  position: integer("position").notNull().default(0), // Order within the series
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSeriesPostSchema = createInsertSchema(seriesPosts).omit({
  id: true,
  createdAt: true,
});

export type InsertSeriesPost = z.infer<typeof insertSeriesPostSchema>;
export type SeriesPost = typeof seriesPosts.$inferSelect;

// Extended type for series with its posts
export type SeriesWithPosts = Series & {
  posts: BlogPost[];
};

// Extended type for blog post with series info
export type BlogPostWithSeries = BlogPost & {
  series?: {
    id: number;
    title: string;
    slug: string;
    position: number;
    totalPosts: number;
  };
};
