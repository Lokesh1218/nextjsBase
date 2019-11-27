import React, { Fragment }  from 'react';
import { connect } from 'react-redux';
import {Router} from '../.././routes';
import Cookies from 'js-cookie';
import TruebilStorage from '../../utility/truebil-storage';
import {openModal, closeModal} from '../modal/actions';
import OfflineSupport from './offline_support';
import styles from './common.css';
import resetStyles from './reset.css';
import {assetsUrl, razorpayUrl, ravenLibUrl, ravenKey} from '../.././globalConstants';
import OfflineToast from './offline_toast';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    var lastScroll;
    var deferredPrompt;
   
    this.popstateEventHandler = this.popstateEventHandler.bind(this);
  }

  componentDidMount() {
    const classObj = this;
    
    window.addEventListener('hashchange', function(hashURL) {
      classObj.popstateEventHandler(hashURL);
    });

    Router.router.events.on('routeChangeComplete', this.handleRouteChangeComplete);

    // Code for add to home screen
    window.addEventListener('scroll', function(e) {
      classObj.handleScroll(e, classObj);
    });

    // Event listener for add to home screen
    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();

      // Stash the event so it can be triggered later.
      classObj.deferredPrompt = e;

      // Drop Ga triggered_add_to_home_screen
      dropGAPixel('addToHomeScreen', 'triggered_add_to_home_screen', TruebilStorage.getItem('component'), 0);

      return false;
    });
  }

  handleScroll = (event, classObj) => {
    const component = TruebilStorage.getItem('component');
    var wst =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if ((classObj.lastScroll - 100) > wst) {
      var deferredPrompt = classObj.deferredPrompt;
      if(deferredPrompt !== undefined) {
        // The user has had a positive interaction with our app and Chrome
        // has tried to prompt previously, so let's show the prompt.
        deferredPrompt.prompt();

        // Drop ga showed_add_to_home_screen
        dropGAPixel('addToHomeScreen', 'showed_add_to_home_screen', component, 0);
        
        // Follow what the user has done with the prompt.
        deferredPrompt.userChoice.then(function(choiceResult) {
          if(choiceResult.outcome == 'dismissed') {
            console.log('User cancelled home screen install');
            dropGAPixel('addToHomeScreen', 'dismissed_add_to_home_screen',component, 0);
          }
          else {
            console.log('User added to home screen');
            dropGAPixel('addToHomeScreen', 'installed_add_to_home_screen',component, 0);
          }
        });
        // We no longer need the prompt.  Clear it up.
        classObj.deferredPrompt = undefined;
      }
    }
    classObj.lastScroll = wst;
  }

  handleRouteChangeComplete = url => {
    TruebilStorage.setItem('overlayNumber', 0);
    this.props.dispatch(closeModal({ isMoreClicked: false }));
    document.body.classList.remove('overflow-hidden');
  }

  popstateEventHandler = (hashURL) => {
    var obj = {};
    var oldURL = hashURL.oldURL;
    var newURL = hashURL.newURL;
    var oldURLHash = oldURL.split('#')[1];
    var newURLHash = newURL.split('#')[1];
    if (oldURLHash === 'razorpay') {
      document.getElementsByClassName('razorpay-container')[0].style.display = 'none';
      document.body.style = '';
      return;
    }
    if (oldURLHash) {
      if (oldURLHash === 'makeOffer') {
        this.props.dispatch(handlerMakeOffer({type: 'MAKE_OFFER', open: false, showThankYou: false, showForm: false, showVerify: false }));
      } else if (oldURLHash === 'showAlbum') {
        this.props.dispatch({type: 'GALLERY', showAlbum: false, showTyres: false, showSampleErrors: false, scrollToCaption: ''});
      } else if (oldURLHash === 'showCarousel') {
        obj[oldURLHash] = false;
        obj['showImgList'] = true;
        this.props.dispatch(closeModal(obj));
      } else {
        obj[oldURLHash] = false;
        this.props.dispatch(closeModal(obj));
      }
    }
    if (newURLHash) {
      obj[newURLHash] = true;
      this.props.dispatch(openModal(obj));
    }
  }

  componentWillUnmount() {
    const classObj = this;
    window.removeEventListener('hashchange', function(hashURL) {
      classObj.popstateEventHandler(hashURL);
    });
  }
  
  render() {
    const route = this.props.children.props.router.route.split('/')[1];

    return (
      <Fragment>
        <style jsx global>{ resetStyles } </style>
        <style jsx global>{ styles } </style>
        {this.props.children}  
        <OfflineToast />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  config: state.config
});

export default connect(mapStateToProps)(Layout);
