/* ./middleware/logger-generator.js */
// generator中间件返回的应该是function * () 函数
function log(ctx) {
  console.log("generator:", ctx.method, ctx.header.host + ctx.url);
}

module.exports = function () {
  return function* (next) {
    // 执行中间件的操作
    log(this);

    if (next) {
      yield next;
    }
  };
};
