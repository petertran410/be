// khai báo chuỗi kết nối CSDL

// const connect = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   port: "3306",
//   database: "tranngocnhan",
// });

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("tranngocnhan", "root", "1234", {
  host: "localhost",
  port: "3306",
  dialect: "mysql", // CSDL đang sử dụng
});

// Test kết nối => node src/models/connect.js
// try {
//   await sequelize.authenticate();
//   console.log("Kết nối thành công");
// } catch (err) {
//   console.log(err);
// }

export default sequelize;
