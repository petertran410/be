import express from "express";
const app = express();

// Chèn middleware, custom dữ liệu thành object
// Định dạng lại dữ liệu từ text => json
app.use(express.json());

// Khởi tạo server BE chạy port 8080
app.listen(8080);

// yarn add cors
import cors from "cors";
app.use(cors());

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

// endpoint viết chữ thường và cách nhau bởi dấu gạch ngang
// user => get-user, create-user
// app.get("/video/get-video", getVideo);
// app.post("/video/create-video", createVideo);

import { rootRoute } from "./routes/rootRoutes.js";
// localhost:8080/video/get-video
app.use(rootRoute);

// yarn add sequelize
// lưu ý cài thêm thư viện của CSDL đó song song với sequelize

// yarn add swagger-ui-express swagger-jsdoc
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    info: {
      title: "api",
      version: "1.0.0",
    },
  },
  apis: ["src/swagger/index.js"],
};

const specs = swaggerJsDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /api/v1/user/getUser
 * get:
 *     description: response
 *     tags: [User]
 *     responses: 
 *               200:
 *                   description: success
 */

/**
 * @swagger
 * /api/v1/user/updateUser/{id}
 * put:
 *     description: response
 *     tags: [User]
 *     parameters:
 *     - in: path
 *       name: id
 *     - in: body
 *       name: user
 *       schema: 
 *          type: object
 *          properties:
 *                userName:
 *                    type: string
 *                firstName:
 *                    type: string
 *                lastName:
 *                    type: string
 *     responses:
 *        200:
 *          description: res
 */