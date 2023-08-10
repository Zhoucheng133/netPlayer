<template>
    <div class="bg" :style="{'opacity': bgOpacity}">
        <sideBar
            class="sideBar_style"
            @logoutMain="logoutMain" 
            @toPage="toPage" 
            @toPlayList="toPlayList"
            :nowPage="nowPage" 
            :playList="playList"
            :nowPlay="nowPlay" />
        
        <playBar class="playbar" 
            ref="player"
            :nowPlay="nowPlay"
            @nextSong="nextSong" 
            @backSong="backSong" 
            @toggleSong="toggleSong"
            @isPlaying="isPlaying" 
            @handlePause="handlePause"
            />
        
        <!-- 主要内容在下面 -->
        <div class="mainSide">
            <aboutView v-show="nowPage=='about'" />
            <listView 
                ref="listPart" 
                @toPage="toPage" 
                @playSong="playSong"
                :nowPage="nowPage" 
                :nowPlay="nowPlay"
                :playList="playList" 
                />
        </div>
    </div>
</template>

<script>
import sideBar from './sideBar.vue';
import aboutView from './aboutView.vue';
import listView from './listView.vue';
import playBar from './playBar.vue';
export default {
    beforeDestroy(){
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    components:{
        sideBar,
        aboutView,
        listView,
        playBar,
    },
    data() {
        return {
            bgOpacity: 0,
            
            nowPage: '',
            playList: {},

            nowPlay:{
                listName: "",
                index: 0,
                nowPlayList: [],
                id: "",
                isPlay: false,
            },
        }
    },
    methods: {
        handlePause(){
            this.nowPlay.isPlay=false;
        },
        saveNowPlay(){
            localStorage.setItem("nowPlay", JSON.stringify(this.nowPlay));
        },
        handleKeyDown(event) {
			if (event.key === ' ' &&  event.target.tagName !== "INPUT") {
				event.preventDefault(); // 阻止默认的滚动行为
                if (this.nowPlay.nowPlayList.length==0) {
                    this.$message.error("播放列表为空!");
                    return;
                }
				this.toggleSong();
			}
		},
        isPlaying(){
            this.nowPlay.isPlay=true;
        },
        toggleSong(){
            if(this.nowPlay.isPlay==false){
                this.$refs.player.playSongController();
            }else{
                this.$refs.player.pauseSongController();
            }
            this.nowPlay.isPlay=!this.nowPlay.isPlay;
        },
        backSong(){
            this.nowPlay.index=(this.nowPlay.index-1+this.nowPlay.nowPlayList.length)%this.nowPlay.nowPlayList.length;
            this.$refs.player.playSong();
            this.nowPlay.isPlay=true;
            this.saveNowPlay();
        },
        nextSong(){
            this.nowPlay.index=(this.nowPlay.index+1+this.nowPlay.nowPlayList.length)%this.nowPlay.nowPlayList.length;
            this.$refs.player.playSong();
            this.nowPlay.isPlay=true;
            this.saveNowPlay();
        },
        playSong(nowPlay){
            this.nowPlay=nowPlay;
            this.$refs.player.playSong();
            // console.log(this.nowPlay);
            this.saveNowPlay();
        },
        toPlayList(item){
            this.nowPage='playList';
            this.playList=item;
        },
        toPage(pageName){
            this.nowPage=pageName;
        },
        logoutMain(){
            this.bgOpacity=0;
            setTimeout(() => {
                this.$emit("logoutApp")
            }, 300);
        },
        startAnimation(){
            const duration = 300;
            const interval = 10;
            const steps = duration / interval;
            let step = 0;
            const increment = 1 / steps;
            const animateOpacity = setInterval(() => {
                step++;
                this.bgOpacity += increment;

                if (step >= steps) {
                    clearInterval(animateOpacity);
                }
            }, interval);
        }
    },
    mounted() {
        this.startAnimation();
        if(localStorage.getItem("nowPage")!=null){
            this.nowPage=localStorage.getItem("nowPage");
            if(this.nowPage=='playList'){
                this.playList=JSON.parse(localStorage.getItem("playList"));
            }
        }else{
            this.nowPage="allSongs"
        }
        window.addEventListener('keydown', this.handleKeyDown);

        if(localStorage.getItem('nowPlay')!=null){
            var tmp=JSON.parse(localStorage.getItem('nowPlay'));
            if(tmp.listName!='allSongs'){
                this.nowPlay=tmp;
                this.nowPlay.isPlay=false;
                this.$nextTick(()=>{
                    this.$refs.player.loadSong();
                })
            }
            
        }
    },
    created() {
        
    },
    watch: {
        nowPage:function(newVal,oldVal){
            if(oldVal=='about'){
                var that=this;
                this.$nextTick(()=>{
                    that.$refs.listPart.pageTurn();
                })
            }
        }
    },
}
</script>

<style scoped>
.playbar{
    position: fixed;
    bottom: 0;
    margin-left: 240px;
    margin-bottom: 10px;
    z-index: 100;
}
.mainSide{
    padding-left: 200px;
    padding-top: 30px;
}
.sideBar_style{
    position: fixed;
    top: 0;
}
.bg{
    height: 100vh;
    width: 100vw;
    background-color: white;
    transition: all ease-in-out .3s;
}
</style>