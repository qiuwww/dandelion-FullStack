// 可以理解为异步处理action
import { all } from "redux-saga/effects";

import { homeSaga } from "./home";
import { taskSaga } from "./task";

export default function* rootSaga() {
  yield all([...homeSaga, ...taskSaga]);
}
