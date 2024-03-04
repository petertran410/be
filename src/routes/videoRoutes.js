import { createVideo, getVideo } from "../controllers/videoController";

import express from "express";

const userRoute = express.Router();

// Nơi quản lý API của đối tượng
userRoute.get("/video/get-video", getVideo);
userRoute.post("/video/create-video", createVideo);
