import { Sequelize } from "sequelize";
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";
import {
  checkRefToken,
  checkToken,
  createRefToken,
  createToken,
  decodeToken,
} from "../config/jwt.js";

let model = initModels(sequelize);
let Op = Sequelize.Op;

export const login = async (req, res) => {
  try {
    let { email, pass_word } = req.body;
    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });

    if (checkUser) {
      if (bcrypt.compareSync(pass_word, checkUser.pass_word)) {
        // token này dùng để ng dùng đăng nhập. Tgian expired là 10m sau đó chuyển hướng qua refresh_token
        let key = new Date().getTime();

        let token = createToken({ user_id: checkUser.user_id, key });

        // Khởi tạo refresh_token =) lưu token vào table để dùng nếu token login bth expired
        let refToken = createRefToken({ user_id: checkUser.user_id, key });

        // Lưu refresh_token vào table users
        await model.users.update(
          {
            ...checkUser.dataValues,
            refresh_token: refToken,
          },
          {
            where: {
              user_id: checkUser.user_id,
            },
          }
        );

        // let token = createToken({
        //   tenLop: "ngocnhan",
        //   HetHanString: "22/05/2025",
        //   HetHanTime: "1716336000000",
        // });
        console.log(token);
        responseData(res, "Login thành công", token, 200);
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
      pass_word: bcrypt.hashSync(pass_word, 10),
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

export const tokenRef = async (req, res) => {
  try {
    // Lấy user_id
    // structure: {data: {user_id}}
    let { token } = req.headers;

    // check token
    let check = checkToken(token);

    if (check !== null && check.name !== "TokenExpiredError") {
      // token không hợp lệ trả về 401 not authorized
      res.status(401).send(check.name);
      return;
    }

    let accessToken = decodeToken(token);

    let getUser = await model.users.findOne({
      where: {
        user_id: accessToken.user_id,
      },
    });

    // check token
    let checkRef = checkRefToken(getUser.refresh_token);

    if (checkRef !== null) {
      // check refresh_token còn hạn hay không
      res.status(401).send(check.name);
      return;
    }

    // check code
    let refToken = decodeToken(getUser.refresh_token);
    if (accessToken.data.key != refToken.data.key) {
      res.status(401).send(check.name);
      return;
    }

    // token mới này dùng để cho ng dùng thay thế token ở trên
    let newToken = createToken({
      user_id: getUser.user_id,
      key: refresh_token.key,
    });

    responseData(res, "Thành công", newToken, 200);
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};

export const logout = async (req, res) => {
  try {
    // Lấy user_id
    // structure: {data: {user_id}}
    let { token } = req.headers;

    let accessToken = decodeToken(token);

    // lấy thông tin user trong database
    let getUser = await model.users.findOne({
      where: {
        user_id: accessToken.user_id,
      },
    });

    await model.users.update(
      {
        ...getUser.dataValues,
        refresh_token: "",
      },
      {
        where: {
          user_id: getUser.user_id,
        },
      }
    );

    responseData(res, "Thành công", "", 200);
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};
