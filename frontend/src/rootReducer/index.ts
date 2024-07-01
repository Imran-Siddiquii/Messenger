import { combineReducers } from 'redux';
import authReducer from '../containers/Auth/slice';
import headerContainer from '../containers/Home/Containers/Header/slice';
import chatList from '../containers/Home/Containers/ChatList/slice';
import chatBox from '../containers/Home/Containers/ChatBox/slice';
const rootReducer = combineReducers({
  auth: authReducer,
  header: headerContainer,
  chat: chatList,
  chatBox: chatBox,

  // Add other slice reducers here if you have them
});

export default rootReducer;
