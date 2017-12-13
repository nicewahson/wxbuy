import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import logo from '../../static/img/logo.png'
import './style.scss'
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    render() {
        return (

            <div className='ac-home'>
                {
                    this.state.initDone
                    ? <img src={logo} className="logo" alt="logo" />
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
