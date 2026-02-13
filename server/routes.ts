import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.use((req, res, next) => {
    const host = req.hostname;
    if (host === "lolaum-product--lolajjoo2022.replit.app") {
      return res.redirect(301, "https://lolaum.kr" + req.originalUrl);
    }
    next();
  });

  app.get("/robots.txt", (_req, res) => {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://seedglow.co.kr/sitemap.xml`;
    res.set("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  app.get("/sitemap.xml", (_req, res) => {
    const today = new Date().toISOString().split("T")[0];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seedglow.co.kr/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    res.set("Content-Type", "application/xml");
    res.send(sitemap);
  });

  return httpServer;
}
