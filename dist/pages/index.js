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
        title: '2018/03/24 18:00 西班牙国家队 3:4 巴西国家队',
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
    navigationBarTitleText: '夜猫足球实时比分'
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
    banneGotoClassIndex: function banneGotoClassIndex(url) {
      var id = 6;
      try {
        id = url.split('?')[1].split('=')[1];
      } catch (e) {}
      wx.navigateTo({
        url: '/pages/classDetail?id=' + id
      });
    },
    gotoResult: function gotoResult() {
      wx.navigateTo({
        url: '/pages/result'
      });
    },
    gotoFeture: function gotoFeture() {
      wx.navigateTo({
        url: '/pages/feature'
      });
    },
    gotoClassIndex: function gotoClassIndex(id) {
      wx.navigateTo({
        url: '/pages/classDetail?id=' + id
      });
    },

    /* 打开足球比赛 */
    openMini1: function openMini1() {
      wx.navigateToMiniProgram({
        appId: 'wxe0a4c5b9f85f9cf5',
        path: 'pages/index',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success: function success(res) {
          // 打开成功
        }
      });
    },


    /* 世界杯足球情报 */
    openMini2: function openMini2() {
      wx.navigateToMiniProgram({
        appId: 'wx0c2d51b7b4337c3a',
        path: 'pages/index',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success: function success(res) {
          // 打开成功
        }
      });
    },

    formSubmit: function formSubmit(e) {
      // console.log(e);
      console.log(e.detail.formId);
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwicmVxdWVzdCIsImJhbm5lckxpc3QiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInJlcyIsImRhdGEiLCJiYW5uZXJzIiwiJGFwcGx5IiwiY2xhc3NMaXN0IiwibGlzdCIsImZvckVhY2giLCJ2YWwiLCJwcmljZSIsImZvcm1hdGVNb25leSIsImV4cGlyZV9tb250aCIsImZvcm1hdGVNb250aCIsImdldEJhbm5lcnMiLCJnZXRDbGFzc0xpc3QiLCJ0aXRsZSIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJiYW5uZUdvdG9DbGFzc0luZGV4IiwidXJsIiwiaWQiLCJzcGxpdCIsImUiLCJ3eCIsIm5hdmlnYXRlVG8iLCJnb3RvUmVzdWx0IiwiZ290b0ZldHVyZSIsImdvdG9DbGFzc0luZGV4Iiwib3Blbk1pbmkxIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJleHRyYURhdGEiLCJmb28iLCJlbnZWZXJzaW9uIiwib3Blbk1pbmkyIiwiZm9ybVN1Ym1pdCIsImRldGFpbCIsImZvcm1JZCIsInZhbHVlIiwiZXZlbnRzIiwiJGV2ZW50IiwibGVuZ3RoIiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFGMkM7OztJQUl0QkEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0ZuQjs7aUNBRVk7QUFBQTs7QUFDVixxQkFBS0MsT0FBTCxDQUFhLGlCQUFRQyxVQUFyQixFQUNHQyxJQURILENBQ1MsZUFBTztBQUNWQyxnQkFB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QVksb0JBQVNiLENBQVQsRUFBWTtBQUNwQjtBQUNBckMsY0FBUUMsR0FBUixDQUFZb0MsRUFBRWMsTUFBRixDQUFTQyxNQUFyQjtBQUNBcEQsY0FBUUMsR0FBUixDQUFZLHdCQUFaLEVBQXNDb0MsRUFBRWMsTUFBRixDQUFTRSxLQUEvQztBQUNIOztBQTVESyxHO09BZ0VWQyxNLEdBQVM7QUFDUCxrQkFBYyxxQkFBYTtBQUFBOztBQUN6QixVQUFJQyxrQkFBYyxVQUFLQyxNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQXhELGNBQVFDLEdBQVIsQ0FBZSxPQUFLd0QsS0FBcEIsaUJBQXFDRixPQUFPRyxJQUE1QyxjQUF5REgsT0FBT0ksTUFBUCxDQUFjRixLQUF2RTtBQUNELEtBSk0sRTs7O2tCQXhGVTdELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5aSc54yr6Laz55CD5a6e5pe25q+U5YiGJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdFxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICBpbnRlcnZhbDogNTAwMCxcclxuICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgIGJhbm5lcnM6W10sXHJcbiAgICAgIGNsYXNzTGlzdDpbXSxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBiYW5uZUdvdG9DbGFzc0luZGV4KHVybCl7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IDY7XHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICBpZCA9IHVybC5zcGxpdCgnPycpWzFdLnNwbGl0KCc9JylbMV0gIFxyXG4gICAgICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3NEZXRhaWw/aWQ9JHtpZH1gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0NsYXNzSW5kZXgoaWQpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzc0RldGFpbD9pZD0ke2lkfWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmiZPlvIDotrPnkIPmr5TotZsgKi9cclxuICAgICAgICBvcGVuTWluaTEoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3hlMGE0YzViOWY4NWY5Y2Y1JyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog5LiW55WM5p2v6Laz55CD5oOF5oqlICovXHJcbiAgICAgICAgb3Blbk1pbmkyKCl7XHJcbiAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eDBjMmQ1MWI3YjQzMzdjM2EnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLmZvcm1JZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3Jt5Y+R55Sf5LqGc3VibWl05LqL5Lu277yM5pC65bim5pWw5o2u5Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPlmJhbm5lcnPliJfooahcclxuICAgIFxyXG4gICAgZ2V0QmFubmVycygpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3QoYXBpUGF0aC5iYW5uZXJMaXN0KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5iYW5uZXJzID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICBnZXRDbGFzc0xpc3QoKXtcclxuICAgICAgd2VweS5yZXF1ZXN0KGFwaVBhdGguY2xhc3NMaXN0KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICB2YWwucHJpY2UgPSB0aGlzLmZvcm1hdGVNb25leSh2YWwucHJpY2UpO1xyXG4gICAgICAgICAgICAgIHZhbC5leHBpcmVfbW9udGggPSB0aGlzLmZvcm1hdGVNb250aCh2YWwuZXhwaXJlX21vbnRoKTtcclxuICAgICAgICAgICAgfSApXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIHRoaXMuZ2V0QmFubmVycygpO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJzIwMTgvMDMvMjQgMTg6MDAg6KW/54+t54mZ5Zu95a626ZifIDM6NCDlt7Topb/lm73lrrbpmJ8nLFxyXG4gICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=