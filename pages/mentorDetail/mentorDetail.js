const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mentor_id: "",
    array: [],
    index: 0,
    mentorObj: {},
    sourcePath:'',
    dstFilePath:'',
    sourceName:'请上传pdf/png/jpg格式文件',
    url: ''
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
    this.setData({
      mentor_id: mentor_id
    })
    this.getMentorDetail(mentor_id);
  },

  // 选择上传的简历
  chooseFile(e){
    var self = this
    wx.chooseMessageFile({
      count: 1,
      type:'file',
      success(res){
        const x = res.tempFiles[0].path
        const y = res.tempFiles[0].name
        console.log('选择',res)
        self.setData({
          sourcePath:x,
          sourceName:y
        })
      }
    })
  },

  //提交预约表单和上传简历
  appointment_form(res){
    var {name, wechat, phone, preferred_time, summary} = res.detail.value;
    var service_type = this.data.array[this.data.index];
    console.log(name, wechat, phone, preferred_time, summary, service_type, this.data.mentor_id)

    var sourcePath = this.data.sourcePath
    var sourceName = this.data.sourceName
 
    self = this
    wx.cloud.uploadFile({
      cloudPath:'temp/'+sourceName, //这里的'temp/'是在环境中创建的文件夹
      filePath: sourcePath,
      success: res => {
        // 返回文件 ID
        console.log(res.fileID)
        db.collection('appointment').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            name: name,
            mentor_id: this.data.mentor_id,
            wechat: wechat,
            phone: phone,
            service_type: service_type,
            preferred_time: preferred_time,
            summary: summary,
            file_id: res.fileID
          },
          success: function(res) {
            console.log(res)
          }
        })
      },
      fail: console.error
    })
  },

  // 预约指导类型
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },

  // 获取导师信息
  getMentorDetail(mentor_id){
    db.collection('mentorList').where({
      _id: mentor_id
    }).get().then(res => {
      console.log(res.data[0]);
      this.setData({
        mentorObj: res.data[0],
        array: res.data[0].service
      })
    })
  }
})