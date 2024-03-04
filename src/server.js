import express from "express";
const app = express();

// Chèn middleware, custom dữ liệu thành object
// Định dạng lại dữ liệu từ text => json
app.use(express.json());

// Khởi tạo server BE chạy port 8080
app.listen(8080);

// yarn add cors
import cors from "cors";
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// Khởi động server BE bằng lệnh node server.js

// GET url: localhost:8080/demo
// endpoint /demo/:id2/:email2

// tham số 1: tên endpoint
// tham số 2: arrow function
app.get("/demo", (req, res) => {
  // C1: Lấy từ URL
  // -query string: /demo?id=123&email=demo@gmail.com
  // -query params: /demo/123/demo@gmail.com

  // query string
  // let id = req.query.id;
  // let email = req.query.email;
  // let { id, email } = req.query;

  // query params
  // let id2 = req.params.id2;
  // let email2 = req.params.email2;
  // let { id2, email2 } = req.params;

  // C2: Lấy từ Json
  let { id, userName, email, phone, sex } = req.body;

  // BE trả dữ liệu về cho FE
  // res.send({ id, email, id2, email2 });
  res.send({ id, userName, email, phone, sex });
  // Trả về tất cả dạng dữ liệu trừ number
});
// app.post();
// app.put();
// app.delete();

// yarn add mysql2
import mysql from "mysql2";
import { createVideo, getVideo } from "./controllers/videoController.js";

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  port: "3306",
  database: "tranngocnhan",
});

// endpoint viết chữ thường và cách nhau bởi dấu gạch ngang
// localhost:8080/video/get-video
// user => get-user, create-user
app.get("/video/get-video", getVideo);
app.post("/video/create-video", createVideo);
