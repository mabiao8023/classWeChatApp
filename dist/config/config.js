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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyJdLCJuYW1lcyI6WyJhaXBDb21tb25QYXRoIiwiSG9zdCIsImFwaVBhdGgiLCJiYW5uZXJMaXN0IiwiY2xhc3NMaXN0IiwiY2xhc3NJbmZvIiwiY2xhc3NUcnkiLCJjbGFzc0NoYXB0ZXIiLCJjbGFzc1BheSIsInVzZXJDbGFzcyIsInVzZXJDaGFwdGVyIiwidXNlckFydGljbGUiLCJnZXRQZXJzb24iLCJjbGFzc1BlcmNlbnQiLCJnZXRUZXN0IiwiZ2V0VGVzdEFzayIsImdldFJhbmRBbnN3ZXIiLCJsb2dpbiIsInVwZGF0ZVVzZXJJbmZvIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLGdCQUFnQixxQkFBdEI7QUFDQSxJQUFNQyw2QkFBTjs7QUFFQSxJQUFJQyxVQUFVO0FBQ1ZDLGdCQUFjRixJQUFkLGtCQURVLEVBQ3lCO0FBQ25DRyxlQUFhSCxJQUFiLGlCQUZVLEVBRXVCO0FBQ2pDSSxlQUFhSixJQUFiLGdCQUhVLEVBR3NCO0FBQ2hDSyxjQUFZTCxJQUFaLGVBSlUsRUFJb0I7QUFDOUJNLGtCQUFnQk4sSUFBaEIsbUJBTFUsRUFLNEI7QUFDekNPLGNBQVlQLElBQVosMEJBTmEsRUFNMkI7QUFDeENRLGVBQWFSLElBQWIsd0JBUGEsRUFPMkI7QUFDeENTLGlCQUFlVCxJQUFmLG1CQVJhO0FBU2JVLGlCQUFlVixJQUFmLGtCQVRhLEVBU3VCO0FBQ3BDVyxlQUFhWCxJQUFiLGFBVmEsRUFVZ0I7QUFDN0JZLGtCQUFnQlosSUFBaEIsNEJBWGEsRUFXa0M7QUFDL0NhLGFBQVdiLElBQVgsY0FaYSxFQVllO0FBQzVCYyxnQkFBY2QsSUFBZCxrQkFiYSxFQWFzQjtBQUNuQ2UsbUJBQWlCZixJQUFqQixxQkFkYSxFQWM0QjtBQUN6Q2dCLFdBQVNoQixJQUFULGlCQWZhLEVBZWdCO0FBQzdCaUIsb0JBQWtCakIsSUFBbEIsdUJBaEJhLENBZ0IrQjtBQWhCL0IsQ0FBZDs7a0JBbUJlQyxPIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFpcENvbW1vblBhdGggPSAnL2hvbWUvYXBpRW50cnkvYXBpLyc7XHJcbmNvbnN0IEhvc3QgPSBgaHR0cHM6Ly9hLnltODgwMC5jb21gO1xyXG5cclxubGV0IGFwaVBhdGggPSB7XHJcbiAgICBiYW5uZXJMaXN0OmAke0hvc3R9L2luZGV4L2Jhbm5lcmAsIC8vIGJhbm5lcuWbvlxyXG4gICAgY2xhc3NMaXN0OmAke0hvc3R9L2luZGV4L2NsYXNzYCwgLy8g6aaW6aG16Zeu6aKY5YiX6KGoL2NsYXNzL2luZm9cclxuICAgIGNsYXNzSW5mbzpgJHtIb3N0fS9jbGFzcy9pbmZvYCwgLy8g6K++56iL54m56Imy6aG16Z2iXHJcbiAgICBjbGFzc1RyeTpgJHtIb3N0fS9jbGFzcy90cnlgLCAvLyDor77nqIvor5XlkKzliJfooahcclxuICAgIGNsYXNzQ2hhcHRlcjpgJHtIb3N0fS9jbGFzcy9jaGFwdGVyYCwgLy8g6K++56iL56ug6IqCXHJcblx0Y2xhc3NQYXk6YCR7SG9zdH0vY2xhc3MvYnV5Q2xhc3Mvd3hhcHBgLC8vIOi0reS5sOivvueoi1xyXG5cdHVzZXJDbGFzczpgJHtIb3N0fS9teV9jbGFzc19saXN0L2xpc3RgLCAvL+W3sui0reS5sOeahOaOpeWPo1xyXG5cdHVzZXJDaGFwdGVyOmAke0hvc3R9L215X2NsYXNzL2luZm9gLFxyXG5cdHVzZXJBcnRpY2xlOmAke0hvc3R9L2FydGljbGUvaW5mb2AsIC8v5bey6LSt5Lmw5paH56ug5o6l5Y+jXHJcblx0Z2V0UGVyc29uOmAke0hvc3R9L21lL2luZm9gLCAvLyDojrflj5bkuKrkurrkv6Hmga9cclxuXHRjbGFzc1BlcmNlbnQ6YCR7SG9zdH0vbXlfY2xhc3MvbGVhcm5fcGVyY2VudGAsIC8vIOa3u+WKoOivvueoi+i/m+W6plxyXG5cdGdldFRlc3Q6YCR7SG9zdH0vdGVzdC9nZXRgLCAvL+iOt+WPlua1i+ivlVxyXG5cdGdldFRlc3RBc2s6YCR7SG9zdH0vdGVzdC9nZXRfYXNrYCwgLy8g6I635Y+W5rWL6K+V55qE6Zeu6aKYXHJcblx0Z2V0UmFuZEFuc3dlcjpgJHtIb3N0fS90ZXN0L2dldF9hbnN3ZXJgLCAvLyDojrflj5bpmo/mnLrpl67pophcclxuXHRsb2dpbjpgJHtIb3N0fS93eGFwcC9sb2dpbmAsIC8vIOeZu+W9leaOpeWPo1xyXG5cdHVwZGF0ZVVzZXJJbmZvOmAke0hvc3R9L3d4YXBwL3VzZXIvdXBkYXRlYCwgLy8g5pu05paw55So5oi35L+h5oGvXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaVBhdGhcclxuIl19