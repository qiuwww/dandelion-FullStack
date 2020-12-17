# dandelion-koa2

dandelion-koa2，使用 koa2 实现的一个数据抓取与分析平台后端
[github 地址](https://github.com/qiuwww/dandelion-koa2)

## 项目架构

```bash
dandelion-koa2
  |—— app // 控制器与后端服务
  |—— bin/www // koa2脚手架，启动入口文件
  |—— data-capture // 数据抓取脚本
  |   |—— douban-annual.js // 抓取豆瓣年报的相关数据
  |   |—— douban-movies.js // 抓取豆瓣分类的电影信息
  |   |—— data-stats-gov.js // 抓取国家数据中心的分类数据
  |   |—— baike-item-analysis.js // 抓取百度百科的此条关联信息，CREATE TABLE
  |—— database // mysql数据库操作常用方法
  |—— middleware // 用到的中间件
  |—— NOTE // 开发过程中的学习记录
  |—— public // koa2的静态文件
  |—— routers // koa2的路由
  |—— test // koa2的接口测试用例
  |—— utils // 用到的一些工具函数
  |—— views // koa2的视图文件
  |—— app.js // koa2的入口文件
  |—— congif.js // 基本配置文件
  |—— dandelion.sql // 数据库导出文件
```

## 项目启动

- 安装 mysql 数据库，并打开；
- 连接数据库；
- `npm run dev`： 开发模式，支持自动重启；
- `npm run pro`： 生产模式；

## 数据来源

### 脚本抓取豆瓣的电影

2015-2018 的电影排行，并存储在 mysql 中

脚本地址：`data-capture/douban-annual`；
运行命令：`npm run douban-annual`；
数据存储在：

- douban_annual_years： 保存历年的目录；
- douban_annual_widget_infos：保存历年目录对应的分类；
- douban_annual_movies： 对应电影的对象，可以进行很多操作；

说明：

- 借助 request 进行数据接口请求；
- 使用 mysql 进行 mysql 数据库操作；
- 数据存储使用 musql 数据库；

### 爬取 douban 的分类电影

按照排行榜的分类来抓取数据，代码查看：`data-capture/douban-movies`

### 抓取国家数据网站的数据

[国家数据](http://data.stats.gov.cn)

[目标地址](http://data.stats.gov.cn/adv.htm?cn=C01)

### 接口参数猜测

- wds 中的 valuecode 为区域代码；
- 猜测 dfwds 中 wdcode 是**sj**的时候，valuecode 中传入的是**查询时间**；
- 当 wdcode 为**zb**的时候，valuecode 中传入的是**标签**的代码；

### 使用代码来创建数据库的表

```js
  // 创建表
  async newTable(db) {
    // 如果存在就创建新的table
    await dbUtil.query("DROP TABLE IF EXISTS `" + db + "`;");
    await dbUtil.query(
      "CREATE TABLE `" +
        db +
        "` (id int(16) NOT NULL, `level` int(8) DEFAULT NULL,`title` char(128) DEFAULT NULL,`vote` char(16) DEFAULT NULL,`share` char(16) DEFAULT NULL,`subtitle` char(128) DEFAULT NULL, `key_info` text, `desc` text,`links` varchar(6400) DEFAULT NULL, `href` char(128) DEFAULT NULL, `parent_node` int(16) DEFAULT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
    );
    // 清空表
    // await dbUtil.query(`truncate table ${db}`);
  },
```

创建 MySql 的表时，表名和字段名外面的符号 ` 不是单引号，而是英文输入法状态下的反单引号，也就是键盘左上角 esc 按键下面的那一个 ~ 按键，坑惨了。

反引号是为了区分 MySql 关键字与普通字符而引入的符号，一般的，表名与字段名都使用反引号。

## dandelion

蒲公英

## 结合前端项目

[dandelion-admin-angular](https://github.com/qiuwww/dandelion-admin-angular)
