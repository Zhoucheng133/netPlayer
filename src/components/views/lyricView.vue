<template>
  <div class="bg">
    <div class="closeIcon" @click="hideLyric">
      <!-- <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 19L24 31L12 19H36Z" fill="#333" stroke="#333" stroke-width="4" stroke-linejoin="round"/></svg> -->
      <i class="bi bi-arrow-down-short"></i>
    </div>
    <div class="leftSide">
      <div class="leftInfo">
        <img :src="shownCoverLink == '' ? '' : shownCoverLink" alt="" height="200px" draggable="false">
        <div class="title">{{ nowPlay.nowPlayList.length == 0 ? " " : nowPlay.nowPlayList[nowPlay.index].title }}</div>
        <div class="artist">{{ nowPlay.nowPlayList.length == 0 ? " " : nowPlay.nowPlayList[nowPlay.index].artist }}</div>
        <div class="funcs">
          <div class="lovedSign" @click="starController">
            <div class="sign" v-if="!isLoved()">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="sign" v-else>
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="#ff0000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </div>
          </div>
          <div class="playMode" @click="changePlayMode">
            <svg class="modeDisabled" v-if="fRandom" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 42H42V30" stroke="#c3c3c3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 18V6H30" stroke="#c3c3c3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 6L6 42" stroke="#c3c3c3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M31.5 31.5L34 34L39 39L41.5 41.5L42 42M24 24L6 6L24 24Z" stroke="#c3c3c3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <svg class="mode" v-else-if="random" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 42H42V30" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 18V6H30" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 6L6 42" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M31.5 31.5L34 34L39 39L41.5 41.5L42 42M24 24L6 6L24 24Z" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <svg class="mode" v-else width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 25C4 18.3502 9.39624 13 16 13H44" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 7L44 13L38 19" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 23C44 29.6498 38.6038 35 32 35H4" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 41L4 35L10 29" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </div>
        <div class="tools">
          <div class="songBack" @click="backSong"><a-icon type="step-backward" /></div>
          <div class="songToggle" @click="toggleSong">
            <a-icon type="pause" v-if="nowPlay.isPlay" />
            <a-icon type="caret-right" v-else />
          </div>
          <div class="songForward" @click="nextSong"><a-icon type="step-forward" /></div>
        </div>
      </div>
    </div>
    <div class="rightSide">
      <div class="lyricArea" ref="lyricAreaRef">
        <div class="topArea"></div>
        <div v-for="(item, index) in lyricData" :key="index" :class="highlight(index)?'lyricItem_highlight':'lyricItem'">
          {{ item.content ? item.content : '\u00a0' }}
        </div>
        <div class="bottomArea"></div>
      </div>
    </div>
  </div>
</template>

