const router = require("koa-router")();
const User = require("../app/controllers/user");
// 数据库操作，增删改查
router.get("/user", async (ctx, next) => {
  console.log("cookies: ", await ctx.cookies.get("cid"));
  ctx.body = await getUser();
});

router.post("/user", async (ctx, next) => {
  let post = ctx.request.body;
  console.log("post ", post);
  ctx.body = await addUser(post);
});

router.put("/user", async (ctx, next) => {
  let post = ctx.request.body;
  console.log("put", post);
  ctx.body = await updateUser("user", post);
});

// 正式接口
router.post("/list", User.listAction);
router.post("/delete", User.deleteAction);
router.post("/detail/:id", User.detailAction);
router.post("/save", User.saveAction);

module.exports = router;
