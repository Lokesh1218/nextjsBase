import React, { Component, Fragment} from 'react';
import styles from './loader.css';

class Loader extends Component {
  render() {
    return(
      <Fragment>
        <style jsx global>{ styles }</style>
        <div className="loader-wrap">
          <i className="loader"></i>
        </div>
      </Fragment>
    );
  }
}
export default Loader;