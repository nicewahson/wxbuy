/**
 * Created by Administrator on 2017/12/14.
 */
import React from 'react'

import Top from './top';
import Middle from './middle';

import {getWxConfig} from '../../util/wxauth'
import Bottom from './bottom'


class Main extends React.Component{

    componentWillMount(){
        let url = window.location.href;
        getWxConfig(url)
    }

    render(){
        return <div>
            <Top/>
            <div className="m-tags">
                <ul>
                    <li>
                        <span>活动有效期：2017.12.1  至  2018.1.1   </span>
                    </li>
                    <li className="ml">
                        <span >仅限新用户</span>
                    </li>
                </ul>
            </div>
            <Middle/>

            <Bottom/>

        </div>
    }
}

export default Main