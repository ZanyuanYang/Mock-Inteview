
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourcePath:'',
    dstFilePath:'',
    sourceName:'',
    url: ''
  },

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
  
  uploadFile(){
    var sourcePath = this.data.sourcePath
    var sourceName = this.data.sourceName
 
    self = this
    wx.cloud.uploadFile({
      cloudPath:'temp/'+sourceName, //这里的'temp/'是在环境中创建的文件夹
      filePath: sourcePath,
      success: res => {
        // 返回文件 ID
        console.log(res.fileID)
      },
      fail: console.error
    })
  },

  downloadFile(){
    wx.cloud.downloadFile({
      fileID: 'cloud://cloud1-7g7nu5mob4ede963.636c-cloud1-7g7nu5mob4ede963-1309473899/temp/hopital.pdf', // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        this.setData({
          url: res.tempFilePath
        })
        wx.openDocument({
          filePath: res.tempFilePath,
          fileType: 'pdf'
        })
      },
      fail: console.error
    })    
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