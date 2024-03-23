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

const decodeToken = () => {};

export { createToken, checkToken, decodeToken };
