import express from "express";
import {
  createVideo,
  getVideo,
  getVideoId,
} from "../controllers/videoController.js";

export const videoRoute = express.Router();

// Nơi quản lý API của đối tượng
videoRoute.get("/get-video", getVideo);
videoRoute.post("/create-video", createVideo);
videoRoute.get("/get-video-id", getVideoId);
