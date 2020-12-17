const dbUtil = require("../database/db-util");

const getTotalRate = async function() {
  let douban_annual_movies =
    (await dbUtil.query(`select * from douban_annual_movies order by id`)) ||
    [];
  resArr = douban_annual_movies.map(item => ({
    id: item.id,
    title: item.title,
    url: item.url,
    year: item.year,
    totalRate: parseInt(item.rating * item.rating_count)
  }));
  resArr = resArr.sort((a, b) => b.totalRate - a.totalRate);
  resArr = resArr.slice(0, 20);
  console.log("getTotalRate: ", resArr);
};

const getDoubanMovies = async function(type = 2) {
  let douban_chart_movies =
    (await dbUtil.query(
      `select * from douban_chart_movies where type = ${type} order by id`
    )) || [];
  resArr = douban_chart_movies.filter(item => {
    return {
      title: item.title,
      url: item.url,
      release_date: item.release_date,
      totalRate: parseInt(item.score * item.vote_count)
    };
  });
  resArr = resArr.sort((a, b) => b.totalRate - a.totalRate);
  resArr = resArr.slice(0, 20);
  console.log("%cgetDoubanMovies: ", "color: red;font-size: 20px;", resArr);
};

getDoubanMovies();
getTotalRate();
module.exports = { getTotalRate, getDoubanMovies };
