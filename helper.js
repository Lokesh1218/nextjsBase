/* Helper methods */
import TruebilStorage from './utility/truebil-storage';
import { updateShortlist } from './components/shortlist/actions';

export const numberFormatter = (amount) => {
  var number = amount.toString();
  number = number.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  return number;
};

export const unitConvertor = (amount, shortForm=false, noOfDecimals=2, thousandsInShortForm=false) =>  {
  if (amount >= 10000000) {
    amount = ((amount / 10000000)).toFixed(noOfDecimals) + ' Cr';
  }
  else if (amount >= 100000) {
    if (amount > 9999499) {
      amount = "1 Cr";
    } 
    else {
      amount = ((amount / 100000)).toFixed(noOfDecimals);
      amount = shortForm ? amount + 'L' : amount + ' Lakh';
    }
  }
  else if (amount >= 1000) {
    if (amount > 99994) {
      amount = "1";
      amount = shortForm ? amount + 'L' : amount + ' Lakh';
    }
    else {
      amount = thousandsInShortForm ? parseInt(amount / 1000, 10) + 'K' : (amount * 1).toFixed(noOfDecimals);
    }
  }
  return amount;
}

export const reverseUnitConvertor = (amount) => {
  var amountsArr = amount.split(' ');
  var integralAmount;

  if (amountsArr.length > 1) {
    if (amountsArr[1] === 'Cr') {
      integralAmount = (parseFloat(amountsArr[0])) * 10000000;
    } else if (amountsArr[1] === 'L' || amountsArr[1] === 'Lakh') {
      integralAmount = (parseFloat(amountsArr[0])) * 100000;
    } else {
      integralAmount = (parseFloat(amountsArr[0])) * 1000;
    }
  } else {
    integralAmount = amount.split(',').join('');
  }

  return integralAmount;
}

export const arrayUnique = (array) => {
  var arrayObj = {},
      uniqueArray = [];

  array.forEach(function(arrayVal) {
    if (!arrayObj[arrayVal]) {
      arrayObj[arrayVal] = true;
      uniqueArray.push(arrayVal);
    }
  });

  return uniqueArray;
};

export const animate = (elem, prop, targetVal, duration) => {
  var intervalRunningCount = duration / 10;
  var propVal = elem[prop];
  var incrementVal = Math.abs(propVal - targetVal) / intervalRunningCount;
  var reverse = false;
  if (propVal > targetVal) {
    reverse = true;
  }

  var intervalId = setInterval(doAnimate, 10);
  function doAnimate() {
    if (propVal == Math.ceil(targetVal)) {
      clearInterval(intervalId);
    }
    else {
      if (!reverse) {
        if (propVal < targetVal) {
          propVal += incrementVal;
        } else {
          propVal = Math.ceil(targetVal);
        }
      } else {
        if (propVal > targetVal) {
          propVal -= incrementVal;
        } else {
          propVal = Math.ceil(targetVal);
        }
      }
      elem[prop] = propVal;
    }
  }
}

/**
  * @desc Adds class 'overflow-hidden' on the html-body whenever there is a 
  * popup or overlay
  */
export const addOverflowHidden = () => {
  var overlayNumber = TruebilStorage.getItem('overlayNumber');
  overlayNumber++;
  TruebilStorage.setItem('overlayNumber', overlayNumber);
  if (overlayNumber === 1) {
    var scrollTop = window.pageYOffset;
    TruebilStorage.setItem('lastScrollPositionY', scrollTop.toString());
    setTimeout(function() {
      document.body.classList.add('overflow-hidden');
    }, 400);
  }  
}

/**
  * @desc Removes class 'overflow-hidden' from the html-body whenever a popup  
  * or overlay is removed
  */
export const removeOverflowHidden = () => {
  var overlayNumber = TruebilStorage.getItem('overlayNumber');
  if (overlayNumber === 0)
    return;
  else {
    TruebilStorage.setItem('overlayNumber', --overlayNumber);
    if (overlayNumber === 0) {
      var scrollTop =  parseInt(TruebilStorage.getItem('lastScrollPositionY'), 10);
      document.body.classList.remove('overflow-hidden');
      window.scrollBy(0, scrollTop);
    }
  }
} 

/**
  * @desc toggles `isShortlisted` in car data
  * @param {function} dispatch method of redux store
  * @param {number} carIndex index of the listing in car data list
  * @param {string} dataCategory type of data in state
  * @param {function} optional callback function to call after toggling
  */
export function toggleShortlist(dispatch, carIndex, dataCategory, callback) {
  let obj;
  let carObj;
  let data;

  if (TruebilStorage.getItem('component') === 'results') {
    obj = this.props.result.data;
  } else if ((TruebilStorage.getItem('component') === 'listings') && dataCategory) {
    obj = this.props[dataCategory];
  } else if (dataCategory) {
    obj = this.props.data[dataCategory];
  } else {
    obj = this.props.data;
  }

  if (carIndex !== -1) {
    if (dataCategory !== 'data') {
      carObj = obj.results[carIndex];
    } else {
      carObj = obj[carIndex];
    }
  } else {
    carObj = obj;
  }
  let isShortlisted = carObj.is_shortlisted
  carObj.is_shortlisted = !isShortlisted;
  this.setState({ dataCategory: obj });
  dispatch(updateShortlist({isShortlisted: isShortlisted}));
  if (callback) {
    callback(carObj.car_info.id, carIndex);
  }
}

function setGaDimension(dimension, value) {
  try {
    window.ga('set', dimension, value);
  } catch (error) {
    
  }
}

