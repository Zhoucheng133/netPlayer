<template>
  <div class="all">
    <a-page-header 
      :title="'艺人: '+artistName"
      @back="back">
			<template slot="extra">
				<a-button icon="redo" type="primary" shape="round" @click="reloadList"></a-button>
			</template>
		</a-page-header>

    <div class="container_fix_artist">
      <div class="item">序号</div>
      <div class="item">专辑名称</div>
      <div class="item">歌曲数</div>
    </div>
    <div class="mainArea">
      <div class="container_artist" v-for="(item, index) in shownList" :key="index" @dblclick="showAlbumContent(item)">
        <div class="item">
          <div class="itemContent">{{ index + 1 }}</div>
        </div>
        <div class="item">
          <div class="itemContent">{{ item.title }}</div>
        </div>
        <div class="item">
          <div class="itemContent">{{ item.songCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const aixos=require("axios");
export default {
  props: {
    selectedArtistId: String,
    userInfo: Object,
  },
  data() {
    return {
      artistName: "",

      shownList: [],
    }
  },
  methods: {
    showAlbumContent(){

    },
    back(){
      this.$emit("closeArtistContent");
    },
    requestArtistContent(id){
      var reqeustUrl=this.userInfo.url+"/rest/getArtist?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&id="+id;
      aixos.get(reqeustUrl)
      .then((response)=>{
        console.log(response.data["subsonic-response"]);
        this.shownList=response.data["subsonic-response"].artist.album;
        this.artistName=response.data["subsonic-response"].artist.name;
      })
    },
    reloadList(){

    }
  },
  created() {
    
  },
}
</script>

<style scoped>
.itemContent {
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: left;
	white-space: nowrap;
}
.item {
	display: flex;
	align-items: center;
	padding-left: 10px;
	font-size: 14px;
}
.mainArea {
	overflow-y: overlay;
	overflow-x: hidden;
	position: fixed;
	margin-top: 50px;
	width: calc(100% - 248px);
	height: calc(100vh - 30px - 64px - 50px);
	margin-left: 24px;
	padding-bottom: 130px;
}

.container_artist {
	display: grid;
	grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 100px) 100px;
	width: 100%;
	height: 50px;
	transition: all ease-in-out .2s;
}
.mainArea>.container_artist:hover {
	background-color: rgb(240, 240, 240);
}

.container_fix_artist {
	position: fixed;
	margin-left: 24px;
	display: grid;
	grid-template-columns: 50px auto 100px;
	width: calc(100% - 248px);
	background-color: rgb(242, 242, 242);
	height: 50px;
}
.all{
  user-select: none;
}
</style>