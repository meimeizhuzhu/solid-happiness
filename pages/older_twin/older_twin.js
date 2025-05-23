// pages/older_twin/older_twin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    olderBirthday: "2018-05-20",// 替换为实际数据
      date: '2025-05-14' // 默认选中当前日期（格式必须为YYYY-MM-DD）
  
  },
  // 日期选择变化事件
  handleDateChange(e) {
    console.log('选择的日期:', e.detail.value)
    this.setData({
      date: e.detail.value // 更新选择的日期（自动格式化为YYYY-MM-DD）
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      startDate: '1900-01-01', // 可选开始日期
      endDate: '2049-12-31'    // 可选结束日期
    })
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