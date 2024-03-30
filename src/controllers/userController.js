import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { responseData } from "../config/response.js";
import bcrypt from "bcrypt";

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
    let { userId } = req.params;

    let getUser = await model.users.findOne({
      where: {
        user_id: userId,
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
  try {
    // Không cho phép user thay đổi email
    // upload tách riêng với avatar
    let { full_name, pass_word } = req.body;
    let { userId } = req.params;

    let getUser = await model.users.findOne({
      where: {
        user_id: userId,
      },
    });

    getUser.pass_word = bcrypt.hashSync(pass_word, 10);
    getUser.full_name = full_name;

    await model.users.update(getUser.dataValues, {
      where: {
        user_id: userId,
      },
    });

    responseData(res, "Update info thành công", "", 200);
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};
