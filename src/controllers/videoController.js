
// Quản lí, thực hiện chức năng
export const getVideo = (req, res) => {
  try {
    // Phải đồng bộ hệ thộng => then catch, async await
    // err trước rồi tới result
    connect.query("SELECT * FROM video", (err, result) => {
      res.status(200).send(result);
    });
  } catch (exception) {
    res.status(500).send("Lỗi ....");
  }

  // try {
  //   res.status(200).send("get-video");
  // } catch (error) {
  //   res.status(500).send("Lỗi ...");
  // }
};

export const createVideo = (req, res) => {
  res.send("create video");
};
