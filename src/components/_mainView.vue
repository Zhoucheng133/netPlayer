<template>
    <div class="bg" :style="{'opacity': bgOpacity}">
        <sideBar
            class="sideBar_style"
            @logoutMain="logoutMain" 
            @toPage="toPage" 
            @toPlayList="toPlayList"
            :nowPage="nowPage" 
            :playList="playList" />
        
        <playBar class="playbar"/>
        
        <!-- 主要内容在下面 -->
        <div class="mainSide">
            <aboutView v-if="nowPage=='about'" />
            <listView 
                :nowPage="nowPage" 
                :playList="playList" 
                v-else />
        </div>
    </div>
</template>

<script>
import sideBar from './sideBar.vue';
import aboutView from './aboutView.vue';
import listView from './listView.vue';
import playBar from './playBar.vue';
export default {
    components:{
        sideBar,
        aboutView,
        listView,
        playBar,
    },
    data() {
        return {
            bgOpacity: 0,
            
            nowPage: 'allSongs',
            playList: {},
        }
    },
    methods: {
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
    },
    created() {
        
    },
}
</script>

<style scoped>
.playbar{
    position: fixed;
    bottom: 0;
    margin-left: 200px;
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
    widows: 100vw;
    background-color: white;
    transition: all ease-in-out .3s;
}
</style>