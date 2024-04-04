import express from "express";
import {
  getInfo,
  getUser,
  updateInfo,
} from "../controllers/userController.js";

export const userRoute = express.Router();

// refresh token => làm mới lại token

// API get video pagination
userRoute.get("/get-user", getUser);

// API get info user
userRoute.get("/get-info", getInfo);

// API update info user
userRoute.put("/update-info", updateInfo);

// localhost:8080/user/get-user
