import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {browserHistory} from 'react-router';
import {getData, getQueryString, $ajax} from '../../fetch/getData'
import $ from 'jquery'
// import layer from 'layer'
const wx = window.wx
const layer =window.layer


class FixFoot extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    check() {
        this.setState({editable: false});
        if(this.props.buttonTyle.type ==1){
            layer.open({
                content: this.props.buttonTyle.info
                ,skin: 'msg'
                ,time: 2
            });
        }else if(this.props.buttonTyle.type ==2){
            let url = '/webActivity/saveOrder';
            (async () => {
                let res = await getData(url, 'POST', {spuId:getQueryString('spuId'),storeId:getQueryString('storeId'),activityId:getQueryString('activityId'),openId:JSON.parse(sessionStorage.getItem("accessinfo")).openid,wxToken:JSON.parse(sessionStorage.getItem("accessinfo")).access_token});


                if (res.errorCode == 9999) {
                    browserHistory.push('/wxpurchase/wxcenter/build/bindphone?spuId=' + getQueryString('spuId')+'&activityId='+getQueryString('activityId')+'&storeId='+getQueryString('storeId'))
                    this.setState({
                        picList:res.result.bannnerList
                    });
                } else {
                    console.log(res.result.orderCode);
                    this.setState({
                        orderCode:res.result.orderCode
                    });
                    let url = 'http://app-server.dev.sanqimei.com/pay/generateOrder';
                    (async () => {
                        let res = await getData(url, 'POST', {out_trade_no:this.state.orderCode,openid:JSON.parse(sessionStorage.getItem("accessinfo")).openid,token:JSON.parse(sessionStorage.getItem("accessinfo")).access_token,channel:3,ip:"123.12.12.123"});
                        if (res.status == 1) {
                            console.log(res.result);
                            wx.chooseWXPay({
                                timestamp:res.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                nonceStr: res.result.nonceStr, // 支付签名随机串，不长于 32 位
                                package: res.result.packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                signType: res.result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                paySign: res.result.paySign, // 支付签名
                                appId: res.result.appId,
                                partnerid: res.result.partnerid,
                                success: function (res) {
                                    browserHistory.push('/wxpurchase/wxcenter/build/list?activityId=' + getQueryString('activityId')+'&storeId='+getQueryString('storeId')+'&payok=1')
                                }
                            });
                        }
                    })()

                }
            })();

        }
        else if(this.props.buttonTyle.type ==3){
            layer.open({
                content: this.props.buttonTyle.info
                ,skin: 'msg'
                ,time: 2
            });
        }
        else if(this.props.buttonTyle.type ==4){
            layer.open({
                content: '您已成功购买该商品，下载APP，立即预约体验吧~'
                ,btn: [ '去下载','取消']
                ,yes: function(index){
                    window.location.href ='https://app.sanqimei.com/upgrade/index'
                },no: function(index){
                    layer.close(index);
                }
            });
        }
    }

    render() {
        let buyButton="";
        console.log(this.props.buttonTyle.type);
        // if(this.props.buttonTyle.type ===1){
        //     buyButton =`活动有效期：${this.props.buttonTyle.info}`;
        // }else if(this.props.buttonTyle.type ===2){
        //     buyButton =this.props.buttonTyle.info;
        // }
        // else if(this.props.buttonTyle.type ===3){
        //     buyButton =this.props.buttonTyle.info;
        // }
        // else if(this.props.buttonTyle.type ===4){
        //     buyButton =`${this.props.buttonTyle.info}`;
        // }
        return (
            <div className="m-fixFoot">
                <div className="btns">
                    <span onClick={this.check.bind(this)}> {this.props.buttonTyle.info}</span>
                </div>
            </div>
        )
    }

}

export default FixFoot