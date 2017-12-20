import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Slider from 'react-slick'
import {browserHistory} from 'react-router';
import {getData, getQueryString, $ajax} from '../../fetch/getData'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss'
import Logo from '../../static/img/400.png'
import $ from 'jquery'
let type =["1", "2","3"];

class SwipeViewList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state={
      activeIndex:1,
    }
  }
    componentDidMount() {

    }

  render() {

    let swipeImgs = this.props.swipeImgs;
    let activestatus = this.props.activestatus;
    let timestamp1 = Date.parse(new Date(activestatus));
      timestamp1 = timestamp1 / 1000;
      console.log(timestamp1);
      let timestamp2 = Date.parse(new Date());
      timestamp2 = timestamp2 / 1000;
      console.log(timestamp2);
    let settings = {
      dots: true,
      infinite: false,
      speed: 300,
      cssEase: 'linear',
      arrows: false,
      className:'m-carousel',
      touchThreshold:10,
        // autoplay:true,
        // autoplaySpeed:3000

    };
      let swipeImgsLi =swipeImgs && swipeImgs.map((item, index) => (
          <div className="sw-listpic" key={index}>
            <div className="ml-img"><img src={item.spuPic}/> </div>
            <div className="ml-title"><b>{item.spuName}</b></div>
            <div className="ml-price">
              <div className="price">
                <span className="cx">￥<b>{item.activityPrice} </b></span>
                <span className="yj"><del>￥{item.spuPrice}</del></span>
              </div>
                {
                    item.state==1 &&
                    <div className="nowbuy">
                    <button className="msc" onClick={()=>{ browserHistory.push('/wxpurchase/wxcenter/build/detail?spuId=' + item.spuId+'&activityId='+getQueryString('activityId')+'&storeId='+getQueryString('storeId'))}}>马上抢</button>
                    <div className="clearfix"></div>
                    <div className="lastnum">
                      <span className="sy">仅剩余{item.number}份</span>
                      <div className="progressBar"><div className="bar" style={{width:item.number/item.totalLimitNum*100+"%"}}><span className="sy-bar">{item.number}</span></div></div>
                    </div>
                  </div>
                }
                {
                  item.state==2 && <div className="overbuy">
                    <span>已抢完</span>
                  </div>
                }
                {
                  item.state==3 && <div className="overbuy">
                    <span>已购买</span>
                  </div>
                }
            </div>

              {
                  timestamp1-timestamp2<0?
                <div className="active-over">
                  <span>活动已结束</span>
                </div>
                      :
                      ""
              }

          </div>
      ));


      let twoswipe="";
      for(let i=0; i<swipeImgsLi.length; i=i+2){
        console.log(i,swipeImgsLi[i]);
          twoswipe= <div>
             {swipeImgsLi[i]}
             {swipeImgsLi[i+1]}
         </div>
       }

      return (
      <div className="list-swipe">

        <div  className="m-swipe">
            {swipeImgsLi.length?
                <div className="m-swipe-container">
                  <Slider {...settings}>
                      {
                          twoswipe
                      }
                  </Slider>
                </div>
                :<div></div>
            }

        </div>
      </div>

    )
  }
}
SwipeViewList.defaultProps={swipeImgs:[]};
export default SwipeViewList