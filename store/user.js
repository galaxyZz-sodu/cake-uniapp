import {$post} from '../utils/request.js'
export default {
	namespaced: true, //开启命名空间，访问组件要带模块名
	state() {
		return {
			userInfo: null
		}
	},
	mutations: {
		initInfo(state, info) {
			state.userInfo = info;
			// console.log('state的', state.userInfo);
			uni.navigateBack({
				delta: 1
			})
		}
	},
	actions: {
		userLoginAct(context, info) {
			$post('/1.1/login', info).then(res => {
				console.log('返回',res);
				let {code} = res;
				if (code) {
					let title = code === 211 ? '账号不存在' : '密码错误';
					uni.showToast({
						title,
						icon: 'none'
					});
					return
				};
				
				context.commit('initInfo', res);
				uni.setStorage({
					key: 'userInfo',
					data: res
				});
			})
		}
	}
}