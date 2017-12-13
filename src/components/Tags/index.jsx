import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.scss'
import pai from '../../static/img/pai@2x.png'
import jiang from "../../static/img/jiang@2x.png"
class Tags extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="m-tags">
               <ul>
                   <li>
                       <span><img src={pai} alt=""/></span>
                       <span>全国品牌连锁</span>
                   </li>
                   <li>
                       <span><img src={jiang} alt=""/></span>
                       <span>写日记奖励订单金额5%</span>
                   </li>
               </ul>
            </div>
        )
    }

}

export default Tags