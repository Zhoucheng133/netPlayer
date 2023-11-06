<template>
	<div>
    <a-page-header title="搜索">
			<template slot="extra">
			</template>
		</a-page-header>
    <div class="searchArea">
      <a-input-search v-model="inputValue" @search="onSearch" enter-button placeholder="输入你要搜索的内容"></a-input-search>
      <a-tabs default-active-key="song" @change="callback" :animated="shownAnimation">
        <a-tab-pane key="song" tab="单曲">
          <div v-if="shownList.length == 0">对关键字进行搜索</div>
          <div v-else>
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
              <div v-for="(item, index) in shownList.song" :key="index"
                :class="isPlaying(index) ? 'container_playing' : 'container'" @dblclick="playSong(index)">
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
                    <a-menu slot="overlay" class="forcePosition">
                      <a-menu-item key="1" @click="play_menu(index)">
                        <a-icon type="play-circle" />
                        播放
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item key="2" @click="addTo_menu(item)">
                        <a-icon type="unordered-list" />
                        添加到歌单…
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
          </div>
        </a-tab-pane>
        <a-tab-pane key="artist" tab="艺人">
          <div v-if="shownList.length == 0">对关键字进行搜索</div>
          <div v-else>
            <div class="container_fix_artist">
              <div class="item">序号</div>
              <div class="item">艺人</div>
              <div class="item">专辑数量</div>
            </div>
            <div class="mainArea">
              <div class="container_artist" v-for="(item, index) in shownList.artist" :key="index"
                @dblclick="showArtistContent(item)">
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
        </a-tab-pane>
        <a-tab-pane key="album" tab="专辑">
          <div v-if="shownList.length == 0">对关键字进行搜索</div>
          <div v-else>
            <div class="container_fix_artist">
              <div class="item">序号</div>
              <div class="item">专辑名称</div>
              <div class="item">歌曲数</div>
            </div>
            <div class="mainArea">
              <div class="container_artist" v-for="(item, index) in shownList.album" :key="index"
                @dblclick="showAlbumContent(item)">
                <div class="item">
                  <div class="itemContent">{{ index + 1 }}</div>
                </div>
                <div class="item">
                  <div class="itemContent">{{ item.title }}</div>
                </div>
                <div class="item">
                  <div class="itemContent">{{ item.songCount }}</div>
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
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
		nowPlay: Object,
		lovedSongs: Array,
    userInfo: Object,
    songList: Array
	},
	data() {
		return {
			shownAnimation: false,

			shownList: [],
			inputValue: "",

      opSong: {},
      addDialog: false,
      addListID: "",

      radioStyle: {
				display: 'block',
				height: '30px',
				lineHeight: '30px',
			},
		}
	},
	methods: {
    handleCancel() {
			this.addDialog = false;
			this.addListID = "";
		},
    handleClose(){
      this.addDialog = false;
			this.addListID = "";
    },
    handleOk() {
			this.addToSongList();
		},
		love_menu(item) {
      this.$emit("loveSong", item);
		},
		deLove_menu(item) {
      this.$emit("deloveSong", item);
		},
    addToSongList() {
      this.$emit("addToSongList", this.opSong.id, this.addListID)
		},
		addTo_menu(item) {
			this.opSong = item;
			this.addDialog = true;
		},
		play_menu(index) {
			this.playSong(index);
		},
		isLoved(item) {
			for (const obj of this.lovedSongs) {
				if (obj.id == item.id) {
					return true;
				}
			}
			return false;
		},
		isPlaying(index) {
			if (index == this.nowPlay.index && this.inputValue == this.nowPlay.id) {
				return true;
			}
			return false;
		},
		playSong(index) {
			var nowPlay = {
				listName: "search",
				index: index,
				nowPlayList: this.shownList.song,
				id: this.inputValue,
				isPlay: false,
			}
			this.$emit("playSong", nowPlay);
		},
		showArtistContent(item) {
      this.$emit("toArtist", item.id);
		},
		showAlbumContent(item) {
      console.log(item);
      this.$emit("toAlbum", item.id);
		},
		getSongTime(duration) {
			var min = parseInt(duration / 60);
			var sec = duration % 60;
			return sec < 10 ? min + ":0" + sec : min + ":" + sec
		},
		onSearch() {
			if (this.inputValue == '') {
				this.shownList = [];
			} else {
				axios.get(this.userInfo.url+"/rest/search2?v=1.13.0&c=netPlayer&f=json&u="+this.userInfo.username+"&s="+this.userInfo.salt+"&t="+this.userInfo.token+"&query="+this.inputValue)
        .then((response)=>{
          this.shownList = response.data["subsonic-response"]["searchResult2"];
          console.log(this.shownList.song);
        })
        .catch(()=>{
          this.$message.error("搜索出错")
        })
			}
		},
    callback(){},
	},
	watch: {
		inputValue: function (newVal) {
			if (newVal == "") {
				this.onSearch();
			}
		}
	}
}
</script>

<style scoped>
.forcePosition {
	transform: translate(-90px);
}

.songOp:hover {
	/* color: white; */
	cursor: pointer;
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

.container_playing {
	display: grid;
	grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 150px - 70px - 50px - 50px) 150px 70px 50px 50px;
	width: 100%;
	height: 50px;
	transition: all ease-in-out .2s;
	/* background-color: rgb(235, 235, 235);
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3); */
  color: rgb(24, 144, 255);
	font-weight: bolder;
}

.mainArea>.container_artist:hover {
	background-color: rgb(240, 240, 240);
}

.container_artist {
	display: grid;
	grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 100px) 100px;
	/* width: 100%; */
	height: 50px;
	transition: all ease-in-out .2s;
}

.container_fix_artist {
	position: fixed;
	display: grid;
	grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 100px) 100px;
	/* width: 100%; */
	background-color: rgb(242, 242, 242);
	height: 50px;
}

.mainArea>.container:hover {
	background-color: rgb(240, 240, 240);
}

.mainArea {
	overflow-y: overlay;
	overflow-x: hidden;
	position: fixed;
	margin-top: 50px;
	width: calc(100vw - 200px - 48px);
	height: calc(100vh - 30px - 64px - 32px - 44px - 50px);
	padding-bottom: 130px;
}

.item {
	display: flex;
	align-items: center;
	padding-left: 10px;
	font-size: 14px;
}

.itemContent {
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: left;
	white-space: nowrap;
}

.container {
	display: grid;
	grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 150px - 70px - 50px - 50px) 150px 70px 50px 50px;
	/* width: 100%; */
	height: 50px;
	transition: all ease-in-out .2s;
}

.container_fix {
	position: fixed;
	display: grid;
	grid-template-columns: 50px calc(100vw - 200px - 48px - 50px - 150px - 70px - 50px - 50px) 150px 70px 50px 50px;
	/* width: 100%; */
	background-color: rgb(242, 242, 242);
	height: 50px;
}
.searchArea {
	margin-left: 24px;
	margin-right: 24px;
	/* width: calc(100% - 248px); */
  user-select: none;
}
</style>