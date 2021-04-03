const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    weedList: [],
    delWeed: [],
    searchValue: '',
    searchList: [],
    isShow: true
  },
  // taken = '24.60641d608a67cdfb208b0cbb311d15bd.2592000.1612085082.282335-23475068',
  // baseUrl = `https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=${this.taken}`,
  modWeed(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/modifyPage/modifyPage?weed_id=' + e.target.dataset.id,
    })
  },
  delWeed(e) {
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          db.collection('weedList').doc(e.target.dataset.id).remove().then(res => {
            wx.showToast({
              title: '删除成功',
            })
            this.onShow()
          })
        }
      }
    })

  },

  handleSearch() {
    if (this.data.searchValue !== '') {
      this.setData({
        isShow:false
      })
      // console.log(this.data.searchValue)
      let res = this.data.weedList.filter(weed => {
        return weed.weedName.match(this.data.searchValue)
      })
      this.setData({
        searchList: res,
      })
      // console.log(res)
    }else{
      this.setData({
        isShow:true
      })
    }
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
    db.collection('weedList').get().then(res => {
      // console.log(res)
      this.setData({
        weedList: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      searchValue:'',
      isShow: true
    })
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