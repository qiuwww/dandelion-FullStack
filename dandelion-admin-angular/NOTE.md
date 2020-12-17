

## 文件说明

browserslist: 表示要支持的浏览器版本
polyfills.ts: ts的填充库，腻子脚本

### app目录

存放当前项目的，模块，服务，根结点及组件。

组件的select，就是暴露的组件的名称。这里就不是用标签来区分了。


## 组件

### 创建组件
```
ng generate|g component components/news(创建组件的路径)
```
组件在app根module内声明之后，就可以在其下所有组件内引用

### 数据的定义与引用

需要在组件的component文件内声明变量 --> 然后在html文件内引用

### 数据模版渲染，{{}}

定义属性的类型有如下：

- public： 默认取值，表示当前类里面可以使用，也可以在类外面使用；
- protected： 保护类型，只有在当前类和它的子类中可以访问
- private：私有，只在当前类中可以访问。

推荐的类型定义，依据TS的标准来定义一个属性：

```
public msg:String = "这里是ts标准的数据类型"; 
public num:String = 1234; 
public userinfo:Object = {
  name: '张三',
  age: 20
};
// 只定义不赋值
public message:Any;

```
### 绑定属性，使用 []，来关联数据
```
[title]="num" // 给标签添加title属性,取值使用引号取值，复合属性也是一样；

输出html标签：
public content:String = "<b></b>";
需要绑定数据，添加[innerHTML]="content",才可以输出
```
### 数组渲染 ngFor

```
// 方式一
public arr:Any[] = [{ 
    name: 'qiu',
    age: 20
},{
    name: 'wei',
    age: 90
}];
// 方式二
public arr:Array<Object> = [{
    name: 'qiu',
    age: 20
},{
    name: 'wei',
    age: 90
}];

// 使用指令 *ngFor 来循环数据
// let key = index, 拿到index

<h1>定义普通循环</h1>
<ul>
  <li *ngFor="let i of arr; let key = index">
    {{i.name}} - {{key}}
  </li>
</ul>
```
### 条件渲染，ngIf
```
<p *ngIf="flag">如果为真，我就显示</p>
<p *ngIf="!flag">如果为假，我就显示</p>
```
### ts的数据类型如下：
- String
- Number
- Any：表示任意类型；
- Object

### 选择渲染，ngSwitch

```
这里的score，最好在modlue中做好状态分类。
<span [ngSwitch]="score > 60">
  <p *ngSwitchCase="true">
    分数大于60
  </p>
  <p *ngSwitchCase="false">
    分数小于60
  </p>
  <p *ngSwitchDefault>
    默认分数
  </p>
</span>
```

### 设置class与style ngClass ngStyle

这里需要动态的设置class与style，本质上都是一个属性的绑定，所以与上边的title类似。
```
<div [ngClass]="{'red': true, 'blue': false}"> 
    这是一个 div
</div>

public flag=false;

<div [ngClass]="{'red': flag, 'blue': !flag}">
    这是一个 div 
</div>


public arr = [1, 3, 4, 5, 6];

<ul>
    <li *ngFor="let item of arr; let i = index"> 
        <span [ngClass]="{'red': i==0}">{{item}}</span>
    </li>
</ul>
```

```
// 这里的green，是一个常量，需要添加引号。
<div [ngStyle]="{'background-color':'green'}">
    你好 ngStyle
</div>

public attr='red'; 
// 这里是一个变量，就不需要再添加引号
<div [ngStyle]="{'background-color':attr}">你好 ngStyle</div>
```

### 引入图片

1. 本地图片，图片要放在assets/images下边。
2. 网络图片，可变地址，地址要在module中声明。
```
public picUrl: String = 'http://pic1.win4000.com/wallpaper/2/59478966a352b.jpg';

<img src="assets/images/1.gif" alt="本地图片">
<img [src]="picUrl" alt="网络图片" style="height: 200px;">
```

### 管道，过滤器，有默认的管道与自定义的管道 |
日期的格式化

```
public today=new Date();
    
<p>{{today | date:'yyyy-MM-dd HH:mm:ss' }}</p>
```

[常用的管道]http://bbs.itying.com/topic/5bf519657e9f5911d41f2a34

### 事件（click）

```
<h2>事件</h2>

<div [ngClass]="{'red': flag, 'blue': !flag}" (click)="changeColor()">
  这是一个 div， 被绑定了一个事件，用于切换自己的颜色
</div>

// 事件， 与react写法类似，与生命周期放在同级
  changeColor() {
    this.flag = !this.flag;
  }

```

