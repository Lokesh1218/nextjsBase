import {setGADimension, sendExtraCustomGA} from '../../helper.js';
import TruebilStorage from '../../utility/truebil-storage';
import {apiUrl} from '../../globalConstants';

import {
  FETCH_RESULTPAGE_DATA_BEGIN,
  FETCH_RESULTPAGE_DATA_SUCCESS,
  FETCH_RESULTPAGE_DATA_FAILURE,
  UPDATE_RESULTPAGE_DATA
} from './actions';

const nextLink = apiUrl + 'hotels/';
const apiLink = apiUrl + 'hotels/';

const initialState = {
  data : [],
  nextLink: nextLink,
  apiLink: apiLink,
  totalCars: '...',
  loading: false,
  dataLoaded: false,
  reachedEnd: false,
  showFilterSpinner: false,
  showLoader: false,
  query: '',
  error: null,
  filterData: {},
  showFilterDot: false,
  filterDataLoaded:false,
  similarListingOffset: null,
  similarListingCount: 0
};

export { initialState as resultPageInitialState };
export default function resultPageReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_RESULTPAGE_DATA_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        dataLoaded: false,
        error: null
      };

    case FETCH_RESULTPAGE_DATA_SUCCESS:
      // All done: set loading "false".
      // Also, replace the data with the ones from the server

      const data = action.payload.data;
      const perPageCar = 10;
      const similarCarCount = data.similar_count || 0;
      const similarListingOffset = data.similar_listing_offset >= 0;
 
      if (!state.data.length || ((data.count + similarCarCount) <= perPageCar) || (data['next'] &&
      data['next'].indexOf('_page=2') >= 0 && !similarListingOffset && !similarCarCount)) {
        var nextLink = data['next'] ? data['next'].replace(/%2C/g, ',') : '';

        nextLink = getNextLinkWithoutSlug(nextLink);


        let resultsData = {};
        resultsData['results'] = data['results'];
        resultsData['nextLink'] = nextLink;
        resultsData['totalCars'] = data['count'];
        TruebilStorage.setItem('resultsData', JSON.stringify(resultsData));

        return {
          ...state,
          loading: false,
          dataLoaded: true,
          nextLink: nextLink,
          reachedEnd: false,
          showFilterSpinner: false,
          showLoader: false,
          totalCars: data['count'],
          data: data['results'],
          similarListingOffset: data['count'],
          similarListingCount: data.similar_count || state.similarListingCount
        };
      } 
      else {
        let nextLink = data['next'] ? data['next'].replace(/%2C/g, ',') : '';
        let resultsData = {};
       
        nextLink = getNextLinkWithoutSlug(nextLink);
        resultsData['results'] = state.data.concat(data['results']);
        resultsData['nextLink'] = nextLink;
        resultsData['totalCars'] = data['count'];
        TruebilStorage.setItem('resultsData', JSON.stringify(resultsData));

        return {
          ...state,
          loading: false,
          dataLoaded: true,
          nextLink: nextLink,
          reachedEnd: false,
          showFilterSpinner: false,
          showLoader: false,
          totalCars: data['count'],
          query: data.query_string ? data.query_string : state.query,
          data: state.data.concat(action.payload.data['results']),
          similarListingOffset: data['count'],
          similarListingCount: data.similar_count || state.similarListingCount
        };
      }

    case FETCH_RESULTPAGE_DATA_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have data to display anymore, so set it empty.
      return {
        ...state,
        loading: false,
        dataLoaded: false,
        error: action.payload.error,
        items: []
      };

      case UPDATE_RESULTPAGE_DATA:
        return {
        ...state,
        data: action.payload.data.data,
        dataLoaded: action.payload.data.dataLoaded,
        nextLink: action.payload.data.nextLink,
        totalCars: action.payload.data.totalCars,
        similarListingOffset: action.payload.data.totalCars,
        similarListingCount: action.payload.data.similar_count || state.similarListingCount
      };

      case 'SET_FILTER_QUERY': 
        return {
          ...state,
          query: action.payload.data
        }

      case 'SET_FLAGS': 
        return {
          ...state,
          reachedEnd: action.payload.data.reachedEnd,
          showLoader: action.payload.data.showLoader
        }

      case 'SET_FILTER_SPINNER': 
        return {
          ...state,
          showFilterSpinner: action.payload.data.showFilterSpinner
        }

      case 'SET_FILTER_DOT':
        return {
          ...state,
          showFilterDot: action.payload.data
        }

      case 'FETCH_FILTER_DATA_SUCCESS': 

        return {
          ...state,
          filterData: action.payload.data.data,
          showFilterDot: action.payload.data.is_filter_selected,
          filterDataLoaded: action.payload.data.filterDataLoaded
        }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

/**
  * Remove the slug key value from url
  *
  * @param nextLink | String
  * @return nextLink | String
  */
const getNextLinkWithoutSlug = (nextLink) => {
  let url = nextLink;
  let urlSplit = url.split('?');
  let href = urlSplit[0];
  let queryString = urlSplit[1];
  let queryParam;

  if (queryString) {
    let queryArray = queryString.split('&');
    for (let i = 0; i < queryArray.length; i++) {
      let query = queryArray[i];
      if (query.indexOf('slug=') >= 0) {
        queryArray.splice(i, 1);
      }
    };
    queryParam = queryArray.join('&');
  }
  if (queryParam) {
    nextLink = href + '?' + queryParam;
  }
  return nextLink;
}
