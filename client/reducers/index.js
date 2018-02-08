import combineReducers from './combineReducers';
import AuthReducer from './reducer_auth';
import NavigationReducer from './reducer_navigation';

const rootReducer = combineReducers({
  auth: AuthReducer,
  nav: NavigationReducer, 
});

export default rootReducer;
