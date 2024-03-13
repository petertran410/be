// Quản lí, thực hiện chức năng
export const getVideo = (req, res) => {
  try {
    res.status(200).send("get-video");
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
