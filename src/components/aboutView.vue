<template>
	<div class="aboutbg">
		<div class="container">
			<img src="@/assets/icon.png" alt="" width="200px">
			<div class="name">netPlayer</div>
			<div class="version">v{{ version }}&nbsp;Release</div>
			<div class="copyright">Developed by zhouc</div>
			<div class="showingit">
				<div class="gitItem" style="margin-right: 10px;" @click="openWeb('github')">Show in Github</div>
				<div class="gitItem" @click="openWeb('gitee')">Show in Gitee</div>
			</div>
			<div class="opensource" @click="showLicenses">About the licenses</div>
		</div>
	</div>
</template>

<script>
const { shell } = require('electron')
export default {
	data() {
		return {
			version: "",
		}
	},
	methods: {
		openWeb(val) {
			if (val == 'gitee') {
				shell.openExternal("https://gitee.com/Ryan-zhou/net-player")
			} else {
				shell.openExternal("https://github.com/Zhoucheng133/net-player")
			}
		},
		showLicenses() {
			const h = this.$createElement;
			this.$info({
				title: 'Licenses',
				centered: true,
				content: h('div', {}, [
					h('div', 'netPlayer (MIT License)'),
					h('hr'),
					h('div', 'API from © Subsonic AS'),
					h('div', 'Vue.js (MIT License)'),
					h('div', 'Electron (MIT License)'),
					h('div', 'Ant Design Vue (MIT License)'),
					h('div', 'axios (MIT License)'),
					h('div', 'crypto-js (MIT License)'),
				]),
				okText: "完成",
				onOk() { },
			});
		}
	},
	mounted() {

	},
	created() {
		this.version = process.env.VUE_APP_VERSION
	},
}
</script>

<style scoped>
.showingit {
	margin-bottom: 10px;
	display: flex;
}

.opensource:hover,
.gitItem:hover {
	cursor: pointer;
	color: #1890ff;
}

.opensource,
.gitItem {
	color: rgb(170, 170, 170);
	transition: all ease-in-out .3s;
}

.copyright {
	margin-top: 30px;
}

.name {
	font-size: 28px;
	font-weight: bold;
}

.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.aboutbg {
	user-select: none;
	display: flex;
	height: calc(100vh - 30px);
	width: 100%;
	justify-content: center;
	align-items: center;
}</style>