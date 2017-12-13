// var env = process.env.NODE_ENV;
// var host = '';
// switch(env){
//     case 'production':
//        host='http://app-server.sanqimei.com';
//        break;
//     case 'development':
//         host='http://app-server.dev.sanqimei.com';
//         break;
//     case 'test':
//         host='http://app-server.test.sanqimei.com';
//         break;
//     default:   
//        host='http://app-server.sanqimei.com';
// }
import {host} from '../config'
var config = {
    // host:'http://app-server.sanqimei.com',
    // host:'http://app-server.sanqimei.com',
    // host:'http://app-server.dev.sanqimei.com',
    host: host.url,
    // host:'',
    isOwnEmpty: (obj) => {
        for(var name in obj){
            if(obj.hasOwnProperty(name)){
                return false;//返回false，不为空对象
            }
        }
        return true;//返回true，为空对象
    },
    getNowFormatDate:() => {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    },
    skipAction:(url) =>{
       window.location.href=url;
    },
    isWeixin:()=>{
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)+''==="micromessenger") {
            return true;
        } else {
            return false;
        }
    }
};

export default config;