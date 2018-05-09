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
        _this2.getClassList();
        _this2.getLeaugeList();
        _this2.getFocusTotal();
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
            formId: this.formId
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsImxlYWd1ZUZpbHRlIiwidHlwZSIsInBhZ2UiLCJkYXRlIiwibGVhZ3VlX2lkIiwiam9pbiIsInJlcXVlc3QiLCJ1cmwiLCJtYXRjaExpc3QiLCJoZWFkZXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInRva2VuIiwidGhlbiIsImxpc3QiLCJyZXMiLCJsZW5ndGgiLCJmb3JFYWNoIiwidmFsIiwibWF0Y2hfdGltZV9taW51dGUiLCJtYXRjaF90aW1lIiwic2xpY2UiLCJjb25jYXQiLCIkYXBwbHkiLCJjYXRjaCIsImdldENsYXNzTGlzdCIsImdldExlYXVnZUxpc3QiLCJnZXRGb2N1c1RvdGFsIiwibGVhZ3VlTGlzdCIsImdldE5vd0Zvcm1hdERhdGUiLCJsZWFndWVsaXN0IiwiY2hlY2tlZCIsImZvY3VzTGlzdCIsInRvdGFsRm9jdXMiLCJtZXRhIiwidG90YWwiLCJ3eCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJpc1VwRnJhc2giLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJzaGFyZUNvbnRlbnQiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJmb290ZXIiLCJMZWF1Z2UiLCJGb2N1cyIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJiYW5uZXJzIiwiY2xhc3NMaXN0IiwiZ2FtZUxpc3QiLCJpc1NjR2FtZSIsImlzU2hvd0xlYWd1ZSIsImZvcm1JZCIsImNvbXB1dGVkIiwibWV0aG9kcyIsIm9wZW5MZWFndWUiLCJzY0dhbWUiLCJnb3RvSW5kZXgiLCJuYXZpZ2F0ZVRvIiwiZ290b1Jlc3VsdCIsImdvdG9GZXR1cmUiLCJnb3RvRm9jdXMiLCJvcGVuTWluaTEiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsImV4dHJhRGF0YSIsImZvbyIsImVudlZlcnNpb24iLCJvcGVuTWluaTIiLCJmb3JtU3VibWl0IiwiZSIsImRldGFpbCIsInZhbHVlIiwic2V0U2hhcmVDb250ZW50IiwibWF0Y2giLCJzdGF0dXMiLCJsZWFndWVfbmFtZSIsImhvbWUiLCJob21lX3Njb3JlIiwiYXdheV9zY29yZSIsImF3YXkiLCJjb2xsZWN0IiwiaW5kZXgiLCJpZCIsImlzX2NvbGxlY3QiLCJzaG93TG9hZGluZyIsIm1hdGNoQ29sbGVjdCIsIm1ldGhvZCIsIm1hdGNoX2lkIiwiaGlkZUxvYWRpbmciLCJldmVudHMiLCIkZXZlbnQiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUwyQztBQUNKO0FBQ0U7QUFDQTs7O0lBSXBCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1NbkI7OztBQUdBOzttQ0FFZTtBQUFBOztBQUNiLFVBQUlDLE9BQU8sRUFBWDtBQUNDLFVBQUksS0FBS0MsV0FBTCxLQUFxQixJQUF6QixFQUErQjtBQUM5QkQsZUFBTztBQUNIRSxnQkFBTyxDQURKO0FBRUhDLGdCQUFNLEtBQUtBLElBRlI7QUFHSEMsZ0JBQU0sS0FBS0E7QUFIUixTQUFQO0FBTUEsT0FQRCxNQU9LO0FBQ0NKLGVBQU87QUFDQUUsZ0JBQU8sQ0FEUDtBQUVBQyxnQkFBTSxLQUFLQSxJQUZYO0FBR0FDLGdCQUFNLEtBQUtBLElBSFg7QUFJQUMscUJBQVUsS0FBS0osV0FBTCxDQUFpQkssSUFBakIsQ0FBc0IsR0FBdEI7QUFKVixTQUFQO0FBTUw7QUFDRCxhQUFPLGVBQUtDLE9BQUwsQ0FBYSxFQUFDQyxLQUFJLGlCQUFRQyxT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d2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IEZvY3VzIGZyb20gJ0AvY29tcG9uZW50cy9mb2N1cycgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBMZWF1Z2UgZnJvbSAnQC9jb21wb25lbnRzL2xlYXVnZScgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBGb290ZXIgZnJvbSAnQC9jb21wb25lbnRzL2Zvb3RlcicgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WNs+aXtuavlOWIhicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJMZWF1Z2VcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwibGVhZ3VlbGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdCxcclxuICAgICAgZm9vdGVyOkZvb3RlcixcclxuICAgICAgTGVhdWdlLFxyXG4gICAgICBGb2N1c1xyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICBpbnRlcnZhbDogNTAwMCxcclxuICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgIGJhbm5lcnM6W10sXHJcbiAgICAgIGNsYXNzTGlzdDpbXSxcclxuICAgICAgZ2FtZUxpc3Q6WzEsMiwzLDQsNSw2LDcsOCw5LDIwLDMzLDMsMywzLDMsMyxdLFxyXG4gICAgICBpc1VwRnJhc2g6ZmFsc2UsXHJcbiAgICAgIHNoYXJlQ29udGVudDon5pe26Ze055yL5b6X6KeB56aP5YWL5pavJyxcclxuICAgICAgaXNTY0dhbWU6IHRydWUsXHJcbiAgICAgIHRvdGFsRm9jdXM6IDAsXHJcbiAgICAgIHBhZ2U6MSxcclxuICAgICAgbWF0Y2hMaXN0OltdLFxyXG4gICAgICBsZWFndWVsaXN0OltdLFxyXG4gICAgICBpc1Nob3dMZWFndWU6ZmFsc2UsXHJcbiAgICAgIGxlYWd1ZUZpbHRlOm51bGwsXHJcbiAgICAgIGRhdGU6ICcnLFxyXG4gICAgICBmb3JtSWQ6JycsXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIG9wZW5MZWFndWUoKXtcclxuICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY0dhbWUoKXtcclxuICAgICAgICAgIHRoaXMuaXNTY0dhbWUgPSAhdGhpcy5pc1NjR2FtZTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdvdG9JbmRleCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9pbmRleGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZvY3VzKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZvY3VzYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qIOaJk+W8gOi2s+eQg+avlOi1myAqL1xyXG4gICAgICAgIG9wZW5NaW5pMSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eGUwYTRjNWI5Zjg1ZjljZjUnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDkuJbnlYzmna/otrPnkIPmg4XmiqUgKi9cclxuICAgICAgICBvcGVuTWluaTIoKXtcclxuICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4MGMyZDUxYjdiNDMzN2MzYScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1JZCA9IGUuZGV0YWlsLmZvcm1JZDtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLmZvcm1JZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3Jt5Y+R55Sf5LqGc3VibWl05LqL5Lu277yM5pC65bim5pWw5o2u5Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog6LCD5pW05YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgICAgc2V0U2hhcmVDb250ZW50KCBtYXRjaCApe1xyXG4gICAgICAgICAgaWYoIG1hdGNoLnN0YXR1cyA9PSAxIHx8IG1hdGNoLnN0YXR1cyA9PSAyIHx8IG1hdGNoLnN0YXR1cyA9PSAzIHx8IG1hdGNoLnN0YXR1cyA9PSA0ICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg6L+b6KGM5Lit77yaJHttYXRjaC5sZWFndWVfbmFtZX0gICR7bWF0Y2guaG9tZX0gICR7bWF0Y2guaG9tZV9zY29yZX0tJHttYXRjaC5hd2F5X3Njb3JlfSAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGAke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSAgJHttYXRjaC5ob21lX3Njb3JlfS0ke21hdGNoLmF3YXlfc2NvcmV9ICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAwICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBgJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMCApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+WPlua2iO+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTEgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvlvoXlrprvvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEyICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg5q+U6LWb6IWw5pap77yaJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMyApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+S4reaWre+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTQgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvmjqjov5/vvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDmlLbol48gKi9cclxuICAgICAgICBjb2xsZWN0KGluZGV4LGlkKXtcclxuXHJcbiAgICAgICAgICBpZiggdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgICl7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgLS0gO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Y+W5raI5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5YWz5rOo5LitJyxcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hDb2xsZWN0LFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICBtYXRjaF9pZCA6IGlkLFxyXG4gICAgICAgICAgICAgICAgICBmb3JtSWQ6dGhpcy5mb3JtSWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gLFxyXG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgKysgO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICdsZWFndWUtY2FuY2VsJzooLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgJ2xlYWd1ZS1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcmdzWzBdKTtcclxuICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmxlYWd1ZUZpbHRlID0gYXJnc1swXTtcclxuICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICB9LFxyXG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g5pS26JeP5q+U6LWbXHJcblxyXG5cclxuICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICBnZXRDbGFzc0xpc3QoICl7XHJcbiAgICAgIGxldCBkYXRhID0ge307XHJcbiAgICAgICBpZiggdGhpcy5sZWFndWVGaWx0ZSA9PT0gbnVsbCApe1xyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHR5cGUgOiAwLFxyXG4gICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXHJcbiAgICAgICAgICAgIGRhdGU6IHRoaXMuZGF0ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRlOiB0aGlzLmRhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVhZ3VlX2lkOnRoaXMubGVhZ3VlRmlsdGUuam9pbignLCcpXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoTGlzdCxcclxuICAgICAgICAgICBkYXRhOmRhdGEsXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgbGlzdC5sZW5ndGggJiYgIGxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICB2YWwubWF0Y2hfdGltZV9taW51dGUgPSB2YWwubWF0Y2hfdGltZSAmJiB2YWwubWF0Y2hfdGltZS5zbGljZSgxMCwxNik7XHJcbiAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IHRoaXMubWF0Y2hMaXN0LmNvbmNhdCggcmVzLmRhdGEuZGF0YS5saXN0ICk7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSArKyA7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSkuY2F0Y2goIGUgPT4ge1xyXG4gICAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgICAgIHRoaXMuZ2V0TGVhdWdlTGlzdCgpO1xyXG4gICAgICAgICAgdGhpcy5nZXRGb2N1c1RvdGFsKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRMZWF1Z2VMaXN0KCl7XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5sZWFndWVMaXN0LGRhdGE6e3R5cGUgOiAwLCBkYXRlOiB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKX0sXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgdGhpcy5sZWFndWVsaXN0ID0gbGlzdC5zbGljZSgxLDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZ3VlbGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHZhbC5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSApXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0Rm9jdXNUb3RhbCgpe1xyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGguZm9jdXNMaXN0LGRhdGE6e3BhZ2U6IHRoaXMucGFnZX0sXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzID0gcmVzLmRhdGEuZGF0YS5tZXRhLnRvdGFsO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAvKnRoaXMuZ2V0QmFubmVycygpOyovXHJcbiAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgdGhpcy5nZXRGb2N1c1RvdGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAgKi9cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgLy8g5Yi35paw5a6M5ZCO5YGc5q2i5Yi35pawXHJcbiAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICAgIH0gKTtcclxuICAgICAgLy8gc2V0VGltZW91dCggKCkgPT4ge1xyXG4gICAgICAgICAgXHJcbiAgICAgIC8vIH0sMjAwMCApXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKiDkuIrmi4nop6blupUgKi9cclxuICAgIG9uUmVhY2hCb3R0b20oKXtcclxuICAgICAgdGhpcy5pc1VwRnJhc2ggPSB0cnVlO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5pc1VwRnJhc2ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9IClcclxuICAgICAgY29uc29sZS5sb2coXCLkuIrmi4nop6blupXkuoZcIilcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgICAgLyogdG9kbzrorr7nva7opoHliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlQ29udGVudCxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==