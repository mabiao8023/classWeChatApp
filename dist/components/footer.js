'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./../config/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import abc from 'abc'


var Contact = function (_wepy$component) {
  _inherits(Contact, _wepy$component);

  function Contact() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Contact);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Contact.__proto__ || Object.getPrototypeOf(Contact)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      list: []
    }, _this.events = {}, _this.methods = {
      gotoWxApp: function gotoWxApp(item) {
        if (item.type == 0) {
          wx.navigateTo({
            url: '/pages/webview?url=' + item.url
          });
        } else {
          wx.navigateToMiniProgram({
            appId: item.appid,
            path: '',
            extraData: {
              foo: 'bar'
            },
            envVersion: 'release',
            success: function success(res) {
              // 打开成功
            }
          });
        }
      },
      gotosx: function gotosx() {
        wx.navigateTo({
          url: '/pages/webview'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Contact, [{
    key: 'getFooterData',


    /* 获取页脚tab的数据 */
    value: function getFooterData() {
      var _this2 = this;

      return _wepy2.default.request({ url: _config2.default.footerList,
        header: {
          'Authorization': '' + this.$parent.$parent.globalData.token
        } }).then(function (res) {
        _this2.list = res.data.data.list;
        _this2.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.getFooterData();
    }
  }]);

  return Contact;
}(_wepy2.default.component);

exports.default = Contact;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5qcyJdLCJuYW1lcyI6WyJDb250YWN0IiwiZGF0YSIsImxpc3QiLCJldmVudHMiLCJtZXRob2RzIiwiZ290b1d4QXBwIiwiaXRlbSIsInR5cGUiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsImFwcGlkIiwicGF0aCIsImV4dHJhRGF0YSIsImZvbyIsImVudlZlcnNpb24iLCJzdWNjZXNzIiwicmVzIiwiZ290b3N4Iiwid2VweSIsInJlcXVlc3QiLCJhcGlQYXRoIiwiZm9vdGVyTGlzdCIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidG9rZW4iLCJ0aGVuIiwiJGFwcGx5IiwiZ2V0Rm9vdGVyRGF0YSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFFQzs7Ozs7Ozs7Ozs7QUFERDs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFFbkJDLEksR0FBTztBQUNIQyxZQUFLO0FBREYsSyxRQUlQQyxNLEdBQVMsRSxRQUlUQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDRUMsSUFERixFQUNPO0FBQ2IsWUFBSUEsS0FBS0MsSUFBTCxJQUFhLENBQWpCLEVBQW9CO0FBQ2pCQyxhQUFHQyxVQUFILENBQWM7QUFDWEMsaUJBQUssd0JBQXdCSixLQUFLSTtBQUR2QixXQUFkO0FBR0YsU0FKRCxNQUlLO0FBQ0ZGLGFBQUdHLHFCQUFILENBQXlCO0FBQ3hCQyxtQkFBT04sS0FBS08sS0FEWTtBQUV4QkMsa0JBQU0sRUFGa0I7QUFHeEJDLHVCQUFXO0FBQ1RDLG1CQUFLO0FBREksYUFIYTtBQU14QkMsd0JBQVksU0FOWTtBQU94QkMsbUJBUHdCLG1CQU9oQkMsR0FQZ0IsRUFPWDtBQUNYO0FBQ0Q7QUFUdUIsV0FBekI7QUFXRjtBQUVGLE9BcEJPO0FBcUJSQyxZQXJCUSxvQkFxQkE7QUFDTFosV0FBR0MsVUFBSCxDQUFjO0FBQ1hDO0FBRFcsU0FBZDtBQUdGO0FBekJPLEs7Ozs7Ozs7QUE0QlY7b0NBQ2lCO0FBQUE7O0FBQ1gsYUFBT1csZUFBS0MsT0FBTCxDQUFhLEVBQUNaLEtBQUlhLGlCQUFRQyxVQUFiO0FBQ2ZDLGdCQUFRO0FBQ0wsZ0NBQW9CLEtBQUtDLE9BQUwsQ0FBYUEsT0FBYixDQUFxQkMsVUFBckIsQ0FBZ0NDO0FBRC9DLFNBRE8sRUFBYixFQUlKQyxJQUpJLENBSUUsZUFBTztBQUNWLGVBQUszQixJQUFMLEdBQVlpQixJQUFJbEIsSUFBSixDQUFTQSxJQUFULENBQWNDLElBQTFCO0FBQ0EsZUFBSzRCLE1BQUw7QUFDSCxPQVBJLENBQVA7QUFRSDs7OzZCQUVLO0FBQ04sV0FBS0MsYUFBTDtBQUNEOzs7O0VBcERrQ1YsZUFBS1csUzs7a0JBQXJCaEMsTyIsImZpbGUiOiJmb290ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIC8vIGltcG9ydCBhYmMgZnJvbSAnYWJjJ1xyXG4gICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsaXN0OltdXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGdvdG9XeEFwcChpdGVtKXtcclxuICAgICAgICBpZiggaXRlbS50eXBlID09IDAgKXtcclxuICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvd2Vidmlldz91cmw9JyArIGl0ZW0udXJsXHJcbiAgICAgICAgICAgfSkgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6IGl0ZW0uYXBwaWQsXHJcbiAgICAgICAgICAgIHBhdGg6ICcnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgIFxyXG4gICAgICB9LFxyXG4gICAgICBnb3Rvc3goKXtcclxuICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy93ZWJ2aWV3YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICAvKiDojrflj5bpobXohJp0YWLnmoTmlbDmja4gKi9cclxuICAgICAgZ2V0Rm9vdGVyRGF0YSgpe1xyXG4gICAgICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGguZm9vdGVyTGlzdCxcclxuICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50LiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgIHRoaXMuZ2V0Rm9vdGVyRGF0YSgpO1xyXG4gICAgfVxyXG4gIH1cclxuIl19