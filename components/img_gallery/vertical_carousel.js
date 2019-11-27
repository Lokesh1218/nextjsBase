import React, {Component} from 'react';
import LazyLoad from 'react-lazy-load';

export default class VerticalCarousel extends Component {
  render() {
    const images = this.props.images;
    return(
      <ul>
        { Object.keys(images).map((imageType) => {
          const imageTypeData = images[imageType];
          return(
            imageTypeData.map((img, index) => {
              return(
                <VerticalItem
                  key={index}
                  imagedata={img}
                  onClickHanler={this.props.onClickHanler} />
              );
            })
          )
        } 
        )};
      </ul>
    )
  }
}

class VerticalItem extends Component {
  render() {
    return(
      <li>
        <LazyLoad
          debounce={false}
          offsetVertical={300}>
          <img src={this.props.imagedata.url} onClick={this.props.onClickHanler}/>
        </LazyLoad>
      </li>
    )
  }
}