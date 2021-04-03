// pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baike_info_des: "",
    baike_info_image_url: "",
    baike_info_name: ''
  },
  previewImg(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
      success:res=>{
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'baike_url',
      success: res => {
        const result = res.data.baike_res.find(item => {
          if(item.name == options.name){
            return item
          }
        })
        if (result) {
          this.setData({
            baike_info_name: result.name,
            baike_info_des: result.baike_info.description,
            baike_info_image_url: result.baike_info.image_url
          })
        }
      }
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