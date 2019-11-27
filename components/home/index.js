import React, { Component } from 'react';
import { Link } from '../.././routes';
import Header from '../header/header';
import PageHead from '../page_head';
import Spinner from '../spinner';
import ArrowRight from '../../icons/arrow_right';
import TruebilStorage from '../../utility/truebil-storage';
import {unitConvertor, toggleShortlist, wave, dropGAPixel, sendGA, sendPageView, setGADimension} from '../../helper';
import {fetchHomePageData} from './actions';
import styles from './index.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      filterData: TruebilStorage.getItem('filterData') ? JSON.parse(TruebilStorage.getItem('filterData')) : {},
      filterQuery: '',
      showHomeBottomSection:  false
    };
    this.toggleShortlist = toggleShortlist.bind(this, this.props.dispatch);
  }
  
  componentDidMount() {
    TruebilStorage.setItem('component', 'home');
    this.setHomeGADimension();
    sendPageView();
    const config = this.props.config;
    const isCitySelected = config.cityInfo.id;
    const dataLoaded = this.props.dataLoaded;
    const data = {
      requestHeaders: config.requestHeaders,
      cityId: config.cityInfo.id,
      buyerId: config.buyerId
    }

    if (!isCitySelected || !dataLoaded) {
      this.props.dispatch(fetchHomePageData(null, data)); // Load the home page data
      let filterQuery = this.getFilterQuery();
      this.setFilterQuery(filterQuery);
    }

    window.addEventListener('scroll', this.handleScroll); 
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setHomeGADimension() {
    let GADimensionTable = {
      '2': 'home',
      '4': null,
      '5': null,
      '8': null,
      '9': null
    };
    setGADimension(GADimensionTable);
  }

  handleScroll = (event) => {
    var newScrollPosition = window.scrollY,
        header = document.getElementById('headerContainer'),
        headerWrapHeight = document.getElementsByClassName('js-menu-wrap')[0].offsetHeight,
        lastScrollPosition = TruebilStorage.getItem('lastScrollPosition');

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
    // Show Home Bottom Section
    if (!this.state.showHomeBottomSection && newScrollPosition > 1000) {
      this.setState({
        showHomeBottomSection: true
      });
    }

    TruebilStorage.setItem('lastScrollPosition', newScrollPosition);
  }

  render() {
    const data = this.props.data;
    const pHHeight = { height: '100px' };
    const dataLoaded = this.props.dataLoaded;
    const revisitedUser = data.is_revisited_user;
    const config = this.props.config;
    const cityInfo = config.cityInfo;
    const pageHeadData = {
      title: 'Truebil.com - Used cars Marketplace',
      description: 'Searching for 100% verified used cars? Buy good condition, certified, second hand cars at fair prices including free services. ① Search ② Select ③ Buy',
      ogDescription: 'Buy 100% Certified and Inspected Used cars at fair prices. Get easy paper transfer and service warranty. Call 09619022022',
      ogTitle: 'Easiest way to buy and sell used cars'
    }

    return(
      <div>
        <style jsx global>{styles} </style>
        <PageHead {...pageHeadData} />
        <div className="phantom-header" style={pHHeight}></div>
        <div className="header-container" id="headerContainer">
          <Header config={config}/>
        </div>
        { !dataLoaded ? <Spinner bgColor={ '#03A9F4' } marginTop={100} /> :
          <div>
            <HomeFooter />
          </div>
        }
      </div>     
    );
  }
}
export default Home;
