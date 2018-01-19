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
				login: Host + '/wxapp/login' // 登录接口
};

exports.default = apiPath;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyJdLCJuYW1lcyI6WyJhaXBDb21tb25QYXRoIiwiSG9zdCIsImFwaVBhdGgiLCJiYW5uZXJMaXN0IiwiY2xhc3NMaXN0IiwiY2xhc3NJbmZvIiwiY2xhc3NUcnkiLCJjbGFzc0NoYXB0ZXIiLCJjbGFzc1BheSIsInVzZXJDbGFzcyIsInVzZXJDaGFwdGVyIiwidXNlckFydGljbGUiLCJnZXRQZXJzb24iLCJjbGFzc1BlcmNlbnQiLCJnZXRUZXN0IiwiZ2V0VGVzdEFzayIsImdldFJhbmRBbnN3ZXIiLCJsb2dpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxnQkFBZ0IscUJBQXRCO0FBQ0EsSUFBTUMsMkJBQU47O0FBRUEsSUFBSUMsVUFBVTtBQUNWQyxnQkFBY0YsSUFBZCxrQkFEVSxFQUN5QjtBQUNuQ0csZUFBYUgsSUFBYixpQkFGVSxFQUV1QjtBQUNqQ0ksZUFBYUosSUFBYixnQkFIVSxFQUdzQjtBQUNoQ0ssY0FBWUwsSUFBWixlQUpVLEVBSW9CO0FBQzlCTSxrQkFBZ0JOLElBQWhCLG1CQUxVLEVBSzRCO0FBQ3pDTyxjQUFZUCxJQUFaLDBCQU5hLEVBTTJCO0FBQ3hDUSxlQUFhUixJQUFiLHdCQVBhLEVBTzJCO0FBQ3hDUyxpQkFBZVQsSUFBZixtQkFSYTtBQVNiVSxpQkFBZVYsSUFBZixrQkFUYSxFQVN1QjtBQUNwQ1csZUFBYVgsSUFBYixhQVZhLEVBVWdCO0FBQzdCWSxrQkFBZ0JaLElBQWhCLDRCQVhhLEVBV2tDO0FBQy9DYSxhQUFXYixJQUFYLGNBWmEsRUFZZTtBQUM1QmMsZ0JBQWNkLElBQWQsa0JBYmEsRUFhc0I7QUFDbkNlLG1CQUFpQmYsSUFBakIscUJBZGEsRUFjNEI7QUFDekNnQixXQUFTaEIsSUFBVCxpQkFmYSxDQWVnQjtBQWZoQixDQUFkOztrQkFtQmVDLE8iLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYWlwQ29tbW9uUGF0aCA9ICcvaG9tZS9hcGlFbnRyeS9hcGkvJztcclxuY29uc3QgSG9zdCA9IGBodHRwczovL3p1Y2FpYi5jb21gO1xyXG5cclxubGV0IGFwaVBhdGggPSB7XHJcbiAgICBiYW5uZXJMaXN0OmAke0hvc3R9L2luZGV4L2Jhbm5lcmAsIC8vIGJhbm5lcuWbvlxyXG4gICAgY2xhc3NMaXN0OmAke0hvc3R9L2luZGV4L2NsYXNzYCwgLy8g6aaW6aG16Zeu6aKY5YiX6KGoL2NsYXNzL2luZm9cclxuICAgIGNsYXNzSW5mbzpgJHtIb3N0fS9jbGFzcy9pbmZvYCwgLy8g6K++56iL54m56Imy6aG16Z2iXHJcbiAgICBjbGFzc1RyeTpgJHtIb3N0fS9jbGFzcy90cnlgLCAvLyDor77nqIvor5XlkKzliJfooahcclxuICAgIGNsYXNzQ2hhcHRlcjpgJHtIb3N0fS9jbGFzcy9jaGFwdGVyYCwgLy8g6K++56iL56ug6IqCXHJcblx0Y2xhc3NQYXk6YCR7SG9zdH0vY2xhc3MvYnV5Q2xhc3Mvd3hhcHBgLC8vIOi0reS5sOivvueoi1xyXG5cdHVzZXJDbGFzczpgJHtIb3N0fS9teV9jbGFzc19saXN0L2xpc3RgLCAvL+W3sui0reS5sOeahOaOpeWPo1xyXG5cdHVzZXJDaGFwdGVyOmAke0hvc3R9L215X2NsYXNzL2luZm9gLFxyXG5cdHVzZXJBcnRpY2xlOmAke0hvc3R9L2FydGljbGUvaW5mb2AsIC8v5bey6LSt5Lmw5paH56ug5o6l5Y+jXHJcblx0Z2V0UGVyc29uOmAke0hvc3R9L21lL2luZm9gLCAvLyDojrflj5bkuKrkurrkv6Hmga9cclxuXHRjbGFzc1BlcmNlbnQ6YCR7SG9zdH0vbXlfY2xhc3MvbGVhcm5fcGVyY2VudGAsIC8vIOa3u+WKoOivvueoi+i/m+W6plxyXG5cdGdldFRlc3Q6YCR7SG9zdH0vdGVzdC9nZXRgLCAvL+iOt+WPlua1i+ivlVxyXG5cdGdldFRlc3RBc2s6YCR7SG9zdH0vdGVzdC9nZXRfYXNrYCwgLy8g6I635Y+W5rWL6K+V55qE6Zeu6aKYXHJcblx0Z2V0UmFuZEFuc3dlcjpgJHtIb3N0fS90ZXN0L2dldF9hbnN3ZXJgLCAvLyDojrflj5bpmo/mnLrpl67pophcclxuXHRsb2dpbjpgJHtIb3N0fS93eGFwcC9sb2dpbmAsIC8vIOeZu+W9leaOpeWPo1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpUGF0aFxyXG4iXX0=