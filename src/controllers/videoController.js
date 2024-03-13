import Video from "../models/video.js";

// Quản lí, thực hiện chức năng
export const getVideo = async (req, res) => {
  try {
    // bất đồng bộ

    // SELECT * FROM video
    // let data = await Video.findAll();

    // SELECT * FROM video WHERE
    let data = await Video.findAll();
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
