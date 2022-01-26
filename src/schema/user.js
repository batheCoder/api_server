const joi = require("@hapi/joi");

const username = joi.string().alphanum().min(1).max(10).required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
const avatar = joi.string().dataUri().required();

exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
};
// 验证规则对象 - 更新用户基本信息
exports.update_userInfo_schema = {
  body: {
    id,
    nickname,
    email,
  },
};
// 验证规则对象 - 重置密码
exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref("oldPwd")).concat(password),
  },
};
// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
  body: {
    avatar,
  },
};
