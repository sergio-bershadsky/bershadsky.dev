import { db } from "./db";
import { blogPosts, series, seriesPosts } from "@shared/schema";
import { sql } from "drizzle-orm";

const blogPostsData = [
  {
    title: "Scaling Microservices in 2025",
    excerpt: "How to handle 1M+ requests without breaking the bank or your sanity.",
    content: `In the rapidly evolving landscape of distributed systems, the challenge isn't just building microservices—it's orchestrating them at scale without creating a maintenance nightmare. As we move into 2025, the old paradigms of manual scaling and static provisioning are dead.

Today, we're seeing a shift towards autonomous, event-driven architectures that react to system pressure in real-time. This article explores the architectural patterns that are defining the next generation of scalable platforms.

## The Implementation Strategy

Implementing this pattern requires a robust observability stack. You cannot scale what you cannot measure. We recommend starting with Prometheus for metrics collection and Grafana for visualization, but the real magic happens when you couple these with an automated decision engine.

### Key Principles

- Define clear SLIs and SLOs before writing scaling rules
- Implement circuit breakers to prevent cascading failures
- Use idempotent operations to ensure data consistency

The future of microservices isn't about adding more complexity—it's about building systems smart enough to manage themselves.`,
    date: "2024-12-10",
    tags: ["Architecture", "DevOps"],
    imageUrl: "/attached_assets/generated_images/microservices_network_visualization.png",
    videoUrl: "/attached_assets/generated_videos/cyberpunk_digital_interface_with_code_scrolling_and_data_visualization.mp4",
    status: "published",
    publishedAt: new Date("2024-12-10"),
  },
  {
    title: "The Death of Traditional REST APIs",
    excerpt: "Why RPC and GraphQL are taking over modern startup stacks.",
    content: `REST APIs have served us well for over a decade, but the landscape is shifting dramatically. Modern applications demand more flexibility, better performance, and developer experience that traditional REST simply can't provide.

## The Problem with REST

REST was designed for a different era—when network latency was higher and client applications were simpler. Today's applications need:

- Real-time data synchronization
- Flexible data fetching without over-fetching
- Type-safe contracts between frontend and backend
- Reduced network roundtrips

## Enter GraphQL and gRPC

GraphQL solves the over-fetching problem elegantly, allowing clients to request exactly what they need. Meanwhile, gRPC brings the performance benefits of binary protocols with built-in code generation.

The choice isn't about replacing REST everywhere—it's about choosing the right tool for each use case. But one thing is clear: the days of REST-only backends are numbered.`,
    date: "2024-11-28",
    tags: ["API", "Opinion"],
    imageUrl: "/attached_assets/generated_images/rest_api_evolution_visual.png",
    videoUrl: "/attached_assets/generated_videos/cyberpunk_digital_interface_with_code_scrolling_and_data_visualization.mp4",
    status: "published",
    publishedAt: new Date("2024-11-28"),
  },
  {
    title: "Building MVPs that Don't Suck",
    excerpt: "A guide to rapid prototyping without accumulating massive tech debt.",
    content: `The MVP mindset is broken. Too many founders think "minimum viable" means "quick and dirty." The result? Technical debt so massive that the entire codebase needs rewriting before Series A.

## The Real MVP Philosophy

A true MVP isn't about cutting corners—it's about ruthless prioritization. You build only what's essential, but you build it right. Here's how:

### 1. Choose Battle-Tested Tech

Don't experiment with bleeding-edge frameworks on your MVP. Use proven technologies that have strong ecosystems and abundant documentation.

### 2. Architect for Change

Your MVP will evolve. Design your data models and APIs with extensibility in mind. Make it easy to add features, not just to ship fast.

### 3. Invest in Developer Experience

Good tooling, clear documentation, and automated testing aren't luxuries—they're what allow you to move fast without breaking things.

## The Payoff

When you build your MVP with discipline, you gain speed through quality. Your team can ship features confidently, your codebase remains maintainable, and you avoid the dreaded "rewrite from scratch" conversation.

Remember: the goal isn't to launch fast and crash—it's to launch fast and scale.`,
    date: "2024-11-15",
    tags: ["Startup", "Product"],
    imageUrl: "/attached_assets/generated_images/mvp_rocket_launch_concept.png",
    videoUrl: "/attached_assets/generated_videos/cyberpunk_digital_interface_with_code_scrolling_and_data_visualization.mp4",
    status: "published",
    publishedAt: new Date("2024-11-15"),
  }
];

const seriesData = [
  {
    slug: "architecture-fundamentals",
    title: "Architecture Fundamentals",
    description: "Deep dives into system design and scalable architecture patterns",
    coverImageUrl: "/attached_assets/generated_images/microservices_network_visualization.png",
    accentColor: "#ec4899",
    isVisible: 1,
  },
  {
    slug: "startup-playbook",
    title: "Startup Playbook",
    description: "Practical guides for building and scaling startups",
    coverImageUrl: "/attached_assets/generated_images/mvp_rocket_launch_concept.png",
    accentColor: "#06b6d4",
    isVisible: 1,
  }
];

async function seed() {
  console.log("Starting database seed...");
  
  try {
    // Clear existing data
    await db.execute(sql`DELETE FROM series_posts`);
    await db.execute(sql`DELETE FROM series`);
    await db.execute(sql`DELETE FROM blog_posts`);
    console.log("Cleared existing data");
    
    // Create blog posts
    const createdPosts = [];
    for (const post of blogPostsData) {
      const [created] = await db.insert(blogPosts).values(post).returning();
      createdPosts.push(created);
      console.log(`✓ Created blog post: ${created.title}`);
    }
    
    // Create series
    const createdSeries = [];
    for (const s of seriesData) {
      const [created] = await db.insert(series).values(s).returning();
      createdSeries.push(created);
      console.log(`✓ Created series: ${created.title}`);
    }
    
    // Add posts to series
    // Architecture series: Microservices + REST APIs
    await db.insert(seriesPosts).values([
      { seriesId: createdSeries[0].id, postId: createdPosts[0].id, position: 0 },
      { seriesId: createdSeries[0].id, postId: createdPosts[1].id, position: 1 },
    ]);
    console.log("✓ Added posts to Architecture series");
    
    // Startup series: MVP
    await db.insert(seriesPosts).values([
      { seriesId: createdSeries[1].id, postId: createdPosts[2].id, position: 0 },
    ]);
    console.log("✓ Added posts to Startup series");
    
    console.log("\n✅ Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
