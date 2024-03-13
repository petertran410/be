import express from "express";
import { videoRoute } from "./videoRoutes.js";

export const rootRoute = express.Router();

rootRoute.use("/video", videoRoute);
