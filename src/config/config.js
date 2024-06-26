// yarn add dotenv
// lưu trữ các giá trị ít khi thay đổi và bảo mật
// .env nằm trong .gitignore
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env.ATEST);
export default {
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};