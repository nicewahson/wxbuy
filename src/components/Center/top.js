/**
 * Created by Administrator on 2017/12/14.
 */
// 顶部轮播
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SwipeView from '../../components/SwipeView';
import {getData, getQueryString, $ajax} from '../../fetch/getData'
const layer =window.layer

class Top extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            picList:[],
            openId:"",
            token:"",
            storeId:"",
            activityId:""
        }
    }
    componentDidMount() {
        let url = '/webActivity/getActivityInfo';
        console.log(sessionStorage.getItem("accessinfo"));
        if(sessionStorage.getItem("accessinfo")) {


            (async () => {
                let res = await getData(url, 'POST', {
                    storeId: getQueryString('storeId'),
                    activityId: getQueryString('activityId'),
                    openId: JSON.parse(sessionStorage.getItem("accessinfo")).openid,
                    wxToken: JSON.parse(sessionStorage.getItem("accessinfo")).access_token
                });


                if (res.status == '1') {
                    this.setState({
                        picList: res.result.bannnerList
                    });
                } else {
                    layer.open({
                        content: res.errorMsg
                        , skin: 'msg'
                        , time: 2
                    });

                }
            })()

        }

    }
    render(){
        return <div>
                 <SwipeView swipeImgs={this.state.picList}/>
               </div>
    }
}

export default Top