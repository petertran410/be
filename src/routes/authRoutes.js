import express from "express";
import {
  login,
  loginFacebook,
  tokenRef,
  signUp,
  logout,
} from "../controllers/authControllers.js";

export const authRoute = express.Router();

// login
authRoute.post("/login", login);
// signup
authRoute.post("/signup", signUp);
// loginFacebook
authRoute.post("/login-facebook", loginFacebook);
// refresh Token
authRoute.post("/token-ref", tokenRef);
// API logout
authRoute.post("/logout", logout);

// yarn add bcrypt
// mã hoá pass_word
// so sánh dữ liệu thô và mã hoá
