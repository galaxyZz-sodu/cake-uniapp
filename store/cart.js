import Vue from 'vue'
export default {
	namespaced: true,
	state() {
		return {
			cartList: [
				{
					id: '10090',
					twoId: 10089,
					name: '拿破仑巧克力',
					french: 'caomei',
					price: '218.00',
					isCheck: false,
					img: 'https://static.mcake.com/new_goods/heisenlinnapolun/N0605/list/1.jpg',
					list: [
						{id: 10090, sku: "n0201", ahead: "提前5小时预定", edible: "2-3人食", spec: "1磅", price: "218.00"},
						{id: 10091, sku: "n0202", ahead: "提前5小时预定", edible: "4-7人食", spec: "2磅", price: "318.00"},
						{id: 10092, sku: "n0203", ahead: "提前5小时预定", edible: "8-12人食", spec: "3磅", price: "458.00"},
						{id: 10093, sku: "n0204", ahead: "提前5小时预定", edible: "12-20人食", spec: "4磅", price: "558.00"}
					],
					num: 1, //商品数量
					idx: 0 //表示选中的子商品信息
				},
				{
					id: '10524',
					twoId: 12121,
					name: '香草拿破仑',
					french: 'xiangcao',
					price: '208.00',
					isCheck: false,
					img: 'https://static.mcake.com/new_goods/jingdianxiangcaonapolun/N0502/list/1.jpg',
					list: [
						{id: 10090, sku: "n0201", ahead: "提前5小时预定", edible: "2-3人食", spec: "1磅", price: "218.00"},
						{id: 10091, sku: "n0202", ahead: "提前5小时预定", edible: "4-7人食", spec: "2磅", price: "318.00"},
						{id: 10092, sku: "n0203", ahead: "提前5小时预定", edible: "8-12人食", spec: "3磅", price: "458.00"},
						{id: 10093, sku: "n0204", ahead: "提前5小时预定", edible: "12-20人食", spec: "4磅", price: "558.00"}
					],
					num: 1, //商品数量
					idx: 0 //表示选中的子商品信息
				}
			]
		}
	},
	getters: {
		allInfo(state) {
			let allCheck = true;
			let allPrice = 0;
			state.cartList.forEach(item => {
				if (!item.isCheck) {
					allCheck = false
				}
				if (item.isCheck) {
					allPrice += item.list[item.idx].price * item.num
				}
			})
			return {allCheck, allPrice}
		},
		
		confirmGoodList(state) {
			return state.cartList.filter(item => {
				return item.isCheck == true;
			})
		}
	},
	mutations: {
		cartCheckMut(state, index) { //单选
			// console.log('触发', index);
			state.cartList[index].isCheck = !state.cartList[index].isCheck;
			// console.log(state.cartList[index].isCheck);
		},
		
		cartAllCheckMut(state, bool) { //全选
			state.cartList.forEach(item => {
				item.isCheck = !bool;
			})
		},
		
		cartListCheckMut(state, {cartIdx, dropIdx, num}) { //编辑菜单确定后更改数据
			state.cartList[cartIdx].idx = dropIdx;
			state.cartList[cartIdx].num = num;
		},
		
		cartAddMut(state, goodObj) {
			// 非响应式数据
			/* goodObj.isCheck = false;
			goodObj.num = 1;
			goodObj.idx = 0; */
			let {cartList} = state;
			let len = cartList.length;
			for(let i = 0; i < len; i++) {
				let {id, idx} = goodObj;
				if (cartList[i].id == id && cartList[i].idx == idx) { //表示购物车已有相同商品
					state.cartList[i].num++; //商品数加一
					return //中断执行
				}
			}
			// 响应式数据挂载
			Vue.set(goodObj, 'isCheck', false);
			Vue.set(goodObj, 'num', 1);
			// Vue.set(goodObj, 'idx', 0);
			
			state.cartList.push(goodObj); //新增新商品
			
		}
	}
}