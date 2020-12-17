// 测试同步 图片上传
const path = require("path");
const { syncUploadFile } = require("../services/upload-sync");
const { asyncUploadFile } = require("../services/upload-async");
const dbUtil = require("../../database/db-util");
// 同步保存图片
exports.syncUploadFileAction = async (ctx, next) => {
  // 上传文件请求处理
  let result = { success: false };
  let serverFilePath = path.join(__dirname, "./../../public/upload-files");
  // 上传文件事件
  // 从上下文中拿到文件内容
  console.log("syncUploadFileAction", serverFilePath);
  result = await syncUploadFile(ctx, {
    fileType: "album", // common or album
    path: serverFilePath
  });
  ctx.body = result;
};

// 异步保存图片
exports.asyncUploadFileAction = async ctx => {
  // 上传文件请求处理
  let result = { success: false };
  let serverFilePath = path.join(__dirname, "./../../public/upload-files");
  // 上传文件事件
  result = await asyncUploadFile(ctx, {
    fileType: "album2",
    path: serverFilePath
  });
  ctx.body = result;
};
