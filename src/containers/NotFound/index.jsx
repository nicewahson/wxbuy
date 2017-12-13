import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import pg404 from '../../static/img/404.svg';
import './style.scss';
class NotFound extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="ac-404"><img src={pg404} alt="404"/></div>
        )
    }
}

export default NotFound