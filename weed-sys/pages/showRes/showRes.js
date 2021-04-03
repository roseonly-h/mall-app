// pages/showRes/showRes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filePath:'',
    baike_res:[]
  },
  bindImage(e){
    wx.navigateTo({
      url: '/pages/scan/scan?name='+e.target.dataset.name,
      success:()=>{
        console.log('跳转成功')
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'baike_url',
      success:res=>{
        if(res.data.baike_res){
          const result = res.data.baike_res.filter(item=>{
            return item.baike_info.image_url
          })
          this.setData({
            filePath:res.data.filePath,
            baike_res:result
          })
        }else{
          wx.showToast({
            title: '服务器错误',
            duration:1000
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