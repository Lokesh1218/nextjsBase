import React, {Component, Fragment} from 'react';
import styles from './index.css';

export default class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    })

    if (nextProps.visible) {
      setTimeout(this.hideToast, this.props.autoHideDuration);
    }
  }

  /**
    * Hide the toast msg | Setting visible false
    */
  hideToast = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    return(
      <Fragment>
        <style jsx global>{styles} </style>
        <div className={this.state.visible ? 'toast-conatiner toast-show' : 'toast-conatiner'} id="toast">
          <span className="toast-text">{this.props.message}</span>
        </div>
      </Fragment>
    );
  }
}