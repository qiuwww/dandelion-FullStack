import YTInvokeNetworkQuery from "../native/YTInvokeNetworkQuery";
import YTInvokeLogin from "../native/YTInvokeLogin";
import config from "../config/config";
import { storage } from "./storage";

// 返回数据格式化
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(
    `Request Failed, because of statusCode = ${response.status}`
  );
  error.response = response;
  throw error;
}

function checkLogin(response) {
  if (response.code === 700) {
    // YTInvokeLogin.open();
  } else {
    return response;
  }
}

/**
 * 合并url，兼容处理
 * @param baseUrl 公共基础的url
 * @param apiName 请求路径
 * @returns url
 */
function mergeUrl(baseUrl, apiName) {
  if (apiName.charAt(0) !== "/") {
    return baseUrl + "/" + apiName;
  } else {
    return baseUrl + apiName;
  }
}

/**
 * 请求方法
 * @param type
 * @param baseUrl
 * @param apiName
 * @param body
 * @param header
 * @returns {Promise.<TResult>|*}
 */

function requestUrl(type, apiName, body) {
  // 获取请求头信息
  let baseUrl = storage.getStore("baseUrl") || "";
  if (!baseUrl) {
    throw Error({ msg: "baseUrl为空" });
  }
  // 获取请求头信息
  return YTInvokeNetworkQuery.getNetworkQuery()
    .then(res => {
      console.log("HttpTag", "url:" + mergeUrl(baseUrl, apiName) + "?" + res);
      console.log(
        "fetchPost UrlArg:",
        baseUrl,
        "bodyArg:",
        JSON.stringify(body),
        "YTInvokeNetworkQuery.getNetworkQuery:",
        res
      );
      let headerParams = res.headerParams;
      console.log(headerParams, "headerParamsFromIos");
      return fetch(mergeUrl(baseUrl, apiName), {
        method: type,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          basicParams: headerParams
        },
        timeout: 20,
        mode: "cors",
        body: {
          ...body
        }
      })
        .then(checkStatus, function(error) {
          throw error;
        })
        .then(parseJSON, function(error) {
          throw error;
        })
        .then(
          result => {
            console.log("HttpTag", result);
            console.debug("request.js result: ", result);
            return result;
          },
          function() {
            return { msg: "网络访问失败，请稍后重试。" };
          }
        );
    })
    .catch(error => {
      console.log("HttpTag", "params error" + error);
      console.debug("request.js getNetworkQuery: ", error);
      return { msg: "请求参数出错" };
    });
}

// /**
//  * 判断baseUrl
//  * 目前用最简单的判断 openapp开头就是baseUrl_openapi
//  * @param apiName
//  */
// function judgeBaseUrl(apiName) {
//   if (
//     apiName &&
//     (apiName.startsWith("/openapp/") || apiName.startsWith("openapp/"))
//   ) {
//     return config.baseUrl_openapi;
//   }
//   return config.baseUrl;
// }

// /**
//  * 请求for JKZJ
//  * @param url
//  * @param body
//  * @param header
//  * @returns {Promise}
//  */
// export function fetchPostTest(url, body, header) {
//   return requestUrl("POST", judgeBaseUrl(url), url, body, header);
// }

// /**
//  *
//  * @param url
//  * @param body
//  * @returns {Promise}
//  */
// export function fetchPostPromise(url, body, header) {
//   return new Promise((resolve, reject) => {
//     fetchPost(url, body, header).then(res => {
//       if (res.code === 0) {
//         resolve(res);
//       } else {
//         reject(res);
//       }
//     });
//   });
// }

// export let fetchTest = (url, body, header) => {
//   return fetch(`${config.baseUrl}${url}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     timeout: 5,
//     mode: "cors",
//     body: JSON.stringify({
//       ...body
//     })
//   })
//     .then(checkStatus)
//     .then(parseJSON);
// };

export const fetchPost = (url, body) => {
  return requestUrl("POST", url, body);
};
export const fetchGet = (url, body) => {
  return requestUrl("GET", url, body);
};
