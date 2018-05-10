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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/feature'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmUuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJkYXRhIiwibGVhZ3VlRmlsdGUiLCJ0eXBlIiwicGFnZSIsImRhdGUiLCJsZWFndWVfaWQiLCJqb2luIiwicmVxdWVzdCIsInVybCIsIm1hdGNoTGlzdCIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidG9rZW4iLCJ0aGVuIiwibGlzdCIsInJlcyIsInRvdGFsIiwibWV0YSIsImxlbmd0aCIsImZvckVhY2giLCJ2YWwiLCJtYXRjaF90aW1lX21pbnV0ZSIsIm1hdGNoX3RpbWUiLCJzbGljZSIsImNvbmNhdCIsIiRhcHBseSIsImxlYWd1ZUxpc3QiLCJsZWFndWVsaXN0IiwiY2hlY2tlZCIsImdldE5vd0Zvcm1hdERhdGUiLCJzdGFydCIsImVuZCIsIkRhdGUiLCJnZXRUaW1lIiwiZ2V0Q2xhc3NMaXN0IiwiZ2V0TGVhdWdlTGlzdCIsInd4Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImlzVXBGcmFzaCIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZSIsInNoYXJlQ29udGVudCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIkxlYXVnZSIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJiYW5uZXJzIiwiY2xhc3NMaXN0IiwiZ2FtZUxpc3QiLCJpc1Nob3dMZWFndWUiLCJmb3JtSWQiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJvcGVuTGVhZ3VlIiwiZ290b1Jlc3VsdCIsIm5hdmlnYXRlVG8iLCJnb3RvRmV0dXJlIiwib3Blbk1pbmkxIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJleHRyYURhdGEiLCJmb28iLCJlbnZWZXJzaW9uIiwib3Blbk1pbmkyIiwiZm9ybVN1Ym1pdCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInNldFNoYXJlQ29udGVudCIsIm1hdGNoIiwibGVhZ3VlX25hbWUiLCJob21lIiwiaG9tZV9zY29yZSIsImF3YXlfc2NvcmUiLCJhd2F5IiwiYmluZERhdGVDaGFuZ2UiLCJjb2xsZWN0IiwiaW5kZXgiLCJpZCIsImlzX2NvbGxlY3QiLCJzaG93TG9hZGluZyIsIm1hdGNoQ29sbGVjdCIsIm1ldGhvZCIsIm1hdGNoX2lkIiwiaGlkZUxvYWRpbmciLCJ0b3RhbEZvY3VzIiwiZm9ybV9pZCIsImV2ZW50cyIsIiRldmVudCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFIMkM7QUFDRjs7O0lBSXBCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5S25COztBQUVDOzttQ0FFYTtBQUFBOztBQUNaLFVBQUlDLE9BQU8sRUFBWDtBQUNDLFVBQUksS0FBS0MsV0FBTCxLQUFxQixJQUF6QixFQUErQjtBQUM5QkQsZUFBTztBQUNIRSxnQkFBTyxDQURKO0FBRUhDLGdCQUFNLEtBQUtBLElBRlI7QUFHSEMsZ0JBQU0sS0FBS0E7QUFIUixTQUFQO0FBTUEsT0FQRCxNQU9LO0FBQ0NKLGVBQU87QUFDQUUsZ0JBQU8sQ0FEUDtBQUVBQyxnQkFBTSxLQUFLQSxJQUZYO0FBR0FDLGdCQUFNLEtBQUtBLElBSFg7QUFJQUMscUJBQVUsS0FBS0osV0FBTCxDQUFpQkssSUFBakIsQ0FBc0IsR0FBdEI7QUFKVixTQUFQO0FBTUw7QUFDRjtBQUNBO0FBQ0E7QUFDQyxhQUFPLGVBQUtDLE9BQUwsQ0FBYSxFQUFDQyxLQUFJLGlCQUFRQyxTQUFiO0FBQ2pCVCxjQUFLQSxJQURZO0FBRWpCVSxnQkFBUTtBQUNKLGdDQUFvQixLQUFLQyxPQUFM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QixhQUFHZ0UsV0FBSDtBQUNBLGlCQUFLNUYsU0FBTCxDQUFlcUYsS0FBZixFQUFzQkUsVUFBdEIsR0FBbUMsSUFBbkM7QUFDQSxpQkFBS00sVUFBTDtBQUNBLGlCQUFLNUUsTUFBTDtBQUNBYyxrQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDSCxTQWJEO0FBY0g7QUFFRjtBQXRHSyxHO09BMEdWK0QsTSxHQUFTO0FBQ04scUJBQWdCLHdCQUFhO0FBQzFCLGFBQUt0QyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0gsS0FITTs7QUFLUCxtQkFBZSxzQkFBYTtBQUMxQjFCLGNBQVFDLEdBQVI7QUFDQSxhQUFLeUIsWUFBTCxHQUFvQixLQUFwQjtBQUNBLGFBQUsvRCxJQUFMLEdBQVksQ0FBWjtBQUNBLGFBQUtNLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxhQUFLUixXQUFMO0FBQ0EsYUFBS2tDLFlBQUw7QUFDRCxLQVpNO0FBYVAsa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSXNFLGtCQUFjLFVBQUt0RixNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQXFCLGNBQVFDLEdBQVIsQ0FBZSxPQUFLaUUsS0FBcEIsaUJBQXFDRCxPQUFPRSxJQUE1QyxjQUF5REYsT0FBT0csTUFBUCxDQUFjRixLQUF2RTtBQUNELEtBaEJNLEU7OztrQkFySlUzRyxLIiwiZmlsZSI6ImZlYXR1cmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IExlYXVnZSBmcm9tICdAL2NvbXBvbmVudHMvbGVhdWdlJyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LWb56iLJyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snICBcclxuICAgIH1cclxuXHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiTGVhdWdlXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcImxlYWd1ZWxpc3RcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3QsXHJcbiAgICAgIExlYXVnZTpMZWF1Z2VcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICBiYW5uZXJzOltdLFxyXG4gICAgICBjbGFzc0xpc3Q6W10sXHJcbiAgICAgIGdhbWVMaXN0OlsxLDIsMyw0LDUsNiw3LDgsOSwyMCwzMywzLDMsMywzLDMsXSxcclxuICAgICAgaXNVcEZyYXNoOmZhbHNlLFxyXG4gICAgICBzaGFyZUNvbnRlbnQ6J+aXtumXtOeci+W+l+ingeemj+WFi+aWrycsXHJcbiAgICAgIHBhZ2U6MSxcclxuICAgICAgbWF0Y2hMaXN0OltdLFxyXG4gICAgICB0b3RhbDowLFxyXG4gICAgICBkYXRlOiAnJyxcclxuICAgICAgc3RhcnQ6ICcnLFxyXG4gICAgICBlbmQ6JycsXHJcbiAgICAgIGxlYWd1ZWxpc3Q6W10sXHJcbiAgICAgIGlzU2hvd0xlYWd1ZTpmYWxzZSxcclxuICAgICAgbGVhZ3VlRmlsdGU6bnVsbCxcclxuICAgICAgZm9ybUlkOicnXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIG9wZW5MZWFndWUoKXtcclxuICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyog5omT5byA6Laz55CD5q+U6LWbICovXHJcbiAgICAgICAgb3Blbk1pbmkxKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4ZTBhNGM1YjlmODVmOWNmNScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOS4lueVjOadr+i2s+eQg+aDheaKpSAqL1xyXG4gICAgICAgIG9wZW5NaW5pMigpe1xyXG4gICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3gwYzJkNTFiN2I0MzM3YzNhJyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICB0aGlzLmZvcm1JZCA9IGUuZGV0YWlsLmZvcm1JZDtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLmZvcm1JZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3Jt5Y+R55Sf5LqGc3VibWl05LqL5Lu277yM5pC65bim5pWw5o2u5Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog6LCD5pW05YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgICAgc2V0U2hhcmVDb250ZW50KG1hdGNoKXtcclxuICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYCR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9ICAke21hdGNoLmhvbWVfc2NvcmV9LSR7bWF0Y2guYXdheV9zY29yZX0gJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmluZERhdGVDaGFuZ2UoZSl7XHJcbiAgICAgICAgICB0aGlzLmRhdGUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IFtdO1xyXG4gICAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgICAgIHRoaXMuZ2V0TGVhdWdlTGlzdCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyog5pS26JePICovXHJcbiAgICAgICAgY29sbGVjdChpbmRleCxpZCl7XHJcblxyXG4gICAgICAgICAgaWYoIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ICApe1xyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICflj5bmtojkuK0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hDb2xsZWN0LFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7bWF0Y2hfaWQgOiBpZH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyAtLSA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflj5bmtojmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICflhbPms6jkuK0nLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7bWF0Y2hfaWQgOiBpZCxcclxuICAgICAgICAgICAgICAgIGZvcm1faWQ6dGhpcy5mb3JtSWR9LFxyXG4gICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyArKyA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICAnbGVhZ3VlLWNhbmNlbCc6KC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgIFxyXG4gICAgICAnbGVhZ3VlLWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3NbMF0pO1xyXG4gICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMubGVhZ3VlRmlsdGUgPSBhcmdzWzBdO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICBnZXRDbGFzc0xpc3QoKXtcclxuICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgIGlmKCB0aGlzLmxlYWd1ZUZpbHRlID09PSBudWxsICl7XHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgdHlwZSA6IDIsXHJcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcclxuICAgICAgICAgICAgZGF0ZTogdGhpcy5kYXRlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IHRoaXMuZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBsZWFndWVfaWQ6dGhpcy5sZWFndWVGaWx0ZS5qb2luKCcsJylcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICAgICAvLyB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgIC8vICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAvLyAgICAgICB9KVxyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hMaXN0LFxyXG4gICAgICAgICAgZGF0YTpkYXRhLFxyXG4gICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgLy8gd3guaGlkZUxvYWRpbmcoKTtcclxuXHJcbiAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgIHRoaXMudG90YWwgPSByZXMuZGF0YS5kYXRhLm1ldGEudG90YWw7XHJcbiAgICAgICAgICBsaXN0Lmxlbmd0aCAmJiBsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcblxyXG4gICAgICAgICAgICB2YWwubWF0Y2hfdGltZV9taW51dGUgPSB2YWwubWF0Y2hfdGltZSAmJiB2YWwubWF0Y2hfdGltZS5zbGljZSgxMCwxNik7XHJcbiAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSB0aGlzLm1hdGNoTGlzdC5jb25jYXQoIHJlcy5kYXRhLmRhdGEubGlzdCApO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgKysgO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVhdWdlTGlzdCgpe1xyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubGVhZ3VlTGlzdCxkYXRhOnt0eXBlIDogMiwgZGF0ZTogdGhpcy5kYXRlfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLmxlYWd1ZWxpc3QgPSBsaXN0LnNsaWNlKDEsMTAwKTtcclxuICAgICAgICAgICAgdGhpcy5sZWFndWVsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIC8qdGhpcy5nZXRCYW5uZXJzKCk7Ki9cclxuICAgICAgdGhpcy5kYXRlID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5lbmQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyA2MDQ4MDAwMDApKTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAgKi9cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgLy8g5Yi35paw5a6M5ZCO5YGc5q2i5Yi35pawXHJcbiAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qIOS4iuaLieinpuW6lSAqL1xyXG4gICAgb25SZWFjaEJvdHRvbSgpe1xyXG4gICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0gKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAvKiB0b2RvOuiuvue9ruimgeWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICBjb25zb2xlLmxvZygyKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlQ29udGVudCxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==