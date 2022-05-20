<template>
	<view>
		<nav-custom></nav-custom>
		
		<view class="out">
			<view class="list" v-for="(item, index) in carList" :key="item.id+'-'+item.idx">
				<view class="left">
					<text @click="handlerCheck(index)" class="iconfont icon-tucenggouxuan" :class="item.isCheck ? 'color-Yellow' : ''"></text>
					<image :src="item.img" mode="heightFix"></image>
					<view class="info">
						<view class="">
							{{item.name}}
						</view>
						
						<view class="">
							{{item.french}}
						</view>
						
						<view class="">
							￥{{item.list[item.idx].price * item.num}}
						</view>
					</view>
				</view>
				
				<view class="right">
					<view class="edit">
						<text @click="handlerEdit(index)" class="iconfont icon-bianji"></text>
					</view>
					
					<view class="weight">
						{{item.list[item.idx].spec}} X {{item.num}}
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="bottom-nav">
			<view class="bottom-left">
				<text><text @click="handlerAllCheck(allInfo.allCheck)" class="iconfont icon-tucenggouxuan" :class="allInfo.allCheck ? 'color-Yellow' : ''"></text>全选</text>
				<text class="total">共计：{{allInfo.allPrice}}</text>
			</view>
			
			
			
			<view class="bottom-right" @click="goOrder">
				立即结算
			</view>
		</view>
		
		<!-- 弹窗 -->
		<u-overlay :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					
					<view class="over-out">
						<view class="over-info">
							<view class="over-img">
								<image :src="carList[cartIdx].img" mode="heightFix"></image>
								<view class="over-text">
									<view class="">
										{{carList[cartIdx].name}}
									</view>
									<view class="">
										{{carList[cartIdx].french}}
									</view>
									<view class="">
										￥{{carList[cartIdx].list[dropIdx].price}}
									</view>
								</view>
							</view>
							
							<view class="" @click="show = false">
								X
							</view>
							
						</view>
						
						<view class="select" @click="dropShow = !dropShow">
							<view class="left">
								规格选择
							</view>
							
							<view class="right" >
								{{carList[cartIdx].list[dropIdx].spec}} - {{carList[cartIdx].list[dropIdx].edible}}
								<text class="iconfont icon-xiala"></text>
								<view class="drop" @tap.stop v-show="dropShow">
									<view class="dropList" v-for="(item, index) in carList[cartIdx].list" :key="index" @click="handlerDropList(index)">
										{{item.spec}} - {{item.edible}}
									</view>
								</view>
							</view>
						</view>
						
						<view class="select-two">
							<view class="left">
								数量选择
							</view>
							
							<view class="right">
								<u-number-box v-model="value" @change="handlerNum" bgColor="#ffe32a"></u-number-box>
							</view>
						</view>
					</view>
					
					<view class="btn">
						<view class="btn-left" @click="show = false">
							取消
						</view>
						
						<view class="btn-right" @click="handlerOk">
							确定
						</view>
					</view>
					
				</view>
			</view>
		</u-overlay>
		
	</view>
</template>

