<template>
    <div class="bg">
        <a-page-header
        v-if="artistContent.enable==false && albumContent.enable==false"
            :title="shownTitle"
            :sub-title="subTitle" >
            <template slot="extra">
                <div class="toolBar">
                    <a-input-search placeholder="输入搜索内容" style="width: 200px;margin-right: 20px;" @search="onSearch" allowClear v-model="inputSearch" @change="onSearch"/>
                    <a-button icon="redo" type="primary" shape="round" @click="reloadList"></a-button>
                </div>
            </template>
        </a-page-header>

        <a-page-header
            v-else 
            :title="shownTitle"
            :sub-title="subTitle" 
            @back="back" >
            <template slot="extra">
                <a-button icon="redo" type="primary" shape="round" @click="reloadList"></a-button>
            </template>
        </a-page-header>

        <div v-if="nowPage!='albums' && nowPage!='artists'">
            <div class="container_fix">
                <div class="item">序号</div>
                <div class="item">歌曲名</div>
                <div class="item">歌手</div>
                <div class="item">时长</div>
            </div>

            <div class="mainArea" v-if="!isSearch">
                <div v-for="(item, index) in shownList" :key="index" @dblclick="playSong(index)" :class="isPlaying(index)?'container_playing':'container'">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.artist }}</div></div>
                    <div class="item"><div class="itemContent">{{ getSongTime(item.duration) }}</div></div>
                </div>
            </div>
            
            <div class="mainArea" v-else>
                <div v-for="(item, index) in searchList" :key="index" @dblclick="playSong(index)" :class="isPlaying(index)?'container_playing':'container'">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.artist }}</div></div>
                    <div class="item"><div class="itemContent">{{ getSongTime(item.duration) }}</div></div>
                </div>
            </div>
        </div>

        <div v-else-if="nowPage=='artists' && artistContent.enable==false">
            <div class="container_fix_artist">
                <div class="item">序号</div>
                <div class="item">艺人</div>
                <div class="item">专辑数量</div>
            </div>
            <div class="mainArea" v-if="!isSearch">
                <div class="container_artist"  v-for="(item, index) in shownList" :key="index" @dblclick="showArtistContent(item)">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.name }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.albumCount }}</div></div>
                </div>
            </div>

            <div class="mainArea" v-else>
                <div class="container_artist"  v-for="(item, index) in searchList" :key="index" @dblclick="showArtistContent(item)">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.name }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.albumCount }}</div></div>
                </div>
            </div>
        </div>

        <div v-else-if="nowPage=='artists' && artistContent.enable==true">
            <div class="container_fix_artist">
                <div class="item">序号</div>
                <div class="item">专辑名称</div>
                <div class="item">歌曲数</div>
            </div>
            <div class="mainArea" v-if="!isSearch">
                <div class="container_artist"  v-for="(item, index) in shownList" :key="index" @dblclick="showAlbumContent(item)">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.songCount }}</div></div>
                </div>
            </div>
            <div class="mainArea" v-else>
                <div class="container_artist"  v-for="(item, index) in searchList" :key="index" @dblclick="showAlbumContent(item)">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.songCount }}</div></div>
                </div>
            </div>
        </div>

        <div v-else-if="nowPage=='albums' && albumContent.enable==false">
            <div class="container_fix_artist">
                <div class="item">序号</div>
                <div class="item">专辑名称</div>
                <div class="item">歌曲数</div>
            </div>
            <div class="mainArea" v-if="!isSearch">
                <div class="container_artist"  v-for="(item, index) in shownList" :key="index" @dblclick="showAlbumContent(item)">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.songCount }}</div></div>
                </div>
            </div>

            <div class="mainArea" v-else>
                <div class="container_artist"  v-for="(item, index) in searchList" :key="index" @dblclick="showAlbumContent(item)">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.songCount }}</div></div>
                </div>
            </div>
        </div>

        <div v-else-if="nowPage=='albums' && albumContent.enable==true">
            <div class="container_fix">
                <div class="item">序号</div>
                <div class="item">歌曲名</div>
                <div class="item">歌手</div>
                <div class="item">时长</div>
            </div>

            <div class="mainArea" v-if="!isSearch">
                <div v-for="(item, index) in shownList" :key="index" @dblclick="playSong(index)" :class="isPlaying(index)?'container_playing':'container'">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.artist }}</div></div>
                    <div class="item"><div class="itemContent">{{ getSongTime(item.duration) }}</div></div>
                </div>
            </div>

            <div class="mainArea" v-else>
                <div v-for="(item, index) in searchList" :key="index" @dblclick="playSong(index)" :class="isPlaying(index)?'container_playing':'container'">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.artist }}</div></div>
                    <div class="item"><div class="itemContent">{{ getSongTime(item.duration) }}</div></div>
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
        ipcRenderer.removeAllListeners('artistAlbumResult');
        ipcRenderer.removeAllListeners('albumsResult');
        ipcRenderer.removeAllListeners('albumContentResult');
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

            artistContent: {
                enable: false,
                artistID: "",
            },

            albumContent: {
                enable: false,
                albumID: "",
            },

            cancelRequest: false,

            isSearch: false,
            searchList: [],

            inputSearch: "",
        }
    },
    methods: {
        filterArrayByString(inputArray, searchString) {
            return inputArray.filter(obj => {
                return Object.values(obj).some(value => {
                    return typeof value === 'string' && value.toLowerCase().includes(searchString.toLowerCase());
                });
            });
        },
        onSearch(){
            if(this.inputSearch==""){
                console.log("return!");
                this.isSearch=false;
            }
            this.isSearch=true;
            this.searchList=this.filterArrayByString(this.shownList,this.inputSearch);
        },
        reloadList(){
            this.artistContent.enable=false;
            this.albumContent.enable=false;
            if(this.nowPage=='allSongs' && this.nowPlay.listName=='allSongs'){
                var that=this;
                this.$confirm({
                    title: '刷新所有歌曲?',
                    content: '注意，这会重置播放列表',
                    centered: true,
                    cancelText: '取消',
                    okText: '确定',
                    onOk() {
                        console.log("请求所有歌曲(Req)");
                        ipcRenderer.send('allSongsRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"));
                        that.$emit("stopAudio");
                    },
                    onCancel() {
                    },
                });
            }else if(this.nowPage=='allSongs'){
                console.log("请求所有歌曲(Req)");
                ipcRenderer.send('allSongsRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"));
            }else{
                this.pageTurn();
            }
        },
        albumContentResult(event, resp){
            console.log("请求专辑内容(Rlt)");
            this.shownTitle="专辑/"+resp.album.name;
            this.subTitle="专辑内含"+resp.album.song.length+"首歌";
            this.listID=resp.album.id;
            this.shownList=resp.album.song;
        },
        showAlbumContent(item){
            if(this.artistContent.enable){
                this.cancelRequest=true;
            }
            this.artistContent.enable=false;
            this.albumContent.enable=true;
            this.albumContent.albumID=item.id;
            this.$emit("toPage",'albums');
            console.log(this.albumContent);
            this.shownTitle="专辑/"+item.name;
            console.log("请求专辑内容(Req)");
            ipcRenderer.send('albumContentRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"), this.albumContent.albumID);
        },
        back(){
            this.artistContent.enable=false;
            this.albumContent.enable=false;
            this.pageTurn();
        },
        artistAlbumResult(event, resp){
            // console.log(resp);
            this.shownList=resp.artist.album;
            this.subTitle="共计"+resp.artist.album.length+"个专辑"
        },
        showArtistContent(item){
            this.artistContent.enable=true;
            this.artistContent.artistID=item.id;
            this.shownList=[];
            this.shownTitle="艺人/"+item.name;
            ipcRenderer.send('artistAlbumRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"), this.artistContent.artistID);
        },
        isPlaying(index){
            if(index==this.nowPlay.index && this.listID==this.nowPlay.id && this.nowPlay.listName==this.nowPage){
                return true;
            }
            return false;
        },
        playSong(index){
            var nowPlay={};
            if(this.isSearch==false){
                nowPlay={
                    listName: this.nowPage,
                    index: index,
                    nowPlayList: this.shownList,
                    id: this.listID,
                    isPlay: false,
                }
            }else{
                nowPlay={
                    listName: this.nowPage,
                    index: this.shownList.indexOf(this.searchList[index]),
                    nowPlayList: this.shownList,
                    id: this.listID,
                    isPlay: false,
                }
            }
            console.log(nowPlay);
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
            console.log("请求所有喜欢的歌曲(Req)");
            ipcRenderer.send('lovedSongsRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"));
        },
        lovedSongsResult(event, resp){
            console.log("请求所有喜欢的歌曲(Rlt)");
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
            console.log("请求所有艺人(Req)");
            this.shownList=[];
            ipcRenderer.send('artistsRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"));
        },
        artistsResult(event, resp){
            console.log("请求所有艺人(Rlt)");
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
            console.log("请求所有歌曲(Req)");
            if(this.allSongsList.length==0){
                ipcRenderer.send('allSongsRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"));
            }else{
                this.needRequest=false;
                this.shownList=this.allSongsList;
                this.listID="";
                this.subTitle="随机的"+this.allSongsList.length+"首歌";
            }
            
        },
        allSongsResult(event, resp){
            console.log("请求所有歌曲(Rlt)");
            this.needRequest=false;
            this.allSongsList=resp.randomSongs.song;
            this.shownList=resp.randomSongs.song;
            this.listID="";
            this.subTitle="随机的"+resp.randomSongs.song.length+"首歌";
        },
        requetAlbums(){
            console.log("请求所有专辑(Req)");
            if(this.cancelRequest){
                this.cancelRequest=false;
                console.log("取消请求所有专辑");
                return;
            }
            this.shownList=[];
            ipcRenderer.send('albumsRequst', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"));
        },
        albumsResult(event, resp){
            this.shownList=[];
            console.log("请求所有专辑(Rlt)");
            this.subTitle="由新到旧显示的"+resp.albumList.album.length+"个专辑";
            this.shownList=resp.albumList.album;
        },
        requestList(){
            console.log("请求列表(Req)");
            ipcRenderer.send('listRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"), this.playList.id);
        },
        listResult(event, resp){
            console.log("请求列表(Rlt)");
            this.needRequest=false;
            this.shownList=resp.playlist.entry;
            this.listID=resp.playlist.id;
            this.subTitle="合计"+resp.playlist.songCount+"首歌";
        },
        pageTurn(){
            this.shownList=[];
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
        ipcRenderer.removeAllListeners('artistAlbumResult');
        ipcRenderer.removeAllListeners('albumsResult');
        ipcRenderer.removeAllListeners('albumContentResult');
        ipcRenderer.on('listResult', this.listResult);
        ipcRenderer.on('lovedSongsResult', this.lovedSongsResult);
        ipcRenderer.on('allSongsResult', this.allSongsResult);
        ipcRenderer.on('artistsResult', this.artistsResult);
        ipcRenderer.on('artistAlbumResult', this.artistAlbumResult);
        ipcRenderer.on('albumsResult', this.albumsResult);
        ipcRenderer.on('albumContentResult', this.albumContentResult);
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
                this.inputSearch="";
                this.isSearch=false;
                this.pageTurn();
            }
        }
    },
}
</script>

<style scoped>
.toolBar{
    display: flex;
}
.ant-page-header{
    width: calc(100vw - 200px);
}
.itemContent{
    width: 100%;
    overflow: hidden;
	text-overflow: ellipsis;
    text-align: left;
    white-space:nowrap;
}
.mainArea{
    overflow-y: overlay;
    overflow-x: hidden;
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
    width: calc(100vw - 200px) !important;
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