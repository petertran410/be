import express from "express";
import { videoRoute } from "./videoRoutes.js";
import { videoTypeRoute } from "./videoTypeRoutes.js";

export const rootRoute = express.Router();

rootRoute.use("/video", videoRoute);

rootRoute.use("/videoType", videoTypeRoute);
