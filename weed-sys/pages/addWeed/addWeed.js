const db = wx.cloud.database()
// pages/addWeed/addWeed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    weedName:'',
    weedPrev:'',
    weedCons:''
  },
  formsubmit(e) {
    this.setData({
        weedName:e.detail.value.weedName,
        weedCons:e.detail.value.weedCons,
        weedPrev:e.detail.value.weedPrev
    })
    if(this.data.imageList.length !== 0){
      this.savaWeed()
      wx.showLoading({
        title: '上传中',
      })
    }else{
      wx.showToast({
        title: '请选择图片',
      })
    }
  },
  savaWeed(){
    db.collection('weedList').add({
      data:{
        weedName:this.data.weedName,
        weedCons:this.data.weedCons,
        weedPrev:this.data.weedPrev,
        weedImage:this.data.imageList
      }
    }).then(res=>{
      wx.hideLoading({
        success: (res) => {
          wx.switchTab({
            url: '../list/list',
            success:res=>{
              this.setData({
                weedName:'',
                weedPrev:'',
                weedCons:'',
                imageList:[]
              })
            }
          })
        },
      })
    })
  },
  chooseImg(e) {
    wx.chooseImage({
      count: 1,
      success: res => {
        this.setData({
          imageList: res.tempFilePaths
        })
        this.data.imageList = [] 
          // 上传云存储
          wx.cloud.uploadFile({
            cloudPath: this.timeName(new Date()),
            filePath: res.tempFilePaths[0],
            success: res => {
              this.data.imageList.push(res.fileID)
            },
            fail: err => {
              console.log(err)
            }
          })
      }
    })
  },
  timeName(time) {
    let random = Math.floor(Math.random() * (9999 - 1000)) + 1000
    let src = random + '_' + time.getMilliseconds() + '.png'
    return src
  },
  previewImg(e) {
    let index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.imageList[index],
      urls: this.data.imageList,
    })
  },
  removeImg(e) {
    let index = e.currentTarget.dataset.index
    this.data.imageList.splice(index, 1)
    this.setData({
      imageList: this.data.imageList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if(options.weed_id){
    //   db.collection('weedList').doc(options.weed_id).get().then(res=>{
    //     console.log('修改页面')
    //     this.setData({
    //       modifyData:res.data
    //     })
    //     console.log(typeof this.data.modifyData)
    //   })
    // }else{
    //   console.log('添加页面')
    // }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})