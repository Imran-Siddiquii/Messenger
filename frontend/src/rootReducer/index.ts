import { combineReducers } from 'redux';
import authReducer from '../containers/Auth/slice';
import headerContainer from '../containers/Home/Containers/Header/slice';
const rootReducer = combineReducers({
  auth: authReducer,
  header: headerContainer,
  // Add other slice reducers here if you have them
});

export default rootReducer;
