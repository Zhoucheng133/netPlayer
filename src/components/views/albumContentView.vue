<template>
  <div class="all">
    <a-page-header 
      :title="'专辑: '+albumName"
      @back="back">
			<template slot="extra">
				<a-button icon="redo" type="primary" shape="round" @click="reloadList"></a-button>
			</template>
		</a-page-header>
  </div>
</template>

<script>
const axios=require("axios");
export default {
  props: {
    userInfo: Object,
    selectedAlbumId: String,
  },
  data() {
    return {
      albumName: "",
      inputSearch: "",
      shownList: "",
    }
  },
  methods: {
    back(){
      this.albumName="";
      this.$emit("closeAlbumContent");
    },
    reloadList(){
      axios.get(this.userInfo.url+"/rest/getAlbum?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&id="+this.selectedAlbumId)
      .then((response)=>{
        // console.log(response.data['subsonic-response']);
        this.albumName=response.data['subsonic-response'].album.name;
        this.shownList=response.data['subsonic-response'].album.song;
        this.$message.success("已刷新");
      })
      .catch(()=>{
        this.$message.error("请求专辑信息出错");
      })
    },
    onSearch(){

    },
    requestAlbumContent(id){
      axios.get(this.userInfo.url+"/rest/getAlbum?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&id="+id)
      .then((response)=>{
        // console.log(response.data['subsonic-response']);
        this.albumName=response.data['subsonic-response'].album.name;
        this.shownList=response.data['subsonic-response'].album.song;
      })
      .catch(()=>{
        this.$message.error("请求专辑信息出错");
      })
    }
  },
}
</script>

<style scoped>
.all{
  user-select: none;
}
</style>