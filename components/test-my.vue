<template>
	<view @click="handlerNum">
		测试公共组件
		{{name}}
	</view>
</template>

<script>
	export default {
		name:"test-my",
		props: ['name'],
		data() {
			return {
				
			};
		},
		methods: {
			handlerNum() {
				this.$emit('onNum', 11)
			}
		}
		
	}
</script>

<style lang="scss">

</style>
