# rest 中三种类型的参数获取

- query: ctx.query,
- parmas: ctx.params,
- body: ctx.request.body // 需要 bodyParser 中间件进行处理

```js
async function post(ctx, next) {
  const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "list|20-100": [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": 1,
        name: "@string(10, 200)",
        say: "@cword(10, 200)"
      }
    ]
  });

  // 输出结果
  ctx.state = {
    code: 0,
    data: {
      list: data.list,
      ctx: ctx,
      query: ctx.query,
      parmas: ctx.params,
      body: ctx.request.body // 需要bodyParser中间件进行处理
    }
  };
  // const { signature, timestamp, nonce, echostr } = ctx.query
  // if (checkSignature(signature, timestamp, nonce)) ctx.body = echostr
  // else ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'
}
```
