import { combineReducers } from 'redux';
import authReducer from '../containers/Auth/slice';
import headerContainer from '../containers/Home/Containers/Header/slice';
import chatList from '../containers/Home/Containers/ChatList/slice';
const rootReducer = combineReducers({
  auth: authReducer,
  header: headerContainer,
  chat: chatList,
  // Add other slice reducers here if you have them
});

export default rootReducer;
