// khai báo chuỗi kết nối CSDL

// const connect = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   port: "3306",
//   database: "tranngocnhan",
// });

import { Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(config.database, config.user, config.pass, {
  host: config.host,
  port: config.port,
  dialect: config.dialect, // CSDL đang sử dụng
});

// Test kết nối => node src/models/connect.js
// try {
//   await sequelize.authenticate();
//   console.log("Kết nối thành công");
// } catch (err) {
//   console.log(err);
// }

export default sequelize;
