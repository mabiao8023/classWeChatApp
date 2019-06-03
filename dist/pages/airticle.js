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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFpcnRpY2xlLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJ0ZXN0TWl4aW4iLCJkYXRhIiwiYXJ0aWNsZUlkIiwiYXJ0aWNsZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiYXBpUGF0aCIsInVzZXJBcnRpY2xlIiwibWV0aG9kIiwicmVzb3VyY2VfaWQiLCJoZWFkZXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNlc3Npb25JRCIsInRoZW4iLCJyZXMiLCIkYXBwbHkiLCJvcHRpb25zIiwiY29uc29sZSIsImxvZyIsImlkIiwiZ2V0TWVDbGFzc0xpc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFHYkMsTSxHQUFTLENBQUNDLGNBQUQsQyxRQUVUQyxJLEdBQU87QUFDTEMsaUJBQVUsRUFETDtBQUVMQyxlQUFRO0FBRkgsSyxRQUtQQyxRLEdBQVcsRSxRQUlYQyxPLEdBQVUsRSxRQUlWQyxNLEdBQVMsRTs7Ozs7cUNBSU87QUFBQTs7QUFDWkMscUJBQUtDLE9BQUwsQ0FBYTtBQUNUQyxhQUFJQyxpQkFBUUMsV0FESDtBQUVUQyxnQkFBTyxLQUZFO0FBR1RYLGNBQUs7QUFDSFksdUJBQVksS0FBS1g7QUFEZCxTQUhJO0FBTVRZLGdCQUFRO0FBQ04sbUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFOQyxPQUFiLEVBU0tDLElBVEwsQ0FTVyxlQUFPO0FBQ2QsZUFBS2YsT0FBTCxHQUFlZ0IsSUFBSWxCLElBQUosQ0FBU0EsSUFBeEI7QUFDQSxlQUFLbUIsTUFBTDtBQUNGLE9BWkY7QUFhSDs7OzJCQUVNQyxPLEVBQVM7QUFDZEMsY0FBUUMsR0FBUixDQUFZRixPQUFaO0FBQ0EsV0FBS25CLFNBQUwsR0FBaUJtQixRQUFRRyxFQUF6QjtBQUNBLFdBQUtDLGNBQUw7QUFDRDs7OztFQTlDZ0NsQixlQUFLbUIsSTs7a0JBQW5CL0IsSyIsImZpbGUiOiJhaXJ0aWNsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5aSc54yr6Laz55CDLS3pmIXor7vmlofnq6AnXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cblxuICAgIGRhdGEgPSB7XG4gICAgICBhcnRpY2xlSWQ6MjIsXG4gICAgICBhcnRpY2xlOnt9XG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgXG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuXG4gICAgfVxuXG4gICAgZ2V0TWVDbGFzc0xpc3QoKXtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDphcGlQYXRoLnVzZXJBcnRpY2xlLFxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgcmVzb3VyY2VfaWQ6dGhpcy5hcnRpY2xlSWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmFydGljbGUgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgY29uc29sZS5sb2cob3B0aW9ucyk7XG4gICAgICB0aGlzLmFydGljbGVJZCA9IG9wdGlvbnMuaWQ7XG4gICAgICB0aGlzLmdldE1lQ2xhc3NMaXN0KCk7XG4gICAgfVxuICB9XG4iXX0=