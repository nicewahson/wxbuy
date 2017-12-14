import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss'
import Logo from '../../static/img/400.png'
class SwipeViewList extends React.Component {
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
      infinite: false,
      speed: 300,
      cssEase: 'linear',
      arrows: false,
      className:'m-carousel',
      touchThreshold:10,
      afterChange:(currentSlide) =>{
        this.setState({activeIndex: currentSlide+1})
      }
    };
      // let swipeImgsLi = swipeImgs.map((item, index) => (
      //           <li key={index}>
      //             <div>asdsd</div>
      //             <div>asdsd</div>
      //             <div>asdsd</div>
      //             <div>asdsd</div>
      //           </li>
      // ));
      let swipeImgsLi = (<li>
            <div className="ml-img"><img src={Logo}/> </div>
            <div className="ml-title"><b>【头皮面膜-面膜防脱】</b>固本生源 精油防脱 稳固发根深</div>
            <div className="ml-price">
              <div className="price">
                <span className="cx">￥<b>3.7 </b></span>
                <span className="yj"><del>￥37</del></span>
              </div>
              {/*<div className="nowbuy">*/}
                {/*<a href="">立即抢购</a>*/}
                {/*<span>仅剩余10份</span>*/}
              {/*</div>*/}
              <div className="overbuy">
                <span>已抢完</span>
              </div>
            </div>
          </li>
      );

      return (
      <div className="list-swipe">
        {/*{swipeImgs.length?*/}
            <ul>
                {swipeImgsLi}
            </ul>
         {/*:<div></div>*/}
        {/*}*/}
         
      </div>

    )
  }
}

export default SwipeViewList