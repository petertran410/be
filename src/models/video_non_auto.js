import { DataTypes, Model } from "sequelize";
import sequelize from "./connect.js";

class Video extends Model {}

// tham số 1: định nghĩa lại tất cả column của table
// tham số 2: kết nối class với table
Video.init(
  {
    video_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    video_name: { type: DataTypes.STRING },
    thumbnail: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    views: { type: DataTypes.INTEGER },
    source: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER },
    type_id: { type: DataTypes.INTEGER },
  },
  {
    sequelize: sequelize, // truyền chuỗi kết nối CSDL
    modelName: "video", // video
    tableName: "video", // kết nối class (DAO) với đúng tên table
    timestamps: false, // chống mặc định thêm thời gian và cập nhật thời gian trong database
  }
);

export default Video;
