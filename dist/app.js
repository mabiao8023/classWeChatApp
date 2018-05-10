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
      pages: ['pages/index', 'pages/result', 'pages/feature', 'pages/shaixuan', 'pages/focus'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#FF741F',
        navigationBarTitleText: '赛事比分',
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
      token: ''
    };

    _this.use('requestfix');
    _this.use('promisify');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {

      try {
        this.globalData.token = wx.getStorageSync('token');
      } catch (e) {
        // Do something when catch error
        this.globalData.token = "";
      }
      if (!this.globalData.token) {
        this.login();
      }
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
            'Authorization': '' + _this2.globalData.token
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
          //发起网络请求
          _wepy2.default.request({
            url: _config2.default.login,
            method: 'GET',
            data: {
              login_type: 5,
              code: res.code
            }
          }).then(function (res) {
            self.globalData.token = res.data.data.token;
            wx.setStorageSync("token", res.data.data.token);
            // self.getUserInfo();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ0b2tlbiIsInVzZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJlIiwibG9naW4iLCJnZXRVc2VySW5mbyIsInRoZW4iLCJyZXMiLCJyZXF1ZXN0IiwidXJsIiwidXBkYXRlVXNlckluZm8iLCJtZXRob2QiLCJoZWFkZXIiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInNlbGYiLCJjb2RlIiwibG9naW5fdHlwZSIsInNldFN0b3JhZ2VTeW5jIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQWtERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBaERmQSxNQWdEZSxHQWhETjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGNBRkssRUFHTCxlQUhLLEVBSUwsZ0JBSkssRUFLTCxhQUxLLENBREE7QUFRUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLE1BSGxCO0FBSU5DLGdDQUF3QixFQUpsQjtBQUtOQywrQkFBdUI7QUFMakI7QUFPVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFmUSxLQWdETTtBQUFBLFVBTGZDLFVBS2UsR0FMRjtBQUNYQyxnQkFBVSxJQURDO0FBRVhDLGFBQU07QUFGSyxLQUtFOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFIYTtBQUlkOzs7OytCQUVVOztBQUVULFVBQUk7QUFDRixhQUFLSCxVQUFMLENBQWdCRSxLQUFoQixHQUF3QkUsR0FBR0MsY0FBSCxDQUFrQixPQUFsQixDQUF4QjtBQUNELE9BRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVU7QUFDVjtBQUNBLGFBQUtOLFVBQUwsQ0FBZ0JFLEtBQWhCLEdBQXdCLEVBQXhCO0FBQ0Q7QUFDRCxVQUFJLENBQUMsS0FBS0YsVUFBTCxDQUFnQkUsS0FBckIsRUFBNEI7QUFDMUIsYUFBS0ssS0FBTDtBQUNEO0FBRUY7OztrQ0FFYTtBQUFBOztBQUNaLFVBQUksS0FBS1AsVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDNUIsZUFBTyxLQUFLRCxVQUFMLENBQWdCQyxRQUF2QjtBQUNEO0FBQ0QscUJBQUtPLFdBQUwsR0FBbUJDLElBQW5CLENBQXlCLGVBQU87QUFDNUIsZUFBS1QsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJTLElBQUlULFFBQS9CO0FBQ0EsdUJBQUtVLE9BQUwsQ0FBYTtBQUNWQyxlQUFLLGlCQUFRQyxjQURIO0FBRVZDLGtCQUFPLE1BRkc7QUFHVkMsa0JBQVE7QUFDTCxrQ0FBb0IsT0FBS2YsVUFBTCxDQUFnQkU7QUFEL0IsV0FIRTtBQU1WYyxnQkFBS04sSUFBSVQ7QUFOQyxTQUFiLEVBT0dRLElBUEgsQ0FPUyxlQUFPO0FBQUVRLGtCQUFRQyxHQUFSLENBQVlSLEdBQVo7QUFBa0IsU0FQcEM7QUFRSCxPQVZEO0FBV0Q7O0FBRUQ7Ozs7NEJBQ087QUFDTCxVQUFJUyxPQUFPLElBQVg7QUFDQTtBQUNBLHFCQUFLWixLQUFMLEdBQWFFLElBQWIsQ0FBbUIsZUFBTztBQUNoQixZQUFJQyxJQUFJVSxJQUFSLEVBQWM7QUFDVjtBQUNBLHlCQUFLVCxPQUFMLENBQWE7QUFDWEMsaUJBQUssaUJBQVFMLEtBREY7QUFFWE8sb0JBQU8sS0FGSTtBQUdYRSxrQkFBTTtBQUNKSywwQkFBWSxDQURSO0FBRUpELG9CQUFNVixJQUFJVTtBQUZOO0FBSEssV0FBYixFQU9HWCxJQVBILENBT1MsZUFBTztBQUNkVSxpQkFBS25CLFVBQUwsQ0FBZ0JFLEtBQWhCLEdBQXdCUSxJQUFJTSxJQUFKLENBQVNBLElBQVQsQ0FBY2QsS0FBdEM7QUFDQUUsZUFBR2tCLGNBQUgsQ0FBa0IsT0FBbEIsRUFBMEJaLElBQUlNLElBQUosQ0FBU0EsSUFBVCxDQUFjZCxLQUF4QztBQUNBO0FBQ0QsV0FYRDtBQVlELFNBZEgsTUFjUztBQUNMZSxrQkFBUUMsR0FBUixDQUFZLGVBQWVSLElBQUlhLE1BQS9CO0FBQ0Q7QUFDSixPQWxCVDs7QUFvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Q7Ozs7RUF0SDBCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBhbGRzdGF0IGZyb20gJy4vY29uZmlnL2FsZC1zdGF0LmpzJ1xyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXHJcbmltcG9ydCBhcGlQYXRoIGZyb20gJy4vY29uZmlnL2NvbmZpZydcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL3Jlc3VsdCcsXHJcbiAgICAgICdwYWdlcy9mZWF0dXJlJyxcclxuICAgICAgJ3BhZ2VzL3NoYWl4dWFuJyxcclxuICAgICAgJ3BhZ2VzL2ZvY3VzJ1xyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI0ZGNzQxRicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotZvkuovmr5TliIYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnJyxcclxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxyXG4gICAgfSxcclxuICAgLyogdGFiQmFyOntcclxuICAgICAgY29sb3I6JyMzMzMnLFxyXG4gICAgICBzZWxlY3RlZENvbG9yOicjMmNiZDZjJyxcclxuICAgICAgYmFja2dyb3VuZENvbG9yOicjZmZmJyxcclxuICAgICAgYm9yZGVyU3R5bGU6JyNlMmUyZTInLFxyXG4gICAgICBsaXN0OltcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgICB0ZXh0OifpppbpobUnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL2NsYXNzLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9jbGFzcy1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZUNsYXNzJyxcclxuICAgICAgICAgICAgIHRleHQ6J+ivvueoiycsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZScsXHJcbiAgICAgICAgICAgICB0ZXh0OifmiJHnmoQnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL21lLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9tZS1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgfSovXHJcbiAgfVxyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGwsXHJcbiAgICB0b2tlbjonJyxcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcclxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKVxyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5nbG9iYWxEYXRhLnRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgLy8gRG8gc29tZXRoaW5nIHdoZW4gY2F0Y2ggZXJyb3JcclxuICAgICAgdGhpcy5nbG9iYWxEYXRhLnRva2VuID0gXCJcIjtcclxuICAgIH1cclxuICAgIGlmKCAhdGhpcy5nbG9iYWxEYXRhLnRva2VuICl7XHJcbiAgICAgIHRoaXMubG9naW4oKTsgXHJcbiAgICB9XHJcbiAgICAgXHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbygpIHtcclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgfVxyXG4gICAgd2VweS5nZXRVc2VySW5mbygpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICB1cmw6IGFwaVBhdGgudXBkYXRlVXNlckluZm8sXHJcbiAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICBkYXRhOnJlcy51c2VySW5mb1xyXG4gICAgICAgIH0pLnRoZW4oIHJlcyA9PiB7IGNvbnNvbGUubG9nKHJlcykgfSApXHJcbiAgICB9IClcclxuICB9XHJcblxyXG4gIC8vIOeZu+W9lVxyXG4gIGxvZ2luKCl7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAvL+eZu+W9leaAgei/h+acn1xyXG4gICAgd2VweS5sb2dpbigpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8v5Y+R6LW3572R57uc6K+35rGCXHJcbiAgICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBhcGlQYXRoLmxvZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBsb2dpbl90eXBlOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29kZTogcmVzLmNvZGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInRva2VuXCIscmVzLmRhdGEuZGF0YS50b2tlbilcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxmLmdldFVzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlueUqOaIt+eZu+W9leaAgeWksei0pe+8gScgKyByZXMuZXJyTXNnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICk7XHJcblxyXG4gICAgLy8gd3guY2hlY2tTZXNzaW9uKHtcclxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgICAgY29uc29sZS5sb2coJ+W3sueZu+W9lScpXHJcbiAgICAvLyAgICAgICAvL3Nlc3Npb24g5pyq6L+H5pyf77yM5bm25LiU5Zyo5pys55Sf5ZG95ZGo5pyf5LiA55u05pyJ5pWIXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICBmYWlsOiBmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==