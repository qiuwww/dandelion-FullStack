const router = require('koa-router')()

router.get('/getData.jsonp', (ctx) => {
  // 如果jsonp 的请求为GET
  // 获取jsonp的callback
  // 请求接口的形式， getData.jsonp?callback=success_jsonpCallback
  let callbackName = ctx.query.callback || 'callback'
  let returnData = {
    success: true,
    data: {
      text: 'this is a jsonp api',
      time: new Date().getTime(),
    }
  }
  // jsonp的script字符串
  let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
  // 用text/javascript，让请求支持跨域获取
  ctx.type = 'text/javascript'

  // 输出jsonp字符串
  ctx.body = jsonpStr
});
// 借助中间件实现
router.get('/koa-jsonp.jsonp', async (ctx) => {
  let returnData = {
    success: true,
    data: {
      text: 'this is a jsonp api power by koa-jsonp',
      time: new Date().getTime(),
    }
  }
  // 直接输出JSON
  ctx.body = returnData
})


module.exports = router

