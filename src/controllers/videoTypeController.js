import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { Sequelize } from "sequelize";
import { responseData } from "../config/response.js";

let model = initModels(sequelize);
let Op = Sequelize.Op;

export const getVideoTypeId = async (req, res) => {
  try {
    let data = await model.video_type.findAll({
      attributes: ["type_id"],
    });

    responseData(res, "Thành công", data, 200);
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};
