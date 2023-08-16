import { app, protocol, BrowserWindow, ipcMain, Menu, globalShortcut } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
import axios from 'axios';

protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
])

let win;

async function createWindow() {
	const path = require('path');
	win = new BrowserWindow({
		width: 1100,
		height: 770,
		frame: false,
		titleBarStyle: 'hiddenInset',
		icon: path.join(__dirname, 'build/icon.png'),
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	})

	registerMediaKeyShortcuts();

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
		if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol('app')
		win.loadURL('app://./index.html')
	}
}

function createMenu() {
	const template = [
		{
			label: 'File',
			submenu: [
				{
					label:"关于 netPlayer",
					click: () => {
						win.webContents.send('toAbout');
					},
				},
				{ type: 'separator' },
				{
					label:"隐藏 netPlayer",
					role:"hide",
					accelerator: "CmdOrCtrl+H",
				},
				{
					label: '退出 netPlayer',
					accelerator: 'CmdOrCtrl+Q',
					click() {
						app.quit();
					}
				}
			]
		},
		{
			label: '编辑',
			submenu: [
				{ type: 'separator' },
				{
					label: "全选",
					role: 'selectAll'
				},
				{
					label: "重做",
					role: 'redo'
				},
				{ type: 'separator' },
				{
					label: "剪切",
					role: 'cut'
				},
				{
					label: "复制",
					role: 'copy'
				},
				{
					label: "粘贴",
					role: 'paste'
				}
			]
		},
		{
			label: "操作",
			submenu: [
				{
					label: "暂停",
					accelerator: "Space",
				},
				{
					label: "下一首",
					accelerator: "CmdOrCtrl+Right",
					click: () => {
						win.webContents.send('nextSong');
					},
				},
				{
					label: "上一首",
					accelerator: "CmdOrCtrl+Left",
					click: () => {
						win.webContents.send('forwSong');
					},
				}
			]
		},
		{
			label: "窗口",
			submenu: [
				{
					label:"最小化",
					role:"minimize"
				},
				{
					label:"缩放",
					role:"zoom",
				}
			]
		}
	];

	const isMac = process.platform === 'darwin';
	const menu = Menu.buildFromTemplate(template);
	if (isMac) {
		Menu.setApplicationMenu(menu);
	} else {
		Menu.setApplicationMenu(null);
	}
}

function registerMediaKeyShortcuts() {
	// 播放/暂停
	globalShortcut.register('MediaPlayPause', () => {
		win.webContents.send('toggleSong');
	});

	// 上一首
	globalShortcut.register('MediaPreviousTrack', () => {
		win.webContents.send('forwSong');
	});

	// 下一首
	globalShortcut.register('MediaNextTrack', () => {
		win.webContents.send('nextSong');
	});
}

