import express from "express";
import { getVideoTypeId } from "../controllers/videoTypeController.js";

export const videoTypeRoute = express.Router();

videoTypeRoute.get("/get-video-type-id", getVideoTypeId);
