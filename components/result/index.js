import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.css';
import Header from '../header/header';
import TruebilStorage from '../../utility/truebil-storage';
import { HotelLists } from './hotelLists';
import Filter from './filter';
import FilterIcon from '../../icons/filter_icon';
import SortIcon from '../../icons/sort_icon';
import {
  addOverflowHidden,
  removeOverflowHidden,
  toggleShortlist,
  wave} from '../../helper.js';
import {
  fetchFilterData,
  fetchResultPageData,
  setFlags,
  showFilterSpinner,
  changeFilterDot,
  updateResultPageData} from './actions';
import {openModal} from '../modal/actions';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showFilter: false, 
      filterData:{'features': [], 'prices': []}
    };

    this.toggleFilter = this.toggleFilter.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.applyPriceFilter = this.applyPriceFilter.bind(this);
    this.applyAmenitiesFilter = this.applyAmenitiesFilter.bind(this);
    this.toggleShortlist = toggleShortlist.bind(this, this.props.dispatch);
    this.setFlag = this.setFlag.bind(this);
  }

  componentDidMount() {
    let classObj = this;
    var sort = sessionStorage.getItem('sort'),
        search = window.location.search,
        query = '',
        cityInfo = this.props.config.cityInfo;

    if (TruebilStorage.hasOwnProperty('resultsData') && TruebilStorage.getItem('component') === 'listings' && search) {
      // render previous data if user come from dedicated page
      let resultsData = JSON.parse(TruebilStorage.getItem('resultsData'));
      const data = {
        data : resultsData.results,
        nextLink : resultsData.nextLink,
        dataLoaded: true,
        totalCars: resultsData.totalCars
      }
      this.props.dispatch(updateResultPageData(data));
    } else {
      search = search.replace(/_page=\d+/g, '_page=1');
      // Make sort by relevance if user comes from some other page except dedicated or Reload
      search = search.replace(/sort=[a-z]+/g, 'sort='+ sessionStorage.getItem('sort'));
      this.loadHotelData(search);
      TruebilStorage.setItem('lastScrollPosition', 0);
    }

    TruebilStorage.setItem('component', 'results');
    let scrollPosition = parseInt(TruebilStorage.getItem('lastScrollPosition'), 10);
    window.scrollTo(0, scrollPosition);
  }

  toggleFilter = () => {
    this.setState({
      showFilter: !this.state.showFilter
    }, () => {
      if (this.state.showFilter) {
        addOverflowHidden();
      } else {
        removeOverflowHidden();
      } 
    });
    TruebilStorage.setItem('lastScrollPositionY', 0);
  }

  setFlag() {
    const data = {
      reachedEnd: true,
      showLoader: true
    }
    this.props.dispatch(setFlags(data));
  }

  async updateFiltersSelected(e) {
    var label = e.currentTarget,
        input = label.getElementsByTagName('input')[0],
        type = input.type,
        value = input.value,
        key = input.name;
    console.log(this.state);
    var data = this.state.filterData;
    var keyValue = data[key];
    var dataObj = {};
    var i;

    if (input.getAttribute('data-checked') === 'false') {
      keyValue.push(parseInt(value));
    } else {
      var index = keyValue.indexOf(parseInt(value));
      if (index > -1) {
         keyValue.splice(index, 1);
      }
    }

    dataObj['data'] = data;
    await this.setState(dataObj);

    
    this.submitForm(this.props.result.data);

  }

  submitForm(oldData) {
    var filter  =  this.state.filterData;
    var dataAfterPriceFilter = this.applyPriceFilter(oldData, filter.prices);
    var finalData = this.applyAmenitiesFilter(dataAfterPriceFilter, filter.features);
    return finalData;
  }

  applyPriceFilter(oldData, priceFilter) {
    if (priceFilter.length === 0) return oldData;
    return oldData.filter(function(item) {
      return priceFilter.includes(item.price_category.id); 
    });
  }

  applyAmenitiesFilter(oldData, featureFilter) {
    if (featureFilter.length === 0) return oldData;
    return oldData.filter(function(item) {
      var allAmenities =  item.amenities.map(function(e) {
        return e.id
      });
      return allAmenities.includes(featureFilter);
    });
  }

  loadHotelData = (query) => {
    var apiLink = this.props.result.apiLink,
        sortParam = this.getSortParam(),
        queryLink = '';

    queryLink = query ? apiLink.concat(query) : apiLink;
    if (sortParam) {
      if (query) {
        if (queryLink.indexOf('sort') === -1) {
          queryLink += '&' + sortParam;
        }
      } else {
        queryLink += '?' + sortParam;
      }
    } 

    this.props.dispatch(fetchResultPageData(queryLink, this.props.config)); // Load the result page data
  }

  listingAjaxCallOnScroll = () => {
    const nextLink = this.props.result.nextLink;
    nextLink && this.props.dispatch(fetchResultPageData(nextLink, this.props.config)); // Load the result page data
  }

  getSortParam = () => {
    var sorted = sessionStorage.getItem('sort');

    return sorted ? 'sort=' + sorted : 0;
  }

  showFilterDot = (status) => {
    this.props.dispatch(changeFilterDot(status));
  }

  queryParam = (filters) => {
    var query = [],
        key,
        cityInfo = this.props.config.cityInfo,
        cityName = cityInfo ? cityInfo.name.toLowerCase() : 'india',
        newUrl = '/used-cars-in-' + cityName;

    for (key in filters) {
      if (filters[key]) {
        query.push(key +'=' + filters[key]);
      }
    }
    query = query.join('&');
    query = query.replace(/make=+/g, 'model=');

    if (query) {
      sessionStorage.setItem('buyerFiltersData', query);
      query = '?' + query;
      this.showFilterDot(true);
    } else {
      this.showFilterDot(false);
    }
    
    // Append user_search if not already present
    if (query.indexOf('user_search') === -1) {
      query += (query === '' ? '?' : '&') + 'user_search=true';
    }

    window.history.replaceState({}, null, newUrl + '?' + query);
    this.loadHotelData(query);
  }

  applySortFilter = () => {
    var nextLink = this.props.result.nextLink,
        order = sessionStorage.getItem('sort');

    // Append page in url if not present
    if (nextLink.indexOf('page') !== -1) {
      nextLink = nextLink.replace(/page=\d+/g, 'page=1');
    } else {
      nextLink += '&page=' + 1;
    }

    // Append sort in url if not present
    if (nextLink.indexOf('sort') !== -1) {
      nextLink = nextLink.replace(/sort=[a-z]+/g, 'sort=' + order);
    } else {
      nextLink += "&sort=" + order;
    }

    // Append user_search if not already present
    if (nextLink.indexOf('user_search') === -1)
      nextLink += '&user_search=true';

    this.setState({
      showSortDot: true
    });

    this.props.dispatch(fetchResultPageData(nextLink, this.props.config)); // Load the result page data
  }

  // Get Selected Filters for Tag
  getSeletedFilters = () => {
    var data = this.props.result.filterData,
        dataKeys = Object.keys(data),
        selectedArray = {};

    for (let i = 0; i < dataKeys.length; i++) {
      let key = dataKeys[i];
      if (key === 'prices') {
        let selectedPrices = this.getSelectedPriceFields(key);
        selectedArray['price_min'] = selectedPrices[0];
        selectedArray['price_max'] = selectedPrices[1];
      } else {
        selectedArray[key] = this.getSeletedFields(key)
      }
    };

    return selectedArray;
  }

  getSeletedFields = (fieldName) => {
    var fieldData = this.props.result.filterData[fieldName],
        selectedFields = [];

    if (fieldName === 'make') {
      for (var i = 0; i < fieldData.length; i++) {
        var model = fieldData[i]['model'];
        for (var j = 0; j < model.length; j++) {
          if(model[j].is_checked === true) {
            selectedFields.push(model[j].id);
          }
        }
      }
    } else {
      for (i = 0; i < fieldData.length; i++) {
        if (fieldData[i].is_checked === true) {
          selectedFields.push(fieldData[i].id);
        }
      }
    }
    return selectedFields.join(',');
  }

  getSelectedPriceFields = (fieldName) => {
    var fieldData = this.props.result.filterData[fieldName][0];
    if (parseInt(fieldData['filtered_price_max'], 10) === fieldData['max_price'] &&
        parseInt(fieldData['filtered_price_min'], 10) === fieldData['min_price']){
      return ['', ''];
    }
    else {
      return [fieldData['filtered_price_min'], fieldData['filtered_price_max']];
    }
  }

  clearFilter = () => {
    var fieldData,
        filterData = this.props.result.filterData,
        filterKeys = Object.keys(filterData),
        Obj = {},
        query = '';

    for (var key = 0; key < filterKeys.length; key++) {
      var fieldName = filterKeys[key];
      fieldData = this.props.result.filterData[fieldName];

      if (fieldName === 'make') {
        for (var i = 0; i < fieldData.length; i++) {
          var model = fieldData[i]['model'];
          for (var j = 0; j < model.length; j++) {
            model[j].is_checked = false;
          }
          fieldData[i]['model'] = model;
        }
      } else if (fieldName !== 'prices') {
        for (i = 0; i < fieldData.length; i++) {
          fieldData[i].is_checked = false;
        }
      }

      if (fieldName === 'prices') {
        for (i = 0; i < fieldData[0]['price_range'].length; i++) {
          filterData[fieldName][0]['price_range'][i].is_checked = false;
        }

        filterData[fieldName][0]['filtered_price_max'] = filterData[fieldName][0]['max_price'];
        filterData[fieldName][0]['filtered_price_min'] = filterData[fieldName][0]['min_price'];
      } else {
        filterData[fieldName] = fieldData;
      }
    }

    Obj['filterData'] = filterData;
    this.setState(Obj);
    query = this.getSeletedFilters();
    this.queryParam(query);

  }

  render() {
    //const config = this.props.Config;
    const pHHeight = '105px'; // phantom header height
    const carList = this.props.result.data;
    var newData = this.submitForm(this.props.result.data);
    const totalHotels = this.props.result.totalCars;
    const filterData = this.props.result.filterData;
    const config = this.props.config;
    const userInfo = config.userInfo;
    
    let cityInfo = config.cityInfo;
    let cityName = cityInfo.nameInLower;

    return (
      <div>
        <style jsx global>{styles} </style>
        <div className="phantom-header" style={{ height: pHHeight}}></div>
        <div className="header-container" id="headerContainer">
          <Header />
          <div className="sort-filter-wrap">
              <h1 className="total-cars">{ totalHotels + ' Hotels ' }</h1>
              <div className="filter-wrap"
                 id="filterAction" 
                 data-call-ajax="false" 
                 onClick={(e) => { this.toggleFilter()} } onTouchStart={ wave.bind(this, 'grey-ripple') }>
                <i className="filter-icon"><FilterIcon /></i>
                <span className="sort-filter-name-title">Filter
                  { this.props.result.showFilterDot &&  <span className="is-selected">•</span> }
                </span>
                <i className='wave hide'></i>
              </div>
            </div>
        </div>
        { this.state.showFilter && 
          <Filter 
            filterData={this.state.filterData}
            updateFiltersSelected={ this.updateFiltersSelected.bind(this) }
            queryParam={ this.queryParam }
            totalCars={ totalHotels }
            fnShowFilterSpinner={ this.showFilterSpinner }
            showFilterSpinner={ this.props.result.showFilterSpinner }
            toggleFilter={ this.toggleFilter }
            showFilterDot={this.props.result.showFilterDot}
            clearFilter={this.clearFilter}
            config={config}/>
        }


        <HotelLists
          config={ config }
          data={ newData }
          showLoader={ this.props.result.showLoader}
          dataLoaded={ this.props.result.dataLoaded}
          listingAjaxCallOnScroll={ this.listingAjaxCallOnScroll }
          setFlag={ this.setFlag }
          reachedEnd={ this.props.result.reachedEnd }
          totalHotels={ totalHotels }
          page={'result'}
          toggleShortlist={this.toggleShortlist}
          dataCategory={'data'}
          nextLink = {this.props.result.nextLink}
          similarListingOffset={this.props.result.similarListingOffset}
          similarListingCount={this.props.result.similarListingCount}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  result: state.result,
  config: state.config
});

export default connect(mapStateToProps)(Result);
