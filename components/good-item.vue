<template>
	<view>
		<view class="cont">
			<view class="cake-item" @click="goDetail()">
				<view>
					<image :src="good.img" mode="" class="poster"></image>
				</view>
				<view class="content">
					<view class="info">
						<view class="fs-28">
							{{good.name}}
						</view>
						
						<view class="fs-16">
							{{good.french}}
						</view>
						
						<view class="fs-18">
							<text class="fs-14">￥</text>
							{{good.price}}
						</view>
					</view>
					
					<view class="btn">
						<text @click.stop="handleCartAdd" class="iconfont icon-gouwuche"></text>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"good-item",
		data() {
			return {
				
			};
		},
		onLoad() {
			console.log(this.good);
		},
		props: ['good'],
		methods: {
			goDetail() {
				// console.log(index);
				uni.setStorage({
					key: 'detail',
					data: this.good,
					success: () => { //保证在存储完成后再调用
						uni.navigateTo({
							url: '../detail/detail'
						})
					}
				})
			},
			handleCartAdd() {
				this.$store.commit('cart/cartAddMut', {
					...this.good,
					idx: 0
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.cont {
	display: flex;
	flex-wrap: wrap;
	padding: 5upx;
	justify-content: space-between;
	background-color: white;
} 
.cake-item {
	width: 350upx;
	.poster {
		height: 350upx;
		background-color: #f5f5f5;
	}
	.fs-28 {
		margin-top: 24upx;
	}
	.fs-16 {
		margin: 14upx 0;
	}
	.fs-18 {
		margin-bottom: 22upx;
	}
	.content {
		// width: 200upx;
		padding: 0 10upx;
		display: flex;
		justify-content: space-between;
		position: relative;
		// align-items: center;
		.info {
			width: 250upx;
		}
		.btn {
			position: absolute;
			right: 5upx;
			top: 20upx;
			padding: 20upx 25upx;
			background-color: #ffe32a;
			border-radius: 40upx;
		}
	}
	
}
</style>
