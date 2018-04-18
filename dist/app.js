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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXNzaW9uSUQiLCJ1c2UiLCJsb2dpbiIsImdldFVzZXJJbmZvIiwidGhlbiIsInJlcyIsInJlcXVlc3QiLCJ1cmwiLCJ1cGRhdGVVc2VySW5mbyIsIm1ldGhvZCIsImhlYWRlciIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwic2VsZiIsImNvZGUiLCJzZXNzaW9uX2lkIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQWtERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBaERmQSxNQWdEZSxHQWhETjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxtQkFISyxFQUlMLGdCQUpLLEVBS0wsVUFMSyxFQU1MLGVBTkssQ0FEQTtBQVNQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0IsTUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BVEQ7QUFlUEMsY0FBTztBQUNMQyxlQUFNLE1BREQ7QUFFTEMsdUJBQWMsU0FGVDtBQUdMQyx5QkFBZ0IsTUFIWDtBQUlMQyxxQkFBWSxTQUpQO0FBS0xDLGNBQUssQ0FDRDtBQUNHQyxvQkFBUyxhQURaO0FBRUdDLGdCQUFLLElBRlI7QUFHR0Msb0JBQVMsb0JBSFo7QUFJR0MsNEJBQWlCO0FBSnBCLFNBREMsRUFPRDtBQUNHSCxvQkFBUyxlQURaO0FBRUdDLGdCQUFLLElBRlI7QUFHR0Msb0JBQVMsc0JBSFo7QUFJR0MsNEJBQWlCO0FBSnBCLFNBUEMsRUFhRDtBQUNHSCxvQkFBUyxVQURaO0FBRUdDLGdCQUFLLElBRlI7QUFHR0Msb0JBQVMsaUJBSFo7QUFJR0MsNEJBQWlCO0FBSnBCLFNBYkM7QUFMQTtBQWZBLEtBZ0RNO0FBQUEsVUFMZkMsVUFLZSxHQUxGO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsaUJBQVU7QUFGQyxLQUtFOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFIYTtBQUlkOzs7OytCQUVVO0FBQ1QsV0FBS0MsS0FBTDtBQUNEOzs7a0NBRWE7QUFBQTs7QUFDWixVQUFJLEtBQUtKLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNELHFCQUFLSSxXQUFMLEdBQW1CQyxJQUFuQixDQUF5QixlQUFPO0FBQzVCLGVBQUtOLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCTSxJQUFJTixRQUEvQjtBQUNBLHVCQUFLTyxPQUFMLENBQWE7QUFDVkMsZUFBSyxpQkFBUUMsY0FESDtBQUVWQyxrQkFBTyxNQUZHO0FBR1ZDLGtCQUFRO0FBQ0wscUNBQXVCLE9BQUtaLFVBQUwsQ0FBZ0JFO0FBRGxDLFdBSEU7QUFNVlcsZ0JBQUtOLElBQUlOO0FBTkMsU0FBYixFQU9HSyxJQVBILENBT1MsZUFBTztBQUFFUSxrQkFBUUMsR0FBUixDQUFZUixHQUFaO0FBQWtCLFNBUHBDO0FBUUgsT0FWRDtBQVdEOztBQUVEOzs7OzRCQUNPO0FBQ0wsVUFBSVMsT0FBTyxJQUFYO0FBQ0E7QUFDQSxxQkFBS1osS0FBTCxHQUFhRSxJQUFiLENBQW1CLGVBQU87QUFDaEIsWUFBSUMsSUFBSVUsSUFBUixFQUFjO0FBQ1pILGtCQUFRQyxHQUFSLENBQVlSLElBQUlVLElBQWhCO0FBQ0U7QUFDQSx5QkFBS1QsT0FBTCxDQUFhO0FBQ1hDLGlCQUFLLGlCQUFRTCxLQURGO0FBRVhPLG9CQUFPLE1BRkk7QUFHWEUsa0JBQU07QUFDSkksb0JBQU1WLElBQUlVO0FBRE47QUFISyxXQUFiLEVBTUdYLElBTkgsQ0FNUyxlQUFPO0FBQ2RVLGlCQUFLaEIsVUFBTCxDQUFnQkUsU0FBaEIsR0FBNEJLLElBQUlNLElBQUosQ0FBU0EsSUFBVCxDQUFjSyxVQUExQztBQUNBRixpQkFBS1gsV0FBTDtBQUNELFdBVEQ7QUFVRCxTQWJILE1BYVM7QUFDTFMsa0JBQVFDLEdBQVIsQ0FBWSxlQUFlUixJQUFJWSxNQUEvQjtBQUNEO0FBQ0osT0FqQlQ7O0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNEOzs7O0VBM0cwQixlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgYWxkc3RhdCBmcm9tICcuL2NvbmZpZy9hbGQtc3RhdC5qcydcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5pbXBvcnQgYXBpUGF0aCBmcm9tICcuL2NvbmZpZy9jb25maWcnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICdwYWdlcy9jbGFzcycsXHJcbiAgICAgICdwYWdlcy9jbGFzc0RldGFpbCcsXHJcbiAgICAgICdwYWdlcy9haXJ0aWNsZScsXHJcbiAgICAgICdwYWdlcy9tZScsXHJcbiAgICAgICdwYWdlcy9tZUNsYXNzJ1xyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzJjYmQ2YycsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpJznjKvotrPnkIMnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnJ1xyXG4gICAgfSxcclxuICAgIHRhYkJhcjp7XHJcbiAgICAgIGNvbG9yOicjMzMzJyxcclxuICAgICAgc2VsZWN0ZWRDb2xvcjonIzJjYmQ2YycsXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjonI2ZmZicsXHJcbiAgICAgIGJvcmRlclN0eWxlOicjZTJlMmUyJyxcclxuICAgICAgbGlzdDpbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICAgdGV4dDon6aaW6aG1JyxcclxuICAgICAgICAgICAgIGljb25QYXRoOicuL2ltYWdlcy9jbGFzcy5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvY2xhc3MtYWN0aXZlLnBuZydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvbWVDbGFzcycsXHJcbiAgICAgICAgICAgICB0ZXh0Oifor77nqIsnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL2YtbGVhcm4ucG5nJyxcclxuICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6Jy4vaW1hZ2VzL2YtbGVhcm4tYWN0aXZlLnBuZydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvbWUnLFxyXG4gICAgICAgICAgICAgdGV4dDon5oiR55qEJyxcclxuICAgICAgICAgICAgIGljb25QYXRoOicuL2ltYWdlcy9tZS5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvbWUtYWN0aXZlLnBuZydcclxuICAgICAgICAgIH1cclxuICAgICAgXSxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIHNlc3Npb25JRDonJyxcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcclxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKVxyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICB0aGlzLmxvZ2luKCk7ICBcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKCkge1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB9XHJcbiAgICB3ZXB5LmdldFVzZXJJbmZvKCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgIHVybDogYXBpUGF0aC51cGRhdGVVc2VySW5mbyxcclxuICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgZGF0YTpyZXMudXNlckluZm9cclxuICAgICAgICB9KS50aGVuKCByZXMgPT4geyBjb25zb2xlLmxvZyhyZXMpIH0gKVxyXG4gICAgfSApXHJcbiAgfVxyXG5cclxuICAvLyDnmbvlvZVcclxuICBsb2dpbigpe1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgLy/nmbvlvZXmgIHov4fmnJ9cclxuICAgIHdlcHkubG9naW4oKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAvL+WPkei1t+e9kee7nOivt+axglxyXG4gICAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYXBpUGF0aC5sb2dpbixcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IHJlcy5jb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5zZXNzaW9uSUQgPSByZXMuZGF0YS5kYXRhLnNlc3Npb25faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIEnICsgcmVzLmVyck1zZylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSApO1xyXG5cclxuICAgIC8vIHd4LmNoZWNrU2Vzc2lvbih7XHJcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCflt7LnmbvlvZUnKVxyXG4gICAgLy8gICAgICAgLy9zZXNzaW9uIOacqui/h+acn++8jOW5tuS4lOWcqOacrOeUn+WRveWRqOacn+S4gOebtOacieaViFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAgZmFpbDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvLyB9KVxyXG4gIH1cclxufVxyXG4iXX0=