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
    leaguelist: []
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
          data: { match_id: id },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImRhdGEiLCJsZWFndWVGaWx0ZSIsInR5cGUiLCJwYWdlIiwiZGF0ZSIsImxlYWd1ZV9pZCIsImpvaW4iLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJyZXF1ZXN0IiwidXJsIiwibWF0Y2hMaXN0IiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ0b2tlbiIsInRoZW4iLCJoaWRlTG9hZGluZyIsImxpc3QiLCJyZXMiLCJ0b3RhbCIsIm1ldGEiLCJsZW5ndGgiLCJmb3JFYWNoIiwidmFsIiwibWF0Y2hfdGltZV9taW51dGUiLCJtYXRjaF90aW1lIiwic2xpY2UiLCJjb25jYXQiLCIkYXBwbHkiLCJsZWFndWVMaXN0IiwibGVhZ3VlbGlzdCIsImNoZWNrZWQiLCJnZXROb3dGb3JtYXREYXRlIiwic3RhcnQiLCJEYXRlIiwiZ2V0VGltZSIsImVuZCIsImdldENsYXNzTGlzdCIsImdldExlYXVnZUxpc3QiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiaXNVcEZyYXNoIiwiY29uc29sZSIsImxvZyIsInNoYXJlQ29udGVudCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIkxlYXVnZSIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJiYW5uZXJzIiwiY2xhc3NMaXN0IiwiZ2FtZUxpc3QiLCJpc1Nob3dMZWFndWUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJvcGVuTGVhZ3VlIiwiZ290b1Jlc3VsdCIsIm5hdmlnYXRlVG8iLCJnb3RvRmV0dXJlIiwib3Blbk1pbmkxIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJleHRyYURhdGEiLCJmb28iLCJlbnZWZXJzaW9uIiwib3Blbk1pbmkyIiwiZm9ybVN1Ym1pdCIsImUiLCJkZXRhaWwiLCJmb3JtSWQiLCJ2YWx1ZSIsInNldFNoYXJlQ29udGVudCIsIm1hdGNoIiwibGVhZ3VlX25hbWUiLCJob21lIiwiaG9tZV9zY29yZSIsImF3YXlfc2NvcmUiLCJhd2F5IiwiYmluZERhdGVDaGFuZ2UiLCJjb2xsZWN0IiwiaW5kZXgiLCJpZCIsImlzX2NvbGxlY3QiLCJtYXRjaENvbGxlY3QiLCJtZXRob2QiLCJtYXRjaF9pZCIsInRvdGFsRm9jdXMiLCJldmVudHMiLCIkZXZlbnQiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBSDJDO0FBQ0Y7OztJQUlwQkEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUtuQjs7QUFFQzs7bUNBRWE7QUFBQTs7QUFDWixVQUFJQyxPQUFPLEVBQVg7QUFDQyxVQUFJLEtBQUtDLFdBQUwsS0FBcUIsSUFBekIsRUFBK0I7QUFDOUJELGVBQU87QUFDSEUsZ0JBQU8sQ0FESjtBQUVIQyxnQkFBTSxLQUFLQSxJQUZSO0FBR0hDLGdCQUFNLEtBQUtBO0FBSFIsU0FBUDtBQU1BLE9BUEQsTUFPSztBQUNDSixlQUFPO0FBQ0FFLGdCQUFPLENBRFA7QUFFQUMsZ0JBQU0sS0FBS0EsSUFGWDtBQUdBQyxnQkFBTSxLQUFLQSxJQUhYO0FBSUFDLHFCQUFVLEtBQUtKLFdBQUwsQ0FBaUJLLElBQWpCLENBQXNCLEdBQXRCO0FBSlYsU0FBUDtBQU1MO0FBQ0ZDLFNBQUdDLFdBQUgsQ0FBZTtBQUNQQyxlQUFPO0FBREEsT0FBZjtBQUdDLGFBQU8sZUFBS0MsT0FBTCxDQUFhLEVBQUNDLEtBQUksaUJBQVFDLFNBQWI7QUFDakJaLGNBQUtBLElBRFk7QUFFakJhLGdCQUFRO0FBQ0osZ0NBQW9CLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEeEMsU0FGUyxFQUFiLEVBS0xDLElBTEssQ0FLQyxlQUFPO0FBQ1pWLFdBQUdXLFdBQUg7QUFDQSxZQUFJQyxPQUFPQyxJQUFJcEIsSUFBSixDQUFTQSxJQUFULENBQWNtQixJQUF6QjtBQUNBLGVBQUtFLEtBQUwsR0FBYUQsSUFBSXBCLElBQUosQ0FBU0EsSUFBVCxDQUFjc0IsSUFBZCxDQUFtQkQsS0FBaEM7QUFDQUYsYUFBS0ksTUFBTCxJQUFlSixLQUFLSyxPQUFMLENBQWMsZUFBTztBQUNsQ0MsY0FBSUMsaUJBQUosR0FBd0JELElBQUlFLFVBQUosSUFBa0JGLElBQUlFLFVBQUosQ0FBZUMsS0FBZixDQUFxQixFQUFyQixFQUF3QixFQUF4QixDQUExQztBQUNELFNBRmMsQ0FBZjtBQUdFLGVBQUtoQixTQUFMLEdBQWlCLE9BQUtBLFNBQUwsQ0FBZWlCLE1BQWYsQ0FBdUJULElBQUlwQixJQUFKLENBQVNBLElBQVQsQ0FBY21CLElBQXJDLENBQWpCO0FBQ0EsZUFBS2hCLElBQUw7QUFDQSxlQUFLMkIsTUFBTDtBQUNILE9BZkssQ0FBUDtBQWdCRjs7O29DQUVlO0FBQUE7O0FBQ2IsYUFBTyxlQUFLcEIsT0FBTCxDQUFhLEVBQUNDLEtBQUksaUJBQVFvQixVQUFiLEVBQXdCL0IsTUFBSyxFQUFDRSxNQUFPLENBQVIsRUFBV0UsTUFBTSxLQUFLQSxJQUF0QixFQUE3QjtBQUNoQlMsZ0JBQVE7QUFDTCxnQ0FBb0IsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR2QyxTQURRLEVBQWIsRUFJTEMsSUFKSyxDQUlDLGVBQU87QUFDVixZQUFJRSxPQUFPQyxJQUFJcEIsSUFBSixDQUFTQSxJQUFULENBQWNtQixJQUF6QjtBQUNBLGVBQUthLFVBQUwsR0FBa0JiLEtBQUtTLEtBQUwsQ0FBVyxDQUFYLEVBQWEsR0FBYixDQUFsQjtBQUNBLGVBQUtJLFVBQUwsQ0FBZ0JSLE9BQWhCLENBQXlCLGVBQU87QUFDOUJDLGNBQUlRLE9BQUosR0FBYyxJQUFkO0FBQ0QsU0FGRDtBQUdBLGVBQUtILE1BQUw7QUFDSCxPQVhLLENBQVA7QUFZRjs7OzZCQUVRO0FBQ1A7QUFDQSxXQUFLMUIsSUFBTCxHQUFZLEtBQUs4QixnQkFBTCxFQUFaO0FBQ0EsV0FBS0MsS0FBTCxHQUFhLEtBQUtELGdCQUFMLENBQXNCLElBQUlFLElBQUosQ0FBUyxJQUFJQSxJQUFKLEdBQVdDLE9BQVgsS0FBdUIsU0FBaEMsQ0FBdEIsQ0FBYjtBQUNBLFdBQUtDLEdBQUwsR0FBVyxLQUFLSixnQkFBTCxFQUFYO0FBQ0EsV0FBS0ssWUFBTDtBQUNBLFdBQUtDLGFBQUw7QUFDRDs7QUFJRDs7Ozs7O3dDQUdxQjtBQUNuQjtBQUNBLFdBQUtyQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFdBQUtTLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxXQUFLMkIsWUFBTCxHQUFvQnRCLElBQXBCLENBQTBCLGVBQU87QUFDL0JWLFdBQUdrQyxtQkFBSDtBQUNELE9BRkQ7QUFHRDs7QUFHRDs7OztvQ0FDZTtBQUFBOztBQUNiLFdBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxXQUFLSCxZQUFMLEdBQW9CdEIsSUFBcEIsQ0FBMEIsZUFBTztBQUMvQixlQUFLeUIsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGVBQUtaLE1BQUw7QUFDRCxPQUhEO0FBSUQ7Ozt3Q0FFbUI7QUFDbEI7QUFDQWEsY0FBUUMsR0FBUixDQUFZLENBQVo7QUFDQSxhQUFPO0FBQ0huQyxlQUFPLEtBQUtvQyxZQURUO0FBRUhDLGNBQU0sY0FGSDtBQUdIQyxrQkFBUyx1QkFITjtBQUlIQyxpQkFBUSxpQkFBUzVCLEdBQVQsRUFBYztBQUNwQjtBQUNELFNBTkU7QUFPSDZCLGNBQU0sY0FBUzdCLEdBQVQsRUFBYztBQUNsQjtBQUNEO0FBVEUsT0FBUDtBQVdEOzs7O0VBN1FnQyxlQUFLakIsSTs7Ozs7T0FDdEMrQyxNLEdBQVM7QUFDUEMsNEJBQXdCLElBRGpCO0FBRVBDLGtDQUE4QixTQUZ2QjtBQUdQQyw0QkFBd0I7QUFIakIsRztPQU1WQyxPLEdBQVUsRTtPQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLFlBQXRDLEVBQVYsRTtPQUNUQyxPLEdBQVUsRTtPQUNUQyxVLEdBQWE7QUFDUkMsOEJBRFE7QUFFUkM7QUFGUSxHO09BS1ZDLE0sR0FBUyxnQjtPQUVUNUQsSSxHQUFPO0FBQ0w2RCxtQkFBZSxJQURWO0FBRUxDLGNBQVUsSUFGTDtBQUdMQyxjQUFVLElBSEw7QUFJTEMsY0FBVSxJQUpMO0FBS0xDLGFBQVEsRUFMSDtBQU1MQyxlQUFVLEVBTkw7QUFPTEMsY0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLEVBQW5CLEVBQXNCLEVBQXRCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQTZCLENBQTdCLEVBQStCLENBQS9CLEVBQWlDLENBQWpDLENBUEo7QUFRTHpCLGVBQVUsS0FSTDtBQVNMRyxrQkFBYSxVQVRSO0FBVUwxQyxVQUFLLENBVkE7QUFXTFMsZUFBVSxFQVhMO0FBWUxTLFdBQU0sQ0FaRDtBQWFMakIsVUFBTSxFQWJEO0FBY0wrQixXQUFPLEVBZEY7QUFlTEcsU0FBSSxFQWZDO0FBZ0JMOEIsa0JBQWEsS0FoQlI7QUFpQkxuRSxpQkFBWSxJQWpCUDtBQWtCTCtCLGdCQUFXO0FBbEJOLEc7T0FxQlBxQyxRLEdBQVcsRTtPQUlYQyxPLEdBQVU7QUFDUkMsY0FEUSx3QkFDSTtBQUNQLFdBQUtILFlBQUwsR0FBb0IsSUFBcEI7QUFDRixLQUhLO0FBSU5JLGNBSk0sd0JBSU07QUFDVmpFLFNBQUdrRSxVQUFILENBQWM7QUFDWjlEO0FBRFksT0FBZDtBQUdELEtBUks7QUFTTitELGNBVE0sd0JBU007QUFDVm5FLFNBQUdrRSxVQUFILENBQWM7QUFDWjlEO0FBRFksT0FBZDtBQUdELEtBYks7O0FBY047QUFDQWdFLGFBZk0sdUJBZUs7QUFDVHBFLFNBQUdxRSxxQkFBSCxDQUF5QjtBQUN2QkMsZUFBTyxvQkFEZ0I7QUFFdkIvQixjQUFNLGFBRmlCO0FBR3ZCZ0MsbUJBQVc7QUFDVEMsZUFBSztBQURJLFNBSFk7QUFNdkJDLG9CQUFZLFNBTlc7QUFPdkJoQyxlQVB1QixtQkFPZjVCLEdBUGUsRUFPVjtBQUNYO0FBQ0Q7QUFUc0IsT0FBekI7QUFXRCxLQTNCSzs7O0FBNkJOO0FBQ0E2RCxhQTlCTSx1QkE4Qks7QUFDUjFFLFNBQUdxRSxxQkFBSCxDQUF5QjtBQUN4QkMsZUFBTyxvQkFEaUI7QUFFeEIvQixjQUFNLGFBRmtCO0FBR3hCZ0MsbUJBQVc7QUFDVEMsZUFBSztBQURJLFNBSGE7QUFNeEJDLG9CQUFZLFNBTlk7QUFPeEJoQyxlQVB3QixtQkFPaEI1QixHQVBnQixFQU9YO0FBQ1g7QUFDRDtBQVR1QixPQUF6QjtBQVdGLEtBMUNLOztBQTJDTjhELGdCQUFZLG9CQUFTQyxDQUFULEVBQVk7QUFDcEI7QUFDQXhDLGNBQVFDLEdBQVIsQ0FBWXVDLEVBQUVDLE1BQUYsQ0FBU0MsTUFBckI7QUFDQTFDLGNBQVFDLEdBQVIsQ0FBWSx3QkFBWixFQUFzQ3VDLEVBQUVDLE1BQUYsQ0FBU0UsS0FBL0M7QUFDSCxLQS9DSzs7QUFpRE47QUFDQUMsbUJBbERNLDJCQWtEVUMsS0FsRFYsRUFrRGdCO0FBQ3BCLFdBQUszQyxZQUFMLEdBQXVCMkMsTUFBTUMsV0FBN0IsU0FBNENELE1BQU03RCxVQUFOLENBQWlCQyxLQUFqQixDQUF1QixDQUF2QixFQUF5QjRELE1BQU03RCxVQUFOLENBQWlCSixNQUFqQixHQUF3QixDQUFqRCxDQUE1QyxTQUFtR2lFLE1BQU1FLElBQXpHLFVBQWtIRixNQUFNRyxVQUF4SCxTQUFzSUgsTUFBTUksVUFBNUksU0FBMEpKLE1BQU1LLElBQWhLO0FBQ0QsS0FwREs7QUFzRE5DLGtCQXRETSwwQkFzRFNYLENBdERULEVBc0RXO0FBQ2YsV0FBSy9FLElBQUwsR0FBWStFLEVBQUVDLE1BQUYsQ0FBU0UsS0FBckI7QUFDQSxXQUFLbkYsSUFBTCxHQUFZLENBQVo7QUFDQSxXQUFLUyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsV0FBSzJCLFlBQUw7QUFDQyxXQUFLQyxhQUFMO0FBQ0YsS0E1REs7O0FBNkROO0FBQ0F1RCxXQTlETSxtQkE4REVDLEtBOURGLEVBOERRQyxFQTlEUixFQThEVztBQUFBOztBQUVmLFVBQUksS0FBS3JGLFNBQUwsQ0FBZW9GLEtBQWYsRUFBc0JFLFVBQTFCLEVBQXVDO0FBQ3JDM0YsV0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPO0FBRE0sU0FBZjtBQUdFLHVCQUFLQyxPQUFMLENBQWEsRUFBQ0MsS0FBSSxpQkFBUXdGLFlBQWI7QUFDWEMsa0JBQU8sUUFESTtBQUVYcEcsZ0JBQUssRUFBQ3FHLFVBQVdKLEVBQVosRUFGTTtBQUdWcEYsa0JBQVE7QUFDTCxrQ0FBb0IsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR2QyxXQUhFLEVBQWIsRUFNQ0MsSUFORCxDQU1PLGVBQU87QUFDVlYsYUFBR1csV0FBSDtBQUNBLGlCQUFLTixTQUFMLENBQWVvRixLQUFmLEVBQXNCRSxVQUF0QixHQUFtQyxLQUFuQztBQUNBLGlCQUFLSSxVQUFMO0FBQ0EsaUJBQUt4RSxNQUFMO0FBQ0FhLGtCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNILFNBWkQ7QUFhSCxPQWpCRCxNQWlCSztBQUNEckMsV0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPO0FBRE0sU0FBZjtBQUdBLHVCQUFLQyxPQUFMLENBQWEsRUFBQ0MsS0FBSSxpQkFBUXdGLFlBQWI7QUFDWEMsa0JBQU8sTUFESTtBQUVYcEcsZ0JBQUssRUFBQ3FHLFVBQVdKLEVBQVosRUFGTTtBQUdWcEYsa0JBQVE7QUFDTCxrQ0FBb0IsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR2QyxXQUhFLEVBQWIsRUFNQ0MsSUFORCxDQU1PLGVBQU87QUFDVlYsYUFBR1csV0FBSDtBQUNBLGlCQUFLTixTQUFMLENBQWVvRixLQUFmLEVBQXNCRSxVQUF0QixHQUFtQyxJQUFuQztBQUNBLGlCQUFLSSxVQUFMO0FBQ0EsaUJBQUt4RSxNQUFMO0FBQ0FhLGtCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNILFNBWkQ7QUFhSDtBQUVGO0FBcEdLLEc7T0F3R1YyRCxNLEdBQVM7QUFDTixxQkFBZ0Isd0JBQWE7QUFDMUIsYUFBS25DLFlBQUwsR0FBb0IsS0FBcEI7QUFDSCxLQUhNO0FBSU4sbUJBQWUsc0JBQWE7QUFDM0J6QixjQUFRQyxHQUFSO0FBQ0EsYUFBS3dCLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxhQUFLakUsSUFBTCxHQUFZLENBQVo7QUFDQSxhQUFLUyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsYUFBS1gsV0FBTDtBQUNBLGFBQUtzQyxZQUFMO0FBQ0QsS0FYTTtBQVlQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUlpRSxrQkFBYyxVQUFLakYsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FvQixjQUFRQyxHQUFSLENBQWUsT0FBSzZELEtBQXBCLGlCQUFxQ0QsT0FBT0UsSUFBNUMsY0FBeURGLE9BQU9HLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQWZNLEU7OztrQkFsSlUxRyxLIiwiZmlsZSI6InJlc3VsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgTGVhdWdlIGZyb20gJ0AvY29tcG9uZW50cy9sZWF1Z2UnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotZvmnpwnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycgIFxyXG4gICAgfVxyXG5cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJMZWF1Z2VcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwibGVhZ3VlbGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdCxcclxuICAgICAgTGVhdWdlXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW215TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcclxuICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgIGludGVydmFsOiA1MDAwLFxyXG4gICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgYmFubmVyczpbXSxcclxuICAgICAgY2xhc3NMaXN0OltdLFxyXG4gICAgICBnYW1lTGlzdDpbMSwyLDMsNCw1LDYsNyw4LDksMjAsMzMsMywzLDMsMywzLF0sXHJcbiAgICAgIGlzVXBGcmFzaDpmYWxzZSxcclxuICAgICAgc2hhcmVDb250ZW50Oifml7bpl7TnnIvlvpfop4Hnpo/lhYvmlq8nLFxyXG4gICAgICBwYWdlOjEsXHJcbiAgICAgIG1hdGNoTGlzdDpbXSxcclxuICAgICAgdG90YWw6MCxcclxuICAgICAgZGF0ZTogJycsXHJcbiAgICAgIHN0YXJ0OiAnJyxcclxuICAgICAgZW5kOicnLFxyXG4gICAgICBpc1Nob3dMZWFndWU6ZmFsc2UsXHJcbiAgICAgIGxlYWd1ZUZpbHRlOm51bGwsXHJcbiAgICAgIGxlYWd1ZWxpc3Q6W10sXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIG9wZW5MZWFndWUoKXtcclxuICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyog5omT5byA6Laz55CD5q+U6LWbICovXHJcbiAgICAgICAgb3Blbk1pbmkxKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4ZTBhNGM1YjlmODVmOWNmNScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOS4lueVjOadr+i2s+eQg+aDheaKpSAqL1xyXG4gICAgICAgIG9wZW5NaW5pMigpe1xyXG4gICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3gwYzJkNTFiN2I0MzM3YzNhJyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC5mb3JtSWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnN1Ym1pdOS6i+S7tu+8jOaQuuW4puaVsOaNruS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOiwg+aVtOWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICAgIHNldFNoYXJlQ29udGVudChtYXRjaCl7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGAke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSAgJHttYXRjaC5ob21lX3Njb3JlfS0ke21hdGNoLmF3YXlfc2NvcmV9ICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJpbmREYXRlQ2hhbmdlKGUpe1xyXG4gICAgICAgICAgdGhpcy5kYXRlID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmlLbol48gKi9cclxuICAgICAgICBjb2xsZWN0KGluZGV4LGlkKXtcclxuXHJcbiAgICAgICAgICBpZiggdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgICl7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzIC0tIDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPlua2iOaUtuiXj+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WFs+azqOS4rScsXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoQ29sbGVjdCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgKysgO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAgJ2xlYWd1ZS1jYW5jZWwnOiguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgICAgJ2xlYWd1ZS1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcmdzWzBdKTtcclxuICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmxlYWd1ZUZpbHRlID0gYXJnc1swXTtcclxuICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICB9LFxyXG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICBnZXRDbGFzc0xpc3QoKXtcclxuICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgIGlmKCB0aGlzLmxlYWd1ZUZpbHRlID09PSBudWxsICl7XHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgdHlwZSA6IDEsXHJcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcclxuICAgICAgICAgICAgZGF0ZTogdGhpcy5kYXRlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IHRoaXMuZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBsZWFndWVfaWQ6dGhpcy5sZWFndWVGaWx0ZS5qb2luKCcsJylcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hMaXN0LFxyXG4gICAgICAgICAgZGF0YTpkYXRhLFxyXG4gICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgdGhpcy50b3RhbCA9IHJlcy5kYXRhLmRhdGEubWV0YS50b3RhbDtcclxuICAgICAgICAgIGxpc3QubGVuZ3RoICYmIGxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgdmFsLm1hdGNoX3RpbWVfbWludXRlID0gdmFsLm1hdGNoX3RpbWUgJiYgdmFsLm1hdGNoX3RpbWUuc2xpY2UoMTAsMTYpO1xyXG4gICAgICAgICAgfSApXHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gdGhpcy5tYXRjaExpc3QuY29uY2F0KCByZXMuZGF0YS5kYXRhLmxpc3QgKTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlICsrIDtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgICBnZXRMZWF1Z2VMaXN0KCl7XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5sZWFndWVMaXN0LGRhdGE6e3R5cGUgOiAxLCBkYXRlOiB0aGlzLmRhdGV9LFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZ3VlbGlzdCA9IGxpc3Quc2xpY2UoMSwxMDApO1xyXG4gICAgICAgICAgICB0aGlzLmxlYWd1ZWxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICB2YWwuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAvKnRoaXMuZ2V0QmFubmVycygpOyovXHJcbiAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLnN0YXJ0ID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gNjA0ODAwMDAwKSk7XHJcbiAgICAgIHRoaXMuZW5kID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0TGVhdWdlTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAgKi9cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgLy8g5Yi35paw5a6M5ZCO5YGc5q2i5Yi35pawXHJcbiAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qIOS4iuaLieinpuW6lSAqL1xyXG4gICAgb25SZWFjaEJvdHRvbSgpe1xyXG4gICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0gKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAvKiB0b2RvOuiuvue9ruimgeWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICBjb25zb2xlLmxvZygyKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlQ29udGVudCxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==