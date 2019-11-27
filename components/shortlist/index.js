import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import {dropGAPixel, triggerFbEvent, setGADimension} from '../../helper';
import styles from './index.css';
import {apiUrl, assetsUrl} from '../../globalConstants';

class Shortlist extends Component {
  /**
    * @desc post shortlist status to api
    *
    */
  postShortlist = () => {
    let shortlist = this;
    var listingId = this.props.listingId,
          shortlistApiLink = apiUrl + 'users/shortlisted_cars/' + listingId + '/',
          postData = { listing: listingId },
          headers = this.props.config.requestHeaders;
    headers['Content-Type'] = 'application/json';

    fetch(shortlistApiLink, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(postData)
    })
    .then(function(response) {
      return response;
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      shortlist.props.callback && shortlist.props.callback();
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  sendFbAddToCart() {
    let fbPixelData = {
      eventName: "AddToCart",
      contentType: "product",
      carCategory: this.props.isInventory ? 'inventory' : 'marketplace',
      contentName: "add_shortlist",
      contentIds: parseInt(this.props.listingId),
      contentCategory: 'demand',
      carModel: this.props.variantName,
      price: this.props.carPrice
    }
    if (!this.props.isShortlisted)
      triggerFbEvent(fbPixelData);
  }

  /**
    * @desc post shortlist, after checking if user is logged in or not
    *
    */
  shortlistCar = () => {
    const isUserLoggedIn = this.props.config.isUserLoggedIn;
    if (!isUserLoggedIn) {
      this.props.dispatch(openLogin({
        type: 'LOGIN',
        openLogin: true,
        postLoginCallback: this.postShortlist,
        loginFormHeading: 'Please Login to access your shortlist anywhere!'
      }));
    } else {
      this.postShortlist();
    }
  }
  
  render() {
    const gaCategory = this.props.gaCategory,
          gaAction = this.props.isShortlisted ? 'remove_shortlist' : 'add_shortlist',
          gaLabel = this.props.config.component + (this.props.isInventory ? ',inventory' : '');

    return(
      <div>
        <style jsx global>{ styles } </style>
        <div onClick={(e) => {
          this.shortlistCar();
          this.sendFbAddToCart();

          //Set GA Dimension for shortlist
          let GADimensionTable = {
            '4': parseInt(this.props.listingId),
            '2': 'conversionintent',
            '5': this.props.carPrice,
            '8': this.props.variantName + (this.props.isInventory ? ' inventory' : ' marketplace')
          };
          setGADimension(GADimensionTable);
          dropGAPixel(gaCategory, gaAction, gaLabel, 0);
        }}>
          {this.props.children}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  config: state.config
});

export default connect(mapStateToProps)(Shortlist);
