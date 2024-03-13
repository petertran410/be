import express from "express";
import { createVideo, getVideo } from "../controllers/videoController.js";

export const videoRoute = express.Router();

// Nơi quản lý API của đối tượng
videoRoute.get("/get-video", getVideo);
videoRoute.post("/create-video", createVideo);
