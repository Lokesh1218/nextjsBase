import React, { Component, Fragment } from 'react';
import styles from './filter.css';
import Spinner from '../spinner/index';
import CrossIcon from '../../icons/cross_icon';
import DownArrow from '../../icons/down_arrow_icon';
import TruebilDirectIcon from '../../icons/truebil_direct_logo';
import SearchIcon from '../../icons/search_icon';
import TruebilStorage from '../../utility/truebil-storage';
import {unitConvertor, animate, dropGAPixel, waveCircular, setGADimension} from '../../helper';
import 'nouislider';
import sliderStyles from 'nouislider/distribute/nouislider.css';
import Nouislider from 'react-nouislider';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    }
    this.toggleFilterHeight = this.toggleFilterHeight.bind(this );
  }

  toggleFilterHeight(event) {
    var filterTab = event.currentTarget;
    var filterHeaderHeight = filterTab.offsetHeight;
    var filterWrap = filterTab.parentElement;
    var filterBodyHeight = filterWrap.parentElement.getElementsByClassName('js-filter-body')[0].offsetHeight;
    var filterOuter =filterTab.closest(".filter-section");

    if (filterTab.className.match(/\bopen\b/)) {
      filterTab.classList.remove('open');
      filterOuter.style.height = '207px';
    } else {
      filterTab.classList.add("open");
      filterOuter.style.height = (filterBodyHeight + filterHeaderHeight) + 'px';
    }
  }

  render() {
    const config = this.props.config;

    return (
      <div>
        <style jsx global>{ styles }</style>
        <style jsx global>{ sliderStyles }</style>
        <div className="filter-overlay">
          <div className='filter-modal'>
            <div className='modal-header'>
              <i className='modal-cross-icon' onClick={this.props.toggleFilter}>
                <CrossIcon />
              </i>
              <div className="modal-filter-header">
                <div className="filter-text">
                  <h1 className="heading-1">Filters</h1>
                  <div className='filter-button-clear'>CLEAR ALL</div>
                </div>
              </div>
            </div>
            <div className='modal-body'>
              <div className="modal-body-content">
                <div className="filter">
                  <div className="filter-section">
                    <Features 
                      filterData={this.props.filterData.features}
                      toggleFilterHeight= {this.toggleFilterHeight}
                      updateFiltersSelected={ this.props.updateFiltersSelected} 
                      isAnyFieldSelected={this.isAnyFieldSelected} />
                  </div>
                  <div className="filter-section">
                    <Prices 
                      filterData={this.props.filterData.prices}
                      toggleFilterHeight= {this.toggleFilterHeight}
                      updateFiltersSelected={ this.props.updateFiltersSelected} 
                      isAnyFieldSelected={this.isAnyFieldSelected} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Prices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: 'prices'
    }  
  }

  toggleFilterHeight = (event) => {
    this.props.toggleFilterHeight(event);
  }

  updateFiltersSelected = (event) => {
    this.props.updateFiltersSelected(event);
  }

  render() {
    var prices = {
      "prices": [
        {
          "id": 1,
          "name": "Low"
        },
        {
          "id": 2,
          "name": "Medium"
        },
        {
          "id": 3,
          "name": "High"
        }
      ]
    };
    var classObj = this;
    var FeatureList = prices.prices.map((feature) =>
      <Checkbox key={ feature.id } 
        checkboxData={ feature } 
        isChecked = {classObj.props.filterData.includes(feature.id)}
        filterName={ classObj.state.filterName } 
        updateFiltersSelected={ classObj.updateFiltersSelected}  />
    )
    return (
      <div className="filter-outer js-filter-outer" data-category="feature">
        <div className="filter-inner js-filter-inner">
          <h3 className="filter-header">Price category</h3>
          <div className="filter-header-more filter-header" onClick={ this.toggleFilterHeight }>Show More</div>
        </div>
        <ul className="filter-body js-filter-body">{ FeatureList }</ul>
      </div>
    );
  }
}

