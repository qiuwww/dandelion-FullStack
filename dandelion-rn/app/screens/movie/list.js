import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import { mixin } from "../../styles/index";
// 测试数据请求
// import fetchRequest from "../../utils/fetch";
import { connect } from "react-redux";

import { changeText } from "../../store/actions/task";

class MovieListScreen extends Component {
  static navigationOptions = {
    title: "MovieListScreen"
  };

  componentDidMount() {
    console.log("MovieListScreen: ", this);
  }

  _keyExtractor = item => item.id;
  _renderItem = ({ item }) => <Text>{item.title}</Text>;

  render() {
    console.log("Task: ", this.props);
    const { text, data, onChangeText, getData } = this.props;
    // 通过 props 拿到保存的 onChangeText
    // 这里传递navigationOptions的时候参数在params下边取得，不传params为undefined
    return (
      <View>
        <View style={[mixin.container, mixin.flexCenter]}>
          <Text>测试文本</Text>
          <Text>text的值：{text}</Text>
          {/* <Text>
            页面from：
            {this.props.navigation.state.params &&
              this.props.navigation.state.params.from}
          </Text> */}
        </View>
        {/* 按钮 */}
        <TouchableOpacity onPress={() => onChangeText()}>
          <Text>改变文字按钮</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getData()}>
          <Text>请求数据</Text>
        </TouchableOpacity>
        <FlatList
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        {/* <Button
          onPress={() =>
            this.props.navigation.navigate("TaskDetail", {
              title: 123
            })
          }
          title="Go to TaskDetail"
        /> */}
        {/* <Button
          title="push"
          onPress={() => this.props.navigation.push("Task")}
        /> */}
        {/* <Button
          title="navigate"
          onPress={() => this.props.navigation.navigate("Task")}
        /> */}
      </View>
    );
  }
}

// 获取 state 变化，这里返回的对象会被合并到props上
// 这里每次改变的时候，都是要执行的
const mapStateToProps = state => {
  return {
    // 获取 state 变化
    text: state.task.text,
    data: state.task.data
  };
};

// 发送行为，这里返回的对象会被合并到props上
const mapDispatchToProps = dispatch => {
  return {
    // 发送行为，使用dispatch来触发action中的事件，由于action并不属于store
    onChangeText: () => dispatch(changeText()),
    getData: () => dispatch({ type: "TASK_GETDATA" })
  };
};

// 进行第二层包装,生成的新组件拥有 接收和发送 数据的能力
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieListScreen);

const styles = StyleSheet.create({
  baseText: {
    color: "blue",
    fontFamily: "Cochin",
    marginTop: 30
  }
});
