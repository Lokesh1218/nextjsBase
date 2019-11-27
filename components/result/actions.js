import React from 'react';
import {Router} from '../.././routes';
import {arrayUnique} from '../../helper';
import TruebilStorage from '../../utility/truebil-storage';
import {apiUrl} from '../../globalConstants';
import fetch from 'isomorphic-unfetch';

export const FETCH_RESULTPAGE_DATA_BEGIN   = 'FETCH_RESULTPAGE_DATA_BEGIN';
export const FETCH_RESULTPAGE_DATA_SUCCESS = 'FETCH_RESULTPAGE_DATA_SUCCESS';
export const FETCH_RESULTPAGE_DATA_FAILURE = 'FETCH_RESULTPAGE_DATA_FAILURE';
export const UPDATE_RESULTPAGE_DATA = 'UPDATE_RESULTPAGE_DATA';

export function fetchResultPageData(queryLink, config) {
  var oCarList = this,
    url = window.location.href,
    hrefParts = url.split('?')[0],
    query = queryLink.split('?')[1],
    perPageCar = 10,
    pathName = window.location.pathname.split('/')[1];
  const extraParams = ['filter_count'];

    if (query) {
      queryLink += '&slug=' + pathName;
      let urlDisplay = query.split('&').filter(param => extraParams.indexOf(param.split('=')[0]) === -1).join('&');
      Router.replaceRoute(hrefParts + '?' + urlDisplay);
    } else {
      queryLink += '?slug=' + pathName;
      Router.replaceRoute(hrefParts);
    }

    if (queryLink.indexOf('_page') === -1) {
      queryLink += '&_page=1';
    }
    

    // Car seen list
  var resHeaders;
  return dispatch => {
    return fetch(queryLink, {
      'headers': config.requestHeaders
      })
      .then(handleErrors)
      .then(res => {
        resHeaders = res.headers;
        return res.json();
      })
      .then(json => {
        if(queryLink.indexOf('_page') === 10) debugger;
        var next = resHeaders.get('Link').split(',').find(x => x.split(';')[1].trim().split('=')[1] === "\"next\"");
        if (next === 'undefined') {
          debugger;
        }
        var nextLink = next ? next.split(';')[0].trim().replace(/[<]/, '').replace(/[>]/, '') : null;
        var prevLink = resHeaders.get('Link').split(',').find(x => x.split(';')[1].trim().split('=')[1] === "\"last\"").split(';')[0].trim().replace(/[<]/, '').replace(/[>]/, '');
        var obj = {};
        obj['results'] = json;
        obj['next'] = nextLink;
        obj['previous'] = prevLink;
        obj['count'] = parseInt(resHeaders.get('X-Total-Count'));

        dispatch(fetchResultPageDataSuccess(obj));
        
        return json;
      })
      .catch(error => dispatch(fetchResultPageDataFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchResultPageDataBegin = () => ({
  type: FETCH_RESULTPAGE_DATA_BEGIN
});

export const fetchResultPageDataSuccess = data => ({
  type: FETCH_RESULTPAGE_DATA_SUCCESS,
  payload: { data }
});

export const fetchResultPageDataFailure = error => ({
  type: FETCH_RESULTPAGE_DATA_FAILURE,
  payload: { error }
});

export const setFilterQuery = (data) => ({
  type: 'SET_FILTER_QUERY',
  payload: {data}
});

export const setFlags = (data) => ({
  type: 'SET_FLAGS',
  payload: {data}
})

export const showFilterSpinner = (data) => ({
  type: 'SET_FILTER_SPINNER',
  payload: {data}
})

/**
  * Get and set the state with filters data
  *
  * @param query | string | applied filters query string
  */ 
export const fetchFilterData = (query = '', cityInfo) => {
  const cityId = cityInfo.id;
  const filterLink = apiUrl + 'filters/?city_id=' + cityId;
  const windowQuery = window.location.search;
  var queryLink = windowQuery ? (filterLink + '&' + windowQuery.split('?')[1]) : query ? (filterLink + '&' + query) : filterLink;
  var classObj = this;

  // query is coming from the clean url
  if (windowQuery && query) {
    queryLink += '&' + query;
  }

  return dispatch => {
    return fetch(queryLink)
    .then(function(response) {
      return response;
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.success) {
        const json = {
          data: data.filters,
          is_filter_selected: data.is_filter_selected,
          filterDataLoaded: true
        }
        dispatch(fetchFilterDataSuccess(json));
      }
    })
    .catch(function() {
      console.log('error');
    })
  }
}

export const changeFilterDot = (data) => ({
  type: 'SET_FILTER_DOT',
  payload: { data }
})

export const fetchFilterDataSuccess = data => ({
  type: 'FETCH_FILTER_DATA_SUCCESS',
  payload: { data }
});

export const updateResultPageData = (data) => ({
  type: UPDATE_RESULTPAGE_DATA,
  payload: { data }
});