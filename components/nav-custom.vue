<template>
	<view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-locationfill text-gray"></text> 北京
			</view>
			<view class="content text-bold">
				MCAKE
			</view>
			<view class="action text-grey">
				<text class="cuIcon-search"></text>
				<text class="line">|</text>
				<text class="cuIcon-sort" @click="goCake"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"nav",
		data() {
			return {
				
			};
		},
		methods: {
			goCake() {
				uni.navigateTo({
					url: '/pages/cake/cake'
				})
			}
		}
	}
</script>

<style lang="scss">
	.cu-bar {
		padding-top: 120upx;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 2;
		.line {
			font-size: 20upx;
			margin: 20upx;
			line-height: 20upx;
		}
	}
</style>
