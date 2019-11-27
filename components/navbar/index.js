import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {Link} from '../.././routes';
import { connect } from 'react-redux';
import { openLogin, openEditProfile } from '../login/actions';
import SearchIcon from '../../icons/search_lite';
import TruebilDirectIcon from '../../icons/direct_logo';
import FavouriteIcon from '../../icons/favourite_icon_nav';
import PremiumBuyerIcon from '../../icons/premium_buyer_icon_nav';
import PremiumSellerIcon from '../../icons/premium_seller_icon_nav';
import MoreIcon from '../../icons/more_icon_nav';
import SteeringIcon from '../../icons/steering_icon_nav';
import SellIcon from '../../icons/key_sell_icon';
import { NavLink } from 'react-router-dom';
import {updateConfig} from '../../globalActions';
import City from '../city/city';
import DropDownIcon from '../../icons/down_solid_arrow_icon';
import PaperTransferIcon from '../../icons/paper_transfer_nav_icon';
import CarInsuranceIcon from '../../icons/car_insurance_nav_icon';
import CarLoanIcon from '../../icons/car_loan_nav_icon';
import EmailIcon from '../../icons/email_nav_icon';
import InfoIcon from '../../icons/info_nav_icon';
import BookmarkIcon from '../../icons/bookmark_icon';
import KeyIcon from '../../icons/key_sell_icon';
import RightAngleIcon from '../../icons/angle_right_icon_nav';
import DashboardIcon from '../../icons/dashboard_nav_icon';
import ChatIcon from '../../icons/chat_icon_nav';
import LogOutIcon from '../../icons/logout_icon_nav';
import CallIcon from '../../icons/call_icon_nav';
import SellerPremiumModal from '../premium_seller';
import {showSellerPremiumModal} from '../premium_seller/actions';
import Script from 'react-load-script';
import { addOverflowHidden, removeOverflowHidden, sendGA, dropGAPixel, wave } from '../../helper';
import TruebilStorage from '../../utility/truebil-storage';
import styles from './index.css';
import {zopimUrl} from '../../globalConstants';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoreClicked : false,
      isSeller: this.props.config.isSeller,
      isSubscribedDealer: this.props.config.isSubscribedDealer,
      showSellerPremiumModal: this.props.showSellerPremiumModal
    }
    this.toggleMoreOptions = this.toggleMoreOptions.bind(this);
    this.showSellerPremium = this.showSellerPremium.bind(this);
    this.handlerSendGA = this.handlerSendGA.bind(this);
  }

  toggleMoreOptions() {
    this.props.isMoreClicked && window.history.back();
    !this.props.isMoreClicked ? addOverflowHidden() : removeOverflowHidden();
  }

  showSellerPremium() {
    this.setState({
      showSellerPremiumModal: true
    });
  }

  handlerSendGA() {
    const config = this.props.config;
    const userInfo = config.userInfo;
    const isSeller = config.isSeller;
    dropGAPixel('nav_bar', 'clicked_more', [TruebilStorage.getItem('component'), userInfo.name, userInfo.mobile, isSeller ? 'seller' : 'buyer'].join(','), 0);
  }

  render() {
    const config = this.props.config;
    const isSeller = config.isSeller;
    const isSubscribedDealer = config.isSubscribedDealer;

    return (
      <div>
        <style jsx global>{ styles } </style>
        <div className="nav-bar">
          { isSeller && 
            <SellerNav
              toggleMoreOptions = {this.toggleMoreOptions}
              isMoreClicked = {this.props.isMoreClicked}
              dispatch = {this.props.dispatch}
              handlerSendGA = {this.handlerSendGA}
              config = {config} />
          }
          { !isSeller &&
            <BuyerNav
              dispatch={this.props.dispatch}
              toggleMoreOptions = {this.toggleMoreOptions}
              config = {config}
              isMoreClicked = {this.props.isMoreClicked}
              handlerSendGA = {this.handlerSendGA}
              />
          }
        </div>
        <MoreOptions
          config={config}
          dispatch = {this.props.dispatch}
          isMoreClicked={this.props.isMoreClicked} />
        { this.props.showSellerPremiumModal && <SellerPremiumModal />}
      </div>
    );
  }
}

