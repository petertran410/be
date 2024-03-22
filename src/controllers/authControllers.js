import { Sequelize } from "sequelize";
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

let model = initModels(sequelize);
let Op = Sequelize.Op;

export const login = async (req, res) => {
  try {
    let { email, pass_word } = req.body;
    let checkEmailPass = await model.users.findOne({
      where: {
        email,
      },
    });

    if (checkEmailPass) {
      if (checkEmailPass.pass_word === pass_word) {
        responseData(res, "Login thành công", "token", 200);
      } else {
        responseData(res, "Mật khẩu không chính xác", "", 400);
      }
    } else {
      responseData(res, "Email không chính xác", "", 400);
    }
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};

export const signUp = async (req, res) => {
  try {
    let { full_name, email, pass_word } = req.body;

    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });

    // check trùng email
    if (checkUser) {
      // res.status(400).send("Email đã tồn tại");
      responseData(res, "Email đã tồn tại", "", 400);
      return;
    }

    let newData = {
      full_name,
      email,
      pass_word,
      avatar: "",
      face_app_id: "",
      role: "user",
    };

    // Create => thêm mới users
    // INSERT INTO VALUES
    await model.users.create(newData);
    responseData(res, "Đăng kí thành công", "", 200);
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};

export const loginFacebook = async (req, res) => {
  try {
    let { faceAppId, full_name } = req.body;

    // Kiểm tra facebook app id
    let checkUser = await model.users.findOne({
      where: {
        face_app_id: faceAppId,
      },
    });

    // Nếu đã tồn tại => login
    if (!checkUser) {
      // Nếu chưa tồn tại => signup
      let newData = {
        full_name,
        email: "",
        pass_word: "",
        avatar: "",
        face_app_id: faceAppId,
        role: "user",
      };
      // Create => thêm mới users
      // INSERT INTO VALUES
      await model.users.create(newData);
    }
    responseData(res, "Đăng kí thành công", "token", 200);
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};
