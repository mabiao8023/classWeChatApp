'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _contact = require('./../components/contact.js');

var _contact2 = _interopRequireDefault(_contact);

var _footer = require('./../components/footer.js');

var _footer2 = _interopRequireDefault(_footer);

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
    navigationBarTitleText: '即时比分',
    navigationBarBackgroundColor: '#ffffff',
    enablePullDownRefresh: false,
    navigationBarTextStyle: 'black'
  };
  this.components = {
    contact: _contact2.default,
    footer: _footer2.default
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
    shareContent: '时间看得见福克斯',
    isScGame: true,
    totalFocus: 0
  };
  this.computed = {};
  this.methods = {
    scGame: function scGame() {
      this.isScGame = !this.isScGame;
      this.totalFocus++;
    },
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwicmVxdWVzdCIsImNsYXNzTGlzdCIsInRoZW4iLCJyZXMiLCJkYXRhIiwibGlzdCIsImZvckVhY2giLCJ2YWwiLCJwcmljZSIsImZvcm1hdGVNb25leSIsImV4cGlyZV9tb250aCIsImZvcm1hdGVNb250aCIsIiRhcHBseSIsInNldFRpbWVvdXQiLCJ3eCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJpc1VwRnJhc2giLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJzaGFyZUNvbnRlbnQiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsInBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwiY29udGFjdCIsImZvb3RlciIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJiYW5uZXJzIiwiZ2FtZUxpc3QiLCJpc1NjR2FtZSIsInRvdGFsRm9jdXMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzY0dhbWUiLCJnb3RvSW5kZXgiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ290b1Jlc3VsdCIsImdvdG9GZXR1cmUiLCJnb3RvRm9jdXMiLCJvcGVuTWluaTEiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsImV4dHJhRGF0YSIsImZvbyIsImVudlZlcnNpb24iLCJvcGVuTWluaTIiLCJmb3JtU3VibWl0IiwiZSIsImRldGFpbCIsImZvcm1JZCIsInZhbHVlIiwic2V0U2hhcmVDb250ZW50IiwiZXZlbnRzIiwiJGV2ZW50IiwibGVuZ3RoIiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FB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ZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgRm9vdGVyIGZyb20gJ0AvY29tcG9uZW50cy9mb290ZXInIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfljbPml7bmr5TliIYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3QsXHJcbiAgICAgIGZvb3RlcjpGb290ZXJcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICBiYW5uZXJzOltdLFxyXG4gICAgICBjbGFzc0xpc3Q6W10sXHJcbiAgICAgIGdhbWVMaXN0OlsxLDIsMyw0LDUsNiw3LDgsOSwyMCwzMywzLDMsMywzLDMsXSxcclxuICAgICAgaXNVcEZyYXNoOmZhbHNlLFxyXG4gICAgICBzaGFyZUNvbnRlbnQ6J+aXtumXtOeci+W+l+ingeemj+WFi+aWrycsXHJcbiAgICAgIGlzU2NHYW1lOiB0cnVlLFxyXG4gICAgICB0b3RhbEZvY3VzOiAwLFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNjR2FtZSgpe1xyXG4gICAgICAgICAgdGhpcy5pc1NjR2FtZSA9ICF0aGlzLmlzU2NHYW1lO1xyXG4gICAgICAgICAgdGhpcy50b3RhbEZvY3VzICsrIDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnb3RvSW5kZXgoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvaW5kZXhgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b1Jlc3VsdCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9yZXN1bHRgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZldHVyZSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mZWF0dXJlYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9Gb2N1cygpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mb2N1c2BcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmiZPlvIDotrPnkIPmr5TotZsgKi9cclxuICAgICAgICBvcGVuTWluaTEoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3hlMGE0YzViOWY4NWY5Y2Y1JyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog5LiW55WM5p2v6Laz55CD5oOF5oqlICovXHJcbiAgICAgICAgb3Blbk1pbmkyKCl7XHJcbiAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eDBjMmQ1MWI3YjQzMzdjM2EnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLmZvcm1JZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3Jt5Y+R55Sf5LqGc3VibWl05LqL5Lu277yM5pC65bim5pWw5o2u5Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog6LCD5pW05YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgICAgc2V0U2hhcmVDb250ZW50KCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygxKTtcclxuICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gXCLllYrlk4jlk4jmspnlj5HmiJblpJrmiJblsJFcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g6I635Y+W6K++56iL5YiX6KGoXHJcbiAgICBcclxuICAgIGdldENsYXNzTGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3QoYXBpUGF0aC5jbGFzc0xpc3QpXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHZhbC5wcmljZSA9IHRoaXMuZm9ybWF0ZU1vbmV5KHZhbC5wcmljZSk7XHJcbiAgICAgICAgICAgICAgdmFsLmV4cGlyZV9tb250aCA9IHRoaXMuZm9ybWF0ZU1vbnRoKHZhbC5leHBpcmVfbW9udGgpO1xyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgLyp0aGlzLmdldEJhbm5lcnMoKTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTsqL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgICovXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgIC8vIOWIt+aWsOWujOWQjuWBnOatouWIt+aWsFxyXG5cclxuICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xyXG4gICAgICAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgIH0sMjAwMCApXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKiDkuIrmi4nop6blupUgKi9cclxuICAgIG9uUmVhY2hCb3R0b20oKXtcclxuICAgICAgdGhpcy5pc1VwRnJhc2ggPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSwyMDAwIClcclxuICAgICAgY29uc29sZS5sb2coXCLkuIrmi4nop6blupXkuoZcIilcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgICAgLyogdG9kbzrorr7nva7opoHliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgY29uc29sZS5sb2coMik7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZUNvbnRlbnQsXHJcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=