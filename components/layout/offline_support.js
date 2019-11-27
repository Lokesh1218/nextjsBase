import React, { PureComponent } from 'react';

class OfflineSupport extends PureComponent {
  componentDidMount() {
    const env = process.env.REACT_APP_ENV;
    const isDev = env === 'development';
    const serviceWorkerFileName = isDev ? ('service-worker-' + env + '.js') : 'service-worker.js';
    
    // We want to cache data only in production mode
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/' + serviceWorkerFileName)
        .then(() => console.log('service worker registered.'))
        .catch(err => console.dir(err));
    }
  }

  render() {
    return null;
  }
}

export default OfflineSupport;