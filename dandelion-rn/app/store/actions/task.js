// 测试异步action redux-saga| redux-saga

// 初始化 CHANGE_TEXT 对象，只有在这里修改reducer
export const changeText = () => {
  return {
    type: "CHANGE_TEXT"
  }
};
export const saveData = (data = []) => {
  return {
    type: "SAVE_DATA",
    payload: {
      data
    }
  }
}