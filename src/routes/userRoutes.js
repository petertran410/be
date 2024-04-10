import express from "express";
import { getInfo, getUser, updateInfo, uploadAvatar } from "../controllers/userController.js";

export const userRoute = express.Router();

// refresh token => làm mới lại token

// API get video pagination
userRoute.get("/get-user", getUser);

// API get info user
userRoute.get("/get-info", getInfo);

// API update info user
userRoute.put("/update-info", updateInfo);

// API upload image
// yarn add multer

// trả về đường dẫn gốc của source
// process.cwd() => nhảy ra đường dẫn ngoài cùng

import upload from "../config/upload.js";

// truyền vô key trong upload.single. Key này front end phải tuân theo
userRoute.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

// localhost:8080/user/get-user
