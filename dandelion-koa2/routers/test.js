// 这里也是新生成的实例
const { getUser, addUser, updateUser, deleteUser } = require('../database/createConnect');

const router = require('koa-router')();
// 一般的页面请求地址
var debug = require('debug')('dev:routes');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

// 测试参数请求
// 测试地址 http://192.168.0.153:3002/test/path/5?grade=12&age=23

// - query: ctx.query,
// - parmas: ctx.params,
// - body: ctx.request.body // 需要bodyParser中间件进行处理

router.post('/path/:pathname', async (ctx) => {
  console.log(ctx);

  let url = ctx.url
  // 从node上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 从koa上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring;

  let pathname = ctx.params.pathname;
  // 需要从request中获取
  let postBody = ctx.request.body;
  // 设置返回头，这里绕过了koa，是不被支持的
  // ctx.res.writeHead(200);
  // ctx.res.write("content", 'binary')
  ctx.body = {
    url,
    // 参数类型1
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring,
    // 参数类型2
    pathname,
    // 参数类型3
    postBody
  }
});
router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
router.get('/string', async (ctx, next) => {
  ctx.body = {
    success: true,
    title: "dandelion-koa2 string",
    data: "stringstring"
  };
})

router.get('/getNumber.json', async (ctx, next) => {
  ctx.body = {
    success: true,
    title: "dandelion-koa2 string",
    data: 123
  };
})
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: "dandelion-koa2 json"
  };
});

// 数据库操作，增删改查
router.get('/user', async (ctx, next) => {
  console.log("cookies: ", await ctx.cookies.get('cid'));
  ctx.body = await getUser();
});

router.post('/user', async (ctx, next) => {
  let post = ctx.request.body;
  console.log("post ", post);
  ctx.body = await addUser(post);
});

router.put('/user', async (ctx, next) => {
  let post = ctx.request.body;
  console.log("put ", post);
  ctx.body = await updateUser('user', post);
});

router.del('/user/:id', async (ctx, next) => {
  let id = ctx.params.id;
  ctx.body = await deleteUser('user', id);
});

// 测试session
router.get('/login', async (ctx, next) => {
  // 取值
  let session = ctx.session
  // 设置
  session.userName = 'userResult.name'
  session.userId = 'userResult.id'

  console.log("session: ", session);
  ctx.body = {
    session
  }

})
// 这里返回路由函数
debug("router.routes(): ", router.routes());
module.exports = router
