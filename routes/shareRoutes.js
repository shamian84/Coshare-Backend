import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { shareWithUsers } from "../controllers/shareController.js";

const router = express.Router();

router.post("/:id/share", authMiddleware, shareWithUsers);

export default router;
