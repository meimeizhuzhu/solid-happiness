// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const util = require('../../utils/util.js');
const dataJson = util.getUrl('posts');
Page({
  data: {
    
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    user: '',
    title_name:'',
},
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toEvent: function() {
    console.log(1);
    console.log(this.data.title_name); 
    wx.switchTab({
       url: '../event/event',
    });
  },
  toBackhome: function() {
    console.log(this.data.user);
    wx.navigateTo({
      url: "../Backhome/Backhome?user="+encodeURIComponent(JSON.stringify(this.data.user)),
     
    });
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onLoad: function() {
    console.log(dataJson)
     wx.request({
        //  url:"https://jsonplaceholder.typicode.com/todos/1",
        //  url:"https://jsonplaceholder.typicode.com/posts",
         url:dataJson,
         data:{
             key:'123',
             userName:"我想给后台的数据,告诉他们我是珠珠"
         },
         success: (res) => { // 箭头函数自动捕获 this
          console.log(res);
          console.log(res.data);
          console.log(res.data[0].id);
          console.log(res.data[1].title);
          this.setData({
              user: res.data, // 直接使用 this
          })
        }
      }),
      wx.request({
        url:"https://jsonplaceholder.typicode.com/todos/1",
         data:{
             key:'123',
             userName:"我想给后台的数据,告诉他们我是珠珠"
         },
         success: (res) => { // 箭头函数自动捕获 this
          console.log(res.data.title);
          this.setData({
            title_name: res.data.title // 直接使用 this
            
          })
        }
      }) 
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
