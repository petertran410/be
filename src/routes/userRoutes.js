import express from "express";
import { getUser } from "../controllers/userController.js";

export const userRoute = express.Router();

userRoute.get("/get-user", getUser);

// localhost:8080/user/get-user