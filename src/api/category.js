import axios from '@/axios.js'

export default {
  // 获取类目信息
    list(params) {
      return axios.get('/category/all', { params });
    },
  };
  