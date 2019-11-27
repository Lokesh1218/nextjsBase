import { combineReducers } from 'redux';
import globalReducer from './globalReducers';
import { globalInitialState } from './globalReducers';
import homePageReducer from './components/home/reducers';
import { homePageInitialState } from './components/home/reducers';

import modalReducer from './components/modal/reducers';
import { modalInitialState } from './components/modal/reducers';

export const initialState = {
  config: globalInitialState,
  home: homePageInitialState,
  modal: modalInitialState
};

export default combineReducers({
  config: globalReducer,
  home: homePageReducer,
  modal: modalReducer
});
