const supertest = require("supertest");
const chai = require("chai");
// 这里来启动服务吧
const app = require("../app");

const expect = chai.expect;
const request = supertest(app.listen());

describe("开始测试demo test的GET请求", () => {
  it("测试/test/string请求", done => {
    // request用于在服务端发送请求，常用于爬数据
    request
      .get("/test/string")
      .expect(200)
      .end((err, res) => {
        // 断言描述
        expect(res.body).to.be.an("object");
        expect(res.body.success).to.be.an("boolean");
        expect(res.body.data).to.be.an("string");
        done();
      });
  });

  it("测试/getNumber.json请求", done => {
    request
      .get("/test/getNumber.json")
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.success).to.be.an("boolean");
        expect(res.body.data).to.be.an("number");
        done();
      });
  });
});
