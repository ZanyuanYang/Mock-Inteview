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

    // open id
    this.getOpenid();
  },

  // 获取用户openid
  getOpenid: function() {
    var app = this;
    var openidStor = wx.getStorageSync('openid');
    if (openidStor) {
      app.globalData.openid = openidStor;
    } else {
      wx.cloud.callFunction({
        name: 'getOpenid',
        success(res) {
          var openid = res.result.openid;
          wx.setStorageSync('openid', openid)
          app.globalData.openid = openid;
        },
        fail(res) {
          console.log('云函数获取失败', res)
        }
      })
    }
  },

  globalData: {
    userInfo: {},
    openid: null,
  }
})
