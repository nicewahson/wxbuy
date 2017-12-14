/**
 * Created by Administrator on 2017/12/14.
 */

import React from 'react'
import Top from './top';
import Middle from './middle';

class Main extends React.Component{
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
        </div>
    }
}

export default Main