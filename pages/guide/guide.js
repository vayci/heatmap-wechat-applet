const app = getApp()

Page({

  data: {

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

  setName: function (e){
    app.globalData.clockInfo.name = e.detail.value
    app.globalData.clockInfo.id = new Date().getTime
  }
})