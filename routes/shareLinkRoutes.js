import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  generateShareLink,
  accessShareLink,
  downloadSharedFile,
} from "../controllers/shareLinkController.js";

const router = express.Router();

router.post("/:id/link", authMiddleware, generateShareLink);
router.get("/info/:token", accessShareLink);
router.get("/download/:token", downloadSharedFile);

export default router;
