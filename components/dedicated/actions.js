import {apiUrl} from '../../globalConstants';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie'

export const FETCH_DEDICATED_DATA_BEGIN   = 'FETCH_DEDICATED_DATA_BEGIN';
export const FETCH_DEDICATED_DATA_SUCCESS = 'FETCH_DEDICATED_DATA_SUCCESS';
export const FETCH_DEDICATED_DATA_FAILURE = 'FETCH_DEDICATED_DATA_FAILURE';
export const UPDATE_DEDICATED_DATA = 'UPDATE_DEDICATED_DATA';
export const SAVE_LISTING_DATA_IN_STORE = 'SAVE_LISTING_DATA_IN_STORE';
export const RESET_TO_INITIAL_STATE = 'RESET_TO_INITIAL_STATE';

export function fetchDedicatedPageData(listingId, store) {
  const link = apiUrl + 'listings/' + listingId + "/";
  const  headers = store.getState().config.requestHeaders;

  return dispatch => {
    dispatch(fetchDedicatedDataBegin());
    return fetch(link, {
      'headers': headers
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchDedicatedDataSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchDedicatedDataFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchDedicatedDataBegin = () => ({
  type: FETCH_DEDICATED_DATA_BEGIN
});

export const fetchDedicatedDataSuccess = data => ({
  type: FETCH_DEDICATED_DATA_SUCCESS,
  payload: { data }
});

export const fetchDedicatedDataFailure = error => ({
  type: FETCH_DEDICATED_DATA_FAILURE,
  payload: { error }
});

export const updateDedicatedData = data => ({
  type: UPDATE_DEDICATED_DATA,
  payload: { data }
});

export const saveListingDataInStore = data => ({
  type: SAVE_LISTING_DATA_IN_STORE,
  payload: data
});

export const resetToInitialState = data => ({
  type: RESET_TO_INITIAL_STATE,
  payload: data
});