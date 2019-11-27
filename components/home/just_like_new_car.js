import React, { Component } from 'react';
import {Link} from '../.././routes';
import {sendGA, wave} from '../../helper';
import IconHighQuality from '../../icons/icon_high_quality';
import IconYear from '../../icons/icon_year';
import IconSpeedometer2000 from '../../icons/icon_speedometer_2000';
import IconYearKm from '../../icons/icon_year_km';

class JustLikeNewCar extends Component {
  render() {
    const yearDiff = new Date().getFullYear() - 2014;
    const cityName = this.props.cityInfo.nameInLower;
    
    return(
      <section className="home-section just-like-new-cars">
        <h2 className="heading">Cars just like new</h2>
        <div className="horizontal-container">
          <div className="horizontal-wrap">
            <Link route={ '/used-truebil-direct-cars-in-' + cityName }>
              <a className="horizontal-item">
                <div className="icon" data-ga-action="clicked_inventory" onClick={sendGA}>
                  <IconHighQuality />
                </div>
                <p>
                  Truebil Direct cars
                </p>
                <i className='wave hide'></i>
              </a>
            </Link>
            <Link route={ '/used-cars-in-' + cityName + '/?years=2014-01-01' }>
              <a className="horizontal-item">
                <div className="icon" data-ga-action="clicked_upto3years" onClick={sendGA}>
                  <IconYear />
                </div>
                <p>
                  { 'Upto ' + yearDiff + ' years old' }
                </p>
                <i className='wave hide'></i>
              </a>
            </Link>
            <Link route={ '/used-cars-in-' + cityName + '/?mileage=20000' }>
              <a className="horizontal-item">
                <div className="icon" data-ga-action="clicked_20000km" onClick={sendGA}>
                  <IconSpeedometer2000 />
                </div>
                <p>
                  Max. 20000 km
                </p>
                <i className='wave hide'></i>
              </a>
            </Link>
            <Link route={ '/used-cars-in-' + cityName + '/?mileage=20000&years=2014-01-01' }>
              <a className="horizontal-item">
                <div className="icon" data-ga-action="clicked_3years_20000km" onClick={sendGA}>
                  <IconYearKm />
                </div>
                <p>
                  { 'Max 20000 km ' + yearDiff + ' years old' }
                </p>
                <i className='wave hide'></i>
              </a>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
export default JustLikeNewCar;