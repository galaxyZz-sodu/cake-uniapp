<template>
	<view>
		<!-- 选地址 -->
		<view class="address" @click="goAddress">
			<view class="" v-if="orderAddress">
				{{orderAddress.username}} {{orderAddress.phone}}
				<view class="">
					{{orderAddress.city}} {{orderAddress.region}} {{orderAddress.detail}}
				</view>
			</view>
			
			<view class="" v-if="!orderAddress">
				请选择地址
			</view>
			
			<text class="cuIcon-right"></text>
		</view>
		
		<view class="time">
			<view class="left">
				请选择配送日期
			</view>
			
			<view class="right">
				请选择配送时间
			</view>
		</view>
		
		
		<view class="goodList" v-for="(item, index) in confirmGoodList" :key="index">
			<view class="left">
				<image :src='item.img' mode="heightFix"></image>
				<view class="info">
					<view class="">
						{{item.name}}
					</view>
					
					<view class="">
						{{item.french}}
					</view>
					
					<view class="">
						￥{{item.list[item.idx].price}}
					</view>
				</view>
			</view>
			
			<view class="right">
				<view class="edit">
					<text  class="iconfont icon-bianji"></text>
				</view>
				
			</view>
		</view>
		
		<button type="default">立即支付</button>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters({
				'orderAddress': 'address/orderAddress',
				'confirmGoodList': 'cart/confirmGoodList'
			})
		},
		methods: {
			goAddress() {
				uni.navigateTo({
					url: '../address/address'
				})
			}
		},
		onLoad() {
			console.log(this.confirmGoodList);
		}
	}
</script>

<style lang="scss" scoped>
.address {
	padding: 20upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #e7e7e7;
}

.time {
	padding: 20upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #e7e7e7;
}

.goodList {
	padding:10upx 20upx;
	display: flex;
	justify-content: space-between;
	.left {
		display: flex;
		image {
			height: 220upx;
		}
		.info {
			margin-left: 30upx;
			font-size: 30upx;
		}
	}
	.right {
		.edit {
			padding: 20upx;
			background-color: #ccc;
			border-radius: 40upx;
		}
	}
}
</style>
