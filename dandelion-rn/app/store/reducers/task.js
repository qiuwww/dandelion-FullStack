// import * as actionTypes from "../actions/index";

// 这里边是状态
// 模拟一个获取数据的过程
export default (taskReducer = (
  // 默认的state
  state = {
    loading: false,
    taskList: [],
    data: [],
    text: 0
  },
  // 变化的参数值
  action
) => {
  // 下边的case对应action的类型，也就是一个action对应于一个reducer
  // 这里的type，最终会成为全局的变量，也就是需要唯一
  switch (action.type) {
    case "SAVE_DATA":
      return {
        ...state,
        ...action.payload
      };
    case "changeLoadingState":
      return {
        ...state,
        ...action.payload
      };
    case "CHANGE_TEXT":
      return {
        ...state,
        text: ++state.text
      };
    default:
      return state;
  }
});
