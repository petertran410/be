// import Video from "../models/video.js";
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
    // let data = await model.video.findAll();

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
    let data = await model.video.findAll({
      where: {
        video_name: {
          [Op.like]: "%gaming%",
        },
      },
      attributes: ["video_id", "video_name"],
    });

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Lỗi ...");
  }
};

export const createVideo = (req, res) => {
  res.send("create video");
};

export const getVideoId = (req, res) => {
  res.send("get video id");
};
