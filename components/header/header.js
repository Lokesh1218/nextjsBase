import React, { Component, Fragment }from 'react';
import { connect } from 'react-redux';
import {Link} from '../.././routes';
import TruebilLogo from '../../icons/truebil_logo';
import { sendGA, waveCircular, wave } from '../../helper';
import styles2 from './header.css'; 

class Header extends Component {
  render() {
    return (
      <Fragment>
        <style jsx global>{ styles2 } </style>
        <div className="tb-header-wrap js-menu-wrap">
          <div className="location-date">
            <div className="location-date-content">
              <p className="text-location">Mumbai</p>
              <p className="text-date">14 Aug - 15 Aug / 1 Adult, 1 Room</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  config: state.config
});

export default connect(mapStateToProps)(Header);
