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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwicmVxdWVzdCIsImJhbm5lckxpc3QiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInJlcyIsImRhdGEiLCJiYW5uZXJzIiwiJGFwcGx5IiwiY2xhc3NMaXN0IiwibGlzdCIsImZvckVhY2giLCJ2YWwiLCJwcmljZSIsImZvcm1hdGVNb25leSIsImV4cGlyZV9tb250aCIsImZvcm1hdGVNb250aCIsImdldEJhbm5lcnMiLCJnZXRDbGFzc0xpc3QiLCJ0aXRsZSIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJiYW5uZUdvdG9DbGFzc0luZGV4IiwidXJsIiwiaWQiLCJzcGxpdCIsImUiLCJ3eCIsIm5hdmlnYXRlVG8iLCJnb3RvQ2xhc3NJbmRleCIsIm9wZW5NaW5pMSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwiZXh0cmFEYXRhIiwiZm9vIiwiZW52VmVyc2lvbiIsIm9wZW5NaW5pMiIsImZvcm1TdWJtaXQiLCJkZXRhaWwiLCJmb3JtSWQiLCJ2YWx1ZSIsImV2ZW50cyIsIiRldmVudCIsImxlbmd0aCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBRjJDOzs7SUFJdEJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNGbkI7O2lDQUVZO0FBQUE7O0FBQ1YscUJBQUtDLE9BQUwsQ0FBYSxpQkFBUUMsVUFBckIsRUFDR0MsSUFESCxDQUNTLGVBQU87QUFDVkMsZ0JBQVFDLEdBQVIsQ0FBWUMsSUFBSUMsSUFBSixD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a0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSUMsa0JBQWMsVUFBS0MsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0F0RCxjQUFRQyxHQUFSLENBQWUsT0FBS3NELEtBQXBCLGlCQUFxQ0YsT0FBT0csSUFBNUMsY0FBeURILE9BQU9JLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQUpNLEU7OztrQkEvRVUzRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WknOeMq+i2s+eQg+WunuaXtuavlOWIhidcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3RcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICBiYW5uZXJzOltdLFxyXG4gICAgICBjbGFzc0xpc3Q6W10sXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYmFubmVHb3RvQ2xhc3NJbmRleCh1cmwpe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSA2O1xyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgaWQgPSB1cmwuc3BsaXQoJz8nKVsxXS5zcGxpdCgnPScpWzFdICBcclxuICAgICAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzRGV0YWlsP2lkPSR7aWR9YFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICBcclxuICAgICAgICBnb3RvQ2xhc3NJbmRleChpZCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzRGV0YWlsP2lkPSR7aWR9YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qIOaJk+W8gOi2s+eQg+avlOi1myAqL1xyXG4gICAgICAgIG9wZW5NaW5pMSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eGUwYTRjNWI5Zjg1ZjljZjUnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDkuJbnlYzmna/otrPnkIPmg4XmiqUgKi9cclxuICAgICAgICBvcGVuTWluaTIoKXtcclxuICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4MGMyZDUxYjdiNDMzN2MzYScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZm9ybUlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm3lj5HnlJ/kuoZzdWJtaXTkuovku7bvvIzmkLrluKbmlbDmja7kuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICB9LFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+WYmFubmVyc+WIl+ihqFxyXG4gICAgXHJcbiAgICBnZXRCYW5uZXJzKCl7XHJcbiAgICAgIHdlcHkucmVxdWVzdChhcGlQYXRoLmJhbm5lckxpc3QpXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmJhbm5lcnMgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W6K++56iL5YiX6KGoXHJcbiAgICBcclxuICAgIGdldENsYXNzTGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3QoYXBpUGF0aC5jbGFzc0xpc3QpXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHZhbC5wcmljZSA9IHRoaXMuZm9ybWF0ZU1vbmV5KHZhbC5wcmljZSk7XHJcbiAgICAgICAgICAgICAgdmFsLmV4cGlyZV9tb250aCA9IHRoaXMuZm9ybWF0ZU1vbnRoKHZhbC5leHBpcmVfbW9udGgpO1xyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgdGhpcy5nZXRCYW5uZXJzKCk7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAn5aSc54yr6Laz5b2p6K++56iLJyxcclxuICAgICAgcGF0aDogJy9wYWdlcy9pbmRleCcsXHJcbiAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICB9LFxyXG4gICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAvLyDovazlj5HlpLHotKVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19