<template>
  <div>
    <a-page-header 
      title="所有歌曲"
			:sub-title="subTitle">
			<template slot="extra">
				<div class="toolBar">
					<a-input-search placeholder="输入搜索内容" style="width: 200px;margin-right: 20px;"
						@search="onSearch" allowClear v-model="inputSearch" @change="onSearch" />
					<a-button icon="redo" type="primary" shape="round" @click="reloadList"></a-button>
				</div>
			</template>
		</a-page-header>

    <div class="container_fix">
      <div class="item">序号</div>
      <div class="item">歌曲名</div>
      <div class="item">歌手</div>
      <div class="item">时长</div>
      <div class="item">
        <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z"
            fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div class="item">
        <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.94971 11.9497H39.9497" stroke="#000000" stroke-width="4" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M7.94971 23.9497H39.9497" stroke="#000000" stroke-width="4" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M7.94971 35.9497H39.9497" stroke="#000000" stroke-width="4" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
// var axios=require("axios")
export default {
  data() {
    return {
      subTitle: "",
      inputSearch: ""
    }
  },
  methods: {
    requestAllSongs() {
			// axios.get(url+"/rest/getRandomSongs?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token+"&size=500")
      // .then((response)=>{
      //   resp=response.data['subsonic-response'];
      // })
      // .catch(()=>{
      //   resp=null;
      // })
		},
    onSearch() {
			if (this.inputSearch == "") {
				this.isSearch = false;
			}
			this.isSearch = true;
			this.searchList = this.filterArrayByString(this.shownList, this.inputSearch);
		},
    reloadList(){
      // TODO 重载歌曲
    }
  },
  created() {
    
  },
}
</script>

<style scoped>
.item {
	display: flex;
	align-items: center;
	padding-left: 10px;
	font-size: 14px;
}

.container_fix {
	position: fixed;
	margin-left: 24px;
	display: grid;
	grid-template-columns: 50px auto 150px 70px 50px 50px;
	width: calc(100% - 248px);
	background-color: rgb(242, 242, 242);
	height: 50px;
}
</style>