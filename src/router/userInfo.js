const express = require("express");

// 导入验证数据合法性的中间件
const expressJoi = require("@escook/express-joi");
// 导入需要的验证规则对象
const { update_userInfo_schema, update_password_schema, update_avatar_schema } = require("../schema/user");

const userInfo_handler = require("../router_handler/userInfo");

const router = express.Router();

router.get("/get", userInfo_handler.getUserInfo);
router.post("/update/userInfo", expressJoi(update_userInfo_schema), userInfo_handler.updateUserInfo);
router.post("/update/pwd", expressJoi(update_password_schema), userInfo_handler.updatePassword);
router.post("/update/avatar", expressJoi(update_avatar_schema), userInfo_handler.updateAvatar);

module.exports = router;
