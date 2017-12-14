/**
 * Created by Administrator on 2017/12/14.
 */
import 'whatwg-fetch'
import 'es6-promise'
import {host as serverInfo, wxHost} from '../config'
import $ from 'jquery'

let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
};

const getData = (url, method='GET', options) => {
    if(!url.startsWith("http://")){
        url = serverInfo.url+url;
    }
    let params = '';
    if(typeof(options) == 'object') {
        for (let paramName in options) {
            if (options[paramName]) {
                params += `${paramName}=${options[paramName]}&`
            }
        }
    }else if(typeof(options == 'string')) {
        params = options;
    }else{
        throw new Error('unknown params')
    }
    if (method === 'GET') {
        if(params){
            url += `?${params}`;
        }
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                credentials:'include'
            }).then((response) => {
                return response.json()
            }).then((json) => {
                resolve(json)
            }).catch((e) => {
                reject(e.message)
            })
        })
    } else if (method === 'POST') {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers:headers,
                credentials:'include',
                body:params
            }).then((response) => {
                return response.json()
            }).then((json) => {
                resolve(json)
            }).catch((e) => {
                reject(e.message)
            })
        })
    }
}

const getQueryString = (name) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = '';
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == '' || context == 'undefined' ? '' : context;
}

const  $ajax = function(url, params, success, error) {
    url = wxHost.url + url;// 拼接请求地址
    var success = arguments[2] ? arguments[2] : function () { };// 成功执行的函数
    var error = arguments[3] ? arguments[3] : function () { };// 失败执行的函数
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: params,//参数
        success: function (res) {
            success(res);
        },
        error: function (e, errType, error) {
            error(e);
        }
    })
}

export {getData, getQueryString, $ajax}