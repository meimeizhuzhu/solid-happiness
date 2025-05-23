// pages/Backhome/Backhome.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    listData:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    console.log(options.user)
    console.log(typeof (options.user))//字符串类型

    if (options.user) {
      try {
        // 先解码，再解析 JSON
        const userData = JSON.parse(decodeURIComponent(options.user));
        console.log(userData); // 打印解析后的数据
        this.setData({
          listData:userData ,// 将数据存储到页面的 data 
         
        }, () => {
          // 数据更新后的回调函数
          console.log('After setData:', this.data.listData); // 检查数据是否正确设置
          console.log(typeof this.data.listData); // 打印更新后的数据类型
        });
      } catch (error) {
        console.error('解析 JSON 时出错：', error);
      }
     
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})