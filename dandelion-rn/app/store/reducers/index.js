// import homeReducer from './home';
import taskReducer from './task';
import { combineReducers } from 'redux';

const combineReducer = combineReducers({
  // home: homeReducer,
  task: taskReducer
  // popularize: popularizeReducer,
  // mine: mineReducer
});

export default combineReducer;