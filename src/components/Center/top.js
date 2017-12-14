/**
 * Created by Administrator on 2017/12/14.
 */
// 顶部轮播
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SwipeView from '../../components/SwipeView';
import {getTopBanner} from '../../fetch/commonApi'


class Top extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            picList:[],
            token:"",
            spuId:"",
            userId:""
        }
    }
    componentDidMount() {
        // console.log(config.getNowFormatDate());
        const result = getTopBanner(this.state.spuId)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === '1') {
                this.setState({
                    picList: json.result.picList,
                })
                //this.refresh(json.result.startTime,json.result.endTime)
            } else {
                console.log(json.errorMsg)
            }
        }).catch(ex => {
            console.log(ex.message)
        })

    }
    render(){
        return <div>
                 <SwipeView swipeImgs={this.state.picList}/>
               </div>
    }
}

export default Top