import React, {Component} from 'react';
import BackIcon from '../../icons/backIcon';
import IconCross from '../../icons/cross_icon';

class Header extends Component {
  render() {
    const showCrossIcon = this.props.showCrossIcon;
    return(
      <div className="header-container">
        { showCrossIcon ?
          <i
            className="close-icon"
            onClick={this.props.crossIconClickHandler}>
            <IconCross />
          </i>
          :
          <i className="back-icon"><BackIcon /></i>
        }
      </div>
    )
  }
}

export default Header;