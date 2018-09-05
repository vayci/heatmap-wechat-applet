Page({
  data: {
    animationData: {}
  },
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease',
    })

    this.animation = animation
      

    animation.opacity(1).step({duration: 3000 })
    this.setData({
      animationData: animation.export()
    })
  },
  start: function(e) {
    console.log('淡出并跳转');
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.opacity(0).step({ duration: 2000 })
    this.setData({
      animationData: animation.export()
    })
  }
})