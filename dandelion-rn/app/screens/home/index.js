import React, { Component } from "react";
import { Text, View, Button, StyleSheet, Slider, WebView } from "react-native";
import { mixin } from "../../styles/index";

export default class HomeScreen extends Component {
  // 配置当前页面的一些信息，包括，title，头部信息，自定义header等信息，优先级低于navigation中的配置。
  static navigationOptions = {
    title: "HomeScreen"
  };
  render() {
    // 在前一个组件内传递props（navigationOptions）到下一个页面
    console.log("HomeScreen", this);
    return (
      <View>
        <View style={[mixin.container, mixin.flexCenter]}>
          <Text>测试文本</Text>
        </View>
        <Button
          onPress={() =>
            this.props.navigation.navigate("Task", { from: "HomeScreen" })
          }
          title="Go to Task"
        />
        <Button
          onPress={() =>
            this.props.navigation.navigate("Login", { from: "HomeScreen" })
          }
          title="Go to Login"
        />
        <Button
          onPress={() =>
            // this.props.navigation.openDrawer()
            this.props.navigation.navigate("Drawer", { from: "HomeScreen" })
          }
          title="Go to Draw"
        />
        <Button
          onPress={() =>
            // this.props.navigation.openDrawer()
            this.props.navigation.navigate("Bill", { from: "HomeScreen" })
          }
          title="Go to Bill"
        />

        <Slider />

        <WebView
          originWhitelist={["*"]}
          source={{
            html:
              "<h1>Hello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello world</h1>"
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  baseText: {
    color: "red",
    fontFamily: "Cochin",
    marginTop: 30
  }
});
