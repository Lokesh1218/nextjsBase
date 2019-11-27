import {
  FETCH_DEDICATED_DATA_BEGIN,
  FETCH_DEDICATED_DATA_SUCCESS,
  FETCH_DEDICATED_DATA_FAILURE,
  UPDATE_DEDICATED_DATA,
  SAVE_LISTING_DATA_IN_STORE,
  RESET_TO_INITIAL_STATE
} from './actions';

const initialState = {
  data: [],
  loading: false,
  dataLoaded: false,
  error: null,
  tempListingData: {}
};

export { initialState as dedicatedInitialState };
export default function dedicatedReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_DEDICATED_DATA_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        dataLoaded: false,
        error: null
      };

    case FETCH_DEDICATED_DATA_SUCCESS:
      // All done: set loading "false".
      // Also, replace the data with the ones from the server
      return {
        ...state,
        loading: false,
        dataLoaded: true,
        data: action.payload.data,
        tempListingData: {}
      };

    case FETCH_DEDICATED_DATA_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have data to display anymore, so set it empty.
      return {
        ...state,
        loading: false,
        dataLoaded: false,
        error: action.payload.error,
        items: [],
        tempListingData: {}
      };

      case UPDATE_DEDICATED_DATA:
      // All done: set loading "false".
      // Also, replace the data with the ones from the server
        return {
          ...state,
          loading: false,
          dataLoaded: true,
          data: action.payload.data,
          tempListingData: {}
        }; 

        case SAVE_LISTING_DATA_IN_STORE: 

          return {
            ...state,
            tempListingData: action.payload
          }

        case RESET_TO_INITIAL_STATE: 

          return {
            ...state,
            data: action.payload.data,
            loading: false,
            dataLoaded: false,
            error: null,
            tempListingData: {}
          }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