export var setGADimension = function(gaDimensionTable) {
  for (var dimensionNum in gaDimensionTable) {
    var value = gaDimensionTable[dimensionNum];
    setGaDimension('dimension' + dimensionNum, value);
  }
}

export var clearGADimensions = function() {
  setGaDimension('dimension2', null);
  setGaDimension('dimension4', null);
  setGaDimension('dimension5', null);
  setGaDimension('dimension6', null);
  setGaDimension('dimension8', null);
  setGaDimension('dimension9', null);
}

export var sendPageView = function() {
  try {
    window.ga('send', 'pageview', window.location.pathname);
  } catch (error) {
    //console.log(error.message);
  }
}

export var getTimestamp = function() {
  var tzoffset = (new Date()).getTimezoneOffset() * 60000;
  var datetime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);

  return datetime.split('.')[0].replace('T', ' ');
}

export var sendExtraCustomGA = function() {
  var category = 'google_dynamic_remarketing_parameters';
  var action = 'google_dynamic_remarketing_parameters';
  try {
    window.ga('send', 'event', category, action, 'ssr', {
      nonInteraction: true
    });
  } catch (error) {
    
  }
  
  clearGADimensions();
}

export var dropGAPixel = function(category, action, label, value) {
  try {
    window.ga('send', 'event', category, action, 'ssr,' + label, value);
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
  }
  clearGADimensions();
}

export var sendGA = function(e, type='') {
  var el;
  if (e.currentTarget) {
    el = e.currentTarget;
  } else {
    el = e;
  }
  var gaCategory          = el.getAttribute('data-ga-category'),
      gaAction            = el.getAttribute('data-ga-action'),
      gaLabel             = el.getAttribute('data-ga-label'),
      gaValue             = el.getAttribute('data-ga-value') || 0,
      component           = TruebilStorage.getItem('component'),
      addExtraInfoToLabel = false,
      initialLabel;

  if (component === 'home') {
    gaCategory = 'newhome';
  }

  dropGAPixel(gaCategory, gaAction, gaLabel, gaValue);
}

// To trigger fb event related to the dynamic ad pixel 
export var triggerFbEvent = function(dict) {
  
  var eventName       = dict.eventName,
      contentName     = dict.contentName,
      contentIds      = dict.contentIds,
      contentCategory = dict.contentCategory,
      carModel        = dict.carModel,
      price           = dict.price,
      carCategory     = dict.carCategory;

  window.fbq('track', eventName, {
    content_name: contentName,
    content_category: contentCategory,
    content_ids: [contentIds],
    content_type: 'product',
    car_model: carModel,
    value: price || 0,
    currency: 'INR',
    car_category: carCategory
  });
};

// Trigger Columbia pixel whenever a new lead is generated
export var triggerColumbiaPixel = function () {
  var isColumbiaPixleTriggered = document.body.getAttribute('data-is-columbia-pixel-triggered');
  if (!isColumbiaPixleTriggered) {
    var colombiaPixelURL = 'https://ade.clmbtech.com/cde/eventTracking.htm?pixelId=821&_w=1&rd='+new Date().getTime();
    (new Image()).src  = colombiaPixelURL;
    document.body.setAttribute('data-is-columbia-pixel-triggered', true);
  }
};

/**
  * @desc Formats string literal with variables
  * @param {string} `strings`  string to format
  * @param {array} `keys`  variables in string
  * @return function
  * @usage var templateString = stringFormatter`test string ${0} ${'testKey'}`;
  *        > templateString('my value', {'testKey': 'testValue'})
  *        < "test string my value testValue"
  */
export function stringFormatter(strings, ...keys) {
  return (function(...values) {
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function(key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}

export function wave(rippleType, e) {
  var btn = e.currentTarget;
  var wave = btn.getElementsByClassName('wave')[0];
  if (wave) {
    wave.classList.remove('hide');
    var waveRadius = wave.offsetWidth / 2;
    if (e.nativeEvent.touches) {
      var left = e.touches[0].pageX - getOffset(btn).left  - waveRadius;
      var top = e.touches[0].pageY - getOffset(btn).top- waveRadius;
    } else {
      var left = e.nativeEvent.pageX - getOffset(btn).left - waveRadius;
      var top = e.nativeEvent.pageY - getOffset(btn).top - waveRadius;
    }

    btn.classList.add('show-ripples');
    wave.classList.add(rippleType);
    wave.style.top = top + "px";
    wave.style.left = left + "px";
    
    setTimeout(function() {
      btn.classList.remove('show-ripples'); 
      wave.classList.remove(rippleType);
      wave.classList.add('hide');
    }, 500);
  }
  
}

function getOffset( el ) {
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

export function waveCircular(rippleType, e) {
  var checkBox = e.currentTarget,
      waveCheckbox = checkBox.getElementsByClassName('wave-circular')[0];
  if (waveCheckbox) {
    waveCheckbox.classList.add(rippleType);
    waveCheckbox.classList.remove('hide');
    setTimeout(function() {
      waveCheckbox.classList.add('hide');
      waveCheckbox.classList.remove(rippleType);
    }, 400);
  } 
}

export function getFormattedDate(date) {
  const ordinal = d => {
    const nth = { '1': 'st', '2': 'nd', '3': 'rd' };
    return `${d}${nth[d] || 'th'}`;
  };
  var dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    today = new Date(),
    date = new Date(date),
    date = date < today ? today.setDate(new Date().getDate() + 3) : date,
    date = new Date(date);

  return ({
            date: ordinal(date.getDate()),
            month: months[date.getMonth()],
            dayName: dayNames[date.getDay()]
          }
  );
}
