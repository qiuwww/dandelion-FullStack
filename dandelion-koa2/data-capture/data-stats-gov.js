/**
 * 测试抓取国家数据
 * 1. 获取指标的相关信息；http://data.stats.gov.cn/adv.htm?m=findZbXl&db=hgnd&wd=zb&treeId=A030602；
 * 2. 获取详细的数据：http://data.stats.gov.cn/easyquery.htm?m=QueryData&dbcode=hgnd&rowcode=sj&colcode=zb&wds=%5B%5D&dfwds=%5B%7B%22wdcode%22%3A%22zb%22%2C%22valuecode%22%3A%22A010303%22%7D%5D&k1=1552382126971
 */
// 通过treeId控制
// level0: http://data.stats.gov.cn/adv.htm?m=findZbXl&wd=zb&db=hgnd
// level1: http://data.stats.gov.cn/adv.htm?treeId=A01&m=findZbXl&wd=zb&db=hgnd
// level2: http://data.stats.gov.cn/adv.htm?treeId=A010201&m=findZbXl&wd=zb&db=hgnd

const dbUtil = require("../database/db-util");
const request = require("request");

// 获取指标的详情
const zb = {
  async run() {
    this.currentDate = new Date();
    this.getAndSaveDataByLevel(0);
  },
  // Promise.all请求同一级的数据
  async getAndSaveDataByLevel(level = 0) {
    let self = this;
    let promiseWrap = this.promiseWrap;
    let res = (await this.queryData(level)) || [];
    let promiseArr = [];
    let saveData = [];
    if (res.length === 0 && level === 0) {
      promiseArr.push(promiseWrap(""));
    } else {
      res.forEach(item => {
        promiseArr.push(promiseWrap(item.id));
      });
    }
    const resAll = await Promise.all(promiseArr);
    resAll.forEach(item => {
      try {
        saveData = saveData.concat(JSON.parse(item));
      } catch (e) {
        console.log("error: ", item);
      }
    });
    self.insertData(saveData, level);
    if (res.length === 0 && level !== 0) {
      return;
    } else {
      self.getAndSaveDataByLevel(++level);
    }
  },
  promiseWrap(treeId = "") {
    const url =
      "http://data.stats.gov.cn/adv.htm?m=findZbXl&wd=zb&db=hgnd&treeId=" +
      treeId;
    return new Promise((res, rej) => {
      // 这里数据量非常大的时候就会报错
      request.post(url, (error, response, body) => {
        if (error) {
          console.log("error:", error); // Print the error if one occurred
          console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
          rej(error, response);
        } else {
          res(body);
        }
      });
    });
  },
  async queryData(level = 0) {
    let len;
    switch (level) {
      case 0:
        len = 0;
        break;
      case 1:
        len = 3;
        break;
      case 2:
        len = 5;
        break;
      case 3:
        len = 7;
        break;
      case 4:
        len = 9;
        break;
      case 5:
        len = 11;
        break;
      case 6:
        len = 16;
        break;
    }
    // 这里要分级别查询数据
    return await dbUtil.query(
      `select * from data_stats_gov_zb where length(trim(id)) = ${len} order by id`
    );
  },
  // 插入数据，这里的数据只取了部分，不然太多了
  insertData(data = [], level) {
    let self = this;
    data.forEach(item => {
      if (level === 0) {
        item.save_date = self.currentDate;
        // 数据太多，只取经济与人口的
        if (item.id === "A02" || item.id === "A03") {
          dbUtil.insertOrUpdateData("data_stats_gov_zb", item);
        }
        return;
      }
      // 只保留01，02，03类的，多的不要了
      if (/[456789A-Z]/.test(item.id.slice(1))) {
        return;
      }
      dbUtil.insertOrUpdateData("data_stats_gov_zb", item);
    });
  }
};

const zb_details = {
  run() {
    this.getDataAndSave();
  },
  // 查询指标，并获取最近五十年的数据
  async getDataAndSave() {
    let self = this;
    let zbs = (await this.getZbs()) || [];
    zbs.forEach(item => {
      if (!item.exp.length) {
        return;
      }
      self.requestData(
        encodeURI(
          JSON.stringify([
            {
              wdcode: "zb",
              valuecode: item.id
            },
            {
              wdcode: "sj",
              valuecode: "LAST80"
            }
          ])
        )
      );
    });
  },
  async getZbs() {
    return await dbUtil.query(`select * from data_stats_gov_zb order by id`);
  },
  async requestData(dfwds) {
    let self = this;
    let url = `http://data.stats.gov.cn/easyquery.htm?m=QueryData&dbcode=hgnd&rowcode=zb&colcode=sj&wds=%5B%5D&dfwds=${dfwds}&k1=${new Date().getTime()}`;
    request.post(url, (error, response, body) => {
      if (error) {
        console.log(error);
        return;
      }
      let datanodes = JSON.parse(body);
      datanodes =
        (datanodes.returndata && datanodes.returndata.datanodes) || [];
      datanodes.forEach(item => {
        const obj = {
          code: item.code,
          ...item.data
        };
        const wds = item.wds;
        wds.forEach(_item => {
          obj[_item.wdcode] = _item.valuecode;
        });
        obj.id = obj.code;

        delete obj.code;
        self.insertData(obj);
      });
    });
  },
  async insertData(item) {
    await dbUtil.insertOrUpdateData(
      "data_stats_gov_zb_details",
      item,
      item.code
    );
  }
};

zb.run();
zb_details.run();
