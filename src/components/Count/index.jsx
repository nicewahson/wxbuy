import React from 'react'

import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.scss'

class Count extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className={this.props.classObj}>
        {this.props.countText}
      </div>
    )
  }

}

export default Count