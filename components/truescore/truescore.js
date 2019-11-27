import React, {Fragment}  from 'react';
import TrueScoreIcon from '../../icons/truescore';
import styles from './truescore.css';

const getTrueScoreColor = (rating) => {
  if (rating <= 3.0) {
    return 'yellow';
  } else if (rating > 3.0 && rating <= 3.4) {
    return 'lime-green';
  } else if (rating >= 3.5 && rating <= 3.9) {
    return 'light-green';
  } else if (rating >= 4.0 && rating <= 4.4) {
    return 'green';
  } else if (rating >= 4.5 && rating <= 5.0) {
    return  'dark-green';
  }
}

export default (props) => (
  <Fragment>           
    <style jsx global>{ styles } </style>
    <div
      className={'truebil-score ' + getTrueScoreColor(props.rating) }
      style={{width: props.onlyRating ? '32px' : 'initial'}}>
      <span className="rating">{ props.rating }</span>
      { !props.onlyRating && <TrueScoreIcon/> }
    </div>
  </Fragment>
)