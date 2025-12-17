import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();

import connectDb from "./database/mongoDb.js";
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import shareRoutes from "./routes/shareRoutes.js";
import shareLinkRoutes from "./routes/shareLinkRoutes.js";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();

connectDb();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/uploads", express.static(uploadDir));
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/share", shareRoutes);
app.use("/api/share-link", shareLinkRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
