var time1 = document.querySelector('.header .top');
var time2 = document.querySelector('.header .bottom');
var content = document.querySelector('.number');
var time3 = document.querySelector('.bodyer .nav .time');
var topbtn = document.querySelector('.bodyer .nav .top');
var bottombtn = document.querySelector('.bodyer .nav .bottom');

// 设置现在的时分秒
function time_1() {
    var d1 = new Date();
    var hours = zero(d1.getHours());
    var minutes = zero(d1.getMinutes());
    var seconds = zero(d1.getSeconds());
    time1.innerHTML = hours + ':' + minutes + ':' + seconds;
}
setInterval(time_1, 1000)
time_1();

// 设置现在的年月日，星期
function time_2() {
    var d2 = new Date();
    var year = d2.getFullYear();
    var month = zero(d2.getMonth() + 1);
    var day = zero(d2.getDate());
    var week = ['日', '一', '二', '三', '四', '五', '六'][d2.getDay()]
    time2.innerHTML = year + '年' + month + '月' + day + '日' + ' ' + '星期' + week;
}
time_2();

function zero(num) {
    return num < 10 ? ('0' + num) : num;
}

// 设置主内容
// 获取某个月的最后一天是几号
function getDay(year, month) {
    // new Date(2021, 2, 0).getDate()表示2021年2+1月的上一个月的最后一天
    return new Date(year, month, 0).getDate();
}
// 获得某个月的第一天是星期几
function getweek(year, month) {
    return new Date(year, month - 1, 1).getDay();
}
var d = new Date();
function setDate(d) {
    // 上个月的最后一天
    var lastmonthday = getDay(d.getFullYear(), d.getMonth());
    // 当前月的最后一天
    var monthday = getDay(d.getFullYear(), d.getMonth() + 1);
    // 当前月的第一天是周几
    var firstweek = getweek(d.getFullYear(), d.getMonth() + 1);
    var curDay = 1;//当前月的起始点
    var nextmonth = 1;
    var str = '';//主要内容的span标签集合
    var lastNum = firstweek - 1;//前一个月所占的格子数量
    if(lastNum < 0) { lastNum = 6 }

    for(var i = 0; i < 42; i++) {
        if(i < lastNum) {
            //上个月的日期
            str = '<span class="color">'+ (lastmonthday--) +'</span>' + str;
        } else if(i < lastNum+monthday) {
            var day = new Date().getDate() === curDay ? 'day' : '';
            if(d.getFullYear() !== new Date().getFullYear() || d.getMonth() !== new Date().getMonth()) {
                day = ''
            }
            str += '<span class=' + day + '>'+ (curDay++) +'</span>';
        } else {
            str += '<span class="color">'+ (nextmonth++) +'</span>'
        }
    }
    content.innerHTML = str;
    time3.innerHTML = d.getFullYear() + '年' + (zero(d.getMonth() + 1)) + '月';
}
setDate(d);

// 两个按钮的点击事件
topbtn.onclick = function() {
    d.setMonth(d.getMonth()-1)
    setDate(d)
}
bottombtn.onclick = function() {
    d.setMonth(d.getMonth()+1)
    setDate(d)
}