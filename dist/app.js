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
      pages: ['pages/index', 'pages/webview'],
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
    value: function onLaunch() {}

    // try {
    //   this.globalData.token = wx.getStorageSync('token')
    // } catch (e) {
    //   // Do something when catch error
    //   this.globalData.token = "";
    // }
    // if( !this.globalData.token ){
    //   this.login(); 
    // }

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
              login_type: 4,
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
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ0b2tlbiIsInVzZSIsInNlbGYiLCJ3ZXB5IiwibG9naW4iLCJ0aGVuIiwicmVzIiwiY29kZSIsInJlcXVlc3QiLCJ1cmwiLCJhcGlQYXRoIiwibWV0aG9kIiwiZGF0YSIsImxvZ2luX3R5cGUiLCJ3eCIsInNldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsImVyck1zZyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUErQ0Usc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQTdDZkEsTUE2Q2UsR0E3Q047QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxlQUZLLENBREE7QUFLUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLE1BSGxCO0FBSU5DLGdDQUF3QixFQUpsQjtBQUtOQywrQkFBdUI7QUFMakI7QUFPVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFaUSxLQTZDTTtBQUFBLFVBTGZDLFVBS2UsR0FMRjtBQUNYQyxnQkFBVSxJQURDO0FBRVhDLGFBQU07QUFGSyxLQUtFOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFIYTtBQUlkOzs7OytCQUVVLENBWVY7O0FBVkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlKOzs7OzRCQUNPO0FBQ0wsVUFBSUMsT0FBTyxJQUFYO0FBQ0E7QUFDQUMscUJBQUtDLEtBQUwsR0FBYUMsSUFBYixDQUFtQixlQUFPO0FBQ2hCLFlBQUlDLElBQUlDLElBQVIsRUFBYztBQUNWO0FBQ0FKLHlCQUFLSyxPQUFMLENBQWE7QUFDWEMsaUJBQUtDLGlCQUFRTixLQURGO0FBRVhPLG9CQUFPLEtBRkk7QUFHWEMsa0JBQU07QUFDSkMsMEJBQVksQ0FEUjtBQUVKTixvQkFBTUQsSUFBSUM7QUFGTjtBQUhLLFdBQWIsRUFPR0YsSUFQSCxDQU9TLGVBQU87QUFDZEgsaUJBQUtKLFVBQUwsQ0FBZ0JFLEtBQWhCLEdBQXdCTSxJQUFJTSxJQUFKLENBQVNBLElBQVQsQ0FBY1osS0FBdEM7QUFDQWMsZUFBR0MsY0FBSCxDQUFrQixPQUFsQixFQUEwQlQsSUFBSU0sSUFBSixDQUFTQSxJQUFULENBQWNaLEtBQXhDO0FBQ0E7QUFDRCxXQVhEO0FBWUQsU0FkSCxNQWNTO0FBQ0xnQixrQkFBUUMsR0FBUixDQUFZLGVBQWVYLElBQUlZLE1BQS9CO0FBQ0Q7QUFDSixPQWxCVDtBQW1CRDs7OztFQXpGMEJmLGVBQUtnQixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgYWxkc3RhdCBmcm9tICcuL2NvbmZpZy9hbGQtc3RhdC5qcydcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5pbXBvcnQgYXBpUGF0aCBmcm9tICcuL2NvbmZpZy9jb25maWcnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICdwYWdlcy93ZWJ2aWV3J1xyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI0ZGNzQxRicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotZvkuovmr5TliIYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnJyxcclxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxyXG4gICAgfSxcclxuICAgLyogdGFiQmFyOntcclxuICAgICAgY29sb3I6JyMzMzMnLFxyXG4gICAgICBzZWxlY3RlZENvbG9yOicjMmNiZDZjJyxcclxuICAgICAgYmFja2dyb3VuZENvbG9yOicjZmZmJyxcclxuICAgICAgYm9yZGVyU3R5bGU6JyNlMmUyZTInLFxyXG4gICAgICBsaXN0OltcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgICB0ZXh0OifpppbpobUnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL2NsYXNzLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9jbGFzcy1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZUNsYXNzJyxcclxuICAgICAgICAgICAgIHRleHQ6J+ivvueoiycsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZScsXHJcbiAgICAgICAgICAgICB0ZXh0OifmiJHnmoQnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL21lLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9tZS1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgfSovXHJcbiAgfVxyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGwsXHJcbiAgICB0b2tlbjonJyxcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcclxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKVxyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcblxyXG4gICAgICAvLyB0cnkge1xyXG4gICAgICAvLyAgIHRoaXMuZ2xvYmFsRGF0YS50b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXHJcbiAgICAgIC8vIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgLy8gICAvLyBEbyBzb21ldGhpbmcgd2hlbiBjYXRjaCBlcnJvclxyXG4gICAgICAvLyAgIHRoaXMuZ2xvYmFsRGF0YS50b2tlbiA9IFwiXCI7XHJcbiAgICAgIC8vIH1cclxuICAgICAgLy8gaWYoICF0aGlzLmdsb2JhbERhdGEudG9rZW4gKXtcclxuICAgICAgLy8gICB0aGlzLmxvZ2luKCk7IFxyXG4gICAgICAvLyB9XHJcbiAgICAgXHJcbiAgfVxyXG5cclxuICAvLyDnmbvlvZVcclxuICBsb2dpbigpe1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgLy/nmbvlvZXmgIHov4fmnJ9cclxuICAgIHdlcHkubG9naW4oKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAvL+WPkei1t+e9kee7nOivt+axglxyXG4gICAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYXBpUGF0aC5sb2dpbixcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbG9naW5fdHlwZTogNCxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IHJlcy5jb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS50b2tlbiA9IHJlcy5kYXRhLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJ0b2tlblwiLHJlcy5kYXRhLmRhdGEudG9rZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VsZi5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIEnICsgcmVzLmVyck1zZylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSApO1xyXG4gIH1cclxufVxyXG4iXX0=