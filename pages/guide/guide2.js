const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    durationCheck: 'year'
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

  switchDuration: function (e){
    app.globalData.clockInfo.duration = e.currentTarget.dataset.value;
    this.setData({
      durationCheck: e.currentTarget.dataset.value
    })
  }
})