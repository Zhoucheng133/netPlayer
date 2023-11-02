<template>
	<div class="bg" :style="{ 'opacity': bgOpacity }">
		<sideBar class="sideBar_style" 
			@logoutMain="logoutMain" 
			@toPage="toPage" 
			@toPlayList="toPlayList"
			@getSongList="getSongList" 
			:nowPage="nowPage" 
			:playList="playList" 
			:nowPlay="nowPlay" />

		<playBar 
			class="playbar" 
			ref="player" 
			:nowPlay="nowPlay" 
			:random="random"
			@nextSong="nextSong" 
			@backSong="backSong"
			@toggleSong="toggleSong" 
			@isPlaying="isPlaying" 
			@changePlayMode="changePlayMode"
			@handlePause="handlePause" />

		<!-- 主要内容在下面 -->
		<div class="mainSide">
			<aboutView v-show="nowPage == 'about'" />
			
			<albumView v-show="nowPage == 'albums'"/>
			<artistView v-show="nowPage == 'artists'"/>
			<allSongsView v-show="nowPage == 'allSongs'"
				ref="allSongsRef"
				@playSong="playSong"
				@loveSong="loveSong"
				@deloveSong="deloveSong"
				@addToSongList="addToSongList" 
				@updateNowPlay="updateNowPlay"
				@reloadLoved="reloadLoved" 
				:songList="songList"
				:nowPage="nowPage" 
				:nowPlay="nowPlay"
				:lovedSongs="lovedSongs"
				:userInfo="userInfo"/>
			<lovedSongsView v-show="nowPage == 'lovedSongs'"/>
			<searchView v-show="nowPage == 'search'"/>
			<playListView 
				v-show="nowPage == 'playList'"
				:playList="playList"/>
		</div>
	</div>
</template>

<script>
import sideBar from './sideBar.vue';
import aboutView from './aboutView.vue';
// import listView from './listView.vue';
import playBar from './playBar.vue';

import albumView from './views/albumView.vue';
import artistView from './views/artistView.vue';
import allSongsView from './views/allSongsView.vue';
import lovedSongsView from './views/lovedSongsView.vue';
import searchView from './views/searchView.vue';
import playListView from './views/playListView.vue'

var axios=require("axios");

