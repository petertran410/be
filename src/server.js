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

// middle ware định vị thư mục load tài nguyên
app.use(express.static("."));

// yarn add graphql express-graphql
// graphql
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

// {productId, productName}
let schemaGraphpl = buildSchema(`
  type User {
    user_id: ID
    full_name: String
    email: String
    avatar: String,
    pass_word: String,
    face_app_id: String,
    role: String,
    refresh_token: String
  }

  type Video {
    video_id: ID,
    video_name: String,
    thumbnail: String,
    description: String,
    views: Int,
    source: String,
    user_id: Int,
    type_id: Int,
    users: User,
    video_type: videoType
  }

  type videoType {
    type_id: ID,
    type_name: String,
    icon: String
  }

  type Product {
    productId: ID
    productName: String
  }

  type RootQuery {
    getUser: User
    getUserId(userId: Int): User
    getVideo: [Video]
  }

  type RootMutation {
    createUser: String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

let resolver = {
  getVideo: async () => {
    let data = await prisma.video.findMany({
      include: {
        users: true,
        video_type: true,
      },
    });
    console.log(data);
    return data;
  },

  getUser: () => {
    let data = {
      id: 1,
      userName: "abc",
      age: 2,
      email: "abc@gmail.com",
      product: [
        {
          productId: 1,
          productName: "sp1",
        },
      ],
    };
    return data;
  },

  getUserId: ({ userId }) => {
    let data = {
      id: userId,
      userName: "abc",
      age: 2,
      email: "abc@gmail.com",
      product: [
        {
          productId: 1,
          productName: "abc",
        },
      ],
    };
    return data;
  },

  createUser: () => {},
};

// localhost:8080/api
app.use(
  "/api",
  graphqlHTTP({
    schema: schemaGraphpl, // nơi khai báo đối tượng (tên model, tên hàm)
    rootValue: resolver, // gán dữ liệu vào các hàm được khai báo ở schema
    graphiql: true,
  })
);

// end graphql

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

// setup prisma
// 1. yarn add prisma @prisma/client
// 2. yarn prisma init

// Next steps:

// 3. Cập nhật lại chuỗi kết nối database trong .env và tên hệ hệ CSDL đang sử dụng trong schema.prisma

// 4. Run yarn prisma db pull

// 5. Run yarn prisma generate để cập nhật model trong @prisma@client
