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
      pages: ['pages/index', 'pages/class', 'pages/classDetail', 'pages/classPlay', 'pages/airticle', 'pages/me', 'pages/meClass'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXNzaW9uSUQiLCJ1c2UiLCJsb2dpbiIsIndlcHkiLCJnZXRVc2VySW5mbyIsInRoZW4iLCJyZXMiLCJyZXF1ZXN0IiwidXJsIiwiYXBpUGF0aCIsInVwZGF0ZVVzZXJJbmZvIiwibWV0aG9kIiwiaGVhZGVyIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJzZWxmIiwiY29kZSIsInNlc3Npb25faWQiLCJlcnJNc2ciLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBbURFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUFqRGZBLE1BaURlLEdBakROO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLG1CQUhLLEVBSUwsaUJBSkssRUFLTCxnQkFMSyxFQU1MLFVBTkssRUFPTCxlQVBLLENBREE7QUFVUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLE1BSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQVZEO0FBZ0JQQyxjQUFPO0FBQ0xDLGVBQU0sTUFERDtBQUVMQyx1QkFBYyxTQUZUO0FBR0xDLHlCQUFnQixNQUhYO0FBSUxDLHFCQUFZLE9BSlA7QUFLTEMsY0FBSyxDQUNEO0FBQ0dDLG9CQUFTLGFBRFo7QUFFR0MsZ0JBQUssSUFGUjtBQUdHQyxvQkFBUyxvQkFIWjtBQUlHQyw0QkFBaUI7QUFKcEIsU0FEQyxFQU9EO0FBQ0dILG9CQUFTLGVBRFo7QUFFR0MsZ0JBQUssSUFGUjtBQUdHQyxvQkFBUyxzQkFIWjtBQUlHQyw0QkFBaUI7QUFKcEIsU0FQQyxFQWFEO0FBQ0dILG9CQUFTLFVBRFo7QUFFR0MsZ0JBQUssSUFGUjtBQUdHQyxvQkFBUyxpQkFIWjtBQUlHQyw0QkFBaUI7QUFKcEIsU0FiQztBQUxBO0FBaEJBLEtBaURNO0FBQUEsVUFMZkMsVUFLZSxHQUxGO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsaUJBQVU7QUFGQyxLQUtFOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFIYTtBQUlkOzs7OytCQUVVO0FBQ1QsV0FBS0MsS0FBTDtBQUNEOzs7a0NBRWE7QUFBQTs7QUFDWixVQUFJLEtBQUtKLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNESSxxQkFBS0MsV0FBTCxHQUFtQkMsSUFBbkIsQ0FBeUIsZUFBTztBQUM1QixlQUFLUCxVQUFMLENBQWdCQyxRQUFoQixHQUEyQk8sSUFBSVAsUUFBL0I7QUFDQUksdUJBQUtJLE9BQUwsQ0FBYTtBQUNWQyxlQUFLQyxpQkFBUUMsY0FESDtBQUVWQyxrQkFBTyxNQUZHO0FBR1ZDLGtCQUFRO0FBQ0wscUNBQXVCLE9BQUtkLFVBQUwsQ0FBZ0JFO0FBRGxDLFdBSEU7QUFNVmEsZ0JBQUtQLElBQUlQO0FBTkMsU0FBYixFQU9HTSxJQVBILENBT1MsZUFBTztBQUFFUyxrQkFBUUMsR0FBUixDQUFZVCxHQUFaO0FBQWtCLFNBUHBDO0FBUUgsT0FWRDtBQVdEOztBQUVEOzs7OzRCQUNPO0FBQ0wsVUFBSVUsT0FBTyxJQUFYO0FBQ0E7QUFDQWIscUJBQUtELEtBQUwsR0FBYUcsSUFBYixDQUFtQixlQUFPO0FBQ2hCLFlBQUlDLElBQUlXLElBQVIsRUFBYztBQUNaSCxrQkFBUUMsR0FBUixDQUFZVCxJQUFJVyxJQUFoQjtBQUNFO0FBQ0FkLHlCQUFLSSxPQUFMLENBQWE7QUFDWEMsaUJBQUtDLGlCQUFRUCxLQURGO0FBRVhTLG9CQUFPLE1BRkk7QUFHWEUsa0JBQU07QUFDSkksb0JBQU1YLElBQUlXO0FBRE47QUFISyxXQUFiLEVBTUdaLElBTkgsQ0FNUyxlQUFPO0FBQ2RXLGlCQUFLbEIsVUFBTCxDQUFnQkUsU0FBaEIsR0FBNEJNLElBQUlPLElBQUosQ0FBU0EsSUFBVCxDQUFjSyxVQUExQztBQUNBRixpQkFBS1osV0FBTDtBQUNELFdBVEQ7QUFVRCxTQWJILE1BYVM7QUFDTFUsa0JBQVFDLEdBQVIsQ0FBWSxlQUFlVCxJQUFJYSxNQUEvQjtBQUNEO0FBQ0osT0FqQlQ7O0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNEOzs7O0VBNUcwQmhCLGVBQUtpQixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IGFsZHN0YXQgZnJvbSAnLi9jb25maWcvYWxkLXN0YXQuanMnXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuaW1wb3J0IGFwaVBhdGggZnJvbSAnLi9jb25maWcvY29uZmlnJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9jbGFzcycsXG4gICAgICAncGFnZXMvY2xhc3NEZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2NsYXNzUGxheScsXG4gICAgICAncGFnZXMvYWlydGljbGUnLFxuICAgICAgJ3BhZ2VzL21lJyxcbiAgICAgICdwYWdlcy9tZUNsYXNzJ1xuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMyY2JkNmMnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WknOeMq+i2s+eQgycsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcbiAgICB0YWJCYXI6e1xuICAgICAgY29sb3I6JyMzMzMnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjonIzJjYmQ2YycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6JyNmZmYnLFxuICAgICAgYm9yZGVyU3R5bGU6J3doaXRlJyxcbiAgICAgIGxpc3Q6W1xuICAgICAgICAgIHtcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvaW5kZXgnLFxuICAgICAgICAgICAgIHRleHQ6J+mmlumhtScsXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL2NsYXNzLnBuZycsXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvY2xhc3MtYWN0aXZlLnBuZydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvbWVDbGFzcycsXG4gICAgICAgICAgICAgdGV4dDon6K++56iLJyxcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi5wbmcnLFxuICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6Jy4vaW1hZ2VzL2YtbGVhcm4tYWN0aXZlLnBuZydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICBwYWdlUGF0aDoncGFnZXMvbWUnLFxuICAgICAgICAgICAgIHRleHQ6J+aIkeeahCcsXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL21lLnBuZycsXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvbWUtYWN0aXZlLnBuZydcbiAgICAgICAgICB9XG4gICAgICBdLFxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgc2Vzc2lvbklEOicnLFxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpXG4gIH1cblxuICBvbkxhdW5jaCgpIHtcbiAgICB0aGlzLmxvZ2luKCk7ICBcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cbiAgICB9XG4gICAgd2VweS5nZXRVc2VySW5mbygpLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICB1cmw6IGFwaVBhdGgudXBkYXRlVXNlckluZm8sXG4gICAgICAgICAgIG1ldGhvZDonUE9TVCcsXG4gICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgZGF0YTpyZXMudXNlckluZm9cbiAgICAgICAgfSkudGhlbiggcmVzID0+IHsgY29uc29sZS5sb2cocmVzKSB9IClcbiAgICB9IClcbiAgfVxuXG4gIC8vIOeZu+W9lVxuICBsb2dpbigpe1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAvL+eZu+W9leaAgei/h+acn1xuICAgIHdlcHkubG9naW4oKS50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSk7XG4gICAgICAgICAgICAgICAgICAvL+WPkei1t+e9kee7nOivt+axglxuICAgICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBhcGlQYXRoLmxvZ2luLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29kZTogcmVzLmNvZGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSkudGhlbiggcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnNlc3Npb25JRCA9IHJlcy5kYXRhLmRhdGEuc2Vzc2lvbl9pZDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRVc2VySW5mbygpO1xuICAgICAgICAgICAgICAgICAgfSApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIEnICsgcmVzLmVyck1zZylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICk7XG5cbiAgICAvLyB3eC5jaGVja1Nlc3Npb24oe1xuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCflt7LnmbvlvZUnKVxuICAgIC8vICAgICAgIC8vc2Vzc2lvbiDmnKrov4fmnJ/vvIzlubbkuJTlnKjmnKznlJ/lkb3lkajmnJ/kuIDnm7TmnInmlYhcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgZmFpbDogZnVuY3Rpb24oKXtcblxuICAgIC8vIH0pXG4gIH1cbn1cbiJdfQ==