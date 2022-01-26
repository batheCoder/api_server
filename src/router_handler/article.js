const db = require("../db/index");

// 导入解析 formdata 格式表单数据的包
const multer = require("multer");
const path = require("path");

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, "../upload") });

// 获取文章列表
const getArticleList = (req, res) => {
  const sql = "SELECT * FROM ev_article_cate WHERE is_delete=0 ORDER BY id ASC";
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);

    res.send({ status: 200, msg: "SUCCESS", data: results });
  });
};

// 添加文章分类
const addArticleCate = (req, res) => {
  const sql = "SELECT * FROM ev_article_cate WHERE name = ? OR alias = ?";
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err);
    if (results.length > 0) return res.cc("分类名或别名已存在，请更换！");

    const sql = "INSERT INTO ev_article_cate SET ?";
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("新增文章分类失败！");

      res.cc({ status: 200, msg: "SUCCESS" });
    });
  });
};

// 删除文章
const delArticle = (req, res) => {
  const sql = "UPDATE ev_article_cate SET is_delete=1 WHERE id =?";
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("没有该文章！");

    res.send({ status: 200, msg: "删除文章成功" });
  });
};

// 根据id获取文章数据
const getArticleById = (req, res) => {
  const sql = "SELECT * FROM ev_article_cate WHERE id=? AND is_delete = 0";
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("文章不存在");

    res.send({ status: 200, msg: "SUCCESS", data: results });
  });
};

// 更新文章数据
const updateArticle = (req, res) => {
  const sql = "UPDATE ev_article_cate SET ? WHERE id = ?";
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("更新文章失败");

    res.send({ status: 200, msg: "SUCCESS" });
  });
};

// 添加文章
const addArticle = (req, res) => {
  res.send("ok");
};

module.exports = {
  getArticleList,
  addArticleCate,
  delArticle,
  getArticleById,
  updateArticle,
  addArticle,
};
