/**
 * @desc 返回设备的相关信息
 * @params
 */
import { Dimensions, Platform } from "react-native";
import { px } from "./px2dp";

export const device = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  // 内容区域高度
  contentHeight: Platform.OS === "ios" ? 44 : 50,
  // 顶部导航的总高度
  withStatusBar: height => {
    // ios处理刘海屏兼容问题，如果超出812认为是刘海屏，否则是一般屏幕
    const iosStatusBarHeight = this.height >= 812 ? 44 : 20;
    // android默认自己处理刘海高度，不需要处理
    const statusBarHeight = Platform.OS === "ios" ? iosStatusBarHeight : 0;
    return px(height + statusBarHeight);
  }
};
