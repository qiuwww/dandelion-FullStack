# admin

实现关键的后台管理系统的功能。

## 技术主线

koa@latest + angular@latest

### koa 参考文档

- https://koa.bootcss.com/
- https://chenshenhai.github.io/koa2-note/note/request/get.html

## 功能调研

### 需要实现的功能

1. 使用模板，渲染页面；
2. 注册、登录、忘记密码、登出，包括图形验证码与短信验证码；
3. 图片上传；
4. form 表单提交数据，各类型的表单输入类型；
5. 列表的增加、渲染、编辑、删除、查询搜索功能；
6. 渲染图表，渲染地图信息；
7. 抓取数据；
8. 用户管理，权限管理；
9. 充值设置；
10. 产品管理；
11. 留言管理，这里可以使用富文本编辑器；
12. 系统日志功能；

## others

http://www.dimeng.net/products/xfjr_system.html
以迪蒙网贷系统为例，讲一下后台包含的功能模块：
一、登录
二、用户管理（用户信息、认证管理等）
三、业务管理（借 款管理、应收管理、合同等）
四、财务管理（提现、放 款、充值、交易等）
五、统计管理（资金统计、用户统计、业务统计等）
六、运营管理（宣传管理、广告、消息管理、活动管理等）
七、基本设置（业务、财务、用户、站点等基本设置）
八、系统管理（后台账号管理、系统日志、数据库等）

### 其他的

第一：网站的系统管理：管理员管理，也称权限管理。可以新增管理员及修改管理员密码;数据库备份，为保证您的数据安全本系统采用了数据库备份功能;上传文件管理，管理你增加产品时上传的图片及其他文件。

第二：产品管理：产品类别新增修改管理，产品添加修改以及产品的审核。

第三：企业信息：可设置修改企业的各类信息及介绍。

第四：订单管理：查看订单的详细信息及订单处理。

第五：会员管理：查看修改删除会员资料，及锁定解锁功能可在线给会员发信。

第六：新闻管理：能分大类和小类新闻，不再受新闻栏目的限制。

第七: 留言管理：管理信息反馈及注册会员的留言，注册会员的留言可在线回复，未注册会员可使用在线发信功能给于答复。

第八: 营销网络：修改营销网络栏目的信息。

第九：友情链接：新增修改友情链接。

第十：全新模版功能，在线编辑修改模版。

第十一：全新挂接数据库，在线表编辑，添加数据表，编辑数据库，加添编辑文件挂接网站等等。

第十二：系统日志功能，每一步操作都有记录，系统更安全。

第十三：中英文切换，简体繁体切换。

第十四：还有多开源的代码，以便站长二次开发。

## 具体开发过程

### 1. 使用 cli 工具`koa-generator`;

```bash
sudo npm install -g koa-generator
$ koa2 admin -e && cd admin // 支持koa1和koa2，分别创建不同类型的项目
```

### 2. 在这个基础上添加一些常用功能；

- 添加**app**目录，在 app 文件夹里面出现我们熟悉的 controller、service、model（控制层，业务层，对象层）；
- 还有一个是**config**文件，放一下配置文件的 js；

### 3. 安装依赖并运行；

```bash
$ npm i
$ npm start
```

### 4. ejs 模版实现公共；最终的 html 文件都要放在这个位置，因为他们是一个整体。

添加`head.ejs`,实现模块的复用，ejs 似乎只能这样来实现复用，不能实现插口。

### 5. 文件更改重启项目功能，nodemon 已实现；

### 6. 添加数据库操作模块；`https://chenshenhai.github.io/koa2-note/note/mysql/info.html`。

`pool.getConnection() -> connection.query() -> connection.release()`

1. 添加 mysql 模块

```bash
npm install --save mysql
```

1. 创建连接池`mysql.createPool`
   这个时候需要导入 sql 文件，需要先创建数据库`database`，可以是分表`TABLE`来导入，或者整个数据库来导入。

```js
 const mysql = require('mysql')
 // 创建数据池
 const pool  = mysql.createPool({
   host     : '127.0.0.1',   // 数据库地址
   user     : 'root',    // 数据库用户
   password : '123456'   // 数据库密码
   database : 'admin_database'  // 选中数据库
 })
```

1. 在数据池中进行会话操作`getConnection`
   一般情况下操作数据库是很复杂的读写过程，不只是一个会话，如果直接用会话操作，就需要每次会话都要配置连接参数。所以这时候就需要连接池管理会话。

```js
// 在数据池中进行会话操作
pool.getConnection(function(err, connection) {
  connection.query("SELECT * FROM my_table", (error, results, fields) => {
    // 结束会话
    connection.release();
    // 如果有错误就抛出
    if (error) throw error;
  });
});
```

1. 结束会话`release`
   一个事件就有一个从开始到结束的过程，数据库会话操作执行完后，就需要关闭掉，以免占用连接资源。

