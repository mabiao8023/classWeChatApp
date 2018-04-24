'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _aldStat = require('./config/ald-stat.js');

var _aldStat2 = _interopRequireDefault(_aldStat);

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
      pages: ['pages/index', 'pages/result', 'pages/feature', 'pages/shaixuan'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#FF741F',
        navigationBarTitleText: '夜猫足球实时比分',
        navigationBarTextStyle: '',
        enablePullDownRefresh: true
      }
      /* tabBar:{
         color:'#333',
         selectedColor:'#2cbd6c',
         backgroundColor:'#fff',
         borderStyle:'#e2e2e2',
         list:[
             {
                pagePath:'pages/index',
                text:'首页',
                iconPath:'./images/class.png',
                selectedIconPath:'./images/class-active.png'
             },
             {
                pagePath:'pages/meClass',
                text:'课程',
                iconPath:'./images/f-learn.png',
                selectedIconPath:'./images/f-learn-active.png'
             },
             {
                pagePath:'pages/me',
                text:'我的',
                iconPath:'./images/me.png',
                selectedIconPath:'./images/me-active.png'
             }
         ],
       }*/
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXNzaW9uSUQiLCJ1c2UiLCJsb2dpbiIsImdldFVzZXJJbmZvIiwidGhlbiIsInJlcyIsInJlcXVlc3QiLCJ1cmwiLCJ1cGRhdGVVc2VySW5mbyIsIm1ldGhvZCIsImhlYWRlciIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwic2VsZiIsImNvZGUiLCJzZXNzaW9uX2lkIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQWlERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBL0NmQSxNQStDZSxHQS9DTjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGNBRkssRUFHTCxlQUhLLEVBSUwsZ0JBSkssQ0FEQTtBQU9QQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0IsVUFIbEI7QUFJTkMsZ0NBQXdCLEVBSmxCO0FBS05DLCtCQUF1QjtBQUxqQjtBQU9UOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWRRLEtBK0NNO0FBQUEsVUFMZkMsVUFLZSxHQUxGO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsaUJBQVU7QUFGQyxLQUtFOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFIYTtBQUlkOzs7OytCQUVVO0FBQ1QsV0FBS0MsS0FBTDtBQUNEOzs7a0NBRWE7QUFBQTs7QUFDWixVQUFJLEtBQUtKLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNELHFCQUFLSSxXQUFMLEdBQW1CQyxJQUFuQixDQUF5QixlQUFPO0FBQzVCLGVBQUtOLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCTSxJQUFJTixRQUEvQjtBQUNBLHVCQUFLTyxPQUFMLENBQWE7QUFDVkMsZUFBSyxpQkFBUUMsY0FESDtBQUVWQyxrQkFBTyxNQUZHO0FBR1ZDLGtCQUFRO0FBQ0wscUNBQXVCLE9BQUtaLFVBQUwsQ0FBZ0JFO0FBRGxDLFdBSEU7QUFNVlcsZ0JBQUtOLElBQUlOO0FBTkMsU0FBYixFQU9HSyxJQVBILENBT1MsZUFBTztBQUFFUSxrQkFBUUMsR0FBUixDQUFZUixHQUFaO0FBQWtCLFNBUHBDO0FBUUgsT0FWRDtBQVdEOztBQUVEOzs7OzRCQUNPO0FBQ0wsVUFBSVMsT0FBTyxJQUFYO0FBQ0E7QUFDQSxxQkFBS1osS0FBTCxHQUFhRSxJQUFiLENBQW1CLGVBQU87QUFDaEIsWUFBSUMsSUFBSVUsSUFBUixFQUFjO0FBQ1pILGtCQUFRQyxHQUFSLENBQVlSLElBQUlVLElBQWhCO0FBQ0U7QUFDQSx5QkFBS1QsT0FBTCxDQUFhO0FBQ1hDLGlCQUFLLGlCQUFRTCxLQURGO0FBRVhPLG9CQUFPLE1BRkk7QUFHWEUsa0JBQU07QUFDSkksb0JBQU1WLElBQUlVO0FBRE47QUFISyxXQUFiLEVBTUdYLElBTkgsQ0FNUyxlQUFPO0FBQ2RVLGlCQUFLaEIsVUFBTCxDQUFnQkUsU0FBaEIsR0FBNEJLLElBQUlNLElBQUosQ0FBU0EsSUFBVCxDQUFjSyxVQUExQztBQUNBRixpQkFBS1gsV0FBTDtBQUNELFdBVEQ7QUFVRCxTQWJILE1BYVM7QUFDTFMsa0JBQVFDLEdBQVIsQ0FBWSxlQUFlUixJQUFJWSxNQUEvQjtBQUNEO0FBQ0osT0FqQlQ7O0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNEOzs7O0VBMUcwQixlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgYWxkc3RhdCBmcm9tICcuL2NvbmZpZy9hbGQtc3RhdC5qcydcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5pbXBvcnQgYXBpUGF0aCBmcm9tICcuL2NvbmZpZy9jb25maWcnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICdwYWdlcy9yZXN1bHQnLFxyXG4gICAgICAncGFnZXMvZmVhdHVyZScsXHJcbiAgICAgICdwYWdlcy9zaGFpeHVhbidcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNGRjc0MUYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5aSc54yr6Laz55CD5a6e5pe25q+U5YiGJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJycsXHJcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgIC8qIHRhYkJhcjp7XHJcbiAgICAgIGNvbG9yOicjMzMzJyxcclxuICAgICAgc2VsZWN0ZWRDb2xvcjonIzJjYmQ2YycsXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjonI2ZmZicsXHJcbiAgICAgIGJvcmRlclN0eWxlOicjZTJlMmUyJyxcclxuICAgICAgbGlzdDpbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICAgdGV4dDon6aaW6aG1JyxcclxuICAgICAgICAgICAgIGljb25QYXRoOicuL2ltYWdlcy9jbGFzcy5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvY2xhc3MtYWN0aXZlLnBuZydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvbWVDbGFzcycsXHJcbiAgICAgICAgICAgICB0ZXh0Oifor77nqIsnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL2YtbGVhcm4ucG5nJyxcclxuICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6Jy4vaW1hZ2VzL2YtbGVhcm4tYWN0aXZlLnBuZydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvbWUnLFxyXG4gICAgICAgICAgICAgdGV4dDon5oiR55qEJyxcclxuICAgICAgICAgICAgIGljb25QYXRoOicuL2ltYWdlcy9tZS5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvbWUtYWN0aXZlLnBuZydcclxuICAgICAgICAgIH1cclxuICAgICAgXSxcclxuICAgIH0qL1xyXG4gIH1cclxuXHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiBudWxsLFxyXG4gICAgc2Vzc2lvbklEOicnLFxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpXHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaCgpIHtcclxuICAgIHRoaXMubG9naW4oKTsgIFxyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cclxuICAgIH1cclxuICAgIHdlcHkuZ2V0VXNlckluZm8oKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgdXJsOiBhcGlQYXRoLnVwZGF0ZVVzZXJJbmZvLFxyXG4gICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICBkYXRhOnJlcy51c2VySW5mb1xyXG4gICAgICAgIH0pLnRoZW4oIHJlcyA9PiB7IGNvbnNvbGUubG9nKHJlcykgfSApXHJcbiAgICB9IClcclxuICB9XHJcblxyXG4gIC8vIOeZu+W9lVxyXG4gIGxvZ2luKCl7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAvL+eZu+W9leaAgei/h+acn1xyXG4gICAgd2VweS5sb2dpbigpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgIC8v5Y+R6LW3572R57uc6K+35rGCXHJcbiAgICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBhcGlQYXRoLmxvZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29kZTogcmVzLmNvZGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnNlc3Npb25JRCA9IHJlcy5kYXRhLmRhdGEuc2Vzc2lvbl9pZDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFVzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlueUqOaIt+eZu+W9leaAgeWksei0pe+8gScgKyByZXMuZXJyTXNnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICk7XHJcblxyXG4gICAgLy8gd3guY2hlY2tTZXNzaW9uKHtcclxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgICAgY29uc29sZS5sb2coJ+W3sueZu+W9lScpXHJcbiAgICAvLyAgICAgICAvL3Nlc3Npb24g5pyq6L+H5pyf77yM5bm25LiU5Zyo5pys55Sf5ZG95ZGo5pyf5LiA55u05pyJ5pWIXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICBmYWlsOiBmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==