export default function fetchRequest(url, method = "POST", data) {
  // 域名、body、header等根据各自项目配置，还有部分安全，加密方面的设置
  const host = "http://movie.douban.com";
  const requestUrl = `${host}${url}`;
  const body = data || {};
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": ""
  };
  return fetch(requestUrl, {
    method,
    // headers: headers,
    // body
  })
    .then(res => {
      if (res) {
        return res.json();
      } else {
        throw new Error("server error");
      }
    })
    .catch(err => {
      // 处理错误
    });
}
