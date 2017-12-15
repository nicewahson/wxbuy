/**
 * Created by Administrator on 2017/12/14.
 */
// 底部信息

import React from 'react'
const wx = window.wx

class Bottom extends React.Component{
    componentDidMount(){

    }
    openLocation(){
        wx.openLocation({
            latitude: 90, // 纬度，浮点数，范围为90 ~ -90
            longitude: 180, // 经度，浮点数，范围为180 ~ -180。
            name: '南京', // 位置名
            address: '南京南', // 地址详情说明
            scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
    }
    render(){
        return <div>
            <p style={{margin: '4px 8px 10px', borderBottom: '1px solid #ccc', paddingBottom: 6}}>适用商家</p>
            <div style={{padding: '10px 14px'}}>
                <span>37美长沙芙蓉德政园润心苑店</span>
                <a onClick={()=>{window.location.href="tel: 10086"}}>点击通话</a><br/>

                <a onClick={()=>{
                    this.openLocation()
                }}>37美长沙芙蓉德政园润心苑店</a>
            </div>
            <p style={{margin: '4px 8px 10px', borderBottom: '1px solid #ccc', paddingBottom: 6}}>购买说明</p>
        </div>
    }
}

export default Bottom