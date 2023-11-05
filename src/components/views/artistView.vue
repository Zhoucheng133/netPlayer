<template>
  <div>
    <a-page-header 
      title="艺人"
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
      <div class="item">艺人</div>
      <div class="item">专辑数量</div>
    </div>
    <div class="mainArea" v-if="!isSearch">
      <div class="container_artist" v-for="(item, index) in shownList" :key="index" @dblclick="showArtistContent(item)">
        <div class="item">
          <div class="itemContent">{{ index + 1 }}</div>
        </div>
        <div class="item">
          <div class="itemContent">{{ item.name }}</div>
        </div>
        <div class="item">
          <div class="itemContent">{{ item.albumCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios=require("axios");
export default {
  props: {
    userInfo: Object,
  },
  data() {
    return {
      inputSearch: "",
      subTitle: "",
      shownList: [],
      isSearch: false,
    }
  },
  methods: {
    showArtistContent(){
      // TODO 艺人信息
    },
    onSearch(){
      // TODO 搜索
    },
    reloadList(){
      axios.get(this.userInfo.url+"/rest/getIndexes?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token)
      .then((response)=>{
        var tmp=response.data['subsonic-response'].indexes.index.map(item => item.artist);

        for(var item1 in tmp){
          for(var item2 in tmp[item1]){
            this.shownList.push(tmp[item1][item2]);
          }
        }
        this.subTitle="合计"+this.shownList.length+"位艺人";
        this.$message.success("已刷新");
      })
      .catch(()=>{
        this.$message.error("请求所有艺人出错");
      })
    },
    loadList(){
      axios.get(this.userInfo.url+"/rest/getIndexes?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token)
      .then((response)=>{
        var tmp=response.data['subsonic-response'].indexes.index.map(item => item.artist);

        for(var item1 in tmp){
          for(var item2 in tmp[item1]){
            this.shownList.push(tmp[item1][item2]);
          }
        }
        // console.log(this.shownList);
        this.subTitle="合计"+this.shownList.length+"位艺人";
      })
      .catch(()=>{
        this.$message.error("请求所有艺人出错");
      })
    }
  },
  created() {
    this.loadList();
  },
}
</script>

<style scoped>
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

.container_fix_artist {
	position: fixed;
	margin-left: 24px;
	display: grid;
	grid-template-columns: 50px auto 100px;
	width: calc(100% - 248px);
	background-color: rgb(242, 242, 242);
	height: 50px;
}
</style>