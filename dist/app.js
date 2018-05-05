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
            self.globalData.token = res.data.data.token;
            wx.setStorageSync({
              key: "token",
              data: res.data.data.token
            });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ0b2tlbiIsInVzZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJlIiwibG9naW4iLCJnZXRVc2VySW5mbyIsInRoZW4iLCJyZXMiLCJyZXF1ZXN0IiwidXJsIiwidXBkYXRlVXNlckluZm8iLCJtZXRob2QiLCJoZWFkZXIiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInNlbGYiLCJjb2RlIiwibG9naW5fdHlwZSIsInNldFN0b3JhZ2VTeW5jIiwia2V5IiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQWtERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBaERmQSxNQWdEZSxHQWhETjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGNBRkssRUFHTCxlQUhLLEVBSUwsZ0JBSkssRUFLTCxhQUxLLENBREE7QUFRUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLFVBSGxCO0FBSU5DLGdDQUF3QixFQUpsQjtBQUtOQywrQkFBdUI7QUFMakI7QUFPVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFmUSxLQWdETTtBQUFBLFVBTGZDLFVBS2UsR0FMRjtBQUNYQyxnQkFBVSxJQURDO0FBRVhDLGFBQU07QUFGSyxLQUtFOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFIYTtBQUlkOzs7OytCQUVVOztBQUVULFVBQUk7QUFDRixhQUFLSCxVQUFMLENBQWdCRSxLQUFoQixHQUF3QkUsR0FBR0MsY0FBSCxDQUFrQixPQUFsQixDQUF4QjtBQUNELE9BRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVU7QUFDVjtBQUNBLGFBQUtOLFVBQUwsQ0FBZ0JFLEtBQWhCLEdBQXdCLEVBQXhCO0FBQ0Q7QUFDRCxVQUFJLENBQUMsS0FBS0YsVUFBTCxDQUFnQkUsS0FBckIsRUFBNEI7QUFDMUIsYUFBS0ssS0FBTDtBQUNEO0FBRUY7OztrQ0FFYTtBQUFBOztBQUNaLFVBQUksS0FBS1AsVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDNUIsZUFBTyxLQUFLRCxVQUFMLENBQWdCQyxRQUF2QjtBQUNEO0FBQ0QscUJBQUtPLFdBQUwsR0FBbUJDLElBQW5CLENBQXlCLGVBQU87QUFDNUIsZUFBS1QsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJTLElBQUlULFFBQS9CO0FBQ0EsdUJBQUtVLE9BQUwsQ0FBYTtBQUNWQyxlQUFLLGlCQUFRQyxjQURIO0FBRVZDLGtCQUFPLE1BRkc7QUFHVkMsa0JBQVE7QUFDTCxrQ0FBb0IsT0FBS2YsVUFBTCxDQUFnQkU7QUFEL0IsV0FIRTtBQU1WYyxnQkFBS04sSUFBSVQ7QUFOQyxTQUFiLEVBT0dRLElBUEgsQ0FPUyxlQUFPO0FBQUVRLGtCQUFRQyxHQUFSLENBQVlSLEdBQVo7QUFBa0IsU0FQcEM7QUFRSCxPQVZEO0FBV0Q7O0FBRUQ7Ozs7NEJBQ087QUFDTCxVQUFJUyxPQUFPLElBQVg7QUFDQTtBQUNBLHFCQUFLWixLQUFMLEdBQWFFLElBQWIsQ0FBbUIsZUFBTztBQUNoQixZQUFJQyxJQUFJVSxJQUFSLEVBQWM7QUFDWkgsa0JBQVFDLEdBQVIsQ0FBWVIsSUFBSVUsSUFBaEI7QUFDRTtBQUNBLHlCQUFLVCxPQUFMLENBQWE7QUFDWEMsaUJBQUssaUJBQVFMLEtBREY7QUFFWE8sb0JBQU8sS0FGSTtBQUdYRSxrQkFBTTtBQUNKSywwQkFBWSxDQURSO0FBRUpELG9CQUFNVixJQUFJVTtBQUZOO0FBSEssV0FBYixFQU9HWCxJQVBILENBT1MsZUFBTztBQUNkUSxvQkFBUUMsR0FBUixDQUFZUixHQUFaO0FBQ0FTLGlCQUFLbkIsVUFBTCxDQUFnQkUsS0FBaEIsR0FBd0JRLElBQUlNLElBQUosQ0FBU0EsSUFBVCxDQUFjZCxLQUF0QztBQUNBRSxlQUFHa0IsY0FBSCxDQUFrQjtBQUNoQkMsbUJBQUksT0FEWTtBQUVoQlAsb0JBQU1OLElBQUlNLElBQUosQ0FBU0EsSUFBVCxDQUFjZDtBQUZKLGFBQWxCO0FBSUE7QUFDRCxXQWZEO0FBZ0JELFNBbkJILE1BbUJTO0FBQ0xlLGtCQUFRQyxHQUFSLENBQVksZUFBZVIsSUFBSWMsTUFBL0I7QUFDRDtBQUNKLE9BdkJUOztBQXlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDRDs7OztFQTNIMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IGFsZHN0YXQgZnJvbSAnLi9jb25maWcvYWxkLXN0YXQuanMnXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcclxuaW1wb3J0IGFwaVBhdGggZnJvbSAnLi9jb25maWcvY29uZmlnJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBwYWdlczogW1xyXG4gICAgICAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAncGFnZXMvcmVzdWx0JyxcclxuICAgICAgJ3BhZ2VzL2ZlYXR1cmUnLFxyXG4gICAgICAncGFnZXMvc2hhaXh1YW4nLFxyXG4gICAgICAncGFnZXMvZm9jdXMnXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRkY3NDFGJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WknOeMq+i2s+eQg+WunuaXtuavlOWIhicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICcnLFxyXG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXHJcbiAgICB9LFxyXG4gICAvKiB0YWJCYXI6e1xyXG4gICAgICBjb2xvcjonIzMzMycsXHJcbiAgICAgIHNlbGVjdGVkQ29sb3I6JyMyY2JkNmMnLFxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6JyNmZmYnLFxyXG4gICAgICBib3JkZXJTdHlsZTonI2UyZTJlMicsXHJcbiAgICAgIGxpc3Q6W1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgcGFnZVBhdGg6J3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgIHRleHQ6J+mmlumhtScsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvY2xhc3MucG5nJyxcclxuICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6Jy4vaW1hZ2VzL2NsYXNzLWFjdGl2ZS5wbmcnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgcGFnZVBhdGg6J3BhZ2VzL21lQ2xhc3MnLFxyXG4gICAgICAgICAgICAgdGV4dDon6K++56iLJyxcclxuICAgICAgICAgICAgIGljb25QYXRoOicuL2ltYWdlcy9mLWxlYXJuLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9mLWxlYXJuLWFjdGl2ZS5wbmcnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgcGFnZVBhdGg6J3BhZ2VzL21lJyxcclxuICAgICAgICAgICAgIHRleHQ6J+aIkeeahCcsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvbWUucG5nJyxcclxuICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6Jy4vaW1hZ2VzL21lLWFjdGl2ZS5wbmcnXHJcbiAgICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICB9Ki9cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIHRva2VuOicnLFxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpXHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaCgpIHtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLmdsb2JhbERhdGEudG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvLyBEbyBzb21ldGhpbmcgd2hlbiBjYXRjaCBlcnJvclxyXG4gICAgICB0aGlzLmdsb2JhbERhdGEudG9rZW4gPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgaWYoICF0aGlzLmdsb2JhbERhdGEudG9rZW4gKXtcclxuICAgICAgdGhpcy5sb2dpbigpOyBcclxuICAgIH1cclxuICAgICBcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKCkge1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB9XHJcbiAgICB3ZXB5LmdldFVzZXJJbmZvKCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgIHVybDogYXBpUGF0aC51cGRhdGVVc2VySW5mbyxcclxuICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIGRhdGE6cmVzLnVzZXJJbmZvXHJcbiAgICAgICAgfSkudGhlbiggcmVzID0+IHsgY29uc29sZS5sb2cocmVzKSB9IClcclxuICAgIH0gKVxyXG4gIH1cclxuXHJcbiAgLy8g55m75b2VXHJcbiAgbG9naW4oKXtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIC8v55m75b2V5oCB6L+H5pyfXHJcbiAgICB3ZXB5LmxvZ2luKCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKTtcclxuICAgICAgICAgICAgICAgICAgLy/lj5HotbfnvZHnu5zor7fmsYJcclxuICAgICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGFwaVBhdGgubG9naW4sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGxvZ2luX3R5cGU6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS50b2tlbiA9IHJlcy5kYXRhLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoe1xyXG4gICAgICAgICAgICAgICAgICAgICAga2V5OlwidG9rZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHJlcy5kYXRhLmRhdGEudG9rZW5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGYuZ2V0VXNlckluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgfSApXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W55So5oi355m75b2V5oCB5aSx6LSl77yBJyArIHJlcy5lcnJNc2cpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gKTtcclxuXHJcbiAgICAvLyB3eC5jaGVja1Nlc3Npb24oe1xyXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZygn5bey55m75b2VJylcclxuICAgIC8vICAgICAgIC8vc2Vzc2lvbiDmnKrov4fmnJ/vvIzlubbkuJTlnKjmnKznlJ/lkb3lkajmnJ/kuIDnm7TmnInmlYhcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIGZhaWw6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgLy8gfSlcclxuICB9XHJcbn1cclxuIl19