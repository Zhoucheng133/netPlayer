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
                <div class="item">
                    <svg width="15" height="15" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
            </div>

            <div class="mainArea">
                <div class="container" v-for="(item, index) in shownList" :key="index">
                    <div class="item"><div class="itemContent">{{ index+1 }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.title }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.artist }}</div></div>
                    <div class="item"><div class="itemContent">{{ item.duration }}</div></div>
                    <div class="item">
                        <svg width="15" height="15" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
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
    },
    props:{
        nowPage: String,
        playList: Object,
    },
    data() {
        return {
            shownTitle: "",
            subTitle: "",

            needRequest: false,
            shownList:[],
        }
    },
    methods: {
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
                    this.subTitle="合计"+this.playList.songCount+"首歌";
                    break;
            }
        },
        requestList(){
            ipcRenderer.send('listRequest', localStorage.getItem("url"), localStorage.getItem("username"), localStorage.getItem("salt"), localStorage.getItem("token"), this.playList.id);
        },
        listResult(event, resp){
            this.needRequest=false;
            this.shownList=resp.playlist.entry;
            console.log(resp.playlist.entry);
        }
    },
    mounted() {
        ipcRenderer.removeAllListeners('listResult');
        ipcRenderer.on('listResult', this.listResult);
    },
    created() {
        this.titleController();
    },
    watch: {
        playList: function(){
            this.needRequest=true;
        },
        nowPage: function(){
            this.needRequest=true;
        },
        needRequest: function(newVal, oldVal){
            if(newVal==true && oldVal==false){
                this.titleController();
                if(this.nowPage=='playList'){
                    this.requestList();
                }else{
                    // 临时代码，注意修改
                    this.needRequest=false;
                }
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
.container{
    display: grid;
    grid-template-columns: 50px auto 150px 70px 50px;
    width: 100%;
    height: 50px;
}
.item{
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 15px;

}
.bg{
    user-select: none;
    height: calc(100vh - 30px) !important;
}
.container_fix{
    position: fixed;
    margin-left: 24px;
    display: grid;
    grid-template-columns: 50px auto 150px 70px 50px;
    width: calc(100% - 248px);
    background-color: rgb(242, 242, 242);
    height: 50px;
}
</style>