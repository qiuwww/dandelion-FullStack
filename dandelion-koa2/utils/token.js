const jwt = require("jsonwebtoken"); // 加密与解密工具
const util = require("util");
const verify = util.promisify(jwt.verify); // 解密
const config = require("../config.js");

/**
 * @desc 设置token的值
 * @return token
 */
module.exports.setToken = async (user = {}) => {
  if (!user.username) {
    return;
  }
  let userToken = {
    name: user.username,
  };
  return await jwt.sign(userToken, config.jwtSecret, { expiresIn: "1h" }); // token签名 有效期为1小时, jwtSecret密钥
};
module.exports.getToken = async (ctx) => {
  const token = ctx.header.authorization; // 获取jwt
  let payload;
  if (token) {
    payload = await verify(token.split(" ")[1], config.jwtSecret); // 解密，获取payload
  }
  return payload;
};
