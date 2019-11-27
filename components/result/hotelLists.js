import React, { Component, Fragment } from 'react';
import CustomLink from '../custom_link';
import {Link} from '../.././routes';
import styles from './hotelLists.css';
import TruebilStorage from '../../utility/truebil-storage';
import HeartIcon from '../shortlist/heart_icon';
import TruebilDirectIcon from '../../icons/direct_logo';
import IconPhone from '../../icons/icon_phone';
import Truescore from '../truescore/truescore';
import Placeholder from './placeholder';
import Loader from '../loader/loader';
import LazyLoad from 'react-lazy-load';
import Shortlist from '../shortlist';
import {arrayUnique, reverseUnitConvertor} from '../../helper';
import {assetsUrl} from '../../globalConstants';
import IconRight from '../../icons/icon_right';

export class HotelLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reachedEnd: false,
      showLoader: false,
      dataLoaded: false,
      nextLink: props.nextLink + 'hotels/',
      data: [],
      showRequestOverlay : false,
      showFeedbackForm: false
    }
    this.isLastResultOfTotal = false;
    this.debounce = this.debounce.bind(this);
  }

  componentDidMount() {
    this.props.dataLoaded && window.addEventListener('scroll', this.handleScroll);
  };


  componentDidUpdate(prevProps, prevState) {
    if (this.props.dataLoaded) {
      window.addEventListener('scroll', this.debounce(this.handleScroll, 10, true));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debounce(this.handleScroll, 10, true));
  }

  debounce(func, wait, immediate) {
      var timeout;

      return function executedFunction() {
        var context = this;
        var args = arguments;
          
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;
      
        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
      
        if (callNow) func.apply(context, args);
      };
  };

  handleScroll = (event) => {
    let oHotelList = this;
    let docHeight = document.documentElement.offsetHeight,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        wHeight = window.innerHeight,
        newScrollPosition = window.scrollY,
        header = document.getElementById('headerContainer'),
        headerWrapHeight = document.getElementsByClassName('js-menu-wrap')[0].offsetHeight,
        lastScrollPosition = TruebilStorage.getItem('lastScrollPosition'),
        relaxHeight = document.getElementsByClassName('hotel-cart')[0].offsetHeight * 2,
        isUserLoggedIn = oHotelList.props.config.isUserLoggedIn,
        buyerId = oHotelList.props.config.buyerId;
    // Header Animation
    
    if (newScrollPosition > headerWrapHeight) {
      if (newScrollPosition < lastScrollPosition) {
        header.style.top = '0px';
      } else {
        header.style.top =  -headerWrapHeight + "px";
      }
    } else {
      header.style.top = '0px';
    }

    if ((scrollTop > docHeight - wHeight - relaxHeight) && !oHotelList.props.reachedEnd && !oHotelList.state.isLastResultOfTotal && !document.body.classList.contains('overflow-hidden')) {
      this.props.setFlag();
      oHotelList.props.listingAjaxCallOnScroll();
    }
    TruebilStorage.setItem('lastScrollPosition', newScrollPosition);
  }

  /**
    * Set the class variable isLastResultOfTotal
    **/
  setIsLastResultOfTotal = (status) => {
    this.isLastResultOfTotal = status
  }

  render() {
    const totalHotels = this.props.totalHotels;
    const config = this.props.config;
    const filterIsInventory = this.props.filterIsInventory;
    const isSetglobalBuyerId = this.props.config.isSetglobalBuyerId;
    var showLoader = this.props.showLoader;
    var globalListingCounter = 0;
  
   
    let isUserLoggedIn = config.isUserLoggedIn;
    const userInfo = config.userInfo;
    const cityName = config.cityInfo.nameInLower;
    

    return (
      <Fragment>
        <style jsx global>{styles} </style>
        <div className="result-page">
          { 
            !this.props.dataLoaded ? <Placeholder /> :
            <div>
              {
                this.props.data.map((hotel, index) => {
                  globalListingCounter++;
                  var isLastResultOfTotal = totalHotels === globalListingCounter;
                  isLastResultOfTotal && this.setIsLastResultOfTotal(isLastResultOfTotal || similarListingOffset >= 0 || similarListingCount > 0);

                  return (
                    <div key={ index }>
                      <Hotel 
                        data={hotel} 
                        toggleShortlist={this.props.toggleShortlist.bind(this, index, this.props.dataCategory)}
                        config={config}
                      />
                    </div>
                  );
                })
              }
            </div>
          }
          
          { 
            showLoader && <Loader />
          }
        </div>
      </Fragment>
    );
  }
} 

class Hotel extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const
      config = this.props.config,
      hotelData = this.props.data,
      altTag = 'Used ' + hotelData.name + ' hote in Mumbai',// +config.cityInfo.name,
      isSuperSaver = hotelData.isValueForMoney,
      isUserLoggedIn = config.isUserLoggedIn,
      userInfo = config.userInfo;

    return (
      <div className="hotel-cart">
        <CustomLink props={hotelData}>
          <Link route={hotelData.hotel_link} prefetch>
            <a className="hotel-info-container"
              >
              <div className="upper-wrap">
                <div className="lazy-load-container">
                  {<LazyLoad 
                    height = {'150px'} 
                    debounce={false} 
                    offsetBottom={300}>
                    <HotelImages
                      imageUrls={hotelData.images}
                      imageHotelData={hotelData}
                      altTag={altTag}
                      config={config}
                      isSuperSaver={isSuperSaver}
                    />
                  </LazyLoad>}
                </div>
              </div>
              {
              <InfoSection
                hotelName={hotelData.name}
                price={hotelData.price_in_usd}
                area={hotelData.address}
                distance={hotelData.distance}
              />
              }
            </a>
          </Link>
        </CustomLink>
      </div>
    );
  }
}

class HotelImages extends Component {
  constructor(props){
    super(props);
  }
  
  /**
    * Hide image if its not loaded
    */
  onError = (e) => {
    e.target.style.display = 'none';
  }

  render() {
    const props = this.props;
    const images = this.props.imageUrls;
    const isSuperSaver = this.props.isSuperSaver;
    return (
      <div className="listing-container">
        <div className="listing-wrap">
          <div className="listing-patch-wrap">
            <div className="listing-patch">
              { isSuperSaver &&
                <div className='super-saver-wrap'>Super Saver</div>
              }
            </div>
          </div>
            { Object.keys(images).map((imageType) => {
              const imageTypeData = images[imageType];
              return(
                imageTypeData.map((img, index) => {
                  return (
                    <div key={index} className="listing-img-wrap">
                      <LazyLoad height={'150px'} debounce={false} offsetRight={200}>
                        <img className={this.props.imageHotelData.is_active ? "listing-name" : "listing-name sold"} src={ img.url } onError={ this.onError } alt={this.props.altTag} />
                      </LazyLoad>
                    </div>
                  ); 
                })
              )
            } 
            )};
        </div>
      </div>
    )
  }
}

const InfoSection = (props) => {
  return(
    <div className="info-section">
      <div className="name-location">
        <div className="name-text text-truncate">{props.hotelName}</div>
        <span className="subheading text-truncate">{props.area.locality}</span>
        <span className="subheading text-truncate distance">{props.distance/1000} Km</span>
      </div>
      <div className="hotel-price">
        <p className="hotel-price-text">
          {props.price}
        </p>
      </div>
    </div>
  );
}
