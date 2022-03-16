const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mentorObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { mentor_id } = options;
    this.getMentorDetail(mentor_id);
  },

  getMentorDetail(mentor_id){
    db.collection('mentorList').where({
      _id: mentor_id
    }).get().then(res => {
      console.log(res.data[0]);
      this.setData({
        mentorObj: res.data[0]
      })
    })
  }
})