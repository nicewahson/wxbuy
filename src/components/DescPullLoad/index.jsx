import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import './style.scss'

import ReactPullLoad,{ STATS } from 'react-pullload'
import FooterNode from '../../components/FooterNode'

import VideoPlayer from '../VideoPlayer'

import {getShopDesc} from '../../fetch/commonApi'

import Bitmap from '../../static/img/Bitmap@2x.png'
import Empty from '../../static/img/empty@2x.png'
// import Server from '../../static/img/server@2x.png'
// import config from '../../util'
class DescPullLoad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            action: STATS.init,
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
          if(this.props.index === 0){
            this.setState({
              action: STATS.reset,
              
            });
            self.props.onChange({hasMore: false})
          } else{
              const shpoDesc = getShopDesc(self.props.spuId,self.props.curPage,self.props.pageSize);
              shpoDesc.then(res => {
                  return res.json()
              }).then(json => {
                  if(json.status === '1'){
                      if(self.props.onChange){
                          this.setState({
                            action: STATS.reset,
                         });
                         self.props.onChange({
                            list: self.props.list.concat(json.result.list),
                            curPage:self.props.curPage + 1 ,
                            // curPage:self.props.curPage === +json.result.lastPage ? self.props.curPage : self.props.curPage + 1 ,
                            index: self.props.index - 1
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
        let {serverVedio,list} = this.props;
        return (
            <div id="m-pull-load" className="clear-fix">
                {
                    serverVedio.video !==''|| list.length!==0 
                    ? <ReactPullLoad
                            downEnough={150}
                            action={this.state.action}
                            handleAction={this.handleAction.bind(this)}
                            hasMore={this.props.hasMore}
                            FooterNode={FooterNode}
                            distanceBottom={1000}>
                            <ul className="test-ul">

                                {
                                    (serverVedio.video !=='')
                                    ? <div className="m-video">
                                        <img src={Bitmap} alt="" width="100%"/>
                                        <VideoPlayer video={serverVedio.video} poster={serverVedio.videoPic}/>
                                    </div>
                                    :''
                                }
                                {/* <img src={Server} alt="" width='55px' style={{'margin':'20px 0 15px'}}/> */}
                                {
                                    list.map( (str, index )=>{
                                        if(str.videoUrl !== ''){
                                            return <VideoPlayer video={str.videoUrl} poster={str.picUrl} key={index}/>
                                        }else{
                                            return <li key={index}><img src={str.picUrl} alt="" width='100%'/></li>
                                        }
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

export default DescPullLoad