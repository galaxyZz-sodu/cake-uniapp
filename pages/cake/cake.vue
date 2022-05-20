<template>
	<view>
		<nav-custom/>
		
		<view class="cont">
			<good-item v-for="(item, index) in goodList" :good="item" :key="index"/>
		</view>
		
		<view class="button-nav">
			<view class="nav-btn" :class="{active: item.name == bottomName}" v-for="(item, index) in tabArr" :key="index" @click="changeData(item)">
				{{item.name}} <text class="cartNum" v-if="index == 4&&carNum != 0">{{carNum}}</text>
			</view>
		</view>
		
		<u-popup :show="show" mode="left"  @close="handlerClose" >
			<view class="pop-cont">
				<view class="left-list" v-for="(item,index) in cfylist" :key="index" @click="handlerClass(item, index)">
					{{item.bname}} <text class="classNum">{{lenArr[index]}}</text>
					<view v-if="index===0">
						
						<view class="cake-inner-one" @click="listShow = !listShow">
							口味筛选
						</view>
						<!-- {{num}} -->
						<u-cell-group v-if="listShow">
							<u-cell icon="setting-fill" :title="j.tname" isLink v-for="(j, index2) in item.list" @click="handlerList(j)"></u-cell>
						</u-cell-group>
						
						<view class="cake-inner-two" @click="senceShow = !senceShow">
							场景筛选
						</view>
					
						<u-cell-group v-if="senceShow" style="margin-top: 25upx;">
							<u-cell icon="setting-fill" :title="j.tname" isLink v-for="(j, index3) in item.scene" @click="handlerscene(j)"></u-cell>
						</u-cell-group>
						
					</view>
				</view>
			</view>
		</u-popup>
		
		<view class="noProduct" v-if="noProduct">
			暂时没有更多商品....
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodList: [],
				page: 0,
				tabArr: [
					{name: '分类', bcid: '', target: ''},
					{name: '蛋糕', bcid: '1', target: '/pages/cake/cake'},
					{name: '面包', bcid: '11', target: '/pages/bread/bread'},
					{name: '小食', bcid: '6', target: '/pages/food/food'},
					{name: '购物车', bcid: '', target: '/pages/cart/cart'}
				],
				// bcid: '1',
				bottomName: '蛋糕',
				show: false,
				cfylist: [],
				listShow: false,
				senceShow: false,
				noProduct: false,
				index: 0,
				cakeShow: false,
				cakeLen: 0,
				breadLen: 0,
				foodLen: 0
			};
		},
		computed: {
			num() {
				return this.$store.state.count.num
			},
			condition() {
				return this.$store.state.condiction.cond
			},
			// lenArr: [this.cakeLen, this.breadLen, this.foodLen]
			lenArr() {
				return [this.cakeLen, this.breadLen, this.foodLen, 0]
			},
			carNum() {
				return this.$store.state.cart.cartList.length
			}
		},
		onLoad() {
			this.loadData();
			
			this.$get('/1.1/classes/classify').then(res => {
				// console.log(res);
				this.cfylist = res.results;
				console.log('分类',this.cfylist);
			})
		},
		onReachBottom() { //自动监听触底操作
			this.loadData();
		},
		onPullDownRefresh() { //上拉将页面刷新，所有数据清空，重新请求
			this.reLoadData();
		},
		methods: {
			goDetail(index) {
				// console.log(index);
				uni.navigateTo({
					url: '../detail/detail?idx='+index
				})
			},
			
			loadData() {
				// console.log('触底');
				let skip = this.page * 8;
				let wh = JSON.stringify(this.condition)
				let url = `/1.1/classes/goods?where=${wh}&limit=8&&skip=${skip}`//limit每次加载8条 skip跳过前面几项
				this.$get(url).then(res => {
					// console.log(res);
					uni.stopPullDownRefresh(); //将上拉滚动动画关闭
					let result = res.results;
					console.log(result);
					if (result.length) { 
						this.page++;
						this.goodList = [
							...this.goodList,
							...res.results
						]
						return
					} else {
						this.noProduct = true
					}
					
					uni.showToast({
						title: '到头了',
						icon: 'none'
					})
				})
				
				// 以下获取各类商品总长度，供侧边栏用
				let cakeUrl = '/1.1/classes/goods?where={"bcid":1}'
				let breadUrl = '/1.1/classes/goods?where={"bcid":11}'
				let foodUrl = '/1.1/classes/goods?where={"bcid":6}'
				
				this.$get(cakeUrl).then(res => {
					// console.log('蛋糕', res.results);
					this.cakeLen = res.results.length
					console.log();
				})
				
				this.$get(breadUrl).then(res => {
					// console.log('蛋糕', res.results);
					this.breadLen = res.results.length
				})
				
				this.$get(foodUrl).then(res => {
					// console.log('蛋糕', res.results);
					this.foodLen = res.results.length
				})
			},
			
			reLoadData() {
				this.goodList = [];
				this.page = 0;
				this.noProduct = false;
				this.loadData();
			},
			
			changeData(item) {
				let {bcid, target} = item;
				this.bottomName = item.name;
				if (bcid) { //商品列表数据更新
					this.goodList = [];
					this.page = 0;
					// this.condition.bcid = Number(bcid);
					this.$store.commit('changeCondition', {
						bcid: Number(bcid),
					})
					this.loadData();
				}
				if (!bcid&&!target) {
					this.show = true;
				}
				if (!bcid&&target) {
					uni.navigateTo({
						url: target
					})
				}
			},
			handlerClose() {
				this.show = false;
			},
			
			handlerList({bid, tid}) { //口味筛选
				this.$store.commit('changeCondition', {
					bcid: bid,
					fid: tid
				});
				this.reLoadData();
				
			},
			
			handlerscene({bid, tid}) {
				this.$store.commit('changeCondition', {
					bcid: bid,
					sid: tid
				});
				this.reLoadData()
			},
			
			handlerClass({bid}, index) {
				if (index != 0) {
					this.$store.commit('changeCondition', {
						bcid: bid
					});
					this.reLoadData()
				} 
				return
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background-color: white;
}
.cont {
	margin: 150upx 0;
	display: flex;
	flex-wrap: wrap;
	padding: 15upx;
	justify-content: space-between;
} 

.button-nav {
	background-color: white;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	display: flex;
	height: 90upx;
	align-items: center;
	box-shadow: 0 0 2upx rgba($color: black, $alpha: 0.4);
	.cartNum {
		padding: 10upx;
		background-color: #ffe32a;
		color: black;
		font-size: 15upx;
		border-radius: 20upx;
	}
}
.nav-btn {
	flex: 1;
	text-align: center;
	border-left: 1px solid #ababab;
	color: #ababab;
}
.nav-btn:nth-child(1) {
	border-left: none;
}
.active {
	color: gold;
}

.pop-cont {
	margin-top: 80upx;
	.classNum {
		padding: 10upx;
		background-color: #ffe32a;
		font-size: 15upx;
		border-radius: 20upx;
	}
	.left-list {
		width: 350upx;
		padding: 25upx 20upx;
		
		border-bottom: 1px solid #ababab;
		.cake-inner-one {
			margin-top: 25upx;
			padding: 25upx 0;
			border-top: 1px solid #ababab;
		}
		.cake-inner-two {
			border-top: 1px solid #ababab;
			padding-top: 25upx;
		}
	}
	u-cell {
		border-bottom: none;
	}
}

	.noProduct {
		// margin: 20upx auto;
		margin-top: 300upx;
		font-size: 40upx;
		// background-color: red;
		text-align: center;
		color: #ababab;
	}

</style>
