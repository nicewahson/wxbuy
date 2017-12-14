/**
 * Created by Administrator on 2017/12/14.
 */
import React from 'react'
import {getWxConfig} from '../../util/wxauth'
import Bottom from './bottom'

class Main extends React.Component{

    componentWillMount(){
        let url = window.location.href;
        getWxConfig(encodeURIComponent(url))
    }

    render(){
        return <div>
            <Bottom/>
        </div>
    }
}

export default Main