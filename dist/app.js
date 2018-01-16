'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

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
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '夜猫足球',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        color: '#333',
        selectedColor: '',
        backgroundColor: '',
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
      userInfo: null
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
    value: function getUserInfo(cb) {
      var _this2 = this;

      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo().then(function (res) {
        _this2.globalData.userInfo = res.userInfo;
        cb && cb(res.userInfo);
      });
    }

    // 登录

  }, {
    key: 'login',
    value: function login() {
      wx.checkSession({
        success: function success() {
          console.log('已登录');
          //session 未过期，并且在本生命周期一直有效
        },
        fail: function fail() {
          //登录态过期
          _wepy2.default.login().then(function (res) {
            if (res.code) {
              console.log(res.code);
              //发起网络请求
              // wepy.request({
              //   url: 'http://10.1.70.99/wxapp/login',
              //   method:'POST',
              //   data: {
              //     code: res.code
              //   }
              // }).then( res => {
              //   console.log(res);
              // } )
            } else {
              console.log('获取用户登录态失败！' + res.errMsg);
            }
          });
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2UiLCJsb2dpbiIsImNiIiwiZ2V0VXNlckluZm8iLCJ0aGVuIiwicmVzIiwid3giLCJjaGVja1Nlc3Npb24iLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsImZhaWwiLCJjb2RlIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBa0RFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUEvQ2ZBLE1BK0NlLEdBL0NOO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLG1CQUhLLEVBSUwsZ0JBSkssRUFLTCxVQUxLLEVBTUwsZUFOSyxDQURBO0FBU1BDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLE1BRnhCO0FBR05DLGdDQUF3QixNQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FURDtBQWVQQyxjQUFPO0FBQ0xDLGVBQU0sTUFERDtBQUVMQyx1QkFBYyxFQUZUO0FBR0xDLHlCQUFnQixFQUhYO0FBSUxDLHFCQUFZLFNBSlA7QUFLTEMsY0FBSyxDQUNEO0FBQ0dDLG9CQUFTLGFBRFo7QUFFR0MsZ0JBQUssSUFGUjtBQUdHQyxvQkFBUyxvQkFIWjtBQUlHQyw0QkFBaUI7QUFKcEIsU0FEQyxFQU9EO0FBQ0dILG9CQUFTLGVBRFo7QUFFR0MsZ0JBQUssSUFGUjtBQUdHQyxvQkFBUyxzQkFIWjtBQUlHQyw0QkFBaUI7QUFKcEIsU0FQQyxFQWFEO0FBQ0dILG9CQUFTLFVBRFo7QUFFR0MsZ0JBQUssSUFGUjtBQUdHQyxvQkFBUyxpQkFIWjtBQUlHQyw0QkFBaUI7QUFKcEIsU0FiQztBQUxBO0FBZkEsS0ErQ007QUFBQSxVQUpmQyxVQUllLEdBSkY7QUFDWEMsZ0JBQVU7QUFEQyxLQUlFOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFIYTtBQUlkOzs7OytCQUVVO0FBQ1QsV0FBS0MsS0FBTDtBQUNEOzs7Z0NBRVdDLEUsRUFBSTtBQUFBOztBQUNkLFVBQUksS0FBS0osVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDNUIsZUFBTyxLQUFLRCxVQUFMLENBQWdCQyxRQUF2QjtBQUNEO0FBQ0QscUJBQUtJLFdBQUwsR0FBbUJDLElBQW5CLENBQXlCLGVBQU87QUFDNUIsZUFBS04sVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJNLElBQUlOLFFBQS9CO0FBQ0FHLGNBQU1BLEdBQUdHLElBQUlOLFFBQVAsQ0FBTjtBQUNILE9BSEQ7QUFJRDs7QUFFRDs7Ozs0QkFDTztBQUNMTyxTQUFHQyxZQUFILENBQWdCO0FBQ1pDLGlCQUFTLG1CQUFVO0FBQ2pCQyxrQkFBUUMsR0FBUixDQUFZLEtBQVo7QUFDQTtBQUNELFNBSlc7QUFLWkMsY0FBTSxnQkFBVTtBQUNkO0FBQ0EseUJBQUtWLEtBQUwsR0FBYUcsSUFBYixDQUFtQixlQUFPO0FBQ3RCLGdCQUFJQyxJQUFJTyxJQUFSLEVBQWM7QUFDWkgsc0JBQVFDLEdBQVIsQ0FBWUwsSUFBSU8sSUFBaEI7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELGFBWkgsTUFZUztBQUNMSCxzQkFBUUMsR0FBUixDQUFZLGVBQWVMLElBQUlRLE1BQS9CO0FBQ0Q7QUFDSixXQWhCSDtBQWlCRDtBQXhCVyxPQUFoQjtBQTBCRDs7OztFQWhHMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL2NsYXNzJyxcclxuICAgICAgJ3BhZ2VzL2NsYXNzRGV0YWlsJyxcclxuICAgICAgJ3BhZ2VzL2FpcnRpY2xlJyxcclxuICAgICAgJ3BhZ2VzL21lJyxcclxuICAgICAgJ3BhZ2VzL21lQ2xhc3MnXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WknOeMq+i2s+eQgycsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgIH0sXHJcbiAgICB0YWJCYXI6e1xyXG4gICAgICBjb2xvcjonIzMzMycsXHJcbiAgICAgIHNlbGVjdGVkQ29sb3I6JycsXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjonJyxcclxuICAgICAgYm9yZGVyU3R5bGU6JyNlMmUyZTInLFxyXG4gICAgICBsaXN0OltcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgICB0ZXh0OifpppbpobUnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL2NsYXNzLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9jbGFzcy1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZUNsYXNzJyxcclxuICAgICAgICAgICAgIHRleHQ6J+ivvueoiycsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZScsXHJcbiAgICAgICAgICAgICB0ZXh0OifmiJHnmoQnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL21lLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9tZS1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiBudWxsXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXHJcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5JylcclxuICB9XHJcblxyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgdGhpcy5sb2dpbigpOyAgXHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbyhjYikge1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB9XHJcbiAgICB3ZXB5LmdldFVzZXJJbmZvKCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXHJcbiAgICB9IClcclxuICB9XHJcblxyXG4gIC8vIOeZu+W9lVxyXG4gIGxvZ2luKCl7XHJcbiAgICB3eC5jaGVja1Nlc3Npb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygn5bey55m75b2VJylcclxuICAgICAgICAgIC8vc2Vzc2lvbiDmnKrov4fmnJ/vvIzlubbkuJTlnKjmnKznlJ/lkb3lkajmnJ/kuIDnm7TmnInmlYhcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvL+eZu+W9leaAgei/h+acn1xyXG4gICAgICAgICAgd2VweS5sb2dpbigpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgIC8v5Y+R6LW3572R57uc6K+35rGCXHJcbiAgICAgICAgICAgICAgICAgIC8vIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgIC8vICAgdXJsOiAnaHR0cDovLzEwLjEuNzAuOTkvd3hhcHAvbG9naW4nLFxyXG4gICAgICAgICAgICAgICAgICAvLyAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgIC8vICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAvLyAgICAgY29kZTogcmVzLmNvZGVcclxuICAgICAgICAgICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAgICAgICAgIC8vIH0pLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgLy8gfSApXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W55So5oi355m75b2V5oCB5aSx6LSl77yBJyArIHJlcy5lcnJNc2cpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==