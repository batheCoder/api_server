const express = require("express");

const userHandler = require("../router_handler/user");
const expressJoi = require("@escook/express-joi");
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require("../schema/user");

const router = express.Router();

// 注册新用户
router.post("/reguser", expressJoi(reg_login_schema), userHandler.regUser);

// 登录
router.post("/login", expressJoi(reg_login_schema), userHandler.login);

// 将路由对象共享出去
module.exports = router;
