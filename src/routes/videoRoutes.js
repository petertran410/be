import express from "express";
import {
  createVideo,
  getCommentVideo,
  getVideo,
  getVideoByType,
  getVideoId,
  getVideoPage,
  getVideoType,
} from "../controllers/videoController.js";

export const videoRoute = express.Router();

// Nơi quản lý API của đối tượng
videoRoute.get("/get-video", getVideo);
videoRoute.post("/create-video", createVideo);

// API get video id
videoRoute.get("/get-video-id/:videoId", getVideoId);

// API get video type
videoRoute.get("/get-video-type", getVideoType);

// API lấy tất cả video theo type id
videoRoute.get("/get-video-by-type/:typeId", getVideoByType);

// API get video pagination
videoRoute.get("/get-video-page/:page", getVideoPage);

// API get comment video
videoRoute.get("/get-comment-video/:videoId", getCommentVideo);