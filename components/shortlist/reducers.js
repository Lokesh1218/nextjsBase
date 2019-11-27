const initialState = {
  shortlistCount: 0,
}

export default function shortlisReducer(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_SHORTLIST_COUNT': {
      action.isShortlisted ? --state : ++state;
      
      return state;
    } 

    default: return state;
  }
}