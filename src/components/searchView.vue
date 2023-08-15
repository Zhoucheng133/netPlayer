<template>
    <div>
        <a-input-search v-model="inputValue" @search="onSearch" enter-button placeholder="输入你要搜索的内容"></a-input-search>
        <a-tabs default-active-key="song" @change="callback" :animated="shownAnimation">
            <a-tab-pane key="song" tab="单曲">
                <div v-if="shownList.length==0">对关键字进行搜索</div>
                <div v-else>
                    <div class="container_fix">
                        <div class="item">序号</div>
                        <div class="item">歌曲名</div>
                        <div class="item">歌手</div>
                        <div class="item">时长</div>
                        <div class="item">
                            <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                    </div>
                    <div class="mainArea">
                        <div v-for="(item, index) in shownList.song" :key="index" :class="isPlaying(index)?'container_playing':'container'" @dblclick="paySong(index)">
                            <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                            <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                            <div class="item"><div class="itemContent">{{ item.artist }}</div></div>
                            <div class="item"><div class="itemContent">{{ getSongTime(item.duration) }}</div></div>
                            <div class="item">
                                <div class="itemContent"><svg v-if="isLoved(item)" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="#ff0000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                            </div>
                        </div>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="artist" tab="艺人">
                <div v-if="shownList.length==0">对关键字进行搜索</div>
                <div v-else>
                    <div class="container_fix_artist">
                        <div class="item">序号</div>
                        <div class="item">艺人</div>
                        <div class="item">专辑数量</div>
                    </div>
                    <div class="mainArea">
                        <div class="container_artist"  v-for="(item, index) in shownList.artist" :key="index" @dblclick="showArtistContent(item)">
                            <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                            <div class="item"><div class="itemContent">{{ item.name }}</div></div>
                            <div class="item"><div class="itemContent">{{ item.albumCount }}</div></div>
                        </div>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="album" tab="专辑">
                <div v-if="shownList.length==0">对关键字进行搜索</div>
                <div v-else>
                    <div class="container_fix_artist">
                        <div class="item">序号</div>
                        <div class="item">专辑名称</div>
                        <div class="item">歌曲数</div>
                    </div>
                    <div class="mainArea">
                        <div class="container_artist"  v-for="(item, index) in shownList.album" :key="index"  @dblclick="showAlbumContent(item)">
                            <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                            <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                            <div class="item"><div class="itemContent">{{ item.songCount }}</div></div>
                        </div>
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
export default {
    props: {
        nowPlay: Object,
        lovedSongs: Array
    },
    beforeDestroy() {
        ipcRenderer.removeAllListeners('searchResult');
    },
    data() {
        return {
            shownAnimation: false,

            shownList: [],
            inputValue: ""
        }
    },
    methods: {
        isLoved(item){
            if(JSON.stringify(this.lovedSongs).indexOf(JSON.stringify(item))!=-1){
                return true;
            }
            return false;
        },
        isPlaying(index){
            if(index==this.nowPlay.index && this.inputValue==this.nowPlay.id){
                return true;
            }
            return false;
        },
        paySong(index){
            var nowPlay={
                listName: "search",
                index: index,
                nowPlayList: this.shownList.song,
                id: this.inputValue,
                isPlay: false,
            }
            this.$emit("searchPlay",nowPlay);
        },
        showArtistContent(item){
            this.$emit("turnToArtist",item);
        },
        showAlbumContent(item){
            this.$emit("showAlbumContent", item);
        },
        getSongTime(duration){
            var min=parseInt(duration/60);
            var sec=duration%60;
            return sec<10?min+":0"+sec:min+":"+sec
        },
        onSearch(){
            if(this.inputValue==''){
                this.shownList=[];
            }else{
                ipcRenderer.send('searchRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"), this.inputValue);
            }
        },
        callback(){

        },
        searchResult(event, resp){
            this.shownList=resp.searchResult2
        }
    },
    mounted() {
        ipcRenderer.removeAllListeners('searchResult');
        ipcRenderer.on('searchResult', this.searchResult);
    },
    watch: {
        inputValue:function(newVal){
            if(newVal==""){
                this.onSearch();
            }
        }
    }
}
</script>

<style scoped>
.container_playing{
    display: grid;
    grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 150px - 70px) 150px 70px 150px 70px;
    width: 100%;
    height: 50px;
    transition: all ease-in-out .2s;
    background-color: rgb(235, 235, 235);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}
.mainArea > .container_artist:hover{
    background-color: rgb(220, 220, 220);
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
    display: grid;
    grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 100px) 100px;
    width: 100%;
    background-color: rgb(242, 242, 242);
    height: 50px;
}
.mainArea > .container:hover{
    background-color: rgb(220, 220, 220);
}
.mainArea{
    overflow-y: overlay;
    overflow-x: hidden;
    position: fixed;
    margin-top: 50px;
    width: 100%;
    height: calc(100vh - 30px - 64px - 32px - 44px - 50px);
    padding-bottom: 130px;
}
.item{
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 14px;
}
.container{
    display: grid;
    grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 150px - 70px - 50px) 150px 70px 50px;
    width: 100%;
    height: 50px;
    transition: all ease-in-out .2s;
}
.container_fix{
    position: fixed;
    display: grid;
    grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 150px - 70px - 50px) 150px 70px 50px;
    width: 100%;
    background-color: rgb(242, 242, 242);
    height: 50px;
}
</style>