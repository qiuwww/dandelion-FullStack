/**
 * 抓取页面数据《豆瓣历年的电影排行》
 * 网络地址：https://movie.douban.com/annual/2018，切换年份(>2015)
 * 数据存储在单独的表内
 */

/**
 * 页面分析
 * 1. 首先请求年度分类：https://movie.douban.com/ithil_j/activity/movie_annual2015，这里可以拿到目录。
 * 2. 请求年度分类：https://movie.douban.com/ithil_j/activity/movie_annual2017/widget/0，这里按照目录的数组的索引。注意区分这里的kind_str，展示方式不同。
 * 3. 请求评论：https://movie.douban.com/ithil_j/activity/movie_annual2017/widget/6/comments?random=0&start=0&limit=6，这里的限制可以修改。
 */

/**
 * years：年度的menu
 * widget：年度的分类
 * movies：movies的表
 */

const dbUtil = require("../database/db-util");
const request = require("request");

/**
 * 获取目录数据，目录下的widget_infos关联到douban_annual_widget_infos表中
 */
const doubanAnnualMenu = {
  run() {
    this.currentDate = new Date();
    this.deleteDataBase();
    this.getDataYearByYear();
  },
  // 删除表
  async deleteDataBase() {
    // await dbUtil.query("truncate table douban_annual_years");
    // await dbUtil.query("truncate table douban_annual_widget_infos");
  },
  getDataYearByYear() {
    const current = new Date().getFullYear();
    for (let year = 2015; year < current; year++) {
      this.captureDataByYear(year);
    }
    // this.queryAllData("douban_annual_widget_infos");
  },
  // 抓取数据
  async captureDataByYear(year) {
    let self = this;
    const url = "https://movie.douban.com/ithil_j/activity/movie_annual" + year;
    request(url, async function(error, response, body) {
      body = JSON.parse(body);
      const { r, status } = body;
      if (!r && status.code == 200) {
        let obj = body["res"];
        // 处理数据
        const payload = obj.payload;
        const widget_infos = obj.widget_infos;
        const widget_infos_ids = self.getWidget_infosId(widget_infos);
        obj = {
          ...obj,
          ...payload,
          widget_infos_ids: JSON.stringify(widget_infos_ids),
          currentUrl: url
        };
        obj["save_date"] = self.currentDate;
        delete obj.payload;
        delete obj.widget_infos;
        // 保存到数据库中
        await self.insert_douban_annual_years(obj);
      }
    });
  },
  getWidget_infosId(widget_infos = []) {
    return widget_infos.map(item => {
      return item.id;
    });
  },
  async insert_douban_annual_years(obj) {
    await dbUtil.insertOrUpdateData("douban_annual_years", obj, obj.id);
  },
  async queryAllData(tableName) {
    // douban_annual_years || douban_annual_widget_infos
    let data = await dbUtil.query(`select * from ${tableName} order by id`);
    return data;
  }
};

/**
 * 获取年份的分类数据，查询menu的id和年份url_name来请求接口抓取数据
 * https://movie.douban.com/ithil_j/activity/movie_annual2018/widget/7
 */
const doubanAnnualWidget = {
  run() {
    this.currentDate = new Date();
    this.deleteDataBase();
    // 获取年份相关的数据
    this.menuData = doubanAnnualMenu.queryAllData("douban_annual_years");
    this.traversingQueryByYear();
  },
  // 删除表
  async deleteDataBase() {
    // await dbUtil.query("truncate table douban_annual_widget_infos");
    // await dbUtil.query("truncate table douban_annual_subjects");
  },
  // 获取要请求的年份及年份的列表长度
  async traversingQueryByYear() {
    let self = this;
    let numberObj = await this.queryYearByYear();
    for (let key in numberObj) {
      self.captureWidgetByIndex(key, numberObj[key]);
    }
  },
  // 遍历menu，后遍历ids来请求
  async queryYearByYear() {
    let menuData = (await this.menuData) || [];
    let res = {};
    menuData.forEach(item => {
      // 这里只与长度有关，不是按照id来请求的
      res[item.url_name] = JSON.parse(item.widget_infos_ids).length;
    });
    return res;
  },
  // 遍历请求单个widget
  async captureWidgetByIndex(url_name, len) {
    let self = this;
    new Array(len).fill("").forEach((item, index) => {
      self.captureWidget(
        `https://movie.douban.com/ithil_j/activity/${url_name}/widget/${index}`,
        url_name.substr(-4)
      );
    });
  },
  // 处理数据
  async captureWidget(url, year) {
    let self = this;
    request(url, async function(error, response, body) {
      body = JSON.parse(body);
      const { r, status } = body;
      if (!r && status.code == 200) {
        let widget_infos_obj = Object.assign({}, body.res);
        let payload = widget_infos_obj.payload;
        let movies = [].concat(widget_infos_obj.subjects);
        movies.save_date = self.currentDate;
        widget_infos_obj = {
          ...body.res,
          ...payload
        };
        delete widget_infos_obj.payload;
        delete widget_infos_obj.subject;
        delete widget_infos_obj.subjects;
        delete widget_infos_obj.user;
        // 删除了太长的字段
        delete widget_infos_obj.people;
        delete widget_infos_obj.html;
        delete widget_infos_obj.data;
        widget_infos_obj.save_date = self.currentDate;
        await self.insert_douban_annual_movies(movies, year);
        await self.insert_douban_annual_widget_infos(widget_infos_obj);
      }
    });
  },

  // 插入movies表
  async insert_douban_annual_movies(movies = [], year) {
    let self = this;
    movies.forEach(async item => {
      let movie = Object.assign({}, item);
      delete movie.rating_stats;
      delete movie.color_scheme;
      movie.year = year;
      movie.save_date = self.currentDate;
      await dbUtil.insertOrUpdateData("douban_annual_movies", movie, movie.id);
    });
  },

  // 插入widget_infos表
  async insert_douban_annual_widget_infos(widget_infos_obj) {
    await dbUtil.insertOrUpdateData(
      "douban_annual_widget_infos",
      widget_infos_obj,
      widget_infos_obj.id
    );
  }
};

doubanAnnualMenu.run();
doubanAnnualWidget.run();

/**
 * todo
 * 1. 根据已有数据，生成需要的字段的数据；
 * 2. 过滤掉不需要的数据；
 */
