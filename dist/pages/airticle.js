'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _config = require('./../config/config.js');

var _config2 = _interopRequireDefault(_config);

var _contact = require('./../components/contact.js');

var _contact2 = _interopRequireDefault(_contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// alias example

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '夜猫足球--阅读文章'
    }, _this.components = {
      contact: _contact2.default
    }, _this.mixins = [_test2.default], _this.data = {
      articleId: 22,
      article: {}
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'getMeClassList',
    value: function getMeClassList() {
      var _this2 = this;

      _wepy2.default.request({
        url: _config2.default.userArticle,
        method: "GET",
        data: {
          resource_id: this.articleId
        },
        header: {
          'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
        }
      }).then(function (res) {
        _this2.article = res.data.data;
        _this2.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      console.log(options);
      this.articleId = options.id;
      this.getMeClassList();
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      return {
        title: '夜猫足彩课程',
        path: '/pages/index',
        imageUrl: '/images/share_img.jpg',
        success: function success(res) {
          // 转发成功
        },
        fail: function fail(res) {
          // 转发失败
        }
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/airticle'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFpcnRpY2xlLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJjb250YWN0IiwibWl4aW5zIiwiZGF0YSIsImFydGljbGVJZCIsImFydGljbGUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJldmVudHMiLCJyZXF1ZXN0IiwidXJsIiwidXNlckFydGljbGUiLCJtZXRob2QiLCJyZXNvdXJjZV9pZCIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2Vzc2lvbklEIiwidGhlbiIsInJlcyIsIiRhcHBseSIsIm9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJnZXRNZUNsYXNzTGlzdCIsInRpdGxlIiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQTJDOztJQUV0QkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUliQyxNLEdBQVMsZ0IsUUFFVEMsSSxHQUFPO0FBQ0xDLGlCQUFVLEVBREw7QUFFTEMsZUFBUTtBQUZILEssUUFLUEMsUSxHQUFXLEUsUUFJWEMsTyxHQUFVLEUsUUFJVkMsTSxHQUFTLEU7Ozs7O3FDQUlPO0FBQUE7O0FBQ1oscUJBQUtDLE9BQUwsQ0FBYTtBQUNUQyxhQUFJLGlCQUFRQyxXQURIO0FBRVRDLGdCQUFPLEtBRkU7QUFHVFQsY0FBSztBQUNIVSx1QkFBWSxLQUFLVDtBQURkLFNBSEk7QUFNVFUsZ0JBQVE7QUFDTixtQ0FBdUIsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR6QztBQU5DLE9BQWIsRUFTS0MsSUFUTCxDQVNXLGVBQU87QUFDZCxlQUFLYixPQUFMLEdBQWVjLElBQUloQixJQUFKLENBQVNBLElBQXhCO0FBQ0EsZUFBS2lCLE1BQUw7QUFDRixPQVpGO0FBYUg7OzsyQkFFTUMsTyxFQUFTO0FBQ2RDLGNBQVFDLEdBQVIsQ0FBWUYsT0FBWjtBQUNBLFdBQUtqQixTQUFMLEdBQWlCaUIsUUFBUUcsRUFBekI7QUFDQSxXQUFLQyxjQUFMO0FBQ0Q7Ozt3Q0FFbUI7QUFDZCxhQUFPO0FBQ1BDLGVBQU8sUUFEQTtBQUVQQyxjQUFNLGNBRkM7QUFHUEMsa0JBQVMsdUJBSEY7QUFJUEMsaUJBQVEsaUJBQVNWLEdBQVQsRUFBYztBQUNwQjtBQUNELFNBTk07QUFPUFcsY0FBTSxjQUFTWCxHQUFULEVBQWM7QUFDbEI7QUFDRDtBQVRNLE9BQVA7QUFXRDs7OztFQTdENEIsZUFBS1ksSTs7a0JBQW5CbEMsSyIsImZpbGUiOiJhaXJ0aWNsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WknOeMq+i2s+eQgy0t6ZiF6K+75paH56ugJ1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgY29udGFjdDpDb250YWN0XHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBhcnRpY2xlSWQ6MjIsXHJcbiAgICAgIGFydGljbGU6e31cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRNZUNsYXNzTGlzdCgpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLnVzZXJBcnRpY2xlLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgcmVzb3VyY2VfaWQ6dGhpcy5hcnRpY2xlSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFydGljbGUgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgY29uc29sZS5sb2cob3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuYXJ0aWNsZUlkID0gb3B0aW9ucy5pZDtcclxuICAgICAgdGhpcy5nZXRNZUNsYXNzTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiAn5aSc54yr6Laz5b2p6K++56iLJyxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgfVxyXG4iXX0=