class BuyerNav extends Component {
  handleTestDriveClick = (e) => {
    this.props.dispatch(openLogin({
      type: 'LOGIN',
      postLogin: '/user/dashboard?activity=test_drive',
      openLogin: true,
      loginFormHeading: 'Please Login to access your Test Drive'
    }));
    sendGA(e);
  }

  handleFavouriteClick = (e) => {
    this.props.dispatch(openLogin({
      postLogin: '/user/dashboard?activity=shortlisted_cars',
      openLogin: true,
      loginFormHeading: 'Please Login to access your Shortlist'
    }));
    sendGA(e);
  }
  
  render() {
    const config = this.props.config;
    const userInfo = config.userInfo;
    const navbarGAData = {
      'data-ga-category': 'nav_bar',
      'data-ga-action': '',
      'data-ga-label': [userInfo.name, userInfo.mobile]
    };
    const dealerDashGAData = {
      'data-ga-category': 'navbar',
      'data-ga-action': 'clicked_dealer_dashboard',
      'data-ga-label': ''
    };

    const cityName = config.cityInfo.nameInLower;
    const isUserLoggedIn = config.isUserLoggedIn;
    const isSubscribedDealer = config.isSubscribedDealer;
    const jwtToken = config.jwt;
    let isMoreClicked = this.props.isMoreClicked;

    return (
      <ul className={isMoreClicked ? 'link-not-active nav-bar-horizontal' : 'nav-bar-horizontal'}>
        <li>
          <Link route={"/used-cars-in-" + cityName}>
            <a
              className="nav-bar-menu"
              onClick={sendGA}
              onTouchStart={wave.bind(this, "grey-ripple")}
              {...Object.assign(navbarGAData,
            {'data-ga-action': 'clicked_browse','data-ga-label': navbarGAData['data-ga-label'].concat(['buyer'])})}>
              <div className="icon-logo-nav">{ <SearchIcon /> }</div>
              <p className="nav-bar-text">BROWSE</p>
              <i className="wave hide"></i>
            </a>
          </Link>
        </li>
        {
          isUserLoggedIn ? 
            <li>
              <Link route="/user/dashboard?activity=test_drive">
                <a
                  onClick={sendGA}
                  className="nav-bar-menu"
                  onTouchStart={ wave.bind(this, "grey-ripple") } {...Object.assign(navbarGAData, {'data-ga-action': 'clicked_test_drive'})}>
                  <div className="icon-logo-nav truebil-direct">{ <TruebilDirectIcon />}</div>
                  <p className="nav-bar-text">TEST DRIVE</p>
                  <i className="wave hide"></i>
                </a>
              </Link>
            </li>
          :
            <li>
              <div className="nav-bar-menu" {...Object.assign(navbarGAData, {'data-ga-action': 'clicked_test_drive'})}
                onClick={this.handleTestDriveClick}
                onTouchStart={ wave.bind(this, "grey-ripple") }>
                <div className="icon-logo-nav truebil-direct"><TruebilDirectIcon /></div>
                <p className="nav-bar-text">TEST DRIVE</p>
                <i className="wave hide"></i>
              </div> 
            </li>
        }
        {
          isUserLoggedIn ?
            <li>
              <Link route="/user/dashboard?activity=shortlisted_cars">
                <a {...Object.assign(navbarGAData, {'data-ga-action': 'clicked_fav'})}
                onClick={sendGA}
                className="nav-bar-menu"
                onTouchStart={ wave.bind(this, "grey-ripple") }>
                <div className="icon-logo-nav">{ <FavouriteIcon />}</div>
                <p className="nav-bar-text">FAVOURITE</p>
                <i className="wave hide"></i>
                </a>
              </Link>
            </li>
          :
            <li>
              <div className="nav-bar-menu" {...Object.assign(navbarGAData, {'data-ga-action': 'clicked_fav'})}
                onClick={this.handleFavouriteClick}
                onTouchStart={ wave.bind(this, "grey-ripple") }>
                <div className="icon-logo-nav">{ <FavouriteIcon />}</div>
                <p className="nav-bar-text">FAVOURITE</p>
                <i className="wave hide"></i>  
              </div>
            </li>
        }
        {
          isSubscribedDealer && 
          <li>
            <a href={'/user/dealer?token=' + jwtToken} {...dealerDashGAData} onClick={sendGA} className="nav-bar-menu"
              onTouchStart={ wave.bind(this, "grey-ripple") }>
              <div className="icon-logo-nav">{ <DashboardIcon />}</div>
              <p className="nav-bar-text">DEALER</p>
              <i className="wave hide"></i>
            </a>
          </li>
        }
        { 
          !isSubscribedDealer &&
          <li>
            <Link route="/user/subscription">
              <a {...Object.assign(navbarGAData, {'data-ga-action': 'clicked_buyer_premium'})}
                onClick={sendGA}
                className="nav-bar-menu"
                onTouchStart={ wave.bind(this, "grey-ripple") }>
                <div className="icon-logo-nav">{ <PremiumBuyerIcon />}</div>
                <p className="nav-bar-text">PREMIUM</p>
                <i className="wave hide"></i>
              </a>
            </Link>
          </li>
        }
        
        <li>
          <a
            href="#isMoreClicked"
            className={isMoreClicked ? "active-more nav-bar-menu" : "nav-bar-menu"}
            onClick={() => {
              this.props.toggleMoreOptions();
              this.props.handlerSendGA();
            }}
            onTouchStart={wave.bind(this, "grey-ripple")}
          >
            <div className="icon-logo-nav">{<MoreIcon />}</div>
            <p className="nav-bar-text">MORE</p>
            <i className="wave hide" />
          </a>
        </li>
      </ul>
    );
  }
}

