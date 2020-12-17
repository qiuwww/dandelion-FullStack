[参考文档](https://github.com/RxJS-CN/RxJS-Ultimate-CN)

### Subject

有着双重特性，它同时拥有 Observer 和 Observable 的行为。

发出值

```js
subject.next(1);
subject.next(2);
```

订阅值

```js
const subscription = subject.subscribe((value) => console.log(value));
```

总结以下，它可以进行以下操作：

```js
next([value])
error([error message])
complete()
subscribe()
unsubscribe()
```

#### 用途

- 作为代理
  Subject 可以作为代理，也就是从另一个流接收值，而 Subject 的订阅者可以监听另外的这个流。就像是复制了一份，且改变流向。
- 以总线方式在组件之间进行通信的能力是我能想到的最显而易见的用例。

### 事件添加

参考 aa-row 的 window.resize。

## 连续 subscribe，像 promise 一样，连续 then 操作

```js
// 调用
this.getChartMovies().subscribe(res => {});
// 定义
getChartTypes() {
  let res = this.doubanService.getTypes();
  res.subscribe(res => {
    if (res.errno) {
      this.typesList = [];
      return;
    }
    this.typesList = res.data;
  });
  // 这里使用of，继续向后传递，如果直接 return res，就会导致请求发送两次
  return of(res);
}
```

## 处理多个请求完成时候的事件，类似 Promise.all 的功能，使用 forkJoin

函数签名: `forkJoin(...args, selector : function): Observable`
当所有 observables 完成时，发出每个 observable 的最新值。

```js
// 定义函数
makeRequest(value: string, delayDuration: number) {
  // 模拟 http 请求
  // 这里必须是一个值
  return of(`Complete: ${value}`).pipe(
    delay(delayDuration)
  );
}
// 发送请求
forkJoin(
  this._myService.makeRequest('Request One', 2000),
  this._myService.makeRequest('Request Two', 1000),
  this._myService.makeRequest('Request Three', 3000)
)
// 舰艇结果
.subscribe(([res1, res2, res3]) => {
  this.propOne = res1;
  this.propTwo = res2;
  this.propThree = res3;
});
```

## map 操作符

对源 observable 的每个值应用投射函数。

函数签名: map(project: Function, thisArg: any): Observable。
