
const host = {url:'http://app-server.dev.sanqimei.com'}//开发
// host:'http://app-server.sanqimei.com',
// host:'http://app-server.sanqimei.com',
// host:'http://app-server.dev.sanqimei.com',
const wxHost = {url:'http://activity-server.sanqimei.com'}
const config = {
    redirectUri: 'http://activities.sanqimei.com/lottery/dist/index.html',
    timeout:5000,
    shareLogo:'http://static.sanqimei.com/activity/12/two_12.png',
    shareTitle:'幸运双12，福利免费领',
    shareContent:'37美面部清洁、宝力豪健身月卡、凤凰机器人免费课程、美丽心情优惠券更多奖品等你领',

}

export {host, config, wxHost}

