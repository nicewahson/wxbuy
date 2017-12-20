/**
 * Created by Administrator on 2017/12/14.
 */
import React, {Component} from 'react'
import NoActivity from '../../components/Center/noactivity'
import {getData, getQueryString, $ajax} from '../../fetch/getData'
import Main from '@components/Center/mainpage'
import {getWxConfig} from '../../util/wxauth'

class Center extends Component{

    constructor(){
        super()

        this.state = {

        }
    }

    componentWillMount(){
        this.setState({
            canGo: true
        })

        let enurl ="http://activities.sanqimei.com/wxpurchase/wxcenter/build/list?storeId="+getQueryString('storeId')+"&activityId="+getQueryString('activityId');
        // let url = encodeURIComponent(serveurl);
        let title = '37美长沙芙蓉德政园润心苑店'
        // getWxConfig(enurl, title,this.auth.bind(this))
        getWxConfig(enurl, title)

    }

    render(){
        if(this.state.canGo){
            return <div>
                <Main/>
            </div>
        }else{
            return <NoActivity/>
        }
    }
}

export default Center