```
// 这里的关键字必须是 $event ,不然拿不到值。keyup都是小写
<form action="">
  <fieldset>
    <label for="name">输入name：</label>
    <input type="text" value="" (keyup)="getInputEvent($event)">
  </fieldset>
</form>

// 表单事件
  getInputEvent(e){
    console.log(e);
  }
```

### 双向数据绑定，mvvm [(moduleName)]="value"

- 与vue的操作基本一致，vue使用`v-model="obj.key"`；
- 双向数据绑定，也就是省去了一个反向的数据回传的操作，一般的事件是可以解决这个问题的。

```
需要在app.module.ts内引入 FormsModule
import { FormsModule } from '@angular/forms';
imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
// 关联数据与输入标签，通过model来实现关联
<fieldset>
  <input type="text" [(ngModel)]="inputValue" />
  <p>输出结果：{{inputValue}}</p>
</fieldset>

```

## 服务 services

- 公共的方法的封装。
- 服务是一个类，使用的时候需要进行实例化操作。
- 这里具体构造一个数据缓存的方法。
- **组件之间相互方法不可调用**，所以要抽离公共的方法到服务services中，抽离组件中的公共方法。
- 组件可以随意的调用服务，但是服务是没发调用组件的。组件也没法调用组件，但是服务之间是可以相互调用的。


### 创建服务

```
创建一个服务到指定的文件夹下。
ng g service services/storage
```

### 使用服务
1. 首先要在app内引入服务，并且添加到`providers`选项下边。
```
// 服务引入，并且配置
import {StorageService} from './services/storage.service';
```

2. 在组件中使用服务的时候，**还要单独再次引入该服务**。
```
//引入服务
import { StorageService } from '../../services/storage.service';

// 组件中使用，这样当前的组件也就获得了一个storage的属性，也就是一个引用对象，他的类型是StorageService。
constructor(public storage:StorageService) {

}

// 引用服务
ngOnInit() {
  var todolist:any=this.storage.get('todolist');
}
```

## dom操作，ViewChild（装饰器）

- 可以直接使用**document对象**的方法获取节点内容。不需要react与vue中的**ref**了。一般在`ngAfterViewInit`生命周期内操作。
- 使用`ViewChild`来操作。
  ```
  // 1. 在当前的组件内引入 
  import { Component, OnInit, ViewChild } from '@angular/core';
  // 2. 添加名称，#开头
  <p #myDom>通过ViewChild来获取dom节点</p>
  // 3. 关联dom节点到组件内变量上，变量声明，只能拿到当前的组件内的元素。
  @ViewChild('myDom') myDom:any;
  // 4. 当前组件内操作dom，nativeElement
  let attrEl = this.myDom.nativeElement;
  ```
### 通过ViewChild实现父组件调用子组件

1. 给子组件添加名称；
2. 后续操作与之前一样，拿到了**子组件**的实例，可以随意操作子组件。

### 给函数的参数添加类型

```
set(key:any, value:any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
```


## 父子组件及兄弟组件之间的通信
parent，child1，child2

### 父组件给子组件传参数，@Input

1. 父组件中绑定自己的参数给子组件，同时可以传递this和方法名
  ```
  <app-child1 [msg]="msg1" [parent]="this" ></app-child1>
  ```
2. 子组件中接收，参数，对象与方法
  ```
  import { Component, OnInit, Input } from '@angular/core';

  // 这里有多少个就需要写多少个，所以最好用对象传值吧
  @Input() msg:string;
  @Input() parent:object;

  constructor() { }

  ngOnInit() {
    console.log("这里是拿到parent的数据 ", this.msg);
    console.log("这里是拿到parent的数据 parent ", this.parent);
  }
  ```
### 父组件调用子组件的方法
- 使用ViewChild拿到子组件，可以直接操作；
- 通过使用output，反向传递的关系。**不建议使用**，操作方法如下：
```
// 1. 子组件中定义数据
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
/*用EventEmitter和output装饰器配合使用 <string>指定类型变量*/
// EventEmitter，广播数据，事件驱动
  @Output() private outer = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    let i = 1;
    setInterval(() => {
      this.outer.emit("来自子组件child2的信息" + i);
      ++i;
    }, 2000);
    ;
  }
// 2. 父组件中绑定参数，() 表示反向绑定的
<app-child2 (outer)="parentRun($event)"></app-child2>

```

