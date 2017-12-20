/**
 * Created by Administrator on 2017/12/14.
 */
import {getData, getQueryString, $ajax} from '../fetch/getData'
import {config} from '../config'

const layer = window.layer
const wx = window.wx

function getWxConfig(url,shareTitle, cb){
    $ajax('/free/getWeChatInfo',{url:url},function(res){
        if(res.status === '1'){
            var data = res.result
            if(getQueryString('state') == '1'){
                let code = getQueryString('code')
                $ajax('/oauth/getAccessToken', {code}, function(res){
                    if(res.errcode){

                    }else{
                        sessionStorage.setItem('accessinfo', JSON.stringify(res))
                        cb && cb()
                    }
                }, function(res){
                    // throw new Error('error main')
                    layer.open({
                        content: '获取微信信息异常'
                        ,skin: 'msg'
                        ,time: 2
                    });
                })
            }else{
                let url='http://activities.sanqimei.com/wxpurchase/wxcenter/build/list?storeId='+getQueryString('storeId')+'&activityId='+getQueryString('activityId')
                let encodrUrl = encodeURIComponent(url);
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${data.appId}&redirect_uri=${encodrUrl}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
                // window.location.href = `https://activities.sanqimei.com/get-weixin-code.html?appid=${data.appId}&redirect_uri=http%3a%2f%2f192.168.88.203%3a3000%2fwxcenter&scope=snsapi_userinfo&connect_redirect=1&state=1`
            }

            //初始化微信配置
            wxShareConfig(data.appId, data.timestamp, data.nonceStr, data.signature);
            //分享准备
            wxShareReady(shareTitle, shareTitle + config.shareContent, config.shareLogo);
        }
    })
}

/**yi
 * 初始化微信分享配置
 * @param appId
 * @param timestamp
 * @param nonceStr
 * @param signature
 */
function wxShareConfig(appId, timestamp, nonceStr, signature) {
    console.log(wx, window)
    wx.config({
        debug: false,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareQZone',
            'openLocation',
            'getLocation'
        ]
    });
    wx.error(function (res) {
        console.log(res.errMsg);
    });
}


/**
 * 分享准备
 * @param lineLink
 * @param shareTitle
 * @param shareContent
 * @param shareLogo
 */
function wxShareReady(shareTitle, shareContent, shareLogo) {
    wx.ready(function () {
        //获取“分享到朋友圈”
        wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            link: config.redirectUri, // 分享链接
            imgUrl: shareLogo, // 分享图标
            success: function (res) {
                // 用户确认分享后执行的回调函数
            },
            cancel: function (res) {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享给朋友”
        wx.onMenuShareAppMessage({
            title: shareTitle, // 分享标题
            desc: shareContent, // 分享描述
            link: config.redirectUri, // 分享链接
            imgUrl: shareLogo, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (res) {
                // 用户确认分享后执行的回调函数
                // alert('分享朋友成功')
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享到QQ”
        wx.onMenuShareQQ({
            title: shareTitle, // 分享标题
            desc: shareContent, // 分享描述
            link: config.redirectUri, // 分享链接
            imgUrl: shareLogo, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享到QQ空间”
        wx.onMenuShareQZone({
            title: shareTitle, // 分享标题
            desc: shareContent, // 分享描述
            link: config.redirectUri, // 分享链接
            imgUrl: shareLogo, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享到腾讯微博”
        wx.onMenuShareWeibo({
            title: shareTitle, // 分享标题
            desc: shareContent, // 分享描述
            link: config.redirectUri, // 分享链接
            imgUrl: shareLogo, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}

export {getWxConfig, wxShareReady}