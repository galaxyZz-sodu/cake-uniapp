<template>
	<view>
		<web-view :src="webSrc"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webSrc: ''
			};
		},
		onLoad({key2, link, type}) {
			// console.log(options);
			this.webSrc = `${link}&key2=${key2}$type=${type}`
		}
	}
</script>

<style lang="scss">

</style>
