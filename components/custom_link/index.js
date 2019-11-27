import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {saveListingDataInStore} from '../../components/dedicated/actions';

class CustomLink extends Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    this.props.dispatch(saveListingDataInStore(this.props.props));
  }

  render() {
    return(
      <div onClick={this.onClickHandler}>{this.props.children}</div>
    );
  }
}

export default connect()(CustomLink);
