import express from "express";
import { getInfo, getUser, updateInfo } from "../controllers/userController.js";

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

import multer from "multer";

let storage = multer.diskStorage({
  destination: process.cwd() + "/public/img", // nơi định nghĩa đường dẫn lưu hình
  filename: (req, file, callback) => {
    let newName = new Date().getTime() + "_" + file.originalname;

    callback(null, newName);
  }, // nơi đổi tên hình
});

let upload = multer({ storage });

// truyền vô key trong upload.single. Key này front end phải tuân theo
userRoute.post("/upload-avatar", upload.array("avatar"), (req, res) => {
  let { files } = req;
  
  let { hoTen, email } = req.body;

  res.send(files);
});

// localhost:8080/user/get-user
