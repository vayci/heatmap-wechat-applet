const app = getApp()
Page({

  data: {
    durationCheck: 'year'
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },

  switchDuration: function (e){
    app.globalData.clockInfo.duration = e.currentTarget.dataset.value;
    this.setData({
      durationCheck: e.currentTarget.dataset.value
    })
  }
})