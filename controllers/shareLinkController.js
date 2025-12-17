import ShareLink from "../models/shareLink.js";
import File from "../models/fileUpload.js";
import crypto from "crypto";
import path from "path";

export const generateShareLink = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    if (file.owner.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const token = crypto.randomUUID();

    await ShareLink.create({
      token,
      file: file._id,
      createdBy: req.user,
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    res.json({
      message: "Share link generated",
      url: `${frontendUrl}/share/${token}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate link", error: error.message });
  }
};

export const accessShareLink = async (req, res) => {
  try {
    const link = await ShareLink.findOne({
      token: req.params.token,
    }).populate("file");

    if (!link) {
      return res
        .status(404)
        .json({ message: "This link is invalid or has expired" });
    }

    res.json(link.file);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accessing file", error: error.message });
  }
};

export const downloadSharedFile = async (req, res) => {
  try {
    const { token } = req.params;
    const link = await ShareLink.findOne({ token }).populate("file");

    if (!link || !link.file) {
      return res
        .status(404)
        .json({ message: "File not found or link expired" });
    }

    const file = link.file;

    const filePath = path.resolve(file.path);

    res.download(filePath, file.originalName, (err) => {
      if (err) {
        console.error("Download Error:", err);
        if (!res.headersSent) {
          res.status(500).json({ message: "Could not download file" });
        }
      }
    });
  } catch (error) {
    console.error("DOWNLOAD ERROR:", error);
    res.status(500).json({ message: "Download failed", error: error.message });
  }
};
