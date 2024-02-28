import express from "express";
const app = express();

// Khởi tạo server BE chạy port 8080
app.listen(8080);

// Khởi động server BE bằng lệnh node server.js

// GET url: localhost:8080/demo
// endpoint /demo

// tham số 1: tên endpoint
// tham số 2: arrow function
app.get("/demo/:id2/:email2", (request, response) => {
  // C1: Lấy từ URL
  // -query string: /demo?id=123&email=demo@gmail.com
  // -query params: /demo/123/demo@gmail.com
  // C2: Lấy từ Json

  // BE trả dữ liệu về cho FE
  response.send("Hello world!!");
  // Trả về tất cả dạng dữ liệu trừ number
});
// app.post();
// app.put();
// app.delete();
