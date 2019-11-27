import React, { Component } from 'react';
import Link from 'next/link';
import {assetsUrl} from '../../globalConstants';
import JustLikeNewCar from './just_like_new_car';
import LazyLoad from 'react-lazy-load';
import SellerForm from '../seller_form/seller_form';
import TruebilAdvantage from './truebil_advantage';
import VerticalList from '../vertical_list/vertical_list';
import {sendGA} from '../../helper';
import DirectBanner from '../direct-banner/direct-banner';

export default class FirstVisit extends Component {
  render() {
    const gaCategory = 'newhome';
    const config = this.props.config;

    return(
      <div>
        <TopTrendingSearch
          topTrendingData={this.props.topTrendingData}
          config={config} />
        <JustLikeNewCar cityInfo={config.cityInfo} />
        <VerticalList
          heading= 'Value for money cars'
          data={this.props.valueForMoneyData}
          toggleShortlist={this.props.toggleShortlist}
          dataCategory={'value_for_money_cars'}
          gaAction="value_for_money_cars"
          gaShortlistCategory={gaCategory}
          config={config} />
        <TruebilAdvantage />
        <VerticalList
          heading= 'Top Rated by Truebil'
          data={this.props.topRatedData}
          toggleShortlist={this.props.toggleShortlist}
          dataCategory={'top_rated_by_truebil'}
          gaAction="top_rated_by_truebil"
          gaShortlistCategory={gaCategory}
          config={config} />
        <DirectBanner />
        <PopularModel
          popularModelData={this.props.popularModelData} />
        <SellerForm />
        <VerticalList
          heading= 'Premium used cars'
          data={this.props.premiumUsedCarsData}
          toggleShortlist={this.props.toggleShortlist}
          dataCategory={'premium_used_cars'}
          gaAction="premium_used_cars"
          gaShortlistCategory={gaCategory}
          config={config} />
      </div>
    );
  }
}

class TopTrendingSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCutOff: true
    }
  }
  render() {
    const cityInfo = this.props.config.cityInfo;
    const cityName = cityInfo.name;
    const heading = 'Trending in ' + cityName;
    var gaData = { 'data-ga-action': 'selected_top_trending_search' };
    var topTrendingList = this.props.topTrendingData.map((data) => {
      var cutoffLabel = data.cutoff_price.substr(0, 3);
      gaData['data-ga-label'] = data.name + ", " + cutoffLabel;
      var imgUrl =  assetsUrl + 'images/models/model-' + data.model_id + '-v1.jpg';
      return( 
        <Link 
          key={data.model_id}
          href={data.link}>
          <a
            {...gaData}
            className="horizontal-item"
            onClick={sendGA} >
            <div className="model-img placeholder-color">
              <LazyLoad height ={188} debounce={false}>
                <img src={imgUrl} className="model-img" alt={data.name} />
              </LazyLoad>
            </div>
            <p className="text-over-img">{'Under ' + data.cutoff_price}</p>
          </a>
        </Link>
      );
    });

    return(
      <section className="home-section top-trending-search">
        <h2 className="heading">{heading}</h2>
        <div className="horizontal-container">
          <div className="horizontal-wrap">
            {topTrendingList}
          </div>
        </div>
      </section>
    );
  }
}

class PopularModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCutOff: true
    }
  }
  render() {
    var gaData = { 'data-ga-action': 'selected_popular_car_models' }
    var popularModelList = this.props.popularModelData.map((data) => {
      gaData['data-ga-label'] = data.name;
      var imgUrl =  assetsUrl + 'images/models/model-' + data.model_id + '-v1.jpg';
      return(
        <Link
          key={data.model_id}
          href={data.link}>
          <a {...gaData}
            onClick={sendGA}
            className="horizontal-item">
            <div className="model-img placeholder-color">
              <LazyLoad
                height ={188}
                debounce={false}>
                <img src={imgUrl} className="model-img" alt={data.name} />
              </LazyLoad>
            </div>
          </a>
        </Link>
      );
    });
    return(
      <section className="home-section popular-car-section">
        <h2 className="heading">Popular models</h2>
        <LazyLoad 
          height ={188}
          offsetBottom={600}
          debounce={false}
          className="placeholder-color">
          <div className="horizontal-container">
            <div className="horizontal-wrap">
              {popularModelList}
            </div>
          </div>
        </LazyLoad>
      </section>
    );
  }
}
