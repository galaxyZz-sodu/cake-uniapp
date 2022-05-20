import {$post, $get} from '../utils/request.js'
export default {
	namespaced: true,
	state() {
		return {
			checkIdx: -1,
			addressList: []
		}
	},
	getters: {
		orderAddress(state) {
			let {checkIdx, addressList} = state
			if (checkIdx != -1) {
				return addressList[checkIdx]
			}
			
			let len = addressList.length;
			for (let i = 0; i < len; i++) {
				if (addressList[i].isdefault) {
					return addressList[i]
				}
			}
		}
	},
	mutations: {
		AddressDefaultMut(state, idx) { //设为默认
			state.addressList.forEach((item, i) => {
				if(i == idx) {
					item.isdefault = true;
				} else {
					item.isdefault = false;
				}
			})
		},
		addressCheckMut(state, idx) { //选取新地址
			state.checkIdx = idx;
			uni.navigateBack({
				delta:1
			})
		},
		addInitMut(state, addressInitList) {
			state.addressList = addressInitList
		},
		addressAddMut(state, addressObj) { //新增地址
			state.addressList.push(addressObj)
		}
	},
	
	actions: {
		addressAddAct(context, addressObj) {
			$post('/1.1/classes/address', addressObj).then(({objectId}) => {
				// console.log(res);
				context.commit('addressAddMut', {
					...addressObj,
					objectId
				});
				uni.navigateBack({
					delta:1
				})
			})
		},
		
		addressInitAct(context, userid) {
			let url = `/1.1/classes/address?where={"userid":"${userid}"}`
			console.log(userid);
			$get(url).then(({results}) => {
				console.log(results);
				context.commit('addInitMut', results)
				
			})
		}
	}
}