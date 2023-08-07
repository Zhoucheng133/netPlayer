<template>
    <div class="bg">
        <a-page-header
            :title="shownTitle"
            :sub-title="subTitle" />

        <div v-if="nowPage!='albums' && nowPage!='artists' && nowPage!='songStyles'">
            <div class="container_fix">
                <div class="item">序号</div>
                <div class="item">歌曲名</div>
                <div class="item">歌手</div>
                <div class="item">时长</div>
            </div>

            <div class="mainArea">
                <div v-for="(item, index) in shownList" :key="index" @dblclick="playSong(index)" :class="isPlaying(index)?'container_playing':'container'">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.artist }}</div></div>
                    <div class="item"><div class="itemContent">{{ getSongTime(item.duration) }}</div></div>
                </div>
            </div>
        </div>

        <div v-else>

        </div>

    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
export default {
    beforeDestroy() {
        ipcRenderer.removeAllListeners('listResult');
    },
    props:{
        nowPage: String,
        playList: Object,
        nowPlay: Object,
    },
    data() {
        return {
            shownTitle: "",
            subTitle: "",

            needRequest: false,
            shownList:[],

            listID:'',
        }
    },
    methods: {
        isPlaying(index){
            if(index==this.nowPlay.index && this.listID==this.nowPlay.id){
                return true;
            }
            return false;
        },
        playSong(index){
            var nowPlay={
                index: index,
                nowPlayList: this.shownList,
                id: this.listID,
            }
            this.$emit('playSong',nowPlay)
        },
        getSongTime(duration){
            var min=parseInt(duration/60);
            var sec=duration%60;
            return sec<10?min+":0"+sec:min+":"+sec
        },
        titleController(){
            switch (this.nowPage) {
                case 'allSongs':
                    this.shownTitle="所有歌曲";
                    this.subTitle="";
                    break;
                case 'albums':
                    this.shownTitle="专辑";
                    this.subTitle="";
                    break;
                case 'artists':
                    this.shownTitle="艺人";
                    this.subTitle="";
                    break;
                case 'songStyles':
                    this.shownTitle="歌曲流派";
                    this.subTitle="";
                    break;
                case 'lovedSongs':
                    this.shownTitle="喜欢的歌曲";
                    this.subTitle="";
                    break;
                case 'playList':
                    this.shownTitle=this.playList.name;
                    break;
            }
        },
        requestLovedSongs(){
            ipcRenderer.send('lovedSongsRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"));
        },
        lovedSongsResult(event, resp){
            this.needRequest=false;
            this.shownList=resp.starred.song;
            this.subTitle="合计"+resp.starred.song.length+"首歌";
        },
        requestSongStyles(){
            
        },
        songStylesResult(){},
        requestArtists(){
            this.shownList=[];
        },
        artistsResult(){},
        requestAllSongs(){
            this.shownList=[];
        },
        allSongsResult(){},
        requetAlbums(){
            this.shownList=[];
        },
        albumsResult(){},
        requestList(){
            ipcRenderer.send('listRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"), this.playList.id);
        },
        listResult(event, resp){
            this.needRequest=false;
            this.shownList=resp.playlist.entry;
            this.listID=resp.playlist.id;
            this.subTitle="合计"+resp.playlist.songCount+"首歌";
        },
        pageTurn(){
            this.titleController();
            if(this.nowPage=='playList'){
                this.requestList();
            }else if(this.nowPage=='albums'){
                this.requetAlbums();

                // 临时代码，注意修改
                this.needRequest=false;
            }else if(this.nowPage=='artists'){
                this.requestArtists();

                // 临时代码，注意修改
                this.needRequest=false;
            }else if(this.nowPage=='songStyles'){
                this.requestSongStyles();

                // 临时代码，注意修改
                this.needRequest=false;
            }else if(this.nowPage=='allSongs'){
                this.requestAllSongs();

                // 临时代码，注意修改
                this.needRequest=false;
            }else if(this.nowPage=='lovedSongs'){
                this.requestLovedSongs();
            }
        }
    },
    mounted() {
        ipcRenderer.removeAllListeners('listResult');
        ipcRenderer.removeAllListeners('lovedSongsResult');
        ipcRenderer.on('listResult', this.listResult);
        ipcRenderer.on('lovedSongsResult', this.lovedSongsResult);
    },
    created() {
        this.titleController();
        this.pageTurn();
    },
    watch: {
        playList: function(newVal){
            this.needRequest=true;
            localStorage.setItem("playList",JSON.stringify(newVal));
        },
        nowPage: function(newVal){
            this.needRequest=true;
            localStorage.setItem("nowPage",newVal);
        },
        needRequest: function(newVal, oldVal){
            if(newVal==true && oldVal==false){
                this.pageTurn();
            }
        }
    },
}
</script>

<style scoped>
.itemContent{
    width: 100%;
    overflow: hidden;
	text-overflow: ellipsis;
    text-align: left;
    white-space:nowrap;
}
.mainArea{
    overflow: scroll;
    position: fixed;
    margin-top: 50px;
    width: calc(100% - 248px);
    height: calc(100vh - 30px - 64px - 50px);
    margin-left: 24px;
    padding-bottom: 130px;
}
.container_playing{
    display: grid;
    grid-template-columns: 50px auto 150px 70px;
    width: 100%;
    height: 50px;
    transition: all ease-in-out .2s;
    background-color: rgb(230, 230, 230);;
}
.container{
    display: grid;
    grid-template-columns: 50px auto 150px 70px;
    width: 100%;
    height: 50px;
    transition: all ease-in-out .2s;
}
.mainArea > .container:hover{
    background-color: rgb(220, 220, 220);
}
.item{
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 14px;
}
.bg{
    user-select: none;
    height: calc(100vh - 30px) !important;
}
.container_fix{
    position: fixed;
    margin-left: 24px;
    display: grid;
    grid-template-columns: 50px auto 150px 70px;
    width: calc(100% - 248px);
    background-color: rgb(242, 242, 242);
    height: 50px;
}
</style>