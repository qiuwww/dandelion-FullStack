/**
 * Created by chenwei on 2017/7/13.
 */

export const isEmpty = target => {
  if (target == undefined) return true; //undefined or null
  if (typeof target === "object") return target.length === 0;
  return target === "" || target === "null";
};

export const isArray = o => {
  return Object.prototype.toString.call(o) === "[object Array]";
};
