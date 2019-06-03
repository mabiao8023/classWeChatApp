'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _contact = require('./../components/contact.js');

var _contact2 = _interopRequireDefault(_contact);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _config = require('./../config/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // alias example


var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'getBanners',


    // 获取banners列表

    value: function getBanners() {
      var _this2 = this;

      _wepy2.default.request(_config2.default.bannerList).then(function (res) {
        console.log(res.data.data);
        _this2.banners = res.data.data;
        _this2.$apply();
      });
    }

    // 获取课程列表

  }, {
    key: 'getClassList',
    value: function getClassList() {
      var _this3 = this;

      _wepy2.default.request(_config2.default.classList).then(function (res) {
        _this3.classList = res.data.data.list;
        _this3.classList.forEach(function (val) {
          val.price = _this3.formateMoney(val.price);
          val.expire_month = _this3.formateMonth(val.expire_month);
        });
        _this3.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.getBanners();
      this.getClassList();
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

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.config = {
    navigationBarTitleText: '夜猫足球--首页'
  };
  this.components = {
    contact: _contact2.default
  };
  this.mixins = [_test2.default];
  this.data = {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    banners: [],
    classList: []
  };
  this.computed = {};
  this.methods = {
    gotoClassIndex: function gotoClassIndex(id) {
      wx.navigateTo({
        url: '/pages/classDetail?id=' + id
      });
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this4.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    } };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4Iiwid2VweSIsInJlcXVlc3QiLCJhcGlQYXRoIiwiYmFubmVyTGlzdCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwiZGF0YSIsImJhbm5lcnMiLCIkYXBwbHkiLCJjbGFzc0xpc3QiLCJsaXN0IiwiZm9yRWFjaCIsInZhbCIsInByaWNlIiwiZm9ybWF0ZU1vbmV5IiwiZXhwaXJlX21vbnRoIiwiZm9ybWF0ZU1vbnRoIiwiZ2V0QmFubmVycyIsImdldENsYXNzTGlzdCIsInRpdGxlIiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJwYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJjb250YWN0IiwiQ29udGFjdCIsIm1peGlucyIsIm15TWl4aW4iLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ290b0NsYXNzSW5kZXgiLCJpZCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImV2ZW50cyIsIiRldmVudCIsImxlbmd0aCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBRjJDOzs7SUFJdEJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVDbkI7O2lDQUVZO0FBQUE7O0FBQ1ZDLHFCQUFLQyxPQUFMLENBQWFDLGlCQUFRQyxVQUFyQixFQUNHQyxJQURILENBQ1MsZUFBTztBQUNWQyxnQkFBUUMsR0FBUixDQUFZQyxJQUFJQyxJQUFKLENBQVNBLElBQXJCO0FBQ0EsZUFBS0MsT0FBTCxHQUFlRixJQUFJQyxJQUFKLENBQVNBLElBQXhCO0FBQ0EsZUFBS0UsTUFBTDtBQUNILE9BTEg7QUFNRDs7QUFFRDs7OzttQ0FFYztBQUFBOztBQUNaVixxQkFBS0MsT0FBTCxDQUFhQyxpQkFBUVMsU0FBckIsRUFDR1AsSUFESCxDQUNTLGVBQU87QUFDVixlQUFLTyxTQUFMLEdBQWlCSixJQUFJQyxJQUFKLENBQVNBLElBQVQsQ0FBY0ksSUFBL0I7QUFDQSxlQUFLRCxTQUFMLENBQWVFLE9BQWYsQ0FBd0IsZUFBTztBQUM3QkMsY0FBSUMsS0FBSixHQUFZLE9BQUtDLFlBQUwsQ0FBa0JGLElBQUlDLEtBQXRCLENBQVo7QUFDQUQsY0FBSUcsWUFBSixHQUFtQixPQUFLQyxZQUFMLENBQWtCSixJQUFJRyxZQUF0QixDQUFuQjtBQUNELFNBSEQ7QUFJQSxlQUFLUCxNQUFMO0FBQ0gsT0FSSDtBQVNEOzs7NkJBRVE7QUFDUCxXQUFLUyxVQUFMO0FBQ0EsV0FBS0MsWUFBTDtBQUNEOzs7d0NBRW1CO0FBQ2xCLGFBQU87QUFDUEMsZUFBTyxRQURBO0FBRVBDLGNBQU0sY0FGQztBQUdQQyxrQkFBUyx1QkFIRjtBQUlQQyxpQkFBUSxpQkFBU2pCLEdBQVQsRUFBYztBQUNwQjtBQUNELFNBTk07QUFPUGtCLGNBQU0sY0FBU2xCLEdBQVQsRUFBYztBQUNsQjtBQUNEO0FBVE0sT0FBUDtBQVdEOzs7O0VBakZnQ1AsZUFBSzBCLEk7Ozs7O09BQ3RDQyxNLEdBQVM7QUFDUEMsNEJBQXdCO0FBRGpCLEc7T0FJVEMsVSxHQUFhO0FBQ1hDLGFBQVFDO0FBREcsRztPQUliQyxNLEdBQVMsQ0FBQ0MsY0FBRCxDO09BRVR6QixJLEdBQU87QUFDTDBCLG1CQUFlLElBRFY7QUFFTEMsY0FBVSxJQUZMO0FBR0xDLGNBQVUsSUFITDtBQUlMQyxjQUFVLElBSkw7QUFLTDVCLGFBQVEsRUFMSDtBQU1MRSxlQUFVO0FBTkwsRztPQVNQMkIsUSxHQUFXLEU7T0FJWEMsTyxHQUFVO0FBQ05DLGtCQURNLDBCQUNTQyxFQURULEVBQ1k7QUFDaEJDLFNBQUdDLFVBQUgsQ0FBYztBQUNaQyx3Q0FBOEJIO0FBRGxCLE9BQWQ7QUFHRDtBQUxLLEc7T0FRVkksTSxHQUFTO0FBQ1Asa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSUMsa0JBQWMsVUFBS0MsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0ExQyxjQUFRQyxHQUFSLENBQWUsT0FBSzBDLEtBQXBCLGlCQUFxQ0YsT0FBT0csSUFBNUMsY0FBeURILE9BQU9JLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQUpNLEU7OztrQkFoQ1VqRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5aSc54yr6Laz55CDLS3pppbpobUnXG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGNvbnRhY3Q6Q29udGFjdFxuICAgIH1cblxuICAgIG1peGlucyA9IFtteU1peGluXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgIGludGVydmFsOiA1MDAwLFxuICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICBiYW5uZXJzOltdLFxuICAgICAgY2xhc3NMaXN0OltdLFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgZ290b0NsYXNzSW5kZXgoaWQpe1xuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzRGV0YWlsP2lkPSR7aWR9YFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOiOt+WPlmJhbm5lcnPliJfooahcbiAgICBcbiAgICBnZXRCYW5uZXJzKCl7XG4gICAgICB3ZXB5LnJlcXVlc3QoYXBpUGF0aC5iYW5uZXJMaXN0KVxuICAgICAgICAudGhlbiggcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5iYW5uZXJzID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8g6I635Y+W6K++56iL5YiX6KGoXG4gICAgXG4gICAgZ2V0Q2xhc3NMaXN0KCl7XG4gICAgICB3ZXB5LnJlcXVlc3QoYXBpUGF0aC5jbGFzc0xpc3QpXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xuICAgICAgICAgICAgICB2YWwucHJpY2UgPSB0aGlzLmZvcm1hdGVNb25leSh2YWwucHJpY2UpO1xuICAgICAgICAgICAgICB2YWwuZXhwaXJlX21vbnRoID0gdGhpcy5mb3JtYXRlTW9udGgodmFsLmV4cGlyZV9tb250aCk7XG4gICAgICAgICAgICB9IClcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgdGhpcy5nZXRCYW5uZXJzKCk7XG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xuICAgIH1cblxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5aSc54yr6Laz5b2p6K++56iLJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxuICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXG4gICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xuICAgICAgICAvLyDovazlj5HmiJDlip9cbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXG4gICAgICB9XG4gICAgfVxuICAgIH1cbiAgfVxuIl19