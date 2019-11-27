import React, {Component} from 'react';
import VerticalCarousel from './vertical_carousel';
import styles from './index.css';

class ImageGallery extends Component {
  render() {
    return(
      <div>
        <style jsx global>{styles} </style>
        <VerticalCarousel images={this.props.images} onClickHanler={this.props.onClickHanler}/>
      </div>
    );
  }
}

export default ImageGallery;