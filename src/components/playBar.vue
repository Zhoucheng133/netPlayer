<template>
    <div class="bar">
        <div class="cover">
            <img :src="shownCoverLink==''?'':shownCoverLink" alt="" width="80px">
        </div>

        <div class="name">
            <div class="title">{{ nowPlay.nowPlayList.length==0 ? "" : nowPlay.nowPlayList[nowPlay.index].title }}</div>
            <div class="artist">{{ nowPlay.nowPlayList.length==0 ? "" : nowPlay.nowPlayList[nowPlay.index].artist }}</div>
        </div>
    </div>
</template>

<script>
// import { ipcRenderer } from 'electron';
export default {
    beforeDestroy() {

    },
    props:{
        nowPlay: Object,
    },
    data() {
        return {
            shownCoverLink: ""
        }
    },
    methods: {
        getSongCover(){
            var username=localStorage.getItem("username");
            var salt=localStorage.getItem("salt");
            var token=localStorage.getItem("token");
            var url=localStorage.getItem("url");
            this.shownCoverLink=url+"/rest/getCoverArt?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token+"&id="+this.nowPlay.nowPlayList[this.nowPlay.index].id
        },
    },
    mounted() {
        if(this.nowPlay.nowPlayList.length!=0){
            this.getSongCover();
        }
    },
    created() {
    },
    watch: {
        nowPlay: function(){
            this.getSongCover();
        }
    },
}
</script>

<style scoped>
.artist{
    font-size: 15px;
    text-align: left;
    color: grey;
}
.title{
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    max-width: 250px;
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
}
.name{
    margin-left: 20px;
    font-size: 18px;
}
.cover{
    width: 80px;
    height: 80px;
    background-color: red;
}
.bar{
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-bottom: 5px;
    height: 100px;
    background-color: rgba(255,255,255,0.3);
    backdrop-filter: blur(15px);
    /* width: 100vw; */
    width: calc(100vw - 240px - 40px);
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    /* border: 1px solid; */
}
</style>