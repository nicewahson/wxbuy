import React from 'react';
import videojs from 'video.js'
import "video.js/dist/video-js.css"
import './style.scss'
export default class VideoPlayer extends React.Component {
  componentDidMount() {
    var self = this;
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      // console.log('onPlayerReady',this.player.el_)
    });
    this.player.on('ended', function () {
      // alert('结束播放');
    });
    this.player.on("play",()=>{
      // this.launchFullScreen(this.videoNode);
    });
    document.getElementById('dd').addEventListener('click', function() {
      self.launchFullScreen(self.videoNode);
      self.videoNode.play()
    })

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

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video ref={ node => this.videoNode = node } className="video-js"></video>
      </div>
    )
  }
}