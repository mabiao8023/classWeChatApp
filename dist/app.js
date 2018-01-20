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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXNzaW9uSUQiLCJ1c2UiLCJsb2dpbiIsImdldFVzZXJJbmZvIiwidGhlbiIsInJlcyIsInJlcXVlc3QiLCJ1cmwiLCJ1cGRhdGVVc2VySW5mbyIsIm1ldGhvZCIsImhlYWRlciIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwic2VsZiIsImNvZGUiLCJzZXNzaW9uX2lkIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFrREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQWhEZkEsTUFnRGUsR0FoRE47QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxhQUZLLEVBR0wsbUJBSEssRUFJTCxnQkFKSyxFQUtMLFVBTEssRUFNTCxlQU5LLENBREE7QUFTUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLE1BSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQVREO0FBZVBDLGNBQU87QUFDTEMsZUFBTSxNQUREO0FBRUxDLHVCQUFjLEVBRlQ7QUFHTEMseUJBQWdCLEVBSFg7QUFJTEMscUJBQVksU0FKUDtBQUtMQyxjQUFLLENBQ0Q7QUFDR0Msb0JBQVMsYUFEWjtBQUVHQyxnQkFBSyxJQUZSO0FBR0dDLG9CQUFTLG9CQUhaO0FBSUdDLDRCQUFpQjtBQUpwQixTQURDLEVBT0Q7QUFDR0gsb0JBQVMsZUFEWjtBQUVHQyxnQkFBSyxJQUZSO0FBR0dDLG9CQUFTLHNCQUhaO0FBSUdDLDRCQUFpQjtBQUpwQixTQVBDLEVBYUQ7QUFDR0gsb0JBQVMsVUFEWjtBQUVHQyxnQkFBSyxJQUZSO0FBR0dDLG9CQUFTLGlCQUhaO0FBSUdDLDRCQUFpQjtBQUpwQixTQWJDO0FBTEE7QUFmQSxLQWdETTtBQUFBLFVBTGZDLFVBS2UsR0FMRjtBQUNYQyxnQkFBVSxJQURDO0FBRVhDLGlCQUFVO0FBRkMsS0FLRTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUNBLFVBQUtBLEdBQUwsQ0FBUyxXQUFUO0FBSGE7QUFJZDs7OzsrQkFFVTtBQUNULFdBQUtDLEtBQUw7QUFDRDs7O2tDQUVhO0FBQUE7O0FBQ1osVUFBSSxLQUFLSixVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7QUFDRCxxQkFBS0ksV0FBTCxHQUFtQkMsSUFBbkIsQ0FBeUIsZUFBTztBQUM1QixlQUFLTixVQUFMLENBQWdCQyxRQUFoQixHQUEyQk0sSUFBSU4sUUFBL0I7QUFDQSx1QkFBS08sT0FBTCxDQUFhO0FBQ1ZDLGVBQUssaUJBQVFDLGNBREg7QUFFVkMsa0JBQU8sTUFGRztBQUdWQyxrQkFBUTtBQUNMLHFDQUF1QixPQUFLWixVQUFMLENBQWdCRTtBQURsQyxXQUhFO0FBTVZXLGdCQUFLTixJQUFJTjtBQU5DLFNBQWIsRUFPR0ssSUFQSCxDQU9TLGVBQU87QUFBRVEsa0JBQVFDLEdBQVIsQ0FBWVIsR0FBWjtBQUFrQixTQVBwQztBQVFILE9BVkQ7QUFXRDs7QUFFRDs7Ozs0QkFDTztBQUNMLFVBQUlTLE9BQU8sSUFBWDtBQUNBO0FBQ0EscUJBQUtaLEtBQUwsR0FBYUUsSUFBYixDQUFtQixlQUFPO0FBQ2hCLFlBQUlDLElBQUlVLElBQVIsRUFBYztBQUNaSCxrQkFBUUMsR0FBUixDQUFZUixJQUFJVSxJQUFoQjtBQUNFO0FBQ0EseUJBQUtULE9BQUwsQ0FBYTtBQUNYQyxpQkFBSyxpQkFBUUwsS0FERjtBQUVYTyxvQkFBTyxNQUZJO0FBR1hFLGtCQUFNO0FBQ0pJLG9CQUFNVixJQUFJVTtBQUROO0FBSEssV0FBYixFQU1HWCxJQU5ILENBTVMsZUFBTztBQUNkVSxpQkFBS2hCLFVBQUwsQ0FBZ0JFLFNBQWhCLEdBQTRCSyxJQUFJTSxJQUFKLENBQVNBLElBQVQsQ0FBY0ssVUFBMUM7QUFDQUYsaUJBQUtYLFdBQUw7QUFDRCxXQVREO0FBVUQsU0FiSCxNQWFTO0FBQ0xTLGtCQUFRQyxHQUFSLENBQVksZUFBZVIsSUFBSVksTUFBL0I7QUFDRDtBQUNKLE9BakJUOztBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDRDs7OztFQTNHMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5pbXBvcnQgYXBpUGF0aCBmcm9tICcuL2NvbmZpZy9jb25maWcnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICdwYWdlcy9jbGFzcycsXHJcbiAgICAgICdwYWdlcy9jbGFzc0RldGFpbCcsXHJcbiAgICAgICdwYWdlcy9haXJ0aWNsZScsXHJcbiAgICAgICdwYWdlcy9tZScsXHJcbiAgICAgICdwYWdlcy9tZUNsYXNzJ1xyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzJjYmQ2YycsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpJznjKvotrPnkIMnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnJ1xyXG4gICAgfSxcclxuICAgIHRhYkJhcjp7XHJcbiAgICAgIGNvbG9yOicjMzMzJyxcclxuICAgICAgc2VsZWN0ZWRDb2xvcjonJyxcclxuICAgICAgYmFja2dyb3VuZENvbG9yOicnLFxyXG4gICAgICBib3JkZXJTdHlsZTonI2UyZTJlMicsXHJcbiAgICAgIGxpc3Q6W1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgcGFnZVBhdGg6J3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgIHRleHQ6J+mmlumhtScsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvY2xhc3MucG5nJyxcclxuICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6Jy4vaW1hZ2VzL2NsYXNzLWFjdGl2ZS5wbmcnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgcGFnZVBhdGg6J3BhZ2VzL21lQ2xhc3MnLFxyXG4gICAgICAgICAgICAgdGV4dDon6K++56iLJyxcclxuICAgICAgICAgICAgIGljb25QYXRoOicuL2ltYWdlcy9mLWxlYXJuLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9mLWxlYXJuLWFjdGl2ZS5wbmcnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgcGFnZVBhdGg6J3BhZ2VzL21lJyxcclxuICAgICAgICAgICAgIHRleHQ6J+aIkeeahCcsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvbWUucG5nJyxcclxuICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6Jy4vaW1hZ2VzL21lLWFjdGl2ZS5wbmcnXHJcbiAgICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGwsXHJcbiAgICBzZXNzaW9uSUQ6JycsXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXHJcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5JylcclxuICB9XHJcblxyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgdGhpcy5sb2dpbigpOyAgXHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbygpIHtcclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgfVxyXG4gICAgd2VweS5nZXRVc2VySW5mbygpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICB1cmw6IGFwaVBhdGgudXBkYXRlVXNlckluZm8sXHJcbiAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIGRhdGE6cmVzLnVzZXJJbmZvXHJcbiAgICAgICAgfSkudGhlbiggcmVzID0+IHsgY29uc29sZS5sb2cocmVzKSB9IClcclxuICAgIH0gKVxyXG4gIH1cclxuXHJcbiAgLy8g55m75b2VXHJcbiAgbG9naW4oKXtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIC8v55m75b2V5oCB6L+H5pyfXHJcbiAgICB3ZXB5LmxvZ2luKCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKTtcclxuICAgICAgICAgICAgICAgICAgLy/lj5HotbfnvZHnu5zor7fmsYJcclxuICAgICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGFwaVBhdGgubG9naW4sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdsb2JhbERhdGEuc2Vzc2lvbklEID0gcmVzLmRhdGEuZGF0YS5zZXNzaW9uX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0VXNlckluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgfSApXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W55So5oi355m75b2V5oCB5aSx6LSl77yBJyArIHJlcy5lcnJNc2cpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gKTtcclxuXHJcbiAgICAvLyB3eC5jaGVja1Nlc3Npb24oe1xyXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZygn5bey55m75b2VJylcclxuICAgIC8vICAgICAgIC8vc2Vzc2lvbiDmnKrov4fmnJ/vvIzlubbkuJTlnKjmnKznlJ/lkb3lkajmnJ/kuIDnm7TmnInmlYhcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIGZhaWw6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgLy8gfSlcclxuICB9XHJcbn1cclxuIl19