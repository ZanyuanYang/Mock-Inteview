const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mentor_list: []
  },
  onLoad: function (options) {

  },
  chaxun(){
    // db.collection('mentorList').get({
    //   success: function(res) {
    //     // res.data 包含该记录的数据
    //     console.log(res.data)
    //     this.setData({
    //       mentor_list: res.data
    //     })
        
    //   }
    // })
    db.collection('mentorList').get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        mentor_list: res.data
      })
      console.log(res.data)
    })
    
    console.log("mentor_list: " + this.data.mentor_list);
  }

})