import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, insertSeriesSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Blog Posts API Routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const includeAll = req.query.all === 'true';
      const posts = includeAll 
        ? await storage.getAllBlogPosts()
        : await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid post ID" });
      }
      
      const post = await storage.getBlogPostWithSeries(id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const result = insertBlogPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).message 
        });
      }
      
      const post = await storage.createBlogPost(result.data);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  app.patch("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid post ID" });
      }
      
      const post = await storage.updateBlogPost(id, req.body);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid post ID" });
      }
      
      const success = await storage.deleteBlogPost(id);
      if (!success) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // Series API Routes
  app.get("/api/series", async (req, res) => {
    try {
      const allSeries = await storage.getAllSeries();
      res.json(allSeries);
    } catch (error) {
      console.error("Error fetching series:", error);
      res.status(500).json({ error: "Failed to fetch series" });
    }
  });

  app.get("/api/series/:idOrSlug", async (req, res) => {
    try {
      const param = req.params.idOrSlug;
      const id = parseInt(param);
      
      let seriesData;
      if (isNaN(id)) {
        seriesData = await storage.getSeriesWithPostsBySlug(param);
      } else {
        seriesData = await storage.getSeriesWithPosts(id);
      }
      
      if (!seriesData) {
        return res.status(404).json({ error: "Series not found" });
      }
      
      res.json(seriesData);
    } catch (error) {
      console.error("Error fetching series:", error);
      res.status(500).json({ error: "Failed to fetch series" });
    }
  });

  app.post("/api/series", async (req, res) => {
    try {
      const result = insertSeriesSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).message 
        });
      }
      
      const newSeries = await storage.createSeries(result.data);
      res.status(201).json(newSeries);
    } catch (error) {
      console.error("Error creating series:", error);
      res.status(500).json({ error: "Failed to create series" });
    }
  });

  app.patch("/api/series/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid series ID" });
      }
      
      const partialSchema = insertSeriesSchema.partial();
      const result = partialSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).message 
        });
      }
      
      const updated = await storage.updateSeries(id, result.data);
      if (!updated) {
        return res.status(404).json({ error: "Series not found" });
      }
      
      res.json(updated);
    } catch (error) {
      console.error("Error updating series:", error);
      res.status(500).json({ error: "Failed to update series" });
    }
  });

  app.delete("/api/series/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid series ID" });
      }
      
      const success = await storage.deleteSeries(id);
      if (!success) {
        return res.status(404).json({ error: "Series not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting series:", error);
      res.status(500).json({ error: "Failed to delete series" });
    }
  });

  // Series Posts management
  app.post("/api/series/:id/posts", async (req, res) => {
    try {
      const seriesId = parseInt(req.params.id);
      const { postId, position } = req.body;
      
      if (isNaN(seriesId) || !postId) {
        return res.status(400).json({ error: "Invalid series or post ID" });
      }
      
      await storage.addPostToSeries(seriesId, postId, position);
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error adding post to series:", error);
      res.status(500).json({ error: "Failed to add post to series" });
    }
  });

  app.delete("/api/series/:seriesId/posts/:postId", async (req, res) => {
    try {
      const seriesId = parseInt(req.params.seriesId);
      const postId = parseInt(req.params.postId);
      
      if (isNaN(seriesId) || isNaN(postId)) {
        return res.status(400).json({ error: "Invalid series or post ID" });
      }
      
      await storage.removePostFromSeries(seriesId, postId);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing post from series:", error);
      res.status(500).json({ error: "Failed to remove post from series" });
    }
  });

  return httpServer;
}
