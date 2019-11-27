import React, { Component }  from 'react';
import Toast from '../toast';

class OfflineToast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOfflineToastMsg: false
    }
  }

  componentDidMount() {
    // bind offline toast msg handler
    this.bindOfflineHandler();
  }

  bindOfflineHandler = () => {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }


  updateOnlineStatus = (event) => {
    const condition = navigator.onLine ? 'online' : 'offline';
    const message = 'You are offline';
    switch (condition) {
      case 'online':
        window.document.querySelector('html').classList.remove('app-offline');
        this.setState({showOfflineToastMsg: false});
        break;
      case 'offline':
        window.document.querySelector('html').classList.add('app-offline');
        this.setState({showOfflineToastMsg: true});
        break;
      default:
        break;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }

  render() {
    const message = 'You are offline';
    return(
      <Toast 
        message={message}
        visible={this.state.showOfflineToastMsg}
        autoHideDuration={3000} />
    );
  }
}

export default OfflineToast;