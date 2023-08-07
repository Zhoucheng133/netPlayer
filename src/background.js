import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
import axios from 'axios';

protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
	const win = new BrowserWindow({
		width: 1100,
		height: 770,
		// 注意对于Windows系统需要修改frame
		// frame: false,
		titleBarStyle: 'hiddenInset',
		// resizable: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
		if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol('app')
		win.loadURL('app://./index.html')
	}
}

// 自动登录请求
ipcMain.on("autoLoginRequest", async (event, url, username, salt, token) => {
	var resp=undefined;
	await axios.post(url+"/rest/ping.view?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token)
	.then((response)=>{
		resp=response.data;
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('autoLoginResult', resp);
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
	await axios.post(url+"/rest/ping.view?v=1.13.0&c=netPlayer&f=json&u="+username+"&s="+salt+"&t="+token)
	.then((response)=>{
		resp=response.data;
	})
	.catch(()=>{
		resp=null;
	})

	event.reply('loginResult', resp, salt, token);
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
	createWindow()
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