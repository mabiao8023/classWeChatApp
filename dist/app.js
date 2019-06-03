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
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        color: '#333',
        selectedColor: '#2cbd6c',
        backgroundColor: '#fff',
        borderStyle: 'white',
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
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXNzaW9uSUQiLCJ1c2UiLCJsb2dpbiIsIndlcHkiLCJnZXRVc2VySW5mbyIsInRoZW4iLCJyZXMiLCJyZXF1ZXN0IiwidXJsIiwiYXBpUGF0aCIsInVwZGF0ZVVzZXJJbmZvIiwibWV0aG9kIiwiaGVhZGVyIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJzZWxmIiwiY29kZSIsInNlc3Npb25faWQiLCJlcnJNc2ciLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQWtERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBaERmQSxNQWdEZSxHQWhETjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxtQkFISyxFQUlMLGdCQUpLLEVBS0wsVUFMSyxFQU1MLGVBTkssQ0FEQTtBQVNQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0IsTUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BVEQ7QUFlUEMsY0FBTztBQUNMQyxlQUFNLE1BREQ7QUFFTEMsdUJBQWMsU0FGVDtBQUdMQyx5QkFBZ0IsTUFIWDtBQUlMQyxxQkFBWSxPQUpQO0FBS0xDLGNBQUssQ0FDRDtBQUNHQyxvQkFBUyxhQURaO0FBRUdDLGdCQUFLLElBRlI7QUFHR0Msb0JBQVMsb0JBSFo7QUFJR0MsNEJBQWlCO0FBSnBCLFNBREMsRUFPRDtBQUNHSCxvQkFBUyxlQURaO0FBRUdDLGdCQUFLLElBRlI7QUFHR0Msb0JBQVMsc0JBSFo7QUFJR0MsNEJBQWlCO0FBSnBCLFNBUEMsRUFhRDtBQUNHSCxvQkFBUyxVQURaO0FBRUdDLGdCQUFLLElBRlI7QUFHR0Msb0JBQVMsaUJBSFo7QUFJR0MsNEJBQWlCO0FBSnBCLFNBYkM7QUFMQTtBQWZBLEtBZ0RNO0FBQUEsVUFMZkMsVUFLZSxHQUxGO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsaUJBQVU7QUFGQyxLQUtFOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFIYTtBQUlkOzs7OytCQUVVO0FBQ1QsV0FBS0MsS0FBTDtBQUNEOzs7a0NBRWE7QUFBQTs7QUFDWixVQUFJLEtBQUtKLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNESSxxQkFBS0MsV0FBTCxHQUFtQkMsSUFBbkIsQ0FBeUIsZUFBTztBQUM1QixlQUFLUCxVQUFMLENBQWdCQyxRQUFoQixHQUEyQk8sSUFBSVAsUUFBL0I7QUFDQUksdUJBQUtJLE9BQUwsQ0FBYTtBQUNWQyxlQUFLQyxpQkFBUUMsY0FESDtBQUVWQyxrQkFBTyxNQUZHO0FBR1ZDLGtCQUFRO0FBQ0wscUNBQXVCLE9BQUtkLFVBQUwsQ0FBZ0JFO0FBRGxDLFdBSEU7QUFNVmEsZ0JBQUtQLElBQUlQO0FBTkMsU0FBYixFQU9HTSxJQVBILENBT1MsZUFBTztBQUFFUyxrQkFBUUMsR0FBUixDQUFZVCxHQUFaO0FBQWtCLFNBUHBDO0FBUUgsT0FWRDtBQVdEOztBQUVEOzs7OzRCQUNPO0FBQ0wsVUFBSVUsT0FBTyxJQUFYO0FBQ0E7QUFDQWIscUJBQUtELEtBQUwsR0FBYUcsSUFBYixDQUFtQixlQUFPO0FBQ2hCLFlBQUlDLElBQUlXLElBQVIsRUFBYztBQUNaSCxrQkFBUUMsR0FBUixDQUFZVCxJQUFJVyxJQUFoQjtBQUNFO0FBQ0FkLHlCQUFLSSxPQUFMLENBQWE7QUFDWEMsaUJBQUtDLGlCQUFRUCxLQURGO0FBRVhTLG9CQUFPLE1BRkk7QUFHWEUsa0JBQU07QUFDSkksb0JBQU1YLElBQUlXO0FBRE47QUFISyxXQUFiLEVBTUdaLElBTkgsQ0FNUyxlQUFPO0FBQ2RXLGlCQUFLbEIsVUFBTCxDQUFnQkUsU0FBaEIsR0FBNEJNLElBQUlPLElBQUosQ0FBU0EsSUFBVCxDQUFjSyxVQUExQztBQUNBRixpQkFBS1osV0FBTDtBQUNELFdBVEQ7QUFVRCxTQWJILE1BYVM7QUFDTFUsa0JBQVFDLEdBQVIsQ0FBWSxlQUFlVCxJQUFJYSxNQUEvQjtBQUNEO0FBQ0osT0FqQlQ7O0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNEOzs7O0VBM0cwQmhCLGVBQUtpQixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcbmltcG9ydCBhcGlQYXRoIGZyb20gJy4vY29uZmlnL2NvbmZpZydcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvY2xhc3MnLFxuICAgICAgJ3BhZ2VzL2NsYXNzRGV0YWlsJyxcbiAgICAgICdwYWdlcy9haXJ0aWNsZScsXG4gICAgICAncGFnZXMvbWUnLFxuICAgICAgJ3BhZ2VzL21lQ2xhc3MnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzJjYmQ2YycsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5aSc54yr6Laz55CDJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICB9LFxuICAgIHRhYkJhcjp7XG4gICAgICBjb2xvcjonIzMzMycsXG4gICAgICBzZWxlY3RlZENvbG9yOicjMmNiZDZjJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjonI2ZmZicsXG4gICAgICBib3JkZXJTdHlsZTond2hpdGUnLFxuICAgICAgbGlzdDpbXG4gICAgICAgICAge1xuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9pbmRleCcsXG4gICAgICAgICAgICAgdGV4dDon6aaW6aG1JyxcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvY2xhc3MucG5nJyxcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9jbGFzcy1hY3RpdmUucG5nJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZUNsYXNzJyxcbiAgICAgICAgICAgICB0ZXh0Oifor77nqIsnLFxuICAgICAgICAgICAgIGljb25QYXRoOicuL2ltYWdlcy9mLWxlYXJuLnBuZycsXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi1hY3RpdmUucG5nJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZScsXG4gICAgICAgICAgICAgdGV4dDon5oiR55qEJyxcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvbWUucG5nJyxcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9tZS1hY3RpdmUucG5nJ1xuICAgICAgICAgIH1cbiAgICAgIF0sXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICBzZXNzaW9uSUQ6JycsXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5JylcbiAgfVxuXG4gIG9uTGF1bmNoKCkge1xuICAgIHRoaXMubG9naW4oKTsgIFxuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgIH1cbiAgICB3ZXB5LmdldFVzZXJJbmZvKCkudGhlbiggcmVzID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgIHVybDogYXBpUGF0aC51cGRhdGVVc2VySW5mbyxcbiAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcbiAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICBkYXRhOnJlcy51c2VySW5mb1xuICAgICAgICB9KS50aGVuKCByZXMgPT4geyBjb25zb2xlLmxvZyhyZXMpIH0gKVxuICAgIH0gKVxuICB9XG5cbiAgLy8g55m75b2VXG4gIGxvZ2luKCl7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIC8v55m75b2V5oCB6L+H5pyfXG4gICAgd2VweS5sb2dpbigpLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKTtcbiAgICAgICAgICAgICAgICAgIC8v5Y+R6LW3572R57uc6K+35rGCXG4gICAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGFwaVBhdGgubG9naW4sXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KS50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmdsb2JhbERhdGEuc2Vzc2lvbklEID0gcmVzLmRhdGEuZGF0YS5zZXNzaW9uX2lkO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFVzZXJJbmZvKCk7XG4gICAgICAgICAgICAgICAgICB9IClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlueUqOaIt+eZu+W9leaAgeWksei0pe+8gScgKyByZXMuZXJyTXNnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gKTtcbiAgICBcbiAgICAvLyB3eC5jaGVja1Nlc3Npb24oe1xuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCflt7LnmbvlvZUnKVxuICAgIC8vICAgICAgIC8vc2Vzc2lvbiDmnKrov4fmnJ/vvIzlubbkuJTlnKjmnKznlJ/lkb3lkajmnJ/kuIDnm7TmnInmlYhcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgZmFpbDogZnVuY3Rpb24oKXtcblxuICAgIC8vIH0pXG4gIH1cbn1cbiJdfQ==