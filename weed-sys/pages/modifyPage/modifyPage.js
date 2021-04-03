const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modifyData: {},
    weedName: '',
    weedPrev: '',
    weedCons: ''
  },
  id: '',
  formsubmit(e) {
    this.setData({
      weedName: e.detail.value.weedName,
      weedCons: e.detail.value.weedCons,
      weedPrev: e.detail.value.weedPrev
    })
      this.savaWeed()
      wx.showLoading({
        title: '修改中',
      })
  },
  savaWeed() {
    db.collection('weedList').doc(this.id).update({
      data: {
        weedName: this.data.weedName,
        weedCons: this.data.weedCons,
        weedPrev: this.data.weedPrev
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
                weedCons:''
              })
            }
          })
        },
      })
    })
  },
  previewImg(){
    wx.previewImage({
      urls: this.data.modifyData.weedImage,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.weed_id
    console.log(options)
    db.collection('weedList').doc(this.id).get().then(res => {
      console.log('修改页面')
      this.setData({
        modifyData: res.data
      })
      console.log(this.data.modifyData)
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