import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.prototype.$axios = axios


new Vue({
  render: h => h(App),
}).$mount('#app')