<script>
	import {mapState, mapMutations, mapGetters} from 'vuex'
	export default {
		data() {
			return {
				show: false,
				value: 0,
				dropShow: false,
				cartIdx: 0, //主商品序号
				dropIdx: 0, //子商品序号
				num: 1 //当前弹窗商品数量
			};
		},
		onLoad() {
			// console.log('用户', this.userInfo);
			if (this.userInfo) { //如果用户已经登录，则直接跳过下面的登录提示弹窗
				return
			}
			uni.showModal({ //登录提示弹窗
				title: '温馨提示',
				content: '您需要登录才能继续您的操作',
				confirmText: '立即登录',
				confirmColor: '#ffe32a',
				cancelText: '以后再说',
				cancelColor:'black',
				success: function (res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '../user/login'
						})
					} else if (res.cancel) {
						uni.navigateBack({
							delta: 1
						})
					}
				}
			});
		},
		computed: {
			...mapState({
				carList: state => state.cart.cartList,
				userInfo: state => state.user.userInfo
			}),
			
			...mapGetters({
				allInfo: 'cart/allInfo'
			}),
			
			checkdCartInfo() { //从vuex返回的下拉框信息
				let {cartIdx, carList} = this;
				return carList[cartIdx].list[carList[cartIdx].idx]
			},
			
			/* computedId(item) {
				return item.id+'-'+item.idx
			} */
		},
		methods: {
			...mapMutations({
				handlerCheck: 'cart/cartCheckMut',
				handlerAllCheck: 'cart/cartAllCheckMut'
			}),
			valChange() {
				
			},
			handlerEdit(idx) {
				this.cartIdx = idx;
				this.dropIdx = this.carList[idx].idx;
				this.show = !this.show;
			},
			
			handlerDropList(dropIdx) {
				this.dropShow = false;
				this.dropIdx = dropIdx;
			},
			
			handlerNum({value}) {
				// console.log(value);
				this.num = value
			},
			
			handlerOk() {
				let {cartIdx, dropIdx, num} = this
				// console.log(cartIdx, dropIdx, num);
				this.show = false;
				this.$store.commit('cart/cartListCheckMut', {cartIdx, dropIdx, num})
				// this.dropIdx = 0;
			},
			
			goOrder() {
				uni.navigateTo({
					url:'../order/order'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background-color: white;
}
.out {
	padding: 180upx 20upx;
	.list {
		padding: 20upx 0;
		display: flex;
		justify-content: space-between;
		.left {
			width: 480upx;
			// background-color: red;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.icon-tucenggouxuan {
				color: #e7e7e7;
			}
			image {
				height: 180upx;
			}
			.info {
				width: 220upx;
			}
		}
		
		.right {
			// background-color: blue;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: center;
			.edit {
				width: 80upx;
				height: 80upx;
				text-align: center;
				line-height: 80upx;
				border-radius: 40upx;
				background-color: #ccc;
			}
		}
	}
}

.bottom-nav {
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	height: 110upx;
	background-color: white;
	justify-content: space-between;
	padding-left: 20upx;
	box-shadow: 0 0 2upx rgba($color: black, $alpha: 0.4);
	.bottom-left {
		display: flex;
		align-items: center;
		.icon-tucenggouxuan {
			color: #e7e7e7;
		}
		.total {
			margin-left: 20upx;
		}
	}
	.bottom-right {
		background-color: #ffe32a;
		line-height: 110upx;
		padding: 0 40upx;
		font-size: 35upx;
		color: white;
	}
}

.color-Yellow {
	color: #ffe32a!important;
	// background-color: #ffe32a;
}

.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		position: relative;
		border-radius: 15upx;
		width: 320px;
		height: 270px;
		background-color: #fff;
		.over-out {
			padding: 20upx;
			.over-info {
				display: flex;
				justify-content: space-between;
				padding-bottom: 10upx;
				border-bottom: 1px solid #e7e7e7;
				.over-img {
					// background-color: red;
					width: 500upx;
					display: flex;
					justify-content: space-between;
					image {
						height: 200upx;
					}
					.over-text {
						width: 270upx;
						view {
							margin-bottom: 10upx;
						}
					}
				}
				
			}
			.select {
				display: flex;
				padding: 20upx 0;
				padding-right: 22upx;
				justify-content: space-between;
				border-bottom: 1px solid #e7e7e7;
				position: relative;
				.right {
					width: 300upx;
					text-align: right;
					
					// background-color: red;
					.icon-xiala {
						position: relative;
						top: 6upx;
						left: 10upx;
						font-size: 40upx;
						padding-top: 5upx;
					}
					.drop {
						position: absolute;
						right: 10upx;
						z-index: 9;
						background-color: white;
						box-shadow: 0 0 4upx rgba($color: black, $alpha: 0.4);
						width: 500upx;
						// border-radius: 10upx;
						.dropList {
							padding: 15upx 10upx;
							font-size: 35upx;
							&:hover {
								background-color: #e6e6e6;
							}
						}
					}
				}
				
			}
			
			.select-two {
				display: flex;
				padding: 30upx 0;
				justify-content: space-between;
				align-items: center;
				// border-bottom: 1px solid #e7e7e7;
			}
		}
		.btn {
			position: absolute;
			bottom: 0;
			display: flex;
			width: 100%;
			height: 100upx;
			font-size: 35upx;
			// border-radius: 15upx;
			.btn-left {
				flex: 1;
				color: white;
				background-color: #857A72;
				text-align: center;
				line-height: 100upx;
			}
			.btn-right {
				flex: 1;
				background-color: #FFE32A;
				text-align: center;
				line-height: 100upx;
			}
		}
		
	}
</style>
