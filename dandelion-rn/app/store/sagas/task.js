import { put, call, takeLatest } from "redux-saga/effects";

import * as taskAction from "../actions/task";
import fetchRequest from "../../utils/fetch";

function fetchRequestWrap() {
  return fetchRequest(
    "/ithil_j/activity/movie_annual2018/widget/12",
    "GET",
    {}
  );
}

// 这个函数中的请求方法都是随手写的，没引入真实API，
function* getData() {
  try {
    // 这里的call方法第一个参数是要执行的函数，后边是参数
    // const res = yield call(fetchRequest, "/ithil_j/activity/movie_annual2018/widget/12", "GET", {});
    const res = yield call(fetchRequestWrap);
    const data = res.res.subjects;
    console.log("subjects: ", data);
    // 这里可以调用action，也可以直接调用reducer
    // yield put(taskAction.saveData(data));
    yield put({
      type: "SAVE_DATA",
      payload: {
        data
      }
    });
    // yield call(sucCb);
  } catch (err) {
    // yield call(errCB, err);
  }
}

export const taskSaga = [
  // 这里的pattern就是action中的name
  // takeLatest(pattern, saga, ...args)
  takeLatest("TASK_GETDATA", getData)
];
