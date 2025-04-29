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
    userInfo: null
  }
})
