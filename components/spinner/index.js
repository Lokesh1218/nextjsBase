import React, { Component, Fragment } from 'react';
import styles from './index.css';

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: props.bgColor,
      marginTop: props.marginTop ? props.marginTop : 0
    }
  }
  render() {
    const bounceStyle = {
      backgroundColor: this.state.bgColor
    }
    const spinnerStyle = {
      marginTop: this.state.marginTop
    }

    return(
      <Fragment>
        <style jsx global>{ styles } </style>
        <div className="spinner" style={spinnerStyle}>
          <div className="bounce bounce1" style={bounceStyle}></div>
          <div className="bounce bounce2" style={bounceStyle}></div>
          <div className="bounce bounce3" style={bounceStyle}></div>
        </div>
      </Fragment>
    );
  }
}

export default Spinner;