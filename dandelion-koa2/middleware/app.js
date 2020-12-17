

const Koa = require('./node_modules/koa'); // koa v2
const convert = require('./node_modules/koa-convert'); // koa1的中间件，在koa2中使用需要转换
const loggerGenerator = require('./logger-generator');
const loggerAsync = require('./logger-async');
const app = new Koa();

app.use(convert(loggerGenerator()));
app.use(loggerAsync());

app.use((ctx) => {
    ctx.body = 'hello world!'
});

app.listen(3000);

console.log('the server is starting at port 3000');