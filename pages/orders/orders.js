// pages/orders/orders.js
let app=getApp();  //getApp() 是一个系统提供的 API，调用它能够拿到小程序的全局实例对象
let http=require('../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{
      nowplaying:{},
      popular:{},
      upcoming:{}
    },
    imgList:[
     { src: '/img/coffee.png',
      name:'人间开门红',
      rating:4.6,
      stars: []
     },
      { src: '/img/coffee.png',
        name:'星际宝贝史迪奇',
        rating:4.8,
        stars: []
      },
      { src: '/img/coffee.png',
        name:'水饺皇后',
        rating:5.0,
        stars: []
      },
      { src: '/img/coffee.png',
      name:'猎金.游戏',
      rating:4.2,
      stars: []
      },
      { src: '/img/coffee.png',
      name:'时间之子',
      rating:3.8,
      stars: []
      },
    ]

  },
  generateStars: function(rating) {
    const fullStars = Math.floor(rating); // 完整的星星数量
    const halfStar = (rating % 1) >= 0.5 ? 1 : 0; // 半星数量
    const emptyStars = 5 - fullStars - halfStar; // 空星数量
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(1); // 完整的星星
    }
    if (halfStar==1) {
      stars.push(0.5); // 半星
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(0); // 空星
    }
    return stars;
  

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

     let global=app.globalData
     let url=global.url;
     let nowplaying =global.nowplaying;
     let popular=global.popular;
     let upcoming=global.upcoming;
     let toprated=global.toprated;
     let search=global.search;
     
  http.request(url+upcoming,this.getHttp);
  http.requestMove(url+nowplaying,'nowplaying','正在上映',this.getHttp2);
  http.requestMove(url+popular,'popular','热门上映',this.getHttp2);
  http.requestMove(url+upcoming,'upcoming','即将上映',this.getHttp2);
    // wx.request({
    //   url:url+upcoming,
    //   success(res){
    //     console.log(res),
    //     console.log(res.data),
    //     console.log(res.data.results); // 打印电影列表
    //     console.log(url)
    //   }
    // });
    const updatedImgList= this.data.imgList.map(item => {
      item.stars = this.generateStars(item.rating);
      return item; // 返回更新后的 item
    });
    this.setData({ imgList: updatedImgList});
  },
  getHttp(res_send){
    console.log("在getHttp中接收到的res_send：", res_send);
     // 总电影数量
    const total = res_send.total_results; 
     // 当前页
    const currentPage = res_send.page; 
     // 时间范围
    const [startDate, endDate] = [res_send.dates.minimum, res_send.dates.maximum]; 

  console.log(`共 ${total} 条数据，当前第 ${currentPage} 页，时间范围 ${startDate} ~ ${endDate}`);
  },
  getHttp2(res,key,title){
    console.log(res,key,title);
   this.data.list[key]={
     title:title,
     move:res
   }
   this.setData({
     list:this.data.list
   })
     console.log(this.data.list);
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