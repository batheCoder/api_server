const express = require("express");

const cors = require("cors");

const userRouter = require("./router/user");
const userInfoRouter = require("./router/userInfo");
const articleRouter = require("./router/article");

const joi = require("@hapi/joi");

const config = require("./config");
// 解析 token 的中间件
const expressJWT = require("express-jwt");

const app = express();

app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({ status, msg: err instanceof Error ? err.message : err });
  };
  next();
});

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }));

// 配置 cors 跨域
app.use(cors());
// 配置解析表单数据的中间件;
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRouter);
app.use("/user", userInfoRouter);
app.use("/article", articleRouter);

// 错误中间件
app.use((err, req, res, next) => {
  // 表单校验错误
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 捕获身份认证失败的错误
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
  // 未知错误
  res.cc(err);
});

app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});
