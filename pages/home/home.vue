<template>
	<scroll-view class="scroll-cont" scroll-y="true" @scroll="handlerScroll" :scroll-into-view="topItem" scroll-with-animation="true">
		<view>
			<view id="top">
				
			</view>
			<!-- 顶部导航栏 -->
			<nav-custom/>
			
			<!-- 首页轮播图 -->
			<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000" indicator-active-color="#ffe32a" circular="true">
				<swiper-item v-for="(item, index) in bannerList" :key="item.title" @click="goBanner(item.link)">
					<view class="swiper-item">
						<image :src="item.img" mode=""></image>
					</view>
				</swiper-item>
				
			</swiper>
			
			<!-- 首页标签栏 -->
			<home-title :title="titleOne"/>
			
			<scroll-view scroll-x="true" class="scroll">
				<view>
					<!-- heightFix设置高度然后自适应宽度 -->
					<image src="../../static/season1.jpg" mode="heightFix"></image>
					<image src="../../static/season2.jpg" mode="heightFix"></image>
					<image src="../../static/season3.jpg" mode="heightFix"></image>
				</view>
			</scroll-view>
			
			<home-title :title="titleTwo"/>
			<image class="franch" src="../../static/french.jpg" mode="heightFix"></image>
			
			<!-- <view class="good">
				<good-item v-for="(i, index) in 4"/>
			</view> -->
			
			<view class="back-top" v-if="isShow" @click="backTop">
				<text class="iconfont icon-fanhuidingbu"></text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {$http} from '../../utils/request.js'
	export default {
		data() {
			return {
				bannerList: [],
				titleOne: {
					textWeight: '本季',
					textLight: '推荐',
					enTitle: 'Seasonal Recommand',
					enTit: 'Seasonal'
				},
				titleTwo: {
					textWeight: '法式',
					textLight: '经典',
					enTitle: 'French Classisc',
					enTit: 'Frech'
				},
				isShow: false,
				topItem: ''
			};
		},
		onLoad() {
			// 方法一
			/* uni.request({
				url: 'https://ahb0baep.lc-cn-n1-shared.com/1.1/classes/classify',
				method: 'GET',
				header: {
					"X-LC-Id": "AHB0bAEpzE4U5xaKTaes9j4d-gzGzoHsz" ,
					"X-LC-Key": "CoHIA5BF78f3q6tp1bGOEB7Y" ,
					"Content-Type": "application/json"
				},
				success: (res) => {
					console.log(res);
				},
			}) */
			
			// 方法二
			/* $http('/1.1/classes/classify').then(res => {
				console.log(res);
			}) */
			// 方法三
			this.$get('/1.1/classes/classify').then(res => {
				console.log(res);
			})
			this.$get('/1.1/classes/banner').then(res => {
				// console.log(res);
				this.bannerList = res.results;
				// console.log(this.bannerList);
			})
		},
		methods: {
			handlerScroll(ev) {
				// console.log(ev);
				let top = ev.detail.scrollTop;
				// console.log(top);
				this.isShow = top >= 500 ? true : false;
				this.topItem = '' ;//重置id
			},
			backTop() {
				this.topItem = 'top'
			},
			goBanner(link) {
				uni.navigateTo({
					url: './banner-active/banner-active?link='+link
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: white;
	}
		
	.scroll-cont {
		height: 100vh;//必须要定制一个高度，不然滑动不会触发事件
	}
	.banner {
		margin-top: 180upx;
		height: 790upx;
		image {
			width: 100%;
			height: 790upx;
		}
	}
	
	.scroll {
		white-space: nowrap;
		
		image {
			height: 290upx;
		}
	}
	
	.franch {
		height: 380upx;
	}
	
	.good {
		flex-wrap: wrap;
		display: flex;
		
	}
	
	.back-top {
		height: 100upx;
		width: 100upx;
		background-color: #fff;
		border-radius: 50%;
		box-shadow: 0 0 10upx 4upx rgba($color: black, $alpha: 0.4);
		line-height: 100upx;
		text-align: center;
		position: fixed;
		bottom: 150upx;
		right: 20upx;
		
		text {
			font-size: 40upx;
			color: #ababab;
		}
	}
</style>