class SellerNav extends Component {
  constructor(props) {
    super(props);
    this.handleSellerPremiumClick = this.handleSellerPremiumClick.bind(this);
  }

  handleSellerPremiumClick(e) {
    window.history.pushState(null, null, '#showSellerPremiumModal');
    this.props.dispatch(showSellerPremiumModal());
    sendGA(e);
  }
  
  handleMyCarClick = (e) => {
    this.props.dispatch(openLogin({
      postLogin: '/user/seller-dashboard',
      openLogin: true,
      loginFormHeading: 'Please Login to access your Car anywhere!'
    }));
    sendGA(e)
  }
  
  handleSellNowClick = (e) => {
    this.props.dispatch(openLogin({
      postLogin: '/user/seller-dashboard',
      openLogin: true,
      loginFormHeading: 'Please Login to access your Car anywhere!'
    }));
    sendGA(e);
  }

  render() {
    const config = this.props.config;
    const userInfo = config.userInfo;
    const navbarGAData = {
      'data-ga-category': 'nav_bar',
      'data-ga-action': '',
      'data-ga-label': [userInfo.name, userInfo.mobile]
    };
    const dealerDashGAData = {
      'data-ga-category': 'navbar',
      'data-ga-action': 'clicked_dealer_dashboard',
      'data-ga-label': ''
    };
    const cityName = config.cityInfo.nameInLower;
    const jwtToken = config.jwt;
    let isMoreClicked = this.props.isMoreClicked;
    const isUserLoggedIn = config.isUserLoggedIn;
    const isSubscribedDealer = config.isSubscribedDealer;

    return (
      <ul className={isMoreClicked ? 'link-not-active nav-bar-horizontal' : 'nav-bar-horizontal'}>
        <li>
          <Link route={"/used-cars-in-" + cityName}>
            <a {...Object.assign(navbarGAData,
            {'data-ga-action': 'clicked_browse', 'data-ga-label': navbarGAData['data-ga-label'].concat(['seller'])})}
              onClick={sendGA}
              className="nav-bar-menu"
              onTouchStart={wave.bind(this, "grey-ripple")}>
              <div className="icon-logo-nav">{ <SearchIcon /> }</div>
              <p className="nav-bar-text">BROWSE</p>
              <i className="wave hide"></i>
            </a>
          </Link>
        </li>
        {
          isUserLoggedIn ? 
            <li>
              <Link route="/user/seller-dashboard">
                <a {...Object.assign(navbarGAData, {'data-ga-action': 'clicked_mycar'})}
                  onClick={sendGA}
                  className="nav-bar-menu"
                  onTouchStart={wave.bind(this, "grey-ripple")}>
                  <div className="icon-logo-nav">{ <SteeringIcon />}</div>
                  <p className="nav-bar-text">MY CAR</p>
                  <i className="wave hide"></i>
                </a>
              </Link>
            </li>
          :
            <li>
              <div className="nav-bar-menu" onTouchStart={ wave.bind(this, "grey-ripple") } {...Object.assign(navbarGAData, 
                {'data-ga-action': 'clicked_mycar'})} onClick={this.handleMyCarClick}>
                <div className="icon-logo-nav">{ <SteeringIcon />}</div>
                <p className="nav-bar-text">MY CAR</p>
                <i className="wave hide"></i>
              </div>
            </li>
        }
        {
          isUserLoggedIn ? 
            <li>
              <Link route="/user/seller-dashboard">
                <a {...Object.assign(navbarGAData, {'data-ga-action': 'clicked_sell_now'})}
                  onClick={sendGA}
                  className="nav-bar-menu"
                  onTouchStart={wave.bind(this, "grey-ripple")}>
                  <div className="icon-logo-nav">{ <SellIcon />}</div>
                  <p className="nav-bar-text">SELL NOW</p>
                  <i className="wave hide"></i>
                </a>
              </Link>
            </li>
          :
            <li>
              <div className="nav-bar-menu" onTouchStart={ wave.bind(this, "grey-ripple") } {...Object.assign(navbarGAData, 
                {'data-ga-action': 'clicked_sell_now'})} onClick={this.handleSellNowClick}>
                <div className="icon-logo-nav">{ <SellIcon />}</div>
                <p className="nav-bar-text">SELL NOW</p>
                <i className="wave hide"></i>
              </div>
            </li>
        }
        {
          isSubscribedDealer &&
          <li>
            <a href={'/user/dealer?token=' + jwtToken} {...dealerDashGAData} onClick={sendGA}
              className="nav-bar-menu" onTouchStart={ wave.bind(this, "grey-ripple") }>
              <div className="icon-logo-nav">{ <DashboardIcon />}</div>
              <p className="nav-bar-text">DEALER</p>
              <i className="wave hide"></i>
            </a>
          </li>
        }
        { !isSubscribedDealer &&
          <li>
            <div className="nav-bar-menu" {...Object.assign(navbarGAData, {'data-ga-action': 'clicked_seller_premium'})}
              onClick={this.handleSellerPremiumClick} onTouchStart={ wave.bind(this, "grey-ripple") }>
              <div className="icon-logo-nav">{ <PremiumSellerIcon />}</div>
              <p className="nav-bar-text">PREMIUM</p>
              <i className="wave hide"></i>
            </div>
          </li>
        }
        <li>
        <a
            href="#isMoreClicked"
            className={isMoreClicked ? "active-more nav-bar-menu" : "nav-bar-menu"}
            onClick={() => {
              this.props.toggleMoreOptions();
              this.props.handlerSendGA();
            }}
            onTouchStart={wave.bind(this, "grey-ripple")}
          >
            <div className="icon-logo-nav">{<MoreIcon />}</div>
            <p className="nav-bar-text">MORE</p>
            <i className="wave hide" />
          </a>
        </li>
      </ul>
    );
  }
}

