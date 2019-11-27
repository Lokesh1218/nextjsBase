import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './index.css';
import TruebilStorage from '../../utility/truebil-storage';
import {apiUrl} from '../../globalConstants';

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hotelData: {},
      dataLoaded: false
    };
  }

  componentDidMount() {
    var classObj = this;
    fetch(apiUrl + `hotels/${this.props.query.id}`, {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    }).then(function(data) {
      classObj.setState({
        hotelData: data,
        dataLoaded: true
      });
    })
    .catch(function() {
      console.log("error");
    });
  }

  render() {
    const hotel = this.state.hotelData;
    const dataLoaded = this.state.dataLoaded;
    if(!dataLoaded) return null;
    return (
      <Fragment>
        <style jsx global>{ styles } </style>
        <div className="confirmation-page">
          <div className="confirmation-header-section">
            <h2 className="confirmation-heading">Your Booking is Temporarily Confirmed</h2>
            <p className="subheading hotel-name">{hotel.name}</p>
            <div className="hotel-address">
                {hotel.address.street + " " + hotel.address.locality + " " + hotel.address.city + " " +  hotel.address.pincode}
            </div>
          </div>
          <div className="user-info-block">
            <div className="user-booking">
              <div className="guest-text">Primary Guest</div>
              <p className="user-name">Lokesh Gamot</p>
              <div className="row">
                <div className="col">
                  <div className="guest-text">Check-in</div>
                  <p className="user-name">14 Aug</p>
                </div>
                <div className="col">
                  <div className="guest-text">Check-out</div>
                  <p className="user-name">15 Aug</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="guest-text">Nights</div>
                  <p className="user-name">1</p>
                </div>
                <div className="col">
                  <div className="guest-text">Rooms</div>
                  <p className="user-name">1</p>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div className="guest-text">Booking ID</div>
                  <p className="user-name">TRB-39956487341</p>
                </div>
              </div>
            </div>
            <div className="price-block">
              <div className="row">
                <div className="col-2">
                  <div className="guest-text">Payable at Hotel</div>
                  <p className="user-name">{hotel.price_in_usd}</p>
                </div>
              </div>
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

export default connect(mapStateToProps)(Confirmation);
