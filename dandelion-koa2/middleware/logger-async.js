/* ./middleware/logger-async.js */

function log(ctx) {
  console.log("request:", ctx.request);
}

module.exports = function () {
  return async function (ctx, next) {
    log(ctx);
    await next();
  };
};
