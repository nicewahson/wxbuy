import React from 'react';
import config from '../../util'
import '../../static/font/iconfont.css'
import './style.scss'

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    var self = this;
    if (window.addEventListener) {
      self.videoNode.addEventListener('fullscreenchange', function(){ 
        alert(1)
        if(self.videoNode.style.display==="block"){
          self.videoNode.style.display="none";
        }
      });
      
      self.videoNode.addEventListener('webkitfullscreenchange', function(){ 
        if(self.videoNode.style.display==="block"){
          self.videoNode.style.display="none";
        }
      });

      self.videoNode.addEventListener('mozfullscreenchange', function(){ 
        if(self.videoNode.style.display==="block"){
          self.videoNode.style.display="none";
        }
      });
      self.videoNode.addEventListener('MSFullscreenChange', function(){ 
        if(self.videoNode.style.display==="block"){
          self.videoNode.style.display="none";
        }
      });

      self.videoNode.addEventListener("x5videoexitfullscreen", function(){
        if(self.videoNode.style.display==="block"){
          self.videoNode.style.display="none";
        }
      })
      self.videoNode.addEventListener('ended',function(){
        self.exitFullScreen();
      });

    }

  }
  videoHandle(){
    var self = this;
    if(config.isWeixin()){
      this.videoNode.play();
      return false;
    }
    this.videoNode.play();
    this.launchFullScreen(this.videoNode);
    setTimeout(function(){
      self.videoNode.style.display="block";
    },300)
  }

  launchFullScreen(element) {
    if(element.requestFullScreen) {
      element.requestFullScreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  }

  exitFullScreen() {
    var exitMethod =
		document.exitFullscreen ||		//W3C
		document.exitFullScreen ||		//W3C
		document.webkitExitFullscreen ||	//Chrome等
		document.webkitExitFullScreen ||	//Chrome等
		document.webkitCancelFullscreen ||	//Chrome等
		document.webkitCancelFullScreen ||	//Chrome等
		document.mozCancelFullscreen ||		//FireFox
		document.mozCancelFullScreen ||		//FireFox
		document.mozExitFullscreen ||		//FireFox
		document.mozExitFullScreen ||		//FireFox
		document.msExitFullscreen ||		//IE11
		document.msExitFullScreen;		//IE11
    exitMethod.call(document);
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="video-container">
        <i className="icon iconfont" onClick={this.videoHandle.bind(this)}>&#xe61a;</i>
        <img src={this.props.poster} alt="" width="100%"/> 
        <video width="100%" height="auto" controls poster={this.props.poster} ref={ node => this.videoNode = node }>
            <source src={this.props.video} type='video/mp4'></source>
        </video>
      </div>
    )
  }
}