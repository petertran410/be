// import Video from "../models/video.js";
import { decodeToken } from "../config/jwt.js";
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { Sequelize } from "sequelize";

let model = initModels(sequelize);
let Op = Sequelize.Op;

// Quản lí, thực hiện chức năng
export const getVideo = async (req, res) => {
  try {
    // bất đồng bộ

    // SELECT * FROM video
    // let data = await Video.findAll();
    let data = await model.video.findAll();

    // SELECT * FROM video WHERE video_id = 2
    // let data = await model.video.findAll({
    //   where: {
    //     video_id: 2,
    //   },
    // });

    // SELECT * FROM video WHERE video_name LIKE "%code%"
    // let data = await model.video.findAll({
    //   where: {
    //     video_name: {
    //       [Op.like]: "%gaming%",
    //     },
    //   },
    // });

    // SELECT video_id, video_name FROM video WHERE video_name LIKE "%code%"
    // let data = await model.video.findAll({
    //   where: {
    //     video_name: {
    //       [Op.like]: "%gaming%",
    //     },
    //   },
    //   attributes: ["video_id", "video_name"],
    // });

    responseData(res, "Thành công", data, 200);
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};

export const createVideo = (req, res) => {
  res.send("create video");
};

export const getVideoType = async (req, res) => {
  try {
    let dataVideoType = await model.video_type.findAll();

    // res.status(200).send(dataVideoType);
    responseData(res, "Thành công", dataVideoType, 200);
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};

export const getVideoByType = async (req, res) => {
  try {
    let { typeId } = req.params;

    let data = await model.video.findAll({
      where: {
        type_id: typeId,
      },
    });
    responseData(res, "Thành công", data, 200);
  } catch (error) {
    response(res, "Lỗi ...", error, 500);
  }
};

export const getVideoPage = async (req, res) => {
  try {
    let { page } = req.params;
    let pageSize = 3;
    let index = (page - 1) * pageSize;

    // trả về data, totalPage
    let dataCount = await model.video.count();
    let totalPage = Math.ceil(dataCount / pageSize);

    // SELECT * FROM video LIMIT index, pageSize
    let data = await model.video.findAll({
      offset: index,
      limit: pageSize,
    });

    responseData(res, "Thành công", { data, totalPage }, 200);
  } catch (err) {
    responseData(res, "Lỗi ...", err, 500);
  }
};

export const getVideoId = async (req, res) => {
  try {
    let { videoId } = req.params;

    // Tìm khóa chính
    // let dataPk = await model.video.findByPk(videoId);

    // object {}
    let data = await model.video.findOne({
      where: {
        video_id: videoId,
      },
      include: ["user", "type"],
    });

    responseData(res, "Thành công", data, 200);
  } catch (err) {
    responseData(res, "Lỗi ...", err, 500);
  }
};

export const getCommentVideo = async (req, res) => {
  try {
    let { videoId } = req.params;
    let data = await model.video_comment.findAll({
      where: {
        video_id: videoId,
      },
      include: ["user"],
    });

    responseData(res, "Thành công", data, 200);
  } catch (error) {}
};

export const commentVideo = async (req, res) => {
  try {
    let { token } = req.headers;
    // giải mã => object giống bên trang jwt.io

    let dToken = decodeToken(token);

    let { user_id } = dToken.data;
    let { video_id, content } = req.body;

    let newData = {
      user_id,
      video_id,
      content,
      date_create: new Date(),
      reply_list: "",
      timestamp: new Date(),
    };

    await model.video_comment.create(newData);

    responseData(res, "Thành công", "", 200);
  } catch (error) {
    responseData(res, "Lỗi ...", error, 500);
  }
};
