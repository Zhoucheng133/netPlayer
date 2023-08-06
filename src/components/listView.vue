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

            </div>
        </div>
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
.mainArea{
    position: fixed;
    margin-top: 50px;
    width: calc(100% - 248px);
    height: calc(100% - 64px - 60px - 100px);
    background-color: lightcyan;
    margin-left: 24px;
}
.container{
    margin-left: 24px;
    display: grid;
    grid-template-columns: 50px auto 100px 50px 50px;
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
    grid-template-columns: 50px auto 100px 50px 50px;
    width: calc(100% - 248px);
    background-color: rgb(242, 242, 242);
    height: 50px;
}
</style>