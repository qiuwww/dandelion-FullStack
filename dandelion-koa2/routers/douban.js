const router = require("koa-router")();
const Douban = require("../app/controllers/douban");
// 数据库操作，增删改查
// router.get("/user", async (ctx, next) => {
//   console.log("cookies: ", await ctx.cookies.get("cid"));
//   ctx.body = await getUser();
// });

// router.post("/user", async (ctx, next) => {
//   let post = ctx.request.body;
//   console.log("post ", post);
//   ctx.body = await addUser(post);
// });

// router.put("/user", async (ctx, next) => {
//   let post = ctx.request.body;
//   console.log("put", post);
//   ctx.body = await updateUser("user", post);
// });

router.post("/chart/movies", Douban.listAction);
router.get("/chart/types", Douban.typesAction);
router.post("/query", Douban.queryAction);

module.exports = router;
