<template>
    <div class="bar">
        <div class="cover">
            
        </div>

        <div class="title">
            {{ nowPlay.nowPlayList[nowPlay.index].title }}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        nowPlay: Object,
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {
        
    },
    created() {
        
    },
    watch: {
        nowPlay: function(newVal){
            console.log(newVal.nowPlayList[newVal.index]);
        }
    },
}
</script>

<style scoped>
.title{
    
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