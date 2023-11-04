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
    }
  },
  methods: {
    onSearch(){},
    reloadList(){},
    loadList(){
      axios.get(this.userInfo.url+"/rest/getIndexes?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token)
      .then((response)=>{
        // console.log(response.data['subsonic-response']);
        var tmp=response.data['subsonic-response'].indexes.index.map(item => item.artist);

        for(var item1 in tmp){
          for(var item2 in tmp[item1]){
            this.shownList.push(tmp[item1][item2])
          }
        }
        // console.log(this.shownList);
        this.subTitle="合计"+this.shownList.length+"位艺人"
      })
      .catch(()=>{
        this.$message.error("请求所有艺人出错")
      })
    }
  },
  created() {
    this.loadList();
  },
}
</script>