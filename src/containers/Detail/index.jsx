import React from 'react'
import cs from 'classnames'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Scrollbars } from 'react-custom-scrollbars';
import 'scrolling-element';
import SwipeView from '../../components/SwipeView';
import ShopInfo from '../../components/ShopInfo';
import Tags from '../../components/Tags';
import WhiteSpace from '../../components/WhiteSpace';
import DescPullLoad from '../../components/DescPullLoad';
import DiarysPullLoad from '../../components/DiarysPullLoad';
import BuyFoot from '../../components/BuyFoot';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import {getDetailInfo, getDetailActivity} from '../../fetch/detail'
import {getShopDesc,getShopDiarys} from '../../fetch/commonApi'

import More from '../../static/img/more.png'
import './style.scss'
//import config from '../../util'

let ModalHelper = (function(bodyCls) {
    var scrollTop;
    return {
      afterOpen: function() {
        scrollTop = document.scrollingElement.scrollTop;
        document.body.classList.add(bodyCls);
        document.body.style.top = -scrollTop + 'px';
      },
      beforeClose: function() {
        document.body.classList.remove(bodyCls);
        document.scrollingElement.scrollTop = scrollTop;
      }
    };
  })('modal-open');

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false,
            shopInfo:{},
            picList:[],
            showTitle: "",
            price: "0",
            marketPrice: "0",
            soldNumber: 0,
            buytype:"",
            startTime:"",
            endTime:"",
            serverVedio:{videoPic: '', video: ''},
            lastPage:0,
            list:[],
            hasMore: true,
            index: 0, //loading more test time limit,
            showActivitys:[],
            activitys:[],
            fadeInUp:false,
            fadeOutDown:false,
            activityVisibility:true,
            curPage:1,
            pageSize:5,
            dyTotal:0,
            dyIsLastPage:0,
            dyList:[],
            dyHasMore: true,
            dyIndex: 0,
            dyCurPage:1,
            //token:'dcba1afe-3b74-4c0d-b5e9-ecd6bceb4045'
            token:this.props.location.query.token,
            spuId:this.props.location.query.spuId,
            userId:this.props.location.query.userId

        }
    }
    componentDidMount() {
        // console.log(config.getNowFormatDate());
         const result = getDetailInfo(this.state.spuId)
         result.then(res => {
            return res.json()
         }).then(json => {
             if(json.status === '1'){
                 this.setState({
                     picList: json.result.picList,
                     showTitle: json.result.showTitle,
                     price: json.result.price,
                     marketPrice:json.result.marketPrice,
                     soldNumber: json.result.soldNumber,
                     buytype: json.result.type,
                     startTime:json.result.startTime,
                     endTime:json.result.endTime,
                 })
                 //this.refresh(json.result.startTime,json.result.endTime)
             }else{
                console.log(json.errorMsg)
             }
         }).catch(ex => {
            console.log(ex.message)
         // if (__DEV__) {
         //     console.error('用户主页“订单列表”获取数据报错, ', ex.message)
         // }
         })
         // 更改状态
         this.setState({
            initDone: true
         })

         const shpoDesc = getShopDesc(this.state.spuId,this.state.curPage,this.state.pageSize);
         shpoDesc.then(res => {
            return res.json()
         }).then(json => {
             if(json.status === '1'){
                 this.setState({
                     serverVedio:json.result.serverVedio,
                     lastPage:json.result.lastPage,
                     list:json.result.list,
                     curPage:this.state.curPage + 1 ,
                    //  curPage:this.state.curPage === +json.result.lastPage ? this.state.curPage : this.state.curPage + 1 ,
                     index:+json.result.lastPage
                 })
             }
         }).catch(ex => {
             console.log(ex.message);
             // if (__DEV__) {
             //     console.error('用户主页“订单列表”获取数据报错, ', ex.message)
             // }
         })
         
         const detailActivity = getDetailActivity(this.state.spuId);
         detailActivity.then(res => {
            return res.json()
         }).then(json => {
             let showActivitys = [];
             if(json.status === '1'){
                 if(json.result.length>0){
                    json.result.forEach(function(item,key){
                       if(+item.isShow === 1){
                           showActivitys.push(item);
                       }
                    }) 
                 }
                 this.setState({
                     showActivitys:showActivitys,
                     activitys:json.result
                 })
             }
         }).catch(ex => {
             console.log(ex.message);
             // if (__DEV__) {
             //     console.error('用户主页“订单列表”获取数据报错, ', ex.message)
             // }
         })

        const shopDiarys = getShopDiarys(this.state.token,1,this.state.spuId,this.state.dyCurPage,this.state.pageSize);
         shopDiarys.then(res => {
            return res.json()
         }).then(json => {
             if(json.status === '1'){
                let dyIndex =  Math.ceil(json.result.total / this.state.pageSize);
                this.setState({
                    dyTotal:json.result.total,
                    dyIsLastPage:json.result.isLastPage,
                    dyList:json.result.list,
                    // dyHasMore: true,
                    // dyAction: STATS.init,
                    dyIndex: dyIndex-1,
                    dyCurPage:1
                })
             }else{
                console.log(json.errorMsg)
             }
         }).catch(ex => {
             console.log(ex.message);
             // if (__DEV__) {
             //     console.error('用户主页“订单列表”获取数据报错, ', ex.message)
             // }
         })
     }
    setObj(obj){
        this.setState(obj);
    }
    forEachLi(dataArr){
        return dataArr.length>0 ? dataArr.map((item,index) => {
                                return <li key={index}>
                                        <span>{item.label}</span>
                                        <span>{item.content}</span>
                                        </li>
                            }) 
                         : <li></li>
    }
    handleClick(e){
        if(this.state.activitys.length<=0){
            return false
        }
        this.setState({
            activityVisibility:false,
            fadeInUp:true,
            fadeOutDown:false,
        })
        ModalHelper.afterOpen();
    }
    handleCloseClick(e){
        var self = this;
        this.setState({
            fadeInUp:false,
            fadeOutDown:true,
        })

        var animEndEventNames = {
            'webkit' : 'webkitAnimationEnd',
            'o' : 'oAnimationEnd',
            'ms' : 'MSAnimationEnd',
            'animation' : 'animationend'
        },
        animEndEventName = animEndEventNames[this.prefix().lowercase]||animEndEventNames['animation'];
        animEndEventName  && this.refs.mActivesheetBox.addEventListener(animEndEventName, function handle() {
            self.setState({
                activityVisibility:true
            })
            ModalHelper.beforeClose();
            self.refs.mActivesheetBox.removeEventListener(animEndEventName, handle, false);
        });

    }
    prefix(){
        var styles = this.getCompStyle(document.documentElement),
            pre = (Array.prototype.slice.call(styles).join('')
                .match(/-(moz|webkit|ms)-/) || ['', 'o']
            )[1],
            dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
        return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    }
    getCompStyle(elem,classes){
        return (window.getComputedStyle?window.getComputedStyle(elem,classes||null):elem.currentStyle) || null;
    }

    // transitionHandle(aniEndName){
    //     console.log(1)
    //     var self = this;
    //         self.setState({
    //             activityVisibility:true
    //         })
            
    //         self.refs.mActivesheetBox.removeEventListener(aniEndName, self.transitionHandle, false);
    // }
    render() {
        let showActivitysPage = this.forEachLi(this.state.showActivitys);
        let showActivitysAll = this.forEachLi(this.state.activitys);
        return (
            <div className='ac-seckil'>
                {
                    this.state.initDone
                    ? <div className="g-sk">
                        <div className="cnt-body" ref="cntBody">
                            <SwipeView swipeImgs={this.state.picList}/>
                            <ShopInfo
                            showTitle={this.state.showTitle}
                            price={this.state.marketPrice}
                            secSkillPrice={this.state.price}
                            remainNumber={this.state.soldNumber}
                            type = {this.state.buytype}  // 1 秒杀 套餐  2 详情
                            />
                            <Tags/>
                            <div className="m-activity">
                                <p>活动</p>
                                <ul className='activity-list'>{showActivitysPage}</ul>
                                <i onClick = {this.handleClick.bind(this)}><img src={More} alt=""/></i>
                            </div>
                            <WhiteSpace/>
                            <Tabs>
                                <TabList className="my-tab-list">
                                    <Tab>商品详情 <em></em></Tab>
                                    <Tab>相关日记（{this.state.dyTotal}）<em></em></Tab>
                                </TabList>

                                <TabPanel>
                                    <DescPullLoad
                                        index= {this.state.index}
                                        list={this.state.list} 
                                        serverVedio = {this.state.serverVedio}
                                        spuId = {this.state.spuId}
                                        curPage={this.state.curPage}
                                        pageSize ={this.state.pageSize}
                                        hasMore = {this.state.hasMore}
                                        onChange = {this.setObj.bind(this)}
                                    ></DescPullLoad>
                                </TabPanel>
                                <TabPanel>
                                    <DiarysPullLoad
                                        dyIndex= {this.state.dyIndex}
                                        dyList={this.state.dyList} 
                                        /* serverVedio = {this.state.serverVedio} */
                                        spuId = {this.state.spuId}
                                        dyCurPage={this.state.dyCurPage}
                                        pageSize ={this.state.pageSize}
                                        dyHasMore = {this.state.dyHasMore}
                                        token={this.state.token}
                                        onChange = {this.setObj.bind(this)}
                                    ></DiarysPullLoad>
                                </TabPanel>
                            </Tabs>
                            <BuyFoot
                                type= {4}
                                startTime= {"2016.05.06"}
                                endTime= {"2016.05.09"}
                                token={this.state.token}
                            ></BuyFoot>
                        </div>
                        <div className={cs({'m-activesheet':true,hidden:this.state.activityVisibility})}>
                            <div ref="mActivesheetBox" className={cs({"m-activesheet-box":true,'fadeInUp':this.state.fadeInUp,'fadeOutDown':this.state.fadeOutDown})}>
                                <p>促销</p>
                                <ul className='activity-list'>
                                    <Scrollbars style={{ width:'100%', height: '200px' }}>
                                        {showActivitysAll}
                                    </Scrollbars>
                                </ul>
                                <i className='ac-close' onClick={this.handleCloseClick.bind(this)}></i>
                            </div>
                        </div>
                    </div>
                    : <div>正在加载...</div>
                }
            </div>
        )
    }
    
}

export default Detail
