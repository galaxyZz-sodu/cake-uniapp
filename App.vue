<script>
	export default {
		onLaunch: function() {
			// 尝试提取本地存储信息
			try {
				const value = uni.getStorageSync('userInfo');
				if (value) {
					console.log(value);
					this.$store.commit('user/initInfo', value)
					this.$store.dispatch('address/addressInitAct', value.objectId)
				}
			} catch (e) {
				console.log('提取用户信息失败', );
			}
		},
		/* onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		} */
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	
	@import '/colorui/main.css';
	@import '/colorui/icon.css';
	@import '/static/css/iconfont.css';
</style>
