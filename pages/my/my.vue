<template>
	<view class="cont">
		<view class="bottom-back">
			
		</view>
		<view class="margin bg-fff inner-cont">
			<view class="flex justify-center logo" @click="handlerUser">
				<image src="../../static/logo.png" class="avatar" mode=""></image>
			</view>
			
			<view class="text-center name">
				{{userName}}
			</view>
			
			<view class="change-account">
				<text class="iconfont icon-qiehuan"></text>
				切换账号
			</view>
			
			<view class="flex grid list">
				<view class="flex flex-direction align-center item" v-for="(i, index) in gridArr">
					<text :class="['iconfont margin-bottom-xs',i.icon]"></text>
					{{i.name}}
				</view>
			</view>
			
			<view class="flex grid list-2">
				<view class="flex flex-direction align-center item fs-28" v-for="(i, index) in gridArr2">
					<text :class="['iconfont margin-bottom-xs',i.icon]"></text>
					{{i.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridArr: [
					{
						icon: 'icon-dingdan',
						name: '我的订单'
					},
					{
						icon: 'icon-daishouhuo',
						name: '待收货'
					},
					{
						icon: 'icon-daifukuan',
						name: '代付款'
					},
					{
						icon: 'icon-vip-fill',
						name: '会员等级'
					},
					
				],
				gridArr2: [
					{
						icon: 'icon-jifen',
						name: '积分'
					},
					{
						icon: 'icon-caiwu',
						name: '余额'
					},
						
					{
						icon: 'icon-youhuijuan',
						name: '优惠券'
					},
					{
						icon: 'icon-yinhangqia',
						name: '现金卡'
					}
				]
			};
		},
		methods: {
			handlerUser() {
				uni.navigateTo({
					url: '../user/login'
				})
			}
		},
		computed: {
			userName() {
				let userInfo = this.$store.state.user.userInfo
				
				let name = userInfo ? userInfo.username : '未登录'
				return name
			
			}
		},
		onLoad() {
			
		}
	}
	
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.cont {
	position: relative;
	height: 200%;
}
.bottom-back {
	width: 100%;
	height: 1000upx;
	background-color: white;
	position: absolute;
	bottom: -130%;
	// z-index: 1;
}
.grid .iconfont {
	font-size: 50upx;
	color: #888;
}
.inner-cont {
	top: 100upx;
	border-radius: 15upx;
	position: relative;
	z-index: 999;
	background-color: white;
	
	.change-account {
		text-align: center;
		margin: 20upx auto;
		color: #888;
		
		.icon-qiehuan {
			margin-right: 10upx;
		}
	}
}
.logo {
	margin-top: 100upx;
}
.avatar {
	width: 150upx;
	height: 150upx;
	border-radius: 75upx;
	margin-top: -75upx;
}
.name {
	font-size: 35upx;
	font-weight: 400upx;
	margin-top: 25upx;
	// margin-bottom: 50upx;
}
.list {
	// margin-top: 70upx;
	border-top: 1px solid rgba($color: #888, $alpha: 0.1);
}
.list-2 {
	border-top: 1px solid rgba($color: #888, $alpha: 0.1);
	border-bottom: 1px solid rgba($color: #888, $alpha: 0.3);
}
.item {
	flex: 1;
	// border: 1px solid #ccc;
	font-size: 25upx;
	padding: 40upx 0;
	color: #888;
}

.item:nth-child(1), .item:nth-child(2), .item:nth-child(3) {
	border-right: 1px solid rgba($color: #888, $alpha: 0.3);
}
</style>
