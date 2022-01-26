const db = require("../db/index");

// 加密密码
const bcrypt = require("bcryptjs");
// 用这个包来生成 Token 字符串
const jwt = require("jsonwebtoken");
// 导入配置文件
const config = require("../config");
const { expiresIn } = require("../config");

// 注册用户处理函数
const regUser = (req, res) => {
  const userInfo = req.body;
  if (!userInfo.username || !userInfo.password) return res.send({ status: 1, msg: "用户名或密码不能为空！" });

  const sql = "SELECT * FROM ev_users WHERE username =?";
  db.query(sql, [userInfo.username], (err, results) => {
    if (err) return res.cc(err);
    if (results.length > 0) return res.cc("用户名被占用，请更换其他用户名！");

    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    // userInfo.password = bcrypt.hashSync(userInfo.password, 10);

    const sql = "INSERT INTO ev_users set ?";
    db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
      if (err) return res.send({ status: 1, message: err.message });
      if (results.affectedRows !== 1) return res.send({ status: 1, message: "注册用户失败，请稍后再试！" });

      // 注册成功
      res.send({ status: 0, message: "注册成功！" });
    });
  });
};

// 登录处理函数
const login = (req, res) => {
  const userInfo = req.body;
  const sql = "SELECT * FROM ev_users WHERE username =?";
  db.query(sql, userInfo.username, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("用户不存在！");
    if (userInfo.password !== results[0].password) return res.cc("密码错误！");

    const userStr = { ...results[0], password: null, user_pic: null };
    // 生成token字符串
    const tokenStr = jwt.sign(userStr, config.jwtSecretKey, { expiresIn: config.expiresIn });
    res.send({ status: 0, msg: "登录成功", token: "Bearer " + tokenStr });
  });
};

module.exports = {
  regUser,
  login,
};
