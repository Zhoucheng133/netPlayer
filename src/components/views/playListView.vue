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
export default {
  props: {
    playList: Object
  },
  data() {
    return {
      inputSearch: "",
      subTitle: ""
    }
  },
  methods: {
    change(){},
    onSearch(){},
    reloadList(){},
  },
}
</script>