/**
 * Created by Administrator on 2017/12/14.
 */
import React from 'react'

import Top from './top';
import Middle from './middle';
import {config} from '../../config'
//
//
import {getWxConfig,wxShareReady} from '../../util/wxauth'
import Bottom from './bottom'
import {getData, getQueryString, $ajax} from '../../fetch/getData'


const layer =window.layer

class Main extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            startTime:"",
            endTime:"",
            storeInfo:{},
            authorized:false
        }
    }
    componentWillMount(){
        let url = window.location.href;
        let title = '37美长沙芙蓉德政园润心苑店'
        getWxConfig(url, title, ()=>{
            this.setState({
                authorized: true
            },()=>{
                this.maindata()
            })
        })
    }
    componentDidMount() {
            if (getQueryString('payok') == 1) {
                layer.open({
                    content: '您已成功购买该商品，下载APP，立即预约体验吧~'
                    , btn: ['去下载', '取消']
                    , yes: function (index) {
                        window.location.href = 'https://app.sanqimei.com/upgrade/index'
                    }, no: function (index) {
                        layer.close(index);
                    }
                });
            }

        this.maindata();

    }

    maindata(){
        let _this= this;
        let url = '/webActivity/getActivityInfo';
        if(sessionStorage.getItem("accessinfo")) {

            (async () => {
                let res = await getData(url, 'POST', {
                    storeId: getQueryString('storeId'),
                    activityId: getQueryString('activityId'),
                    openId: JSON.parse(sessionStorage.getItem("accessinfo")).openid,
                    wxToken: JSON.parse(sessionStorage.getItem("accessinfo")).access_token
                });
                console.log(123);

                if (res.status == '1') {
                    _this.setState({
                        startTime: res.result.info.startTime,
                        endTime: res.result.info.endTime,
                        storeInfo: res.result.storeInfo
                    });
                    let title= res.result.storeInfo.title
                    wxShareReady(title, title + config.shareContent, config.shareLogo);
                } else {
                    layer.open({
                        content: res.errorMsg
                        , skin: 'msg'
                        , time: 2
                    });

                }
            })();
        }
    }

    render(){
        let startTime=this.state.startTime.slice(0,10);
        let endTime=this.state.endTime.slice(0,10);
        if(this.state.authorized){
            return <div className="list-box">
                <Top/>
                <div className="m-tags">
                    <ul>
                        <li>
                            <span>活动有效期：{startTime}  至 {endTime}   </span>
                        </li>
                        <li className="ml">
                            <span >仅限新用户</span>
                        </li>
                    </ul>
                </div>
                <Middle/>

                <Bottom storeInfo={this.state.storeInfo}/>
            </div>
        }
        return null


    }
}

export default Main