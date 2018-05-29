'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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
          type: 2,
          page: this.page,
          date: this.date
        };
      } else {
        data = {
          type: 2,
          page: this.page,
          date: this.date,
          league_id: this.leagueFilte.join(',')
        };
      }
      // wx.showLoading({
      //         title: '加载中',
      //       })
      return _wepy2.default.request({ url: _config2.default.matchList,
        data: data,
        header: {
          'Authorization': '' + this.$parent.globalData.token
        } }).then(function (res) {
        // wx.hideLoading();

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

      return _wepy2.default.request({ url: _config2.default.leagueList, data: { type: 2, date: this.date },
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
      this.start = this.getNowFormatDate();
      this.end = this.getNowFormatDate(new Date(new Date().getTime() + 604800000));
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
    navigationBarTitleText: '赛程',
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
    leaguelist: [],
    isShowLeague: false,
    leagueFilte: null,
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

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmUuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJkYXRhIiwibGVhZ3VlRmlsdGUiLCJ0eXBlIiwicGFnZSIsImRhdGUiLCJsZWFndWVfaWQiLCJqb2luIiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJhcGlQYXRoIiwibWF0Y2hMaXN0IiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ0b2tlbiIsInRoZW4iLCJsaXN0IiwicmVzIiwidG90YWwiLCJtZXRhIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsIm1hdGNoX3RpbWVfbWludXRlIiwibWF0Y2hfdGltZSIsInNsaWNlIiwiY29uY2F0IiwiJGFwcGx5IiwibGVhZ3VlTGlzdCIsImxlYWd1ZWxpc3QiLCJjaGVja2VkIiwiZ2V0Tm93Rm9ybWF0RGF0ZSIsInN0YXJ0IiwiZW5kIiwiRGF0ZSIsImdldFRpbWUiLCJnZXRDbGFzc0xpc3QiLCJnZXRMZWF1Z2VMaXN0Iiwid3giLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiaXNVcEZyYXNoIiwiY29uc29sZSIsImxvZyIsInRpdGxlIiwic2hhcmVDb250ZW50IiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb250YWN0IiwiQ29udGFjdCIsIkxlYXVnZSIsIm1peGlucyIsIm15TWl4aW4iLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiYmFubmVycyIsImNsYXNzTGlzdCIsImdhbWVMaXN0IiwiaXNTaG93TGVhZ3VlIiwiZm9ybUlkIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3BlbkxlYWd1ZSIsImdvdG9SZXN1bHQiLCJuYXZpZ2F0ZVRvIiwiZ290b0ZldHVyZSIsIm9wZW5NaW5pMSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwiZXh0cmFEYXRhIiwiZm9vIiwiZW52VmVyc2lvbiIsIm9wZW5NaW5pMiIsImZvcm1TdWJtaXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzZXRTaGFyZUNvbnRlbnQiLCJtYXRjaCIsImxlYWd1ZV9uYW1lIiwiaG9tZSIsImhvbWVfc2NvcmUiLCJhd2F5X3Njb3JlIiwiYXdheSIsImJpbmREYXRlQ2hhbmdlIiwiY29sbGVjdCIsImluZGV4IiwiaWQiLCJpc19jb2xsZWN0Iiwic2hvd0xvYWRpbmciLCJtYXRjaENvbGxlY3QiLCJtZXRob2QiLCJtYXRjaF9pZCIsImhpZGVMb2FkaW5nIiwidG90YWxGb2N1cyIsImZvcm1faWQiLCJldmVudHMiLCIkZXZlbnQiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBSDJDO0FBQ0Y7OztJQUlwQkEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUtuQjs7QUFFQzs7bUNBRWE7QUFBQTs7QUFDWixVQUFJQyxPQUFPLEVBQVg7QUFDQyxVQUFJLEtBQUtDLFdBQUwsS0FBcUIsSUFBekIsRUFBK0I7QUFDOUJELGVBQU87QUFDSEUsZ0JBQU8sQ0FESjtBQUVIQyxnQkFBTSxLQUFLQSxJQUZSO0FBR0hDLGdCQUFNLEtBQUtBO0FBSFIsU0FBUDtBQU1BLE9BUEQsTUFPSztBQUNDSixlQUFPO0FBQ0FFLGdCQUFPLENBRFA7QUFFQUMsZ0JBQU0sS0FBS0EsSUFGWDtBQUdBQyxnQkFBTSxLQUFLQSxJQUhYO0FBSUFDLHFCQUFVLEtBQUtKLFdBQUwsQ0FBaUJLLElBQWpCLENBQXNCLEdBQXRCO0FBSlYsU0FBUDtBQU1MO0FBQ0Y7QUFDQTtBQUNBO0FBQ0MsYUFBT0MsZUFBS0MsT0FBTCxDQUFhLEVBQUNDLEtBQUlDLGlCQUFRQyxTQUFiO0FBQ2pCWCxjQUFLQSxJ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S0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR2QyxXQUpFLEVBQWIsRUFPQ0MsSUFQRCxDQU9PLGVBQU87QUFDVnVCLGFBQUdrRSxXQUFIO0FBQ0EsaUJBQUs5RixTQUFMLENBQWV1RixLQUFmLEVBQXNCRSxVQUF0QixHQUFtQyxJQUFuQztBQUNBLGlCQUFLTSxVQUFMO0FBQ0EsaUJBQUs5RSxNQUFMO0FBQ0FjLGtCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNILFNBYkQ7QUFjSDtBQUVGO0FBdEdLLEc7T0EwR1ZpRSxNLEdBQVM7QUFDTixxQkFBZ0Isd0JBQWE7QUFDMUIsYUFBS3RDLFlBQUwsR0FBb0IsS0FBcEI7QUFDSCxLQUhNOztBQUtQLG1CQUFlLHNCQUFhO0FBQzFCNUIsY0FBUUMsR0FBUjtBQUNBLGFBQUsyQixZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsYUFBS25FLElBQUwsR0FBWSxDQUFaO0FBQ0EsYUFBS1EsU0FBTCxHQUFpQixFQUFqQjtBQUNBLGFBQUtWLFdBQUw7QUFDQSxhQUFLb0MsWUFBTDtBQUNELEtBWk07QUFhUCxrQkFBYyxxQkFBYTtBQUFBOztBQUN6QixVQUFJd0Usa0JBQWMsVUFBS3hGLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBcUIsY0FBUUMsR0FBUixDQUFlLE9BQUttRSxLQUFwQixpQkFBcUNELE9BQU9FLElBQTVDLGNBQXlERixPQUFPRyxNQUFQLENBQWNGLEtBQXZFO0FBQ0QsS0FoQk0sRTs7O2tCQXJKVS9HLEsiLCJmaWxlIjoiZmVhdHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgTGVhdWdlIGZyb20gJ0AvY29tcG9uZW50cy9sZWF1Z2UnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotZvnqIsnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycgIFxyXG4gICAgfVxyXG5cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJMZWF1Z2VcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwibGVhZ3VlbGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdCxcclxuICAgICAgTGVhdWdlOkxlYXVnZVxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICBpbnRlcnZhbDogNTAwMCxcclxuICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgIGJhbm5lcnM6W10sXHJcbiAgICAgIGNsYXNzTGlzdDpbXSxcclxuICAgICAgZ2FtZUxpc3Q6WzEsMiwzLDQsNSw2LDcsOCw5LDIwLDMzLDMsMywzLDMsMyxdLFxyXG4gICAgICBpc1VwRnJhc2g6ZmFsc2UsXHJcbiAgICAgIHNoYXJlQ29udGVudDon5pe26Ze055yL5b6X6KeB56aP5YWL5pavJyxcclxuICAgICAgcGFnZToxLFxyXG4gICAgICBtYXRjaExpc3Q6W10sXHJcbiAgICAgIHRvdGFsOjAsXHJcbiAgICAgIGRhdGU6ICcnLFxyXG4gICAgICBzdGFydDogJycsXHJcbiAgICAgIGVuZDonJyxcclxuICAgICAgbGVhZ3VlbGlzdDpbXSxcclxuICAgICAgaXNTaG93TGVhZ3VlOmZhbHNlLFxyXG4gICAgICBsZWFndWVGaWx0ZTpudWxsLFxyXG4gICAgICBmb3JtSWQ6JydcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgb3BlbkxlYWd1ZSgpe1xyXG4gICAgICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9SZXN1bHQoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvcmVzdWx0YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9GZXR1cmUoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvZmVhdHVyZWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmiZPlvIDotrPnkIPmr5TotZsgKi9cclxuICAgICAgICBvcGVuTWluaTEoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3hlMGE0YzViOWY4NWY5Y2Y1JyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog5LiW55WM5p2v6Laz55CD5oOF5oqlICovXHJcbiAgICAgICAgb3Blbk1pbmkyKCl7XHJcbiAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eDBjMmQ1MWI3YjQzMzdjM2EnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIHRoaXMuZm9ybUlkID0gZS5kZXRhaWwuZm9ybUlkO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZm9ybUlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm3lj5HnlJ/kuoZzdWJtaXTkuovku7bvvIzmkLrluKbmlbDmja7kuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDosIPmlbTliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgICBzZXRTaGFyZUNvbnRlbnQobWF0Y2gpe1xyXG4gICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBgJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gICR7bWF0Y2guaG9tZV9zY29yZX0tJHttYXRjaC5hd2F5X3Njb3JlfSAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kRGF0ZUNoYW5nZShlKXtcclxuICAgICAgICAgIHRoaXMuZGF0ZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmlLbol48gKi9cclxuICAgICAgICBjb2xsZWN0KGluZGV4LGlkKXtcclxuXHJcbiAgICAgICAgICBpZiggdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgICl7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzIC0tIDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPlua2iOaUtuiXj+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WFs+azqOS4rScsXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoQ29sbGVjdCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkLFxyXG4gICAgICAgICAgICAgICAgZm9ybV9pZDp0aGlzLmZvcm1JZH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzICsrIDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aUtuiXj+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgICdsZWFndWUtY2FuY2VsJzooLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgXHJcbiAgICAgICdsZWFndWUtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJnc1swXSk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5sZWFndWVGaWx0ZSA9IGFyZ3NbMF07XHJcbiAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgfSxcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICAgLy8g6I635Y+W6K++56iL5YiX6KGoXHJcbiAgICBcclxuICAgIGdldENsYXNzTGlzdCgpe1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgaWYoIHRoaXMubGVhZ3VlRmlsdGUgPT09IG51bGwgKXtcclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0eXBlIDogMixcclxuICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICAgICAgICBkYXRlOiB0aGlzLmRhdGVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogMixcclxuICAgICAgICAgICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogdGhpcy5kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlYWd1ZV9pZDp0aGlzLmxlYWd1ZUZpbHRlLmpvaW4oJywnKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgIC8vIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgLy8gICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgIC8vICAgICAgIH0pXHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaExpc3QsXHJcbiAgICAgICAgICBkYXRhOmRhdGEsXHJcbiAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAvLyB3eC5oaWRlTG9hZGluZygpO1xyXG5cclxuICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgdGhpcy50b3RhbCA9IHJlcy5kYXRhLmRhdGEubWV0YS50b3RhbDtcclxuICAgICAgICAgIGxpc3QubGVuZ3RoICYmIGxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuXHJcbiAgICAgICAgICAgIHZhbC5tYXRjaF90aW1lX21pbnV0ZSA9IHZhbC5tYXRjaF90aW1lICYmIHZhbC5tYXRjaF90aW1lLnNsaWNlKDEwLDE2KTtcclxuICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IHRoaXMubWF0Y2hMaXN0LmNvbmNhdCggcmVzLmRhdGEuZGF0YS5saXN0ICk7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSArKyA7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRMZWF1Z2VMaXN0KCl7XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5sZWFndWVMaXN0LGRhdGE6e3R5cGUgOiAyLCBkYXRlOiB0aGlzLmRhdGV9LFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZ3VlbGlzdCA9IGxpc3Quc2xpY2UoMSwxMDApO1xyXG4gICAgICAgICAgICB0aGlzLmxlYWd1ZWxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICB2YWwuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgLyp0aGlzLmdldEJhbm5lcnMoKTsqL1xyXG4gICAgICB0aGlzLmRhdGUgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5zdGFydCA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLmVuZCA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZShuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDYwNDgwMDAwMCkpO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICAqL1xyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAvLyDliLfmlrDlrozlkI7lgZzmraLliLfmlrBcclxuICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyog5LiK5ouJ6Kem5bqVICovXHJcbiAgICBvblJlYWNoQm90dG9tKCl7XHJcbiAgICAgIHRoaXMuaXNVcEZyYXNoID0gdHJ1ZTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNVcEZyYXNoID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSApXHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICAgIC8qIHRvZG866K6+572u6KaB5YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgIGNvbnNvbGUubG9nKDIpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVDb250ZW50LFxyXG4gICAgICAgICAgcGF0aDogJy9wYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICBpbWFnZVVybDonL2ltYWdlcy9zaGFyZV9pbWcuanBnJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HlpLHotKVcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19