class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: 'features'
    }  
  }
  
  toggleFilterHeight = (event) => {
    this.props.toggleFilterHeight(event);
  }

  updateFiltersSelected = (event) => {
    this.props.updateFiltersSelected(event);
  }

  render() {
    var features = {
      "features": [
        {
          "id": 59,
          "name": "Meeting Facility"
        },
        {
          "id": 44,
          "name": "Cab Service"
        },
        {
          "id": 2,
          "name": "Ironing Board"
        },
        {
          "id": 49,
          "name": "Conference Hall"
        },
        {
          "id": 55,
          "name": "Geyser"
        },
        {
          "id": 48,
          "name": "Complimentary water"
        },
        {
          "id": 15,
          "name": "Dining Table"
        },
        {
          "id": 106,
          "name": "Security"
        },
        {
          "id": 118,
          "name": "Bath Tub"
        },
        {
          "id": 19,
          "name": "Stove"
        },
        {
          "id": 52,
          "name": "Flat Screen Tv"
        },
        {
          "id": 56,
          "name": "Hot Water Kettle"
        },
        {
          "id": 50,
          "name": "Cupboards"
        },
        {
          "id": 54,
          "name": "Free Wifi"
        },
        {
          "id": 46,
          "name": "Complimentary tea coffee"
        },
        {
          "id": 30,
          "name": "Bar"
        },
        {
          "id": 8,
          "name": "Business Event Hosting"
        },
        {
          "id": 22,
          "name": "Safety Locker"
        },
        {
          "id": 119,
          "name": "Smoking Room"
        },
        {
          "id": 18,
          "name": "Microwave"
        },
        {
          "id": 14,
          "name": "Coffee Table"
        },
        {
          "id": 17,
          "name": "Fridge"
        },
        {
          "id": 13,
          "name": "Living Room"
        },
        {
          "id": 39,
          "name": "24 Hour Security"
        },
        {
          "id": 38,
          "name": "24 hour front desk"
        },
        {
          "id": 3,
          "name": "Guest Laundry"
        },
        {
          "id": 37,
          "name": "Queen Bed"
        },
        {
          "id": 45,
          "name": "Card Payment Accepted"
        },
        {
          "id": 29,
          "name": "Swimming Pool"
        },
        {
          "id": 110,
          "name": "Locker Available"
        },
        {
          "id": 5,
          "name": "Restaurant"
        },
        {
          "id": 7,
          "name": "Parking"
        },
        {
          "id": 33,
          "name": "Twin Bed"
        },
        {
          "id": 34,
          "name": "Wheel Chair"
        },
        {
          "id": 47,
          "name": "Complimentary Toiletries"
        },
        {
          "id": 23,
          "name": "Smoking room Available"
        },
        {
          "id": 1,
          "name": "Room Service"
        },
        {
          "id": 51,
          "name": "Elevator"
        },
        {
          "id": 6,
          "name": "Travel Desk"
        },
        {
          "id": 28,
          "name": "Roof Top Restaurant"
        },
        {
          "id": 27,
          "name": "Ac Room"
        },
        {
          "id": 32,
          "name": "King Bed"
        },
        {
          "id": 4,
          "name": "Gym"
        },
        {
          "id": 102,
          "name": "Mini Fridge"
        },
        {
          "id": 53,
          "name": "Free Breakfast"
        },
        {
          "id": 11,
          "name": "Balcony"
        },
        {
          "id": 122,
          "name": "Kitchenette"
        }
      ]
    };
    var classObj = this;
    //var isAnyFieldSelected = this.props.isAnyFieldSelected(this.props.dataFeatures);
    var FeatureList = features.features.map((feature) =>
      <Checkbox key={ feature.id } 
        checkboxData={ feature } 
        isChecked = {classObj.props.filterData.includes(feature.id)}
        filterName={ classObj.state.filterName } 
        updateFiltersSelected={ classObj.updateFiltersSelected}  />
    )
    return (
      <div className="filter-outer js-filter-outer" data-category="feature">
        <div className="filter-inner js-filter-inner">
          <h3 className="filter-header">Amenities</h3>
          <div className="filter-header-more filter-header" onClick={ this.toggleFilterHeight }>Show More</div>
        </div>
        <ul className="filter-body js-filter-body">{ FeatureList }</ul>
      </div>
    );
  }
}

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_checked: props.isChecked
    }
  }

  toggleChange = (e) => {
    this.props.updateFiltersSelected(e);
  }

  render() {
    var checkboxData = this.props.checkboxData;

    return(
      <li className="filter-option js-filter-option" onClick={ this.toggleChange }>
        <input 
          type="checkbox" 
          name={ this.props.filterName }
          checked={ this.props.isChecked } 
          readOnly
          value={ checkboxData.id }
          data-checked={ this.props.isChecked }
          data-type={ checkboxData.name } />
        <span className="category-name">{ checkboxData.name }</span>
        <i className="truebil-checkbox" onTouchStart={ waveCircular.bind(this, "dense-blue-ripple") }>
          <div className="wave-circular hide"></div>
        </i>
      </li>
    );
  }
}

export default Filter;
