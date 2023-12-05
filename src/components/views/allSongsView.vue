<template>
  <div class="all">
    <a-page-header title="所有歌曲">
      <template slot="subTitle">
        <div class="subTitleSlot">
          <div>{{ subTitle }}</div>
          <a-tooltip placement="bottom" :title="subTitleTip" v-if="shownList.length>=500">
            <svg class="subTitleIcon" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke="#000000" stroke-width="4" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 37C25.3807 37 26.5 35.8807 26.5 34.5C26.5 33.1193 25.3807 32 24 32C22.6193 32 21.5 33.1193 21.5 34.5C21.5 35.8807 22.6193 37 24 37Z" fill="#000000"/><path d="M24 12V28" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a-tooltip>
        </div>
      </template>
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

    <div class="mainArea">
      <div v-for="(item, index) in isSearch ? searchList : shownList" :key="index" @dblclick="playSong(index)"
        :class="isPlaying(index) ? 'container_playing' : 'container'">
        <div class="item">
          <div class="itemContent" v-if="!isPlaying(index)">{{ index + 1 }}</div>
          <div class="itemContent" v-else><a-icon type="caret-right" /></div>
        </div>
        <div class="item">
          <div class="itemContent">{{ item.title }}</div>
        </div>
        <div class="item">
          <div class="itemContent">{{ item.artist }}</div>
        </div>
        <div class="item">
          <div class="itemContent">{{ getSongTime(item.duration) }}</div>
        </div>
        <div class="item">
          <div class="itemContent"><svg v-if="isLoved(item)" width="16" height="16" viewBox="0 0 48 48" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z"
                fill="none" stroke="#ff0000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            </svg></div>
        </div>
        <div class="item" style="padding-left: 0;">
          <a-dropdown :trigger="['click']">
            <div class="songOp itemContent">
              <a-icon type="more" />
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="play_menu(index)">
                <a-icon type="play-circle" />
                播放
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="2" @click="addTo_menu(item)">
                <a-icon type="unordered-list" />
                添加到歌单…
              </a-menu-item>
              <a-menu-item key="3" disabled>
                <a-icon type="delete" />
                从歌单中删除
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="4" v-if="isLoved(item)" @click="deLove_menu(item)">
                <svg width="12" height="12" style="margin-right: 8px;" viewBox="0 0 48 48" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C25.1936 41.9295 26.5616 41.3098 28.0099 40.5"
                    stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M34.959 27L41.8375 35.5" stroke="#000000" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M41.8375 27L34.959 35.5" stroke="#000000" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                取消喜欢
              </a-menu-item>
              <a-menu-item key="4" v-else @click="love_menu(item)">
                <svg width="12" height="12" style="margin-right: 8px;" viewBox="0 0 48 48" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z"
                    fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                喜欢
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </div>
    <a-modal v-model="addDialog" title="添加到歌单…" on-ok="handleOk" centered class="dialog">
			<template slot="footer">
				<a-button key="back" @click="handleCancel">
					取消
				</a-button>
				<a-button key="submit" type="primary" @click="handleOk" :disabled="addListID == ''">
					添加
				</a-button>
			</template>
			<div>
				<a-radio-group v-model="addListID">
					<a-radio v-for="(item, index) in songList" :key="index" :value="item.id" :style="radioStyle">
						{{ item.name }}
					</a-radio>
				</a-radio-group>
			</div>
		</a-modal>
  </div>
</template>

