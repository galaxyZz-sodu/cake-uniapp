<template>
	<view>
		<map class="map"></map>
		
		<view class="cu-form-group margin-top">
			<view class="title">
				<text class="cuIcon-friendfill"></text>
			</view>
			<input class="text-right" placeholder="请输入姓名" v-model="info.username"></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">
				<text class="cuIcon-mobilefill"></text>
			</view>
			<input class="text-right" placeholder="请输入手机号" v-model="info.phone"></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">
				<text class="cuIcon-locationfill"></text>
			</view>
				<picker :range="regionArr" @change="handleRegion">
					<view class="picker">
						{{regionIdx == -1 ? '请选择地区' : regionArr[regionIdx]}}
					</view>
				</picker>
		</view>
		
		<view class="cu-form-group">
			<view class="title">
				<text class="cuIcon-locationfill"></text>
			</view>
			<input class="text-right" placeholder="请输入详细地址" v-model="info.detail"></input>
			<!-- <text class='cuIcon-locationfill text-orange'></text> -->
		</view>
		
		<view class="btn" @click="handleOk">
			确定
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				regionArr: [
					'东城区',
					'西城区',
					'朝阳区',
					'海淀区',
					'昌平区'
				],
				regionIdx: -1,
				info: {
					username: '',
					phone: '',
					region: '',
					detail: ''
				}
			};
		},
		computed: {
			...mapState({
				userInfo:state => state.user.userInfo
			})
		},
		methods: {
			handleRegion(event) {
				console.log(event);
				let {value} = event.detail;
				this.regionIdx = value;
			},
			
			handleOk() {
				let {regionArr, regionIdx, info} = this;
				info.city = '北京';
				info.region = regionArr[regionIdx]; //添加region
				info.isdefault = false;
				info.userid = this.userInfo.objectId
				console.log(info);
				this.$store.dispatch('address/addressAddAct', info)
			}
		}
	}
</script>

<style lang="scss" scoped>
.map {
	height: 400upx;
	width: 100%;
}
.btn {
	width: 380upx;
	height: 60upx;
	line-height: 60upx;
	text-align: center;
	background-color: brown;
	color: white;
	border-radius: 10upx;
	margin: 20upx auto;
}
</style>
