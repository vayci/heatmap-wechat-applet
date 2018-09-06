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
    title: "你的打卡记录",
    selectedDate: ""
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
    if (app.globalData.clockInfo.name){
      this.setData({
        title: app.globalData.clockInfo.name
      })
    }
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
  //加载数据 根据本地存储 选择每天最后一条数据渲染
  loadData: function() {
    var pageobj = this;
    wx.getStorage({
      key: 'heatdata',
      success: function (res) {
          for (var key in res.data) {
            var days = new Date(key).getTime() - start.getTime();
            var diff = parseInt(days / (1000 * 60 * 60 * 24));
            var listLength = res.data[key].length;
            var last = res.data[key][listLength-1];// 当天取最后一个
            for (var value in last){
              pageobj.setData({
                ['item_' + diff]: app.globalData.clockInfo.optionList[last[value]]
              })
            }
          }
      }
    })
  },
  //点击显示详情
  showDetail: function(e) {
    var date = e.currentTarget.dataset.id;
    var milliseconds = start.getTime() + 1000 * 60 * 60 * 24 * date;
    var newDate = new Date(milliseconds);
    this.setData({
      selectedDate: util.formatTime(newDate)
    })
  },
  //添加打卡数据
  addData: function(e) {
    var pageobj = this;
    var value = e.currentTarget.dataset.value;
    var heatdata = wx.getStorage({
      key: 'heatdata',
      //本地存储有数据
      success: function(res) {

        var currentDateList = res.data[util.formatTime(new Date())];
        // 有数据 但没有当天数据
        if(currentDateList == undefined){
          res.data[util.formatTime(new Date())] = [{ [new Date()]: value }];
      
        }
        //有当天数据
        else {
          currentDateList.push({ [new Date()]: value });
          res.data[util.formatTime(new Date())] = currentDateList;
        }
        pageobj.setHeatDataAndReload(res.data);
      },
      //本地存储无数据
      fail: function(res) {

        var obj = { [util.formatTime(new Date())]: [{ [new Date()]: value }] };
        pageobj.setHeatDataAndReload(obj);
      }
    })
  },
  //更新本地存储并重新渲染Heatmap
  setHeatDataAndReload: function(data){
    var pageobj = this;
    wx.setStorage({
      key: "heatdata",
      data: data,
      success: function (e) {
        pageobj.loadData();
      }
    })
  }
})
