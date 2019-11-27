import React, { Component } from 'react';
import styles from './placeholder.css';

class Placeholder extends Component {
  render() {
    return (
      <div>
        <style jsx global>{styles} </style>
        <div className="placeholder">
          <div className="line-one"></div>
          <div className="small-images">
            <div className="first-sm-img"></div>
            <div className="sec-sm-img"></div>
          </div>
          <div className="line-two placeholder-line"></div>
          <div className="line-three placeholder-line"></div>
          <div className="line-four placeholder-line"></div>
        </div>
      </div>
    );
  }
}
export default Placeholder;