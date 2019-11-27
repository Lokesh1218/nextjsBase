import React from 'react';
import {updateConfig} from '../../globalActions';
import TruebilStorage from '../../utility/truebil-storage';
import {apiUrl} from '../../globalConstants';
import fetch from 'isomorphic-unfetch';

export const FETCH_HOMEPAGE_DATA_BEGIN   = 'FETCH_HOMEPAGE_DATA_BEGIN';
export const FETCH_HOMEPAGE_DATA_SUCCESS = 'FETCH_HOMEPAGE_DATA_SUCCESS';
export const FETCH_HOMEPAGE_DATA_FAILURE = 'FETCH_HOMEPAGE_DATA_FAILURE';

export function fetchHomePageData(isServer, data) {
  const  headers = data.requestHeaders;
  
  return dispatch => {
    dispatch(fetchHomePageDataBegin());
    return fetch(apiLink, {
      'headers': headers
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        
        //dispatch(fetchHomePageDataSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchHomePageDataFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchHomePageDataBegin = () => ({
  type: FETCH_HOMEPAGE_DATA_BEGIN
});

export const fetchHomePageDataSuccess = data => ({
  type: FETCH_HOMEPAGE_DATA_SUCCESS,
  payload: { data }
});

export const fetchHomePageDataFailure = error => ({
  type: FETCH_HOMEPAGE_DATA_FAILURE,
  payload: { error }
});