import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Cloudinary Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dwaizjrar",
    api_key: process.env.CLOUDINARY_API_KEY || "738684589134443",
    api_secret: process.env.CLOUDINARY_API_SECRET || "K6FrrhvQ7W88j5Wg2FgIYMgwgUo",
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "wedding_invitation",
      allowed_formats: ["jpg", "png", "jpeg", "gif"],
    } as any,
  });

  const upload = multer({ storage: storage });

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
  });

  // Get Cloudinary Config (Check connection)
  app.get("/api/cloudinary-check", async (req, res) => {
    try {
      const result = await cloudinary.api.ping();
      res.json({ connected: true, result });
    } catch (error) {
      res.status(500).json({ connected: false, error: (error as Error).message });
    }
  });

  // List images from Cloudinary
  app.get("/api/images", async (req, res) => {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'wedding_invitation/'
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // Upload endpoint
  app.post("/api/upload", upload.single("image"), (req: any, res) => {
    res.json({ message: "Upload success", file: req.file });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
