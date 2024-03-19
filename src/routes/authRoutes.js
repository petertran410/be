import express from "express";
import { login, signUp } from "../controllers/authControllers.js";

export const authRoute = express.Router();

// login
authRoute.post("/login", login);
// signup
authRoute.post("/signup", signUp);
