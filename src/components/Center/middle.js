/**
 * Created by Administrator on 2017/12/14.
 */
// 中间轮播
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SwipeViewList from '../../components/SwipeViewList';
import {getBuyList} from '../../fetch/commonApi'


class Middle extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            buyList:{},
            token:"",
            spuId:"",
            userId:""
        }
    }
    componentDidMount() {
        // console.log(config.getNowFormatDate());
        const result = getBuyList(this.state.spuId)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === '1') {
                this.setState({
                    buyList: json.result,
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
            <SwipeViewList swipeImgs={this.state.buyList}/>
        </div>
    }
}

export default Middle