'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});
var aipCommonPath = '/home/apiEntry/api/';
var Host = 'https://zucaib.com';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyJdLCJuYW1lcyI6WyJhaXBDb21tb25QYXRoIiwiSG9zdCIsImFwaVBhdGgiLCJiYW5uZXJMaXN0IiwiY2xhc3NMaXN0IiwiY2xhc3NJbmZvIiwiY2xhc3NUcnkiLCJjbGFzc0NoYXB0ZXIiLCJjbGFzc1BheSIsInVzZXJDbGFzcyIsInVzZXJDaGFwdGVyIiwidXNlckFydGljbGUiLCJnZXRQZXJzb24iLCJjbGFzc1BlcmNlbnQiLCJnZXRUZXN0IiwiZ2V0VGVzdEFzayIsImdldFJhbmRBbnN3ZXIiLCJsb2dpbiIsInVwZGF0ZVVzZXJJbmZvIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLGdCQUFnQixxQkFBdEI7QUFDQSxJQUFNQywyQkFBTjs7QUFFQSxJQUFJQyxVQUFVO0FBQ1ZDLGdCQUFjRixJQUFkLGtCQURVLEVBQ3lCO0FBQ25DRyxlQUFhSCxJQUFiLGlCQUZVLEVBRXVCO0FBQ2pDSSxlQUFhSixJQUFiLGdCQUhVLEVBR3NCO0FBQ2hDSyxjQUFZTCxJQUFaLGVBSlUsRUFJb0I7QUFDOUJNLGtCQUFnQk4sSUFBaEIsbUJBTFUsRUFLNEI7QUFDekNPLGNBQVlQLElBQVosMEJBTmEsRUFNMkI7QUFDeENRLGVBQWFSLElBQWIsd0JBUGEsRUFPMkI7QUFDeENTLGlCQUFlVCxJQUFmLG1CQVJhO0FBU2JVLGlCQUFlVixJQUFmLGtCQVRhLEVBU3VCO0FBQ3BDVyxlQUFhWCxJQUFiLGFBVmEsRUFVZ0I7QUFDN0JZLGtCQUFnQlosSUFBaEIsNEJBWGEsRUFXa0M7QUFDL0NhLGFBQVdiLElBQVgsY0FaYSxFQVllO0FBQzVCYyxnQkFBY2QsSUFBZCxrQkFiYSxFQWFzQjtBQUNuQ2UsbUJBQWlCZixJQUFqQixxQkFkYSxFQWM0QjtBQUN6Q2dCLFdBQVNoQixJQUFULGlCQWZhLEVBZWdCO0FBQzdCaUIsb0JBQWtCakIsSUFBbEIsdUJBaEJhLENBZ0IrQjtBQWhCL0IsQ0FBZDs7a0JBb0JlQyxPIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFpcENvbW1vblBhdGggPSAnL2hvbWUvYXBpRW50cnkvYXBpLyc7XHJcbmNvbnN0IEhvc3QgPSBgaHR0cHM6Ly96dWNhaWIuY29tYDtcclxuXHJcbmxldCBhcGlQYXRoID0ge1xyXG4gICAgYmFubmVyTGlzdDpgJHtIb3N0fS9pbmRleC9iYW5uZXJgLCAvLyBiYW5uZXLlm75cclxuICAgIGNsYXNzTGlzdDpgJHtIb3N0fS9pbmRleC9jbGFzc2AsIC8vIOmmlumhtemXrumimOWIl+ihqC9jbGFzcy9pbmZvXHJcbiAgICBjbGFzc0luZm86YCR7SG9zdH0vY2xhc3MvaW5mb2AsIC8vIOivvueoi+eJueiJsumhtemdolxyXG4gICAgY2xhc3NUcnk6YCR7SG9zdH0vY2xhc3MvdHJ5YCwgLy8g6K++56iL6K+V5ZCs5YiX6KGoXHJcbiAgICBjbGFzc0NoYXB0ZXI6YCR7SG9zdH0vY2xhc3MvY2hhcHRlcmAsIC8vIOivvueoi+eroOiKglxyXG5cdGNsYXNzUGF5OmAke0hvc3R9L2NsYXNzL2J1eUNsYXNzL3d4YXBwYCwvLyDotK3kubDor77nqItcclxuXHR1c2VyQ2xhc3M6YCR7SG9zdH0vbXlfY2xhc3NfbGlzdC9saXN0YCwgLy/lt7LotK3kubDnmoTmjqXlj6NcclxuXHR1c2VyQ2hhcHRlcjpgJHtIb3N0fS9teV9jbGFzcy9pbmZvYCxcclxuXHR1c2VyQXJ0aWNsZTpgJHtIb3N0fS9hcnRpY2xlL2luZm9gLCAvL+W3sui0reS5sOaWh+eroOaOpeWPo1xyXG5cdGdldFBlcnNvbjpgJHtIb3N0fS9tZS9pbmZvYCwgLy8g6I635Y+W5Liq5Lq65L+h5oGvXHJcblx0Y2xhc3NQZXJjZW50OmAke0hvc3R9L215X2NsYXNzL2xlYXJuX3BlcmNlbnRgLCAvLyDmt7vliqDor77nqIvov5vluqZcclxuXHRnZXRUZXN0OmAke0hvc3R9L3Rlc3QvZ2V0YCwgLy/ojrflj5bmtYvor5VcclxuXHRnZXRUZXN0QXNrOmAke0hvc3R9L3Rlc3QvZ2V0X2Fza2AsIC8vIOiOt+WPlua1i+ivleeahOmXrumimFxyXG5cdGdldFJhbmRBbnN3ZXI6YCR7SG9zdH0vdGVzdC9nZXRfYW5zd2VyYCwgLy8g6I635Y+W6ZqP5py66Zeu6aKYXHJcblx0bG9naW46YCR7SG9zdH0vd3hhcHAvbG9naW5gLCAvLyDnmbvlvZXmjqXlj6NcclxuXHR1cGRhdGVVc2VySW5mbzpgJHtIb3N0fS93eGFwcC91c2VyL3VwZGF0ZWAsIC8vIOabtOaWsOeUqOaIt+S/oeaBr1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpUGF0aFxyXG4iXX0=