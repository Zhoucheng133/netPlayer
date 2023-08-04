<template>
    <div class="bg" :style="{'opacity': bgOpacity}">
        测试内容
    </div>
</template>

<script>
export default {
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
.bg{
    height: 100vh;
    widows: 100vw;
    background-color: white;
}
</style>