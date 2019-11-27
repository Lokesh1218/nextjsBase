import React from 'react';
import {apiUrl} from './globalConstants';
import fetch from 'isomorphic-unfetch';

export const setConfig = data => ({
  type: 'SET_CONFIG',
  config: data
});

export const updateConfig = data => ({
  type: 'UPDATE_CONFIG',
  payload: data
})

export const bookTestDrive = (payload) => ({
  type: 'BOOK_TEST_DRIVE',
  payLoad: payload
});

export const updateBuyervisitInfo = (data) => ({
  type: 'UPDATE_BUYERVISIT_INFO',
  payload: data
});

/**
 * Get client ip from request url
 *
 * @param string request 
 * @return int ipAddr
 */
const getIpAddressFromRequest = (request) => {
  let ipAddr = request.connection.remoteAddress;

  if (request.headers && request.headers['x-forwarded-for']) {
    [ipAddr] = request.headers['x-forwarded-for'].split(',');
  }

  return ipAddr;
}

export function fetchConfigurationAPI(ctx) {
  const req = ctx.req;
  const cityId = req.cookies.city_id;
  const jwt = req.cookies._jwt;
  const requestHeaders = ctx.store.getState().config.requestHeaders;
  const originalUrl = req.originalUrl;
  const clientIP = getIpAddressFromRequest(req);
  let headers = {};
  let apiLink = apiUrl + 'configurations';

  apiLink = apiLink + (originalUrl ? ('?slug=' + originalUrl) : '');
  apiLink = apiLink + (cityId ? ('&city_id=' + cityId) : '');

  headers = {
    'Content-Type': 'application/json',
    'X-User-Ip': clientIP
  }

  if (Object.keys(requestHeaders).length) {
    headers =  Object.assign({}, headers, requestHeaders);
  }
  
  return dispatch => {
    return fetch(apiLink, {
      headers: headers,
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setConfig(json));
        if (json['city_info']) {
          let cityName = json['city_info']['city_name'];
          let nameInLower = cityName.toLowerCase();
          let cityInfo = {
            id: json['city_info']['city_id'],
            name: cityName,
            nameInLower: nameInLower
          };
          dispatch(updateConfig({cityInfo: cityInfo}));
        }
        return json;
      })
      .catch(error => { console.log(error)});
  };
}


export function updateStoreWithCookies(cookies) {
  return dispatch => {
      const jwt = cookies._jwt;
      const data = {
        jwt: jwt,
        requestHeaders : jwt ? {'Authorization': 'JWT ' + jwt} : {},
        buyerId: cookies.buyerId
      }
    dispatch(updateConfigWithCookies(data))
  }
}

export const updateConfigWithCookies = data => ({
  type: 'UPDATE_CONFIG',
  payload: data
});