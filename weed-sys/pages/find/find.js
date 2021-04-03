Page({

  /**
   * 页面的初始数据
   */
  data: {
    articalList: []
  },
  linkUrl(e) {
    wx.showToast({
      icon:'none',
      title: '公众号未关联',
    })
    // const url = e.currentTarget.dataset.url
    // // 微信小程序页面跳转的参数如果过长或者传的参数本身就含有‘？’标志的时候，会中断传的参数
    // wx.navigateTo({
    //   url: '/pages/scan/scan?URL=' + encodeURIComponent(JSON.stringify(url)),
    // })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    wx.getStorage({
      key: 'articalList',
      complete: res => {
        // console.log(res)
        if (res.data) {
          this.setData({
            articalList: res.data
          })
        } else {
          wx.showLoading({
            title: '加载中',
          })
          wx.cloud.callFunction({
            name: 'dataOpera'
          }).then(res => {
            // console.log(res)
            wx.hideLoading()
            wx.setStorage({
              data: res.result,
              key: 'articalList',
            })
            this.setData({
              articalList: res.result
            })
          })
        }
      }
    })
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