import axios from '@/axios.js'

export default {
    list(params) {
        return axios.get('/products/all', {
            params
        })
    },
    add(params) {
        return axios.post('/products/add', params)
    },
    remove(id) {
        return axios.delete(`/products/${id}`)
    },
    // 获取单个数据
    detail(id) {
        return axios.get(`/products/${id}`);
      },
    edit(params){
        return axios.put('/products/edit',params)
    }
}