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

	win.setMinimumSize(1100, 770);

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
					label: "关于 netPlayer",
					click: () => {
						win.webContents.send('toAbout');
					},
				},
				{ type: 'separator' },
				{
					label: "隐藏 netPlayer",
					role: "hide",
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
					label: "最小化",
					role: "minimize"
				},
				{
					label: "缩放",
					role: "zoom",
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

// 新建歌单
ipcMain.on("newListRequest", async (event, url, username, salt, token, listName) => {
	var resp = undefined;
	await axios.post(url + "/rest/createPlaylist?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token + "&name=" + listName)
		.then((response) => {
			resp = response.data['subsonic-response'];
		})
		.catch(() => {
			resp = null;
		})

	event.reply('newListResult', resp);
});

// 重命名歌单
ipcMain.on("renameListRequest", async (event, url, username, salt, token, listID, listName) => {
	var resp = undefined;
	await axios.post(url + "/rest/updatePlaylist?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token + "&playlistId=" + listID + "&name=" + listName)
		.then((response) => {
			resp = response.data['subsonic-response'];
		})
		.catch(() => {
			resp = null;
		})

	event.reply('renameListResult', resp);
});

// 删除歌单
ipcMain.on("delListRequest", async (event, url, username, salt, token, listID) => {
	var resp = undefined;
	await axios.post(url + "/rest/deletePlaylist?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token + "&id=" + listID)
		.then((response) => {
			resp = response.data['subsonic-response'];
		})
		.catch(() => {
			resp = null;
		})

	event.reply('delListResult', resp);
});

// 加载歌单
ipcMain.on("listRequest", async (event, url, username, salt, token, id) => {
	var resp = undefined;

	await axios.post(url + "/rest/getPlaylist?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token + "&id=" + id)
		.then((response) => {
			resp = response.data['subsonic-response'];
		})
		.catch(() => {
			resp = null;
		})

	event.reply('listResult', resp);
});


// 加载所有的歌单
ipcMain.on("playlistRequest", async (event, url, username, salt, token) => {
	var resp = undefined;

	await axios.post(url + "/rest/getPlaylists?v=1.13.0&c=netPlayer&f=json&u=" + username + "&s=" + salt + "&t=" + token)
		.then((response) => {
			resp = response.data['subsonic-response'];
		})
		.catch(() => {
			resp = null;
		})

	event.reply('playlistResult', resp, salt, token);
});

// 获取系统信息
ipcMain.on("getSysRequest", async (event) => {
	if (process.platform == 'darwin') {
		event.reply('getSysResult', 'macOS');
	} else if (process.platform == 'win32') {
		event.reply('getSysResult', 'Windows');
	} else {
		event.reply('getSysResult', 'Linux');
	}
});

// 最小化窗口函数
ipcMain.on("winMin", async (event) => {
	win.minimize();
}),

	// 关闭窗口函数
	ipcMain.on("winClose", async (event) => {
		app.exit();
	})

// 最大化窗口
ipcMain.on("winMax", async (event) => {
	win.maximize();
})

// 还原窗口
ipcMain.on("winRestore", async (event) => {
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