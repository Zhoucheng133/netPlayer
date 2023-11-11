<template>
  <div class="bar">
    <div class="cover">
      <img :src="shownCoverLink == '' ? '' : shownCoverLink" alt="" width="80px">
    </div>

    <div class="textArea">
      <div class="infoArea">
        <div class="name">
          <div class="title">{{ nowPlay.nowPlayList.length == 0 ? " " : nowPlay.nowPlayList[nowPlay.index].title }}</div>
          <div class="artist">-</div>
          <div class="artist">{{ nowPlay.nowPlayList.length == 0 ? " " : nowPlay.nowPlayList[nowPlay.index].artist }}
          </div>
        </div>
        <div class="time">
          {{ showTime() }}
        </div>
      </div>
      <a-slider class="slider" :tip-formatter="null" :disabled="disableSlider" :value="timeValue" :max="nowSongTime"
        @change="jumpStream"></a-slider>
    </div>

    <audio controls :src="songStream" ref="audioPlayer" @ended="nextSong" style="display: none;"
      @timeupdate="handleTimeUpdate" @play="handlePlay" @pause="handlePause"></audio>

    <div class="tools">
      <div class="playMode" @click="changePlayMode">
        <!-- <i class="bi bi-shuffle" v-if="random"></i> -->
        <!-- <i class="bi bi-repeat" v-else></i> -->
        <!-- <svg v-if="random" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 33L44 37L40 41" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M40 7L44 11L40 15" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M44 11H37C29.8203 11 24 16.8203 24 24C24 31.1797 29.8203 37 37 37H44" stroke="#000000" stroke-width="4"
            stroke-linecap="round" />
          <path d="M4 37H11C18.1797 37 24 31.1797 24 24C24 16.8203 18.1797 11 11 11H4" stroke="#000000" stroke-width="4"
            stroke-linecap="round" />
        </svg> -->
        <svg v-if="random" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 42H42V30" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 18V6H30" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 6L6 42" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M31.5 31.5L34 34L39 39L41.5 41.5L42 42M24 24L6 6L24 24Z" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <svg v-else width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 25C4 18.3502 9.39624 13 16 13H44" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 7L44 13L38 19" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 23C44 29.6498 38.6038 35 32 35H4" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 41L4 35L10 29" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="songBack" @click="backSong"><a-icon type="step-backward" /></div>
      <div class="songToggle" @click="toggleSong">
        <a-icon type="pause" v-if="nowPlay.isPlay" />
        <a-icon type="caret-right" v-else />
      </div>
      <div class="songForward" @click="nextSong"><a-icon type="step-forward" /></div>
    </div>
    <!-- <div class="progressBarContainer" @click="jumpStream">
			<div class="progressBar" :style="{ width: (curTime / nowSongTime * 100) + '%' }"></div>
		</div> -->

  </div>
</template>

<script>
// import { ipcRenderer } from 'electron';
export default {
  beforeDestroy() {

  },
  props: {
    nowPlay: Object,
    random: Boolean,
    fRandom: Boolean
  },
  data() {
    return {
      shownCoverLink: "",
      songStream: "",
      audioPlayer: "",

      disableSlider: true,

      curTime: 0,
      nowSongTime: 0,
      timeValue: 0,
      sliderStep: 0.3,

      sliderTimeout: null,
    }
  },
  methods: {
    changePlayMode() {
      if(this.fRandom){
        return;
      }
      this.$emit("changePlayMode");
    },
    jumpStream(value) {
      if (this.nowPlay.nowPlayList.length == 0) {
        return;
      }

      this.pauseSongController();
      this.$refs.audioPlayer.currentTime = value;

      if (this.sliderTimeout) {
        clearTimeout(this.sliderTimeout);
      }

      this.sliderTimeout = setTimeout(() => {
        // console.log("执行跳转");
        this.playSongController();
      }, 200);
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
      if (this.nowSongTime != 0) {
        this.disableSlider = false;
      }
      this.timeValue = parseInt(this.curTime);
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
    },
    setMedia() {
      var username = localStorage.getItem("username");
      var salt = localStorage.getItem("salt");
      var token = localStorage.getItem("token");
      var url = localStorage.getItem("url");

      var that = this;

      console.log("==update==");

      navigator.mediaSession.metadata = new MediaMetadata({
        title: that.nowPlay.nowPlayList[that.nowPlay.index].title,
        artist: that.nowPlay.nowPlayList[that.nowPlay.index].artist,
        album: '',
        artwork: [
          {
            src: url + "/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u=" + username + "&t=" + token + "&s=" + salt + "&id=" + that.nowPlay.nowPlayList[that.nowPlay.index].id + "&size=512",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler('play', function () {
        that.toggleSong();
      });

      navigator.mediaSession.setActionHandler('pause', function () {
        that.toggleSong();
      });

      navigator.mediaSession.setActionHandler('previoustrack', function () {
        that.backSong();
      });

      navigator.mediaSession.setActionHandler('nexttrack', function () {
        that.nextSong();
      });
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

<style>
.ant-slider-handle {
  border: solid 2px #91d5ff !important;
}

.ant-slider-handle:focus,
.ant-slider-handle:active {
  box-shadow: none !important;
  border: solid 2px #91d5ff !important;
}
</style>

<style scoped>
.infoArea {
  /* background-color: red; */
  height: 46px;
}

.playMode:hover {
  cursor: pointer;
}

.playMode {
  margin-right: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.slider {
  margin-top: 3px;
  margin-bottom: 5px;
}

.textArea {
  /* padding-top: 5px; */
  text-align: left;
  margin-left: 20px;
  margin-right: 10px;
  /* background-color: red; */
  /* width: calc(100vw - 240px - 40px - 10px - 80px - ); */
  /* width: 100%; */
}

.time {
  user-select: none;
  margin-right: 10px;
  color: grey;
  font-size: 13px;
  margin-top: 2px;
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
  /* display: flex; */
  display: grid;
  grid-template-columns: 80px auto 206px;
  align-items: center;
  padding-left: 10px;
  /* padding-bottom: 5px; */
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