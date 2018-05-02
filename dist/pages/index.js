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

      return _wepy2.default.request({ url: _config2.default.matchList, data: { type: 0, page: this.page } }).then(function (res) {
        var list = res.data.data.list;
        list.forEach(function (val) {
          val.isFocus = false;
          val.match_time_minute = val.match_time.slice(10, 16);
        });
        _this2.matchList = _this2.matchList.concat(res.data.data.list);
        _this2.page++;
        console.log(_this2.matchList);
        _this2.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      /*this.getBanners();*/
      this.getClassList();
    }

    /**
     * 页面相关事件处理函数--监听用户下拉动作
    */

  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      // 刷新完后停止刷新
      this.page = 1;
      this.matchList = [];
      this.getClassList().then(function (res) {
        wx.stopPullDownRefresh();
      });
      // setTimeout( () => {

      // },2000 )
    }

    /* 上拉触底 */

  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      var _this3 = this;

      this.isUpFrash = true;
      this.getClassList().then(function (res) {
        _this3.isUpFrash = false;
        _this3.$apply();
      });
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
    totalFocus: 0,
    page: 1,
    matchList: []
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
    setShareContent: function setShareContent(match) {
      console.log(match);
      this.shareContent = match.league_name + ' ' + match.match_time.slice(0, match.match_time.length - 3) + ' ' + match.home + '  ' + match.home_score + '-' + match.away_score + ' ' + match.away;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwicmVxdWVzdCIsInVybCIsIm1hdGNoTGlzdCIsImRhdGEiLCJ0eXBlIiwicGFnZSIsInRoZW4iLCJsaXN0IiwicmVzIiwiZm9yRWFjaCIsInZhbCIsImlzRm9jdXMiLCJtYXRjaF90aW1lX21pbnV0ZSIsIm1hdGNoX3RpbWUiLCJzbGljZSIsImNvbmNhdCIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJnZXRDbGFzc0xpc3QiLCJ3eCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJpc1VwRnJhc2giLCJ0aXRsZSIsInNoYXJlQ29udGVudCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJmb290ZXIiLCJtaXhpbnMiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiYmFubmVycyIsImNsYXNzTGlzdCIsImdhbWVMaXN0IiwiaXNTY0dhbWUiLCJ0b3RhbEZvY3VzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2NHYW1lIiwiZ290b0luZGV4IiwibmF2aWdhdGVUbyIsImdvdG9SZXN1bHQiLCJnb3RvRmV0dXJlIiwiZ290b0ZvY3VzIiwib3Blbk1pbmkxIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJleHRyYURhdGEiLCJmb28iLCJlbnZWZXJzaW9uIiwib3Blbk1pbmkyIiwiZm9ybVN1Ym1pdCIsImUiLCJkZXRhaWwiLCJmb3JtSWQiLCJ2YWx1ZSIsInNldFNoYXJlQ29udGVudCIsIm1hdGNoIiwibGVhZ3VlX25hbWUiLCJsZW5ndGgiLCJob21lIiwiaG9tZV9zY29yZSIsImF3YXlfc2NvcmUiLCJhd2F5IiwiZXZlbnRzIiwiJGV2ZW50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QXJCO0FBQ0FoRCxjQUFRQyxHQUFSLENBQVksd0JBQVosRUFBc0M2QyxFQUFFQyxNQUFGLENBQVNFLEtBQS9DO0FBQ0gsS0EzREs7O0FBNkROO0FBQ0FDLG1CQTlETSwyQkE4RFdDLEtBOURYLEVBOERrQjtBQUN0Qm5ELGNBQVFDLEdBQVIsQ0FBWWtELEtBQVo7QUFDQSxXQUFLM0MsWUFBTCxHQUF1QjJDLE1BQU1DLFdBQTdCLFNBQTRDRCxNQUFNdEQsVUFBTixDQUFpQkMsS0FBakIsQ0FBdUIsQ0FBdkIsRUFBeUJxRCxNQUFNdEQsVUFBTixDQUFpQndELE1BQWpCLEdBQXdCLENBQWpELENBQTVDLFNBQW1HRixNQUFNRyxJQUF6RyxVQUFrSEgsTUFBTUksVUFBeEgsU0FBc0lKLE1BQU1LLFVBQTVJLFNBQTBKTCxNQUFNTSxJQUFoSztBQUNEO0FBakVLLEc7T0FvRVZDLE0sR0FBUztBQUNQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUlDLGtCQUFjLFVBQUtOLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBckQsY0FBUUMsR0FBUixDQUFlLE9BQUsyRCxLQUFwQixpQkFBcUNELE9BQU9FLElBQTVDLGNBQXlERixPQUFPRyxNQUFQLENBQWNGLEtBQXZFO0FBQ0QsS0FKTSxFOzs7a0JBdEdVN0UsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgRm9vdGVyIGZyb20gJ0AvY29tcG9uZW50cy9mb290ZXInIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfljbPml7bmr5TliIYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3QsXHJcbiAgICAgIGZvb3RlcjpGb290ZXJcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICBiYW5uZXJzOltdLFxyXG4gICAgICBjbGFzc0xpc3Q6W10sXHJcbiAgICAgIGdhbWVMaXN0OlsxLDIsMyw0LDUsNiw3LDgsOSwyMCwzMywzLDMsMywzLDMsXSxcclxuICAgICAgaXNVcEZyYXNoOmZhbHNlLFxyXG4gICAgICBzaGFyZUNvbnRlbnQ6J+aXtumXtOeci+W+l+ingeemj+WFi+aWrycsXHJcbiAgICAgIGlzU2NHYW1lOiB0cnVlLFxyXG4gICAgICB0b3RhbEZvY3VzOiAwLFxyXG4gICAgICBwYWdlOjEsXHJcbiAgICAgIG1hdGNoTGlzdDpbXVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNjR2FtZSgpe1xyXG4gICAgICAgICAgdGhpcy5pc1NjR2FtZSA9ICF0aGlzLmlzU2NHYW1lO1xyXG4gICAgICAgICAgdGhpcy50b3RhbEZvY3VzICsrIDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnb3RvSW5kZXgoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvaW5kZXhgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b1Jlc3VsdCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9yZXN1bHRgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZldHVyZSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mZWF0dXJlYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9Gb2N1cygpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mb2N1c2BcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmiZPlvIDotrPnkIPmr5TotZsgKi9cclxuICAgICAgICBvcGVuTWluaTEoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3hlMGE0YzViOWY4NWY5Y2Y1JyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog5LiW55WM5p2v6Laz55CD5oOF5oqlICovXHJcbiAgICAgICAgb3Blbk1pbmkyKCl7XHJcbiAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eDBjMmQ1MWI3YjQzMzdjM2EnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLmZvcm1JZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3Jt5Y+R55Sf5LqGc3VibWl05LqL5Lu277yM5pC65bim5pWw5o2u5Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog6LCD5pW05YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgICAgc2V0U2hhcmVDb250ZW50KCBtYXRjaCApe1xyXG4gICAgICAgICAgY29uc29sZS5sb2cobWF0Y2gpO1xyXG4gICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBgJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gICR7bWF0Y2guaG9tZV9zY29yZX0tJHttYXRjaC5hd2F5X3Njb3JlfSAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgZ2V0Q2xhc3NMaXN0KCl7XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaExpc3QsZGF0YTp7dHlwZSA6IDAscGFnZTogdGhpcy5wYWdlfX0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgIGxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgdmFsLmlzRm9jdXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFsLm1hdGNoX3RpbWVfbWludXRlID0gdmFsLm1hdGNoX3RpbWUuc2xpY2UoMTAsMTYpO1xyXG4gICAgICAgICAgfSApXHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gdGhpcy5tYXRjaExpc3QuY29uY2F0KCByZXMuZGF0YS5kYXRhLmxpc3QgKTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlICsrIDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5tYXRjaExpc3QpO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAvKnRoaXMuZ2V0QmFubmVycygpOyovXHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAgKi9cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgLy8g5Yi35paw5a6M5ZCO5YGc5q2i5Yi35pawXHJcbiAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICAgIH0gKTtcclxuICAgICAgLy8gc2V0VGltZW91dCggKCkgPT4ge1xyXG4gICAgICAgICAgXHJcbiAgICAgIC8vIH0sMjAwMCApXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKiDkuIrmi4nop6blupUgKi9cclxuICAgIG9uUmVhY2hCb3R0b20oKXtcclxuICAgICAgdGhpcy5pc1VwRnJhc2ggPSB0cnVlO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5pc1VwRnJhc2ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9IClcclxuICAgICAgY29uc29sZS5sb2coXCLkuIrmi4nop6blupXkuoZcIilcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgICAgLyogdG9kbzrorr7nva7opoHliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgY29uc29sZS5sb2coMik7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZUNvbnRlbnQsXHJcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=