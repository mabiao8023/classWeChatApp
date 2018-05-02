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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXNzaW9uSUQiLCJ1c2UiLCJsb2dpbiIsImdldFVzZXJJbmZvIiwidGhlbiIsInJlcyIsInJlcXVlc3QiLCJ1cmwiLCJ1cGRhdGVVc2VySW5mbyIsIm1ldGhvZCIsImhlYWRlciIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwic2VsZiIsImNvZGUiLCJzZXNzaW9uX2lkIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQWtERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBaERmQSxNQWdEZSxHQWhETjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGNBRkssRUFHTCxlQUhLLEVBSUwsZ0JBSkssRUFLTCxhQUxLLENBREE7QUFRUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLFVBSGxCO0FBSU5DLGdDQUF3QixFQUpsQjtBQUtOQywrQkFBdUI7QUFMakI7QUFPVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFmUSxLQWdETTtBQUFBLFVBTGZDLFVBS2UsR0FMRjtBQUNYQyxnQkFBVSxJQURDO0FBRVhDLGlCQUFVO0FBRkMsS0FLRTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUNBLFVBQUtBLEdBQUwsQ0FBUyxXQUFUO0FBSGE7QUFJZDs7OzsrQkFFVTtBQUNULFdBQUtDLEtBQUw7QUFDRDs7O2tDQUVhO0FBQUE7O0FBQ1osVUFBSSxLQUFLSixVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7QUFDRCxxQkFBS0ksV0FBTCxHQUFtQkMsSUFBbkIsQ0FBeUIsZUFBTztBQUM1QixlQUFLTixVQUFMLENBQWdCQyxRQUFoQixHQUEyQk0sSUFBSU4sUUFBL0I7QUFDQSx1QkFBS08sT0FBTCxDQUFhO0FBQ1ZDLGVBQUssaUJBQVFDLGNBREg7QUFFVkMsa0JBQU8sTUFGRztBQUdWQyxrQkFBUTtBQUNMLHFDQUF1QixPQUFLWixVQUFMLENBQWdCRTtBQURsQyxXQUhFO0FBTVZXLGdCQUFLTixJQUFJTjtBQU5DLFNBQWIsRUFPR0ssSUFQSCxDQU9TLGVBQU87QUFBRVEsa0JBQVFDLEdBQVIsQ0FBWVIsR0FBWjtBQUFrQixTQVBwQztBQVFILE9BVkQ7QUFXRDs7QUFFRDs7Ozs0QkFDTztBQUNMLFVBQUlTLE9BQU8sSUFBWDtBQUNBO0FBQ0EscUJBQUtaLEtBQUwsR0FBYUUsSUFBYixDQUFtQixlQUFPO0FBQ2hCLFlBQUlDLElBQUlVLElBQVIsRUFBYztBQUNaSCxrQkFBUUMsR0FBUixDQUFZUixJQUFJVSxJQUFoQjtBQUNFO0FBQ0EseUJBQUtULE9BQUwsQ0FBYTtBQUNYQyxpQkFBSyxpQkFBUUwsS0FERjtBQUVYTyxvQkFBTyxNQUZJO0FBR1hFLGtCQUFNO0FBQ0pJLG9CQUFNVixJQUFJVTtBQUROO0FBSEssV0FBYixFQU1HWCxJQU5ILENBTVMsZUFBTztBQUNkVSxpQkFBS2hCLFVBQUwsQ0FBZ0JFLFNBQWhCLEdBQTRCSyxJQUFJTSxJQUFKLENBQVNBLElBQVQsQ0FBY0ssVUFBMUM7QUFDQUYsaUJBQUtYLFdBQUw7QUFDRCxXQVREO0FBVUQsU0FiSCxNQWFTO0FBQ0xTLGtCQUFRQyxHQUFSLENBQVksZUFBZVIsSUFBSVksTUFBL0I7QUFDRDtBQUNKLE9BakJUOztBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDRDs7OztFQTNHMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IGFsZHN0YXQgZnJvbSAnLi9jb25maWcvYWxkLXN0YXQuanMnXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcclxuaW1wb3J0IGFwaVBhdGggZnJvbSAnLi9jb25maWcvY29uZmlnJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBwYWdlczogW1xyXG4gICAgICAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAncGFnZXMvcmVzdWx0JyxcclxuICAgICAgJ3BhZ2VzL2ZlYXR1cmUnLFxyXG4gICAgICAncGFnZXMvc2hhaXh1YW4nLFxyXG4gICAgICAncGFnZXMvZm9jdXMnXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRkY3NDFGJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WknOeMq+i2s+eQg+WunuaXtuavlOWIhicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICcnLFxyXG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXHJcbiAgICB9LFxyXG4gICAvKiB0YWJCYXI6e1xyXG4gICAgICBjb2xvcjonIzMzMycsXHJcbiAgICAgIHNlbGVjdGVkQ29sb3I6JyMyY2JkNmMnLFxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6JyNmZmYnLFxyXG4gICAgICBib3JkZXJTdHlsZTonI2UyZTJlMicsXHJcbiAgICAgIGxpc3Q6W1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgcGFnZVBhdGg6J3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgIHRleHQ6J+mmlumhtScsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvY2xhc3MucG5nJyxcclxuICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6Jy4vaW1hZ2VzL2NsYXNzLWFjdGl2ZS5wbmcnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgcGFnZVBhdGg6J3BhZ2VzL21lQ2xhc3MnLFxyXG4gICAgICAgICAgICAgdGV4dDon6K++56iLJyxcclxuICAgICAgICAgICAgIGljb25QYXRoOicuL2ltYWdlcy9mLWxlYXJuLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9mLWxlYXJuLWFjdGl2ZS5wbmcnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgcGFnZVBhdGg6J3BhZ2VzL21lJyxcclxuICAgICAgICAgICAgIHRleHQ6J+aIkeeahCcsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvbWUucG5nJyxcclxuICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6Jy4vaW1hZ2VzL21lLWFjdGl2ZS5wbmcnXHJcbiAgICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICB9Ki9cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIHNlc3Npb25JRDonJyxcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcclxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKVxyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICB0aGlzLmxvZ2luKCk7ICBcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKCkge1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB9XHJcbiAgICB3ZXB5LmdldFVzZXJJbmZvKCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgIHVybDogYXBpUGF0aC51cGRhdGVVc2VySW5mbyxcclxuICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgZGF0YTpyZXMudXNlckluZm9cclxuICAgICAgICB9KS50aGVuKCByZXMgPT4geyBjb25zb2xlLmxvZyhyZXMpIH0gKVxyXG4gICAgfSApXHJcbiAgfVxyXG5cclxuICAvLyDnmbvlvZVcclxuICBsb2dpbigpe1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgLy/nmbvlvZXmgIHov4fmnJ9cclxuICAgIHdlcHkubG9naW4oKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAvL+WPkei1t+e9kee7nOivt+axglxyXG4gICAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYXBpUGF0aC5sb2dpbixcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IHJlcy5jb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5zZXNzaW9uSUQgPSByZXMuZGF0YS5kYXRhLnNlc3Npb25faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIEnICsgcmVzLmVyck1zZylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSApO1xyXG5cclxuICAgIC8vIHd4LmNoZWNrU2Vzc2lvbih7XHJcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCflt7LnmbvlvZUnKVxyXG4gICAgLy8gICAgICAgLy9zZXNzaW9uIOacqui/h+acn++8jOW5tuS4lOWcqOacrOeUn+WRveWRqOacn+S4gOebtOacieaViFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAgZmFpbDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvLyB9KVxyXG4gIH1cclxufVxyXG4iXX0=