/**
 * Created by Administrator on 2017/12/14.
 */
// 中间轮播
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SwipeViewList from '../../components/SwipeViewList';
import {getData, getQueryString, $ajax} from '../../fetch/getData'
const layer =window.layer


class Middle extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        }
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
                    buyList:res.result.lstSpu,
                    activestatus:res.result.info.endTime
                });
            } else {
                layer.open({
                    content: res.errorMsg
                    ,skin: 'msg'
                    ,time: 2
                });

            }
        })()

    }
    render(){
        return <div>
            <SwipeViewList swipeImgs={this.state.buyList} activestatus={this.state.activestatus}/>
        </div>
    }
}

export default Middle