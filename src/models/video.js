import { DataTypes, Model } from "sequelize";

class Video extends Model {}

// tham số 1: định nghĩa lại tất cả column của table
// tham số 2: kết nối class với table
Video.init(
  {
    video_id: { type: DataTypes.INTEGER, primaryKey: true },
    video_name: { type: DataTypes.STRING },
    thumbnail: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    views: { type: DataTypes.INTEGER },
    source: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER },
    type_id: { type: DataTypes.INTEGER },
  },
  {}
);

// 1:38:32