<script>
var axios=require("axios")
export default {
  data() {
    return {
      subTitle: "",
      inputSearch: "",
      isSearch: false,
      shownList: [],
      listID: "",

      opSong: {},
      addDialog: false,
      addListID: "",

      radioStyle: {
				display: 'block',
				height: '30px',
				lineHeight: '30px',
			},

      searchList: [],

      subTitleTip: `注意，鉴于Subsonic API限制，你所看到的500首歌曲是随机获取的500首歌曲经过排序得到的`,
    }
  },
  props: {
    userInfo: Object,
    nowPlay: Object,
    lovedSongs: Array,
    nowPage: String,

    songList: Array,
  },
  methods: {
    love_menu(item) {
      this.$emit("loveSong", item);
		},
		deLove_menu(item) {
      this.$emit("deloveSong", item);
		},
    handleOk() {
			this.addToSongList();
		},
    addToSongList() {
      this.$emit("addToSongList", this.opSong.id, this.addListID)
		},
    addTo_menu(item) {
			this.opSong = item;
			this.addDialog = true;
		},
    playSong(index) {
			var nowPlay = {};
      var playIndex=index;
      if(this.isSearch){
        playIndex=this.shownList.findIndex(obj => obj.id == this.searchList[index].id);
        if(playIndex==-1){
          this.$message.error("播放出错");
          return;
        }
      }
			nowPlay = {
        listName: this.nowPage,
        index: playIndex,
        nowPlayList: this.shownList,
        id: this.listID,
        isPlay: false,
      }
			this.$emit('playSong', nowPlay)
		},
    isLoved(item) {
			for (const obj of this.lovedSongs) {
				if (obj.id == item.id) {
					return true;
				}
			}
			return false;
		},
    getSongTime(duration) {
			var min = parseInt(duration / 60);
			var sec = duration % 60;
			return sec < 10 ? min + ":0" + sec : min + ":" + sec
		},
    isPlaying(index) {
			if (this.isSearch == true) {
				return false;
			} else if (index == this.nowPlay.index && this.nowPlay.listName == "allSongs") {
				return true;
			}
			return false;
		},
    play_menu(index) {
			this.playSong(index);
		},
    requestAllSongs() {
			axios.get(this.userInfo.url+"/rest/getRandomSongs?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&size=500")
      .then((response)=>{
        var tmp=response.data["subsonic-response"].randomSongs.song;
        tmp.sort(function(a,b){
          return a.created>b.created ? -1 : 1;
        });
        this.shownList=tmp;
        if(this.shownList.length>=500){
          this.subTitle="合计≥500首歌";
        }else{
          this.subTitle="合计"+this.shownList.length+"首歌";
        }
      })
      .catch(()=>{
        this.$message.error("加载所有歌曲出错!");
      })
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
      // console.log(this.userInfo.url+"/rest/getRandomSongs?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&size=500");
      axios.get(this.userInfo.url+"/rest/getRandomSongs?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&size=500")
      .then((response)=>{
        var tmp=response.data["subsonic-response"].randomSongs.song;
        tmp.sort(function(a,b){
          return a.created>b.created ? -1 : 1;
        });
        if(this.nowPlay.listName=="allSongs"){
          var tmpId=this.nowPlay.nowPlayList[this.nowPlay.index].id;
          var index=tmp.findIndex(obj => obj.id==tmpId);
          if(index==-1){
            this.shownList=tmp;
            if(this.shownList.length>=500){
              this.subTitle="合计≥500首歌";
            }else{
              this.subTitle="合计"+this.shownList.length+"首歌";
            }
            this.$emit("stopAudio");
            this.$message.success("已刷新");
            return;
          }
          var tmpNowPlay={
            listName: "allSongs",
            index: index,
            nowPlayList: tmp,
            id: "",
            isPlay: this.nowPlay.isPlay,
          }
          this.$emit("updateNowPlay", tmpNowPlay)
        }
        this.shownList=tmp;
        this.$emit("reloadLoved");
        this.$message.success("已刷新");
        if(this.shownList.length>=500){
          this.subTitle="合计≥500首歌";
        }else{
          this.subTitle="合计"+this.shownList.length+"首歌";
        }
      })
      .catch(()=>{
        this.$message.error("重新加载出错!");
      })
    },
    handleCancel() {
			this.addDialog = false;
			this.addListID = "";
		},
    handleClose(){
      this.addDialog = false;
			this.addListID = "";
    }
  },
  created() {
    this.requestAllSongs();
  },
  watch: {
    inputSearch: function (newVal) {
			if (newVal == "") {
				this.isSearch = false;
			}
		},
  },
}
</script>

<style scoped>
.subTitleIcon{
  margin-left: 5px;
  opacity: .45;
}
svg:focus{
  outline: none;
}
.subTitleSlot{
  display: flex;
  align-items: center;
}
.container, .container_playing {
	display: grid;
	grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 150px - 70px - 50px - 50px) 150px 70px 50px 50px;
	width: 100%;
	height: 50px;
	transition: all ease-in-out .2s;
}
.mainArea>.container:hover {
	background-color: rgb(240, 240, 240);
}
.item {
	display: flex;
	align-items: center;
	padding-left: 10px;
	font-size: 14px;
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

.container_fix {
	position: fixed;
	margin-left: 24px;
	display: grid;
	grid-template-columns: 50px auto 150px 70px 50px 50px;
	width: calc(100% - 248px);
	background-color: rgb(242, 242, 242);
	height: 50px;
}
.itemContent {
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: left;
	white-space: nowrap;
}
.container_playing {
	/* background-color: rgb(235, 235, 235); */
	/* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3); */
	color: rgb(24, 144, 255);
	font-weight: bolder;
}
.songOp:hover {
	/* color: white; */
	/* background-color: rgb(140, 140, 140); */
	cursor: pointer;
}
.all{
  user-select: none;
}
.songOp {
	display: flex;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
	padding-top: 10px;
	padding-bottom: 10px;
	margin-right: 10px;
	transition: all ease-in-out .2s;
}

</style>