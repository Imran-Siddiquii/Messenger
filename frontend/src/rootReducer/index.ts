import { combineReducers } from 'redux';
import authReducer from '../containers/Auth/slice'; // Replace with the actual path

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other slice reducers here if you have them
});

export default rootReducer;
