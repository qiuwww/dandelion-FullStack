const jwt = require("jsonwebtoken");
const config = require("../config.js");
const util = require("util");
const verify = util.promisify(jwt.verify);

/**
 * 判断token是否可用
 */
module.exports = function () {
  return async function (ctx, next) {
    try {
      // 这里使用authorization字段，也可以不使用这个字段，比如自定义token字段，需要服务端可接受这个字段。
      const token = ctx.header.authorization; // 获取jwt
      if (token) {
        let payload;
        try {
          payload = await verify(token.split(" ")[1], config.jwtSecret); // 解密payload，获取用户名和ID
          // 把解析的数据附在ctx上，便于后边的使用
          ctx.user = {
            name: payload.name,
            id: payload.id,
          };
        } catch (err) {
          console.log("token verify fail: ", err);
        }
      }
      await next();
    } catch (err) {
      // option请求就不要返回认证失败了，因为根本没有带上token
      if (ctx.method === "OPTIONS") {
        ctx.body = null;
      }
      if (err.status === 401) {
        ctx.body = {
          code: -1,
          msg: "认证失败",
        };
      } else {
        err.status = 404;
        ctx.body = "404";
      }
    }
  };
};
