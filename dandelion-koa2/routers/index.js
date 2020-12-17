/**
 * 整合所有子路由
 */

const router = require("koa-router")();
// 页面
const page = require("./page");
// 测试数据返回与参数接收
const test = require("./test");
const upload = require("./upload");
// const uploadAsync = require("./upload-async");
const jsonp = require("./jsonp");

// 正式的
const user = require("./user");
const auth = require("./auth");
const douban = require("./douban");

// allowedMethods处理的业务是当所有路由中间件执行完成之后, 若ctx.status为空或者404的时候, 丰富response对象的header头.
// 这里的第一步use相当于如下操作 router.prefix('/test')
router.use("/page", page.routes(), page.allowedMethods());
router.use("/test", test.routes(), test.allowedMethods());

router.use("/jsonp", jsonp.routes(), jsonp.allowedMethods());

// 正式使用的接口
router.use("/user", user.routes(), user.allowedMethods());
router.use("/auth", auth.routes(), auth.allowedMethods());
router.use("/douban", douban.routes(), douban.allowedMethods());
// 上传图片操作
router.use("/upload", upload.routes(), upload.allowedMethods());
// router.use("/upload-async", uploadAsync.routes(), uploadAsync.allowedMethods());

module.exports = router;
