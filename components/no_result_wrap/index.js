import React, { Component, Fragment } from 'react';
import styles from './index.css';

const NoResultWrap = (props) =>  {
  const cityName = props.config.cityInfo.nameInLower;
  
  return(
    <Fragment>
      <style jsx global>{styles} </style>
      <div id="noResultText" className="no-result result-text">
        <p  className="sorry-text">Sorry! No cars found</p>
        <p className="remove-filter-text">Please remove one or more applied filters from tags at the top or filter section.</p>
        <div onClick={props.clearFilter} className="btn btn-large btn-blue-outline show-all-cars">
          I’d like to see all cars
          <div className="wave hide"></div>
        </div>
      </div>
    </Fragment>
  );
}

export default NoResultWrap