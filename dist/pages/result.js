'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _contact = require('./../components/contact.js');

var _contact2 = _interopRequireDefault(_contact);

var _leauge = require('./../components/leauge.js');

var _leauge2 = _interopRequireDefault(_leauge);

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

    // 获取课程列表

    value: function getClassList() {
      var _this2 = this;

      var data = {};
      if (this.leagueFilte === null) {
        data = {
          type: 1,
          page: this.page,
          date: this.date
        };
      } else {
        data = {
          type: 1,
          page: this.page,
          date: this.date,
          league_id: this.leagueFilte.join(',')
        };
      }
      wx.showLoading({
        title: '加载中'
      });
      return _wepy2.default.request({ url: _config2.default.matchList,
        data: data,
        header: {
          'Authorization': '' + this.$parent.globalData.token
        } }).then(function (res) {
        wx.hideLoading();
        var list = res.data.data.list;
        _this2.total = res.data.data.meta.total;
        list.length && list.forEach(function (val) {
          val.match_time_minute = val.match_time && val.match_time.slice(10, 16);
        });
        _this2.matchList = _this2.matchList.concat(res.data.data.list);
        _this2.page++;
        _this2.$apply();
      });
    }
  }, {
    key: 'getLeaugeList',
    value: function getLeaugeList() {
      var _this3 = this;

      return _wepy2.default.request({ url: _config2.default.leagueList, data: { type: 1, date: this.date },
        header: {
          'Authorization': '' + this.$parent.globalData.token
        } }).then(function (res) {
        var list = res.data.data.list;
        _this3.leaguelist = list.slice(1, 100);
        _this3.leaguelist.forEach(function (val) {
          val.checked = true;
        });
        _this3.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      /*this.getBanners();*/
      this.date = this.getNowFormatDate();
      this.start = this.getNowFormatDate(new Date(new Date().getTime() - 604800000));
      this.end = this.getNowFormatDate();
      this.getClassList();
      this.getLeaugeList();
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
    }

    /* 上拉触底 */

  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      var _this4 = this;

      this.isUpFrash = true;
      this.getClassList().then(function (res) {
        _this4.isUpFrash = false;
        _this4.$apply();
      });
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
  var _this6 = this;

  this.config = {
    navigationBarTitleText: '赛果',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black'
  };
  this.$repeat = {};
  this.$props = { "Leauge": { "xmlns:v-bind": "", "v-bind:list.sync": "leaguelist" } };
  this.$events = {};
  this.components = {
    contact: _contact2.default,
    Leauge: _leauge2.default
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
    page: 1,
    matchList: [],
    total: 0,
    date: '',
    start: '',
    end: '',
    isShowLeague: false,
    leagueFilte: null,
    leaguelist: [],
    formId: ''
  };
  this.computed = {};
  this.methods = {
    openLeague: function openLeague() {
      this.isShowLeague = true;
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
      this.formId = e.detail.formId;
      // console.log(e);
      console.log(e.detail.formId);
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
    },

    /* 调整分享的内容 */
    setShareContent: function setShareContent(match) {
      this.shareContent = match.league_name + ' ' + match.match_time.slice(0, match.match_time.length - 3) + ' ' + match.home + '  ' + match.home_score + '-' + match.away_score + ' ' + match.away;
    },
    bindDateChange: function bindDateChange(e) {
      this.date = e.detail.value;
      this.page = 1;
      this.matchList = [];
      this.getClassList();
      this.getLeaugeList();
    },

    /* 收藏 */
    collect: function collect(index, id) {
      var _this5 = this;

      if (this.matchList[index].is_collect) {
        wx.showLoading({
          title: '取消中'
        });
        _wepy2.default.request({ url: _config2.default.matchCollect,
          method: 'DELETE',
          data: { match_id: id },
          header: {
            'Authorization': '' + this.$parent.globalData.token
          } }).then(function (res) {
          wx.hideLoading();
          _this5.matchList[index].is_collect = false;
          _this5.totalFocus--;
          _this5.$apply();
          console.log('取消收藏成功');
        });
      } else {
        wx.showLoading({
          title: '关注中'
        });
        _wepy2.default.request({ url: _config2.default.matchCollect,
          method: 'POST',
          data: { match_id: id,
            form_id: this.formId },
          header: {
            'Authorization': '' + this.$parent.globalData.token
          } }).then(function (res) {
          wx.hideLoading();
          _this5.matchList[index].is_collect = true;
          _this5.totalFocus++;
          _this5.$apply();
          console.log('收藏成功');
        });
      }
    }
  };
  this.events = {
    'league-cancel': function leagueCancel() {
      _this6.isShowLeague = false;
    },
    'league-emit': function leagueEmit() {
      console.log(arguments.length <= 0 ? undefined : arguments[0]);
      _this6.isShowLeague = false;
      _this6.page = 1;
      _this6.matchList = [];
      _this6.leagueFilte = arguments.length <= 0 ? undefined : arguments[0];
      _this6.getClassList();
    },
    'index-emit': function indexEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this6.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    } };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/result'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImRhdGEiLCJsZWFndWVGaWx0ZSIsInR5cGUiLCJwYWdlIiwiZGF0ZSIsImxlYWd1ZV9pZCIsImpvaW4iLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJyZXF1ZXN0IiwidXJsIiwibWF0Y2hMaXN0IiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ0b2tlbiIsInRoZW4iLCJoaWRlTG9hZGluZyIsImxpc3QiLCJyZXMiLCJ0b3RhbCIsIm1ldGEiLCJsZW5ndGgiLCJmb3JFYWNoIiwidmFsIiwibWF0Y2hfdGltZV9taW51dGUiLCJtYXRjaF90aW1lIiwic2xpY2UiLCJjb25jYXQiLCIkYXBwbHkiLCJsZWFndWVMaXN0IiwibGVhZ3VlbGlzdCIsImNoZWNrZWQiLCJnZXROb3dGb3JtYXREYXRlIiwic3RhcnQiLCJEYXRlIiwiZ2V0VGltZSIsImVuZCIsImdldENsYXNzTGlzdCIsImdldExlYXVnZUxpc3QiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiaXNVcEZyYXNoIiwiY29uc29sZSIsImxvZyIsInNoYXJlQ29udGVudCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIkxlYXVnZSIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJiYW5uZXJzIiwiY2xhc3NMaXN0IiwiZ2FtZUxpc3QiLCJpc1Nob3dMZWFndWUiLCJmb3JtSWQiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJvcGVuTGVhZ3VlIiwiZ290b1Jlc3VsdCIsIm5hdmlnYXRlVG8iLCJnb3RvRmV0dXJlIiwib3Blbk1pbmkxIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJleHRyYURhdGEiLCJmb28iLCJlbnZWZXJzaW9uIiwib3Blbk1pbmkyIiwiZm9ybVN1Ym1pdCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInNldFNoYXJlQ29udGVudCIsIm1hdGNoIiwibGVhZ3VlX25hbWUiLCJob21lIiwiaG9tZV9zY29yZSIsImF3YXlfc2NvcmUiLCJhd2F5IiwiYmluZERhdGVDaGFuZ2UiLCJjb2xsZWN0IiwiaW5kZXgiLCJpZCIsImlzX2NvbGxlY3QiLCJtYXRjaENvbGxlY3QiLCJtZXRob2QiLCJtYXRjaF9pZCIsInRvdGFsRm9jdXMiLCJmb3JtX2lkIiwiZXZlbnRzIiwiJGV2ZW50IiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUgyQztBQUNGOzs7SUFJcEJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdLbkI7O0FBRUM7O21DQUVhO0FBQUE7O0FBQ1osVUFBSUMsT0FBTyxFQUFYO0FBQ0MsVUFBSSxLQUFLQyxXQUFMLEtBQXFCLElBQXpCLEVBQStCO0FBQzlCRCxlQUFPO0FBQ0hFLGdCQUFPLENBREo7QUFFSEMsZ0JBQU0sS0FBS0EsSUFGUjtBQUdIQyxnQkFBTSxLQUFLQTtBQUhSLFNBQVA7QUFNQSxPQVBELE1BT0s7QUFDQ0osZUFBTztBQUNBRSxnQkFBTyxDQURQO0FBRUFDLGdCQUFNLEtBQUtBLElBRlg7QUFHQUMsZ0JBQU0sS0FBS0EsSUFIWDtBQUlBQyxxQkFBVSxLQUFLSixXQUFMLENBQWlCSyxJQUFqQixDQUFzQixHQUF0QjtBQUpWLFNBQVA7QUFNTDtBQUNGQyxTQUFHQyxXQUFILENBQWU7QUFDUEMsZUFBTztBQURBLE9BQWY7QUFHQyxhQUFPLGVBQUtDLE9BQUwsQ0FBYSxFQUFDQyxLQUFJLGlCQUFRQyxTQUFiO0FBQ2pCWixjQUFLQSxJQURZO0FBRWpCYSxn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QyxXQUpFLEVBQWIsRUFPQ0MsSUFQRCxDQU9PLGVBQU87QUFDVlYsYUFBR1csV0FBSDtBQUNBLGlCQUFLTixTQUFMLENBQWVvRixLQUFmLEVBQXNCRSxVQUF0QixHQUFtQyxJQUFuQztBQUNBLGlCQUFLSSxVQUFMO0FBQ0EsaUJBQUt4RSxNQUFMO0FBQ0FhLGtCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNILFNBYkQ7QUFjSDtBQUVGO0FBdEdLLEc7T0EwR1Y0RCxNLEdBQVM7QUFDTixxQkFBZ0Isd0JBQWE7QUFDMUIsYUFBS3BDLFlBQUwsR0FBb0IsS0FBcEI7QUFDSCxLQUhNO0FBSU4sbUJBQWUsc0JBQWE7QUFDM0J6QixjQUFRQyxHQUFSO0FBQ0EsYUFBS3dCLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxhQUFLakUsSUFBTCxHQUFZLENBQVo7QUFDQSxhQUFLUyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsYUFBS1gsV0FBTDtBQUNBLGFBQUtzQyxZQUFMO0FBQ0QsS0FYTTtBQVlQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUlrRSxrQkFBYyxVQUFLbEYsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FvQixjQUFRQyxHQUFSLENBQWUsT0FBSzhELEtBQXBCLGlCQUFxQ0QsT0FBT0UsSUFBNUMsY0FBeURGLE9BQU9HLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQWZNLEU7OztrQkFySlUzRyxLIiwiZmlsZSI6InJlc3VsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgTGVhdWdlIGZyb20gJ0AvY29tcG9uZW50cy9sZWF1Z2UnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotZvmnpwnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycgIFxyXG4gICAgfVxyXG5cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJMZWF1Z2VcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwibGVhZ3VlbGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdCxcclxuICAgICAgTGVhdWdlXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW215TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcclxuICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgIGludGVydmFsOiA1MDAwLFxyXG4gICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgYmFubmVyczpbXSxcclxuICAgICAgY2xhc3NMaXN0OltdLFxyXG4gICAgICBnYW1lTGlzdDpbMSwyLDMsNCw1LDYsNyw4LDksMjAsMzMsMywzLDMsMywzLF0sXHJcbiAgICAgIGlzVXBGcmFzaDpmYWxzZSxcclxuICAgICAgc2hhcmVDb250ZW50Oifml7bpl7TnnIvlvpfop4Hnpo/lhYvmlq8nLFxyXG4gICAgICBwYWdlOjEsXHJcbiAgICAgIG1hdGNoTGlzdDpbXSxcclxuICAgICAgdG90YWw6MCxcclxuICAgICAgZGF0ZTogJycsXHJcbiAgICAgIHN0YXJ0OiAnJyxcclxuICAgICAgZW5kOicnLFxyXG4gICAgICBpc1Nob3dMZWFndWU6ZmFsc2UsXHJcbiAgICAgIGxlYWd1ZUZpbHRlOm51bGwsXHJcbiAgICAgIGxlYWd1ZWxpc3Q6W10sXHJcbiAgICAgIGZvcm1JZDonJyxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgb3BlbkxlYWd1ZSgpe1xyXG4gICAgICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9SZXN1bHQoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvcmVzdWx0YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9GZXR1cmUoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvZmVhdHVyZWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmiZPlvIDotrPnkIPmr5TotZsgKi9cclxuICAgICAgICBvcGVuTWluaTEoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3hlMGE0YzViOWY4NWY5Y2Y1JyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog5LiW55WM5p2v6Laz55CD5oOF5oqlICovXHJcbiAgICAgICAgb3Blbk1pbmkyKCl7XHJcbiAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eDBjMmQ1MWI3YjQzMzdjM2EnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtSWQgPSBlLmRldGFpbC5mb3JtSWQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC5mb3JtSWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnN1Ym1pdOS6i+S7tu+8jOaQuuW4puaVsOaNruS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOiwg+aVtOWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICAgIHNldFNoYXJlQ29udGVudChtYXRjaCl7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGAke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSAgJHttYXRjaC5ob21lX3Njb3JlfS0ke21hdGNoLmF3YXlfc2NvcmV9ICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJpbmREYXRlQ2hhbmdlKGUpe1xyXG4gICAgICAgICAgdGhpcy5kYXRlID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmlLbol48gKi9cclxuICAgICAgICBjb2xsZWN0KGluZGV4LGlkKXtcclxuXHJcbiAgICAgICAgICBpZiggdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgICl7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzIC0tIDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPlua2iOaUtuiXj+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WFs+azqOS4rScsXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoQ29sbGVjdCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkLFxyXG4gICAgICAgICAgICAgICAgZm9ybV9pZDp0aGlzLmZvcm1JZH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzICsrIDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aUtuiXj+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgICdsZWFndWUtY2FuY2VsJzooLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgICdsZWFndWUtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJnc1swXSk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5sZWFndWVGaWx0ZSA9IGFyZ3NbMF07XHJcbiAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgfSxcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g6I635Y+W6K++56iL5YiX6KGoXHJcbiAgICBcclxuICAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgZ2V0Q2xhc3NMaXN0KCl7XHJcbiAgICAgIGxldCBkYXRhID0ge307XHJcbiAgICAgICBpZiggdGhpcy5sZWFndWVGaWx0ZSA9PT0gbnVsbCApe1xyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHR5cGUgOiAxLFxyXG4gICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXHJcbiAgICAgICAgICAgIGRhdGU6IHRoaXMuZGF0ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRlOiB0aGlzLmRhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVhZ3VlX2lkOnRoaXMubGVhZ3VlRmlsdGUuam9pbignLCcpXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoTGlzdCxcclxuICAgICAgICAgIGRhdGE6ZGF0YSxcclxuICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgIHRoaXMudG90YWwgPSByZXMuZGF0YS5kYXRhLm1ldGEudG90YWw7XHJcbiAgICAgICAgICBsaXN0Lmxlbmd0aCAmJiBsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgIHZhbC5tYXRjaF90aW1lX21pbnV0ZSA9IHZhbC5tYXRjaF90aW1lICYmIHZhbC5tYXRjaF90aW1lLnNsaWNlKDEwLDE2KTtcclxuICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IHRoaXMubWF0Y2hMaXN0LmNvbmNhdCggcmVzLmRhdGEuZGF0YS5saXN0ICk7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSArKyA7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAgZ2V0TGVhdWdlTGlzdCgpe1xyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubGVhZ3VlTGlzdCxkYXRhOnt0eXBlIDogMSwgZGF0ZTogdGhpcy5kYXRlfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLmxlYWd1ZWxpc3QgPSBsaXN0LnNsaWNlKDEsMTAwKTtcclxuICAgICAgICAgICAgdGhpcy5sZWFndWVsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgLyp0aGlzLmdldEJhbm5lcnMoKTsqL1xyXG4gICAgICB0aGlzLmRhdGUgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5zdGFydCA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZShuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIDYwNDgwMDAwMCkpO1xyXG4gICAgICB0aGlzLmVuZCA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgICovXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgIC8vIOWIt+aWsOWujOWQjuWBnOatouWIt+aWsFxyXG4gICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICB0aGlzLm1hdGNoTGlzdCA9IFtdO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xyXG4gICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKiDkuIrmi4nop6blupUgKi9cclxuICAgIG9uUmVhY2hCb3R0b20oKXtcclxuICAgICAgdGhpcy5pc1VwRnJhc2ggPSB0cnVlO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5pc1VwRnJhc2ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9IClcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgICAgLyogdG9kbzrorr7nva7opoHliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgY29uc29sZS5sb2coMik7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZUNvbnRlbnQsXHJcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=