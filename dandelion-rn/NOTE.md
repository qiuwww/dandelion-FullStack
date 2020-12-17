# dandelion-rn

## 项目生成

```bash
# 生成项目
# 移动dandelionRN的内容到dandelion-rn下边。
react-native init dandelionRN
# 运行项目，开发环境
Run instructions for iOS:
  • cd /Users/qww/Documents/learn/dandelionRN && react-native run-ios
   or
  • Open ios/dandelionRN.xcodeproj in Xcode
  • Hit the Run button
# 在设备上运行
参考这里：https://reactnative.cn/docs/running-on-device/，目标打包成一个ios应用
```

## 添加必要的包

### react-navigator

[官方文档](https://reactnavigation.org/docs/zh-Hans/getting-started.html)

### react-native-gesture-handler

React Native Gesture Handler 是什么？
React Native Gesture Handler 是 Expo 公司推出的一个库，目的是**替代 React Native 自带的 Gesture Responder System。**
React Native Gesture Handler 可以带来等多的手势操作和更好的性能，因为它使用了各个平台原生的 touch handling system 来处理手势。

pan: 拖拽手势
pinch： 捏合缩放手势
rotation： 旋转手势

#### 安装遇到的问题

link 成功之后还会报错，这个时候就要[手动来 link](https://reactnative.cn/docs/linking-libraries-ios.html)，[参考文章](https://blog.csdn.net/qq_41457238/article/details/87794605)

错误信息：

```js
The file “RNGestureHandler.xcodeproj” could not be unlocked.

: error: couldn't create directory /Users/qww/Documents/learn/dandelion-rn/node_modules/react-native/third-party/glog-0.3.5/src: Permission denied
```

这里是缺少`react-native`下的`third-party`文件夹下的内容，程序无法写入，所以会报错。

link的时候，需要管理员权限。`sudo react-native link react-native-gesture-handler`

### reactBase

第三方组件库，处理了很多的兼容性的问题，这里使用该组件库，方便开发。

- [官方文档](https://docs.nativebase.io/Components.html#anatomy-headref)
- [github](https://github.com/GeekyAnts/NativeBase) master

- [版本支持情况 NativeBase Compatibility Modes](https://docs.nativebase.io/docs/Compatibility.html)

- [NativeBase Customizer，样式定制](https://nativebase.io/customizer/)

- [官方demo GeekyAnts/NativeBase-KitchenSink](https://github.com/GeekyAnts/NativeBase-KitchenSink) CRNA分支，这里参看theme下的样式文件

### redux
