/**
 * 测试抓取豆瓣电影，抓取排行榜
 * 1. 获取分类排行榜的类型；https://movie.douban.com/chart，解析html获取类型；
 * 2. 根据类型获取下边的内容：https://movie.douban.com/typerank?type_name=%E7%BA%AA%E5%BD%95%E7%89%87&type=1&interval_id=90:80&action=；
 */
const dbUtil = require("../database/db-util");
const request = require("request");
const cheerio = require("cheerio");
const { getQueryString } = require("../utils/parse");
const typesDataCapture = {
  run() {
    return new Promise(async (res, rej) => {
      try {
        this.currentDate = new Date();
        let resMsg = await this.getHtmlParseAndSave();
        res(resMsg);
      } catch (e) {
        res(e);
      }
    });
  },
  // 获取页面，并解析内容
  getHtmlParseAndSave(db = "douban_chart_types") {
    let self = this;
    return new Promise(async (res, rej) => {
      try {
        // 被限制ip访问了
        // await dbUtil.query(`truncate table ${db}`);
        request("https://movie.douban.com/chart", function(
          error,
          response,
          body
        ) {
          console.log("error:", error); // Print the error if one occurred
          console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
          // console.log("body:", body); // Print the HTML for the Google homepage.
          const $ = cheerio.load(body);
          const types = $(".types span a");
          types.each((index, item) => {
            const url = $(item).attr("href");
            dbUtil.insertOrUpdateData(db, {
              type: getQueryString(url, "type"),
              type_name: getQueryString(url, "type_name"),
              save_date: self.currentDate
            });
          });
          res(db + "获取完成！");
        });
      } catch (e) {
        rej(e);
      }
    });
  }
};

/**
 * 请求分类下的列表
 * https://movie.douban.com/j/chart/top_list_count?type=1&interval_id=90%3A80
 * 这个时候interval_id是一个评分的单位，需要多个请求合并发送，100-90，90-80，80-70，70-60，。。。
 */

const moviesDataCapture = {
  async run() {
    await typesDataCapture.run();
    this.currentDate = new Date();
    this.getTypesAndTraversing();
  },
  async getTypesAndTraversing() {
    let self = this;
    let types =
      (await dbUtil.query(`select * from douban_chart_types order by id`)) ||
      [];
    types.forEach(item => {
      self.getMoviesByType(item.type);
    });
  },
  // 按照范围进行请求，这里注意去除重复的选项
  async getMoviesByType(type = 1, str = 100, end = 20) {
    let promiseArr = [];
    let self = this;
    let promiseWrap = this.promiseWrap;
    while (str > end) {
      promiseArr.push(promiseWrap(type, `${str}:${str - 10}`));
      str -= 10;
    }
    const resAll = await Promise.all(promiseArr);
    let res = [];
    resAll.forEach(item => {
      res = res.concat(item);
    });
    res = [...new Set(res)];
    self.insertMoviesData(res, type);
  },
  insertMoviesData(res = [], type) {
    let self = this;
    res.forEach(item => {
      item.regions = JSON.stringify(item.regions);
      item.types = JSON.stringify(item.types);
      item.rating = JSON.stringify(item.rating);
      item.actors = JSON.stringify(item.actors);
      item.type = type;
      item.save_date = self.currentDate;
      item.vote_count_multiply_by_score = item.vote_count * item.score;
      dbUtil.insertOrUpdateData("douban_chart_movies", item, item.id);
    });
  },
  promiseWrap(type = 1, interval_id = "100:90") {
    return new Promise((res, rej) => {
      request(
        `https://movie.douban.com/j/chart/top_list?type=${type}&interval_id=${encodeURIComponent(
          interval_id
        )}&action=&start=0&limit=20`,
        (error, response, body) => {
          if (error) {
            console.log("error:", error); // Print the error if one occurred
            console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
            rej(error, response);
          } else {
            res(JSON.parse(body));
          }
        }
      );
    });
  },
  // 清洗数据

};
// 被限制登陆了：检测到有异常请求从你的 IP 发出
// moviesDataCapture.run();
exports.moviesDataCapture = moviesDataCapture;
