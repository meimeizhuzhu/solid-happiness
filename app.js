// app.js
App({
  onLaunch() {
    // wx.loadFontFace({
    //   family: 'iconfont',
    //   source: 'url("http://localhost:3000/font/iconfont.woff")',
    //   success(res) {
    //     console.log('字体加载成功', res);
    //   },
    //   fail(res) {
    //     console.log('字体加载失败', res);
    //   }
    // });
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  
  },
  globalData: {
    userInfo: null,
    url:"https://api.themoviedb.org",
    nowplaying:"/3/movie/now_playing?api_key=a2cc34f2165a42ef9a7ce259a208366f&language=en-US&page=1",
    popular:"/3/movie/popular?api_key=a2cc34f2165a42ef9a7ce259a208366f&language=en-US&page=1",
    upcoming:"/3/movie/upcoming?api_key=a2cc34f2165a42ef9a7ce259a208366f&language=en-US&page=1",
    toprated:"/3/movie/top_rated?api_key=a2cc34f2165a42ef9a7ce259a208366f&language=en-US&page=1",
    search:"/3/search/keyword?api_key=a2cc34f2165a42ef9a7ce259a208366f&page=1"
  }
})
