import express from "express";
import {
  createVideo,
  getVideo,
  getVideoId,
  getVideoType,
} from "../controllers/videoController.js";

export const videoRoute = express.Router();

// Nơi quản lý API của đối tượng
videoRoute.get("/get-video", getVideo);
videoRoute.post("/create-video", createVideo);
videoRoute.get("/get-video-id", getVideoId);

// API get video type
videoRoute.get("/get-video-type", getVideoType);
