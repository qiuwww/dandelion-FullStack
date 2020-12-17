const dbUtil = require("../../database/db-util");
const { moviesDataCapture } = require("../../data-capture/douban-movies");
// 获取电影列表
exports.listAction = async (ctx, next) => {
  // 取值
  try {
    // 添加查询参数的时候
    let sql = "";
    let {
      filter: { title, type },
      pagination: { pageIndex, pageSize },
      sort: { sortKey, sortValue }
    } = ctx.request.body;

    // filter条件
    // WHERE title=title and type=??
    if (title) {
      sql += ` Where title='${title}'`;
    }
    if (type) {
      sql += ` Where type=${type}`;
    }
    // 根据搜索条件获取总数
    let total = await dbUtil.query("SELECT COUNT(*) as total FROM ?? " + sql, [
      "douban_chart_movies"
    ]);
    // 排序条件，排序在前，limit在后, ASC正序，DESC倒序
    if (sortValue) {
      sortValue = sortValue === "descend" ? "ASC" : "DESC";
      sql += ` order by ${sortKey} ${sortValue}`;
    } else {
      sql += ` order by vote_count_multiply_by_score DESC`;
    }
    // 添加分页信息
    sql += ` limit ${(pageIndex - 1) * pageSize}, ${pageSize}`;
    // 获取的结果列表
    let list = await dbUtil.query("SELECT * FROM ??" + sql, [
      "douban_chart_movies"
    ]);
    // 用户存在
    return (ctx.body = {
      errno: 0,
      data: list,
      ...total[0],
      msg: "获取豆瓣电影列表成功"
    });
  } catch (err) {
    return (ctx.body = err);
  }
};
// 获取types的枚举列表
exports.typesAction = async (ctx, next) => {
  // 取值
  try {
    // SELECT FOUND_ROWS();
    let findResult = await dbUtil.query("SELECT * FROM ??", [
      "douban_chart_types"
    ]);
    // 用户存在
    return (ctx.body = {
      errno: 0,
      data: findResult,
      msg: "获取豆瓣类型列表成功"
    });
  } catch (err) {
    return (ctx.body = err);
  }
};
// 抓取数据的服务，或者说是更新数据
exports.dataCapture = async (ctx, next) => {
  try {
    // 这里被限制ip访问了，😂
    moviesDataCapture.run();
  } catch (e) {}
};

// 基础get接口
exports.queryAction = async (ctx, next) => {
  let { sql } = ctx.request.body;
  try {
    let findResult = await dbUtil.query(sql);
    return (ctx.body = {
      errno: 0,
      data: findResult,
      msg: "查询数据成功"
    });
  } catch (e) {
    return (ctx.body = err);
  }
};
