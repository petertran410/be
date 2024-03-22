import express from "express";
import { login, loginFacebook, signUp } from "../controllers/authControllers.js";

export const authRoute = express.Router();

// login
authRoute.post("/login", login);
// signup
authRoute.post("/signup", signUp);
// loginFacebook
authRoute.post("/login-facebook", loginFacebook);