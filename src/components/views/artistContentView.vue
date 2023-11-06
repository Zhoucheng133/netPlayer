<template>
  <div class="all">
    <a-page-header 
      :title="'艺人: '+artistName"
      @back="back">
			<template slot="extra">
				<a-button icon="redo" type="primary" shape="round" @click="reloadList"></a-button>
			</template>
		</a-page-header>
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
    }
  },
  methods: {
    back(){
      this.$emit("closeArtistContent");
    },
    requestArtistContent(){
      aixos.get(this.userInfo.url+"/rest/getArtist?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&id="+this.selectedArtistId)
      .then((response)=>{
        console.log(response.data);
      })
    },
    reloadList(){

    }
  },
  created() {
    
  },
}
</script>