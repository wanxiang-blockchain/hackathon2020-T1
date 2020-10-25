import { message } from 'antd';

import bizConfig from '../config/bizConfig';
import axios from 'axios';

let { errorMsg } = bizConfig

function ajax(params: AjaxParams, showError: boolean = true) {
    let responseObj = null;
    const isGet = params.method && params.method.toLowerCase() === 'get'
    if (isGet) {
        let str = '';
        Object.entries(params.data || []).map((item, index) => {
            str += `${index === 0 ? '?' : '&'}${item[0]}=${item[1]}`
        })
        console.log(`str = ${str}`);
        params.url += str;
    }
    return fetch(params.url, {
        method: params.method || 'POST',
        body: isGet ? null : JSON.stringify(params.data),
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-token': sessionStorage['x-token'] ? sessionStorage['x-token'] : '',
        },
        mode: "cors",
        //withCredentials:true
    }).then(response => {
        return response.json()
    }).then(response => {
        //console.log(response.headers.get('x-token'));
        //response.data = response;
        if (response['x-token']) {
            sessionStorage['x-token'] = response['x-token'];
        }
        responseObj = response;
        const returnCode = response.returnCode;
        const requestResult = response.data;
        if (returnCode % 1000 === 0) {
            return Promise.resolve(requestResult);
        } else {
            /*
            服务端业务错误；
            根据 retrunCode 报错统一处理
            */
            //17040
            //登录失效
            //17020
            if (returnCode.toString() === '17040' || returnCode.toString() === '17020' || returnCode.toString() === '16011') {
                //returnCode
                // window.location.hash = '/login';
                // message.error(`登录期限失效，自动退出！`);
                return Promise.reject(false);
            }

            if (showError) {
                if (errorMsg[returnCode]) {
                    message.error({ content: errorMsg[returnCode], key: errorMsg[returnCode] });
                } else {
                    //没有配制错误码的统一报错
                    //message.error(`获取不到正确数据，稍后再试!`);
                    message.error({ content: (response.returnDesc || `获取不到正确数据，稍后再试!`), key: 'hasNoConfigErrorCode' });
                }
                return Promise.reject(false);
            } else {
                console.log('response.data=' + JSON.stringify(response));
                return Promise.reject(false);
            }
        }
    }).catch(error => {
        /*
        超时 
        500
        404等 服务端没有返回的情况
        */
        if (error && error.response && error.response.status !== 200) {
            console.log('reqeust error = ' + JSON.stringify(error));
            message.error(`服务异常，稍后再试。`);
        }
        return Promise.reject(error);
    })
}

//ajax({},false);

export default ajax;

