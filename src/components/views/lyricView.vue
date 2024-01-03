<template>
  <div class="bg">
    <div class="closeIcon" @click="hideLyric">
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 18L24 30L12 18" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="leftSide">
      <div class="leftInfo">
        <img :src="shownCoverLink == '' ? '' : shownCoverLink" alt="" width="200px" draggable="false">
      </div>
    </div>
    <div class="rightSide"></div>
  </div>
</template>

<script>
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
    }
  },
  methods: {
    hideLyric(){
      this.$emit("hideLyric")
    },
    getSongCover() {
      var username = localStorage.getItem("username");
      var salt = localStorage.getItem("salt");
      var token = localStorage.getItem("token");
      var url = localStorage.getItem("url");
      this.shownCoverLink = url + "/rest/getCoverArt?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token + "&id=" + this.nowPlay.nowPlayList[this.nowPlay.index].id;
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
  },
  watch: {
    nowPlay: function(){
      this.getSongCover();
    }
  },
}
</script>

<style scoped>
.closeIcon:hover{
  cursor: pointer;
}
.closeIcon{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 10px;
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
  background-color: lightgray;
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
}
</style>