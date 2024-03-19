import express from "express";
import { videoRoute } from "./videoRoutes.js";
import { videoTypeRoute } from "./videoTypeRoutes.js";
import { authRoute } from "./authRoutes.js";

export const rootRoute = express.Router();

rootRoute.use("/video", videoRoute);

rootRoute.use("/videoType", videoTypeRoute);

rootRoute.use("/auth", authRoute);
