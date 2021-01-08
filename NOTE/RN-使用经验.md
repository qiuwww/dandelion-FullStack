# RN-使用经验

1. 0.62 版本 RN；

## 规范

1. Eslint+prettier；
2. 公共组件放在 common/components 里面，非公共组件就近放；
3. 单文件不超过 300 行；
4. 公共图片资源放 static/imgs。非公共图片和非公共组件这些就都采用就近放置原则；
5. 没有的话，就先随便弄一张图当占位符占着吧；
6. icon 用的是 svg，框架里面应该有使用例子，你可以找找，不是用 Image 组件；
   1. 不过 svg 要放 static/svg 文件夹才能被 CSvg 标签用上；
   2. 没有图标库，先自己去 iconfont 上面找找图标吧，下载下来放 static/svg 下面就行；

## 使用的包

### react-navigation

导航组件。

[StackNavigator(RouteConfigs, StackNavigatorConfig)](https://www.reactnavigation.org.cn/docs/stacknavigator)

1. RouteConfigs：路由配置对象是从路由名称到路由配置的映射，告诉导航器该路由应该呈现什么；
2. StackNavigatorConfig：

### react-native-svg

[react-native-svg](https://www.npmjs.com/package/react-native-svg)

1. Use with content loaded from uri；
2. If remote SVG file contains CSS in <style> element, use SvgCssUri。

```ts
import * as React from 'react';
import { SvgUri } from 'react-native-svg';

export default () => (
  <SvgUri
    width="100%"
    height="100%"
    uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
  />
);
```

### realm

Realm 数据库，用于数据持久化。

### react-native-camera

相机扫码

### react-native-webview

webview，相当于 iframe。类似 electron 中的 webview。

## Q&A

### import { Colors } from 'react-native/Libraries/NewAppScreen'

内置的基础参数。

<!-- black: "#000"
dark: "#444"
light: "#DAE1E7"
lighter: "#F3F3F3"
primary: "#1292B4"
white: "#FFF" -->

样式变量，在`common/styles/ColorVariable.ts`。

## 主要用到的基础组件

## 基本操作

1. 组件间的跳转，页面跳转；
2. 本地存储；
3. 跨组件状态共享；
4. css 变量，风格定制；
5. 图标使用；
6. layout；
7. header 与返回；

## ps

1. 吸取颜色，右键，16进制；
2. 图片，选中，然后导出为png图片；
3. command+e，组合图层；