class MoreOptions extends Component {
  constructor(props) {
    super(props);
    const selectedCityName = props.config.cityInfo.name !== 'India' ? props.config.cityInfo.name : 'All Cities';

    this.state = {
      cityClick: false,
      cityName: selectedCityName,
      isSeller: props.config.isSeller,
      scriptLoaded: false,
    }

    this.showCities = this.showCities.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.openChat = this.openChat.bind(this);
    this.hideZopimChatDefaultBtn = this.hideZopimChatDefaultBtn.bind(this);
  }

  showCities() {
    this.setState({
      cityClick: !this.state.cityClick
    });
  }

  closeMenu() {
    removeOverflowHidden();
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
    window.$zopim.livechat.button.hide();
  }

  hideZopimChatDefaultBtn() {
    window.$zopim.livechat.button.hide();
  }

  openChat() {
    const isUserLoggedIn =  this.props.config.isUserLoggedIn;
    if (isUserLoggedIn) {
      const userInfo = this.props.config.userInfo;

      window.$zopim.livechat.setName(userInfo['name']);
      window.$zopim.livechat.setPhone(userInfo['mobile']);
      window.$zopim.livechat.setEmail(userInfo['email']);
    }
    window.$zopim.livechat.window.show();
    window.$zopim.livechat.window.onHide(this.hideZopimChatDefaultBtn);
  }

