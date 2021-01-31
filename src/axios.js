import axios from "axios"

const instance = axios.create({
    baseURL:'https://mallapi.duyiedu.com/'
})

instance.interceptors.request.use(config=>{
    if(config.url.includes('/passport')){
        return config
    }
    return{
        ...config,
        params:{
            ...config.params,
            appkey: 'rs_1611578779779'
        }
    }
},err=>Promise.reject(err))

instance.interceptors.response.use(response=>{
    if(response.data.status === 'fail'){
        return Promise.reject(response.data.msg)
    }
    return response.data.data
},error=>Promise.reject(error))

export default instance