//app.js
App({
  onLaunch: function () {
    let access_token = wx.getStorageSync('access_token')
    let expire_in = wx.getStorageSync('expire_in')
    let access_token_date = parseInt(wx.getStorageSync('access_token_date'))
    let now = new Date().getTime()
    if (!access_token) {
      console.log('获取tken')
      this.requestToken()
    } else if (now > access_token_date + expire_in) {
      this.requestToken()
    }
    wx.cloud.init({
      traceUser: true,
      env: "test-vszrh"
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  },
  requestToken() {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      data: {
        grant_type: 'client_credentials',
        client_id: 'HkR9ayY29iGawGv8qaqm8Mqs',
        client_secret: 'VjzdDbUxATNmUwxOXn7oUKoZZ3ytB4Am'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode === 200) {
          // token
          wx.setStorageSync('access_token', res.data.access_token)
          // 有效时间
          wx.setStorageSync('expire_in', res.data.expires_in)
          // 存储时间
          wx.setStorageSync("access_token_date", new Date().getTime());
          // this.globalData.access_token = res.data.access_token
        }
      }
    })
  }
})