  async onCityChange(cityName) {
    this.setState({
      cityName: cityName,
      cityClick: false,
    });

    var component = TruebilStorage.getItem('component');
    var url = window.location.href;
    let cities = this.props.config.cities;
    let regexStr = '';
    regexStr += cities.map(function(ele){
      return ele.name;
    }).join("|");
    regexStr += '|india';
    let rx = new RegExp(regexStr, 'i');

    this.props.dispatch({type: 'MODAL_OPEN_STATE', modalType: { isMoreClicked: false }});
    if (component === 'results') {
      var newUrl = url.replace(rx, cityName);
      window.location.assign(newUrl);
    } else {
      window.location.replace(window.location.pathname);
    }
  }

  logout() {
    TruebilStorage.removeItem('_jwt');
    TruebilStorage.removeItem('isUserLoggedIn');
    Cookies.remove('_jwt');
    this.props.dispatch(updateConfig({isUserLoggedIn: false}));
    window.location.reload();
  }
  
  handleLoginClick = (e) => {
    this.props.dispatch(openLogin({
      openLogin: true,
      loginFormHeading: 'One step Login with OTP!'
    }));
    sendGA(e);
  }

  handleEditProfileClick = (e) => {
    this.props.dispatch(openEditProfile({
      openEditProfile: true
    }));
    sendGA(e);
  }

