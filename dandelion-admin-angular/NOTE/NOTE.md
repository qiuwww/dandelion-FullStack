# dandelion-admin-angular

还是先写静态页面吧，后续的操作后续再添加

开发前端部分的代码，使用 angular7+

熟练掌握 Angular 词汇表 https://angular.cn/guide/glossary

**要明白，页面访问的基础是地址，对应的是页面的路由，所以一切的问题都要从路由这里来思考。
一切都是需要用路由来串起来。https://angular.cn/guide/router**

## ng 的基本原理

### 架构概览

#### 模块 NgModule

- Angular 的基本构造块是 NgModule，它为组件提供了**编译的上下文环境**。
- NgModule 会把相关的代码收集到一些功能集中。
- Angular 应用就是由一组 NgModule 定义出的。
- 应用至少会有一个用于引导应用的根模块，通常还会有很多特性模块。
- NgModule 可以将其组件和一组相关代码（如服务）关联起来，形成功能单元。

#### 组件 Components

@Component() 装饰器表明紧随它的那个类是一个组件，并提供模板和该组件专属的元数据。

#### 服务与依赖注入 Services and dependency injection

对于与特定视图无关并希望跨组件共享的数据或逻辑，可以创建服务类。 服务类的定义通常紧跟在 “@Injectable()” 装饰器之后。该装饰器提供的元数据可以让你的服务作为依赖被注入到客户组件中。
依赖注入（或 DI）让你可以保持组件类的精简和高效。有了 DI，组件就不用从服务器获取数据、验证用户输入或直接把日志写到控制台，而是会把这些任务委托给服务。

- 路由 Routing

## development process

记录当前的开发流程

### 创建项目

