import express from "express";
const app = express();

// Khởi tạo server BE chạy port 8080
app.listen(8080);

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
