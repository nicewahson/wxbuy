import {getData, getQueryString, $ajax} from './fetch/getData'
const host = {url:'http://store-server.test.sanqimei.com'}//开发
// host:'http://app-server.sanqimei.com',
// host:'http://app-server.sanqimei.com',
// host:'http://app-server.dev.sanqimei.com',
const wxHost = {url:'http://activity-server.sanqimei.com'}
const config = {
    redirectUri: 'http://activities.sanqimei.com/wxpurchase/wxcenter/build/list?storeId='+getQueryString('storeId')+'&activityId='+getQueryString('activityId'),
    timeout:5000,
    shareLogo:'http://devstatic.sanqimei.com/images/products/7740055041513774005.jpg',
    shareTitle:'',
    shareContent:'又出新活动啦！快来抢购吧~',

}

export {host, config, wxHost}

