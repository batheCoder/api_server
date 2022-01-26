const db = require("../db/index");

// 获取用户信息处理函数
exports.getUserInfo = (req, res) => {
  const sql = "select id, username, nickname, email, user_pic from ev_users where id=?";
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("用户不存在");

    res.send({ status: 0, msg: "获取用户信息成功", data: results[0] });
  });
};

// 更新用户信息函数
exports.updateUserInfo = (req, res) => {
  const sql = `update ev_users set ? where id=?`;
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("修改用户基本信息失败！");

    return res.send({ status: 0, msg: "修改用户信息成功" });
  });
};

// 更新用户密码处理函数
exports.updatePassword = (req, res) => {
  const sql = `select * from ev_users where id=?`;
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("用户不存在！");

    // TODO：判断提交的旧密码是否正确
    if (req.body.oldPwd !== results[0].password) return res.cc("旧密码错误");
    const sql = `update ev_users set password=? where id=?`;
    db.query(sql, [req.body.newPwd, req.user.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("更新密码失败！");

      res.cc("更新密码成功！", 0);
    });
  });
};

// 更新用户头像处理函数
exports.updateAvatar = (req, res) => {
  const sql = "update ev_users set user_pic=? where id=?";
  db.query(sql, [req.body.avatar, res.user.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("更新头像失败！");

    return res.cc("更新头像成功！", 0);
  });
};
