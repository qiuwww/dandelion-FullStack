# 微信小程序开发笔记

## 为什么小程序

小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，同时具有出色的使用体验。

### 小程序与普通网页开发的区别

- 网页开发渲染线程和脚本线程是互斥的，这也是为什么长时间的脚本运行可能会导致页面失去响应，而在小程序中，二者是分开的，**分别运行在不同的线程中**。
- 小程序的逻辑层和渲染层是分开的，逻辑层运行在 [JSCore](https://www.cnblogs.com/meituantech/p/9528285.html)中，**并没有一个完整浏览器对象**，因而缺少相关的 DOM API 和 BOM API。这一区别导致了前端开发非常熟悉的一些库，例如 jQuery、 Zepto 等，在小程序中是无法运行的。
- 同时 JSCore 的环境同 NodeJS 环境也是不尽相同，所以一些 NPM 的包在小程序中也是无法运行的。

## 起步

- 需要申请 AppID；
- 使用微信开发工具初始化项目；

## 项目配置

### 小程序配置 app.json

app.json 是当前小程序的全局配置，包括了小程序的**所有页面路径（路由）**、界面表现（title 和 tab）、网络超时时间、底部 tab 等。

### 工程开发环境的配置，开发工具的配置

工具配置 project.config.json

### page 配置，放在 page 的具体页面的目录下

也就是页面的特殊配置。

页面配置 page.json

页面的.json 只能设置 window 相关的配置项，以决定本页面的窗口表现，所以无需写 window 这个键。

每一个小程序页面也可以使用.json **文件来对本页面的窗口表现进行配置**。

页面的配置只能设置 app.json 中部分 window 配置项的内容，页面中配置项会**覆盖** app.json 的 window 中相同的配置项。

## WXML 模板

- template，一般的 js 模板，类似于 handlebar。
- WXML 充当的就是类似 HTML 的角色。
- 标签使用微信小程序的组件库，类似于 rn 的标签。

## WXSS 样式

- 样式文件表，WXSS 在底层支持新的尺寸单位 rpx。
- 提供了全局的样式和局部样式。`app.wxss`

### rpx

在写 CSS 样式时，开发者需要考虑到手机设备的屏幕会有不同的宽度和设备像素比，采用一些技巧来换算一些像素单位。WXSS 在底层支持新的尺寸单位 rpx。
**rpx（responsive pixel）**: 可以根据屏幕宽度进行自适应。规定屏幕宽为 750rpx。如在 iPhone6 上，屏幕宽度为 375px，共有 750 个物理像素，则 750rpx = 375px = 750 物理像素，1rpx = 0.5px = 1 物理像素。

也就是以 iphone 为基准的设置就是 **总的宽度 750rpx**。

## page 目录

**Page 是一个页面构造器**，这个构造器就生成了一个页面。在生成页面的时候，小程序框架会把 data 数据和 index.wxml 一起渲染出最终的结构，于是就得到了你看到的小程序的样子。

data: 基本等价与 vue 的 data，不过项目架构更像是 angular。

一个目录只能对应一个页面，自动引入对应的 css，json，template。如果是一簇页面就需要添加父文件夹来包裹。

## 渲染层与逻辑层

小程序的渲染层和逻辑层分别由**2 个线程管理：**

- 渲染层的界面使用了 WebView 进行渲染；
- 逻辑层采用 JsCore 线程运行 JS 脚本。
- 一个小程序存在多个界面，所以**渲染层存在多个 WebView 线程**，这两个线程的通信会经由微信客户端（下文中也会采用 Native 来代指微信客户端）做中转，**逻辑层发送网络请求也经由 Native 转发。**

## 调用微信的功能

```js
// 获取地理信息
wx.getLocation({
  type: "wgs84",
  success: res => {
    var latitude = res.latitude; // 经度
    var longitude = res.longitude; // 纬度
  }
});
// 调用微信扫一扫能力，只需要：
wx.scanCode({
  success: res => {
    console.log(res);
  }
});
```

## 遇到的问题

### 合法域名校验出错，不在以下合法域名列表中 解决方法

- 在小程序下边添加不校验，

开发者工具 -》 设置 -》 项目设置 -》 设置不校验

- 或者把要使用的域名添加到列表`https://blog.csdn.net/hicoldcat/article/details/54288245`

## 使用 less 来写样式

使用 gulp 编译 less 到 wxss 文件。

## 组件

### 组件定义

`<template name="movie-list"></template>`

### 使用

需要引入：`<import src="item.wxml"/> <template is="movie-list"></template>`
