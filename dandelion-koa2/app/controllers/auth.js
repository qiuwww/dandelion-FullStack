const dbUtil = require("../../database/db-util");
const tokenUtil = require("../../utils/token");
const bcrypt = require("bcryptjs");

// 这里同时测试了两种形式 session-cookie和jwt
// 登陆接口
exports.loginAction = async (ctx, next) => {
  let user = ctx.request.body;
  // 取得session对象，便于后边的使用
  let session = ctx.session;
  let { username, password } = user;
  // 可以 SELECT * FROM user_info WHERE username = '1014913222@qq.com'
  // 查询数据库当前用户名username的信息
  let queryUserResult = await dbUtil.query(
    `SELECT * FROM user_info WHERE username = '${username}'`
  );
  // 当前登录的用户
  let currentUser = queryUserResult[0];
  // 设置token

  if (
    password === currentUser.password ||
    (await bcrypt.compareSync(password, currentUser.password))
  ) {
    // 验证成功的操作
    // 设置session
    session.userId = currentUser.id;
    // 设置token
    let token = await tokenUtil.setToken(user);
    return (ctx.body = {
      errno: 0,
      msg: "登录成功",
      data: {
        ...currentUser,
        token,
      },
    });
  } else {
    return (ctx.body = {
      errno: 0,
      msg: "密码错误",
    });
  }
};
// 注册接口
exports.registerAction = async (ctx, next) => {
  // 取值
  let user = ctx.request.body;
  // 根据请求的cookie的USER_SID来拿到对应的session
  let session = ctx.session;
  // 验证数据类型与长度
  let { username, password, phonenumber } = user;

  if (username.length > 16 || username.length < 3) {
    return (ctx.body = {
      code: 100,
      msg: "用户名的长度应为3～16位的任意值",
    });
  } else if (password.length > 16 || password.length < 6) {
    return (ctx.body = {
      code: 100,
      msg: "用户名的长度应为6～16位的任意值",
    });
  } else if (!/^1[3456789]\d{9}$/.test(phonenumber)) {
    return (ctx.body = {
      code: 100,
      msg: "手机号的格式有误",
    });
  }

  try {
    // 查询用户是不是已经存在了
    let findResult = await dbUtil.query(
      "SELECT * FROM ?? WHERE username = ? ",
      ["user_info", username]
    );

    if (findResult.length >= 1) {
      // 用户存在
      return (ctx.body = {
        code: 500,
        msg: "用户已存在，请更换用户名",
      });
    }
    // 密码加密
    user.password = bcrypt.hashSync(user.password, 8);
    // 插入表
    await dbUtil.insertData("user_info", user);
    // 查询当前插入的数据
    let lastItem = await dbUtil.query(
      "select * from `user_info` order by id DESC limit 1"
    );

    let currentUser = lastItem[0];
    // 设置session
    session.userId = currentUser.id;
    // 设置token
    let token = await tokenUtil.setToken(user);
    return (ctx.body = {
      errno: 0,
      msg: "用户已添加",
      data: {
        ...currentUser,
        token,
      },
    });
  } catch (err) {
    ctx.body = err;
  }
};
