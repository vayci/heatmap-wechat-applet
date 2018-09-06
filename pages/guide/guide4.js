// pages/guide/guide3.js
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
  }
})