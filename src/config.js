
const host = {url:'http://store-server.dev.sanqimei.com'}//开发
// host:'http://app-server.sanqimei.com',
// host:'http://app-server.sanqimei.com',
// host:'http://app-server.dev.sanqimei.com',
const wxHost = {url:'http://activity-server.sanqimei.com'}
const config = {
    redirectUri: 'http://activities.sanqimei.com/wxpurchase/wxcenter/build/list',
    timeout:5000,
    shareLogo:'http://static.sanqimei.com/activity/12/two_12.png',
    shareTitle:'',
    shareContent:'又出新活动啦！快来抢购吧~',

}

export {host, config, wxHost}