  render() {
    const gaCategory = 'header_ham';
    const config = this.props.config;
    const userInfo = config.userInfo;
    const isSeller = config.isSeller;
    const isUserLoggedIn = config.isUserLoggedIn;

    const loginGAData = {
      'data-ga-category': gaCategory,
      'data-ga-action': 'clicked_signup_login'
    };

    const editProfileGAData = {
      'data-ga-category': gaCategory,
      'data-ga-action': 'clicked_edit_profile',
      'data-ga-label': userInfo['mobile']
    };

    const supportChatGAData = {
      'data-ga-category': gaCategory,
      'data-ga-action': 'clicked_support_chat',
      'data-ga-label': userInfo['mobile']
    };

    const aboutGAData ={
      'data-ga-category': gaCategory,
      'data-ga-action': 'clicked_aboutus',
      'data-ga-label': userInfo['mobile']
    };
    const contactGAData ={
      'data-ga-category': gaCategory,
      'data-ga-action': 'clicked_contactus',
      'data-ga-label': userInfo['mobile']
    };

    const logoutGAData = {
      'data-ga-category': gaCategory,
      'data-ga-action': 'clicked_logout',
      'data-ga-label': userInfo['mobile']
    };

    const callGAData = Object.assign({}, supportChatGAData, {'data-ga-action': 'clicked_support_phone'});

    return (
      <div className={this.props.isMoreClicked ? "nav-bar-more shown" : "nav-bar-more"}>
        { this.props.isMoreClicked && <Script url={ zopimUrl } onLoad={ this.handleScriptLoad.bind(this) } />}
          <div className="nav-header-wrap">
            <div>
              <div className="city-dropdown">
                <span className="city-name" onClick={this.showCities}>{this.state.cityName}</span>
                <i className="city-down-arrow">{ <DropDownIcon />}</i>
              </div>
              <City
                cityClick={this.state.cityClick}
                onCityChange={this.onCityChange}
                config={this.props.config} /> 
            </div>
            {
            !isUserLoggedIn ?
               <div className="signup-block" {...loginGAData} onClick={this.handleLoginClick}>
                <span className="login-sign-text">Sign up / Log in</span>
              </div>
            :
              <div className="login-tab" {...editProfileGAData} onClick={this.handleEditProfileClick}>
                <div className="name-profile-edit-wrap">
                  <p className="user-name">Hi {userInfo['name']}!</p>
                  <p className="edit-profile">Edit Profile</p>
                </div>
              </div>
            }
          </div>

          { isSeller && <SellerMore config = {this.props.config} dispatch={this.props.dispatch} /> }
          { !isSeller && <BuyerMore config = {this.props.config} /> }
          <div  className="menu-list-item">
            <div className="menu-list-content" {...supportChatGAData} onClick={(e) => {
            this.openChat();
            sendGA(e);
          }} onTouchStart={ wave.bind(this, "grey-ripple") }>
            <div className="wave hide"></div>
            <i className="icon-more"><ChatIcon /></i>
            <span className="menu-text">Chat with us (Online)</span>
            </div>
          </div>

          <div className="menu-list-item bottom-sepration">
            <a className="menu-list-content" href="tel:09619-022-022" {...callGAData} onClick={sendGA}
              onTouchStart={ wave.bind(this, "grey-ripple") }>
              <div className="wave hide"></div>
              <i className="icon-more"><CallIcon /></i>
              <span className="menu-text">Truebil support: 9619-022-022</span>
            </a>
          </div>

          <div className="menu-list-item">
            <Link route={'/about'}>
              <a {...aboutGAData}
                className="menu-list-content"
                onClick={sendGA}
                onTouchStart={wave.bind(this, "grey-ripple")}>
                <div className="wave hide"></div>
                <i className="icon-more"><InfoIcon /></i>
                <span className="menu-text">About us</span>
              </a>
            </Link>
          </div>

          <div className="menu-list-item">
            <Link route={'/contact'}>
              <a 
                {...contactGAData}
                className="menu-list-content"
                onClick={sendGA}
                onTouchStart={wave.bind(this, "grey-ripple")}>
                <div className="wave hide"></div>
                <i className="icon-more"><EmailIcon /></i>
                <span className="menu-text">Contact us</span>
              </a>
            </Link>
          </div>

          { isUserLoggedIn && 
            <div className="menu-list-item">
              <div className="menu-list-content" {...logoutGAData} onClick={(e) => {this.logout(); sendGA(e)}}
                onTouchStart={ wave.bind(this, "grey-ripple") }>
              <div className="wave hide"></div>
              <i className="icon-more"><LogOutIcon /></i>
                <span className="menu-text">Logout</span>
              </div>
            </div>
          }
      </div>
    );
  }
}

class Links extends Component {
  render() {
    const gaCategory = this.props.gaCategory;
    var linksGAData = { 'data-ga-category': gaCategory };

    var linkList = this.props.links.map((link) => {
      linksGAData['data-ga-action'] = 'clicked_' + link.gaAction;
      return (
        <li key={ link.id } className="menu-list-item">
          <Link route={ '/' + link.to }>
            <a {...linksGAData} 
              className="menu-list-content"
              onClick={sendGA}
              onTouchStart={wave.bind(this, "grey-ripple")}>
              <div className="wave hide"></div>
              <i className="icon-more">
                <DynamicIcon iconName={String(link.id)} />
              </i>
              <span className="menu-text">{ link.label}</span>
            </a>
          </Link>
        </li>
      )}
    );
    return(
      <ul className="menu-items">
        { linkList }
      </ul>
    );
  }
}

class DynamicIcon extends Component {
  icons = {
    papertransfer: PaperTransferIcon,
    carinsurance: CarInsuranceIcon,
    carloan: CarLoanIcon,
    premiumbuyer: PremiumBuyerIcon,
    key: KeyIcon,
    rightAngle : RightAngleIcon,
    rightangle: RightAngleIcon,
    searchlite: SearchIcon,
    testdrive : SteeringIcon,
    shortlisted: FavouriteIcon,
    recommendation: BookmarkIcon
  };

  render() {
    const TagName = this.icons[this.props.iconName];
    return <TagName />;
  }
}

class SellerMore extends Component {
  handleReportingSoldClick = (e) => {
    this.props.dispatch(openLogin({
      postLogin: '/user/seller-dashboard',
      openLogin: true,
      loginFormHeading: 'Please Login to access your Car anywhere!'
    }));
    sendGA(e);
  }

