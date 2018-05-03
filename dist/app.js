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
            method: 'GET',
            data: {
              login_type: 4,
              code: res.code
            }
          }).then(function (res) {
            console.log(res);
            self.globalData.sessionID = res.data.data.session_id;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXNzaW9uSUQiLCJ1c2UiLCJsb2dpbiIsImdldFVzZXJJbmZvIiwidGhlbiIsInJlcyIsInJlcXVlc3QiLCJ1cmwiLCJ1cGRhdGVVc2VySW5mbyIsIm1ldGhvZCIsImhlYWRlciIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwic2VsZiIsImNvZGUiLCJsb2dpbl90eXBlIiwic2Vzc2lvbl9pZCIsImVyck1zZyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFrREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQWhEZkEsTUFnRGUsR0FoRE47QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxjQUZLLEVBR0wsZUFISyxFQUlMLGdCQUpLLEVBS0wsYUFMSyxDQURBO0FBUVBDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixVQUhsQjtBQUlOQyxnQ0FBd0IsRUFKbEI7QUFLTkMsK0JBQXVCO0FBTGpCO0FBT1Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZlEsS0FnRE07QUFBQSxVQUxmQyxVQUtlLEdBTEY7QUFDWEMsZ0JBQVUsSUFEQztBQUVYQyxpQkFBVTtBQUZDLEtBS0U7O0FBRWIsVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFDQSxVQUFLQSxHQUFMLENBQVMsV0FBVDtBQUhhO0FBSWQ7Ozs7K0JBRVU7QUFDVCxXQUFLQyxLQUFMO0FBQ0Q7OztrQ0FFYTtBQUFBOztBQUNaLFVBQUksS0FBS0osVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDNUIsZUFBTyxLQUFLRCxVQUFMLENBQWdCQyxRQUF2QjtBQUNEO0FBQ0QscUJBQUtJLFdBQUwsR0FBbUJDLElBQW5CLENBQXlCLGVBQU87QUFDNUIsZUFBS04sVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJNLElBQUlOLFFBQS9CO0FBQ0EsdUJBQUtPLE9BQUwsQ0FBYTtBQUNWQyxlQUFLLGlCQUFRQyxjQURIO0FBRVZDLGtCQUFPLE1BRkc7QUFHVkMsa0JBQVE7QUFDTCxxQ0FBdUIsT0FBS1osVUFBTCxDQUFnQkU7QUFEbEMsV0FIRTtBQU1WVyxnQkFBS04sSUFBSU47QUFOQyxTQUFiLEVBT0dLLElBUEgsQ0FPUyxlQUFPO0FBQUVRLGtCQUFRQyxHQUFSLENBQVlSLEdBQVo7QUFBa0IsU0FQcEM7QUFRSCxPQVZEO0FBV0Q7O0FBRUQ7Ozs7NEJBQ087QUFDTCxVQUFJUyxPQUFPLElBQVg7QUFDQTtBQUNBLHFCQUFLWixLQUFMLEdBQWFFLElBQWIsQ0FBbUIsZUFBTztBQUNoQixZQUFJQyxJQUFJVSxJQUFSLEVBQWM7QUFDWkgsa0JBQVFDLEdBQVIsQ0FBWVIsSUFBSVUsSUFBaEI7QUFDRTtBQUNBLHlCQUFLVCxPQUFMLENBQWE7QUFDWEMsaUJBQUssaUJBQVFMLEtBREY7QUFFWE8sb0JBQU8sS0FGSTtBQUdYRSxrQkFBTTtBQUNKSywwQkFBWSxDQURSO0FBRUpELG9CQUFNVixJQUFJVTtBQUZOO0FBSEssV0FBYixFQU9HWCxJQVBILENBT1MsZUFBTztBQUNkUSxvQkFBUUMsR0FBUixDQUFZUixHQUFaO0FBQ0FTLGlCQUFLaEIsVUFBTCxDQUFnQkUsU0FBaEIsR0FBNEJLLElBQUlNLElBQUosQ0FBU0EsSUFBVCxDQUFjTSxVQUExQztBQUNBO0FBQ0QsV0FYRDtBQVlELFNBZkgsTUFlUztBQUNMTCxrQkFBUUMsR0FBUixDQUFZLGVBQWVSLElBQUlhLE1BQS9CO0FBQ0Q7QUFDSixPQW5CVDs7QUFxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Q7Ozs7RUE3RzBCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBhbGRzdGF0IGZyb20gJy4vY29uZmlnL2FsZC1zdGF0LmpzJ1xyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXHJcbmltcG9ydCBhcGlQYXRoIGZyb20gJy4vY29uZmlnL2NvbmZpZydcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL3Jlc3VsdCcsXHJcbiAgICAgICdwYWdlcy9mZWF0dXJlJyxcclxuICAgICAgJ3BhZ2VzL3NoYWl4dWFuJyxcclxuICAgICAgJ3BhZ2VzL2ZvY3VzJ1xyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI0ZGNzQxRicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpJznjKvotrPnkIPlrp7ml7bmr5TliIYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnJyxcclxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxyXG4gICAgfSxcclxuICAgLyogdGFiQmFyOntcclxuICAgICAgY29sb3I6JyMzMzMnLFxyXG4gICAgICBzZWxlY3RlZENvbG9yOicjMmNiZDZjJyxcclxuICAgICAgYmFja2dyb3VuZENvbG9yOicjZmZmJyxcclxuICAgICAgYm9yZGVyU3R5bGU6JyNlMmUyZTInLFxyXG4gICAgICBsaXN0OltcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgICB0ZXh0OifpppbpobUnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL2NsYXNzLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9jbGFzcy1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZUNsYXNzJyxcclxuICAgICAgICAgICAgIHRleHQ6J+ivvueoiycsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZScsXHJcbiAgICAgICAgICAgICB0ZXh0OifmiJHnmoQnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL21lLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9tZS1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgfSovXHJcbiAgfVxyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGwsXHJcbiAgICBzZXNzaW9uSUQ6JycsXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXHJcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5JylcclxuICB9XHJcblxyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgdGhpcy5sb2dpbigpOyAgXHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbygpIHtcclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgfVxyXG4gICAgd2VweS5nZXRVc2VySW5mbygpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICB1cmw6IGFwaVBhdGgudXBkYXRlVXNlckluZm8sXHJcbiAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIGRhdGE6cmVzLnVzZXJJbmZvXHJcbiAgICAgICAgfSkudGhlbiggcmVzID0+IHsgY29uc29sZS5sb2cocmVzKSB9IClcclxuICAgIH0gKVxyXG4gIH1cclxuXHJcbiAgLy8g55m75b2VXHJcbiAgbG9naW4oKXtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIC8v55m75b2V5oCB6L+H5pyfXHJcbiAgICB3ZXB5LmxvZ2luKCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKTtcclxuICAgICAgICAgICAgICAgICAgLy/lj5HotbfnvZHnu5zor7fmsYJcclxuICAgICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGFwaVBhdGgubG9naW4sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGxvZ2luX3R5cGU6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5zZXNzaW9uSUQgPSByZXMuZGF0YS5kYXRhLnNlc3Npb25faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VsZi5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIEnICsgcmVzLmVyck1zZylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSApO1xyXG5cclxuICAgIC8vIHd4LmNoZWNrU2Vzc2lvbih7XHJcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCflt7LnmbvlvZUnKVxyXG4gICAgLy8gICAgICAgLy9zZXNzaW9uIOacqui/h+acn++8jOW5tuS4lOWcqOacrOeUn+WRveWRqOacn+S4gOebtOacieaViFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAgZmFpbDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvLyB9KVxyXG4gIH1cclxufVxyXG4iXX0=