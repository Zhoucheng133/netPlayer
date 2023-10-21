<template>
	<div class="bar">
		<div class="cover">
			<img :src="shownCoverLink == '' ? '' : shownCoverLink" alt="" width="80px">
		</div>

		<div class="textArea">
			<div class="name">
				<div class="title">{{ nowPlay.nowPlayList.length == 0 ? "" : nowPlay.nowPlayList[nowPlay.index].title }}</div>
				<div class="artist">-</div>
				<div class="artist">{{ nowPlay.nowPlayList.length == 0 ? "" : nowPlay.nowPlayList[nowPlay.index].artist }}</div>
			</div>
			<div class="time">
				{{ showTime() }}
			</div>
		</div>

		<audio controls :src="songStream" ref="audioPlayer" @ended="nextSong" style="display: none;"
			@timeupdate="handleTimeUpdate" @play="handlePlay" @pause="handlePause"></audio>

		<div class="tools">
			<div class="songBack" @click="backSong"><a-icon type="step-backward" /></div>
			<div class="songToggle" @click="toggleSong">
				<a-icon type="pause" v-if="nowPlay.isPlay" />
				<a-icon type="caret-right" v-else />
			</div>
			<div class="songForward" @click="nextSong"><a-icon type="step-forward" /></div>
		</div>
		<div class="progressBarContainer" @click="jumpStream">
			<div class="progressBar" :style="{ width: (curTime / nowSongTime * 100) + '%' }"></div>
		</div>

	</div>
</template>

<script>
// import { ipcRenderer } from 'electron';
export default {
	beforeDestroy() {

	},
	props: {
		nowPlay: Object,
	},
	data() {
		return {
			shownCoverLink: "",
			songStream: "",
			audioPlayer: "",

			curTime: 0,
			nowSongTime: 0,
		}
	},
	methods: {
		jumpStream(event) {
			if (this.nowPlay.nowPlayList.length == 0) {
				return;
			}
			const element = event.currentTarget;
			const clickX = event.clientX - element.getBoundingClientRect().left;
			const elementWidth = element.offsetWidth;
			const clickPercentage = clickX / elementWidth;

			var jumpTime = parseInt(this.nowSongTime * clickPercentage);
			this.$refs.audioPlayer.currentTime = jumpTime;
		},
		handlePause() {
			this.$emit("handlePause");
		},
		handlePlay() {
			this.$emit("isPlaying");
		},
		showTime() {
			if (isNaN(parseInt(this.nowSongTime / 60))) {
				return "/";
			}
			var realCurTime = (parseInt(this.curTime / 60) < 10 ? '0' + parseInt(this.curTime / 60) : parseInt(this.curTime / 60)) + ":" + (parseInt(this.curTime % 60) < 10 ? '0' + parseInt(this.curTime % 60) : parseInt(this.curTime % 60));
			var realSongTime = (parseInt(this.nowSongTime / 60) < 10 ? '0' + parseInt(this.nowSongTime / 60) : parseInt(this.nowSongTime / 60)) + ":" + (parseInt(this.nowSongTime % 60) < 10 ? '0' + parseInt(this.nowSongTime % 60) : parseInt(this.nowSongTime % 60));
			return realCurTime + "/" + realSongTime;
		},
		handleTimeUpdate() {
			this.curTime = this.audioPlayer.currentTime;
			this.nowSongTime = this.audioPlayer.duration;
		},
		pauseSongController() {
			this.$nextTick(() => {
				this.audioPlayer.pause();
			});
		},
		playSongController() {
			this.$nextTick(() => {
				this.audioPlayer.play();
			});
		},
		toggleSong() {
			if (this.nowPlay.nowPlayList.length == 0) {
				this.$message.error("播放列表为空!");
				return;
			}
			this.$emit("toggleSong");
		},
		backSong() {
			if (this.nowPlay.nowPlayList.length == 0) {
				this.$message.error("播放列表为空!");
				return;
			}
			this.$emit("backSong");
		},
		nextSong() {
			if (this.nowPlay.nowPlayList.length == 0) {
				this.$message.error("播放列表为空!");
				return;
			}
			this.$emit("nextSong");
		},
		getSongStream() {
			var username = localStorage.getItem("username");
			var salt = localStorage.getItem("salt");
			var token = localStorage.getItem("token");
			var url = localStorage.getItem("url");

			this.songStream = url + "/rest/stream?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token + "&id=" + this.nowPlay.nowPlayList[this.nowPlay.index].id;
		},
		getSongCover() {
			var username = localStorage.getItem("username");
			var salt = localStorage.getItem("salt");
			var token = localStorage.getItem("token");
			var url = localStorage.getItem("url");
			this.shownCoverLink = url + "/rest/getCoverArt?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token + "&id=" + this.nowPlay.nowPlayList[this.nowPlay.index].id;
		},
		stopAudio() {
			console.log("停止播放器");
			this.audioPlayer.pause();
			this.audioPlayer.curTime = 0;
			this.audioPlayer.src = "";
			var username = localStorage.getItem("username");
			var salt = localStorage.getItem("salt");
			var token = localStorage.getItem("token");
			var url = localStorage.getItem("url");
			this.shownCoverLink = url + "/rest/getCoverArt?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token;
		},
		playSong() {
			this.$nextTick(() => {
				this.getSongCover();
				this.getSongStream();
				this.$refs.audioPlayer.src = this.songStream;
				this.$nextTick(() => {
					this.audioPlayer.play();
				});
				this.$emit("isPlaying");
			})
		},
		loadSong() {
			this.$nextTick(() => {
				this.getSongCover();
				this.getSongStream();
				this.$refs.audioPlayer.src = this.songStream;
			})
		}
	},
	mounted() {
		this.audioPlayer = this.$refs.audioPlayer;
		if (this.nowPlay.nowPlayList.length != 0) {
			this.getSongCover();
			this.getSongStream();
		}
	},
	created() {
		var username = localStorage.getItem("username");
		var salt = localStorage.getItem("salt");
		var token = localStorage.getItem("token");
		var url = localStorage.getItem("url");
		this.shownCoverLink = url + "/rest/getCoverArt?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token;
	},
	watch: {

	},
}
</script>

