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
    value: function onLaunch() {}
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
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2UiLCJjYiIsImdldFVzZXJJbmZvIiwidGhlbiIsInJlcyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OztBQWtERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBL0NmQSxNQStDZSxHQS9DTjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxtQkFISyxFQUlMLGdCQUpLLEVBS0wsVUFMSyxFQU1MLGVBTkssQ0FEQTtBQVNQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixNQUZ4QjtBQUdOQyxnQ0FBd0IsTUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BVEQ7QUFlUEMsY0FBTztBQUNMQyxlQUFNLE1BREQ7QUFFTEMsdUJBQWMsRUFGVDtBQUdMQyx5QkFBZ0IsRUFIWDtBQUlMQyxxQkFBWSxTQUpQO0FBS0xDLGNBQUssQ0FDRDtBQUNHQyxvQkFBUyxhQURaO0FBRUdDLGdCQUFLLElBRlI7QUFHR0Msb0JBQVMsb0JBSFo7QUFJR0MsNEJBQWlCO0FBSnBCLFNBREMsRUFPRDtBQUNHSCxvQkFBUyxlQURaO0FBRUdDLGdCQUFLLElBRlI7QUFHR0Msb0JBQVMsc0JBSFo7QUFJR0MsNEJBQWlCO0FBSnBCLFNBUEMsRUFhRDtBQUNHSCxvQkFBUyxVQURaO0FBRUdDLGdCQUFLLElBRlI7QUFHR0Msb0JBQVMsaUJBSFo7QUFJR0MsNEJBQWlCO0FBSnBCLFNBYkM7QUFMQTtBQWZBLEtBK0NNO0FBQUEsVUFKZkMsVUFJZSxHQUpGO0FBQ1hDLGdCQUFVO0FBREMsS0FJRTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUNBLFVBQUtBLEdBQUwsQ0FBUyxXQUFUO0FBSGE7QUFJZDs7OzsrQkFFVSxDQUVWOzs7Z0NBRVdDLEUsRUFBSTtBQUFBOztBQUNkLFVBQUksS0FBS0gsVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDNUIsZUFBTyxLQUFLRCxVQUFMLENBQWdCQyxRQUF2QjtBQUNEO0FBQ0QscUJBQUtHLFdBQUwsR0FBbUJDLElBQW5CLENBQXlCLGVBQU87QUFDNUIsZUFBS0wsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJLLElBQUlMLFFBQS9CO0FBQ0FFLGNBQU1BLEdBQUdHLElBQUlMLFFBQVAsQ0FBTjtBQUNILE9BSEQ7QUFJRDs7OztFQWxFMEIsZUFBS00sRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL2NsYXNzJyxcclxuICAgICAgJ3BhZ2VzL2NsYXNzRGV0YWlsJyxcclxuICAgICAgJ3BhZ2VzL2FpcnRpY2xlJyxcclxuICAgICAgJ3BhZ2VzL21lJyxcclxuICAgICAgJ3BhZ2VzL21lQ2xhc3MnXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WknOeMq+i2s+eQgycsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgIH0sXHJcbiAgICB0YWJCYXI6e1xyXG4gICAgICBjb2xvcjonIzMzMycsXHJcbiAgICAgIHNlbGVjdGVkQ29sb3I6JycsXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjonJyxcclxuICAgICAgYm9yZGVyU3R5bGU6JyNlMmUyZTInLFxyXG4gICAgICBsaXN0OltcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgICB0ZXh0OifpppbpobUnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL2NsYXNzLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9jbGFzcy1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZUNsYXNzJyxcclxuICAgICAgICAgICAgIHRleHQ6J+ivvueoiycsXHJcbiAgICAgICAgICAgICBpY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi5wbmcnLFxyXG4gICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDonLi9pbWFnZXMvZi1sZWFybi1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHBhZ2VQYXRoOidwYWdlcy9tZScsXHJcbiAgICAgICAgICAgICB0ZXh0OifmiJHnmoQnLFxyXG4gICAgICAgICAgICAgaWNvblBhdGg6Jy4vaW1hZ2VzL21lLnBuZycsXHJcbiAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOicuL2ltYWdlcy9tZS1hY3RpdmUucG5nJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiBudWxsXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXHJcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5JylcclxuICB9XHJcblxyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgICBcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cclxuICAgIH1cclxuICAgIHdlcHkuZ2V0VXNlckluZm8oKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcclxuICAgIH0gKVxyXG4gIH1cclxufVxyXG4iXX0=