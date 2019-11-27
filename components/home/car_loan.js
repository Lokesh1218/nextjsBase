import React, { Component } from 'react';
import FormContainer from '../form/form_container';
import TruebilStorage from '../../utility/truebil-storage';
import ArrowRight from '../../icons/arrow_right';
import IconCheck from '../../icons/icon_check';
import {unitConvertor, dropGAPixel} from '../../helper';
import 'nouislider';
import nouiSliderStyles from 'nouislider/distribute/nouislider.css';
import Nouislider from 'react-nouislider';

export default class CarLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carLoanAmount: 450000,
      carLoanOpen : TruebilStorage.getItem('isAppliedForCarLoan') === 'true',
      showForm: false
    }
  }

  updateLoanValue = (carLoanAmount) => {
    const ele = document.querySelector('#carLoanSection .service-form-home-modal'),
      noUiSliderHandle = document.querySelector('.noUi-connect'),
      sliderHandlePosition = noUiSliderHandle.style.left;

    this.setState({
      carLoanAmount: parseInt(carLoanAmount),
      showForm : true
    });

    //check if element exist 
    if (ele) {
     ele.classList.add('show-form');
    }

    this.tooltip.style.left = sliderHandlePosition;
    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  afterUpdateLoanValue = (carLoanAmount) => {
    const userInfo = this.props.userInfo;
    const gaLabel = [userInfo.name, userInfo.mobile, carLoanAmount].join(',');

    this.updateLoanValue(carLoanAmount);
    dropGAPixel('newhome', 'moved_slider', gaLabel, 0);
  }

  toggleOverlay() {
    this.setState({
      'showForm' : false
    });
    this.setState({
      'carLoanOpen' : !this.state.carLoanOpen
    });
  }

  render() {
    const defaultValue = 450000;
    const minLoanAmount = 100000;
    const maxLoanAmount = 1500000;
    const step = 50000;
    const railStyle = {
      height: '10px'
    }
    const trackStyle = {
      backgroundColor: '#29C5A3',
      height: '10px'
    }
    const handleStyle  = {
      border: '10px solid #29C5A3',
      backgroundColor: '#29C5A3',
      height: '24px',
      width: '24px',
      marginTop: '-7px',
      boxShadow: '4px 0 0 rgba(255,255,255,1), -4px 0 0 rgba(255,255,255,1)'
    }
    const inputs = [
      {name: 'name', isRequired: true},
      {name: 'mobile', isRequired: true}
    ],
    btnInfo = {
      type: 'submit',
      text: "Continue",
      classes: 'btn-pill btn-green-solid'
    },
    userInfo = this.props.userInfo,
    hiddenInputs = {
      'loan_amount' : this.state.carLoanAmount,
      'city_id': userInfo['city_id']
    };

    return(
      <div>
        <section id='carLoanSection' className="home-section car-loan-wrap enabled">
          <style jsx global>{nouiSliderStyles}</style>
          <h2 className="list-heading">Get best quotes for Used Car Loan</h2>
          { !this.state.carLoanOpen &&  
            <div className="slider-wraper">
              <div className="slider-tooltip-container">
                <div className="slider-tooltip-text" ref={(tooltip) => {this.tooltip = tooltip}}>
                  { '₹ ' + unitConvertor(this.state.carLoanAmount, true) }
                </div>
              </div>
              <Loanslider
                defaultValue={defaultValue}
                minLoanAmount={minLoanAmount}
                maxLoanAmount={maxLoanAmount}
                step={step}
                railStyle={railStyle}
                trackStyle={trackStyle}
                handleStyle={handleStyle}
                updateLoanValue={this.updateLoanValue}
                afterUpdateLoanValue={this.afterUpdateLoanValue}
              />
              <label className="min-loan-amount">1 Lakh</label>
              <label className="max-loan-amount">15 Lakh</label>
            </div>
          }
          { !this.state.carLoanOpen   && !this.state.showForm && 
            <div className="loan-form">
              <button type="button" className="btn btn-large btn-pill btn-green-solid carloan-btn js-carloan-btn disabled">
                Continue 
                <i className="arrow-right">
                  <ArrowRight />
                </i>
              </button>
            </div> 
          }
          { !this.state.carLoanOpen && this.state.showForm && 
            <LoanForm 
              service = {'carLoan'}
              inputs = {inputs}
              btnInfo = {btnInfo}
              hiddenInputs = {hiddenInputs}
              hideServiceModalForm = {this.toggleOverlay}
              userInfo={userInfo}
            />
          }
          { this.state.carLoanOpen 
            &&  <ThankYouLoanForm /> }  
        </section>
      </div>
    );
  }
}

class Loanslider extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render() {
    const defaultValue = this.props.defaultValue,
      minLoanAmount = parseInt(this.props.minLoanAmount),
      maxLoanAmount = parseInt(this.props.maxLoanAmount),
      step = this.props.step,
      railStyle = this.props.railStyle,
      trackStyle = this.props.trackStyle,
      handleStyle = this.props.handleStyle;
    return (
      <Nouislider
        type={'range'}
        defaultValue={defaultValue}
        start={[450000]}
        min={minLoanAmount}
        max={maxLoanAmount}
        range={{ min: minLoanAmount, max: maxLoanAmount }}
        step={step}
        tooltips={[{
          to: function(loanAmount) {
            return '₹' + unitConvertor(loanAmount, true);
          }
        }]}
        connect={[true, false]}
        onSlide={this.props.updateLoanValue}
        onEnd={this.props.afterUpdateLoanValue}
        railStyle={railStyle}
        trackStyle={trackStyle}
        handleStyle={handleStyle}
      />
    );
  }
}

class LoanForm extends Component {
  constructor(props) {
    super(props);

    this.postFormSubmit = this.postFormSubmit.bind(this);
  }

  async postFormSubmit() {
    const serviceName = this.props.service;
    const userInfo = this.props.userInfo;
    const gaLabel = [userInfo.name, userInfo.mobile].join(',');

    await TruebilStorage.setItem('isAppliedFor' + serviceName.substr(0, 1).toUpperCase() + serviceName.substr(1), true);
    this.props.hideServiceModalForm();
    dropGAPixel('newhome', 'successfully_submitted_loan_form', gaLabel, 0);
  }

  render() {
    return (
      <div className="service-form-home-modal">
        <FormContainer
          inputs={this.props.inputs}
          hiddenInputs={this.props.hiddenInputs}
          btnInfo={this.props.btnInfo}
          showLockWrap={false}
          action={'users/loan_applicants/'}
          postFormSubmit={this.postFormSubmit} />
      </div>
    );
  }
}

class ThankYouLoanForm extends Component {
  render() {
    return (
      <div className="form-thankyou">
        <i className="icon-check">
          { <IconCheck />}
        </i>
        <span className="thankyou-text">Thank you!</span>
        <p className="thankyou-description">We've received your request regarding car loan. We will get back to you soon.
        </p>
    </div>
    );
  }
}
