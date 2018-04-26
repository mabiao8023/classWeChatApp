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

    /**
     * 页面相关事件处理函数--监听用户下拉动作
    */

  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      // 刷新完后停止刷新
      this.getPressList().then(wx.stopPullDownRefresh());
    }

    /* 上拉触底 */

  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      console.log("上拉触底了");
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwicmVxdWVzdCIsImJhbm5lckxpc3QiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInJlcyIsImRhdGEiLCJiYW5uZXJzIiwiJGFwcGx5IiwiY2xhc3NMaXN0IiwibGlzdCIsImZvckVhY2giLCJ2YWwiLCJwcmljZSIsImZvcm1hdGVNb25leSIsImV4cGlyZV9tb250aCIsImZvcm1hdGVNb250aCIsImdldEJhbm5lcnMiLCJnZXRDbGFzc0xpc3QiLCJnZXRQcmVzc0xpc3QiLCJ3eCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJ0aXRsZSIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJiYW5uZUdvdG9DbGFzc0luZGV4IiwidXJsIiwiaWQiLCJzcGxpdCIsImUiLCJuYXZpZ2F0ZVRvIiwiZ290b1Jlc3VsdCIsImdvdG9GZXR1cmUiLCJnb3RvQ2xhc3NJbmRleCIsIm9wZW5NaW5pMSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwiZXh0cmFEYXRhIiwiZm9vIiwiZW52VmVyc2lvbiIsIm9wZW5NaW5pMiIsImZvcm1TdWJtaXQiLCJkZXRhaWwiLCJmb3JtSWQiLCJ2YWx1ZSIsImV2ZW50cyIsIiRldmVudCIsImxlbmd0aCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBRjJDOzs7SUFJdEJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStGbkI7O2lDQUVZO0FBQUE7O0FBQ1YscUJBQUtDLE9BQUwsQ0FBYSxpQkFBUUMs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QkFBSCxDQUF5QjtBQUN4QkMsZUFBTyxvQkFEaUI7QUFFeEIzQixjQUFNLGFBRmtCO0FBR3hCNEIsbUJBQVc7QUFDVEMsZUFBSztBQURJLFNBSGE7QUFNeEJDLG9CQUFZLFNBTlk7QUFPeEI1QixlQVB3QixtQkFPaEJwQixHQVBnQixFQU9YO0FBQ1g7QUFDRDtBQVR1QixPQUF6QjtBQVdGLEtBdkRLOztBQXdETmtELGdCQUFZLG9CQUFTWixDQUFULEVBQVk7QUFDcEI7QUFDQXhDLGNBQVFDLEdBQVIsQ0FBWXVDLEVBQUVhLE1BQUYsQ0FBU0MsTUFBckI7QUFDQXRELGNBQVFDLEdBQVIsQ0FBWSx3QkFBWixFQUFzQ3VDLEVBQUVhLE1BQUYsQ0FBU0UsS0FBL0M7QUFDSDs7QUE1REssRztPQWdFVkMsTSxHQUFTO0FBQ1Asa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSUMsa0JBQWMsVUFBS0MsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0ExRCxjQUFRQyxHQUFSLENBQWUsT0FBSzBELEtBQXBCLGlCQUFxQ0YsT0FBT0csSUFBNUMsY0FBeURILE9BQU9JLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQUpNLEU7OztrQkF4RlUvRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WknOeMq+i2s+eQg+WunuaXtuavlOWIhidcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3RcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICBiYW5uZXJzOltdLFxyXG4gICAgICBjbGFzc0xpc3Q6W10sXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYmFubmVHb3RvQ2xhc3NJbmRleCh1cmwpe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSA2O1xyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgaWQgPSB1cmwuc3BsaXQoJz8nKVsxXS5zcGxpdCgnPScpWzFdICBcclxuICAgICAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzRGV0YWlsP2lkPSR7aWR9YFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b1Jlc3VsdCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9yZXN1bHRgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZldHVyZSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mZWF0dXJlYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9DbGFzc0luZGV4KGlkKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3NEZXRhaWw/aWQ9JHtpZH1gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyog5omT5byA6Laz55CD5q+U6LWbICovXHJcbiAgICAgICAgb3Blbk1pbmkxKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4ZTBhNGM1YjlmODVmOWNmNScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOS4lueVjOadr+i2s+eQg+aDheaKpSAqL1xyXG4gICAgICAgIG9wZW5NaW5pMigpe1xyXG4gICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3gwYzJkNTFiN2I0MzM3YzNhJyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC5mb3JtSWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnN1Ym1pdOS6i+S7tu+8jOaQuuW4puaVsOaNruS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5ZiYW5uZXJz5YiX6KGoXHJcbiAgICBcclxuICAgIGdldEJhbm5lcnMoKXtcclxuICAgICAgd2VweS5yZXF1ZXN0KGFwaVBhdGguYmFubmVyTGlzdClcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVycyA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgZ2V0Q2xhc3NMaXN0KCl7XHJcbiAgICAgIHdlcHkucmVxdWVzdChhcGlQYXRoLmNsYXNzTGlzdClcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsLnByaWNlID0gdGhpcy5mb3JtYXRlTW9uZXkodmFsLnByaWNlKTtcclxuICAgICAgICAgICAgICB2YWwuZXhwaXJlX21vbnRoID0gdGhpcy5mb3JtYXRlTW9udGgodmFsLmV4cGlyZV9tb250aCk7XHJcbiAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICB0aGlzLmdldEJhbm5lcnMoKTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICAqL1xyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAvLyDliLfmlrDlrozlkI7lgZzmraLliLfmlrBcclxuICAgICAgdGhpcy5nZXRQcmVzc0xpc3QoKS50aGVuKFxyXG4gICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qIOS4iuaLieinpuW6lSAqL1xyXG4gICAgb25SZWFjaEJvdHRvbSgpe1xyXG4gICAgICBjb25zb2xlLmxvZyhcIuS4iuaLieinpuW6leS6hlwiKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJzIwMTgvMDMvMjQgMTg6MDAg6KW/54+t54mZ5Zu95a626ZifIDM6NCDlt7Topb/lm73lrrbpmJ8nLFxyXG4gICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=