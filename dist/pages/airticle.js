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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    }, _this.components = {}, _this.mixins = [_test2.default], _this.data = {
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
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/airticle'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFpcnRpY2xlLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiYXJ0aWNsZUlkIiwiYXJ0aWNsZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsInJlcXVlc3QiLCJ1cmwiLCJ1c2VyQXJ0aWNsZSIsIm1ldGhvZCIsInJlc291cmNlX2lkIiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzZXNzaW9uSUQiLCJ0aGVuIiwicmVzIiwiJGFwcGx5Iiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJpZCIsImdldE1lQ2xhc3NMaXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBR2JDLE0sR0FBUyxnQixRQUVUQyxJLEdBQU87QUFDTEMsaUJBQVUsRUFETDtBQUVMQyxlQUFRO0FBRkgsSyxRQUtQQyxRLEdBQVcsRSxRQUlYQyxPLEdBQVUsRSxRQUlWQyxNLEdBQVMsRTs7Ozs7cUNBSU87QUFBQTs7QUFDWixxQkFBS0MsT0FBTCxDQUFhO0FBQ1RDLGFBQUksaUJBQVFDLFdBREg7QUFFVEMsZ0JBQU8sS0FGRTtBQUdUVCxjQUFLO0FBQ0hVLHVCQUFZLEtBQUtUO0FBRGQsU0FISTtBQU1UVSxnQkFBUTtBQUNOLG1DQUF1QixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDO0FBRHpDO0FBTkMsT0FBYixFQVNLQyxJQVRMLENBU1csZUFBTztBQUNkLGVBQUtiLE9BQUwsR0FBZWMsSUFBSWhCLElBQUosQ0FBU0EsSUFBeEI7QUFDQSxlQUFLaUIsTUFBTDtBQUNGLE9BWkY7QUFhSDs7OzJCQUVNQyxPLEVBQVM7QUFDZEMsY0FBUUMsR0FBUixDQUFZRixPQUFaO0FBQ0EsV0FBS2pCLFNBQUwsR0FBaUJpQixRQUFRRyxFQUF6QjtBQUNBLFdBQUtDLGNBQUw7QUFDRDs7OztFQTlDZ0MsZUFBS0MsSTs7a0JBQW5CNUIsSyIsImZpbGUiOiJhaXJ0aWNsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpJznjKvotrPnkIMtLemYheivu+aWh+eroCdcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBhcnRpY2xlSWQ6MjIsXHJcbiAgICAgIGFydGljbGU6e31cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRNZUNsYXNzTGlzdCgpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLnVzZXJBcnRpY2xlLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgcmVzb3VyY2VfaWQ6dGhpcy5hcnRpY2xlSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFydGljbGUgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgY29uc29sZS5sb2cob3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuYXJ0aWNsZUlkID0gb3B0aW9ucy5pZDtcclxuICAgICAgdGhpcy5nZXRNZUNsYXNzTGlzdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuIl19