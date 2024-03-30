import express from "express";
import {
  getInfoUser,
  getUser,
  updateInfo,
} from "../controllers/userController.js";

export const userRoute = express.Router();

// refresh token => làm mới lại token

// API get video pagination
userRoute.get("/get-user", getUser);

// API get info user
userRoute.get("/get-info-user/:userId", getInfoUser);

// API update info user
userRoute.put("/update-info/:userId", updateInfo);

// localhost:8080/user/get-user
