<template>
    <div>
    <a-page-header
        :title="shownTitle"
        sub-title="This is a subtitle" />
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
        }
    },
    methods: {
        titleController(){
            switch (this.nowPage) {
                case 'allSongs':
                    this.shownTitle="所有歌曲";
                    break;
                case 'albums':
                    this.shownTitle="专辑";
                    break;
                case 'artists':
                    this.shownTitle="艺人";
                    break;
                case 'songStyles':
                    this.shownTitle="歌曲流派";
                    break;
                case 'lovedSongs':
                    this.shownTitle="喜欢的歌曲";
                    break;
                case 'playList':
                    this.shownTitle=this.playList.name;
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