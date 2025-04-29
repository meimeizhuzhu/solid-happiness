// pages/event/event.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:"欢迎参加珠宝商学院线下课程",
    city:["北京","上海","广州","深圳"]
  },
  btn(){
   
    this.setData({
      str:"线下课改成线上课啦！"
    }),
    console.log('111我成功了')
  }, /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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