<template>
    <div class="bg">
        <a-page-header
            :title="shownTitle"
            :sub-title="subTitle" />

        <div v-if="nowPage!='albums' && nowPage!='artists'">
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

        <div v-else-if="nowPage=='artists'">
            <div class="container_fix_artist">
                <div class="item">序号</div>
                <div class="item">艺人</div>
                <div class="item">专辑数量</div>
            </div>
            <div class="mainArea">
                <div class="container_artist"  v-for="(item, index) in shownList" :key="index">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.name }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.albumCount }}</div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
export default {
    beforeDestroy() {
        ipcRenderer.removeAllListeners('listResult');
        ipcRenderer.removeAllListeners('lovedSongsResult');
        ipcRenderer.removeAllListeners('allSongsResult');
        ipcRenderer.removeAllListeners('artistsResult');
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
            
            allSongsList: [],
        }
    },
    methods: {
        isPlaying(index){
            if(index==this.nowPlay.index && this.listID==this.nowPlay.id && this.nowPlay.listName==this.nowPage){
                return true;
            }
            return false;
        },
        playSong(index){
            var nowPlay={
                listName: this.nowPage,
                index: index,
                nowPlayList: this.shownList,
                id: this.listID,
                isPlay: false,
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
            if(resp.starred.song==undefined){
                this.subTitle="合计0首歌";
            }else{
                this.subTitle="合计"+resp.starred.song.length+"首歌";
            }
            this.listID='';
        },
        requestArtists(){
            this.shownList=[];
            ipcRenderer.send('artistsRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"));
        },
        artistsResult(event, resp){
            var tmp=[];
            for(var item of resp.indexes.index){
                for(var insideItem of item.artist){
                    tmp.push(insideItem);
                }
            }
            this.shownList=tmp;
            this.subTitle="合计"+tmp.length+"位艺人";
        },
        requestAllSongs(){
            if(this.allSongsList.length==0){
                ipcRenderer.send('allSongsRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"), this.playList.id);
            }else{
                this.needRequest=false;
                this.shownList=this.allSongsList;
                this.listID="";
                this.subTitle="随机的"+this.allSongsList.length+"首歌";
            }
            
        },
        allSongsResult(event, resp){
            this.needRequest=false;
            this.allSongsList=resp.randomSongs.song;
            this.shownList=resp.randomSongs.song;
            this.listID="";
            this.subTitle="随机的"+resp.randomSongs.song.length+"首歌";
        },
        requetAlbums(){
            this.shownList=[];
            console.log("需要请求: 专辑");
        },
        albumsResult(){
            this.shownList=[];
        },
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
            }else if(this.nowPage=='allSongs'){
                this.requestAllSongs();
            }else if(this.nowPage=='lovedSongs'){
                this.requestLovedSongs();
            }
        }
    },
    mounted() {
        ipcRenderer.removeAllListeners('listResult');
        ipcRenderer.removeAllListeners('lovedSongsResult');
        ipcRenderer.removeAllListeners('allSongsResult');
        ipcRenderer.removeAllListeners('artistsResult');
        ipcRenderer.on('listResult', this.listResult);
        ipcRenderer.on('lovedSongsResult', this.lovedSongsResult);
        ipcRenderer.on('allSongsResult', this.allSongsResult);
        ipcRenderer.on('artistsResult', this.artistsResult);
    },
    created() {
        this.titleController();
        // this.requestAllSongs();
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
                console.log("切换页面");
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
    grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 150px - 70px) 150px 70px 150px 70px;
    width: 100%;
    height: 50px;
    transition: all ease-in-out .2s;
    background-color: rgb(235, 235, 235);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}
.container{
    display: grid;
    grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 150px - 70px) 150px 70px;
    width: 100%;
    height: 50px;
    transition: all ease-in-out .2s;
}
.mainArea > .container:hover{
    background-color: rgb(220, 220, 220);
}
.mainArea > .container_artist:hover{
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
.container_artist{
    display: grid;
    grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 100px) 100px;
    width: 100%;
    height: 50px;
    transition: all ease-in-out .2s;
}
.container_fix_artist{
    position: fixed;
    margin-left: 24px;
    display: grid;
    grid-template-columns: 50px auto 100px;
    width: calc(100% - 248px);
    background-color: rgb(242, 242, 242);
    height: 50px;
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