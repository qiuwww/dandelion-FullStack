// 抽出公用的样式文件，在需要的地方使用style数组形式添加到组件上
import { StyleSheet } from "react-native";
export const mixin = StyleSheet.create({
  container: {
    backgroundColor: "blue"
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center"
  }
});
