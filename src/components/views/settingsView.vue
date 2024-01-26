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
        <div class="title">关闭窗口时状态栏保留<br/>(Windows系统)</div>
        <div class="content"><a-switch v-model="settingsData.closeHide" @change="settingsChanged" :disabled="disableHide" /></div>
      </div>
      <div class="item">
        <div class="title">服务器地址</div>
        <div class="content">
          <a-input v-model="settingsData.urlLink" disabled />
          <a-button style="margin-top: 5px;" @click="openURL">用浏览器打开</a-button>
        </div>
      </div>
      <div class="item">
        <div class="title">netPlayer版本</div>
        <div class="content">
          <div>{{version}}</div>
          <div class="checkUpdate" @click="checkUpdateHandler">检查更新<a-icon v-show="loading" type="loading" class="loadingIcon" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { shell } = require('electron');
const axios=require("axios");
export default {
  props: {
    userInfo: Object,
    isWindows: Boolean,
  },
  data() {
    return {
      settingsData:{
        savePlay: true,
        autoLogin: true,
        urlLink: "",
        closeHide: true,
      },
      disableHide: false,
      version: '',
      loading: false,
    }
  },
  methods: {
    checkUpdateHandler(){
      if(this.loading){
        return;
      }
      this.loading=true;
      axios.get("https://api.github.com/repos/Zhoucheng133/net-player/releases/latest")
      .then((response)=>{
        // console.log(response.data.name);
        if(response.data.name!='v'+this.version){
          this.$confirm({
            title: '检查到有新版本，是否前往下载？',
            okText: '前往下载更新',
            cancelText: '忽略',
            centered: true,
            onOk() {
              shell.openExternal('https://github.com/Zhoucheng133/net-player/releases');
            },
            onCancel() {
              return;
            },
          });
        }else{
          this.$message.success("已经是最新版本了")
        }
        this.loading=false;
      })
    },
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
    if(!this.isWindows){
      this.settingsData.closeHide=false;
      this.disableHide=true;
    }
    this.version=process.env.VUE_APP_VERSION;
  },
}
</script>

<style scoped>
.loadingIcon{
  margin-left: 5px;
}
.checkUpdate:hover{
  color: #1890ff;
}
.checkUpdate{
  text-align: left;
  margin-top: 5px;
  cursor: pointer;
  transition: all linear .2s;
}
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
  text-align: right;
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