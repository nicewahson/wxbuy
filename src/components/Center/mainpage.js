/**
 * Created by Administrator on 2017/12/14.
 */
import React from 'react'

import Top from './top';
import Middle from './middle';

import {getWxConfig} from '../../util/wxauth'
import Bottom from './bottom'
import {getData, getQueryString, $ajax} from '../../fetch/getData'


const layer =window.layer

class Main extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            startTime:"",
            endTime:"",
            storeInfo:{}
        }
    }
    componentWillMount(){
        let serveurl ="http://activities.sanqimei.com/wxpurchase/wxcenter/build/list?storeId="+getQueryString('storeId')+"&activityId="+getQueryString('activityId');
        let url = encodeURIComponent(serveurl);
        let title = '37美长沙芙蓉德政园润心苑店'
        getWxConfig(url, title)
    }
    componentDidMount() {
        let url = '/webActivity/getActivityInfo';
        (async () => {
            let res = await getData(url, 'POST', {storeId:getQueryString('storeId'),activityId:getQueryString('activityId'),openId:JSON.parse(sessionStorage.getItem("accessinfo")).openid,wxToken:JSON.parse(sessionStorage.getItem("accessinfo")).access_token});


            if (res.status == '1') {
                layer.open({
                    content: res.errorMsg
                    ,skin: 'msg'
                    ,time: 2
                });
                this.setState({
                    startTime:res.result.info.startTime,
                    endTime:res.result.info.endTime,
                    storeInfo:res.result.storeInfo
                });
            } else {
                layer.open({
                    content: res.errorMsg
                    ,skin: 'msg'
                    ,time: 2
                });

            }
        })();

    }
    render(){
        let startTime=this.state.startTime.slice(0,10);
        let endTime=this.state.endTime.slice(0,10);
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
}

export default Main