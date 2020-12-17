import { createStore, applyMiddleware } from "redux";
import combineReducers from "./reducers/index";
import rootSaga from './sagas/index';

// 打印当前的state
import logger from 'redux-logger';

// saga的东西
import createSagaMiddleware from 'redux-saga';
// 生成saga中间件
const sagaMiddleware = createSagaMiddleware(rootSaga);

// createStore(reducer, [preloadedState], enhancer)
const store = createStore(combineReducers, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

console.log("store: ", store);

export default store;
