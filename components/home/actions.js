import React from 'react';
import {arrayUnique} from '../../helper';
import {updateConfig} from '../../globalActions';
import TruebilStorage from '../../utility/truebil-storage';
import {apiUrl} from '../../globalConstants';
import fetch from 'isomorphic-unfetch';

export const FETCH_HOMEPAGE_DATA_BEGIN   = 'FETCH_HOMEPAGE_DATA_BEGIN';
export const FETCH_HOMEPAGE_DATA_SUCCESS = 'FETCH_HOMEPAGE_DATA_SUCCESS';
export const FETCH_HOMEPAGE_DATA_FAILURE = 'FETCH_HOMEPAGE_DATA_FAILURE';

export function fetchHomePageData(isServer, data) {
  const  headers = data.requestHeaders;
  const cityId = data.cityId;

  // Don't call home page API if city is not present
  if (!cityId) {
    return dispatch => {
      dispatch(fetchHomePageDataFailure());
    }
  }

  const buyerId = data.buyerId;
  let apiLink = apiUrl + 'home_page/';
  let carSeenList = TruebilStorage.getItem('carSeenList');
  let query = '';

  carSeenList = carSeenList ? arrayUnique(carSeenList.split(',').reverse()).slice(0, 3) : [];
  query += '?city_id=' + cityId;

  // Append buyer id if exist
  query += buyerId ? ('&buyer_id=' + buyerId) : '';

  // Car seen list
  if (carSeenList.length) {
    query += '&cars_seen=' + carSeenList;
  }

  apiLink = apiLink + query;

  return dispatch => {
    dispatch(fetchHomePageDataBegin());
    return fetch(apiLink, {
      'headers': headers
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        if (json.is_revisited_user) {
          dispatch(updateConfig({isRevisitedUser: true}));
        } else if (!isServer) {
          //If data available in session use that otherwise use response one
          let popularCars = sessionStorage.getItem('popular_cars');
          if (popularCars) {
            popularCars = JSON.parse(popularCars);
            json.popular_cars = popularCars;
          } else {
            sessionStorage.setItem('popular_cars', JSON.stringify(json.popular_cars));
          }
        }
        dispatch(fetchHomePageDataSuccess(json));
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