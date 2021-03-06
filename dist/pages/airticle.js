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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFpcnRpY2xlLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJjb250YWN0IiwiQ29udGFjdCIsIm1peGlucyIsInRlc3RNaXhpbiIsImRhdGEiLCJhcnRpY2xlSWQiLCJhcnRpY2xlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJhcGlQYXRoIiwidXNlckFydGljbGUiLCJtZXRob2QiLCJyZXNvdXJjZV9pZCIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2Vzc2lvbklEIiwidGhlbiIsInJlcyIsIiRhcHBseSIsIm9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJnZXRNZUNsYXNzTGlzdCIsInRpdGxlIiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQTJDOztJQUV0QkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhO0FBQ1hDLGVBQVFDO0FBREcsSyxRQUliQyxNLEdBQVMsQ0FBQ0MsY0FBRCxDLFFBRVRDLEksR0FBTztBQUNMQyxpQkFBVSxFQURMO0FBRUxDLGVBQVE7QUFGSCxLLFFBS1BDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVSxFLFFBSVZDLE0sR0FBUyxFOzs7OztxQ0FJTztBQUFBOztBQUNaQyxxQkFBS0MsT0FBTCxDQUFhO0FBQ1RDLGFBQUlDLGlCQUFRQyxXQURIO0FBRVRDLGdCQUFPLEtBRkU7QUFHVFgsY0FBSztBQUNIWSx1QkFBWSxLQUFLWDtBQURkLFNBSEk7QUFNVFksZ0JBQVE7QUFDTixtQ0FBdUIsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR6QztBQU5DLE9BQWIsRUFTS0MsSUFUTCxDQVNXLGVBQU87QUFDZCxlQUFLZixPQUFMLEdBQWVnQixJQUFJbEIsSUFBSixDQUFTQSxJQUF4QjtBQUNBLGVBQUttQixNQUFMO0FBQ0YsT0FaRjtBQWFIOzs7MkJBRU1DLE8sRUFBUztBQUNkQyxjQUFRQyxHQUFSLENBQVlGLE9BQVo7QUFDQSxXQUFLbkIsU0FBTCxHQUFpQm1CLFFBQVFHLEVBQXpCO0FBQ0EsV0FBS0MsY0FBTDtBQUNEOzs7d0NBRW1CO0FBQ2QsYUFBTztBQUNQQyxlQUFPLFFBREE7QUFFUEMsY0FBTSxjQUZDO0FBR1BDLGtCQUFTLHVCQUhGO0FBSVBDLGlCQUFRLGlCQUFTVixHQUFULEVBQWM7QUFDcEI7QUFDRCxTQU5NO0FBT1BXLGNBQU0sY0FBU1gsR0FBVCxFQUFjO0FBQ2xCO0FBQ0Q7QUFUTSxPQUFQO0FBV0Q7Ozs7RUE3RDRCWixlQUFLd0IsSTs7a0JBQW5CdEMsSyIsImZpbGUiOiJhaXJ0aWNsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5aSc54yr6Laz55CDLS3pmIXor7vmlofnq6AnXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb250YWN0OkNvbnRhY3RcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGFydGljbGVJZDoyMixcbiAgICAgIGFydGljbGU6e31cbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBcbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBnZXRNZUNsYXNzTGlzdCgpe1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOmFwaVBhdGgudXNlckFydGljbGUsXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICByZXNvdXJjZV9pZDp0aGlzLmFydGljbGVJZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICB9XG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXJ0aWNsZSA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgfSApO1xuICAgIH1cblxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICBjb25zb2xlLmxvZyhvcHRpb25zKTtcbiAgICAgIHRoaXMuYXJ0aWNsZUlkID0gb3B0aW9ucy5pZDtcbiAgICAgIHRoaXMuZ2V0TWVDbGFzc0xpc3QoKTtcbiAgICB9XG5cbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRpdGxlOiAn5aSc54yr6Laz5b2p6K++56iLJyxcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcbiAgICAgICAgICBpbWFnZVVybDonL2ltYWdlcy9zaGFyZV9pbWcuanBnJyxcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9XG5cbiAgfVxuIl19