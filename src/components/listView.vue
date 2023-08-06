<template>
    <div>
        <a-page-header
            :title="shownTitle"
            :sub-title="subTitle" />
        
        <div></div>
        
    </div>
</template>

<script>
export default {
    props:{
        nowPage: String,
        playList: Object,
    },
    data() {
        return {
            shownTitle: "",
            subTitle: "",
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
                    break;
                case 'playList':
                    this.shownTitle=this.playList.name;
                    this.subTitle="合计"+this.playList.songCount+"首歌";
                    break;
            }
        }
    },
    mounted() {
        
    },
    created() {
        this.titleController();
    },
    watch: {
        playList: function(){
            this.titleController();
        },
        nowPage: function(){
            this.titleController();
        }
    },
}
</script>

<style scoped>

</style>