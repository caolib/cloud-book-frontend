import axios from "axios";
import router from "@/router";
// import {useTokenStore} from "@/stores/token.js";

import {useReaderStore} from "@/stores/reader.js";
import {message} from "ant-design-vue";


const baseURL = "/api";
// const baseURL = "http://localhost:10086/";
const instance = axios.create({baseURL});
// const tokenStore = useTokenStore();


//响应拦截器，状态码为2xx时执行成功回调，否则执行失败回调
instance.interceptors.response.use(
    //成功回调
    (result) => {
        // 如果状态码为0，后端发生异常
        if (result.data.code === 0) {
            message.error(result.data.msg);
            return Promise.reject(result);
        }
        return result.data;
    },
    //失败回调
    (error) => {
        const code = error.response.status;
        switch (code) {
            case 401:
                message.error('请先登录！');
                break;
            case 419:
                message.error('身份已过期,请重新登录！');
                break;
            default:
                message.error('服务器异常！' + code);
                break;
        }

        router.push('/login');
        window.local.reload();

        // 将异步的状态设置为失败状态
        return Promise.reject(error);
    }
);

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 检查config和config.url是否存在
        if (!config || !config.url) {
            return Promise.reject('config or config.url 未定义');
        }

        //登录请求不需要token
        if (config.url.endsWith('/login') || config.url.endsWith('/register')) {
            return config;
        }
        // 获取token
        const readerStore = useReaderStore();
        const token = readerStore.reader.token;

        //如果有token，将token放入请求头中
        if (token != null) {
            config.headers['token'] = token;
        } else {
            router.push('/login');
            message.error('请先登录！');
            return Promise.reject('token不存在！');
        }

        return config;
    },
    (err) => {
        //请求错误的回调
        return Promise.reject(err);
    }
);

export default instance;
