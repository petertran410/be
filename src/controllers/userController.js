import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { responseData } from "../config/response.js";
import bcrypt from "bcrypt";
import { decodeToken } from "../config/jwt.js";

let model = initModels(sequelize);

// quản lí và thực hiện các chức năng của user
export const getUser = async (req, res) => {
  try {
    let data = await model.users.findAll();
    responseData(res, "Thành công", data, 200);
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};

export const getInfoUser = async (req, res) => {
  try {
    let { token } = req.headers;
    let accessToken = decodeToken(token);

    let getUser = await model.users.findOne({
      where: {
        user_id: accessToken.user_id,
      },
    });

    if (!getUser) {
      responseData(res, "Data not found", "", 404);
      return;
    }
    responseData(res, "Success", getUser, 200);
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};

export const updateInfo = async (req, res) => {
  // try {
  // Không cho phép user thay đổi email
  // upload tách riêng với avatar

  let { full_name, pass_word } = req.body;
  let { token } = req.headers;
  let accessToken = decodeToken(token);

  let getUser = await model.users.findOne({
    where: {
      user_id: accessToken.user_id,
    },
  });

  console.log(getUser);

  if (!getUser) {
    console.log("Not found");
  }

  getUser.pass_word;
  getUser.full_name;
  console.log(getUser.pass_word);

  // let checkInfo = await model.users.update(getUser.dataValues, {
  //   where: {
  //     user_id: accessToken.user_id,
  //   },
  // });
  console.log(
    await model.users.update(getUser.dataValues, {
      where: {
        user_id: accessToken.user_id,
      },
    })
  );

  responseData(res, "Update info thành công", "", 200);

  // } catch (error) {
  //   responseData(res, "Lỗi ...", error, 500);
  // }
};
