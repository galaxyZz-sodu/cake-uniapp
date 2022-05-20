<template>
	<view class="outer">
		<nav-custom></nav-custom>
		<image :src="detail.img" mode="widthFix"></image>
		
		<view class="text">
			<view class="cn">
				{{detail.name}}
			</view>
			<view class="franch">
				{{detail.french}}
			</view>
		</view>
		
		<view class="out">
			<view class="person-eat">
				<view :class="['list', {active: tabIndex == index}]" v-for="(i, index) in detail.list" :key="index" @click="tabIndex = index" >
					<view>{{i.spec}}</view>
					<view>{{i.weight}}</view>
					<view>{{i.edible}}</view>
				</view>
				
			</view>
		
			<view class="price">
				￥{{detail.list[tabIndex].price}}
			</view>
			
			<view class="support">
				<view class="one">
					<text>{{detail.list[tabIndex].ahead}}</text>
					<text>{{detail.list[tabIndex].size}}</text>
				</view>
				
				<view class="two">
					<text>{{detail.list[tabIndex].fittings}}</text>
					<text>{{detail.list[tabIndex].edible}}</text>
				</view>
			</view>
			
		</view>
		
		<view class="buttom-nav">
			<view>
				<view class="char" @click="handleAdd({...detail, idx: tabIndex})">
					加入购物车
				</view>
			</view>
			
			<view>
				<view class="buy">
					立即购买
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				detail: null,
				tabIndex: 0 //表示用户切换选中的字商品序号
			};
		},
		onLoad() {
			uni.getStorage({
				key: 'detail',
				success: (res) => {
					// console.log(res);
					this.detail = res.data;
					console.log(this.detail);
				}
			})
		},
		methods: {
			...mapMutations({
				'handleAdd': 'cart/cartAddMut'
			}) 
		
		}
	}
</script>

<style lang="scss" scoped>
page {
	background-color: white;
}
.outer {
	padding: 110upx 0;
}
image {
	margin-top: 100upx;
	width: 100%;
}
.text {
	margin-top: 30upx;
	margin-bottom: 20upx;
	view {
		text-align: center;
	}
	.cn {
		font-size: 50upx;
	}
	.franch {
		font-size: 30upx;
	}
}

.out {
	width: 750upx;
	padding: 0 10upx;
}
.person-eat {
	width: 100%;
	// padding: 0 10upx;
	display: flex;
	border-bottom: 1px solid #ccc;
	// background-color: red;
	.active {
		background-color: #FFCD20;
	}
	.list {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 10upx 0;
		view {
			text-align: center;
		}
	}
}

.price {
	padding: 20upx;
	border-bottom: 1px solid #ccc;
	font-size: 35upx;
}

.support {
	width: 100%;
	padding: 20upx;
	border-bottom: 1px solid #ccc;
	.one {
		margin-bottom: 10upx;
	}
	text {
		font-size: 30upx;
		margin-right: 80upx;
	}
}

.buttom-nav {
	position: fixed;
	bottom: 0;
	background-color: white;
	width: 100%;
	padding: 15upx 5upx;
	display: flex;
	justify-content: space-between;
	view {
		flex: 1;
		text-align: center;
		padding: 0 10upx;
		// background-color: red;
		.char {
			font-size: 35upx;
			border-radius: 10upx;
			padding: 20upx;
			background-color: #FFE32A;
		}
		.buy {
			font-size: 35upx;
			color: white;
			border-radius: 10upx;
			padding: 20upx;
			background-color: #857A72;
		}
	}
}
</style>
