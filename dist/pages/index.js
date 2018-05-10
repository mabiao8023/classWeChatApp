'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _contact = require('./../components/contact.js');

var _contact2 = _interopRequireDefault(_contact);

var _focus = require('./../components/focus.js');

var _focus2 = _interopRequireDefault(_focus);

var _leauge = require('./../components/leauge.js');

var _leauge2 = _interopRequireDefault(_leauge);

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
// alias example
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

    // 收藏比赛


    // 获取课程列表

    value: function getClassList() {
      var _this2 = this;

      var data = {};
      if (this.leagueFilte === null) {
        data = {
          type: 0,
          page: this.page,
          date: this.date
        };
      } else {
        data = {
          type: 0,
          page: this.page,
          date: this.date,
          league_id: this.leagueFilte.join(',')
        };
      }
      return _wepy2.default.request({ url: _config2.default.matchList,
        data: data,
        header: {
          'Authorization': '' + this.$parent.globalData.token
        } }).then(function (res) {
        var list = res.data.data.list;
        list.length && list.forEach(function (val) {
          val.match_time_minute = val.match_time && val.match_time.slice(10, 16);
        });
        _this2.matchList = _this2.matchList.concat(res.data.data.list);
        _this2.page++;
        _this2.$apply();
      }).catch(function (e) {
        // this.getClassList();
        // this.getLeaugeList();
        // this.getFocusTotal();
      });
    }
  }, {
    key: 'getLeaugeList',
    value: function getLeaugeList() {
      var _this3 = this;

      return _wepy2.default.request({ url: _config2.default.leagueList, data: { type: 0, date: this.getNowFormatDate() },
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
    key: 'getFocusTotal',
    value: function getFocusTotal() {
      var _this4 = this;

      return _wepy2.default.request({ url: _config2.default.focusList, data: { page: this.page },
        header: {
          'Authorization': '' + this.$parent.globalData.token
        } }).then(function (res) {
        var list = res.data.data.list;
        _this4.totalFocus = res.data.data.meta.total;
        _this4.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      /*this.getBanners();*/
      this.date = this.getNowFormatDate();
      this.getClassList();
      this.getLeaugeList();
      this.getFocusTotal();
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
      var _this5 = this;

      this.isUpFrash = true;
      this.getClassList().then(function (res) {
        _this5.isUpFrash = false;
        _this5.$apply();
      });
      console.log("上拉触底了");
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      /* todo:设置要分享的内容 */
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
  var _this7 = this;

  this.config = {
    navigationBarTitleText: '即时比分',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black'
  };
  this.$repeat = {};
  this.$props = { "Leauge": { "xmlns:v-bind": "", "v-bind:list.sync": "leaguelist" } };
  this.$events = {};
  this.components = {
    contact: _contact2.default,
    footer: _footer2.default,
    Leauge: _leauge2.default,
    Focus: _focus2.default
  };
  this.mixins = [_test2.default];
  this.data = {
    /* 0 -> 即时  1 -> 赛果  2 -> 赛程  3 -> 关注*/
    type: 0,
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
    matchList: [],
    leaguelist: [],
    isShowLeague: false,
    leagueFilte: null,
    date: '',
    formId: ''
  };
  this.computed = {};
  this.methods = {
    openLeague: function openLeague() {
      this.isShowLeague = true;
    },
    scGame: function scGame() {
      this.isScGame = !this.isScGame;
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
      this.formId = e.detail.formId;
      // console.log(e);
      console.log(e.detail.formId);
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
    },

    /* 调整分享的内容 */
    setShareContent: function setShareContent(match) {
      if (match.status == 1 || match.status == 2 || match.status == 3 || match.status == 4) {
        this.shareContent = '\u8FDB\u884C\u4E2D\uFF1A' + match.league_name + '  ' + match.home + '  ' + match.home_score + '-' + match.away_score + ' ' + match.away;
      } else if (match.status == -1) {
        this.shareContent = match.league_name + ' ' + match.match_time.slice(0, match.match_time.length - 3) + ' ' + match.home + '  ' + match.home_score + '-' + match.away_score + ' ' + match.away;
      } else if (match.status == 0) {
        this.shareContent = match.league_name + ' ' + match.match_time.slice(0, match.match_time.length - 3) + ' ' + match.home + ' vs ' + match.away;
      } else if (match.status == -10) {
        this.shareContent = '\u6BD4\u8D5B\u53D6\u6D88\uFF1A' + match.league_name + ' ' + match.match_time.slice(0, match.match_time.length - 3) + ' ' + match.home + ' vs ' + match.away;
      } else if (match.status == -11) {
        this.shareContent = '\u6BD4\u8D5B\u5F85\u5B9A\uFF1A' + match.league_name + ' ' + match.match_time.slice(0, match.match_time.length - 3) + ' ' + match.home + ' vs ' + match.away;
      } else if (match.status == -12) {
        this.shareContent = '\u6BD4\u8D5B\u8170\u65A9\uFF1A' + match.league_name + ' ' + match.match_time.slice(0, match.match_time.length - 3) + ' ' + match.home + ' vs ' + match.away;
      } else if (match.status == -13) {
        this.shareContent = '\u6BD4\u8D5B\u4E2D\u65AD\uFF1A' + match.league_name + ' ' + match.match_time.slice(0, match.match_time.length - 3) + ' ' + match.home + ' vs ' + match.away;
      } else if (match.status == -14) {
        this.shareContent = '\u6BD4\u8D5B\u63A8\u8FDF\uFF1A' + match.league_name + ' ' + match.match_time.slice(0, match.match_time.length - 3) + ' ' + match.home + ' vs ' + match.away;
      }
    },


    /* 收藏 */
    collect: function collect(index, id) {
      var _this6 = this;

      if (this.matchList[index].is_collect) {
        wx.showLoading({
          title: '取消中'
        });
        _wepy2.default.request({ url: _config2.default.matchCollect,
          method: 'DELETE',
          data: { match_id: id },
          header: {
            'Authorization': '' + this.$parent.globalData.token,
            'content-type': 'application/json'
          } }).then(function (res) {
          wx.hideLoading();
          _this6.matchList[index].is_collect = false;
          _this6.totalFocus--;
          _this6.$apply();
          console.log('取消收藏成功');
        });
      } else {
        wx.showLoading({
          title: '关注中'
        });
        _wepy2.default.request({ url: _config2.default.matchCollect,
          method: 'POST',
          data: {
            match_id: id,
            form_id: this.formId
          },
          header: {
            'Authorization': '' + this.$parent.globalData.token,
            'content-type': 'application/json'
          } }).then(function (res) {
          wx.hideLoading();
          _this6.matchList[index].is_collect = true;
          _this6.totalFocus++;
          _this6.$apply();
          console.log('收藏成功');
        });
      }
    }
  };
  this.events = {
    'league-cancel': function leagueCancel() {
      _this7.isShowLeague = false;
    },
    'league-emit': function leagueEmit() {
      console.log(arguments.length <= 0 ? undefined : arguments[0]);
      _this7.isShowLeague = false;
      _this7.page = 1;
      _this7.matchList = [];
      _this7.leagueFilte = arguments.length <= 0 ? undefined : arguments[0];
      _this7.getClassList();
    },
    'index-emit': function indexEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this7.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    } };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsImxlYWd1ZUZpbHRlIiwidHlwZSIsInBhZ2UiLCJkYXRlIiwibGVhZ3VlX2lkIiwiam9pbiIsInJlcXVlc3QiLCJ1cmwiLCJtYXRjaExpc3QiLCJoZWFkZXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInRva2VuIiwidGhlbiIsImxpc3QiLCJyZXMiLCJsZW5ndGgiLCJmb3JFYWNoIiwidmFsIiwibWF0Y2hfdGltZV9taW51dGUiLCJtYXRjaF90aW1lIiwic2xpY2UiLCJjb25jYXQiLCIkYXBwbHkiLCJjYXRjaCIsImxlYWd1ZUxpc3QiLCJnZXROb3dGb3JtYXREYXRlIiwibGVhZ3VlbGlzdCIsImNoZWNrZWQiLCJmb2N1c0xpc3QiLCJ0b3RhbEZvY3VzIiwibWV0YSIsInRvdGFsIiwiZ2V0Q2xhc3NMaXN0IiwiZ2V0TGVhdWdlTGlzdCIsImdldEZvY3VzVG90YWwiLCJ3eCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJpc1VwRnJhc2giLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJzaGFyZUNvbnRlbnQiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJmb290ZXIiLCJMZWF1Z2UiLCJGb2N1cyIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJiYW5uZXJzIiwiY2xhc3NMaXN0IiwiZ2FtZUxpc3QiLCJpc1NjR2FtZSIsImlzU2hvd0xlYWd1ZSIsImZvcm1JZCIsImNvbXB1dGVkIiwibWV0aG9kcyIsIm9wZW5MZWFndWUiLCJzY0dhbWUiLCJnb3RvSW5kZXgiLCJuYXZpZ2F0ZVRvIiwiZ290b1Jlc3VsdCIsImdvdG9GZXR1cmUiLCJnb3RvRm9jdXMiLCJvcGVuTWluaTEiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsImV4dHJhRGF0YSIsImZvbyIsImVudlZlcnNpb24iLCJvcGVuTWluaTIiLCJmb3JtU3VibWl0IiwiZSIsImRldGFpbCIsInZhbHVlIiwic2V0U2hhcmVDb250ZW50IiwibWF0Y2giLCJzdGF0dXMiLCJsZWFndWVfbmFtZSIsImhvbWUiLCJob21lX3Njb3JlIiwiYXdheV9zY29yZSIsImF3YXkiLCJjb2xsZWN0IiwiaW5kZXgiLCJpZCIsImlzX2NvbGxlY3QiLCJzaG93TG9hZGluZyIsIm1hdGNoQ29sbGVjdCIsIm1ldGhvZCIsIm1hdGNoX2lkIiwiaGlkZUxvYWRpbmciLCJmb3JtX2lkIiwiZXZlbnRzIiwiJGV2ZW50IiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFMMkM7QUFDSjtBQUNFO0FBQ0E7OztJQUlwQkEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvTW5COzs7QUFHQTs7bUNBRWU7QUFBQTs7QUFDYixVQUFJQyxPQUFPLEVBQVg7QUFDQyxVQUFJLEtBQUtDLFdBQUwsS0FBcUIsSUFBekIsRUFBK0I7QUFDOUJELGVBQU87QUFDSEUsZ0JBQU8sQ0FESjtBQUVIQyxnQkFBTSxLQUFLQSxJQUZSO0FBR0hDLGdCQUFNLEtBQUtBO0FBSFIsU0FBUDtBQU1BLE9BUEQsTUFPSztBQUNDSixlQUFPO0FBQ0FFLGdCQUFPLENBRFA7QUFFQUMsZ0JBQU0sS0FBS0EsSUFGWDtBQUdBQyxnQkFBTSxLQUFLQSxJQUhYO0FBSUFDLHFCQUFVLEtBQUtKLFdBQUwsQ0FBaUJLLElBQWpCLENBQXNCLEdBQXRCO0FBSlYsU0FBUDtBQU1MO0FBQ0QsYUFBTyxlQUFLQyxPQUFMLENBQWEsRUFBQ0MsS0FB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d2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IEZvY3VzIGZyb20gJ0AvY29tcG9uZW50cy9mb2N1cycgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBMZWF1Z2UgZnJvbSAnQC9jb21wb25lbnRzL2xlYXVnZScgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBGb290ZXIgZnJvbSAnQC9jb21wb25lbnRzL2Zvb3RlcicgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WNs+aXtuavlOWIhicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJMZWF1Z2VcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwibGVhZ3VlbGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdCxcclxuICAgICAgZm9vdGVyOkZvb3RlcixcclxuICAgICAgTGVhdWdlLFxyXG4gICAgICBGb2N1c1xyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIC8qIDAgLT4g5Y2z5pe2ICAxIC0+IOi1m+aenCAgMiAtPiDotZvnqIsgIDMgLT4g5YWz5rOoKi9cclxuICAgICAgdHlwZTogMCwgIFxyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICBiYW5uZXJzOltdLFxyXG4gICAgICBjbGFzc0xpc3Q6W10sXHJcbiAgICAgIGdhbWVMaXN0OlsxLDIsMyw0LDUsNiw3LDgsOSwyMCwzMywzLDMsMywzLDMsXSxcclxuICAgICAgaXNVcEZyYXNoOmZhbHNlLFxyXG4gICAgICBzaGFyZUNvbnRlbnQ6J+aXtumXtOeci+W+l+ingeemj+WFi+aWrycsXHJcbiAgICAgIGlzU2NHYW1lOiB0cnVlLFxyXG4gICAgICB0b3RhbEZvY3VzOiAwLFxyXG4gICAgICBwYWdlOjEsXHJcbiAgICAgIG1hdGNoTGlzdDpbXSxcclxuICAgICAgbGVhZ3VlbGlzdDpbXSxcclxuICAgICAgaXNTaG93TGVhZ3VlOmZhbHNlLFxyXG4gICAgICBsZWFndWVGaWx0ZTpudWxsLFxyXG4gICAgICBkYXRlOiAnJyxcclxuICAgICAgZm9ybUlkOicnLFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIG9wZW5MZWFndWUoKXtcclxuICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY0dhbWUoKXtcclxuICAgICAgICAgIHRoaXMuaXNTY0dhbWUgPSAhdGhpcy5pc1NjR2FtZTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdvdG9JbmRleCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9pbmRleGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZvY3VzKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZvY3VzYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qIOaJk+W8gOi2s+eQg+avlOi1myAqL1xyXG4gICAgICAgIG9wZW5NaW5pMSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eGUwYTRjNWI5Zjg1ZjljZjUnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDkuJbnlYzmna/otrPnkIPmg4XmiqUgKi9cclxuICAgICAgICBvcGVuTWluaTIoKXtcclxuICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4MGMyZDUxYjdiNDMzN2MzYScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1JZCA9IGUuZGV0YWlsLmZvcm1JZDtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLmZvcm1JZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3Jt5Y+R55Sf5LqGc3VibWl05LqL5Lu277yM5pC65bim5pWw5o2u5Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog6LCD5pW05YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgICAgc2V0U2hhcmVDb250ZW50KCBtYXRjaCApe1xyXG4gICAgICAgICAgaWYoIG1hdGNoLnN0YXR1cyA9PSAxIHx8IG1hdGNoLnN0YXR1cyA9PSAyIHx8IG1hdGNoLnN0YXR1cyA9PSAzIHx8IG1hdGNoLnN0YXR1cyA9PSA0ICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg6L+b6KGM5Lit77yaJHttYXRjaC5sZWFndWVfbmFtZX0gICR7bWF0Y2guaG9tZX0gICR7bWF0Y2guaG9tZV9zY29yZX0tJHttYXRjaC5hd2F5X3Njb3JlfSAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGAke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSAgJHttYXRjaC5ob21lX3Njb3JlfS0ke21hdGNoLmF3YXlfc2NvcmV9ICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAwICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBgJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMCApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+WPlua2iO+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTEgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvlvoXlrprvvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEyICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg5q+U6LWb6IWw5pap77yaJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMyApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+S4reaWre+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTQgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvmjqjov5/vvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDmlLbol48gKi9cclxuICAgICAgICBjb2xsZWN0KGluZGV4LGlkKXtcclxuXHJcbiAgICAgICAgICBpZiggdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgICl7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgLS0gO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Y+W5raI5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5YWz5rOo5LitJyxcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hDb2xsZWN0LFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICBtYXRjaF9pZCA6IGlkLFxyXG4gICAgICAgICAgICAgICAgICBmb3JtX2lkOnRoaXMuZm9ybUlkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YCxcclxuICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzICsrIDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aUtuiXj+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAnbGVhZ3VlLWNhbmNlbCc6KC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgICdsZWFndWUtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJnc1swXSk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5sZWFndWVGaWx0ZSA9IGFyZ3NbMF07XHJcbiAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgfSxcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOaUtuiXj+avlOi1m1xyXG5cclxuXHJcbiAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgZ2V0Q2xhc3NMaXN0KCApe1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgaWYoIHRoaXMubGVhZ3VlRmlsdGUgPT09IG51bGwgKXtcclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0eXBlIDogMCxcclxuICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICAgICAgICBkYXRlOiB0aGlzLmRhdGVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogdGhpcy5kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlYWd1ZV9pZDp0aGlzLmxlYWd1ZUZpbHRlLmpvaW4oJywnKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaExpc3QsXHJcbiAgICAgICAgICAgZGF0YTpkYXRhLFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIGxpc3QubGVuZ3RoICYmICBsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsLm1hdGNoX3RpbWVfbWludXRlID0gdmFsLm1hdGNoX3RpbWUgJiYgdmFsLm1hdGNoX3RpbWUuc2xpY2UoMTAsMTYpO1xyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSB0aGlzLm1hdGNoTGlzdC5jb25jYXQoIHJlcy5kYXRhLmRhdGEubGlzdCApO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgKysgO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pLmNhdGNoKCBlID0+IHtcclxuICAgICAgICAgIC8vIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgICAgICAvLyB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICAgIC8vIHRoaXMuZ2V0Rm9jdXNUb3RhbCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVhdWdlTGlzdCgpe1xyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubGVhZ3VlTGlzdCxkYXRhOnt0eXBlIDogMCwgZGF0ZTogdGhpcy5nZXROb3dGb3JtYXREYXRlKCl9LFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZ3VlbGlzdCA9IGxpc3Quc2xpY2UoMSwxMDApO1xyXG4gICAgICAgICAgICB0aGlzLmxlYWd1ZWxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICB2YWwuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBnZXRGb2N1c1RvdGFsKCl7XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5mb2N1c0xpc3QsZGF0YTp7cGFnZTogdGhpcy5wYWdlfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgPSByZXMuZGF0YS5kYXRhLm1ldGEudG90YWw7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIC8qdGhpcy5nZXRCYW5uZXJzKCk7Ki9cclxuICAgICAgdGhpcy5kYXRlID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0TGVhdWdlTGlzdCgpO1xyXG4gICAgICB0aGlzLmdldEZvY3VzVG90YWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICAqL1xyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAvLyDliLfmlrDlrozlkI7lgZzmraLliLfmlrBcclxuICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgfSApO1xyXG4gICAgICAvLyBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcbiAgICAgICAgICBcclxuICAgICAgLy8gfSwyMDAwIClcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qIOS4iuaLieinpuW6lSAqL1xyXG4gICAgb25SZWFjaEJvdHRvbSgpe1xyXG4gICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0gKVxyXG4gICAgICBjb25zb2xlLmxvZyhcIuS4iuaLieinpuW6leS6hlwiKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAvKiB0b2RvOuiuvue9ruimgeWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVDb250ZW50LFxyXG4gICAgICAgICAgcGF0aDogJy9wYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICBpbWFnZVVybDonL2ltYWdlcy9zaGFyZV9pbWcuanBnJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HlpLHotKVcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19