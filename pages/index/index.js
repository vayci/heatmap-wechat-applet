//index.js
var util = require('../../utils/util.js');  
//获取应用实例
const app = getApp();
const weekArr = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
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
    selectedDate: "",
    countYear: 0,
    countMonth: 0,
    countWeek: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.loadClockInfo();
    this.addWeek();
    this.loadData();
  },
  loadClockInfo: function(){
    var page = this;
    wx.getStorage({
      key: 'clockInfo',
      success: function (res) {
        page.setData({
          title: res.data.name
        })
      }
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
  //加载数据 根据本地存储 选择每天最后一条数据渲染
  loadData: function() {
    var pageobj = this;
    wx.getStorage({
      key: 'heatdata',
      success: function (res) {
          var year = 0;
          var month = 0;
          var week = 0;
          for (var key in res.data) {
            var clockDate = new Date(key);
            // 打卡时间距离热图起始时间相差天数 用于渲染
            var diff = util.dayDiff(start,clockDate);

            var diffInWeek = util.dayDiffInWeek(clockDate);
            var diffInMonth = util.dayDiffInMonth(clockDate);
            var diffInYear = util.dayDiffInYear(clockDate);

            // console.log("打卡日期:"+clockDate);
            // console.log("起始差:"+diff);
            // console.log("周差:"+diffInWeek);
            // console.log("月差:"+diffInMonth);
            // console.log("年差:"+diffInYear);

            var listLength = res.data[key].length;
            var last = res.data[key][listLength-1];// 当天取最后一个
            var lastValue = 0;
            for (var value in last){
              lastValue = last[value];
              pageobj.setData({
                ['item_' + diff]: app.globalData.clockInfo.optionList[last[value]]
              })
            }
            if (0 <= diffInWeek < 7 && lastValue > 0) {
              week++;
            }
            if (0 <= diffInMonth < 30 && lastValue > 0) {
              month++;
            }
            if (0 <= diffInYear < 365 && lastValue > 0) {
              year++;
            }

          }
        pageobj.setData({
          countYear: year,
          countMonth: month,
          countWeek: week
        })
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
    });
    wx.vibrateShort({});
    wx.showToast({
      title: '打卡成功',
      duration: 500
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
  },
  reset: function(){
    wx.showModal({
      title: '提示',
      content: '是否清除当前所有数据，重新添加新的任务（清除后数据不可恢复）',
      success: function(e){
        if(e.confirm){
          wx.clearStorage();
          wx.navigateTo({
            url: '/pages/welcome/welcome',
          })
        }
      }
    })
  }
});
