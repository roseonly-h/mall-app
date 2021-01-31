import Vue from 'vue'
import VCharts from "v-charts"
import App from './App.vue'
import router from './router'
import store from './store'
import "./plugins/ant-design-vue"
import "./assets/css/reset.css"

// 这里安装v-charts会出现版本问题
// 解决方法：先卸载安装的v-charts 再执行  npm i v-charts echarts@4.9.0 -S
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
