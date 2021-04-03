const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    singleWeed:[]
  },
  previewImg() {
    wx.previewImage({
      urls: this.data.singleWeed.weedImage,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('weedList').doc(options.weed_id).get().then(res=>{
      this.setData({
        singleWeed:res.data
      })
      // console.log(this.data.singleWeed)
    })
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
    // let pages = getCurrentPages();
    // let currentPage = pages[pages.length - 1]
    // // console.log(currentPage)
    // let options = currentPage.options
    // // console.log(options)
    // db.collection('weedList').doc(options.weed_id).get().then(res=>{
    //   this.setData({
    //     singleWeed:res.data
    //   })
    //   // console.log(this.data.singleWeed)
    // })
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