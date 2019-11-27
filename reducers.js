import { combineReducers } from 'redux';
import dedicatedReducer from './components/dedicated/reducers';
import { dedicatedInitialState } from './components/dedicated/reducers';
import globalReducer from './globalReducers';
import { globalInitialState } from './globalReducers';
import homePageReducer from './components/home/reducers';
import { homePageInitialState } from './components/home/reducers';
import galleryReducer from './components/img_gallery/reducers';
import { galleryInitialState } from './components/img_gallery/reducers';
import modalReducer from './components/modal/reducers';
import { modalInitialState } from './components/modal/reducers';
import resultPageReducer from './components/result/reducers';
import { resultPageInitialState } from './components/result/reducers';
export const initialState = {
  config: globalInitialState,
  dedicated: dedicatedInitialState,
  home: homePageInitialState,
  gallery: galleryInitialState,
  modal: modalInitialState,
  result: resultPageInitialState,
};

export default combineReducers({
  config: globalReducer,
  dedicated: dedicatedReducer,
  home: homePageReducer,
  gallery: galleryReducer,
  modal: modalReducer,
  result: resultPageReducer,
});
