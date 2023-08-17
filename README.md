# netPlayer

## 简介

<img src="build/icon.png" width="100px">

![vue](https://img.shields.io/badge/vue.js-2.6.14-green?logo=vue.js)
![Electron](https://img.shields.io/badge/Electron-13-white)
![Antd](https://img.shields.io/badge/Antd-1.7.8-blue)
![axios](https://img.shields.io/badge/axios-1.4-orange)
![crypto-js](https://img.shields.io/badge/crypto_js-4.1.1-yellow)

![License](https://img.shields.io/badge/License-MIT-dark_green)

**基于Subsonic API的桌面端播放器**

## 更新日志

### 1.0.0 (2023/8/12)
- 第一个版本

### 1.0.1 (2023/8/13)
- 可以在歌单中搜索
- 改进菜单

### 1.1.0 (随同1.2.0发布)
- 添加搜索功能
- 可以在搜索内容中播放
- 修复一些错误

### 1.2.0 (开发中)
- 在任何地方可以看到喜欢的歌曲
- 可以添加活着取消喜欢歌曲
- 可以新建或删除播放列表
- 添加一些操作功能，包括
  - 播放当前歌曲
  - 添加到喜欢的歌曲
  - 从喜欢的歌曲中删除
  - 添加到现有的歌单
  - 从现有的歌单中删除

## Subsonic API

[关于所有的API点此](http://www.subsonic.org/pages/api.jsp)

## 开发进度

- [x] Electron框架 (2023/8/4)
- [x] 登录页面 (2023/8/4)
- [x] 登录功能 (2023/8/4)
- [x] 侧边栏设计 (2023/8/5)
  - [x] 用户信息部分
  - [x] 功能按钮部分
  - [x] 自动加载歌单
- [x] 界面切换入口 (2023/8/5)
- [x] 关于界面 (2023/8/5)
- [x] 播放栏设计 (2023/8/8)
- [x] 播放列表设计 (2023/8/6)
- [x] 播放列表功能 (2023/8/6)
- [x] 记住上一次的播放列表 (2023/8/9)
- [x] Electron菜单完善 (2023/8/11)
- [x] 快捷键控制 (2023/8/11)
- [x] 刷新列表 (2023/8/11)
- [x] 专辑和艺人显示 (2023/8/11)
  - [x] 专辑
  - [x] 艺人
- [x] 绘制图标 (2023/8/12)
- [x] 兼容Windows (2023/8/12)
- [x] 搜索功能 (2023/8/14)
  - [x] 搜索艺人
  - [x] 搜索歌曲
  - [x] 搜索专辑
- [x] 喜欢的歌曲操作 (2023/8/16)
  - [x] 添加到我喜欢的歌曲
  - [x] 从我喜欢的歌曲列表中删除
- [ ] 播放列表操作
  - [x] 添加到播放列表
  - [x] 从播放列表中删除
  - [ ] 新添播放列表
  - [ ] 删除播放列表