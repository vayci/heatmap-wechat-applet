const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
  // + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取本周一
const getMonday = () => {
    const date = new Date();
    const day = date.getDay() || 7
    return new Date(date.getFullYear(), date.getMonth(),date.getDate() + 1 - day);
}

//获取本月1号
const getFirstDayInMonth = () =>{
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    return new Date(y, m, 1);
}

//获取本年第一天
const getFirstDayInYear = () =>{
    const date = new Date(), y = date.getFullYear();
    return new Date(y, 1, 1);
}


//传入日期与本周一相差天数
const dayDiffInWeek = date =>{
    return dayDiff(getMonday(),date);
}

//传入日期与本月1号相差天数
const dayDiffInMonth = date =>{
    return dayDiff(getFirstDayInMonth(),date);
}

//传入日期与本年第一天相差天数
const dayDiffInYear = date =>{
    return dayDiff(getFirstDayInYear(),date);
}

//计算相差多少天
const dayDiff = (date1,date2) =>{
  const timeDiff = date2.getTime() - date1.getTime();
  return parseInt(timeDiff / (1000 * 60 * 60 * 24));
}

module.exports = {
  formatTime: formatTime,
  dayDiffInWeek: dayDiffInWeek,
  dayDiffInMonth: dayDiffInMonth,
  dayDiffInYear: dayDiffInYear,
  dayDiff: dayDiff
}
