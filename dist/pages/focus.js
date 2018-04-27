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
    key: 'getClassList',


    // 获取课程列表

    value: function getClassList() {
      var _this2 = this;

      _wepy2.default.request(_config2.default.classList).then(function (res) {
        _this2.classList = res.data.data.list;
        _this2.classList.forEach(function (val) {
          val.price = _this2.formateMoney(val.price);
          val.expire_month = _this2.formateMonth(val.expire_month);
        });
        _this2.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {}
    /*this.getBanners();
    this.getClassList();*/


    /**
     * 页面相关事件处理函数--监听用户下拉动作
    */

  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      // 刷新完后停止刷新

      setTimeout(function () {
        wx.stopPullDownRefresh();
      }, 2000);
    }

    /* 上拉触底 */

  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      var _this3 = this;

      this.isUpFrash = true;
      setTimeout(function () {
        _this3.isUpFrash = false;
        _this3.$apply();
      }, 2000);
      console.log("上拉触底了");
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      /* todo:设置要分享的内容 */
      console.log(2);
      return {
        title: this.shareContent,
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
    navigationBarTitleText: '关注',
    navigationBarBackgroundColor: '#ffffff',
    enablePullDownRefresh: false,
    navigationBarTextStyle: 'black'
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
    classList: [],
    gameList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 33, 3, 3, 3, 3, 3],
    isUpFrash: false,
    shareContent: '时间看得见福克斯'
  };
  this.computed = {};
  this.methods = {
    gotoIndex: function gotoIndex() {
      wx.navigateTo({
        url: '/pages/index'
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
    gotoFocus: function gotoFocus() {
      wx.navigateTo({
        url: '/pages/focus'
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
    },

    /* 调整分享的内容 */
    setShareContent: function setShareContent() {
      console.log(1);
      this.shareContent = "啊哈哈沙发或多或少";
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this4.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    } };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/focus'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvY3VzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwicmVxdWVzdCIsImNsYXNzTGlzdCIsInRoZW4iLCJyZXMiLCJkYXRhIiwibGlzdCIsImZvckVhY2giLCJ2YWwiLCJwcmljZSIsImZvcm1hdGVNb25leSIsImV4cGlyZV9tb250aCIsImZvcm1hdGVNb250aCIsIiRhcHBseSIsInNldFRpbWVvdXQiLCJ3eCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJpc1VwRnJhc2giLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJzaGFyZUNvbnRlbnQiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsInBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJiYW5uZXJzIiwiZ2FtZUxpc3QiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb3RvSW5kZXgiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ290b1Jlc3VsdCIsImdvdG9GZXR1cmUiLCJnb3RvRm9jdXMiLCJvcGVuTWluaTEiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsImV4dHJhRGF0YSIsImZvbyIsImVudlZlcnNpb24iLCJvcGVuTWluaTIiLCJmb3JtU3VibWl0IiwiZSIsImRldGFpbCIsImZvcm1JZCIsInZhbHVlIiwic2V0U2hhcmVDb250ZW50IiwiZXZlbnRzIiwiJGV2ZW50IiwibGVuZ3RoIiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFGMkM7OztJQUl0QkEsSzs7Ozs7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O0FBQ0Q7QUFUc0IsT0FBekI7QUFXRCxLQWxDSzs7O0FBb0NOO0FBQ0FtRCxhQXJDTSx1QkFxQ0s7QUFDUnhDLFNBQUdtQyxxQkFBSCxDQUF5QjtBQUN4QkMsZUFBTyxvQkFEaUI7QUFFeEI3QixjQUFNLGFBRmtCO0FBR3hCOEIsbUJBQVc7QUFDVEMsZUFBSztBQURJLFNBSGE7QUFNeEJDLG9CQUFZLFNBTlk7QUFPeEI5QixlQVB3QixtQkFPaEJwQixHQVBnQixFQU9YO0FBQ1g7QUFDRDtBQVR1QixPQUF6QjtBQVdGLEtBakRLOztBQWtETm9ELGdCQUFZLG9CQUFTQyxDQUFULEVBQVk7QUFDcEI7QUFDQXZDLGNBQVFDLEdBQVIsQ0FBWXNDLEVBQUVDLE1BQUYsQ0FBU0MsTUFBckI7QUFDQXpDLGNBQVFDLEdBQVIsQ0FBWSx3QkFBWixFQUFzQ3NDLEVBQUVDLE1BQUYsQ0FBU0UsS0FBL0M7QUFDSCxLQXRESzs7QUF3RE47QUFDQUMsbUJBekRNLDZCQXlEVztBQUNmM0MsY0FBUUMsR0FBUixDQUFZLENBQVo7QUFDQSxXQUFLRSxZQUFMLEdBQW9CLFdBQXBCO0FBQ0Q7QUE1REssRztPQWdFVnlDLE0sR0FBUztBQUNQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUlDLGtCQUFjLFVBQUtDLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBOUMsY0FBUUMsR0FBUixDQUFlLE9BQUs4QyxLQUFwQixpQkFBcUNGLE9BQU9HLElBQTVDLGNBQXlESCxPQUFPSSxNQUFQLENBQWNGLEtBQXZFO0FBQ0QsS0FKTSxFOzs7a0JBOUZVakUsSyIsImZpbGUiOiJmb2N1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflhbPms6gnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdFxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICBpbnRlcnZhbDogNTAwMCxcclxuICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgIGJhbm5lcnM6W10sXHJcbiAgICAgIGNsYXNzTGlzdDpbXSxcclxuICAgICAgZ2FtZUxpc3Q6WzEsMiwzLDQsNSw2LDcsOCw5LDIwLDMzLDMsMywzLDMsMyxdLFxyXG4gICAgICBpc1VwRnJhc2g6ZmFsc2UsXHJcbiAgICAgIHNoYXJlQ29udGVudDon5pe26Ze055yL5b6X6KeB56aP5YWL5pavJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgXHRnb3RvSW5kZXgoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvaW5kZXhgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b1Jlc3VsdCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9yZXN1bHRgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZldHVyZSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mZWF0dXJlYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9Gb2N1cygpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mb2N1c2BcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmiZPlvIDotrPnkIPmr5TotZsgKi9cclxuICAgICAgICBvcGVuTWluaTEoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3hlMGE0YzViOWY4NWY5Y2Y1JyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog5LiW55WM5p2v6Laz55CD5oOF5oqlICovXHJcbiAgICAgICAgb3Blbk1pbmkyKCl7XHJcbiAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eDBjMmQ1MWI3YjQzMzdjM2EnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLmZvcm1JZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3Jt5Y+R55Sf5LqGc3VibWl05LqL5Lu277yM5pC65bim5pWw5o2u5Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog6LCD5pW05YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgICAgc2V0U2hhcmVDb250ZW50KCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygxKTtcclxuICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gXCLllYrlk4jlk4jmspnlj5HmiJblpJrmiJblsJFcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g6I635Y+W6K++56iL5YiX6KGoXHJcbiAgICBcclxuICAgIGdldENsYXNzTGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3QoYXBpUGF0aC5jbGFzc0xpc3QpXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHZhbC5wcmljZSA9IHRoaXMuZm9ybWF0ZU1vbmV5KHZhbC5wcmljZSk7XHJcbiAgICAgICAgICAgICAgdmFsLmV4cGlyZV9tb250aCA9IHRoaXMuZm9ybWF0ZU1vbnRoKHZhbC5leHBpcmVfbW9udGgpO1xyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgLyp0aGlzLmdldEJhbm5lcnMoKTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTsqL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgICovXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgIC8vIOWIt+aWsOWujOWQjuWBnOatouWIt+aWsFxyXG5cclxuICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xyXG4gICAgICAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgIH0sMjAwMCApXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKiDkuIrmi4nop6blupUgKi9cclxuICAgIG9uUmVhY2hCb3R0b20oKXtcclxuICAgICAgdGhpcy5pc1VwRnJhc2ggPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSwyMDAwIClcclxuICAgICAgY29uc29sZS5sb2coXCLkuIrmi4nop6blupXkuoZcIilcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgICAgLyogdG9kbzrorr7nva7opoHliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgY29uc29sZS5sb2coMik7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZUNvbnRlbnQsXHJcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=