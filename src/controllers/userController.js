import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { responseData } from "../config/response.js";

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
