
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  bthsub(res){
    var {name, position, experience} = res.detail.value;
    db.collection('mentorList').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name: name,
        position: position,
        experience: experience,
      },
      success: function(res) {
        console.log(res)
      }
    })
  }
  
})