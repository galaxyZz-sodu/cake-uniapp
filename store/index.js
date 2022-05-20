import Vue from "vue"
import Vuex from 'vuex'
import count from './count.js'
import condiction from './condiction.js'
import cart from './cart.js'
import user from './user.js'
import address from './address.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		count,
		condiction,
		user,
		cart,
		address
	}
})

export default store