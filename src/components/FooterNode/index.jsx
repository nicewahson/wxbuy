import React, { PureComponent } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
const STATS = {
  init: '',
  pulling: 'pulling',
  enough: 'pulling enough',
  refreshing: 'refreshing',
  refreshed: 'refreshed',
  reset: 'reset',
  loading: 'loading' // loading more
};

export default class FooterNode extends PureComponent{
  // static defaultProps = {
  //   loaderState: STATS.init,
  //   hasMore: true
  // };
  constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          loaderState: STATS.init,
          hasMore: true
        }
    }

  render(){
    const {
      //loaderState,
      hasMore
    } = this.props

    let className = `pull-load-footer-default ${hasMore? "" : "nomore"}`

    return(
      <div className={className}>
        <i/>
      </div>
    )
  }
}