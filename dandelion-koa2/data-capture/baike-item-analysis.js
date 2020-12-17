/**
 * 找到一个关键次，以此为出发点，查询与此相关的数据
 * https://baike.baidu.com/item/%E9%9C%B9%E9%9B%B3%E5%B8%83%E8%A2%8B%E6%88%8F/155118?fr=aladdin
 * 抓取百度百科的关联数据
 */

/**
 * 思路
 * 1. 请求页面，获取基本的数据；
 * 2. 分析lemma-summary部分的内容，找出其中的链接，继续后续的请求；
 * 3. 控制迭代次数；
 */

const dbUtil = require("../database/db-util");
const request = require("request");
const cheerio = require("cheerio");

/**
 * 注意区分
 * 类型：
 * 怎么间隔操作，而不是连续操作
 */

const baike = {
  async run({ db, startUrl, maxLevel, branch }) {
    await this.newTable(db);
    this.currentDate = new Date();
    this.origin = "https://baike.baidu.com";
    this.maxLevel = maxLevel;
    this.branch = branch;
    this.requestAndParse({ db, url: startUrl });
  },
  // 创建表
  async newTable(db) {
    // 如果存在就创建新的table
    await dbUtil.query("DROP TABLE IF EXISTS `" + db + "`;");
    await dbUtil.query(
      "CREATE TABLE `" +
        db +
        "` (id char(16) NOT NULL, `level` int(8) DEFAULT NULL,`title` char(128) DEFAULT NULL,`vote` int(16) DEFAULT NULL,`share` int(16) DEFAULT NULL,`subtitle` char(128) DEFAULT NULL, `key_info` text, `desc` text,`links` varchar(6400) DEFAULT NULL, `href` char(128) DEFAULT NULL, `authority` text, `parent_node` char(16) DEFAULT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
    );
    // 清空表
    // await dbUtil.query(`truncate table ${db}`);
  },
  // id: 当前词条的id，parent_node上一级词条的id
  requestAndParse({ db, url, id, level = 1, parent_node = "" }) {
    let self = this;
    const href = self.origin + url;
    console.log("href: ", href);
    request(href, async function(error, response, body) {
      if (error) {
        return;
        console.log("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        // console.log("body:", body); // Print the HTML for the Google homepage.
      }

      try {
        const $ = cheerio.load(body);
        // 获取desc中的链接ƒ
        id = id || self.getId(href);
        const links = await self.getLinks($);
        let shareAndVote = await self.getShareAndVote(id);
        const item = {
          id,
          level,
          parent_node,
          href: decodeURI(href),
          title: $(".lemmaWgt-lemmaTitle-title h1").text(),
          subtitle: $(".lemmaWgt-lemmaTitle-title h2").text(),
          // 这两个数据需要单独请求接口
          vote: shareAndVote.likeCount || "",
          share: shareAndVote.shareCount || "",
          key_info: $(".lemmaWgt-lemmaTitle-keyInfo")
            .text()
            .replace(/\n/g, ""),
          desc: $(".lemma-summary")
            .text()
            .replace(/\n/g, ""),
          links: links && JSON.stringify(links),
          authority: $(".authorityListPrompt")
            .text()
            .replace(/\n/g, "")
        };
        await self.saveData(db, item);
        // level增加一级
        level++;
        // 这里继续后续的请求
        links.forEach((_item, _index) => {
          if (level > self.maxLevel || _index >= self.branch) {
            return;
          }
          self.requestAndParse({
            db,
            url: _item.href,
            id: _item.id,
            level,
            parent_node: id
          });
        });
      } catch (_e) {
        console.log("_e: ", _e);
      }
    });
  },
  getShareAndVote(id) {
    let self = this;
    return new Promise((res, rej) => {
      request(
        `${self.origin}/api/wikiui/sharecounter?lemmaId=${id}&method=get`,
        function(e, r, body) {
          try {
            res(JSON.parse(body));
          } catch (_e) {
            console.log(
              "获取vote和share出错，请求的地址: ",
              `${self.origin}/api/wikiui/sharecounter?lemmaId=${id}&method=get`
            );
            // rej(_e);
          }
        }
      );
    });
  },
  getId(href = "") {
    href = href.split("?")[0];
    let matchRes = href.match(/[\d]+$/);
    return matchRes ? matchRes[0] : "";
  },
  getLinks($) {
    let links = $(".lemma-summary a[target='_blank']");
    let arr = [];
    links.each((index, item) => {
      let $item = $(item);
      arr.push({
        name: $item.text(),
        href: $item.attr("href"),
        id: $item.attr("data-lemmaid")
      });
    });
    return arr;
  },
  async saveData(db, item) {
    let id = item.id;
    if (!id) {
      return;
    }
    try {
      await dbUtil.insertData(db, item);
    } catch (e) {
      console.log("只插入，不更新：", e.sqlMessage);
    }
  }
};

// baike.run({
//   db: "baike_related_items_js",
//   startUrl: encodeURI("/item/javascript/321142"),
//   maxLevel: 10,
//   branch: 2
// });
baike.run({
  db: "baike_related_items_pili",
  startUrl: encodeURI("/item/霹雳布袋戏/155118"),
  maxLevel: 5,
  branch: 4
});