  render() {
    const gaCategory = 'navbar';
    const cityName = this.props.config.cityInfo.nameInLower;
    var isUserLoggedIn = this.props.config.isUserLoggedIn,
      primaryLinks = [
        {
          'id': 'rightAngle',
          'label': 'Home',
          'to': '',
          'gaAction': 'home'
        }
      ],
      secondaryLinks = [
        {
          'id': 'searchlite',
          'label': 'See our verified collection',
          'to': 'used-cars-in-' + cityName,
          'gaAction': 'buy'
        },
        {
          'id': 'testdrive',
          'label': 'Test drive Truebil Direct cars',
          'to': 'user/dashboard?activity=test_drive',
          'gaAction': 'test_drive_more'
        },
        {
          'id': 'shortlisted',
          'label': 'Your Favourites List',
          'to': 'user/dashboard?activity=shortlisted_cars',
          'gaAction': 'shortlisted_more'
        },
        {
          'id': 'premiumbuyer',
          'label': 'Become Premium Buyer',
          'to': 'user/subscription',
          'gaAction': 'clicked_truebil_premium'
        }
      ];
    let sellerDashboardGAData = {
      'data-ga-category': 'clicked_truebil_premium',
      'data-ga-action': 'navbar',
    };
    return (
      <div>
        <ul className="primary-links">
          <Links links={ primaryLinks } gaCategory={gaCategory} />
          {
            isUserLoggedIn ? 
              <li className="menu-list-item">
                <Link href="/user/seller-dashboard">
                  <a {...sellerDashboardGAData} 
                    className="menu-list-content"
                    onClick={sendGA}>
                    <div className="wave hide"></div>
                    <i className="icon-more">{ <RightAngleIcon /> }</i>
                    <span className="menu-text">Already Sold your car? Report it</span>
                  </a>
                </Link>
              </li>
            :
              <li>
                <div className="menu-list-item" onTouchStart={ wave.bind(this, "grey-ripple") }
                  {...sellerDashboardGAData} onClick={this.handleReportingSoldClick}>
                  <div className="wave hide"></div>
                  <i className="icon-more">{ <RightAngleIcon /> }</i>
                  <span className="menu-text">Already Sold your car? Report it</span>
                </div>
              </li>
        }
        </ul>
        <h3 className="secondary-links-header">Looking for car upgrade?</h3>
        <ul className="secondary-links">
          <Links links={ secondaryLinks } gaCategory={gaCategory} />
        </ul>
      </div>
    );
  }
}

class BuyerMore extends Component {
  render() {
    const gaCategory = 'navbar';
    const cityName = this.props.config.cityInfo.nameInLower;
    const primaryLinks = [
      {
        'id': 'rightAngle',
        'label': 'Home',
        'to': '',
        'gaAction': 'home'
      },
      {
        'id': 'papertransfer',
        'label': 'Paper Transfer',
        'to': 'used-car-paper-transfer',
        'gaAction': 'papertransfer'
      },
      {
        'id': 'carinsurance',
        'label': 'Car Insurance',
        'to': 'used-car-insurance',
        'gaAction': 'carinsurance'
      },
      {
        'id': 'carloan',
        'label': 'Car Loan',
        'to': 'used-car-loan',
        'gaAction': 'carloan'
      },
      {
        'id': 'premiumbuyer',
        'label': 'Become Premium Buyer',
        'to': 'user/subscription',
        'gaAction': 'clicked_truebil_premium'
      }
    ],
    secondaryLinks = [
      {
        'id': 'key',
        'label': 'Sell your car',
        'to': 'sell-used-cars-in-' + cityName,
        'gaAction': 'sell'
      }
    ];

    return (
      <div>
        <ul className="primary-links">
          <Links links={ primaryLinks } gaCategory={gaCategory} />
        </ul>
        <h3 className="secondary-links-header">Looking for car upgrade?</h3>
        <ul className="secondary-links">
          <Links links={ secondaryLinks } gaCategory={gaCategory} />
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  config: state.config,
  isMoreClicked: state.modal.isMoreClicked,
  showSellerPremiumModal: state.modal.showSellerPremiumModal
});

export default connect(mapStateToProps)(NavBar);