// 搜索请求
ipcMain.on("searchRequest", async (event, url, username, salt, token, keyword) => {
	var resp=undefined;
	await axios.post(url+"/rest/search2?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token+"&query="+keyword)
	.then((response)=>{
		resp=response.data['subsonic-response'];
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('searchResult', resp);
});

// 获取专辑信息
ipcMain.on("albumContentRequest", async (event, url, username, salt, token, id) => {
	var resp=undefined;
	await axios.post(url+"/rest/getAlbum?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token+"&id="+id)
	.then((response)=>{
		resp=response.data['subsonic-response'];
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('albumContentResult', resp);
});

// 获取所有专辑
ipcMain.on("albumsRequst", async (event, url, username, salt, token) => {
	var resp=undefined;
	await axios.post(url+"/rest/getAlbumList?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token+"&type=newest&size=500")
	.then((response)=>{
		resp=response.data['subsonic-response'];
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('albumsResult', resp);
});

// 获取某个艺人的专辑
ipcMain.on("artistAlbumRequest", async (event, url, username, salt, token, id) => {
	var resp=undefined;
	await axios.post(url+"/rest/getArtist?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token+"&id="+id)
	.then((response)=>{
		resp=response.data['subsonic-response'];
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('artistAlbumResult', resp);
});

// 获取所有艺人
ipcMain.on("artistsRequest", async (event, url, username, salt, token) => {
	var resp=undefined;
	await axios.post(url+"/rest/getIndexes?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token)
	.then((response)=>{
		resp=response.data['subsonic-response'];
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('artistsResult', resp);
});

// 随机获取歌曲
ipcMain.on("allSongsRequest", async (event, url, username, salt, token) => {
	var resp=undefined;
	await axios.post(url+"/rest/getRandomSongs?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token+"&size=500")
	.then((response)=>{
		resp=response.data['subsonic-response'];
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('allSongsResult', resp);
});

// 自动登录请求
ipcMain.on("autoLoginRequest", async (event, url, username, salt, token) => {
	var resp=undefined;
	const request=new Promise((resolve)=>{
		axios.post(url+"/rest/ping.view?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token)
		.then((response)=>{
			resp=response.data;
			resolve(resp);
		})
		.catch(()=>{
			resp=null;
			resolve(resp);
		})
	})
	const timeout=new Promise((resolve)=>{
		setTimeout(() => {
			resp=null;
			resolve(resp);
		}, 2000);
	})

	Promise.race([request, timeout]).then((value) => {
		event.reply('autoLoginResult', value);
	});
});

// 从喜欢的歌曲中删除
ipcMain.on("unstarRequest", async (event, url, username, salt, token, id) => {
	var resp=undefined;
	await axios.post(url+"/rest/unstar?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token+"&id="+id)
	.then((response)=>{
		resp=response.data['subsonic-response'];
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('unstarResult', resp);
});

// 标记为喜欢的歌曲
ipcMain.on("starRequest", async (event, url, username, salt, token, id) => {
	var resp=undefined;
	await axios.post(url+"/rest/star?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token+"&id="+id)
	.then((response)=>{
		resp=response.data['subsonic-response'];
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('starResult', resp);
});

// 加载我喜爱的歌曲
ipcMain.on("lovedSongsRequest", async (event, url, username, salt, token) => {
	var resp=undefined;

	await axios.post(url+"/rest/getStarred?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token)
	.then((response)=>{
		resp=response.data['subsonic-response'];
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('lovedSongsResult', resp);
});

// 加载歌单
ipcMain.on("listRequest", async (event, url, username, salt, token, id) => {
	var resp=undefined;

	await axios.post(url+"/rest/getPlaylist?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token+"&id="+id)
	.then((response)=>{
		resp=response.data['subsonic-response'];
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('listResult', resp);
});


// 加载所有的歌单
ipcMain.on("playlistRequest", async (event, url, username, salt, token) => {
	var resp=undefined;

	await axios.post(url+"/rest/getPlaylists?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token)
	.then((response)=>{
		resp=response.data['subsonic-response'];
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('playlistResult', resp, salt, token);
});

// 登录请求
ipcMain.on("loginRequest", async (event, url, username, salt, token) => {
	var resp=undefined;
	const request=new Promise((resolve)=>{
		axios.post(url+"/rest/ping.view?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token)
		.then((response)=>{
			resp=response.data;
			// event.reply('loginResult', resp, salt, token);
			resolve({resp: resp, salt: salt, token: token});
		})
		.catch(()=>{
			resp=null;
			resolve({resp: resp, salt: salt, token: token});
			// event.reply('loginResult', resp, salt, token);
		})
	})
	const timeout=new Promise((resolve)=>{
		setTimeout(() => {
			resp=null;
			resolve({resp: resp, salt: salt, token: token});
		}, 2000);
	})

	Promise.race([request, timeout]).then((value) => {
		event.reply('loginResult', value.resp, value.salt, value.token);
	});
});

// 获取系统信息
ipcMain.on("getSysRequest",async(event)=>{
	if(process.platform == 'darwin'){
		event.reply('getSysResult', 'macOS');
	}else if(process.platform=='win32' ){
		event.reply('getSysResult', 'Windows');
	}else{
		event.reply('getSysResult', 'Linux');
	}
});

// 最小化窗口函数
ipcMain.on("winMin",async(event)=>{
	win.minimize();
}),

// 关闭窗口函数
ipcMain.on("winClose",async(event)=>{
	app.exit();
})

// 最大化窗口
ipcMain.on("winMax",async(event)=>{
	win.maximize();
})

// 还原窗口
ipcMain.on("winRestore",async(event)=>{
	win.restore();
})

app.on('window-all-closed', () => {
	app.quit()
	globalShortcut.unregisterAll();
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
	createWindow();
	createMenu();
})

if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}