import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {browserHistory} from 'react-router';
import {getData, getQueryString, $ajax} from '../../fetch/getData'
import logo from '../../static/img/logo.png'
import {sentcode,nowBind} from '../../fetch/commonApi'
import $ from 'jquery'
import './style.scss'
const wx = window.wx
const layer = window.layer


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false,
            sentDone:true
        }
    }
    addZero(num){
        return num<10 ? '0'+num : num
    }
    counts(){
        var str = $('#getcode').text();
        var num = parseInt(str);
        var Timer = setInterval(function(){
            if(num<=0){
                clearInterval(Timer);
                $('#getcode').removeAttr('disabled').text('验证码').removeClass('get')
                return
            }
            num--;
            $('#getcode').text(num+'s').addClass('get')
        },1000)
    }
     sentCode(){
         let rep =/^1[3|4|5|7|8][0-9]\d{8}$/;
         let telStr = $('input[name="phone"]').val();
         console.log(telStr);
         if(!telStr){
             layer.open({
                 content: '手机号不能为空'
                 ,skin: 'msg'
                 ,time: 2
             });
             return false
         }else if(!rep.test(telStr)){
                 layer.open({
                     content: '手机号错误'
                     ,skin: 'msg'
                     ,time: 2
             });
             return false

         }
         console.log(telStr);
         let url = '/webActivity/sendMessage';
         (async () => {
             let res = await getData(url, 'POST', {phone:telStr,spuId:getQueryString('spuId'),storeId:getQueryString('storeId'),activityId:getQueryString('activityId'),openId:JSON.parse(sessionStorage.getItem("accessinfo")).openid,wxToken:JSON.parse(sessionStorage.getItem("accessinfo")).access_token});


             if(res.status == '1'){
                 $('#getcode').attr('disabled','true').text('30s').addClass('get')

                 this.counts();
                 this.setState({sentDone:false})
                 layer.open({
                     content: '验证码已发送，请注意查收'
                     ,skin: 'msg'
                     ,time: 2
                 });
             } else if(res.status == '0'){
                 layer.open({
                     content: res.errorMsg
                     ,skin: 'msg'
                     ,time: 2
                 });
             }else{
                 layer.open({
                     content: res.errorMsg
                     ,skin: 'msg'
                     ,time: 2
                 });
             }
         })()

     }
    submitStorestock() {
        console.log($('input[name="phone"]').val());
        console.log(layer);
        let rep =/^1[3|4|5|7|8][0-9]\d{8}$/;
        let telStr = $('input[name="phone"]').val();
        let code = $('input[name="code"]').val();
        if(!telStr){
            layer.open({
                content: '手机号不能为空'
                ,skin: 'msg'
                ,time: 2
            });
            return false
        }else if(!rep.test(telStr)){
            layer.open({
                content: '手机号错误'
                ,skin: 'msg'
                ,time: 2
            });
            return false
        }
        if(!code){
            layer.open({
                content: '验证码不能为空'
                ,skin: 'msg'
                ,time: 2
            });
            return false
        }
        let url = '/webActivity/updateMessage';
        (async () => {
            let res = await getData(url, 'POST', {phone:telStr,smsCode:code,spuId:getQueryString('spuId'),storeId:getQueryString('storeId'),activityId:getQueryString('activityId'),openId:JSON.parse(sessionStorage.getItem("accessinfo")).openid,wxToken:JSON.parse(sessionStorage.getItem("accessinfo")).access_token});
            if(res.status == '1'){
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

            } else if(res.status == '0'){

                layer.open({
                    content: res.errorMsg
                    ,skin: 'msg'
                    ,time: 2
                });
            }else{
                layer.open({
                    content: res.errorMsg
                    ,skin: 'msg'
                    ,time: 2
                });
            }
        })()
    }
    render() {
        return (

            <div className='bind-phone'>
                {
                    this.state.initDone?
                        <div>
                            <img src={logo} className="logo" alt="logo" />
                            <div className="m-popup">
                                <form action="">
                                    <div className="f-mod">
                                        <div className="f-group">
                                            <div className="for-in">
                                                <input name="phone" type="number"  placeholder="填输入手机号"/>
                                            </div>
                                        </div>
                                        <div className="f-group f-code">
                                            <div className="for-in">
                                                <input name="code" type="number"  placeholder="请输入验证码"/>

                                            </div>
                                            <button type="button" id="getcode" className="sent" onClick={() => {
                                                this.sentCode()
                                            }}>验证码</button>
                                        </div>
                                        <div className="f-sub">
                                            <a  onClick={() => {
                                                this.submitStorestock()
                                            }}>立即绑定</a>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    : <div>正在加载...</div>
                }
            </div>
        )
    }
    componentDidMount() {
        // 更改状态
        this.setState({
            initDone: true
        })
    }
}

export default Home
