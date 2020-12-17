// 整个项目的配置文件，后边是否需要拆分再说
const config = {
  // 服务端口号
  port: 3002,
  database: {
    DATABASE: "dandelion",
    USERNAME: "root",
    PASSWORD: "911029",
    connectionLimit: 10,
    PORT: "3306",
    HOST: "127.0.0.1"
  },
  jwtSecret: "dandelion",
  // 不需要token验证的接口
  tokenUnless: [/^\/auth/, /^\/upload/]
};

module.exports = config;
