// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    if(!wx.cloud){
      console.error('cloud error');
    }else{
      wx.cloud.init({
        env: 'cloud1-7g7nu5mob4ede963',
        traceUser: true,
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