<style scoped>
.textArea {
	text-align: left;
	padding-left: 20px;
}

.time {
	user-select: none;
	margin-right: 10px;
	color: grey;
	font-size: 13px;
}

.progressBarContainer:hover {
	cursor: pointer;
}

.progressBarContainer:hover .progressBar {
	height: 10px;
	cursor: pointer;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}

.progressBarContainer {
	margin-left: -10px;
	position: absolute;
	width: 100%;
	bottom: 0px;
}

/* .progressBar:hover{
    height: 10px;
    cursor: pointer;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
} */
.progressBar {
	height: 3px;
	background-color: #1890ff;
	border: 1px solid #1890ff;
	/* margin-left: -10px; */
	border-top-right-radius: 1.5px;
	border-bottom-right-radius: 1.5px;
	transition: all ease-in-out .2s;
}

.songToggle {
	font-size: 26px;
	margin-right: 15px;
	margin-left: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 40px;
	transition: all ease-in-out .2s;
}

.songBack:hover,
.songForward:hover,
.songToggle:hover {
	background-color: rgb(220, 220, 220);
	cursor: pointer;
}

.songBack,
.songForward {
	font-size: 20px;
	border-radius: 40px;
	width: 35px;
	height: 35px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all ease-in-out .2s;
}

.tools {
	user-select: none;
	display: flex;
	margin-left: auto;
	align-items: center;
	margin-right: 30px;
}

.artist {
	margin-left: 5px;
	font-size: 15px;
	text-align: left;
	color: grey;
}

.title {
	font-size: 18px;
	font-weight: bold;
	text-align: left;
	max-width: 250px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.name {
	display: flex;
	font-size: 18px;
	align-items: center;
}

.cover {
	width: 80px;
	height: 80px;
	border-radius: 10px;
	overflow: hidden;
	/* background-color: white; */
}

.bar {
	position: absolute;
	display: flex;
	align-items: center;
	padding-left: 10px;
	padding-bottom: 5px;
	height: 100px;
	background-color: rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(15px);
	/* width: 100vw; */
	width: calc(100vw - 240px - 40px);
	border-radius: 10px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
	/* border: 1px solid; */
	overflow: hidden;
}</style>