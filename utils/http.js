function request(url,callBack){
  console.log("收到的 callBack 是：", callBack); // 打印函数引用
  wx.request({
    url:url,
    success(res){
      console.log("请求成功，准备传递数据：", res.data);
        callBack(res.data)
    }
  })
};

function requestMove(url,id,title,callBack){
  wx.request({
    url:url,
    success(res){
        callBack(res.data,id,title)
        // callBack(res.data,res.data.results[0].id,res.data.results[0].title)
    }
  })
};
module.exports={
  request:request,
  requestMove:requestMove
}

