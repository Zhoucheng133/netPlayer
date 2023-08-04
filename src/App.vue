<template>
	<div id="app">
		<div class="dragArea"></div>
		<mainView v-if="isLogin==true" />
		<loginView v-else-if="isLogin==false" @getLogin="getLogin" />
	</div>
</template>

<script>
import _mainView from '@/components/_mainView.vue';
import loginView from '@/components/loginView.vue';

const {ipcRenderer} = require('electron')

export default {
	beforeDestroy() {
        ipcRenderer.removeAllListeners('autoLoginResult');
    },
	components: {
		mainView: _mainView,
		loginView,
	},
	data() {
		return {
			isLogin: undefined,
		}
	},
	methods: {
		getLogin(val){
			this.isLogin=val;
		},
		autoLoginResult(event, response){
            if(response==null){
                this.$message.error('请求失败，请检查服务器状态');
				localStorage.clear();
				this.isLogin=false;
                return;
            }
            var status=response['subsonic-response'].status;
            if(status=='ok'){
                this.isLogin=true
            }else{
                this.$message.error('用户名或者密码错误, 需要重新登录!');
				localStorage.clear();
				this.isLogin=false;
                return;
            }
        },
	},
	mounted() {
		ipcRenderer.removeAllListeners('autoLoginResult');

		ipcRenderer.on('autoLoginResult', this.autoLoginResult);
	},
	created() {
		var username=localStorage.getItem("username");
        var salt=localStorage.getItem("salt");
        var token=localStorage.getItem("token");
        var url=localStorage.getItem("url");
        if(token!=null && username!=null && salt!=null && url!=null){
            ipcRenderer.send('autoLoginRequest', url, username, salt, token);
        }else{
			this.isLogin=false;
		}
	},
}
</script>

<style scoped>
.dragArea{
	position: fixed;
	top: 0;
	left: 0;
	height: 30px;
	width: 100%;
	-webkit-app-region: drag;
}
</style>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0;
}

body{
	margin: 0;
}
</style>
