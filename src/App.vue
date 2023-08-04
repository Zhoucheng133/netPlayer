<template>
	<div id="app">
		<div class="dragArea"></div>
		<mainView v-if="isLogin" />
		<loginView v-else />
	</div>
</template>

<script>
import _mainView from '@/components/_mainView.vue';
import loginView from '@/components/loginView.vue';
export default {
	components: {
		mainView: _mainView,
		loginView,
	},
	data() {
		return {
			isLogin: false,
		}
	},
	methods: {
		
	},
	mounted() {
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
