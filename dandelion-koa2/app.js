const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const jsonp = require("koa-jsonp");
// session操作
// Native Koa 2 session middleware, inspired by and compatible with koa - generic - session.This can be used as a drop -in replacement for koa - generic - session in Koa 2.
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");

const routers = require("./routers/index");
const config = require("./config");

// This module lets you authenticate HTTP requests using JSON Web Tokens in your Koa(node.js) applications.
const jwt = require("koa-jwt");
const jwtAuthorization = require("./middleware/jwt-authorization");
// session操作

// session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST
};
// https://www.npmjs.com/package/koa-mysql-session
// 配置session中间件
app.use(
  session({
    key: "USER_SID",
    store: new MysqlStore(sessionMysqlConfig),
    cookie: ctx => ({
      maxAge: 100
    })
  })
);

// error handler
// onerror(app, options);
// koa - onerror will automatic set err.status as response status code, and err.headers as response headers.
onerror(app);

// middlewares
// A body parser for koa, base on co - body.support json, form and text type body.
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
// JSON pretty - printed response middleware.Also converts node object streams to binary.
// 响应json
app.use(json());
// 打印请求中间件
app.use(logger());
// jsonp
app.use(jsonp());
// 这里设置访问的静态文件的位置
app.use(require("koa-static")(__dirname + "/public"));
// 这里设置页面的位置
app.use(
  views(__dirname + "/views", {
    extension: "ejs"
  })
);
// logger
// use就是经过这里的处理，通过的意思
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// 设置跨域请求允许地址
app.use(async (ctx, next) => {
  // 设置允许的域
  ctx.set("Access-Control-Allow-Origin", "http://localhost:4200");
  // 允许请求端设置数据的格式
  ctx.set("Access-Control-Allow-Headers", "Content-Type,Authorization,Token");
  await next();
});
// error-handling
// 基于洋葱结构的错误处理回调
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
    // 手动释放error事件
    ctx.app.emit("error", err, ctx);
  }
});

// 这里需要在jwt的上边
app.use(jwtAuthorization());
// Middleware below this line is only reached if JWT token is valid
// 如果需要对指定的路由设置token限定，需要使用unless接口
app.use(
  jwt({ secret: config.jwtSecret }).unless({
    path: config.tokenUnless
  }) // 数组中的路径不需要通过jwt验证，这里的请求不需要token验证
);
// routers
app.use(routers.routes()).use(routers.allowedMethods());

// 继续触发error事件
app.on("error", err => {
  console.error("koa server error: ", err.message);
  console.error(err);
});

module.exports = app;
