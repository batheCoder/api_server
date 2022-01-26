const express = require("express");

const expressJoi = require("@escook/express-joi");

const article_handler = require("../router_handler/article");
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require("../schema/article");

const router = express.Router();

router.get("/get", article_handler.getArticleList);
router.get("/add", expressJoi(add_cate_schema), article_handler.addArticleCate);
router.get("/delete/:id", expressJoi(delete_cate_schema), article_handler.delArticle);
router.get("/getById/:id", expressJoi(get_cate_schema), article_handler.getArticleById);
router.post("/update", expressJoi(update_cate_schema), article_handler.updateArticle);
router.post("/addArticle", article_handler.addArticle);

module.exports = router;
