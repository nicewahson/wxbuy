import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {browserHistory} from 'react-router';
import {getUserBind} from '../../fetch/commonApi'
import $ from 'jquery'
// import layer from 'layer'
const layer =window.layer


class FixFoot extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    check() {
        this.setState({editable: false});
        if(this.props.buttonTyle.type ==1){
            layer.open({
                content: this.props.buttonTyle.info
                ,skin: 'msg'
                ,time: 2
            });
        }else if(this.props.buttonTyle.type ==2){
            const userBind = getUserBind(this.props.token);
            userBind.then(res => {
                return res.json()
            }).then(json => {
                if(json.status === '0'){
                    browserHistory.push('/wxpurchase/wxcenter/build/bindphone?token='+this.props.token)
                }
                else{
                    // window.location.href =`http://activities.test.sanqimei.com/new-personality/index.html?userId=${this.props.userId}&type=1`
                }
            }).catch(ex => {
                console.log(ex.message);
            })

        }
        else if(this.props.buttonTyle.type ===3){
            layer.open({
                content: this.props.buttonTyle.info
                ,skin: 'msg'
                ,time: 2
            });
        }
        else if(this.props.buttonTyle.type ===4){
            layer.open({
                content: '您已成功购买该商品，下载APP，立即预约体验吧~'
                ,btn: [ '去下载','取消']
                ,yes: function(index){
                    window.location.href ='https://app.sanqimei.com/upgrade/index'
                },no: function(index){
                    layer.close(index);
                }
            });
        }
    }

    render() {
        let buyButton="";
        console.log(this.props.buttonTyle.type);
        // if(this.props.buttonTyle.type ===1){
        //     buyButton =`活动有效期：${this.props.buttonTyle.info}`;
        // }else if(this.props.buttonTyle.type ===2){
        //     buyButton =this.props.buttonTyle.info;
        // }
        // else if(this.props.buttonTyle.type ===3){
        //     buyButton =this.props.buttonTyle.info;
        // }
        // else if(this.props.buttonTyle.type ===4){
        //     buyButton =`${this.props.buttonTyle.info}`;
        // }
        return (
            <div className="m-fixFoot">
                <div className="btns">
                    <span onClick={this.check.bind(this)}> {this.props.buttonTyle.info}</span>
                </div>
            </div>
        )
    }

}

export default FixFoot