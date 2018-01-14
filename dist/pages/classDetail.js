'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _list = require('./../components/list.js');

var _list2 = _interopRequireDefault(_list);

var _panel = require('./../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

var _counter = require('./../components/counter.js');

var _counter2 = _interopRequireDefault(_counter);

var _group = require('./../components/group.js');

var _group2 = _interopRequireDefault(_group);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _config = require('./../config/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // alias example
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
      navigationBarTitleText: 'test'
    }, _this.components = {
      panel: _panel2.default,
      counter1: _counter2.default,
      counter2: _counter2.default,
      list: _list2.default,
      group: _group2.default,
      toast: _wepyComToast2.default
    }, _this.mixins = [_test2.default], _this.data = {
      isHasVideo: false,
      classInfo: {},
      navType: 2,
      isPayed: false
    }, _this.computed = {}, _this.methods = {
      navtag: function navtag(type) {
        this.navType = type;
      },
      playVideo: function playVideo() {
        this.isHasVideo = true;
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'getClassInfo',


    // 获得课程的信息
    value: function getClassInfo() {
      var _this2 = this;

      _wepy2.default.request({
        url: _config2.default.classInfo,
        method: "GET",
        data: {
          class_id: 8
        },
        header: {
          'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
        }
      }).then(function (res) {
        _this2.classInfo = res.data.data;
        _this2.classInfo.price = _this2.formateMoney(_this2.classInfo.price);
        _this2.classInfo.expire_month = _this2.formateMonth(_this2.classInfo.expire_month);
        _this2.$apply();
        console.log(res.data);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.getClassInfo();
      // header: {
      //   'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
      // }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/classDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJwYW5lbCIsImNvdW50ZXIxIiwiY291bnRlcjIiLCJsaXN0IiwiZ3JvdXAiLCJ0b2FzdCIsIm1peGlucyIsImRhdGEiLCJpc0hhc1ZpZGVvIiwiY2xhc3NJbmZvIiwibmF2VHlwZSIsImlzUGF5ZWQiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJuYXZ0YWciLCJ0eXBlIiwicGxheVZpZGVvIiwiZXZlbnRzIiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImNsYXNzX2lkIiwiaGVhZGVyIiwidGhlbiIsInJlcyIsInByaWNlIiwiZm9ybWF0ZU1vbmV5IiwiZXhwaXJlX21vbnRoIiwiZm9ybWF0ZU1vbnRoIiwiJGFwcGx5IiwiY29uc29sZSIsImxvZyIsImdldENsYXNzSW5mbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBTHVDO0FBQ1Q7OztJQUtUQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWE7QUFDWEMsNEJBRFc7QUFFWEMsaUNBRlc7QUFHWEMsaUNBSFc7QUFJWEMsMEJBSlc7QUFLWEMsNEJBTFc7QUFNWEM7QUFOVyxLLFFBU2JDLE0sR0FBUyxnQixRQUVUQyxJLEdBQU87QUFDSEMsa0JBQVcsS0FEUjtBQUVIQyxpQkFBVSxFQUZQO0FBR0hDLGVBQVEsQ0FITDtBQUlIQyxlQUFRO0FBSkwsSyxRQU9QQyxRLEdBQVcsRSxRQUlYQyxPLEdBQVU7QUFDUkMsWUFEUSxrQkFDREMsSUFEQyxFQUNJO0FBQ1YsYUFBS0wsT0FBTCxHQUFlSyxJQUFmO0FBQ0QsT0FITztBQUlSQyxlQUpRLHVCQUlHO0FBQ1QsYUFBS1IsVUFBTCxHQUFrQixJQUFsQjtBQUVEO0FBUE8sSyxRQVVWUyxNLEdBQVMsRTs7Ozs7OztBQUlUO21DQUNjO0FBQUE7O0FBQ1YscUJBQUtDLE9BQUwsQ0FBYTtBQUNUQyxhQUFJLGlCQUFRVixTQURIO0FBRVRXLGdCQUFPLEtBRkU7QUFHVGIsY0FBSztBQUNIYyxvQkFBUztBQUROLFNBSEk7QUFNVEMsZ0JBQVE7QUFDTixvQkFBVTtBQURKO0FBTkMsT0FBYixFQVNLQyxJQVRMLENBU1UsZUFBTztBQUNmLGVBQUtkLFNBQUwsR0FBaUJlLElBQUlqQixJQUFKLENBQVNBLElBQTFCO0FBQ0EsZUFBS0UsU0FBTCxDQUFlZ0IsS0FBZixHQUF1QixPQUFLQyxZQUFMLENBQWtCLE9BQUtqQixTQUFMLENBQWVnQixLQUFqQyxDQUF2QjtBQUNBLGVBQUtoQixTQUFMLENBQWVrQixZQUFmLEdBQThCLE9BQUtDLFlBQUwsQ0FBa0IsT0FBS25CLFNBQUwsQ0FBZWtCLFlBQWpDLENBQTlCO0FBQ0EsZUFBS0UsTUFBTDtBQUNBQyxnQkFBUUMsR0FBUixDQUFZUCxJQUFJakIsSUFBaEI7QUFDRCxPQWZEO0FBZ0JIOzs7NkJBRVE7QUFDUCxXQUFLeUIsWUFBTDtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7O0VBakVnQyxlQUFLQyxJOztrQkFBbkJyQyxLIiwiZmlsZSI6ImNsYXNzRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL2xpc3QnXHJcbiAgaW1wb3J0IFBhbmVsIGZyb20gJ0AvY29tcG9uZW50cy9wYW5lbCcgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBDb3VudGVyIGZyb20gJ2NvdW50ZXInIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgR3JvdXAgZnJvbSAnLi4vY29tcG9uZW50cy9ncm91cCdcclxuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXHJcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICd0ZXN0J1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgcGFuZWw6IFBhbmVsLFxyXG4gICAgICBjb3VudGVyMTogQ291bnRlcixcclxuICAgICAgY291bnRlcjI6IENvdW50ZXIsXHJcbiAgICAgIGxpc3Q6IExpc3QsXHJcbiAgICAgIGdyb3VwOiBHcm91cCxcclxuICAgICAgdG9hc3Q6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW215TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBpc0hhc1ZpZGVvOmZhbHNlLFxyXG4gICAgICAgIGNsYXNzSW5mbzp7fSxcclxuICAgICAgICBuYXZUeXBlOjIsXHJcbiAgICAgICAgaXNQYXllZDpmYWxzZSxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgbmF2dGFnKHR5cGUpe1xyXG4gICAgICAgIHRoaXMubmF2VHlwZSA9IHR5cGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIHBsYXlWaWRlbygpe1xyXG4gICAgICAgIHRoaXMuaXNIYXNWaWRlbyA9IHRydWU7XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+W+l+ivvueoi+eahOS/oeaBr1xyXG4gICAgZ2V0Q2xhc3NJbmZvKCl7XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NJbmZvLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6OFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8gPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8ucHJpY2UgPSB0aGlzLmZvcm1hdGVNb25leSh0aGlzLmNsYXNzSW5mby5wcmljZSk7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGggPSB0aGlzLmZvcm1hdGVNb250aCh0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGgpO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgdGhpcy5nZXRDbGFzc0luZm8oKTtcclxuICAgICAgLy8gaGVhZGVyOiB7XHJcbiAgICAgIC8vICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgIC8vIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==