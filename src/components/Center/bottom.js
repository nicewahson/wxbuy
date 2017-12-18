/**
 * Created by Administrator on 2017/12/14.
 */
// 底部信息

import React from 'react'
import './style.scss'
import phone from '../../static/img/phone.png'
import dw from '../../static/img/dw.png'
import fh from '../../static/img/fh.png'
import buyinfo from '../../static/img/buyinfo.png'
const wx = window.wx

class Bottom extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }
    componentDidMount(){

    }
    openLocation(){
        wx.openLocation({
            // latitude: this.props.storeInfo.lat, // 纬度，浮点数，范围为90 ~ -90
            // longitude: this.props.storeInfo.lon, // 经度，浮点数，范围为180 ~ -180。
            // name: "南京", // 位置名
            // address: "南京", // 地址详情说明
            // scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
            // infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            latitude: 90, // 纬度，浮点数，范围为90 ~ -90
            longitude: 180, // 经度，浮点数，范围为180 ~ -180。
            name: '南京', // 位置名
            address: '南京南', // 地址详情说明
            scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
    }
    render(){
        return(
        <div>
            <div className="sc-bottom">
                <p className="sc-shop">适用商户</p>
                <div className="sc-phone clearfix">
                    <span>37美长沙芙蓉德政园润心苑店</span>
                    <a onClick={()=>{window.location.href=`tel:${this.props.storeInfo.ownerPhone}`}}><img src={phone} alt=""/></a>

                </div>
                <div className="sc-address">
                    <a onClick={()=>{
                        this.openLocation()
                    }}><img className="dw" src={dw} alt=""/>德政街德政园润心苑6栋101<img className="ri" src={fh} alt=""/></a>
                </div>
            </div>
            <div className="buy-info">
                <p className="sc-shop">适用商户</p>
                <img className="ri" src={buyinfo} alt=""/>
            </div>
        </div>
        )
    }
}

export default Bottom