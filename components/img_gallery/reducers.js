const initialState = {
  showTyres: false,
  showAlbum: false,
  showSampleErrors: false,
  scrollToCaption: '',
}
export { initialState as galleryInitialState };
export default function galleryReducer(state = initialState, action) {
  switch(action.type) {
    case 'GALLERY': {
      delete action['type'];
      state = Object.assign({}, state, action);
      if (action.showAlbum) {
        window.history.pushState(null, null, '#showAlbum');
      }
      return state;
    }

    default: return state;
  }
}
