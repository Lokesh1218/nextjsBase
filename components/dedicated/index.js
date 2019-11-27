import React, {Component} from 'react';
import {Link} from '../.././routes';
import {fetchDedicatedPageData, updateDedicatedData, resetToInitialState} from './actions';
import Placeholder from './placeholder';
import LazyLoad from 'react-lazy-load';
import TruebilStorage from '../../utility/truebil-storage';
import {apiUrl, assetsUrl} from '../../globalConstants';
import styles from './index.css';
import ImageGallery  from '../img_gallery';
import fetch from 'isomorphic-unfetch';
import apiData from './api_data.json';
import Header from './header';

class DedicatedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: apiData,
      openCarousel: false,
      showCrossIcon: false
    };

  }

  componentDidMount() {

  }

  onClickHanler = () => {
    this.setState({
      openCarousel: true,
      showCrossIcon: true
    });
  }

  crossIconClickHandler = () => {
    this.setState({
      openCarousel: false,
      showCrossIcon: false
    });
  }

  render() {
    const data = this.state.data.data;
    const openCarousel = this.state.openCarousel;
    
    return(
      <div className="dedicatd-container">
        <style jsx global>{styles} </style>
        <Header
          showCrossIcon={this.state.showCrossIcon}
          crossIconClickHandler={this.crossIconClickHandler}
        />
        <div className={openCarousel ? 'phantom phantom-100vh' : 'phantom'}></div>
        <div className={openCarousel ? 'carousel-continer carousel-scroll' : 'carousel-continer'}>
          <ImageGallery images={data.images} onClickHanler={this.onClickHanler}/>
        </div>
        <div className="content-container"></div>
      </div>
    );
  }
}

export default DedicatedContainer;
