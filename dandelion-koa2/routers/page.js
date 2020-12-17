const router = require('koa-router')()
// 一般的页面请求地址
module.exports = router
  .get('/', async (ctx, next) => {
    // 这里的页面render函数需要等待结束后才可以向后执行
    await ctx.cookies.set(
      'cid',
      'hello world',
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/',       // 写cookie所在的路径
        maxAge: 100 * 60 * 1000, // cookie有效时长
        expires: new Date('2019-02-15'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
    await ctx.render('index', {
      title: 'Hello Koa 2!'
    })
  })
  .get('/introduction', async (ctx, next) => {
    await ctx.render('introduction', {
      title: 'introduction!'
    })
  })
  // 直接返回一个字符串不需要等待
  .get('/home', async (ctx, next) => {
    ctx.body = 'home';
  })
