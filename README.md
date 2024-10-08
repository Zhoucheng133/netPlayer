# netPlayer

> [!WARNING]
> 注意，这是一个停止更新的仓库，**如果你要寻找最新的桌面版netPlayer**，请转至[**netPlayer Next**](https://github.com/Zhoucheng133/netPlayer-Next)。

## 简介

<img src="build/icon.png" width="100px">

![License](https://img.shields.io/badge/License-MIT-dark_green)

**基于Subsonic API的桌面端播放器**

[**netPlayer Next**](https://github.com/Zhoucheng133/netPlayer-Next) | **★ netPlayer** | [**netPlayer Mobile**](https://github.com/Zhoucheng133/netPlayer-Mobile)

> [!WARNING]
新版本的netPlayer (v2.0.0~)不支持Windows 7系统，**如果你想寻找兼容Windows 7的netPlayer，可以在本仓库Release页寻找v1版本的netPlayer**

||v1 (当前仓库) |v2|v3|
|-|-|-|-|
|支持Windows版本|Windows7~|Windows10~|Windows10~|
|支持macOS|✅|✅|✅*|
|单曲循环|❌|✅|✅|
|定位歌曲|❌|✅|✅|
|全局快捷键|仅macOS|✅|✅|
|WebSocket服务|❌|❌|✅|

\* 由于本人换电脑，macOS没法打包，如果你有需要可以在自己的设备上打包v3版本(所以也不清楚macOS版本的运行情况，欢迎给予反馈!)

> [!NOTE]
> 受限于Subsonic API，“所有歌曲”和“专辑”只能显示500首/张（随机的500首歌曲排序展示）


## 在你的设备上配置netPlayer

> [!NOTE]
> 如果你想要查找`v2.0.0`及之后版本的代码和配置指南，跳转到[**netPlayer Next**](https://github.com/Zhoucheng133/netPlayer-Next)，下文的的配置适用于`v1.x`版本

由于本项目没有区分`正在开发的版本`和`发布的版本`，如果你需要获取可以正确执行的代码，**不要直接下载最新的代码! 请在Tag中选择最新的版本下载（或者在Release中下载Source code）**

### 环境配置

- node@16.18.0，**新版本可能无法运行**

- yarn包管理器<sup>*</sup>

  ```bash
  npm install -g yarn
  ```

<sup>*</sup>**如果你处于国内的网络环境，注意配置yarn和Electron的镜像地址或者代理**

### 运行或Debug

1. 进入项目文件夹

   ```bash
   cd net-player
   ```

2. 下载依赖文件

   ```bash
   yarn install
   ```

3. 运行和Debug

   ```bash
   # Debug模式
   yarn run electron:serve
   # 发布模式
   yarn run electron:build
   ```   


## 更新日志

见[netPlayer Next](https://github.com/Zhoucheng133/netPlayer-Next)仓库

## Subsonic API

[关于所有的API点此](http://www.subsonic.org/pages/api.jsp)

## 歌词API

[关于歌词的API点此](https://lrclib.net/docs)
