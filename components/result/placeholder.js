import React, { Component } from 'react';
import styles from './placeholder.css';

class Placeholder extends Component {
  render() {
    return (
      <div>
        <style jsx global>{styles} </style>
        <div className="placeholder car-cart">
          <div className="line-one"></div>
          <div className="line-two placeholder-line"></div>
          <div className="line-three placeholder-line"></div>
          <div className="line-four placeholder-line"></div>
        </div>
        <div className="placeholder car-cart">
          <div className="line-one"></div>
          <div className="line-two placeholder-line"></div>
          <div className="line-three placeholder-line"></div>
          <div className="line-four placeholder-line"></div>
        </div>
        <div className="placeholder car-cart">
          <div className="line-one"></div>
          <div className="line-two placeholder-line"></div>
          <div className="line-three placeholder-line"></div>
          <div className="line-four placeholder-line"></div>
        </div>
      </div>
    );
  }
}
export default Placeholder;