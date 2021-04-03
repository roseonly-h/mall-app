// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  // https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=HkR9ayY29iGawGv8qaqm8Mqs&client_secret=VjzdDbUxATNmUwxOXn7oUKoZZ3ytB4Am&
  // taken:'24.f1bc2f9649c5788ed48ecaabc90c7310.2592000.1615014176.282335-23635920',
  // baseURL:'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=24.f1bc2f9649c5788ed48ecaabc90c7310.2592000.1615014176.282335-23635920',
  turnAddWeed(){
    wx.navigateTo({
      url: '/pages/addWeed/addWeed',
    })
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