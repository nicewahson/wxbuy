import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import logo from '../../static/img/logo.png'
import {sentcode,nowBind} from '../../fetch/commonApi'
import $ from 'jquery'
import './style.scss'

const layer = window.layer

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false,
            sentDone:true
        }
    }
    addZero(num){
        return num<10 ? '0'+num : num
    }
    counts(){
        var str = $('#getcode').text();
        var num = parseInt(str);
        var Timer = setInterval(function(){
            if(num<=0){
                clearInterval(Timer);
                $('#getcode').removeAttr('disabled').text('验证码').removeClass('get')
                return
            }
            num--;
            $('#getcode').text(num+'s').addClass('get')
        },1000)
    }
     sentCode(){
         let rep =/^1[3|4|5|7|8][0-9]\d{8}$/;
         let telStr = $('input[name="phone"]').val();
         console.log(telStr);
         if(!telStr){
             layer.open({
                 content: '手机号不能为空'
                 ,skin: 'msg'
                 ,time: 2
             });
             return false
         }else if(!rep.test(telStr)){
                 layer.open({
                     content: '手机号错误'
                     ,skin: 'msg'
                     ,time: 2
             });
             return false

         }
         console.log(telStr);
         const userBind = sentcode(telStr);
         userBind.then(res => {
             return res.json()
         }).then(json => {
             if(json.status === '0'){
                 $('#getcode').attr('disabled','true').text('30s').addClass('get')

                     this.counts();
                 this.setState({sentDone:false})
                 layer.open({
                     content: '验证码已发送，请注意查收'
                     ,skin: 'msg'
                     ,time: 2
                 });
             } else if(json.status === '2'){
                 layer.open({
                     content: '该活动仅限新用户'
                     ,skin: 'msg'
                     ,time: 2
                 });
             }else{
                 layer.open({
                     content: "网络错误"
                     ,skin: 'msg'
                     ,time: 2
                 });
             }
         }).catch(ex => {
             console.log(ex.message);
         })
     }
    submitStorestock() {
        console.log($('input[name="phone"]').val());
        console.log(layer);
        let rep =/^1[3|4|5|7|8][0-9]\d{8}$/;
        let telStr = $('input[name="phone"]').val();
        let code = $('input[name="code"]').val();
        if(!telStr){
            layer.open({
                content: '手机号不能为空'
                ,skin: 'msg'
                ,time: 2
            });
            return false
        }else if(!rep.test(telStr)){
            layer.open({
                content: '手机号错误'
                ,skin: 'msg'
                ,time: 2
            });
            return false
        }
        if(!code){
            layer.open({
                content: '验证码不能为空'
                ,skin: 'msg'
                ,time: 2
            });
            return false
        }
        const userBind = nowBind(telStr,code);
        userBind.then(res => {
            return res.json()
        }).then(json => {
            if(json.status === '1'){
                // window.location.href =`http://activities.test.sanqimei.com/new-personality/index.html?userId=${this.props.userId}&type=1`
            }
            else{
                layer.open({
                    content: "验证码错误"
                    ,skin: 'msg'
                    ,time: 2
                });
            }
        }).catch(ex => {
            console.log(ex.message);
        })
    }
    render() {
        return (

            <div className='bind-phone'>
                {
                    this.state.initDone?
                        <div>
                            <img src={logo} className="logo" alt="logo" />
                            <div className="m-popup">
                                <form action="">
                                    <div className="f-mod">
                                        <div className="f-group">
                                            <div className="for-in">
                                                <input name="phone" type="number"  placeholder="填输入手机号"/>
                                            </div>
                                        </div>
                                        <div className="f-group f-code">
                                            <div className="for-in">
                                                <input name="code" type="number"  placeholder="请输入验证码"/>

                                            </div>
                                            <button type="button" id="getcode" className="sent" onClick={() => {
                                                this.sentCode()
                                            }}>验证码</button>
                                        </div>
                                        <div className="f-sub">
                                            <a  onClick={() => {
                                                this.submitStorestock()
                                            }}>立即绑定</a>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    : <div>正在加载...</div>
                }
            </div>
        )
    }
    componentDidMount() {
        // 更改状态
        this.setState({
            initDone: true
        })
    }
}

export default Home