使用 cli 来创建项目，参考官网说明[https://angular.cn/guide/quickstart#step-2-create-a-workspace-and-initial-application]

```
    ng new dandelion-admin-angular
    ng serve --open
    ng serve --port 4206
```

### 修改项目的架构

## 工作空间与项目文件的结构

官方文档[https://angular.cn/guide/file-structure]

### 工作空间

- angular.json
  > 工作区中所有项目的 CLI 配置，包括 CLI 使用的构建选项、运行选项、测试工具选项（比如 Karma、Protractor）,angular 命令行工具的配置文件，在这个文件中可以设置一系列的默认值，也可以配置项目编译时要包含的文件。例如第三方包,
- app/
  > 含组件文件，其中定义了应用逻辑和数据。
- assets/
  > 包含图像文件和其它文件，当构建应用时会被原样赋值到构建目标中。
- main.ts
  > 应用的主入口点。使用 `JIT` 编译器编译应用，**并引导应用的根模块 AppModule 来运行在浏览器中**。你也可以为 CLI 的 build 和 serve 命令添加 --aot 标志，来使用 `AOT` 编译器 而不必修改任何代码。
- test.ts
  > 单元测试的主入口点，其中带有一些特定于 Angular 的配置。
- tsconfig.app.json tsconfig.spec.json
  > typescript 编辑器的配置文件

当工作空间的文件结构就绪之后，你可以在命令行上运行 `ng generate` 命令，来给这个初始应用添加功能和数据。

### 修改文件

1. 修改 baseurl`<base href="./">`，保证 build 之后代码可以本地运行。
2. 在 environments 中声明**接口参数 api_url**。
3. `app/`下添加：
   - pages 文件夹，用于区分单独的页面，
   - 添加 components 用于保存公共组件。
4. `assets/`下添加：
   - images，图片资源文件

## 注意区分 module 与 component

## 服务，差不多的意思就与 vuex 和 mobx 类似

组件不应该直接获取或保存数据，它们不应该了解是否在展示假数据。 它们应该聚焦于展示数据，而把数据访问的职责委托给某个服务。

## RXJS，Observable 对象的一些方法

#### disposed，似乎是打印的意思

如果你需要提前释放这些资源或取消订阅的话，那么你可以对返回的 可被清除的资源（Disposable） 调用 dispose 方法。

#### distinctUntilChanged 操作符将阻止 Observable 发出相同的元素。

如果后一个元素和前一个元素是相同的，那么这个元素将不会被发出来。如果后一个元素和前一个元素不相同，那么这个元素才会被发出来。

#### map

map 操作符将源 Observable 的每个元素应用你提供的转换方法，然后返回含有转换结果的 Observable。

# 基础操作

## 数据绑定的方式

从数据源到视图、从视图到数据源以及双向的从视图到数据源再到视图。
https://angular.cn/guide/template-syntax#binding-syntax-an-overview

## 绑定目标

数据绑定的目标是 DOM 中的某些东西。 这个目标可能是（元素 | 组件 | 指令的）property、（元素 | 组件 | 指令的）事件，或(极少数情况下) attribute 名。
https://angular.cn/guide/template-syntax#binding-targets

```
[], 一般表示属性property
```

### 自定义指令

写一个结构型指令https://angular.cn/guide/structural-directives#write-a-structural-directive

#### 使用

```
<p *appUnless="condition">Show this sentence unless the condition is true.</p>
```

#### 创建指令很像创建组件。

导入 Directive 装饰器（而不再是 Component）。

导入符号 Input、TemplateRef 和 ViewContainerRef，你在任何结构型指令中都会需要它们。

给指令类添加装饰器。

设置 CSS 属性选择器 ，以便在模板中标识出这个指令该应用于哪个元素。

#### 定义

```
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
}
```

指令的选择器通常是把指令的属性名括在方括号中，如 [appUnless]。 这个方括号定义出了一个 CSS 属性选择器。

该指令的属性名应该拼写成小驼峰形式，并且带有一个前缀。 但是，这个前缀不能用 ng，因为它只属于 Angular 本身。 请选择一些简短的，适合你自己或公司的前缀。 在这个例子中，前缀是 my。

指令的类名用 Directive 结尾，参见风格指南。 但 Angular 自己的指令例外。

你将学到星号(\*)这个简写方法，而这个字符串是一个微语法，而不是通常的模板表达式。 Angular 会解开这个语法糖，变成一个 <ng-template> 标记，包裹着宿主元素及其子元素。 每个结构型指令都可以用这个模板做点不同的事情。

有时你会希望只有当特定的条件为真时才重复渲染一个 HTML 块。 你可能试过把 *ngFor 和 *ngIf 放在同一个宿主元素上，但 Angular 不允许。这是因为你在一个元素上只能放一个结构型指令。(因为要转换为 ng-templete)

#### 渲染分组元素，空元素

Angular 的 <ng-container> 是一个分组元素，但它不会污染样式或元素布局，因为 Angular 压根不会把它放进 DOM 中。

#### 组合使用 ngFor 与 ngIf

```html
<div>
  Pick your favorite hero (<label
    ><input type="checkbox" checked (change)="showSad = !showSad" />show
    sad</label
  >)
</div>
<select [(ngModel)]="hero">
  <ng-container *ngFor="let h of heroes">
    <ng-container *ngIf="showSad || h.emotion !== 'sad'">
      <option [ngValue]="h">{{h.name}} ({{h.emotion}})</option>
    </ng-container>
  </ng-container>
</select>
```

## 1. component 组件

[官方文档]https://angular.cn/guide/architecture-components#introduction-to-components

- 如何定义？
- 如何使用？

1. 使用指令来生成组件：

```bash
  #! 添加登录界面
  ng generate component login
  在哪个文件夹下运行就会在哪个文件夹内生成。
```

调用`ng generate component --help`查看指令帮助。

- `--module` Allows specification of the declaring module.

2. 添加路由出口
   在 app.component.html 中添加出口`<router-outlet></router-outlet>`

## 2. router 路由处理

- 如何定义路由？
- 如何通过 url 来跳转页面？
- 如何传递参数与获取参数？

### 定义路由

1. 使用指令生成路由：

```bash
  #! src/app/
  ng generate module app-routing --flat --module=app

  --flat 把这个文件放进了 src/app 中，而不是单独的目录中。
  --module=app 告诉 CLI 把它注册到 AppModule 的 imports 数组中。
```

2. 添加路由定义
   典型的 Angular 路由（Route）有两个属性：
   - path：一个用于匹配浏览器地址栏中 URL 的字符串。
   - component：当导航到此路由时，路由器应该创建哪个组件。

## 服务 services

用于提供数据请求，相当于 controller 的角色。

### 创建服务

```
  ng generate service pages/user/user --module pages/user/user --flat
```

## components 组件，基础页面构成

## module 一个模块 NgModule

宏观来讲，NgModule 是组织 Angular 应用的一种方式，它们通过 @NgModule 装饰器中的元数据来实现这一点。
https://angular.cn/guide/ngmodule-api
有 路由， 服务， 根目录等模块

#### routerLink

#### routerLinkActive， 激活时添加的类是

每个 a 标签上的 RouterLinkActive 指令可以帮用户在外观上区分出当前选中的“活动”路由。

当与它关联的 RouterLink 被激活时，路由器会把 CSS 类 active 添加到这个元素上。

你可以把该指令添加到 a 元素或它的父元素上。

#### routerLinkActiveOptions

RouterLinkActive 指令会基于当前的 RouterState 对象来为激活的 RouterLink 切换 CSS 类。

这会一直沿着路由树往下进行级联处理，所以父路由链接和子路由链接可能会同时激活。

要改变这种行为，可以把 [routerLinkActiveOptions] 绑定到 {exact: true} 表达式。 如果使用了 { exact: true }，那么只有在其 URL 与当前 URL 精确匹配时才会激活指定的 RouterLink。

#### 代码跳转 url 地址操作

this.router.navigateByUrl('/')

#### 获取当前页面的 url

this.route.url

#### 对于组件传递参数，props

在组件内部需要调用@Input 来接受

## 开发中遇到的一些问题

### 1. 嵌套 ngFor 与 ngIf

需要使用标签包裹，由于同一个标签不可以有多个指令在运行。

https://blog.csdn.net/chelen_jak/article/details/82895627

```html
<ion-list>
  <ng-container *ngFor="let item of data">
    <ion-item *ngIf="item.gender===1">
      <ion-avatar item-start>
        <img src="{{item.avatar}}" />
      </ion-avatar>
      <h2>{{item.name}}</h2>
      <p>{{item.description}}</p>
      <p item-end>{{item.gender?'男':'女'}}, {{2017 - item.birthYear}} 岁</p>
    </ion-item>
  </ng-container>
</ion-list>
```

### 第三方库的引用

1. 声明变量；

```
// 添加第三方库的时候，需要提前声明。
  declare var Chart: any;
```

2. head 中引用；`<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>`

## ngModule

- https://angular.cn/guide/ngmodules
- NgModules 用于配置注入器和编译器，并帮你把那些相关的东西组织在一起。
- Angular 模块把组件、指令和管道打包成内聚的功能块，每个模块聚焦于一个**特性区域、业务领域、工作流或通用工具**。
- @NgModule 的参数是一个元数据对象，用于描述如何编译组件的模板，以及如何在运行时创建注入器。 它会标出该模块自己的组件、指令和管道，通过 exports 属性公开其中的一部分，以便外部组件使用它们。 NgModule 还能把一些服务提供商添加到应用的依赖注入器中。
- 模块还可以把服务加到应用中。 这些服务可能是内部开发的（比如你自己写的），或者来自外部的（比如 Angular 的路由和 HTTP 客户端）。
- 使用一个根模块`app.module`去启动我们的应用,然后使用许多的功能模块去丰富我们的应用,扩展我们应用的功能.这些全部依靠我们的 NgModule 装饰器

### API 说明

```
interface NgModule {
     // providers: 这个选项是一个数组,需要我们列出我们这个模块的一些需要共用的服务
     //            然后我们就可以在这个模块的各个组件中通过依赖注入使用了.
    providers : Provider[]
     // declarations: 数组类型的选项, 用来声明属于这个模块的指令,管道等等.
     //               然后我们就可以在这个模块中使用它们了.
    declarations : Array<Type<any>|any[]>
     // imports: 数组类型的选项,我们的模块需要依赖的一些其他的模块,这样做的目的使我们这个模块可以 直接使用别的模块提供的一些指令,组件等等（也就是被引入的组件需要导出（export）一些组件与指令）.
    imports : Array<Type<any>|ModuleWithProviders|any[]>
     // exports: 数组类型的选项,我们这个模块需要导出的一些组件,指令,模块等;
     //          如果别的模块导入了我们这个模块,
     //          那么别的模块就可以直接使用我们在这里导出的组件,指令模块等.
    exports : Array<Type<any>|any[]>
    // entryComponents: 数组类型的选项,指定一系列的组件,这些组件将会在这个模块定义的时候进行编译
    //                  Angular会为每一个组件创建一个ComponentFactory然后把它存储在ComponentFactoryResolver
    entryComponents : Array<Type<any>|any[]>
    // bootstrap: 数组类型选项, 指定了这个模块启动的时候应该启动的组件.当然这些组件会被自动的加入到entryComponents中去
    bootstrap : Array<Type<any>|any[]>
    // schemas: 不属于Angular的组件或者指令的元素或者属性都需要在这里进行声明.
    schemas : Array<SchemaMetadata|any[]>
    // id: 字符串类型的选项,模块的隐藏ID,它可以是一个名字或者一个路径;用来在getModuleFactory区别模块,如果这个属性是undefined
    //     那么这个模块将不会被注册.
    id : string
 }
```

## 数据请求

http 请求，必须有订阅，数据请求才会发送请求

```
this.userService.loginHandler('/user/login', {}).subscribe(data => {
  console.log(data);
});
```

## 基础包

### CommonModule

导出所有基本的 Angular 指令和管道，例如 NgIf、NgForOf、DecimalPipe 等。 它会由 BrowserModule 进行二次导出，当你使用 CLI 的 new 命令创建新应用时，BrowserModule 会自动包含在根模块 AppModule 中。

所以，对于单个的 module 包含的组件，需要导入(imports)。

#### HttpInterceptor

拦截 HttpRequest 并处理它们。

### core

#### ModuleWithProviders

[官网地址]<https://angular.cn/api/core/ModuleWithProviders>
对 NgModule 及其相关 providers 的包装。

#### Pipe

[管道官方文档]<https://angular.cn/guide/pipes>

每个应用开始的时候差不多都是一些简单任务：获取数据、转换它们，然后把它们显示给用户。 获取数据可能简单到创建一个局部变量就行，也可能复杂到从 WebSocket 中获取数据流。

[自定义管道的开发]<https://angular.cn/guide/pipes#custom-pipes>

## 修改 angular.json 配置

### 修改全局的 style.styl 位置

\*`src/style.styl -> src/app/style/style.styl`

## 需要解决的关键点

- 自定义指令
- 模块逾加载
- 路由守卫
- 多重出口
- 双向数据绑定
- 表单校验
- 数据驱动模型
- Rxjs
- 依赖注入
  - @injectable & @inject
- @Self 装饰器
- @Optional
- @SkipSelf
- @Host
