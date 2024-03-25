// yarn add jsonwebtoken
// 1. mã hoá dữ liệu
// 2. kiểm tra token hợp lệ hay không
// 3. giải token

import jwt from "jsonwebtoken";

const createToken = (data) => {
  let token = jwt.sign({ data }, "BIMAT", { algorithm: "HS256" });
  return token;
};

const checkToken = () => {};

const decodeToken = (token) => {
  return jwt.decode(token);
};

export { createToken, checkToken, decodeToken };

// token
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjd9LCJpYXQiOjE3MTEzNTIzNDh9.ttEtzEeWfTD6c1AJuKk85SvPaI8KaXF6t2H3SSJ4Qk0"
