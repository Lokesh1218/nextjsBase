import React, { Component } from 'react';
import {Link} from '../.././routes';
import {assetsUrl} from '../../globalConstants';
import VerticalList from '../vertical_list/vertical_list';
import TruebilAdvantage from './truebil_advantage';
import JustLikeNewCar from './just_like_new_car';
import {sendGA, setGADimension, sendExtraCustomGA} from '../../helper';
import LazyLoad from 'react-lazy-load';
import RecentlyVisited from '../recently_visited';
import DirectBanner from '../direct-banner/direct-banner';

export default class Revisit extends Component {
  render() {
    const config = this.props.config,
          isSubscribedBuyer = config.isSubscribedBuyer,
          gaCategory = 'newhome',
          userInfo = config.userInfo,
          gaLabel = [userInfo.name, userInfo.mobile].join(',');
    
    let recommendedCarIDs = [], 
      recommendedCarNames = [], 
      recommendedCarListings = this.props.recommendedCarsData.results;

    for (var key in recommendedCarListings) {
      var listing = recommendedCarListings[key];
      recommendedCarIDs.push(listing.car_info.id);
      recommendedCarNames.push(listing.car_info.variant_name);
    }

    let GADimensionTable = {
      '2': 'home',
      '4': recommendedCarIDs,
      '8': recommendedCarNames
    };
    setGADimension(GADimensionTable);
    sendExtraCustomGA(); //Non interaction GA with extra dimensions

    return(
      <div>
        <VerticalList
          heading= 'Recommended for you'
          data={this.props.recommendedCarsData}
          toggleShortlist={this.props.toggleShortlist}
          dataCategory={'our_recommendations_for_you'}
          gaAction="our_recommendations_for_you"
          gaShortlistCategory={gaCategory}
          config={config} />
        <TruebilAdvantage />
        <PopularSearchInBudget
          popularSearchInBudgetData={this.props.popularSearchInBudgetData}
          dataCategory={'popularSearchInBudgetData'} />
        <DirectBanner />
        <VerticalList
          heading= 'Newly added cars you’ll like'
          data={this.props.newlyAddedCarsData}
          toggleShortlist={this.props.toggleShortlist}
          dataCategory={'newly_added_cars_you_will_like'}
          gaAction="newly_added_cars_you’ll_like"
          gaShortlistCategory={gaCategory}
          config={config} />
        <VerticalList
          heading= 'Value for money cars picked for you'
          data={this.props.valueForMoneyCarsData}
          toggleShortlist={this.props.toggleShortlist}
          dataCategory={'value_for_money_cars_picked_for_you'}
          gaAction="value_for_money_cars_picked_for_you"
          gaShortlistCategory={gaCategory}
          config={config} />
        <JustLikeNewCar
          cityInfo={this.props.config.cityInfo} />
        <RecentlyVisited
          gaCategory={gaCategory}
          gaAction={'recently_viewed_cars'}
          gaShortlistCategory={gaCategory} />
      </div>
    );
  }
}

class PopularSearchInBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCutOff: true
    }
  }
  render() {
    var popularSearchInBudgetData = this.props.popularSearchInBudgetData;
    const imageWidth = 149.5;
    const containerWidth = imageWidth * popularSearchInBudgetData.length;
    var gaData = { 'data-ga-action': 'selected_popularmodel' };
    var popularSearchList = popularSearchInBudgetData.map((data) => {
      var cutoffLabel = data.cutoff_price.substr(0, 3);
      var imgUrl =  assetsUrl + 'images/models/model-' + data.model_id + '-v1.jpg';
      gaData['data-ga-label'] = data.name + ',' + cutoffLabel;

      return(
          <Link key={data.model_id} route={data.link} >
            <a className="horizontal-item" {...gaData} onClick={sendGA}>
              <div className="model-img placeholder-color">
                <LazyLoad height ={188} debounce={false}>
                  <img src={imgUrl} className="model-img" alt={data.name} />
                </LazyLoad>
              </div>
              <div className="text-over-img">
                <LazyLoad debounce={false}>
                 <p>{'Under ' + data.cutoff_price}</p>
                </LazyLoad>
              </div>
            </a>
          </Link>
        )
      });

    return(
      <section className="home-section rv-popular-search">
        <h2 className="heading">Popular in budget</h2>
        <div className="horizontal-container">
          <div className="horizontal-wrap" style={{width:containerWidth}}>
            {popularSearchList}
          </div>
        </div>
      </section>
    );
  }
}
