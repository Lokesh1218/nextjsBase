import TruebilStorage from './utility/truebil-storage';
import { arrayUnique } from './helper.js';

const buyerId = TruebilStorage.getItem('buyerId');
const isUserLoggedIn = TruebilStorage.getItem('isUserLoggedIn') === 'true';
const _jwt = TruebilStorage.getItem('_jwt');
const requestHeaders = _jwt ? {'Authorization': 'JWT ' + _jwt} : {};

let cityInfo = {
  'id': '1',
  'name': 'Mumbai',
  'nameInLower': 'mumbai'
};

cityInfo = Object.assign({}, cityInfo, JSON.parse(TruebilStorage.getItem('cityInfo')));

let initialState = {
    isSetglobalBuyerId: isUserLoggedIn || buyerId,
    requestHeaders: requestHeaders,
    buyerId: buyerId,
    cityInfo: cityInfo,
    cities:[],
    overlayNumber: 0,
    component: '',
    isRevisitedUser: false,
    isSubscribedBuyer: TruebilStorage.getItem('isSubscribedBuyer') === 'true',
    isSubscribedSeller: TruebilStorage.getItem('isSubscribedSeller') === 'true',
    isUserLoggedIn: isUserLoggedIn,
    subscriptionsInfo: {
      buyer : [],
      seller : []
    },
    userInfo: {
      name: '',
      mobile: '',
      email: ''
    },
    shortlistCount: 0,
    buyerVisitInfo: [
      {
        status: "",
        active_city_id: "",
        active_city_name: "",
        buyer_visit_cities: [],
        visit_date: "",
        visit_day: "",
        visit_time: "",
        visit_id: null,
        visit_listings: [],
        inventory_url: "",
        inventory_location: "",
        visit_timestamp: ""
      }
    ],
    inventoryInfo: {
      '1': {
        city_id: "",
        locality_name: "",
        poc_name: "",
        shop_name: "",
        poc_mobile: "",
        address: "",
        location_url: ""
      },
      '2': {
        city_id: "",
        locality_name: "",
        poc_name: "",
        shop_name: "",
        poc_mobile: "",
        address: "",
        location_url: ""
      }
    },
    isSeller: false,
    isDealer: false,
    isSubscribedDealer: false
}

export { initialState as globalInitialState };
export default function config(state = initialState, action) {
  switch(action.type) {
    case 'SET_CONFIG': {
      let existingConfig = {};
      let data = action.config;

      for (let key in data) {
        let keyInCamelCase = key.replace(/_([a-z])/g, function(c) { return c[1].toUpperCase(); });
        existingConfig[keyInCamelCase] = typeof data[key] === 'object' ? Object.assign({}, existingConfig[keyInCamelCase], data[key]) : data[key];
      }
      state = Object.assign({}, state, existingConfig);
      return state; 
    }

    case 'UPDATE_CONFIG': {
      const {type, payload} = action;
      delete action['type'];
      state = Object.assign({}, state, payload);
      return state;
    }

    case 'UPDATE_USER_LOGGEDIN': {
      delete action['type'];
      state.isUserLoggedIn = action.isUserLoggedIn;
      
      return state;
    }

    case 'BOOK_TEST_DRIVE': {
      const payLoad = action.payLoad;
      const inventoryLocationId = payLoad.inventoryLocationId;
      let buyerVisitInfo = state.buyerVisitInfo;
      let i;

      for (i = 0; i < Object.keys(buyerVisitInfo).length; i++) {
        if (buyerVisitInfo[i].inventory_location_id === inventoryLocationId) {
          buyerVisitInfo = buyerVisitInfo[i];
          break;
        }
      }
      let visitListings = buyerVisitInfo.visit_listings;
      visitListings.push(parseInt(payLoad.carId, 10));
      state.buyerVisitInfo[i].visit_listings = arrayUnique(visitListings);

      return state;
    } 

    case 'UPDATE_BUYERVISIT_INFO': {
      const {type, payload} = action;
      var buyerVisitInfo = Object.assign({}, state.buyerVisitInfo);
      let currentBuyerVisitInfo = payload.buyerVisitInfo;
      let inventoryLocationId = currentBuyerVisitInfo.inventory_location_id;
      let isInventoryIdExist = false;
      let i = 0;
      for (i = 0; i < Object.keys(buyerVisitInfo).length; i++) {
        if (buyerVisitInfo[i].inventory_location_id === inventoryLocationId) {
          buyerVisitInfo[i] = currentBuyerVisitInfo;
          isInventoryIdExist = true;
          break;
        }
      }
      if (!isInventoryIdExist) {
        buyerVisitInfo[i] = currentBuyerVisitInfo;
      }

      return {
        ...state,
        buyerVisitInfo: buyerVisitInfo
      };
    }

    case 'UPDATE_TRACKING_INFO': {
      const {type, payload} = action;

      if (Object.keys(payload).length) {
        const cityInfo = {
          id: payload.city_info.city_id,
          name: payload.city_info.city_name,
          nameInLower: payload.city_info.city_name.toLowerCase()
        }

        state = Object.assign({}, state, {cityInfo});
      }

      return state;
    }

    default: return state;
  }
}
