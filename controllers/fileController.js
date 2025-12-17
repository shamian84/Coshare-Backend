import File from "../models/fileUpload.js";
import path from "path";
import fs from "fs";

export const uploadFiles = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length == 0) {
      return res.status(400).json({ message: "No  File Uploaded" });
    }
    const savedFiles = await Promise.all(
      files.map((file) =>
        File.create({
          originalName: file.originalname,
          filename: file.filename,
          size: file.size,
          mimeType: file.mimetype,
          path: file.path,
          owner: req.user,
        })
      )
    );
    res.status(201).json({
      message: "Files uploaded successfully",
      files: savedFiles,
    });
  } catch (error) {
    res.status(500).json({
      message: "File upload failed",
      error: error.message,
    });
  }
};

export const getMyFiles = async (req, res) => {
  const files = await File.find({ owner: req.user }).sort({ createdAt: -1 });
  res.json(files);
};

export const getSharedFiles = async (req, res) => {
  try {
    const files = await File.find({
      "sharedWith.user": req.user,
    }).sort({ createdAt: -1 });

    res.json(files);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch shared files",
      error: error.message,
    });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    const userId = req.user;

    if (file.owner.toString() !== userId && !file.sharedWith.includes(userId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const filePath = path.resolve(file.path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File missing on server" });
    }

    res.download(filePath, file.originalName);
  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    res.status(500).json({ message: "Download failed" });
  }
};
