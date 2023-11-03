<template>
	<div id="app">
		<div class="dragArea">
			<div class="darg"></div>
			<div class="min" v-if="shownWindowBar" @click="minWin"><svg width="13" height="13" viewBox="0 0 48 48" fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M10.5 24L38.5 24" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
				</svg></div>
			<div class="max" v-if="shownWindowBar" @click="maxWin">
				<svg v-if="isMax == false" width="13" height="13" viewBox="0 0 48 48" fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M22 42H6V26" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M26 6H42V22" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
				<svg v-else width="13" height="13" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M44 20H28V4" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M4 28H20V44" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</div>
			<div class="close" v-if="shownWindowBar" @click="closeWin">
				<svg width="13" height="13" viewBox="0 0 48 48"
					fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8 8L40 40" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M8 40L40 8" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</div>
		</div>
		<mainView v-if="isLogin == true" @logoutApp="logoutApp" ref="mainView" />
		<loginView v-else-if="isLogin == false" @getLogin="getLogin" />
	</div>
</template>

<script>
import _mainView from '@/components/_mainView.vue';
import loginView from '@/components/loginView.vue';

const { ipcRenderer } = require('electron')

const axios=require("axios");

export default {
	beforeDestroy() {
		ipcRenderer.removeAllListeners('toAbout');

		ipcRenderer.removeAllListeners('nextSong');
		ipcRenderer.removeAllListeners('forwSong');
		ipcRenderer.removeAllListeners('toggleSong');

		ipcRenderer.removeAllListeners('getSysResult');
	},
	components: {
		mainView: _mainView,
		loginView,
	},
	data() {
		return {
			shownWindowBar: false,

			isLogin: undefined,

			isMax: false,
		}
	},
	methods: {
		closeWin() {
			ipcRenderer.send('winClose');
		},
		maxWin() {
			if (this.isMax == false) {
				ipcRenderer.send('winMax');
				this.isMax = true;
			} else {
				ipcRenderer.send('winRestore');
				this.isMax = false;
			}
		},
		minWin() {
			ipcRenderer.send('winMin');
		},
		getSysResult(event, resp) {
			if (resp != 'macOS') {
				this.shownWindowBar = true;
			}
		},
		logoutApp() {
			localStorage.clear();
			this.isLogin = false;
		},
		getLogin(val) {
			this.isLogin = val;
		},
		async autoLogin(url, username, salt, token) {
			var resp=undefined;
			const request=new Promise((resolve)=>{
				axios.post(url+"/rest/ping.view?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token)
				.then((response)=>{
					resp=response.data;
					resolve(resp);
				})
				.catch(()=>{
					resp=null;
					resolve(resp);
				})
			})
			const timeout=new Promise((resolve)=>{
				setTimeout(() => {
					resp=null;
					resolve(resp);
				}, 5000);
			})

			var response=null;

			await Promise.race([request, timeout]).then((value) => {
				response=value;
			});

			if (response == null) {
				this.$message.error('请求失败，请检查服务器状态');
				localStorage.clear();
				this.isLogin = false;
				return;
			}
			var status = response['subsonic-response'].status;
			if (status == 'ok') {
				this.isLogin = true
			} else {
				this.$message.error('用户名或者密码错误, 需要重新登录!');
				localStorage.clear();
				this.isLogin = false;
				return;
			}
		},
	},
	mounted() {
		ipcRenderer.removeAllListeners('toAbout');
		ipcRenderer.removeAllListeners('nextSong');
		ipcRenderer.removeAllListeners('forwSong');
		ipcRenderer.removeAllListeners('toggleSong');
		ipcRenderer.removeAllListeners('getSysResult');

		ipcRenderer.on('toAbout', () => {
			this.$refs.mainView.toPage('about');
		});
		ipcRenderer.on('nextSong', () => {
			this.$refs.mainView.nextSong();
		});
		ipcRenderer.on('forwSong', () => {
			this.$refs.mainView.backSong();
		});
		ipcRenderer.on('toggleSong', () => {
			this.$refs.mainView.toggleSong();
		});
		ipcRenderer.on('getSysResult', this.getSysResult);
	},
	created() {
		var username = localStorage.getItem("username");
		var salt = localStorage.getItem("salt");
		var token = localStorage.getItem("token");
		var url = localStorage.getItem("url");
		if (token != null && username != null && salt != null && url != null) {
			// 自动登录
			this.autoLogin(url, username, salt, token);
		} else {
			this.isLogin = false;
		}
		ipcRenderer.send('getSysRequest');
	},
}
</script>

<style scoped>
#app {
	overflow: hidden;
}

.darg {
	-webkit-app-region: drag;
	width: 100%;
}

.close:hover {
	background-color: rgb(215, 0, 0);
	cursor: pointer;
}

.close {
	background-color: red;
}

.min:hover,
.max:hover {
	background-color: rgb(220, 220, 220);
	cursor: pointer;
}

.close,
.min,
.max {
	user-select: none;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30px;
	transition: all ease-in-out .2s;
	z-index: 500;
}

.dragArea {
	justify-content: flex-end;
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	height: 30px;
	width: 100%;
	/* -webkit-app-region: drag; */
}</style>

<style>#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0;
	height: 100vh;
	width: 100vw;
	background-color: white;
}

body {
	margin: 0;
}</style>
