import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss'

class SwipeView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state={
      activeIndex:1
    }


  }
  render() {
    let swipeImgs = this.props.swipeImgs;
    let settings = {
      dots: false,
        infinite: true,
      speed: 300,
      cssEase: 'linear',
      arrows: false,
      className:'m-carousel',
      touchThreshold:10,
        autoplay:true,
        autoplaySpeed:3000
    };
    return (
      <div className="m-swipe detail">
        {swipeImgs.length?
            <div className="m-swipe-container">
                <Slider {...settings}>
                  {
                    swipeImgs.map((item,index) => {
                      return <div key={index}>
                        <img src={item.pic} alt=''/>
                      </div>
                    })
                  }
                </Slider> 
                {/*<div className="m-computed">{this.state.activeIndex}/{swipeImgs.length}</div>*/}
            </div>
         :<div></div>
        }
         
      </div>

    )
  }
}

export default SwipeView