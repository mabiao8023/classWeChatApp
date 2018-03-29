'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _config = require('./config/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/class', 'pages/classDetail', 'pages/airticle', 'pages/me', 'pages/meClass'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#2cbd6c',
        navigationBarTitleText: '夜猫足球',
        navigationBarTextStyle: ''
      },
      tabBar: {
        color: '#333',
        selectedColor: '#2cbd6c',
        backgroundColor: '#fff',
        borderStyle: '#e2e2e2',
        list: [{
          pagePath: 'pages/index',
          text: '首页',
          iconPath: './images/class.png',
          selectedIconPath: './images/class-active.png'
        }, {
          pagePath: 'pages/meClass',
          text: '课程',
          iconPath: './images/f-learn.png',
          selectedIconPath: './images/f-learn-active.png'
        }, {
          pagePath: 'pages/me',
          text: '我的',
          iconPath: './images/me.png',
          selectedIconPath: './images/me-active.png'
        }]
      }
    };
    _this.globalData = {
      userInfo: null,
      sessionID: ''
    };

    _this.use('requestfix');
    _this.use('promisify');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      this.login();
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo() {
      var _this2 = this;

      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo().then(function (res) {
        _this2.globalData.userInfo = res.userInfo;
        _wepy2.default.request({
          url: _config2.default.updateUserInfo,
          method: 'POST',
          header: {
            'cookie': 'PHPSESSID=' + _this2.globalData.sessionID
          },
          data: res.userInfo
        }).then(function (res) {
          console.log(res);
        });
      });
    }

    // 登录

  }, {
    key: 'login',
    value: function login() {
      var self = this;
      //登录态过期
      _wepy2.default.login().then(function (res) {
        if (res.code) {
          console.log(res.code);
          //发起网络请求
          _wepy2.default.request({
            url: _config2.default.login,
            method: 'POST',
            data: {
              code: res.code
            }
          }).then(function (res) {
            self.globalData.sessionID = res.data.data.session_id;
            self.getUserInfo();
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      });

      // wx.checkSession({
      //     success: function(){
      //       console.log('已登录')
      //       //session 未过期，并且在本生命周期一直有效
      //     },
      //     fail: function(){

      // })
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXNzaW9uSUQiLCJ1c2UiLCJsb2dpbiIsImdldFVzZXJJbmZvIiwidGhlbiIsInJlcyIsInJlcXVlc3QiLCJ1cmwiLCJ1cGRhdGVVc2VySW5mbyIsIm1ldGhvZCIsImhlYWRlciIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwic2VsZiIsImNvZGUiLCJzZXNzaW9uX2lkIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFrREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQWhEZkEsTUFnRGUsR0FoRE47QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxhQUZLLEVBR0wsbUJBSEssRUFJTCxnQkFKSyxFQUtMLFVBTEssRUFNTCxlQU5LLENBREE7QUFTUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLE1BSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQVREO0FBZVBDLGNBQU87QUFDTEMsZUFBTSxNQUREO0FBRUxDLHVCQUFjLFNBRlQ7QUFHTEMseUJBQWdCLE1BSFg7QUFJTEMscUJBQVksU0FKUDtBQUtMQyxjQUFLLENBQ0Q7QUFDR0Msb0JBQVMsYUFEWjtBQUVHQyxnQkFBSyxJQUZSO0FBR0dDLG9CQUFTLG9CQUhaO0FBSUdDLDRCQUFpQjtBQUpwQixTQURDLEVBT0Q7QUFDR0gsb0JBQVMsZUFEWjtBQUVHQyxnQkFBSyxJQUZSO0FBR0dDLG9CQUFTLHNCQUhaO0FBSUdDLDRCQUFpQjtBQUpwQixTQVBDLEVBYUQ7QUFDR0gsb0JBQVMsVUFEWjtBQUVHQyxnQkFBSyxJQUZSO0FBR0dDLG9CQUFTLGlCQUhaO0FBSUdDLDRCQUFpQjtBQUpwQixTQWJDO0FBTEE7QUFmQSxLQWdETTtBQUFBLFVBTGZDLFVBS2UsR0FMRjtBQUNYQyxnQkFBVSxJQURDO0FBRVhDLGlCQUFVO0FBRkMsS0FLRTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUNBLFVBQUtBLEdBQUwsQ0FBUyxXQUFUO0FBSGE7QUFJZDs7OzsrQkFFVTtBQUNULFdBQUtDLEtBQUw7QUFDRDs7O2tDQUVhO0FBQUE7O0FBQ1osVUFBSSxLQUFLSixVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7QUFDRCxxQkFBS0ksV0FBTCxHQUFtQkMsSUFBbkIsQ0FBeUIsZUFBTztBQUM1QixlQUFLTixVQUFMLENBQWdCQyxRQUFoQixHQUEyQk0sSUFBSU4sUUFBL0I7QUFDQSx1QkFBS08sT0FBTCxDQUFhO0FBQ1ZDLGVBQUssaUJBQVFDLGNBREg7QUFFVkMsa0JBQU8sTUFGRztBQUdWQyxrQkFBUTtBQUNMLHFDQUF1QixPQUFLWixVQUFMLENBQWdCRTtBQURsQyxXQUhFO0FBTVZXLGdCQUFLTixJQUFJTjtBQU5DLFNBQWIsRUFPR0ssSUFQSCxDQU9TLGVBQU87QUFBRVEsa0JBQVFDLEdBQVIsQ0FBWVIsR0FBWjtBQUFrQixTQVBwQztBQVFILE9BVkQ7QUFXRDs7QUFFRDs7Ozs0QkFDTztBQUNMLFVBQUlTLE9BQU8sSUFBWDtBQUNBO0FBQ0EscUJBQUtaLEtBQUwsR0FBYUUsSUFBYixDQUFtQixlQUFPO0FBQ2hCLFlBQUlDLElBQUlVLElBQVIsRUFBYztBQUNaSCxrQkFBUUMsR0FBUixDQUFZUixJQUFJVSxJQUFoQjtBQUNFO0FBQ0EseUJBQUtULE9BQUwsQ0FBYTtBQUNYQyxpQkFBSyxpQkFBUUwsS0FERjtBQUVYTyxvQkFBTyxNQUZJO0FBR1hFLGtCQUFNO0FBQ0pJLG9CQUFNVixJQUFJVTtBQUROO0FBSEssV0FBYixFQU1HWCxJQU5ILENBTVMsZUFBTztBQUNkVSxpQkFBS2hCLFVBQUwsQ0FBZ0JFLFNBQWhCLEdBQTRCSyxJQUFJTSxJQUFKLENBQVNBLElBQVQsQ0FBY0ssVUFBMUM7QUFDQUYsaUJBQUtYLFdBQUw7QUFDRCxXQVREO0FBVUQsU0FiSCxNQWFTO0FBQ0xTLGtCQUFRQyxHQUFSLENBQVksZUFBZVIsSUFBSVksTUFBL0I7QUFDRDtBQUNKLE9BakJUOztBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDRDs7OztFQTNHMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5pbXBvcnQgYXBpUGF0aCBmcm9tICcuL2NvbmZpZy9jb25maWcnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICdwYWdlcy9jbGFzcycsXHJcbiAgICAgICdwYWdlcy9jbGFzc0RldGFpbCcsXHJcbiAgICAgICdwYWdlcy9haXJ0aWNsZScsXHJcbiAgICAgICdwYWdlcy9tZScsXHJcbiAgICAgICdwYWdlcy9tZUNsYXNzJ1xyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzJjYmQ2YycsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpJznjKvotrPnkIMnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnJ1xyXG4gICAgfSxcclxuICAgIHRhYkJhcjp7XHJcbiAgICAgIGNvbG9yOicjMzMzJyxcclxuICAgICAgc2VsZWN0ZWRDb2xvcjonIzJjYmQ2YycsXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjonI2ZmZicsXHJcbiAgICAgIGJvcmRlclN0eWxlOicjZTJlMmUyJyxcclxuICAgICAgbGlzdDpbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICAgdGV4dDon6aaW6aG1JyxcclxuICAgICAgICAgICAgIGljb25QYXRoOicuL2ltYWdlcy9jbGFzcy5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvY2xhc3MtYWN0aXZlLnBuZydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvbWVDbGFzcycsXHJcbiAgICAgICAgICAgICB0ZXh0Oifor77nqIsnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL2YtbGVhcm4ucG5nJyxcclxuICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6Jy4vaW1hZ2VzL2YtbGVhcm4tYWN0aXZlLnBuZydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvbWUnLFxyXG4gICAgICAgICAgICAgdGV4dDon5oiR55qEJyxcclxuICAgICAgICAgICAgIGljb25QYXRoOicuL2ltYWdlcy9tZS5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvbWUtYWN0aXZlLnBuZydcclxuICAgICAgICAgIH1cclxuICAgICAgXSxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIHNlc3Npb25JRDonJyxcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcclxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKVxyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICB0aGlzLmxvZ2luKCk7ICBcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKCkge1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB9XHJcbiAgICB3ZXB5LmdldFVzZXJJbmZvKCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgIHVybDogYXBpUGF0aC51cGRhdGVVc2VySW5mbyxcclxuICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgZGF0YTpyZXMudXNlckluZm9cclxuICAgICAgICB9KS50aGVuKCByZXMgPT4geyBjb25zb2xlLmxvZyhyZXMpIH0gKVxyXG4gICAgfSApXHJcbiAgfVxyXG5cclxuICAvLyDnmbvlvZVcclxuICBsb2dpbigpe1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgLy/nmbvlvZXmgIHov4fmnJ9cclxuICAgIHdlcHkubG9naW4oKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAvL+WPkei1t+e9kee7nOivt+axglxyXG4gICAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYXBpUGF0aC5sb2dpbixcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IHJlcy5jb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5zZXNzaW9uSUQgPSByZXMuZGF0YS5kYXRhLnNlc3Npb25faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIEnICsgcmVzLmVyck1zZylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSApO1xyXG5cclxuICAgIC8vIHd4LmNoZWNrU2Vzc2lvbih7XHJcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCflt7LnmbvlvZUnKVxyXG4gICAgLy8gICAgICAgLy9zZXNzaW9uIOacqui/h+acn++8jOW5tuS4lOWcqOacrOeUn+WRveWRqOacn+S4gOebtOacieaViFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAgZmFpbDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvLyB9KVxyXG4gIH1cclxufVxyXG4iXX0=