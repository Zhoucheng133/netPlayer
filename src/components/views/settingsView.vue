<template>
  <div>
    <a-page-header title="设置">
			<template slot="extra">
			</template>
		</a-page-header>
    <div class="main">
      <div class="item">
        <div class="title">自动保存上次播放的歌曲</div>
        <div class="content"><a-switch v-model="settingsData.savePlay" @change="settingsChanged" /></div>
      </div>
      <div class="item">
        <div class="title">自动登录</div>
        <div class="content"><a-switch v-model="settingsData.autoLogin" @change="settingsChanged" /></div>
      </div>
      <div class="item">
        <div class="title">服务器地址</div>
        <div class="content">
          <a-input v-model="settingsData.urlLink" disabled />
          <a-button style="margin-top: 5px;" @click="openURL">用浏览器打开</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { shell } = require('electron');
export default {
  props: {
    userInfo: Object,
  },
  data() {
    return {
      settingsData:{
        savePlay: true,
        autoLogin: true,
        urlLink: "",
      }
    }
  },
  methods: {
    openURL(){
      shell.openExternal(this.settingsData.urlLink);
    },
    settingsChanged(){
      localStorage.setItem('settings', JSON.stringify(this.settingsData));
    }
  },
  mounted() {
    this.settingsData.urlLink=this.userInfo.url;
    if(localStorage.getItem('settings')!=null){
      this.settingsData=JSON.parse(localStorage.getItem('settings'));
    }
  },
}
</script>

<style scoped>
.content{
  display: flex;
  /* justify-content: flex-start; */
  flex-direction: column;
  align-items: flex-start;
}
.title{
  margin-right: 20px;
  display: flex;
  justify-content: flex-end;
  /* align-items: center; */
}
.item{
  display: grid;
  grid-template-columns: 200px 250px;
  margin-top: 20px;
}
.main{
  width: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
}
</style>