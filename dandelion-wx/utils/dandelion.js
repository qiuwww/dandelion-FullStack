const addData = require('./allData.js');
console.log("allData", addData);

const URI = 'https://douban.uieee.com/v2/movie';
// const URI = 'https://douban.wxxx.com/v2/movie';
// const URI = 'https://api.douban.com/v2/movie';
// const URI = 'https://127.0.0.1:8989/v2/movie';

const fetch = require('./fetch')

/**
 * 抓取豆瓣电影特定类型的API
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String} type   类型，例如：'coming_soon'
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
function fetchApi(type, params) {
  return fetch(URI, type, params)
}

/**
 * 获取列表类型的数据
 * @param  {String} type   类型，例如：'coming_soon'
 * @param  {Number} page   页码
 * @param  {Number} count  页条数
 * @param  {String} search 搜索关键词
 * @return {Promise}       包含抓取任务的Promise
 */
function find(type, page = 1, count = 20, search = '') {
  const params = { start: (page - 1) * count, count: count, city: getApp().data.currentCity }
  console.log("find", type, search);

  return new Promise((resolve, reject) => {
    resolve(addData);
  });
  // return fetchApi(type, search ? Object.assign(params, { q: search }) : params)
  //   .then(res => res.data)
}

/**
 * 获取单条类型的数据
 * @param  {Number} id     电影ID
 * @return {Promise}       包含抓取任务的Promise
 */
function findOne(id) {
  console.log("findOne", id);
  return new Promise((resolve, reject) => {
    addData.subjects.forEach(item => {
      if(id == item.id) {
        resolve(item);
      }
    })
  });
  // return fetchApi('subject/' + id)
  //   .then(res => res.data)
}

module.exports = { find, findOne }
