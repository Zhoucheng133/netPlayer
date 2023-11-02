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
const axios=require("axios");
export default {
  props: {
    playList: Object,
    userInfo: Object,
    nowPlay: Object,
    songList: Array,
    lovedSongs: Array,
    nowPage: String,
  },
  data() {
    return {
      inputSearch: "",
      subTitle: "",

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
    }
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
			nowPlay = {
        listName: this.nowPage,
        index: index,
        nowPlayList: this.shownList,
        id: this.playList.id,
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
			} else if (index == this.nowPlay.index && this.nowPlay.listName == this.nowPage && this.nowPlay.id == this.playList.id) {
				return true;
			}
			return false;
		},
    play_menu(index) {
			this.playSong(index);
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
    handleCancel() {
			this.addDialog = false;
			this.addListID = "";
		},
    handleClose(){
      this.addDialog = false;
			this.addListID = "";
    },
    reloadList(){
      // TODO 重新加载列表
    },
    getList(){
      const that=this;
      this.$nextTick(()=>{
        // console.log(that.playList);
        if(that.playList!=null && that.playList.id!=null && that.playList.id!=undefined){
          axios.post(that.userInfo.url+"/rest/getPlaylist?v=1.13.0&c=netPlayer&f=json&u="+that.userInfo.username+"&s="+that.userInfo.salt+"&t="+that.userInfo.token+"&id="+that.playList.id)
          .then((response)=>{
            response=response.data['subsonic-response'];
            // console.log(response);
            this.shownList=response.playlist.entry;
          })
          .catch(()=>{
            that.$message.error("加载歌单内容出错")
          })
        }
      });
    }
  },
}
</script>

<style scoped>
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