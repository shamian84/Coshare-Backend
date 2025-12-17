import express from "express";
import {
  uploadFiles,
  getMyFiles,
  getSharedFiles,
  downloadFile
} from "../controllers/fileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/upload", authMiddleware, upload.array("files", 10), uploadFiles);
router.get("/my", authMiddleware, getMyFiles);
router.get("/shared", authMiddleware, getSharedFiles);
router.get("/:id/download", authMiddleware, downloadFile);

export default router;
