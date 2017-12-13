import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.scss'
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    componentWillMount(){
        console.log(this.props.routes)
    }
    render() {
        return (

            <div className='ac-app'>
                {this.props.children}
            </div>
        )
    }
    componentDidMount() {
    }
}

export default App
