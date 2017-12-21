import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Logo from '../../static/img/logo@2x.png'


class FixFoot extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="m-fixFoot">
                <div className="ft-logo">
                    <img src={Logo} alt=""/>
                    <div className="sogen">
                        <p>37美</p>
                        <p>3分凭天生，7分靠科美</p>
                    </div>
                </div>
                <div className="btns">
                    <span onClick={()=>{window.location.href =`http://activities.show.sanqimei.com/new-personality/index.html?userId=${this.props.userId}&type=1`}}>新人奖励</span>
                    <span onClick={()=>{window.location.href ='https://app.sanqimei.com/upgrade/index'}}>立即下载</span>
                </div>
            </div>
        )
    }

}

export default FixFoot