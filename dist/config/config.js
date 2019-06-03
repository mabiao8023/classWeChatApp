'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});
var aipCommonPath = '/home/apiEntry/api/';
var Host = 'https://a.ym8800.com';

var apiPath = {
				bannerList: Host + '/index/banner', // banner图
				classList: Host + '/index/class', // 首页问题列表/class/info
				classInfo: Host + '/class/info', // 课程特色页面
				classTry: Host + '/class/try', // 课程试听列表
				classChapter: Host + '/class/chapter', // 课程章节
				classPay: Host + '/class/buyClass/wxapp', // 购买课程
				userClass: Host + '/my_class_list/list', //已购买的接口
				userChapter: Host + '/my_class/info',
				userArticle: Host + '/article/info', //已购买文章接口
				getPerson: Host + '/me/info', // 获取个人信息
				classPercent: Host + '/my_class/learn_percent', // 添加课程进度
				getTest: Host + '/test/get', //获取测试
				getTestAsk: Host + '/test/get_ask', // 获取测试的问题
				getRandAnswer: Host + '/test/get_answer', // 获取随机问题
				login: Host + '/wxapp/login', // 登录接口
				updateUserInfo: Host + '/wxapp/user/update' // 更新用户信息
};

exports.default = apiPath;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyJdLCJuYW1lcyI6WyJhaXBDb21tb25QYXRoIiwiSG9zdCIsImFwaVBhdGgiLCJiYW5uZXJMaXN0IiwiY2xhc3NMaXN0IiwiY2xhc3NJbmZvIiwiY2xhc3NUcnkiLCJjbGFzc0NoYXB0ZXIiLCJjbGFzc1BheSIsInVzZXJDbGFzcyIsInVzZXJDaGFwdGVyIiwidXNlckFydGljbGUiLCJnZXRQZXJzb24iLCJjbGFzc1BlcmNlbnQiLCJnZXRUZXN0IiwiZ2V0VGVzdEFzayIsImdldFJhbmRBbnN3ZXIiLCJsb2dpbiIsInVwZGF0ZVVzZXJJbmZvIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLGdCQUFnQixxQkFBdEI7QUFDQSxJQUFNQyw2QkFBTjs7QUFFQSxJQUFJQyxVQUFVO0FBQ1ZDLGdCQUFjRixJQUFkLGtCQURVLEVBQ3lCO0FBQ25DRyxlQUFhSCxJQUFiLGlCQUZVLEVBRXVCO0FBQ2pDSSxlQUFhSixJQUFiLGdCQUhVLEVBR3NCO0FBQ2hDSyxjQUFZTCxJQUFaLGVBSlUsRUFJb0I7QUFDOUJNLGtCQUFnQk4sSUFBaEIsbUJBTFUsRUFLNEI7QUFDekNPLGNBQVlQLElBQVosMEJBTmEsRUFNMkI7QUFDeENRLGVBQWFSLElBQWIsd0JBUGEsRUFPMkI7QUFDeENTLGlCQUFlVCxJQUFmLG1CQVJhO0FBU2JVLGlCQUFlVixJQUFmLGtCQVRhLEVBU3VCO0FBQ3BDVyxlQUFhWCxJQUFiLGFBVmEsRUFVZ0I7QUFDN0JZLGtCQUFnQlosSUFBaEIsNEJBWGEsRUFXa0M7QUFDL0NhLGFBQVdiLElBQVgsY0FaYSxFQVllO0FBQzVCYyxnQkFBY2QsSUFBZCxrQkFiYSxFQWFzQjtBQUNuQ2UsbUJBQWlCZixJQUFqQixxQkFkYSxFQWM0QjtBQUN6Q2dCLFdBQVNoQixJQUFULGlCQWZhLEVBZWdCO0FBQzdCaUIsb0JBQWtCakIsSUFBbEIsdUJBaEJhLENBZ0IrQjtBQWhCL0IsQ0FBZDs7a0JBbUJlQyxPIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFpcENvbW1vblBhdGggPSAnL2hvbWUvYXBpRW50cnkvYXBpLyc7XG5jb25zdCBIb3N0ID0gYGh0dHBzOi8vYS55bTg4MDAuY29tYDtcblxubGV0IGFwaVBhdGggPSB7XG4gICAgYmFubmVyTGlzdDpgJHtIb3N0fS9pbmRleC9iYW5uZXJgLCAvLyBiYW5uZXLlm75cbiAgICBjbGFzc0xpc3Q6YCR7SG9zdH0vaW5kZXgvY2xhc3NgLCAvLyDpppbpobXpl67popjliJfooagvY2xhc3MvaW5mb1xuICAgIGNsYXNzSW5mbzpgJHtIb3N0fS9jbGFzcy9pbmZvYCwgLy8g6K++56iL54m56Imy6aG16Z2iXG4gICAgY2xhc3NUcnk6YCR7SG9zdH0vY2xhc3MvdHJ5YCwgLy8g6K++56iL6K+V5ZCs5YiX6KGoXG4gICAgY2xhc3NDaGFwdGVyOmAke0hvc3R9L2NsYXNzL2NoYXB0ZXJgLCAvLyDor77nqIvnq6DoioJcblx0Y2xhc3NQYXk6YCR7SG9zdH0vY2xhc3MvYnV5Q2xhc3Mvd3hhcHBgLC8vIOi0reS5sOivvueoi1xuXHR1c2VyQ2xhc3M6YCR7SG9zdH0vbXlfY2xhc3NfbGlzdC9saXN0YCwgLy/lt7LotK3kubDnmoTmjqXlj6Ncblx0dXNlckNoYXB0ZXI6YCR7SG9zdH0vbXlfY2xhc3MvaW5mb2AsXG5cdHVzZXJBcnRpY2xlOmAke0hvc3R9L2FydGljbGUvaW5mb2AsIC8v5bey6LSt5Lmw5paH56ug5o6l5Y+jXG5cdGdldFBlcnNvbjpgJHtIb3N0fS9tZS9pbmZvYCwgLy8g6I635Y+W5Liq5Lq65L+h5oGvXG5cdGNsYXNzUGVyY2VudDpgJHtIb3N0fS9teV9jbGFzcy9sZWFybl9wZXJjZW50YCwgLy8g5re75Yqg6K++56iL6L+b5bqmXG5cdGdldFRlc3Q6YCR7SG9zdH0vdGVzdC9nZXRgLCAvL+iOt+WPlua1i+ivlVxuXHRnZXRUZXN0QXNrOmAke0hvc3R9L3Rlc3QvZ2V0X2Fza2AsIC8vIOiOt+WPlua1i+ivleeahOmXrumimFxuXHRnZXRSYW5kQW5zd2VyOmAke0hvc3R9L3Rlc3QvZ2V0X2Fuc3dlcmAsIC8vIOiOt+WPlumaj+acuumXrumimFxuXHRsb2dpbjpgJHtIb3N0fS93eGFwcC9sb2dpbmAsIC8vIOeZu+W9leaOpeWPo1xuXHR1cGRhdGVVc2VySW5mbzpgJHtIb3N0fS93eGFwcC91c2VyL3VwZGF0ZWAsIC8vIOabtOaWsOeUqOaIt+S/oeaBr1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcGlQYXRoXG4iXX0=