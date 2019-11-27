import React, { Component } from 'react';
import {Link} from '../.././routes';
import { sendGA } from '../../helper.js';

export default class ExpiredCar extends Component {
  render() {
    const seeAllExpiredGAData = {
      'data-ga-category': 'dedicated',
      'data-ga-action': 'clicked_see_all_expired',
      'data-ga-label': this.props.listingId
    };
    const cityName = this.props.cityName;
    return (
      <div className="expired-car-div" id="expired-car">
        <h2 className="expired-car-header">
          Snap.. this car is no longer available!
        </h2>
        <p className="expired-car-content">
          The car you are looking for is either sold out or removed by seller.<br
          />But don’t worry there are so many more cars like this.
        </p>
        <Link route={`/used-cars-in-${cityName}`}>
          <a 
            className="btn btn-blue-solid btn-large expired-cars-btn"
            {...seeAllExpiredGAData}
            onClick={sendGA}>
            Show all similar cars
          </a>
        </Link>
      </div>
    );
  }
}
