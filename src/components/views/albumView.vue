<template>
  <div class="all">
    <a-page-header 
      title="专辑"
			:sub-title="subTitle">
			<template slot="extra">
				<div class="toolBar">
					<a-input-search placeholder="输入搜索内容" style="width: 200px;margin-right: 20px;"
						@search="onSearch" allowClear v-model="inputSearch" @change="onSearch" />
					<a-button icon="redo" type="primary" shape="round" @click="reloadList"></a-button>
				</div>
			</template>
		</a-page-header>
    <div class="container_fix_artist">
      <div class="item">序号</div>
      <div class="item">专辑名称</div>
      <div class="item">歌曲数</div>
    </div>
    <div class="mainArea">
      <div class="container_artist" v-for="(item, index) in isSearch ? searchList : shownList" :key="index" @dblclick="showAlbumContent(item)">
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
const axios=require("axios");
export default {
  props: {
    userInfo: Object
  },
  data() {
    return {
      isSearch: false,
      searchList: [],
      shownList: [],
      inputSearch: "",
      subTitle: "",
    }
  },
  methods: {
    showAlbumContent(item){
      this.$emit("showAlbumContent", item.id);
    },
    filterArrayByString(inputArray, searchString) {
			return inputArray.filter(obj => {
				return Object.values(obj).some(value => {
					return typeof value === 'string' && value.toLowerCase().includes(searchString.toLowerCase());
				});
			});
		},
    onSearch() {
			if (this.inputSearch == "") {
				this.isSearch = false;
        return;
			}
			this.isSearch = true;
			this.searchList = this.filterArrayByString(this.shownList, this.inputSearch);
		},
    reloadList(){
      axios.get(this.userInfo.url+"/rest/getAlbumList?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&type=newest&size=500")
      .then((response)=>{
        // console.log(response.data['subsonic-response']);
        this.shownList=response.data['subsonic-response'].albumList.album;
        this.$message.success("已刷新")
      })
      .catch(()=>{
        this.$message.error("请求所有专辑出错")
      })
    },
    loadList(){
      axios.get(this.userInfo.url+"/rest/getAlbumList?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&type=newest&size=500")
      .then((response)=>{
        // console.log(response.data['subsonic-response']);
        this.shownList=response.data['subsonic-response'].albumList.album;
        this.subTitle="合计"+this.shownList.length+"个专辑"
      })
      .catch(()=>{
        this.$message.error("请求所有专辑出错")
      })
    }
  },
  created() {
    this.loadList();
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
.toolBar {
	display: flex;
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