<script>
const axios=require('axios');
export default {
  props: {
    nowPlay: Object,
    random: Boolean,
    fRandom: Boolean,
    lovedSongs: Array,
  },
  data() {
    return {
      shownCoverLink: "",
      lyricText: "",
      lyricData: [],

      nowTime: 0,
    }
  },
  methods: {
    highlight(index){
      if(this.lyricData[index].time<=this.nowTime && index==this.lyricData.length-1){
        this.$refs.lyricAreaRef.scrollTo({
          top: index*40,
          behavior: 'smooth',
        })
        return true;
      }else if(this.lyricData[index].time<=this.nowTime && this.lyricData[index+1].time>this.nowTime){
        this.$refs.lyricAreaRef.scrollTo({
          top: index*40,
          behavior: 'smooth',
        })
        return true;
      }
      return false;
    },
    getLyric(){
      this.lyricData=[{time: 0, content: '正在加载歌词...'}];
      this.$refs.lyricAreaRef.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      axios.get('https://lrclib.net/api/get',{
        params: {
          artist_name: this.nowPlay.nowPlayList[this.nowPlay.index].artist,
          track_name: this.nowPlay.nowPlayList[this.nowPlay.index].title,
          album_name: this.nowPlay.nowPlayList[this.nowPlay.index].album,
          duration: this.nowPlay.nowPlayList[this.nowPlay.index].duration,
        },
      }).then((response)=>{
        this.lyricText=response.data.syncedLyrics;
        var that=this;
        this.lyricData = this.lyricText.split(/\r?\n/).map((item)=>{
          var leftArr=item.indexOf('[');
          var rightArr=item.lastIndexOf(']');
          return {
            time: that.timeToMilliseconds(item.substring(leftArr+1, rightArr)),
            content: item.slice(rightArr+2, item.length)
          }
        });
        // console.log(this.lyricData);
      }).catch(()=>{
        // this.$message.info("没有找到歌词");
        this.lyricData=[{time: 0, content: '没找到歌词'}];
      })
    },
    lyricUpdate(time){
      var msec=time*1000;
      this.nowTime=msec;
    },
    timeToMilliseconds(timestamp) {
      var timeParts = timestamp.split(':');
      var minutes = parseInt(timeParts[0], 10);
      var secondsAndMilliseconds = timeParts[1].split('.');
      var seconds = parseInt(secondsAndMilliseconds[0], 10);
      var milliseconds = parseInt(secondsAndMilliseconds[1], 10) || 0;

      var totalMilliseconds = (minutes * 60 + seconds) * 1000 + milliseconds;
      return totalMilliseconds;
    },
    changePlayMode() {
      if(this.fRandom){
        return;
      }
      this.$emit("changePlayMode");
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
    isLoved() {
      if(this.nowPlay.nowPlayList.length==0){
        return false;
      }
			for (const obj of this.lovedSongs) {
				if (obj.id == this.nowPlay.nowPlayList[this.nowPlay.index].id) {
					return true;
				}
			}
			return false;
		},
    starController(){
      if(this.nowPlay.nowPlayList.length==0){
        this.$message.error("无效操作");
        return;
      }
      if(this.isLoved()){
        this.$emit("deloveSong", {id: this.nowPlay.nowPlayList[this.nowPlay.index].id});
      }else{
        this.$emit("loveSong", {id: this.nowPlay.nowPlayList[this.nowPlay.index].id});
      }
    },
    hideLyric(){
      this.$emit("hideLyric")
    },
    getSongCover() {
      var username = localStorage.getItem("username");
      var salt = localStorage.getItem("salt");
      var token = localStorage.getItem("token");
      var url = localStorage.getItem("url");
      this.shownCoverLink = url + "/rest/getCoverArt?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token + "&id=" + this.nowPlay.nowPlayList[this.nowPlay.index].id;
      this.getLyric();
    },
  },
  mounted() {
    if (this.nowPlay.nowPlayList.length != 0) {
      this.getSongCover();
    }
  },
  created() {
    var username = localStorage.getItem("username");
    var salt = localStorage.getItem("salt");
    var token = localStorage.getItem("token");
    var url = localStorage.getItem("url");
    this.shownCoverLink = url + "/rest/getCoverArt?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token;
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none !important;
}
.bottomArea{
  height: calc(50% - 15px);
  /* background-color: red; */
}
.topArea{
  height: calc(50% - 15px);
  /* background-color: red; */
}
.lyricItem_highlight{
  color: rgb(24, 144, 255);
  font-weight: bold;
}
.lyricItem{
  color: lightgrey;
}
.lyricItem, .lyricItem_highlight{
  font-size: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
}
.lyricArea{
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: auto;
}
.funcs{
  display: flex;
  margin-top: 20px;
}
.modeDisabled{
  cursor: not-allowed;
}
.mode:hover{
  cursor: pointer;
}
.playMode {
  margin-left: 15px;
  font-size: 30px;
  display: flex;
  align-items: center;
}
.songToggle {
  font-size: 30px;
  margin-right: 10px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
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
  font-size: 25px;
  border-radius: 40px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease-in-out .2s;
}
.sign{
  display: flex;
  align-items: center;
}
.lovedSign:hover{
  cursor: pointer;
}
.lovedSign{
  display: flex;
  align-items: center;
  margin-right: 15px;
}
.tools{
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.artist{
  margin-top: 10px;
  color: grey;
  font-size: 16px;
  max-width: 50vw;
  overflow: hidden;
  padding-left: 30px;
  padding-right: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title{
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  overflow: hidden;
  max-width: 50vw;
  padding-left: 30px;
  padding-right: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.closeIcon:hover{
  cursor: pointer;
  color: black;
}
.closeIcon{
  position: absolute;
  font-size: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: lightgrey;
  bottom: 10px;
  transition: all linear .2s;
}
.leftInfo{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.rightSide{
  width: 100%;
  height: 100vh;
  /* background-color: rgb(241, 241, 241); */
  padding: 30px;
}
.leftSide{
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
}
.bg{
  background-color: #fff;
  display: grid;
  grid-template-columns: 50vw 50vw;
  position: relative;
  user-select: none;
}
</style>