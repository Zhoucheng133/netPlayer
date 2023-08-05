<template>
    <div class="bg" :style="{'opacity': bgOpacity}">
        <sideBar class="sideBar_style"/>
        <div class="mainSide">
            <aboutView/>
        </div>
    </div>
</template>

<script>
import sideBar from './sideBar.vue';
import aboutView from './aboutView.vue';
export default {
    components:{
        sideBar,
        aboutView,
    },
    data() {
        return {
            bgOpacity: 0,
        }
    },
    methods: {
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
}
</style>