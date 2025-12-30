import { parse } from 'yaml';
import type { BlogPost, Series, SeriesPost, BlogPostWithSeries, SeriesWithPosts } from '@shared/schema';

export type { BlogPost, Series, SeriesPost, BlogPostWithSeries, SeriesWithPosts };

interface RawBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  image_url: string | null;
  video_url?: string | null;
  status: string;
  published_at: string | null;
  content: string;
  audience: string;
}

interface RawSeries {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  accent_color: string | null;
  is_visible: boolean;
}

interface RawSeriesPost {
  series_id: number;
  post_id: number;
  position: number;
}

let postsCache: BlogPost[] | null = null;
let seriesCache: Series[] | null = null;
let seriesPostsCache: SeriesPost[] | null = null;

async function fetchYaml<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  return parse(text) as T;
}

async function fetchContent(path: string): Promise<string> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch content ${path}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

export async function loadBlogPosts(): Promise<BlogPost[]> {
  if (postsCache) return postsCache;
  
  const rawPosts = await fetchYaml<RawBlogPost[]>('/data/blog-posts/data.yaml');
  
  const posts = await Promise.all(rawPosts.map(async (post) => {
    const contentPath = `/data/${post.content}`;
    const content = await fetchContent(contentPath);
    
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content,
      date: post.date,
      tags: post.tags,
      imageUrl: post.image_url,
      videoUrl: post.video_url,
      status: post.status,
      publishedAt: post.published_at,
      audience: post.audience,
    };
  }));
  
  postsCache = posts;
  return posts;
}

export async function loadSeries(): Promise<Series[]> {
  if (seriesCache) return seriesCache;
  
  const rawSeries = await fetchYaml<RawSeries[]>('/data/series/data.yaml');
  
  seriesCache = rawSeries.map(s => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    description: s.description,
    coverImageUrl: s.cover_image_url,
    accentColor: s.accent_color,
    isVisible: s.is_visible,
  }));
  
  return seriesCache;
}

export async function loadSeriesPosts(): Promise<SeriesPost[]> {
  if (seriesPostsCache) return seriesPostsCache;
  
  const rawSeriesPosts = await fetchYaml<RawSeriesPost[]>('/data/series-posts/data.yaml');
  
  seriesPostsCache = rawSeriesPosts.map(sp => ({
    seriesId: sp.series_id,
    postId: sp.post_id,
    position: sp.position,
  }));
  
  return seriesPostsCache;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithSeries | null> {
  const posts = await loadBlogPosts();
  const post = posts.find(p => p.slug === slug);
  if (!post) return null;
  
  const seriesPosts = await loadSeriesPosts();
  const seriesList = await loadSeries();
  
  const seriesPost = seriesPosts.find(sp => sp.postId === post.id);
  if (!seriesPost) return post;
  
  const series = seriesList.find(s => s.id === seriesPost.seriesId);
  if (!series) return post;
  
  const totalPosts = seriesPosts.filter(sp => sp.seriesId === seriesPost.seriesId).length;
  
  return {
    ...post,
    series: {
      id: series.id,
      title: series.title,
      slug: series.slug,
      position: seriesPost.position,
      totalPosts,
    },
  };
}

export async function getBlogPostById(id: number): Promise<BlogPostWithSeries | null> {
  const posts = await loadBlogPosts();
  const post = posts.find(p => p.id === id);
  if (!post) return null;
  
  const seriesPosts = await loadSeriesPosts();
  const seriesList = await loadSeries();
  
  const seriesPost = seriesPosts.find(sp => sp.postId === post.id);
  if (!seriesPost) return post;
  
  const series = seriesList.find(s => s.id === seriesPost.seriesId);
  if (!series) return post;
  
  const totalPosts = seriesPosts.filter(sp => sp.seriesId === seriesPost.seriesId).length;
  
  return {
    ...post,
    series: {
      id: series.id,
      title: series.title,
      slug: series.slug,
      position: seriesPost.position,
      totalPosts,
    },
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = await loadBlogPosts();
  return posts.filter(p => p.status === 'published');
}

export async function getSeriesWithPosts(slug: string): Promise<SeriesWithPosts | null> {
  const seriesList = await loadSeries();
  const series = seriesList.find(s => s.slug === slug);
  if (!series) return null;
  
  const seriesPosts = await loadSeriesPosts();
  const posts = await loadBlogPosts();
  
  const seriesPostIds = seriesPosts
    .filter(sp => sp.seriesId === series.id)
    .sort((a, b) => a.position - b.position)
    .map(sp => sp.postId);
  
  const seriesPostsList = seriesPostIds
    .map(id => posts.find(p => p.id === id))
    .filter((p): p is BlogPost => p !== undefined);
  
  return {
    ...series,
    posts: seriesPostsList,
  };
}

export async function getAllSeries(): Promise<Series[]> {
  const series = await loadSeries();
  return series.filter(s => s.isVisible);
}

export async function getPostsInSeries(seriesId: number): Promise<BlogPost[]> {
  const seriesPosts = await loadSeriesPosts();
  const posts = await loadBlogPosts();
  
  const seriesPostIds = seriesPosts
    .filter(sp => sp.seriesId === seriesId)
    .sort((a, b) => a.position - b.position)
    .map(sp => sp.postId);
  
  return seriesPostIds
    .map(id => posts.find(p => p.id === id))
    .filter((p): p is BlogPost => p !== undefined);
}

export function clearCache(): void {
  postsCache = null;
  seriesCache = null;
  seriesPostsCache = null;
}
