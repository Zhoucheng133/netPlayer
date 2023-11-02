<template>
  <div>
    <a-page-header 
      :title=playList.name
			:sub-title="subTitle">
			<template slot="extra">
				<div class="toolBar">
					<a-input-search placeholder="输入搜索内容" style="width: 200px;margin-right: 20px;"
						@search="onSearch" allowClear v-model="inputSearch" @change="onSearch" />
					<a-button icon="redo" type="primary" shape="round" @click="reloadList"></a-button>
				</div>
			</template>
		</a-page-header>
  </div>
</template>

<script>
const axios=require("axios");
export default {
  props: {
    playList: Object,
    userInfo: Object,
  },
  data() {
    return {
      inputSearch: "",
      subTitle: "",

      isSearch: false,
      shownList: [],
      listID: "",
    }
  },
  methods: {
    onSearch(){
      // 搜索列表
    },
    reloadList(){
      // TODO 重新加载列表
    },
    getList(){
      const that=this;
      this.$nextTick(()=>{
        console.log(that.playList);
        if(that.playList!=null && that.playList.id!=null && that.playList.id!=undefined){
          axios.post(that.userInfo.url+"/rest/getPlaylist?v=1.13.0&c=netPlayer&f=json&u="+that.userInfo.username+"&s="+that.userInfo.salt+"&t="+that.userInfo.token+"&id="+that.playList.id)
          .then((response)=>{
            response=response.data['subsonic-response'];
            console.log(response);
          })
          .catch(()=>{
            that.$message.error("加载歌单内容出错")
          })
        }
      });
    }
  },
}
</script>