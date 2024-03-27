// yarn add jsonwebtoken
// 1. mã hoá dữ liệu
// 2. kiểm tra token hợp lệ hay không
// 3. giải token

import jwt from "jsonwebtoken";

const createToken = (data) => {
  let token = jwt.sign(data, "BIMAT", { algorithm: "HS256", expiresIn: "50m" });
  return token;
};

const checkToken = (token) =>
  jwt.verify(token, "BIMAT", (error, decoded) => error);

const decodeToken = (token) => {
  return jwt.decode(token);
};

const verifyToken = (req, res, next) => {
  let { token } = req.headers;

  let check = checkToken(token);

  if (check === null) {
    // check token hợp lệ
    next();
  } else {
    // token không hợp lệ trả về 401 not authorized
    res.status(401).send(check.message);
  }
};

export { createToken, checkToken, decodeToken, verifyToken };

// token
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjd9LCJpYXQiOjE3MTEzNTIzNDh9.ttEtzEeWfTD6c1AJuKk85SvPaI8KaXF6t2H3SSJ4Qk0"
