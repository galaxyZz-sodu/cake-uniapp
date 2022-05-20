<template>
	<view class="out">
		<view class="List" 
		v-for="(item, index) in addressList"
		:key="index"
		>
			<view class="address">
				<text class="mark" v-if="item.isdefault">默</text>
				
				<view class="left">
					<text class="iconfont icon-tucenggouxuan"
					 :class="checkdIdx == index || item.isdefault ? 'color-Yellow' : ''"
					 @click="handleCheckAddress(index)"
					 ></text>
					<view class="">
						{{item.username}} {{item.phone}}
						<view class="">
							{{item.city}} {{item.region}} {{item.detail}}
						</view>
					</view>
				</view>
				
				<view class="edit">
					<text @click="" class="iconfont icon-bianji"></text>
				</view>
				
				
			</view>
			
			<view class="bottom">
				<view class="def" v-if="!item.isdefault" @click="handleDefault(index)">
					设为默认
				</view>
				
				<view class="def" v-if="item.isdefault">
					默认地址
				</view>
				
				<view class="del" @click="deleteAddressList(index)">
					删除地址
				</view>
			</view>
		</view>
		
		
		<view class="add" @click="goAddressDetail">
			新增地址
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState({
				addressList: state => state.address.addressList,
				checkdIdx: state => state.address.checkdIdx,
				userInfo: state => state.user.userInfo
			})
		},
		methods: {
			...mapMutations({
				// 'handleDefault': 'address/AddressDefaultMut',
				'handleCheckAddress': 'address/addressCheckMut'
			}),
			
			goAddressDetail() {
				uni.navigateTo({
					url: './address-detail'
				})
			},
			
			handleDefault(idx) {
				/* {
					"requests": [
					  {
						"method": "POST",
						"path": `/1.1/classes/address?${objectId}`,
						"body": {
						  "isdefault": true
						}
					  }
					]
				  } */
				let obj = {"requests": []}
				this.addressList.forEach((item, i) => {
					let bool = i === idx;
					obj.requests.push({
						"method": "PUT",
						"path": `/1.1/classes/address/${item.objectId}`,
						"body": {
						  "isdefault": bool
						}
					})
				})
				this.$post('/1.1/batch', obj).then(res => { //批量操作在线数据，将该用户的isdefault线上保存
					this.$store.commit('address/AddressDefaultMut', idx)
				})
			},
			
			deleteAddressList(idx) {
				this.$delete(`/1.1/classes/address/${this.addressList[idx].objectId}`).then(res => {
					const value = uni.getStorageSync('userInfo');
					this.$store.dispatch('address/addressInitAct', value.objectId);
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
	padding: 0 20upx;
}
.List {
	margin-top: 20upx;
	border: 1px solid #e6e6e6;
	// box-shadow: 0 0 4upx rgba($color: black, $alpha: 0.6);
}
.address {
	padding: 30upx 20upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	position: relative;
	overflow: hidden;
	// border-bottom: 1px solid #ccc;
	.mark {
		// font-size: 15upx;
		position: absolute;
		background-color: yellow;
		padding: 0 40upx;
		padding-top: 30upx;
		top: -30upx;
		right: -45upx;
		transform: rotate(45deg);
	}
	.left {
		display: flex;
		align-items: center;
		.icon-tucenggouxuan {
			margin-right: 20upx;
			color: #e7e7e7;
		}
	}
	.edit {
		padding: 20upx;
		background-color: #ccc;
		border-radius: 40upx;
	}
}

.bottom {
	width: 100%;
	display: flex;
	justify-content: space-between;
	.def {
		flex: 1;
		background-color: #857A72;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 35upx;
		color: white;
	}
	.del {
		flex: 1;
		background-color: #FFE32A;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 35upx;
	}
}

.add {
	width: 180upx;
	height: 60upx;
	line-height: 60upx;
	text-align: center;
	background-color: brown;
	color: white;
	border-radius: 10upx;
	margin: 20upx auto;
}

.color-Yellow {
	color: #ffe32a!important;
}
</style>
