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
    leagueFilte: null
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/feature'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmUuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJkYXRhIiwibGVhZ3VlRmlsdGUiLCJ0eXBlIiwicGFnZSIsImRhdGUiLCJsZWFndWVfaWQiLCJqb2luIiwicmVxdWVzdCIsInVybCIsIm1hdGNoTGlzdCIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidG9rZW4iLCJ0aGVuIiwibGlzdCIsInJlcyIsInRvdGFsIiwibWV0YSIsImxlbmd0aCIsImZvckVhY2giLCJ2YWwiLCJtYXRjaF90aW1lX21pbnV0ZSIsIm1hdGNoX3RpbWUiLCJzbGljZSIsImNvbmNhdCIsIiRhcHBseSIsImxlYWd1ZUxpc3QiLCJsZWFndWVsaXN0IiwiY2hlY2tlZCIsImdldE5vd0Zvcm1hdERhdGUiLCJzdGFydCIsImVuZCIsIkRhdGUiLCJnZXRUaW1lIiwiZ2V0Q2xhc3NMaXN0IiwiZ2V0TGVhdWdlTGlzdCIsInd4Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImlzVXBGcmFzaCIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZSIsInNoYXJlQ29udGVudCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIkxlYXVnZSIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJiYW5uZXJzIiwiY2xhc3NMaXN0IiwiZ2FtZUxpc3QiLCJpc1Nob3dMZWFndWUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJvcGVuTGVhZ3VlIiwiZ290b1Jlc3VsdCIsIm5hdmlnYXRlVG8iLCJnb3RvRmV0dXJlIiwib3Blbk1pbmkxIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJleHRyYURhdGEiLCJmb28iLCJlbnZWZXJzaW9uIiwib3Blbk1pbmkyIiwiZm9ybVN1Ym1pdCIsImUiLCJkZXRhaWwiLCJmb3JtSWQiLCJ2YWx1ZSIsInNldFNoYXJlQ29udGVudCIsIm1hdGNoIiwibGVhZ3VlX25hbWUiLCJob21lIiwiaG9tZV9zY29yZSIsImF3YXlfc2NvcmUiLCJhd2F5IiwiYmluZERhdGVDaGFuZ2UiLCJjb2xsZWN0IiwiaW5kZXgiLCJpZCIsImlzX2NvbGxlY3QiLCJzaG93TG9hZGluZyIsIm1hdGNoQ29sbGVjdCIsIm1ldGhvZCIsIm1hdGNoX2lkIiwiaGlkZUxvYWRpbmciLCJ0b3RhbEZvY3VzIiwiZXZlbnRzIiwiJGV2ZW50IiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUgyQztBQUNGOzs7SUFJcEJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNLbkI7O0FBRUM7O21DQUVhO0FBQUE7O0FBQ1osVUFBSUMsT0FBTyxFQUFYO0FBQ0MsVUFBSSxLQUFLQyxXQUFMLEtBQXFCLElBQXpCLEVBQStCO0FBQzlCRCxlQUFPO0FBQ0hFLGdCQUFPLENBREo7QUFFSEMsZ0JBQU0sS0FBS0EsSUFGUjtBQUdIQyxnQkFBTSxLQUFLQTtBQUhSLFNBQVA7QUFNQSxPQVBELE1BT0s7QUFDQ0osZUFBTztBQUNBRSxnQkFBTyxDQURQO0FBRUFDLGdCQUFNLEtBQUtBLElBRlg7QUFHQUMsZ0JBQU0sS0FBS0EsSUFIWDtBQUlBQyxxQkFBVSxLQUFLSixXQUFMLENBQWlCSyxJQUFqQixDQUFzQixHQUF0QjtBQUpWLFNBQVA7QUFNTDtBQUNGO0FBQ0E7QUFDQTtBQUNDLGFBQU8sZUFBS0MsT0FBTCxDQUFhLEVBQUNDLEtBQUksaUJBQVFDLFNBQWI7QUFDakJULGNBQUtBLElBRFk7QUFFakJVLGdCQUFRO0FBQ0osZ0NBQW9CLEtBQUtDLE9BQUwsQ0FBYUMsVUFB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TUFBTDtBQUNBYyxrQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDSCxTQVpEO0FBYUg7QUFFRjtBQXBHSyxHO09Bd0dWOEQsTSxHQUFTO0FBQ04scUJBQWdCLHdCQUFhO0FBQzFCLGFBQUtyQyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0gsS0FITTs7QUFLUCxtQkFBZSxzQkFBYTtBQUMxQjFCLGNBQVFDLEdBQVI7QUFDQSxhQUFLeUIsWUFBTCxHQUFvQixLQUFwQjtBQUNBLGFBQUsvRCxJQUFMLEdBQVksQ0FBWjtBQUNBLGFBQUtNLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxhQUFLUixXQUFMO0FBQ0EsYUFBS2tDLFlBQUw7QUFDRCxLQVpNO0FBYVAsa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSXFFLGtCQUFjLFVBQUtyRixNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQXFCLGNBQVFDLEdBQVIsQ0FBZSxPQUFLZ0UsS0FBcEIsaUJBQXFDRCxPQUFPRSxJQUE1QyxjQUF5REYsT0FBT0csTUFBUCxDQUFjRixLQUF2RTtBQUNELEtBaEJNLEU7OztrQkFsSlUxRyxLIiwiZmlsZSI6ImZlYXR1cmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IExlYXVnZSBmcm9tICdAL2NvbXBvbmVudHMvbGVhdWdlJyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LWb56iLJyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snICBcclxuICAgIH1cclxuXHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiTGVhdWdlXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcImxlYWd1ZWxpc3RcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3QsXHJcbiAgICAgIExlYXVnZTpMZWF1Z2VcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICBiYW5uZXJzOltdLFxyXG4gICAgICBjbGFzc0xpc3Q6W10sXHJcbiAgICAgIGdhbWVMaXN0OlsxLDIsMyw0LDUsNiw3LDgsOSwyMCwzMywzLDMsMywzLDMsXSxcclxuICAgICAgaXNVcEZyYXNoOmZhbHNlLFxyXG4gICAgICBzaGFyZUNvbnRlbnQ6J+aXtumXtOeci+W+l+ingeemj+WFi+aWrycsXHJcbiAgICAgIHBhZ2U6MSxcclxuICAgICAgbWF0Y2hMaXN0OltdLFxyXG4gICAgICB0b3RhbDowLFxyXG4gICAgICBkYXRlOiAnJyxcclxuICAgICAgc3RhcnQ6ICcnLFxyXG4gICAgICBlbmQ6JycsXHJcbiAgICAgIGxlYWd1ZWxpc3Q6W10sXHJcbiAgICAgIGlzU2hvd0xlYWd1ZTpmYWxzZSxcclxuICAgICAgbGVhZ3VlRmlsdGU6bnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBvcGVuTGVhZ3VlKCl7XHJcbiAgICAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b1Jlc3VsdCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9yZXN1bHRgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZldHVyZSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mZWF0dXJlYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qIOaJk+W8gOi2s+eQg+avlOi1myAqL1xyXG4gICAgICAgIG9wZW5NaW5pMSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eGUwYTRjNWI5Zjg1ZjljZjUnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDkuJbnlYzmna/otrPnkIPmg4XmiqUgKi9cclxuICAgICAgICBvcGVuTWluaTIoKXtcclxuICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4MGMyZDUxYjdiNDMzN2MzYScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZm9ybUlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm3lj5HnlJ/kuoZzdWJtaXTkuovku7bvvIzmkLrluKbmlbDmja7kuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDosIPmlbTliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgICBzZXRTaGFyZUNvbnRlbnQobWF0Y2gpe1xyXG4gICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBgJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gICR7bWF0Y2guaG9tZV9zY29yZX0tJHttYXRjaC5hd2F5X3Njb3JlfSAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kRGF0ZUNoYW5nZShlKXtcclxuICAgICAgICAgIHRoaXMuZGF0ZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmlLbol48gKi9cclxuICAgICAgICBjb2xsZWN0KGluZGV4LGlkKXtcclxuXHJcbiAgICAgICAgICBpZiggdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgICl7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzIC0tIDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPlua2iOaUtuiXj+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WFs+azqOS4rScsXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoQ29sbGVjdCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgKysgO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAgJ2xlYWd1ZS1jYW5jZWwnOiguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgICBcclxuICAgICAgJ2xlYWd1ZS1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcmdzWzBdKTtcclxuICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmxlYWd1ZUZpbHRlID0gYXJnc1swXTtcclxuICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICB9LFxyXG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICBnZXRDbGFzc0xpc3QoKXtcclxuICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgIGlmKCB0aGlzLmxlYWd1ZUZpbHRlID09PSBudWxsICl7XHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgdHlwZSA6IDIsXHJcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcclxuICAgICAgICAgICAgZGF0ZTogdGhpcy5kYXRlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IHRoaXMuZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBsZWFndWVfaWQ6dGhpcy5sZWFndWVGaWx0ZS5qb2luKCcsJylcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICAgICAvLyB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgIC8vICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAvLyAgICAgICB9KVxyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hMaXN0LFxyXG4gICAgICAgICAgZGF0YTpkYXRhLFxyXG4gICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgLy8gd3guaGlkZUxvYWRpbmcoKTtcclxuXHJcbiAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgIHRoaXMudG90YWwgPSByZXMuZGF0YS5kYXRhLm1ldGEudG90YWw7XHJcbiAgICAgICAgICBsaXN0Lmxlbmd0aCAmJiBsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcblxyXG4gICAgICAgICAgICB2YWwubWF0Y2hfdGltZV9taW51dGUgPSB2YWwubWF0Y2hfdGltZSAmJiB2YWwubWF0Y2hfdGltZS5zbGljZSgxMCwxNik7XHJcbiAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSB0aGlzLm1hdGNoTGlzdC5jb25jYXQoIHJlcy5kYXRhLmRhdGEubGlzdCApO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgKysgO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVhdWdlTGlzdCgpe1xyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubGVhZ3VlTGlzdCxkYXRhOnt0eXBlIDogMiwgZGF0ZTogdGhpcy5kYXRlfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLmxlYWd1ZWxpc3QgPSBsaXN0LnNsaWNlKDEsMTAwKTtcclxuICAgICAgICAgICAgdGhpcy5sZWFndWVsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIC8qdGhpcy5nZXRCYW5uZXJzKCk7Ki9cclxuICAgICAgdGhpcy5kYXRlID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5lbmQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyA2MDQ4MDAwMDApKTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAgKi9cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgLy8g5Yi35paw5a6M5ZCO5YGc5q2i5Yi35pawXHJcbiAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qIOS4iuaLieinpuW6lSAqL1xyXG4gICAgb25SZWFjaEJvdHRvbSgpe1xyXG4gICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0gKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAvKiB0b2RvOuiuvue9ruimgeWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICBjb25zb2xlLmxvZygyKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlQ29udGVudCxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==