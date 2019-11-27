import React, { Component } from 'react';
import IconEndToEndServices from '../../icons/icon_end_to_end_services';
import IconInspectedVerified from '../../icons/icon_inspected_verified';
import IconCompare from '../../icons/icon_compare';

export default class TruebilAdvantage extends Component {
  render() {
    return (
      <section className="home-section truebil-advantage-wrap">
        <h2 className="heading">The Truebil Advantage</h2>
        <ul className="horizontal-wrap">
          <li className="horizontal-item">
            <i className="end-to-end"><IconEndToEndServices/></i>
            <p>End to end service</p>
          </li>
          <li className="horizontal-item">
            <i className="inspected"><IconInspectedVerified/></i>
            <p>Inspected & verified</p>
          </li>
          <li className="horizontal-item">
            <i className="best-price"><IconCompare/></i>
            <p>Best price in the market</p>
          </li>
        </ul>
      </section>
    );
  }
}