```js
connection.release();
```

1. 终止连接，应该一个开启的服务不会用到

```js
connection.end(function(err) {
  // The connection is terminated now
});
// 或者;
connection.destroy();
```

### 7. 增删改查

INSERT、SELECT、DELETE、UPDATE

#### 关注点

- 使用 postman 工具的时候，注意 post 方法使用 body 参数需要设置参数的类型为`x-www-form-urlencoded`
- `koa-router`的接口类型有如下：
  - get
  - post
  - put
  - del | delete
  - all
  - patch

### 8. 设置与获取 cookies，一种本地存储的策略

- 在客户端存入数据，可以在一个请求中存入然后在别的请求中应用前面存入的数据。
- 存入之后，只要是同域的接口每次都会发送到服务端。
- 但是在有些时候是需要保存一些客户端的请求信息，识别客户端的某些状态，智能的、有针对性的去分析某些客户端的习惯。

```js
ctx.cookies.get(name, [options]); // 读取上下文请求中的cookie
ctx.cookies.set(name, value, [options]); // 在上下文中写入cookie
```

### 对应 cookies 的 session

- 利用 Seesion 来验证用户是否已登录，利用 Session 来保存验证码。
- Session 是在服务器端生成的，存储在服务器端，即存在内存中。

#### Cookie 和 Session 的区别

1、Cookie 是存在客户端，Session 存在服务器
2、安全性要求高的用 Session，要求低用 Cookie
3、Cookie 只能存储字符串，Session 可以存储任何信息
4、Cookie 如果不设置时间，当关闭浏览器时，Cookie 就失效，不会在本地保存；Session 的生命周期是一个会话（当启动浏览器到关闭浏览器）
5、在存储相对持久的信息时，应考虑使用 Cookie，因为 Cookie 可以以文件的形式，存储在客户端。在进行一些登录的验证及信息拦截的时候，可以使用 Session。

## node 的接口

### util 模块，封装常用的函数

### pipe

- 做读写文件的搬运工
- 一切能流动的东西，都是我的管中水！例如：读写文件，网络请求，数据传输等等~。
- 管道流，管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
  > https://blog.csdn.net/u011413061/article/details/50311457

```js
// 设置test.txt 文件内容如下：
// hello node
// 创建 main.js 文件, 代码如下：
var fs = require("fs");
// 创建一个可读流
var readerStream = fs.createReadStream("input.txt");
// 创建一个可写流
var writerStream = fs.createWriteStream("output.txt");
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
console.log("程序执行完毕");
// 查看 output.txt 文件的内容：
// $ cat output.txt
// hello node
// 管道流操作实例
```

## so important --inspect，开启调试模式

- 需要在要执行的文件之前。
- 添加之后在 source 内设置断点，然后重新请求。

### 支持 es6 的 import/export

- 需要 node 9.0 以上；
- 需要设置文件扩展名为`mjs`，使用的时候如下：`node --experimental-modules ./es/index.mjs`
- Loader Hooks 使用步骤
  > 自定义 loader 规则
  > 启动的 flag 要加载 loader 规则文件
  > 例如：node --experimental-modules --loader ./custom-loader.mjs ./index.js

## request 与 req，response 与 res 的关系与区别，在 koa 框架之下

应该是 req 和 res，属于 node 直接的对象，response 与 request 属于 koa 封装请求与返回之后的结果。

### koa 的处理逻辑，洋葱结构

/\*\*

- koa 的处理逻辑
- 每收到一个 http 请求，koa 就会调用通过 app.use()注册的 async 函数，并传入 ctx 和 next 参数。
  \*/
  /\*\*
- middleware
- 为什么要调用 await next()？
- 原因是 koa 把很多 async 函数组成一个处理链，
- 每个 async 函数都可以做一些自己的事情，
- 然后用 await next()来调用下一个 async 函数。
- 我们把每个 async 函数称为 middleware，这些 middleware 可以组合起来，
- 完成很多有用的功能。
  \*/

### module.parent

最先引用该模块的模块。

## 开发过程中遇到的问题

1. 经过 bodyParse 之后的数据格式统一；
   由于请求接口的编码方式不同，导致请求的数据的格式不同。
   - string（text/plain）
   - object（application/json; charset=utf-8）

## 使用 TS 来开发 KOA

需要来配置`nodemon.json`文件，配置监控文件，配置改变之后需要执行的文件，
源文件使用 ts 来写，然后生成到某个文件夹内，之后再执行重启服务的命令，这样就可以实现`ts -> js -> koa`。

当然开发的时候，最好是使用 vsc 来运行监控任务，实时编译文件。

## 数据库条件查询 where

```sql
-- 但最好对字符串预处理一下
-- 加上trim去掉空格
select * from Table where len(trim(ItemName))<5
-- oracle底下用length表示字符长度，length('我')为1，
-- lengthb表示字节长度，lengthb('我')为2，看情况使用
```
