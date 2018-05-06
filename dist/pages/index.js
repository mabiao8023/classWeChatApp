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
          page: this.page
        };
      } else {
        data = {
          type: 0,
          page: this.page,
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
    isScGame: true,
    totalFocus: 0,
    page: 1,
    matchList: [],
    leaguelist: [],
    isShowLeague: false,
    leagueFilte: null
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
          data: { match_id: id },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsImxlYWd1ZUZpbHRlIiwidHlwZSIsInBhZ2UiLCJsZWFndWVfaWQiLCJqb2luIiwicmVxdWVzdCIsInVybCIsIm1hdGNoTGlzdCIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidG9rZW4iLCJ0aGVuIiwibGlzdCIsInJlcyIsImxlbmd0aCIsImZvckVhY2giLCJ2YWwiLCJtYXRjaF90aW1lX21pbnV0ZSIsIm1hdGNoX3RpbWUiLCJzbGljZSIsImNvbmNhdCIsIiRhcHBseSIsImNhdGNoIiwiZ2V0Q2xhc3NMaXN0IiwiZ2V0TGVhdWdlTGlzdCIsImdldEZvY3VzVG90YWwiLCJsZWFndWVMaXN0IiwiZGF0ZSIsImdldE5vd0Zvcm1hdERhdGUiLCJsZWFndWVsaXN0IiwiY2hlY2tlZCIsImZvY3VzTGlzdCIsInRvdGFsRm9jdXMiLCJtZXRhIiwidG90YWwiLCJ3eCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJpc1VwRnJhc2giLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJzaGFyZUNvbnRlbnQiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJmb290ZXIiLCJMZWF1Z2UiLCJtaXhpbnMiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiYmFubmVycyIsImNsYXNzTGlzdCIsImdhbWVMaXN0IiwiaXNTY0dhbWUiLCJpc1Nob3dMZWFndWUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJvcGVuTGVhZ3VlIiwic2NHYW1lIiwiZ290b0luZGV4IiwibmF2aWdhdGVUbyIsImdvdG9SZXN1bHQiLCJnb3RvRmV0dXJlIiwiZ290b0ZvY3VzIiwib3Blbk1pbmkxIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJleHRyYURhdGEiLCJmb28iLCJlbnZWZXJzaW9uIiwib3Blbk1pbmkyIiwiZm9ybVN1Ym1pdCIsImUiLCJkZXRhaWwiLCJmb3JtSWQiLCJ2YWx1ZSIsInNldFNoYXJlQ29udGVudCIsIm1hdGNoIiwic3RhdHVzIiwibGVhZ3VlX25hbWUiLCJob21lIiwiaG9tZV9zY29yZSIsImF3YXlfc2NvcmUiLCJhd2F5IiwiY29sbGVjdCIsImluZGV4IiwiaWQiLCJpc19jb2xsZWN0Iiwic2hvd0xvYWRpbmciLCJtYXRjaENvbGxlY3QiLCJtZXRob2QiLCJtYXRjaF9pZCIsImhpZGVMb2FkaW5nIiwiZXZlbnRzIiwiJGV2ZW50IiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBSjJDO0FBQ0Y7QUFDQTs7O0lBSXBCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJMbkI7OztBQUdBOzttQ0FFZTtBQUFBOztBQUNiLFVBQUlDLE9BQU8sRUFBWDtBQUNDLFVBQUksS0FBS0MsV0FBTCxLQUFxQixJQUF6QixFQUErQjtBQUM5QkQsZUFBTztBQUNIRSxnQkFBTyxDQURKO0FBRUhDLGdCQUFNLEtBQUtBO0FBRlIsU0FBUDtBQUtBLE9BTkQsTUFNSztBQUNDSCxlQUFPO0FBQ0FFLGdCQUFPLENBRFA7QUFFQUMsZ0JBQU0sS0FBS0EsSUFGWDtBQUdBQyxxQkFBVSxLQUFLSCxXQUFMLENBQWlCSSxJQUFqQixDQUFzQixHQUF0QjtBQUhWLFNBQVA7QUFLTDtBQUNELGFBQU8sZUFBS0MsT0FBTCxDQUFhLEVBQUNDLEtBQUksaUJBQVFDLFNBQWI7QUFDaEJSLGNBQUtBLElBRFc7QUFFaEJTLGdCQUFRO0FBQ0wsZ0NBQW9CLEtBQUtDLE9BQUwsQ0FBYUMsVUFB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SEUsRUFBYixFQU9DQyxJQVBELENBT08sZUFBTztBQUNWd0IsYUFBR3FFLFdBQUg7QUFDQSxpQkFBS2xHLFNBQUwsQ0FBZTJGLEtBQWYsRUFBc0JFLFVBQXRCLEdBQW1DLElBQW5DO0FBQ0EsaUJBQUtuRSxVQUFMO0FBQ0EsaUJBQUtYLE1BQUw7QUFDQWlCLGtCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNILFNBYkQ7QUFjSDtBQUVGO0FBOUhLLEc7T0FpSVZrRSxNLEdBQVM7QUFDUCxxQkFBZ0Isd0JBQWE7QUFDekIsYUFBS3ZDLFlBQUwsR0FBb0IsS0FBcEI7QUFDSCxLQUhNO0FBSVAsbUJBQWUsc0JBQWE7QUFDMUI1QixjQUFRQyxHQUFSO0FBQ0EsYUFBSzJCLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxhQUFLakUsSUFBTCxHQUFZLENBQVo7QUFDQSxhQUFLSyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsYUFBS1AsV0FBTDtBQUNBLGFBQUt3QixZQUFMO0FBQ0QsS0FYTTtBQVlQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUltRixrQkFBYyxVQUFLNUYsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0F3QixjQUFRQyxHQUFSLENBQWUsT0FBS29FLEtBQXBCLGlCQUFxQ0QsT0FBT0UsSUFBNUMsY0FBeURGLE9BQU9HLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQWZNLEU7OztrQkExS1U5RyxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBMZWF1Z2UgZnJvbSAnQC9jb21wb25lbnRzL2xlYXVnZScgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBGb290ZXIgZnJvbSAnQC9jb21wb25lbnRzL2Zvb3RlcicgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WNs+aXtuavlOWIhicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJMZWF1Z2VcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwibGVhZ3VlbGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdCxcclxuICAgICAgZm9vdGVyOkZvb3RlcixcclxuICAgICAgTGVhdWdlXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW215TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcclxuICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgIGludGVydmFsOiA1MDAwLFxyXG4gICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgYmFubmVyczpbXSxcclxuICAgICAgY2xhc3NMaXN0OltdLFxyXG4gICAgICBnYW1lTGlzdDpbMSwyLDMsNCw1LDYsNyw4LDksMjAsMzMsMywzLDMsMywzLF0sXHJcbiAgICAgIGlzVXBGcmFzaDpmYWxzZSxcclxuICAgICAgc2hhcmVDb250ZW50Oifml7bpl7TnnIvlvpfop4Hnpo/lhYvmlq8nLFxyXG4gICAgICBpc1NjR2FtZTogdHJ1ZSxcclxuICAgICAgdG90YWxGb2N1czogMCxcclxuICAgICAgcGFnZToxLFxyXG4gICAgICBtYXRjaExpc3Q6W10sXHJcbiAgICAgIGxlYWd1ZWxpc3Q6W10sXHJcbiAgICAgIGlzU2hvd0xlYWd1ZTpmYWxzZSxcclxuICAgICAgbGVhZ3VlRmlsdGU6bnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIG9wZW5MZWFndWUoKXtcclxuICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY0dhbWUoKXtcclxuICAgICAgICAgIHRoaXMuaXNTY0dhbWUgPSAhdGhpcy5pc1NjR2FtZTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdvdG9JbmRleCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9pbmRleGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZvY3VzKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZvY3VzYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qIOaJk+W8gOi2s+eQg+avlOi1myAqL1xyXG4gICAgICAgIG9wZW5NaW5pMSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eGUwYTRjNWI5Zjg1ZjljZjUnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDkuJbnlYzmna/otrPnkIPmg4XmiqUgKi9cclxuICAgICAgICBvcGVuTWluaTIoKXtcclxuICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4MGMyZDUxYjdiNDMzN2MzYScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZm9ybUlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm3lj5HnlJ/kuoZzdWJtaXTkuovku7bvvIzmkLrluKbmlbDmja7kuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDosIPmlbTliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgICBzZXRTaGFyZUNvbnRlbnQoIG1hdGNoICl7XHJcbiAgICAgICAgICBpZiggbWF0Y2guc3RhdHVzID09IDEgfHwgbWF0Y2guc3RhdHVzID09IDIgfHwgbWF0Y2guc3RhdHVzID09IDMgfHwgbWF0Y2guc3RhdHVzID09IDQgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDov5vooYzkuK3vvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAgJHttYXRjaC5ob21lfSAgJHttYXRjaC5ob21lX3Njb3JlfS0ke21hdGNoLmF3YXlfc2NvcmV9ICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMSApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYCR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9ICAke21hdGNoLmhvbWVfc2NvcmV9LSR7bWF0Y2guYXdheV9zY29yZX0gJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IDAgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGAke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEwICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg5q+U6LWb5Y+W5raI77yaJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMSApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+W+heWumu+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTIgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvohbDmlqnvvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEzICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg5q+U6LWb5Lit5pat77yaJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xNCApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+aOqOi/n++8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOaUtuiXjyAqL1xyXG4gICAgICAgIGNvbGxlY3QoaW5kZXgsaWQpe1xyXG5cclxuICAgICAgICAgIGlmKCB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCAgKXtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5Y+W5raI5LitJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoQ29sbGVjdCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6e21hdGNoX2lkIDogaWR9LFxyXG4gICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YCxcclxuICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyAtLSA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflj5bmtojmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICflhbPms6jkuK0nLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7bWF0Y2hfaWQgOiBpZH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gLFxyXG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgKysgO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICdsZWFndWUtY2FuY2VsJzooLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgJ2xlYWd1ZS1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcmdzWzBdKTtcclxuICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmxlYWd1ZUZpbHRlID0gYXJnc1swXTtcclxuICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICB9LFxyXG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g5pS26JeP5q+U6LWbXHJcblxyXG5cclxuICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICBnZXRDbGFzc0xpc3QoICl7XHJcbiAgICAgIGxldCBkYXRhID0ge307XHJcbiAgICAgICBpZiggdGhpcy5sZWFndWVGaWx0ZSA9PT0gbnVsbCApe1xyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHR5cGUgOiAwLFxyXG4gICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlYWd1ZV9pZDp0aGlzLmxlYWd1ZUZpbHRlLmpvaW4oJywnKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaExpc3QsXHJcbiAgICAgICAgICAgZGF0YTpkYXRhLFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIGxpc3QubGVuZ3RoICYmICBsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsLm1hdGNoX3RpbWVfbWludXRlID0gdmFsLm1hdGNoX3RpbWUgJiYgdmFsLm1hdGNoX3RpbWUuc2xpY2UoMTAsMTYpO1xyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSB0aGlzLm1hdGNoTGlzdC5jb25jYXQoIHJlcy5kYXRhLmRhdGEubGlzdCApO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgKysgO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pLmNhdGNoKCBlID0+IHtcclxuICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICAgIHRoaXMuZ2V0Rm9jdXNUb3RhbCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVhdWdlTGlzdCgpe1xyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubGVhZ3VlTGlzdCxkYXRhOnt0eXBlIDogMCwgZGF0ZTogdGhpcy5nZXROb3dGb3JtYXREYXRlKCl9LFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZ3VlbGlzdCA9IGxpc3Quc2xpY2UoMSwxMDApO1xyXG4gICAgICAgICAgICB0aGlzLmxlYWd1ZWxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICB2YWwuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEZvY3VzVG90YWwoKXtcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLmZvY3VzTGlzdCxkYXRhOntwYWdlOiB0aGlzLnBhZ2V9LFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyA9IHJlcy5kYXRhLmRhdGEubWV0YS50b3RhbDtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgLyp0aGlzLmdldEJhbm5lcnMoKTsqL1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgdGhpcy5nZXRGb2N1c1RvdGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAgKi9cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgLy8g5Yi35paw5a6M5ZCO5YGc5q2i5Yi35pawXHJcbiAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICAgIH0gKTtcclxuICAgICAgLy8gc2V0VGltZW91dCggKCkgPT4ge1xyXG4gICAgICAgICAgXHJcbiAgICAgIC8vIH0sMjAwMCApXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKiDkuIrmi4nop6blupUgKi9cclxuICAgIG9uUmVhY2hCb3R0b20oKXtcclxuICAgICAgdGhpcy5pc1VwRnJhc2ggPSB0cnVlO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5pc1VwRnJhc2ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9IClcclxuICAgICAgY29uc29sZS5sb2coXCLkuIrmi4nop6blupXkuoZcIilcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgICAgLyogdG9kbzrorr7nva7opoHliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlQ29udGVudCxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==