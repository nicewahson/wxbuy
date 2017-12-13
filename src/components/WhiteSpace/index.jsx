import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class WhiteSpace extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div id="WhiteSpace" className="whitespace"></div>
        )
    }

}

export default WhiteSpace