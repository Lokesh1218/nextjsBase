export const updateShortlist = (obj) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_SHORTLIST_COUNT',
      ...obj
    });
  }
}
