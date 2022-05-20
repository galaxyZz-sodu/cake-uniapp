import App from './App'
import store from 'store/index.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store //注入状态机 
})
app.$mount()
// #endif

// 挂载全局组件
import MyComp from 'components/test-my.vue'
import NavCustom from 'components/nav-custom.vue'
import HomeTitle from 'components/home-title.vue'
import goodItem from 'components/good-item.vue'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.component('good-item', goodItem)
Vue.component('home-title', HomeTitle)
Vue.component('my-comp', MyComp)
Vue.component('nav-custom', NavCustom)

// 挂载全局异步请求方法
/* import {$http, $get, $post} from 'utils/request.js'
Vue.prototype.$http = $http
Vue.prototype.$get = $get
Vue.prototype.$post = $post */
import * as request from 'utils/request.js'
for (let key in request) {
	Vue.prototype[key] = request[key]
}


// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif