// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    showModal: false,
    date: '',// 默认选中当前日期（格式必须为YYYY-MM-DD）
    startDate: '0001-01-01', // 初始化范围
    endDate: '9999-12-31',
    inputValue: ''  ,    // 输入内容
    motto: '轻松赚钱，潇洒生活',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    // 初始化9行11列的表格（空字符串占位）
    tableData: Array(9).fill().map(() => Array(11).fill('')),
    tableData_row: Array(16).fill().map(() => Array(6).fill('')),
  },

  // 输入监听
  handleInput(e){
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 日期选择变化事件
  handleDateChange(e) {
    console.log('选择的日期:', e.detail.value)
    this.setData(
      {date: e.detail.value},  // 参数1：要更新的数据
      () => {this.setFixedValues();}// 参数2：更新完成后的回调
      );

    wx.showToast({
      title: `已选择: ${ this.data.date}`,
      icon: 'none'
    });
  },
  // 修改为正确的方法定义方式
  addUntilSingleDigit: function(num) {
    if (num < 10) return num;
    const tens = Math.floor(num / 10);
    const units = num % 10;
    return this.addUntilSingleDigit(tens + units); // 注意这里要加this
  },

  onLoad() {
    // this.setData({
    //   startDate: '1900-01-01', 
    //   endDate: '2049-12-31'  
    // }),
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    this.setData({ 
      date: formattedDate, // 动态设置为当前日期
      startDate: '0001-01-01', // 保持年份限制
      endDate: '9999-12-31'
    
    }); 

      // 合并固定值到表格数据
      this.setFixedValues();
      this.setFixedData();
  },
  setFixedValues() {
    // 解构赋值：仅提取 tableData
    const { tableData } = this.data;
    // 按你的要求设置特定单元格
    tableData[0][2] = '太阳'; // 第1行第3列（索引从0开始）
    tableData[1][0] = '日';    // 第2行第1列
    tableData[1][1] =this.data.date.substring(8, 10);
    tableData[3][0] = '月';    // 第4行第1列
    tableData[3][1] =this.data.date.substring(5,7);
    tableData[5][0] = '年';    // 第6行第1列
    tableData[5][1] = this.data.date.substring(0, 2);
    tableData[7][0] = '年';    // 第8行第1列
    tableData[7][1] = this.data.date.substring(2, 4);
    tableData[8][2] = '太阴'; // 第9行第3列
    tableData[5][2] = this.addUntilSingleDigit(Number(this.data.date.substring(0, 1))+Number(this.data.date.substring(1, 2))); //少阴位
    tableData[7][2] = this.addUntilSingleDigit(Number(this.data.date.substring(2, 3))+Number(this.data.date.substring(3, 4)));//太阴位
    tableData[3][2] =this.addUntilSingleDigit(Number(this.data.date.substring(5, 6))+Number(this.data.date.substring(6, 7)));//少阳位
    tableData[1][2] =this.addUntilSingleDigit(Number(this.data.date.substring(8, 9))+Number(this.data.date.substring(9, 10))); //太阳位
    tableData[2][4] =this.addUntilSingleDigit(tableData[1][2]+ tableData[3][2]);//事业过桥位
    tableData[6][4] =this.addUntilSingleDigit(tableData[5][2]+ tableData[7][2]);//家庭过桥位
    tableData[4][5] = this.addUntilSingleDigit(tableData[2][4]+ tableData[6][4]);  //主性格
    tableData[6][6] = this.addUntilSingleDigit(tableData[2][4]+tableData[4][5]);
    tableData[2][6] = this.addUntilSingleDigit(tableData[6][4]+tableData[4][5]);
    tableData[4][8]= this.addUntilSingleDigit(tableData[6][6] +tableData[2][6] );

    tableData[0][5]= this.addUntilSingleDigit(tableData[1][2]+ tableData[2][4]);
    tableData[0][8]=this.addUntilSingleDigit(tableData[2][4]+tableData[3][2]);
    tableData[0][10]=this.addUntilSingleDigit(tableData[0][5]+tableData[0][8]);

    tableData[8][5] =this.addUntilSingleDigit(tableData[5][2]+tableData[6][4]);
    tableData[8][8] =this.addUntilSingleDigit(tableData[7][2]+tableData[6][4]);
    tableData[8][10] =this.addUntilSingleDigit( tableData[8][5]+tableData[8][8]);

    // 更新数据
    this.setData({ tableData });
  },
  setFixedData() {
    // 解构赋值：仅提取 tableData_row
    const { tableData, tableData_row } = this.data;
    tableData_row[0][1]="主性格联合码";
    tableData_row[1][1]="父亲基因联合码";
    tableData_row[2][1]="母亲基因联合码";
    tableData_row[3][1]="事业延伸码";
    tableData_row[4][1]="家庭延伸码";
    tableData_row[5][1]="当下和事业联合码";
    tableData_row[6][1]="子女和下属联合码";
    tableData_row[7][1]="晚年和情感联合码";
    tableData_row[8][1]="当下和事业延伸码";
    tableData_row[9][1]="当下和事业延伸码";
    tableData_row[10][1]="晚年和情感延伸码";
    tableData_row[11][1]="晚年和情感延伸码";
    tableData_row[12][1]="深层联合码";
    tableData_row[13][1]="外心码";
    tableData_row[14][1]="内心码";
    tableData_row[15][1]="灵魂码";
    tableData_row[0][2]=tableData[2][4];
    tableData_row[0][3]=tableData[6][4];
    tableData_row[0][4]=tableData[4][5];
    
    tableData_row[1][2]=tableData[1][2];
    tableData_row[1][3]= tableData[3][2];
    tableData_row[1][4]=tableData[2][4];

    tableData_row[2][2]= tableData[5][2];
    tableData_row[2][3]=tableData[7][2];
    tableData_row[2][4]=tableData[6][4];

    tableData_row[3][2]= tableData[2][4];
    tableData_row[3][3]=tableData[4][5];
    tableData_row[3][4]=tableData[6][6];

    tableData_row[4][2]=tableData[6][4];
    tableData_row[4][3]=tableData[4][5];
    tableData_row[4][4]=tableData[2][6];

    tableData_row[5][2]= tableData[0][5];
    tableData_row[5][3]=tableData[0][8];
    tableData_row[5][4]=tableData[0][10];

    tableData_row[6][2]= tableData[2][6];
    tableData_row[6][3]=tableData[6][6];
    tableData_row[6][4]=tableData[4][8];

    tableData_row[7][2]= tableData[8][5];
    tableData_row[7][3]=tableData[8][8];
    tableData_row[7][4]=tableData[8][10];

    tableData_row[8][2]=tableData[1][2];
    tableData_row[8][3]=tableData[2][4];
    tableData_row[8][4]=tableData[0][5];

    tableData_row[9][2]=tableData[3][2];
    tableData_row[9][3]=tableData[2][4];
    tableData_row[9][4]=tableData[0][8];

    tableData_row[10][2]= tableData[5][2];
    tableData_row[10][3]=tableData[6][4];
    tableData_row[10][4]=tableData[8][5];

    tableData_row[11][2]= tableData[7][2];
    tableData_row[11][3]= tableData[6][4];
    tableData_row[11][4]= tableData[8][8];

  
  //以下是要进行计算的
  //深层联合码
    tableData_row[12][2]=this.addUntilSingleDigit(tableData[2][4]*2);
    tableData_row[12][3]=this.addUntilSingleDigit(tableData[6][4]*2);
    tableData_row[12][4]=this.addUntilSingleDigit(tableData[4][5]*2);

    //外心码
    tableData_row[13][2]= tableData[0][10];
    tableData_row[13][3]= tableData[4][8];
    tableData_row[13][4]=tableData[8][10];
    tableData_row[13][5]=this.addUntilSingleDigit(tableData_row[13][2]+tableData_row[13][3]+tableData_row[13][4]);

   //内心码
    tableData_row[14][2]= tableData[4][5];
    tableData_row[14][3]= tableData[4][5];
    tableData_row[14][4]="=";
    tableData_row[14][5]= this.addUntilSingleDigit(tableData_row[14][2]+tableData_row[14][3]);
    
    //灵魂码
    tableData_row[15][2]= tableData[1][2];
    tableData_row[15][3]= tableData[7][2];
    tableData_row[15][4]=tableData[4][5];
    tableData_row[15][5]= this.addUntilSingleDigit(tableData_row[15][2]+tableData_row[15][3]+tableData_row[15][4])
    
    // 更新数据
        this.setData({ tableData_row });
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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