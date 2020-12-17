/**
 * @module storage
 * @description 用于参数本地化
 */

export const storage = {
  /**
   * 存储localStorage
   */
  setStore(name, content = "") {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    if (window.localStorage) {
      window.localStorage.setItem(name, content);
    } else {
      window[name] = content;
    }
  },

  /**
   * 获取localStorage
   */
  getStore(name) {
    if (!name) return;
    let item;
    if (window.localStorage) {
      item = window.localStorage.getItem(name);
    } else {
      item = window[name];
    }
    if (item) {
      return JSON.parse(item);
    }
    return "";
  },

  /**
   * 删除localStorage
   */
  removeStore(name) {
    if (!name) return;
    if (window.localStorage) {
      window.localStorage.removeItem(name);
    } else {
      delete window[name];
    }
  }
};
