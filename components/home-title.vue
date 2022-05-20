<template>
	<view class="contanier">
		<view class="left">
			<text class="iconfont icon-canju"></text>
			<text class="slash">/</text>
			<view class="left-text">
				<text style="color: black;"><span style="font-size: 40upx; font-weight:600;">{{title.textWeight}}</span><span style="font-size: 35upx;font-weight: 500;">{{title.textLight}}</span></text>
				<text style="font-size: 20upx;">{{title.enTitle}}</text>
			</view>
		</view>
		
		<view class="right" style="font-size: 30upx;">
			{{title.enTit}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"home-title",
		data() {
			return {
				
			};
		},
		props: ['title']
	}
</script>

<style lang="scss">
.contanier {
	width: 100%;
	height: 160upx;
	padding: 30upx;
	display: flex;
	background-color: white;
	align-items: center;
	justify-content: space-between;
	.left {
		color: #ababab;
		display: flex;
		align-items: center;
		.icon-canju {
			font-size: 70upx;
		}
		.slash {
			font-size: 50upx;
			margin:0 30upx;
		}
		.left-text {
			display: flex;
			flex-direction: column;
		}
	}
	.right {
		color: #ababab;
	}
}
</style>
