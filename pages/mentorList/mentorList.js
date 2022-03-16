const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mentor_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMentorList();
  },

  getMentorList(){
    db.collection('mentorList').get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        mentor_list: res.data
      })
      console.log(res.data)
    })
  },

  mentor_detail(event){
    var mentor_id = event.currentTarget.id;
    wx.navigateTo({
      url: '/pages/mentorDetail/mentorDetail?mentor_id=' + mentor_id
    });
  }
})