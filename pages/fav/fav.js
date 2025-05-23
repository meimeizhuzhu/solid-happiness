// pages/fav/fav.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay:true ,
    interval:3000 ,
    circular:true,
       swiperList:[
         {
             id:0,
             imgUrl:'http://localhost:3000/images/flower1.png'
         },
         {
             id:1,
             imgUrl:'http://localhost:3000/images/flower2.png'
         },
         {
             id:2,
             imgUrl:'http://localhost:3000/images/flower3.png'
         }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  toHomePage(){
    wx.switchTab({
      url: '/pages/index/index',
    })
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