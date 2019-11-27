/* Helper methods */
import TruebilStorage from './utility/truebil-storage';

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

