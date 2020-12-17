/**
 * @desc 获取当前页面的url中的查询参数
 * @param {String} key - 需要获取的简值对的key
 * @param {String} str - 需要获取的地址，可以是url也可以是一段字符串
 * @return {Function}
 */
module.exports.getQueryString = (str = "", name) => {
  str = str.includes("?") ? str.split("?")[1] : str;
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = str.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
module.exports.object2json = (obj = {}) => JSON.stringify(obj);
