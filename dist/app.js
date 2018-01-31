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
        selectedColor: '',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXNzaW9uSUQiLCJ1c2UiLCJsb2dpbiIsImdldFVzZXJJbmZvIiwidGhlbiIsInJlcyIsInJlcXVlc3QiLCJ1cmwiLCJ1cGRhdGVVc2VySW5mbyIsIm1ldGhvZCIsImhlYWRlciIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwic2VsZiIsImNvZGUiLCJzZXNzaW9uX2lkIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFrREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQWhEZkEsTUFnRGUsR0FoRE47QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxhQUZLLEVBR0wsbUJBSEssRUFJTCxnQkFKSyxFQUtMLFVBTEssRUFNTCxlQU5LLENBREE7QUFTUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLE1BSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQVREO0FBZVBDLGNBQU87QUFDTEMsZUFBTSxNQUREO0FBRUxDLHVCQUFjLEVBRlQ7QUFHTEMseUJBQWdCLE1BSFg7QUFJTEMscUJBQVksU0FKUDtBQUtMQyxjQUFLLENBQ0Q7QUFDR0Msb0JBQVMsYUFEWjtBQUVHQyxnQkFBSyxJQUZSO0FBR0dDLG9CQUFTLG9CQUhaO0FBSUdDLDRCQUFpQjtBQUpwQixTQURDLEVBT0Q7QUFDR0gsb0JBQVMsZUFEWjtBQUVHQyxnQkFBSyxJQUZSO0FBR0dDLG9CQUFTLHNCQUhaO0FBSUdDLDRCQUFpQjtBQUpwQixTQVBDLEVBYUQ7QUFDR0gsb0JBQVMsVUFEWjtBQUVHQyxnQkFBSyxJQUZSO0FBR0dDLG9CQUFTLGlCQUhaO0FBSUdDLDRCQUFpQjtBQUpwQixTQWJDO0FBTEE7QUFmQSxLQWdETTtBQUFBLFVBTGZDLFVBS2UsR0FMRjtBQUNYQyxnQkFBVSxJQURDO0FBRVhDLGlCQUFVO0FBRkMsS0FLRTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUNBLFVBQUtBLEdBQUwsQ0FBUyxXQUFUO0FBSGE7QUFJZDs7OzsrQkFFVTtBQUNULFdBQUtDLEtBQUw7QUFDRDs7O2tDQUVhO0FBQUE7O0FBQ1osVUFBSSxLQUFLSixVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7QUFDRCxxQkFBS0ksV0FBTCxHQUFtQkMsSUFBbkIsQ0FBeUIsZUFBTztBQUM1QixlQUFLTixVQUFMLENBQWdCQyxRQUFoQixHQUEyQk0sSUFBSU4sUUFBL0I7QUFDQSx1QkFBS08sT0FBTCxDQUFhO0FBQ1ZDLGVBQUssaUJBQVFDLGNBREg7QUFFVkMsa0JBQU8sTUFGRztBQUdWQyxrQkFBUTtBQUNMLHFDQUF1QixPQUFLWixVQUFMLENBQWdCRTtBQURsQyxXQUhFO0FBTVZXLGdCQUFLTixJQUFJTjtBQU5DLFNBQWIsRUFPR0ssSUFQSCxDQU9TLGVBQU87QUFBRVEsa0JBQVFDLEdBQVIsQ0FBWVIsR0FBWjtBQUFrQixTQVBwQztBQVFILE9BVkQ7QUFXRDs7QUFFRDs7Ozs0QkFDTztBQUNMLFVBQUlTLE9BQU8sSUFBWDtBQUNBO0FBQ0EscUJBQUtaLEtBQUwsR0FBYUUsSUFBYixDQUFtQixlQUFPO0FBQ2hCLFlBQUlDLElBQUlVLElBQVIsRUFBYztBQUNaSCxrQkFBUUMsR0FBUixDQUFZUixJQUFJVSxJQUFoQjtBQUNFO0FBQ0EseUJBQUtULE9BQUwsQ0FBYTtBQUNYQyxpQkFBSyxpQkFBUUwsS0FERjtBQUVYTyxvQkFBTyxNQUZJO0FBR1hFLGtCQUFNO0FBQ0pJLG9CQUFNVixJQUFJVTtBQUROO0FBSEssV0FBYixFQU1HWCxJQU5ILENBTVMsZUFBTztBQUNkVSxpQkFBS2hCLFVBQUwsQ0FBZ0JFLFNBQWhCLEdBQTRCSyxJQUFJTSxJQUFKLENBQVNBLElBQVQsQ0FBY0ssVUFBMUM7QUFDQUYsaUJBQUtYLFdBQUw7QUFDRCxXQVREO0FBVUQsU0FiSCxNQWFTO0FBQ0xTLGtCQUFRQyxHQUFSLENBQVksZUFBZVIsSUFBSVksTUFBL0I7QUFDRDtBQUNKLE9BakJUOztBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDRDs7OztFQTNHMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5pbXBvcnQgYXBpUGF0aCBmcm9tICcuL2NvbmZpZy9jb25maWcnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICdwYWdlcy9jbGFzcycsXHJcbiAgICAgICdwYWdlcy9jbGFzc0RldGFpbCcsXHJcbiAgICAgICdwYWdlcy9haXJ0aWNsZScsXHJcbiAgICAgICdwYWdlcy9tZScsXHJcbiAgICAgICdwYWdlcy9tZUNsYXNzJ1xyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzJjYmQ2YycsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpJznjKvotrPnkIMnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnJ1xyXG4gICAgfSxcclxuICAgIHRhYkJhcjp7XHJcbiAgICAgIGNvbG9yOicjMzMzJyxcclxuICAgICAgc2VsZWN0ZWRDb2xvcjonJyxcclxuICAgICAgYmFja2dyb3VuZENvbG9yOicjZmZmJyxcclxuICAgICAgYm9yZGVyU3R5bGU6JyNlMmUyZTInLFxyXG4gICAgICBsaXN0OltcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgICB0ZXh0OifpppbpobUnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL2NsYXNzLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9jbGFzcy1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZUNsYXNzJyxcclxuICAgICAgICAgICAgIHRleHQ6J+ivvueoiycsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZScsXHJcbiAgICAgICAgICAgICB0ZXh0OifmiJHnmoQnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL21lLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9tZS1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiBudWxsLFxyXG4gICAgc2Vzc2lvbklEOicnLFxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpXHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaCgpIHtcclxuICAgIHRoaXMubG9naW4oKTsgIFxyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cclxuICAgIH1cclxuICAgIHdlcHkuZ2V0VXNlckluZm8oKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgdXJsOiBhcGlQYXRoLnVwZGF0ZVVzZXJJbmZvLFxyXG4gICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICBkYXRhOnJlcy51c2VySW5mb1xyXG4gICAgICAgIH0pLnRoZW4oIHJlcyA9PiB7IGNvbnNvbGUubG9nKHJlcykgfSApXHJcbiAgICB9IClcclxuICB9XHJcblxyXG4gIC8vIOeZu+W9lVxyXG4gIGxvZ2luKCl7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAvL+eZu+W9leaAgei/h+acn1xyXG4gICAgd2VweS5sb2dpbigpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgIC8v5Y+R6LW3572R57uc6K+35rGCXHJcbiAgICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBhcGlQYXRoLmxvZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29kZTogcmVzLmNvZGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnNlc3Npb25JRCA9IHJlcy5kYXRhLmRhdGEuc2Vzc2lvbl9pZDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFVzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlueUqOaIt+eZu+W9leaAgeWksei0pe+8gScgKyByZXMuZXJyTXNnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICk7XHJcblxyXG4gICAgLy8gd3guY2hlY2tTZXNzaW9uKHtcclxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgICAgY29uc29sZS5sb2coJ+W3sueZu+W9lScpXHJcbiAgICAvLyAgICAgICAvL3Nlc3Npb24g5pyq6L+H5pyf77yM5bm25LiU5Zyo5pys55Sf5ZG95ZGo5pyf5LiA55u05pyJ5pWIXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICBmYWlsOiBmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==