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

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImRhdGEiLCJsZWFndWVGaWx0ZSIsInR5cGUiLCJwYWdlIiwiZGF0ZSIsImxlYWd1ZV9pZCIsImpvaW4iLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsImFwaVBhdGgiLCJtYXRjaExpc3QiLCJoZWFkZXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInRva2VuIiwidGhlbiIsImhpZGVMb2FkaW5nIiwibGlzdCIsInJlcyIsInRvdGFsIiwibWV0YSIsImxlbmd0aCIsImZvckVhY2giLCJ2YWwiLCJtYXRjaF90aW1lX21pbnV0ZSIsIm1hdGNoX3RpbWUiLCJzbGljZSIsImNvbmNhdCIsIiRhcHBseSIsImxlYWd1ZUxpc3QiLCJsZWFndWVsaXN0IiwiY2hlY2tlZCIsImdldE5vd0Zvcm1hdERhdGUiLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZW5kIiwiZ2V0Q2xhc3NMaXN0IiwiZ2V0TGVhdWdlTGlzdCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJpc1VwRnJhc2giLCJjb25zb2xlIiwibG9nIiwic2hhcmVDb250ZW50IiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb250YWN0IiwiQ29udGFjdCIsIkxlYXVnZSIsIm1peGlucyIsIm15TWl4aW4iLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiYmFubmVycyIsImNsYXNzTGlzdCIsImdhbWVMaXN0IiwiaXNTaG93TGVhZ3VlIiwiZm9ybUlkIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3BlbkxlYWd1ZSIsImdvdG9SZXN1bHQiLCJuYXZpZ2F0ZVRvIiwiZ290b0ZldHVyZSIsIm9wZW5NaW5pMSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwiZXh0cmFEYXRhIiwiZm9vIiwiZW52VmVyc2lvbiIsIm9wZW5NaW5pMiIsImZvcm1TdWJtaXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzZXRTaGFyZUNvbnRlbnQiLCJtYXRjaCIsImxlYWd1ZV9uYW1lIiwiaG9tZSIsImhvbWVfc2NvcmUiLCJhd2F5X3Njb3JlIiwiYXdheSIsImJpbmREYXRlQ2hhbmdlIiwiY29sbGVjdCIsImluZGV4IiwiaWQiLCJpc19jb2xsZWN0IiwibWF0Y2hDb2xsZWN0IiwibWV0aG9kIiwibWF0Y2hfaWQiLCJ0b3RhbEZvY3VzIiwiZm9ybV9pZCIsImV2ZW50cyIsIiRldmVudCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFIMkM7QUFDRjs7O0lBSXBCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3S25COztBQUVDOzttQ0FFYTtBQUFBOztBQUNaLFVBQUlDLE9BQU8sRUFBWDtBQUNDLFVBQUksS0FBS0MsV0FBTCxLQUFxQixJQUF6QixFQUErQjtBQUM5QkQsZUFBTztBQUNIRSxnQkFBTyxDQURKO0FBRUhDLGdCQUFNLEtBQUtBLElBRlI7QUFHSEMsZ0JBQU0sS0FBS0E7QUFIUixTQUFQO0FBTUEsT0FQRCxNQU9LO0FBQ0NKLGVBQU87QUFDQUUsZ0JBQU8sQ0FEUDtBQUVBQyxnQkFBTSxLQUFLQSxJQUZYO0FBR0FDLGdCQUFNLEtBQUtBLElBSFg7QUFJQUMscUJBQVUsS0FBS0osV0FBTCxDQUFpQkssSUFBakIsQ0FBc0IsR0FBdEI7QUFKVixTQUFQO0FBTUw7QUFDRkMsU0FBR0MsV0FBSCxDQUFlO0FBQ1BDLGVBQU87QUFEQSxPQUFmO0FBR0MsYUFBT0MsZUFBS0MsT0FBTCxDQUFhLEVBQUNDLEtBQUlD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Rk07QUFJVjFELGtCQUFRO0FBQ0wsa0NBQW9CLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEdkMsV0FKRSxFQUFiLEVBT0NDLElBUEQsQ0FPTyxlQUFPO0FBQ1ZaLGFBQUdhLFdBQUg7QUFDQSxpQkFBS04sU0FBTCxDQUFlc0YsS0FBZixFQUFzQkUsVUFBdEIsR0FBbUMsSUFBbkM7QUFDQSxpQkFBS0ksVUFBTDtBQUNBLGlCQUFLMUUsTUFBTDtBQUNBYSxrQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDSCxTQWJEO0FBY0g7QUFFRjtBQXRHSyxHO09BMEdWOEQsTSxHQUFTO0FBQ04scUJBQWdCLHdCQUFhO0FBQzFCLGFBQUtwQyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0gsS0FITTtBQUlOLG1CQUFlLHNCQUFhO0FBQzNCM0IsY0FBUUMsR0FBUjtBQUNBLGFBQUswQixZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsYUFBS3JFLElBQUwsR0FBWSxDQUFaO0FBQ0EsYUFBS1csU0FBTCxHQUFpQixFQUFqQjtBQUNBLGFBQUtiLFdBQUw7QUFDQSxhQUFLd0MsWUFBTDtBQUNELEtBWE07QUFZUCxrQkFBYyxxQkFBYTtBQUFBOztBQUN6QixVQUFJb0Usa0JBQWMsVUFBS3BGLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBb0IsY0FBUUMsR0FBUixDQUFlLE9BQUtnRSxLQUFwQixpQkFBcUNELE9BQU9FLElBQTVDLGNBQXlERixPQUFPRyxNQUFQLENBQWNGLEtBQXZFO0FBQ0QsS0FmTSxFOzs7a0JBckpVL0csSyIsImZpbGUiOiJyZXN1bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IExlYXVnZSBmcm9tICdAL2NvbXBvbmVudHMvbGVhdWdlJyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LWb5p6cJyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snICBcclxuICAgIH1cclxuXHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiTGVhdWdlXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcImxlYWd1ZWxpc3RcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3QsXHJcbiAgICAgIExlYXVnZVxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICBpbnRlcnZhbDogNTAwMCxcclxuICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgIGJhbm5lcnM6W10sXHJcbiAgICAgIGNsYXNzTGlzdDpbXSxcclxuICAgICAgZ2FtZUxpc3Q6WzEsMiwzLDQsNSw2LDcsOCw5LDIwLDMzLDMsMywzLDMsMyxdLFxyXG4gICAgICBpc1VwRnJhc2g6ZmFsc2UsXHJcbiAgICAgIHNoYXJlQ29udGVudDon5pe26Ze055yL5b6X6KeB56aP5YWL5pavJyxcclxuICAgICAgcGFnZToxLFxyXG4gICAgICBtYXRjaExpc3Q6W10sXHJcbiAgICAgIHRvdGFsOjAsXHJcbiAgICAgIGRhdGU6ICcnLFxyXG4gICAgICBzdGFydDogJycsXHJcbiAgICAgIGVuZDonJyxcclxuICAgICAgaXNTaG93TGVhZ3VlOmZhbHNlLFxyXG4gICAgICBsZWFndWVGaWx0ZTpudWxsLFxyXG4gICAgICBsZWFndWVsaXN0OltdLFxyXG4gICAgICBmb3JtSWQ6JycsXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIG9wZW5MZWFndWUoKXtcclxuICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyog5omT5byA6Laz55CD5q+U6LWbICovXHJcbiAgICAgICAgb3Blbk1pbmkxKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4ZTBhNGM1YjlmODVmOWNmNScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOS4lueVjOadr+i2s+eQg+aDheaKpSAqL1xyXG4gICAgICAgIG9wZW5NaW5pMigpe1xyXG4gICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3gwYzJkNTFiN2I0MzM3YzNhJyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUlkID0gZS5kZXRhaWwuZm9ybUlkO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZm9ybUlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm3lj5HnlJ/kuoZzdWJtaXTkuovku7bvvIzmkLrluKbmlbDmja7kuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDosIPmlbTliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgICBzZXRTaGFyZUNvbnRlbnQobWF0Y2gpe1xyXG4gICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBgJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gICR7bWF0Y2guaG9tZV9zY29yZX0tJHttYXRjaC5hd2F5X3Njb3JlfSAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kRGF0ZUNoYW5nZShlKXtcclxuICAgICAgICAgIHRoaXMuZGF0ZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICAgICAgIHRoaXMuZ2V0TGVhdWdlTGlzdCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyog5pS26JePICovXHJcbiAgICAgICAgY29sbGVjdChpbmRleCxpZCl7XHJcblxyXG4gICAgICAgICAgaWYoIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ICApe1xyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICflj5bmtojkuK0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hDb2xsZWN0LFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7bWF0Y2hfaWQgOiBpZH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyAtLSA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflj5bmtojmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICflhbPms6jkuK0nLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7bWF0Y2hfaWQgOiBpZCxcclxuICAgICAgICAgICAgICAgIGZvcm1faWQ6dGhpcy5mb3JtSWR9LFxyXG4gICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyArKyA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICAnbGVhZ3VlLWNhbmNlbCc6KC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgICAnbGVhZ3VlLWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3NbMF0pO1xyXG4gICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMubGVhZ3VlRmlsdGUgPSBhcmdzWzBdO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICAgLy8g6I635Y+W6K++56iL5YiX6KGoXHJcbiAgICBcclxuICAgIGdldENsYXNzTGlzdCgpe1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgaWYoIHRoaXMubGVhZ3VlRmlsdGUgPT09IG51bGwgKXtcclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0eXBlIDogMSxcclxuICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICAgICAgICBkYXRlOiB0aGlzLmRhdGVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogMSxcclxuICAgICAgICAgICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogdGhpcy5kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlYWd1ZV9pZDp0aGlzLmxlYWd1ZUZpbHRlLmpvaW4oJywnKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaExpc3QsXHJcbiAgICAgICAgICBkYXRhOmRhdGEsXHJcbiAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICB0aGlzLnRvdGFsID0gcmVzLmRhdGEuZGF0YS5tZXRhLnRvdGFsO1xyXG4gICAgICAgICAgbGlzdC5sZW5ndGggJiYgbGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICB2YWwubWF0Y2hfdGltZV9taW51dGUgPSB2YWwubWF0Y2hfdGltZSAmJiB2YWwubWF0Y2hfdGltZS5zbGljZSgxMCwxNik7XHJcbiAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSB0aGlzLm1hdGNoTGlzdC5jb25jYXQoIHJlcy5kYXRhLmRhdGEubGlzdCApO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgKysgO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgIGdldExlYXVnZUxpc3QoKXtcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLmxlYWd1ZUxpc3QsZGF0YTp7dHlwZSA6IDEsIGRhdGU6IHRoaXMuZGF0ZX0sXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgdGhpcy5sZWFndWVsaXN0ID0gbGlzdC5zbGljZSgxLDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZ3VlbGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHZhbC5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSApXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIC8qdGhpcy5nZXRCYW5uZXJzKCk7Ki9cclxuICAgICAgdGhpcy5kYXRlID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgLSA2MDQ4MDAwMDApKTtcclxuICAgICAgdGhpcy5lbmQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICAqL1xyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAvLyDliLfmlrDlrozlkI7lgZzmraLliLfmlrBcclxuICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyog5LiK5ouJ6Kem5bqVICovXHJcbiAgICBvblJlYWNoQm90dG9tKCl7XHJcbiAgICAgIHRoaXMuaXNVcEZyYXNoID0gdHJ1ZTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNVcEZyYXNoID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSApXHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICAgIC8qIHRvZG866K6+572u6KaB5YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgIGNvbnNvbGUubG9nKDIpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVDb250ZW50LFxyXG4gICAgICAgICAgcGF0aDogJy9wYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICBpbWFnZVVybDonL2ltYWdlcy9zaGFyZV9pbWcuanBnJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HlpLHotKVcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19