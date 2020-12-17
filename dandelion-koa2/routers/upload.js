const router = require("koa-router")();
const Upload = require("../app/controllers/upload");
// 获取test页面，同步上传的测试页面
// 测试同步 图片上传
router.get("/sync/test-page/upload", async ctx => {
  // 当GET请求时候返回表单页面， form表单上传，action
  let html = `
      <h1>dandelion-koa2 upload demo</h1>
      <form method="POST" action="/upload/sync/upload-file" enctype="multipart/form-data">
        <p>file upload enctype="multipart/form-data"</p>
        <span>picName(表单的其他字段):</span><input name="picName" type="text" placeholder="请输入文件名"/><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `;
  ctx.body = html;
});

// 异步，测试图片上传，这里的页面是后端
// 页面存在于 views/upload-async
router.get("/async/test-page/upload", async ctx => {
  let title = "upload pic async test";
  // 这里渲染页面是异步的
  await ctx.render("upload-async", {
    title
  });
});

// 同步上传的接口
router.post("/sync/upload-file", Upload.syncUploadFileAction);

// ajax上传接口
router.post("/async/upload-file", Upload.asyncUploadFileAction);

module.exports = router;
