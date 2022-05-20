export default {
	state() {
		return {
			cond: {
				bcid: 1
			},
		}
	},
	mutations: {
		changeCondition(state,obj) { //obj为新的条件对象
			state.cond = obj;
		}
	}
}