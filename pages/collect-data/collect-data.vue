<template>
	<view>
		<button type="default" @click="handlerCfy">转录分类</button>
		<button type="default" @click="handlerGood">转录商品</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			handlerCfy() {
				uni.request({
					url: 'https://h5.mcake.com/api/5e90690f0e270d04?cityId=110',
					method: 'GET',
					header: {
						"access-token": "1558fe84c6b54fb777dee538d4145886",
						"version": "v1.0"
					},
					success:(res) => {
						console.log(res);
						let {data} = res.data;
						let batchObj = {"requests": []}
						data.forEach(item => {
							batchObj.requests.push({
								"method": "POST",
								"path": "/1.1/classes/classify",
								"body": item
							})
						})
						console.log('bat', batchObj);
						this.$post('/1.1/batch',batchObj) //批量录入分类
					}
				})
			},
			
			handlerGood() {
				uni.request({
					url: 'https://h5.mcake.com/api/0434b49d1ac28f9d?cityId=110&page=2&bid=1',
					method: 'GET',
					header: {
						"access-token": "a05c8bfbfb236a98c1a50c3367ee5642",
						"version": "v1.0"
					},
					success:(res) => {
						console.log(res);
						let {list} = res.data.data;
						let batchObj = {"requests": []}
						list.forEach(item => {
							batchObj.requests.push({
								"method": "POST",
								"path": "/1.1/classes/goods",
								"body": item
							})
						})
						console.log('bat', batchObj);
						this.$post('/1.1/batch',batchObj) //批量录入分类
					}
				})
			}
		},
		
		
	}
</script>

<style lang="scss">
	button {
		
	}
</style>