### 非父子组家的通信，非通讯，但是也可以传递数据的方法
1. 公共的服务，可以实现非父子组件的通信；
2. LocalStorage | SessionStorage
3. Cookie


## 生命周期函数
- 组件，共8个；
- 指令；
查看pdf文档吧。

### ngOnInit
- 组件初始化完成；
- 这个时候就可以处理dom了；
- 多用来请求数据。

### ngAfterViewInit， 视图加载完成
- 这个时候dom肯定加载完成了。

### ngOnDestory
注意清除指令和组件的调用。



## Rxjs
直接参见demo对比使用吧。

- 流形式；
- 异步编程工具；
- 相对于promise，功能更强大；
- 异步可控，更简单；

### 常见的异步编程的几种方式：

- 回调函数；
- 事件监听/发布订阅；
- promise
- rxjs

### rxjs对比promise，很相似
then -> subscribe
resolve -> observe.next

```
// Promise 处理异步:
let promise = new Promise(resolve => { setTimeout(() => {
  resolve('---promise timeout---'); }, 2000);
});
promise.then(value => console.log(value));


// RxJS 处理异步:
import {Observable} from 'rxjs';
let stream = new Observable(observer => { setTimeout(() => {
  observer.next('observable timeout'); }, 2000);
});
stream.subscribe(value => console.log(value));
// 可以取消执行
setTimeout(() => {
  //取消执行 
  disposable.unsubscribe();
}, 1000);
```

从上面列子可以看到 RxJS 和 Promise 的基本用法非常类似，除了一些关键词不同。Promise 里面用的是 then() 和 resolve()，而 RxJS 里面用的是 next() 和 subscribe()。
从上面例子我们感觉Promise 和 RxJS 的用法基本相似。其实Rxjs相比Promise 要强大很多。 比如 Rxjs 中可以中途撤回、Rxjs 可以发射多个值、Rxjs 提供了多种工具函数等等。

### 工具函数 map， filter


## angular，数据请求
需要当作一个服务；
直接参看配套文档吧。

### 数据请求的方式
- HttpClientModule，内置模块`/common/http`，post方式需要添加headers， 通过HttpHeaders运行;
- JSONP方式，借助`HttpClientJsonpModule`，模块；
- 借助外部库，`Axios`


## 路由模块

直接参看配套文档吧。
- 组件还是需要在根节点`declearation`;


### 创建路由模块
```
  ng generate module app-routing --module=app
```

### 使用
1. 路由定义 Routes
```
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'parent',
    component: ParentComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
```
2. 路由使用， routerLink routerLinkActive
```
  // 如果被选中，就会被添加class为active
  <a [routerLink]="['/home']" routerLinkActive="active">HOME</a>
```
这里必然成对出现，有入口，当然也需要有输出


### 跳转传值

#### 路径传值 params
```
  <a [routerLink]="['/child/', 1]" routerLinkActive="active">children1</a>
  <a [routerLink]="['/child/2']" routerLinkActive="active">children2</a>
  // 匹配路径
  // 动态路由，路径参数
  {
    path: 'child/:id',
    component: Child1Component
  },
  // 页面内获取参数
  import { ActivatedRoute } from '@angular/router'
  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    console.log("route: ", this.route);
    // 通过subscrce获取
    console.log("route params: ", this.route.params);
  }
```

#### get传值，查询参数 queryParams
```
<a [routerLink]="['/home']" [queryParams]="{id: 3}" routerLinkActive="active">children3</a>
// 获取参数
this.route.queryParams.subscribe(data => {
      console.log("queryParams: ", data);
    })
```

### 使用js脚本跳转

```
import { ActivatedRoute, Router } from '@angular/router';
constructor(public route: ActivatedRoute, public router: Router) {}
jumpUrl() {
    this.router.navigate(['/child/', 2])
  }
```

### 嵌套路由

```
 <a [routerLink]="['/parent/home']" routerLinkActive="active">/parent/home</a>
 {
    path: 'parent',
    component: ParentComponent,
    children: [{
      path: 'home',
      component: HomeComponent
    }]
  },
```

### angular的路由模式

https://blog.csdn.net/qq_40882724/article/details/81536219

SPA应用一般有两种：html5 history模式（ http://localhost:4200/user），看起来更加美观，然而如没有后台支持，刷新页面就会报：Cannot GET /pagurl之类的错，一种是Hash模式（ http://localhost:4200/#/user）。

``` js
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
```