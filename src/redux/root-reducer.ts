import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import reportReducer from './report/report.reducer';

export default combineReducers({
  user: userReducer,
  report: reportReducer,
});
