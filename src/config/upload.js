import multer from "multer";

let storage = multer.diskStorage({
  destination: process.cwd() + "/public/imgs/", // nơi định nghĩa đường dẫn lưu hình
  filename: (req, file, callback) => {
    let newName = new Date().getTime() + "_" + file.originalname;

    callback(null, newName);
  }, // nơi đổi tên hình
});

let upload = multer({ storage });

export default upload;
