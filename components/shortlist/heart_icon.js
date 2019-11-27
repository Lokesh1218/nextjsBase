import React, {Component} from 'react';
import FIcon from '../../icons/favourite-icon';

class HeartIcon extends Component {
  render() {
    return(
      <i className={"favourite-listing" + (this.props.isShortlisted ? " shortlisted" : "")}>
        <FIcon />
      </i>
    );
  }
}

export default HeartIcon;