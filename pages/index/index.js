//index.js
var util = require('../../utils/util.js');  
//获取应用实例
const app = getApp()
const weekArr = ["7", "1", "2", "3", "4", "5", "6"];
var now = new Date();
var start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
var heatMapList = [];

Page({
  data: {
    leapYear: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    reWeekArr: [],
    title: "五月天演唱会打卡"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.addWeek();
    this.loadData();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  addWeek: function(e) {
    var reWeek = [];
    for (var k = 0; k < 7; k++) {
      var milliseconds = start.getTime() + 1000 * 60 * 60 * 24 * k;
      var newDate = new Date(milliseconds);
      var index = newDate.getDay();
      reWeek.push(weekArr[index]);
      this.setData({
        reWeekArr: reWeek
      })
    }
  },
  //单向上传 若请求同步再同步
  loadData: function() {
    var pageobj = this;
    wx.getStorage({
      key: 'heatdata',
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          for (var key in res.data[i]) {
            var days = new Date(key).getTime() - start.getTime();
            var diff = parseInt(days / (1000 * 60 * 60 * 24));
            pageobj.setData({
              ['item_' + diff]: 'green'
            })
          }
        }
      },
      fail: function(res){
        //无数据 
      }
    })
  },
  showDetail: function(e) {
    var date = e.currentTarget.dataset.id;
    var milliseconds = start.getTime() + 1000 * 60 * 60 * 24 * date;
    var newDate = new Date(milliseconds);

    
    console.log(util.formatTime(newDate));
  },
  addData: function(e) {
    heatMapList.push({[new Date()]: 1 });
    wx.setStorage({
      key: "heatdata",
      data: heatMapList
    })
    this.loadData();
  }
})
