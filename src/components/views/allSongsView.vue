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
  </div>
</template>

<script>
export default {
  data() {
    return {
      subTitle: "",
      inputSearch: ""
    }
  },
  methods: {
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
}
</script>