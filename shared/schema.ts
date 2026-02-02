export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  imageUrl: string | null;
  videoUrl?: string | null;
  status: string;
  publishedAt: string | null;
  audience: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  caseStudyYear?: string | null;
  caseStudyRole?: string | null;
  caseStudyLogo?: string | null;
}

export interface Series {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  accentColor: string | null;
  isVisible: boolean;
}

export interface SeriesPost {
  seriesId: number;
  postId: number;
  position: number;
}

export interface BlogPostWithSeries extends BlogPost {
  series?: {
    id: number;
    title: string;
    slug: string;
    position: number;
    totalPosts: number;
  };
}

export interface SeriesWithPosts extends Series {
  posts: BlogPost[];
}
