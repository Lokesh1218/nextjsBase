import TruebilStorage from '../utility/truebil-storage';
import {addOverflowHidden, removeOverflowHidden, dropGAPixel} from '../helper';
import {closeFreemiumModal} from "../components/freemium_packages/close_freemium_modal";
import { updatePaymentModal } from "../components/payment/actions";
import {updateConfig} from '../globalActions';
import {assetsUrl, apiUrl} from '.././globalConstants';

var TruebilPayment = (function() {
  var open = function(payInfo, config, dispatch) {
    var subsId = payInfo.subscriptionId,
        mobile = payInfo.mobile,
        options = {
          'key': process.env.REACT_APP_RAZORPAY_KEY,
          'amount': payInfo.amount * 100,
          'name': 'Truebil',
          'description': payInfo.description,
          'image': assetsUrl + 'images/truebil_logo_small.png',
          'handler': 
          function (response) {
            if (payInfo.makeLoggedIn) {
              login(mobile, subsId, response.razorpay_payment_id, payInfo.redirectURL, config, dispatch);
            } else {
              updateRPI(subsId, response.razorpay_payment_id, payInfo.redirectURL, config, dispatch);
            }     
          },
          'prefill': {
            'contact': mobile,
            'email': payInfo.email
          },
          'notes': {
            'usertype': payInfo.userType,
            'subscriptionid': subsId,
            'mobile': mobile
          },
          'theme': {
            'color': '#00bbff'
          },
          'modal': {
            ondismiss: function() {
              removeOverflowHidden();
              window.history.back();
            }
          }
      };
    addOverflowHidden();
    var rzp = new window.Razorpay(options);
    rzp.open();
  },

  login = function(mobile, subsId, razorpayId, redirectURL, config, dispatch) {
    fetch(apiUrl + 'login/login_without_otp/', {
      method: 'POST',
      headers: Object.assign({}, config.requestHeaders, {'Content-Type': 'application/json'}),
      body: JSON.stringify({'mobile' : mobile})
    }).then(function (response) {
      return response.json();
    }).then(function(data) {
      TruebilStorage.setItem('_jwt', data.token);
      TruebilStorage.setItem('isUserLoggedIn', true);
      TruebilStorage.setItem('userInfo', JSON.stringify(data.user_info));
      updateRPI(subsId, razorpayId, redirectURL, config, dispatch);
    })
    .catch(function() {
      console.log("error");
    });
  },

  updateRPI = function(subsId, razorpayId, redirectURL, config, dispatch) {
    var jwt = TruebilStorage.getItem('_jwt');
    var postData = { 
        subscription_id : subsId,
        razorpay_payment_id : razorpayId
      };

    fetch(apiUrl + 'users/payment/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + jwt
      },
      body: JSON.stringify(postData)
    })
    .then(function(response) {
      return response;
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const userInfo = config.userInfo;
      closeFreemiumModal();
      if (data.payment_status) {
        dispatch(updatePaymentModal({
          showSuccessModal: true,
          subscriptionType: data.subscription_type,
          redirectURL: redirectURL
        }))
        updateConfig({isSubscribedBuyer: true});
        TruebilStorage.setItem('isSubscribedBuyer', true);
        dropGAPixel("payment", "payment_successful", TruebilStorage.getItem('component') + ',' + userInfo.name + ',' + userInfo.mobile + ',subId=' + data.subscription_type, 0);
      } else {
        dispatch({
          type: 'PAYMENT_MODAL',
          showFailedModal: true,
          subscriptionType: data.subscription_type
        });
        dropGAPixel("payment", "payment_failed", TruebilStorage.getItem('component') + ',' + userInfo.name + ',' + userInfo.mobile + ',subId=' + data.subscription_type, 0);
      }
    })
    .catch(function(err) {
      console.error(err);
    });
  };

  return {
    open: open
  }
})();

export default TruebilPayment;
