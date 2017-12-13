import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import './style.scss'

import ReactPullLoad,{ STATS } from 'react-pullload'
import FooterNode from '../../components/FooterNode'


// import { DefaultPlayer as Video } from 'react-html5video';
// import 'react-html5video/dist/styles.css';

import {getShopDiarys} from '../../fetch/commonApi'
import Empty from '../../static/img/empty@2x.png'
import './style.scss'
// import config from '../../util'
class DiarysPullLoad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            action: STATS.init
        }
        
    }
    handleAction(action){
        //console.info(action, this.state.action,action === this.state.action);
        //new action must do not equel to old action
        if(action === this.state.action || action === STATS.refreshing){
          return false
        }

        if(action === STATS.loading){
          this.handLoadMore();
        } else{
          //DO NOT modify below code
          this.setState({
            action: action
          })
        }
    }
    handLoadMore(){
        var self = this;
        if(STATS.loading === this.state.action){
          return false
        }
        setTimeout(()=>{
          if(this.props.dyIndex === 0){
            this.setState({
              action: STATS.reset,
            });
            self.props.onChange({dyHasMore: false})
          } else{
              const shpoDesc = getShopDiarys(this.props.token,1,self.props.spuId,self.props.dyCurPage,self.props.pageSize);;
              shpoDesc.then(res => {
                  return res.json()
              }).then(json => {
                  if(json.status === '1'){
                      if(self.props.onChange){
                          self.setState({
                            action: STATS.reset,
                         });
                         self.props.onChange({
                            dyList: self.props.dyList.concat(json.result.list),
                            dyCurPage:self.props.dyCurPage === +json.result.isLastPage ===1 ? self.props.dyCurPage+1 : self.props.dyCurPage,
                            dyIndex: self.props.dyIndex - 1
                         })
                      }

                  }
              }).catch(ex => {
                  console.log(ex.message);
                  // if (__DEV__) {
                  //     console.error('用户主页“订单列表”获取数据报错, ', ex.message)
                  // }
              })
          }
        }, 2000)

        this.setState({
          action: STATS.loading
        })
    }
    componentDidMount() {
    }
    render() {
        let {dyList} = this.props;
        return (
            <div id="m-dy-pull-load" className="clear-fix">
                {
                    dyList.length>0
                    ? <ReactPullLoad
                            downEnough={150}
                            action={this.state.action}
                            handleAction={this.handleAction.bind(this)}
                            hasMore={this.props.dyHasMore}
                            FooterNode={FooterNode}
                            distanceBottom={1000}>
                            <ul className="dy-ul">
                                {
                                    dyList.map( (str, index )=>{
                                            return <li key={index}>
                                                    <div className="m-us-info">
                                                        <img src={str.headUrl} alt=""/>
                                                        <span>
                                                            <i>{str.nickName}</i><br/>
                                                            <i>{str.createTime}</i>
                                                        </span>
                                                    </div>
                                                    <div className="m-us-compare">
                                                        <div className="m-us-before">
                                                            <img src={str.beforePic} width='100%' alt=""/>
                                                        </div>
                                                        <div className="m-us-after">
                                                            <img src={str.afterPic} width='100%' alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="m-us-talk">
                                                        {str.content}
                                                    </div>
                                                    <div className="m-us-tags">
                                                        <span>{str.serverTitle}</span>
                                                        <span>{str.city}</span>
                                                        <span>{str.serverName}</span>
                                                    </div>
                                                    <div className="m-us-datas">
                                                        <ul>
                                                            <li>
                                                                <i className='view'></i><span>浏览&nbsp;·&nbsp;{str.viewCount}</span>
                                                            </li>
                                                            <li>
                                                                <i className='comment'></i><span>评论&nbsp;·&nbsp;{str.commentCount}</span>
                                                            </li>
                                                            <li>
                                                                <i className='like'></i><span>赞&nbsp;·&nbsp;{str.likeCount}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                    })
                                }
                            </ul>
                        </ReactPullLoad>
                    :<div className="empty">
                        <img src={Empty} alt=""/>
                     </div>
                }
               
            </div>
        )
    }

}

export default DiarysPullLoad