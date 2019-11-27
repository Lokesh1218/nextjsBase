import React, { Component } from 'react';
import { Link } from '../.././routes';
import Header from '../header/header';
import Spinner from '../spinner';
import ArrowRight from '../../icons/arrow_right';
import TruebilStorage from '../../utility/truebil-storage';
import {unitConvertor, toggleShortlist, wave, dropGAPixel, sendGA, sendPageView, setGADimension} from '../../helper';
import {fetchHomePageData} from './actions';
import styles from './index.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      
    };
    
  }

  render() {
    const data = this.props.data;
    const pHHeight = { height: '100px' };
    console.log(this.props);
    return(
      <div>
        <style jsx global>{styles} </style>
        <div className="phantom-header" style={pHHeight}></div>
        <div className="header-container" id="headerContainer">
          
        </div>
        { !this.props.dataLoaded ? <Spinner bgColor={ '#03A9F4' } marginTop={100} /> :
          <div>Lokesh here</div>
        }
      </div>     
    );
  }
}
export default Home;
