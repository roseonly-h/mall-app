import axios from '@/axios.js'

export default {
    login(params){
        return axios.post('/passport/login',params)
    },
    // 用户注册
    logon(params){
        return axios.post('/passport/logon',params)
    },
    // 找回密码
    findBack(params){
        return axios.post('/passport/fingBack',params)
    },
    // 修改用户信息
    changeUserInfo(params){
        return axios.put('/passport/changeUserInfo',params)
    },
    // 获取验证码
    getCode(email){
        return axios.post('/passport/getCode',email)
    }
}

// rose_only@aliyun.com