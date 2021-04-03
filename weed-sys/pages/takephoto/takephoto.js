const app = getApp()
Page({
  // token:' ',
  // baseURL: `https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=`,
  /**
   * 页面的初始数据
   */
  data: {
    token:''
  },
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: res => {
        this.setData({
          filePath: res.tempFilePaths
        })
        this.readImageFile(res.tempFilePaths[0])
      }
    })
  },
  // 拍照函数
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          filePath: res.tempImagePath
        })
        this.readImageFile(res.tempImagePath)
      }
    })
  },
  readImageFile(data) {
    wx.getFileSystemManager().readFile({
      filePath: data,
      encoding: 'base64',
      success: res => {
        this.scanImageInfo(res.data)
      }
    })
  },
  // 图像识别函数
  scanImageInfo(imageData) {
    wx.showLoading({
      title: '识别中',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=' + this.data.token,
        data: {
          image: imageData,
          baike_num: '5'
        },
        method: 'POST',
        dataType: 'json',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          console.log(res)
          wx.removeStorage({
            key: 'baike_url',
          })
          wx.setStorage({
            data: {
              baike_res: res.data.result,
              filePath: this.data.filePath,
            },
            key: 'baike_url',
          })
          wx.navigateTo({
            url: '/pages/showRes/showRes',
            complete: () => {
              wx.hideLoading()
            }
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const access_token=wx.getStorageSync('access_token')
    this.setData({
      token:access_token
    })
  },
})