export default {
	beforeDestroy() {
		window.removeEventListener('keydown', this.handleKeyDown);
	},
	components: {
		sideBar,
		aboutView,
		// listView,
		playBar,
		albumView,
		artistView,
		allSongsView,
		lovedSongsView,
		searchView,
		playListView
	},
	data() {
		return {
			bgOpacity: 0,

			nowPage: '',
			playList: {},

			nowPlay: {
				listName: "",
				index: 0,
				nowPlayList: [],
				id: "",
				isPlay: false,
			},

			random: false,

			songList: [],

			userInfo: {},
			lovedSongs: [],
		}
	},
	methods: {
		updateNowPlay(item){
			this.nowPlay=item;
		},
		reloadLoved(){
			// console.log("重新加载喜欢的歌曲");
			axios.post(this.userInfo.url+"/rest/getStarred?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token)
			.then((response)=>{
				this.lovedSongs=response.data['subsonic-response']['starred']['song'];
			})
			.catch(()=>{
				this.$message.error("刷新喜欢的歌曲失败!");
			})
		},
		loveSong(item){
			// console.log("喜欢歌曲"+item);
			const id=item.id;
			axios.get(this.userInfo.url+"/rest/star?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&id="+id).then((response)=>{
				const resp=response.data['subsonic-response'];
				if (resp.status == "ok") {
					this.$message.success("操作成功");
					this.reloadLoved();
				} else {
					this.$message.error("操作失败");
				}
			}).catch(()=>{
				this.$message.error("操作失败");
			})
		},
		deloveSong(item){
			// console.log("不喜欢歌曲"+item);
			const id=item.id;
			axios.get(this.userInfo.url+"/rest/unstar?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&id="+id).then((response)=>{
				const resp=response.data['subsonic-response'];
				if (resp.status == "ok") {
					this.$message.success("操作成功");
					this.reloadLoved();
				} else {
					this.$message.error("操作失败");
				}
			}).catch(()=>{
				this.$message.error("操作失败");
			})
		},
		addToSongList(songId, listId){
			console.log(songId+" "+listId);
			// TODO 添加到歌单
			this.$refs.allSongsRef.handleClose();
		},
		changePlayMode(){
			this.random=!this.random;
		},
		getSongList(val) {
			this.songList = val;
		},
		stopAudio() {
			this.$refs.player.stopAudio();
			this.nowPlay = {
				listName: "",
				index: 0,
				nowPlayList: [],
				id: "",
				isPlay: false,
			};
		},
		handlePause() {
			this.nowPlay.isPlay = false;
		},
		saveNowPlay() {
			localStorage.setItem("nowPlay", JSON.stringify(this.nowPlay));
		},
		handleKeyDown(event) {
			if (event.key === ' ' && event.target.tagName !== "INPUT") {
				event.preventDefault(); // 阻止默认的滚动行为
				if (this.nowPlay.nowPlayList.length == 0) {
					this.$message.error("播放列表为空!");
					return;
				}
				this.toggleSong();
			}
		},
		isPlaying() {
			this.nowPlay.isPlay = true;
		},
		toggleSong() {
			if (this.nowPlay.isPlay == false) {
				this.$refs.player.playSongController();
			} else {
				this.$refs.player.pauseSongController();
			}
			this.nowPlay.isPlay = !this.nowPlay.isPlay;
			var that=this;
			this.$nextTick(()=>{
				that.$refs.player.setMedia();
			});
		},
		backSong() {
			this.nowPlay.index = (this.nowPlay.index - 1 + this.nowPlay.nowPlayList.length) % this.nowPlay.nowPlayList.length;
			this.$refs.player.playSong();
			this.nowPlay.isPlay = true;
			this.saveNowPlay();
			var that=this;
			this.$nextTick(()=>{
				that.$refs.player.setMedia();
			});
		},
		nextSong() {
			if(!this.random){
				this.nowPlay.index = (this.nowPlay.index + 1 + this.nowPlay.nowPlayList.length) % this.nowPlay.nowPlayList.length;
			}else{
				this.nowPlay.index = Math.floor(Math.random() * this.nowPlay.nowPlayList.length);
			}
			this.$refs.player.playSong();
			this.nowPlay.isPlay = true;
			this.saveNowPlay();
			var that=this;
			this.$nextTick(()=>{
				that.$refs.player.setMedia();
			});
		},
		playSong(nowPlay) {
			this.nowPlay = nowPlay;
			this.$refs.player.playSong();
			console.log(this.nowPlay);
			this.saveNowPlay();
			var that=this;
			this.$nextTick(()=>{
				that.$refs.player.setMedia();
			});
		},
		toPlayList(item) {
			this.nowPage = 'playList';
			this.playList = item;
		},
		toPage(pageName) {
			this.nowPage = pageName;
		},
		logoutMain() {
			this.bgOpacity = 0;
			setTimeout(() => {
				this.$emit("logoutApp")
			}, 300);
		},
		startAnimation() {
			const duration = 300;
			const interval = 10;
			const steps = duration / interval;
			let step = 0;
			const increment = 1 / steps;
			const animateOpacity = setInterval(() => {
				step++;
				this.bgOpacity += increment;

				if (step >= steps) {
					clearInterval(animateOpacity);
				}
			}, interval);
		}
	},
	mounted() {
		this.startAnimation();
		if (localStorage.getItem("nowPage") != null) {
			this.nowPage = localStorage.getItem("nowPage");
			if (this.nowPage == 'playList') {
				this.playList = JSON.parse(localStorage.getItem("playList"));
			}
		} else {
			this.nowPage = "allSongs"
		}
		window.addEventListener('keydown', this.handleKeyDown);

		if (localStorage.getItem('nowPlay') != null) {
			var tmp = JSON.parse(localStorage.getItem('nowPlay'));
			if (tmp.listName != 'allSongs') {
				this.nowPlay = tmp;
				this.nowPlay.isPlay = false;
				this.$nextTick(() => {
					this.$refs.player.loadSong();
				})
			}

		}
	},
	created() {
		this.userInfo={
			url: localStorage.getItem("url"),
			username: localStorage.getItem("username"),
			salt: localStorage.getItem("salt"),
			token: localStorage.getItem("token"),
		};
		axios.post(this.userInfo.url+"/rest/getStarred?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token)
		.then((response)=>{
			this.lovedSongs=response.data['subsonic-response']['starred']['song'];
		})
		.catch(()=>{
			this.$message.error("获取喜欢的歌曲失败!");
		})
	},
	watch: {
		nowPage: function (newVal, oldVal) {
			if (oldVal == 'about') {
				var that = this;
				this.$nextTick(() => {
					that.$refs.listPart.pageTurn();
				})
				return;
			}
			if (newVal != 'about') {
				localStorage.setItem("nowPage", newVal);
			}
		}
	},
}
</script>

<style scoped>
.playbar {
	position: fixed;
	bottom: 0;
	margin-left: 240px;
	margin-bottom: 10px;
	z-index: 100;
}

.mainSide {
	padding-left: 200px;
	padding-top: 30px;
}

.sideBar_style {
	position: fixed;
	top: 0;
}

.bg {
	height: 100vh;
	width: 100vw;
	background-color: white;
	transition: all ease-in-out .3s;
}
</style>