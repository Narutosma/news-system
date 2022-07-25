import axios from 'axios';
import store from '../redux/store';
const serverAxios = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000,
})
// axios.defaults.headers['custom-defined-header-key'] = 'custom-defined-header-value'
// 自定义请求头：对所有请求方法生效
// axios.defaults.headers.common['common-defined-key-b'] = 'custom value: for all methods'

// 自定义请求头：只对get方法生效
// axios.defaults.headers.get['get-custom-key'] = 'custom value: only for get method';

/**
 *  request 拦截器
 */
 serverAxios.interceptors.request.use(
    (config) => {
        // 自定义请求头：只对post方法生效
        // config.headers.post['content-type'] = 'application/x-www-form-urlencoded';
        // 加载数据时加载loadding
        store.dispatch({
            type: 'loadding/trigger',
            payload: true
        })
        return config;
    },
    (error) => {
        store.dispatch({
            type: 'loadding/trigger',
            payload: false
        })
        return Promise.reject(error);
    }
)

/**
 *  response 拦截器
 */
 serverAxios.interceptors.response.use(
    (response) => {
        // 额外处理
        // ...
        store.dispatch({
            type: 'loadding/trigger',
            payload: false
        })
        return response.data;
    },
    (error) => {
        store.dispatch({
            type: 'loadding/trigger',
            payload: false
        })
       return Promise.reject(error);
    }
)


export default serverAxios;