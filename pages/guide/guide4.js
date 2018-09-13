const app = getApp()
Page({

  data: {
    modeCheck: "active"
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },

  onShareAppMessage: function () {

  },

  switchMode: function (e) {
    app.globalData.clockInfo.mode = e.currentTarget.dataset.value;
    this.setData({
      modeCheck: e.currentTarget.dataset.value
    })
  },
  navigate: function(e){
    wx.setStorage({
      key: "clockInfo",
      data: app.globalData.clockInfo,
      success: function (e) {
        console.log("任务添加成功")
        // wx.navigateTo({
        //   url: '/pages/index/index?title=navigate',
        // })
        wx.reLaunch({
          url: '/pages/index/index?title=navigate',
        })
      }
    })
  }
})