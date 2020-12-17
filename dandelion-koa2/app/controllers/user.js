const dbUtil = require("../../database/db-util");
// 获取用户列表
exports.listAction = async (ctx, next) => {
  // 取值
  const { pageSize, pageIndex } = ctx.request.body;
  const start = pageSize * (pageIndex - 1);
  const end = pageSize * pageIndex;
  try {
    let total = await dbUtil.query("SELECT COUNT(*) as total FROM ??", [
      "user_info"
    ]);
    let findResult = await dbUtil.query(
      "SELECT * FROM ?? order by id " + "limit " + start + "," + end,
      ["user_info"]
    );
    // 用户存在
    return (ctx.body = {
      errno: 0,
      data: findResult,
      ...total[0],
      msg: "获取用户列表成功"
    });
  } catch (err) {
    return (ctx.body = err);
  }
};
// 获取用户列表
exports.deleteAction = async (ctx, next) => {
  // 取值
  const { id } = ctx.request.body;

  try {
    await dbUtil.query("DELETE FROM ?? WHERE id = " + id, ["user_info"]);
    return (ctx.body = {
      errno: 0,
      msg: "删除用户列表成功"
    });
  } catch (err) {
    return (ctx.body = err);
  }
};

exports.detailAction = async (ctx, next) => {
  // 取值
  const id = ctx.params.id;
  try {
    let user = await dbUtil.query("SELECT * FROM ?? WHERE id = " + id, [
      "user_info"
    ]);
    return (ctx.body = {
      errno: 0,
      data: user[0],
      msg: "或许用户详情成功"
    });
  } catch (err) {
    return (ctx.body = err);
  }
};

exports.saveAction = async (ctx, next) => {
  // 取值
  const body = ctx.request.body;
  if (body.id) {
    // 更新用户
  } else {
    // 新建用户
  }
  try {
    let user = await dbUtil.query("SELECT * FROM ?? WHERE id = " + id, [
      "user_info"
    ]);
    return (ctx.body = {
      errno: 0,
      data: user[0],
      msg: "或许用户详情成功"
    });
  } catch (err) {
    return (ctx.body = err);
  }
};
