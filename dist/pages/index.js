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
    key: 'getCateObj',


    /**
     * 通过当前的cate_id获得对应的类别中的数据
     * @param {string} cate_id 对应的类别
     * @return {object} 对应分类的数据对象
     */
    value: function getCateObj(cate_id) {
      cate_id = cate_id + "";
      var obj = {
        "0": this.jishiList,
        "1": this.saiguoList,
        "2": this.saichengList,
        "3": this.guanzhuList
      };
      return obj[cate_id];
    }

    /* 获取关注列表 */

  }, {
    key: 'getFocusList',
    value: function getFocusList() {
      var _this2 = this;

      return _wepy2.default.request({ url: _config2.default.focusList, data: { page: this.getCateObj(this.type).page },
        header: {
          'Authorization': '' + this.$parent.globalData.token
        } }).then(function (res) {
        var list = res.data.data.list;
        list.length && list.forEach(function (val) {
          val.match_time_minute = val.match_time && val.match_time.slice(10, 16);
        });
        _this2.guanzhuList.data = _this2.guanzhuList.data.concat(list);
        _this2.matchList = _this2.guanzhuList.data;
        _this2.guanzhuList.page++;
        _this2.$apply();
      });
    }

    // 获取课程列表

  }, {
    key: 'getClassList',
    value: function getClassList() {
      var _this3 = this;

      var data = {};
      if (this.leagueFilte === null) {
        data = {
          type: this.type,
          page: this.getCateObj(this.type).page,
          date: this.getCateObj(this.type).date
        };
      } else {
        data = {
          type: this.type,
          page: this.getCateObj(this.type).page,
          date: this.getCateObj(this.type).date,
          league_id: this.leagueFilte.join(',')
        };
      }
      return _wepy2.default.request({ url: _config2.default.matchList,
        data: data,
        header: {
          'Authorization': '' + this.$parent.globalData.token
        } }).then(function (res) {
        var list = res.data.data.list;

        /* 内容赋值到对应的列表中去 */
        if (list.length > 0) {
          list.forEach(function (val) {
            val.match_time_minute = val.match_time && val.match_time.slice(10, 16);
          });
          _this3.getCateObj(_this3.type).data = _this3.getCateObj(_this3.type).data.concat(list);
          _this3.getCateObj(_this3.type).total = res.data.data.meta.total;
          _this3.getCateObj(_this3.type).page++;
          _this3.matchList = _this3.getCateObj(_this3.type).data;
          _this3.$apply();
        }
      }).catch(function (e) {
        // this.getClassList();
        // this.getLeaugeList();
        // this.getFocusTotal();
      });
    }
  }, {
    key: 'getLeaugeList',
    value: function getLeaugeList() {
      var _this4 = this;

      return _wepy2.default.request({ url: _config2.default.leagueList, data: { type: this.type, date: this.getNowFormatDate() },
        header: {
          'Authorization': '' + this.$parent.globalData.token
        } }).then(function (res) {
        var list = res.data.data.list;
        _this4.leaguelist = list.slice(1, 100);
        _this4.leaguelist.forEach(function (val) {
          val.checked = true;
        });
        _this4.$apply();
      });
    }
  }, {
    key: 'getFocusTotal',
    value: function getFocusTotal() {
      var _this5 = this;

      return _wepy2.default.request({ url: _config2.default.focusList, data: { page: this.page },
        header: {
          'Authorization': '' + this.$parent.globalData.token
        } }).then(function (res) {
        var list = res.data.data.list;
        _this5.totalFocus = res.data.data.meta.total;
        _this5.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      /*this.getBanners();*/
      this.jishiList.date = this.getNowFormatDate();
      this.saiguoList.date = this.getNowFormatDate();
      this.saichengList.date = this.getNowFormatDate();
      this.saiguoList.start = this.getNowFormatDate(new Date(new Date().getTime() - 604800000));
      this.saichengList.start = this.getNowFormatDate();
      this.saiguoList.end = this.getNowFormatDate();
      this.saichengList.end = this.getNowFormatDate(new Date(new Date().getTime() + 604800000));
      this.getClassList();
      this.getLeaugeList();
      this.getFocusTotal();
    }

    /* 页面重新打开 */

  }, {
    key: 'onShow',
    value: function onShow() {
      /* 数据初始化 */

      // this.getClassList();
      // this.getLeaugeList();
      // this.getFocusTotal();

      wx.reLaunch({
        url: 'pages/index'
      });
    }

    /**
     * 页面相关事件处理函数--监听用户下拉动作
    */

  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      // 刷新完后停止刷新
      this.getCateObj(this.type).page = 1;
      this.getCateObj(this.type).data = [];
      if (this.type == 3) {
        this.getFocusList().then(function (res) {
          wx.stopPullDownRefresh();
        });
      } else {
        this.getClassList().then(function (res) {
          wx.stopPullDownRefresh();
        });
      }
    }

    /* 上拉触底 */

  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      var _this6 = this;

      this.isUpFrash = true;
      if (this.type == 3) {
        this.getFocusList().then(function (res) {
          _this6.isUpFrash = false;
          _this6.$apply();
        });
      } else {
        this.getClassList().then(function (res) {
          _this6.isUpFrash = false;
          _this6.$apply();
        });
      }
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
  var _this8 = this;

  this.config = {
    navigationBarTitleText: '足球赛事比分',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black'
  };
  this.$repeat = {};
  this.$props = { "Leauge": { "v-bind:list.sync": "leaguelist" } };
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
    isUpFrash: false,
    shareContent: '足球即时比分',
    totalFocus: 0,
    isShowLeague: false,
    leagueFilte: null,
    date: '',
    formId: '',

    page: 1,
    matchList: [],
    leaguelist: [],
    saiguoList: {
      page: 1,
      data: [],
      date: '',
      start: '',
      end: '',
      total: ''
    },
    jishiList: {
      page: 1,
      data: [],
      date: '',
      total: ''
    },
    saichengList: {
      page: 1,
      data: [],
      date: '',
      start: '',
      end: '',
      total: ''
    },
    guanzhuList: {
      page: 1,
      data: [],
      total: ''
    }

  };
  this.computed = {};
  this.methods = {
    saiGuoDateChange: function saiGuoDateChange(e) {
      this.saiguoList.date = e.detail.value;
      this.saiguoList.page = 1;
      this.saiguoList.data = [];
      this.getClassList();
      this.getLeaugeList();
    },
    saiChengDateChange: function saiChengDateChange(e) {
      this.saichengList.date = e.detail.value;
      this.saichengList.page = 1;
      this.saichengList.data = [];
      this.getClassList();
      this.getLeaugeList();
    },
    chioceType: function chioceType(type) {
      this.type = type;
      this.leagueFilte = null;
      /* 当当前列表为空的时候去请求 */
      if (this.getCateObj(type).data.length <= 0) {
        wx.showLoading({
          title: '加载中'
        });
        if (this.type == 3) {
          this.getFocusList().then(function (res) {
            wx.hideLoading();
          });
        } else {
          this.getClassList().then(function (res) {
            wx.hideLoading();
          });
          this.getLeaugeList();
        }
      }
      this.matchList = this.getCateObj(this.type).data;
    },
    openLeague: function openLeague() {
      this.isShowLeague = true;
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

    formSubmit: function formSubmit(e) {
      this.formId = e.detail.formId;
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
      var _this7 = this;

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
          _this7.matchList[index].is_collect = false;
          _this7.totalFocus--;
          _this7.$apply();
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
          _this7.matchList[index].is_collect = true;
          _this7.totalFocus++;
          _this7.$apply();
          console.log('收藏成功');
        });
      }
    }
  };
  this.events = {
    'league-cancel': function leagueCancel() {
      _this8.isShowLeague = false;
    },
    'league-emit': function leagueEmit() {
      _this8.isShowLeague = false;
      _this8.getCateObj(_this8.type).page = 1;
      _this8.getCateObj(_this8.type).data = [];
      _this8.leagueFilte = arguments.length <= 0 ? undefined : arguments[0];
      _this8.getClassList();
    },
    'index-emit': function indexEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this8.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    } };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY2F0ZV9pZCIsIm9iaiIsImppc2hpTGlzdCIsInNhaWd1b0xpc3QiLCJzYWljaGVuZ0xpc3QiLCJndWFuemh1TGlzdCIsInJlcXVlc3QiLCJ1cmwiLCJmb2N1c0xpc3QiLCJkYXRhIiwicGFnZSIsImdldENhdGVPYmoiLCJ0eXBlIiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ0b2tlbiIsInRoZW4iLCJsaXN0IiwicmVzIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsIm1hdGNoX3RpbWVfbWludXRlIiwibWF0Y2hfdGltZSIsInNsaWNlIiwiY29uY2F0IiwibWF0Y2hMaXN0IiwiJGFwcGx5IiwibGVhZ3VlRmlsdGUiLCJkYXRlIiwibGVhZ3VlX2lkIiwiam9pbiIsInRvdGFsIiwibWV0YSIsImNhdGNoIiwibGVhZ3VlTGlzdCIsImdldE5vd0Zvcm1hdERhdGUiLCJsZWFndWVsaXN0IiwiY2hlY2tlZCIsInRvdGFsRm9jdXMiLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZW5kIiwiZ2V0Q2xhc3NMaXN0IiwiZ2V0TGVhdWdlTGlzdCIsImdldEZvY3VzVG90YWwiLCJ3eCIsInJlTGF1bmNoIiwiZ2V0Rm9jdXNMaXN0Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImlzVXBGcmFzaCIsInRpdGxlIiwic2hhcmVDb250ZW50IiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb250YWN0IiwiZm9vdGVyIiwiTGVhdWdlIiwiRm9jdXMiLCJtaXhpbnMiLCJpc1Nob3dMZWFndWUiLCJmb3JtSWQiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzYWlHdW9EYXRlQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwic2FpQ2hlbmdEYXRlQ2hhbmdlIiwiY2hpb2NlVHlwZSIsInNob3dMb2FkaW5nIiwiaGlkZUxvYWRpbmciLCJvcGVuTGVhZ3VlIiwiZ290b0luZGV4IiwibmF2aWdhdGVUbyIsImdvdG9SZXN1bHQiLCJnb3RvRmV0dXJlIiwiZ290b0ZvY3VzIiwiZm9ybVN1Ym1pdCIsInNldFNoYXJlQ29udGVudCIsIm1hdGNoIiwic3RhdHVzIiwibGVhZ3VlX25hbWUiLCJob21lIiwiaG9tZV9zY29yZSIsImF3YXlfc2NvcmUiLCJhd2F5IiwiY29sbGVjdCIsImluZGV4IiwiaWQiLCJpc19jb2xsZWN0IiwibWF0Y2hDb2xsZWN0IiwibWV0aG9kIiwibWF0Y2hfaWQiLCJjb25zb2xlIiwibG9nIiwiZm9ybV9pZCIsImV2ZW50cyIsIiRldmVudCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBTDJDO0FBQ0o7QUFDRTtBQUNBOzs7SUFJcEJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1ObkI7Ozs7OytCQUtXQyxPLEVBQVE7QUFDakJBLGdCQUFVQSxVQUFVLEVBQXBCO0FBQ0EsVUFBSUMsTUFBTTtBQUNSLGFBQUssS0FBS0MsU0FERjtBQUVSLGFBQUssS0FBS0MsVUFGRjtBQUdSLGFBQUssS0FBS0MsWUFIRjtBQUlSLGFBQUssS0FBS0M7QUFKRixPQUFWO0FBTUEsYUFBT0osSUFBSUQsT0FBSixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7bUNBQ2M7QUFBQTs7QUFDWCxhQUFPLGVBQUtNLE9BQUwsQ0FBYSxFQUFDQyxLQUFJLGlCQUFRQyxTQUFiLEVBQXVCQyxNQUFLLEVBQUNDLE1BQU0sS0FBS0MsVUFBTCxDQUFnQixLQUFLQyxJQUFyQixFQUEyQkYsSUFBbEMsRUFBNUI7QUFDaEJHLGdCQUFRO0FBQ0wsZ0NBQW9CLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEdkMsU0FEUSxFQUFiLEVBSUxDLElBSkssQ0FJQyxlQUFPO0FBQ1YsWUFBSUMsT0FBT0MsSUFBSVYsSUFBSixDQUFTQSxJQUFULENBQWNTLElBQXpCO0FBQ0FBLGFBQUtFLE1BQUwsSUFBZ0JGLEtBQUtHLE9BQUwsQ0FBYyxlQUFPO0FBQ25DQyxjQUFJQyxpQkFBSixHQUF3QkQsSUFBSUUsVUFBSixJQUFrQkYsSUFBSUUsVUFBSixDQUFlQyxLQUFmLENBQXFCLEVBQXJCLEVBQXdCLEVBQXhCLENBQTFDO0FBQ0QsU0FGZSxDQUFoQjtBQUdBLGVBQUtwQixXQUFMLENBQWlCSSxJQUFqQixHQUF3QixPQUFLSixXQUFMLENBQWlCSSxJQUFqQixDQUFzQmlCLE1BQXRCLENBQTZCUixJQUE3QixDQUF4QjtBQUNBLGVBQUtTLFNBQUwsR0FBaUIsT0FBS3RCLFdBQUwsQ0FBaUJJLElBQWxDO0FBQ0EsZUFBS0osV0FBTCxDQUFpQkssSUFBakI7QUFDQSxlQUFLa0IsTUFBTDtBQUNILE9BYkssQ0FBUDtBQWNGOztBQUVEOzs7O21DQUVlO0FBQUE7O0FBQ2IsVUFBSW5CLE9BQU8sRUFBWDtBQUNDLFVBQUksS0FBS29CLFdBQUwsS0FBcUIsSUFBekIsRUFBK0I7QUFDNUJwQixlQUFPO0FBQ0xHLGdCQUFNLEtBQUtBLElBRE47QUFFTEYsZ0JBQU0sS0FBS0MsVUFBTCxDQUFnQixLQUFLQyxJQUFyQixFQUEyQkYsSUFGNUI7QUFHTG9CLGdCQUFNLEtBQUtuQixVQUFMLENBQWdCLEtBQUtDLElBQXJCLEVBQTJCa0I7QUFINUIsU0FBUDtBQUtGLE9BTkQsTUFNSztBQUNKckIsZUFBTztBQUNIRyxnQkFBTSxLQUFLQSxJQURSO0FBRUhGLGdCQUFNLEtBQUtDLFVBQUwsQ0FBZ0IsS0FBS0MsSUFBckIsRUFBMkJGLElBRjlCO0FBR0hvQixnQkFBTSxLQUFLbkIsVUFBTCxDQUFnQixLQUFLQyxJQUFyQixFQUEyQmtCLElBSDlCO0FBSUhDLHFCQUFVLEtBQUtGLFdBQUwsQ0FBaUJHLElBQWpCLENBQXNCLEdBQXRCO0FBSlAsU0FBUDtBQU1BO0FBQ0QsYUFBTyxlQUFLMUIsT0FBTCxDQUFhLEVBQUNDLEtBQUksaUJBQVFvQixTQUFiO0FBQ2hCbEIsY0FBS0EsSUFEVztBQUVoQkksZ0JBQVE7QUFDTCxnQ0FBb0IsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR2QyxTQUZRLEVBQWIsRUFLTEMsSUFMSyxDQUtDLGVBQU87QUFDVixZQUFJQyxPQUFPQyxJQUFJVixJQUFKLENBQVNBLElBQVQsQ0FBY1MsSUFBekI7O0FBRUE7QUFDQSxZQUFJQSxLQUFLRSxNQUFMLEdBQWMsQ0FBbEIsRUFBcUI7QUFDbEJGLGVBQUtHLE9BQUwsQ0FBYyxlQUFPO0FBQ3BCQyxnQkFBSUMsaUJBQUosR0FBd0JELElBQUlFLFVBQUosSUFBa0JGLElBQUlFLFVBQUosQ0FBZUMsS0FBZixDQUFxQixFQUFyQixFQUF3QixFQUF4QixDQUExQztBQUNDLFdBRkY7QUFHQSxpQkFBS2QsVUFBTCxDQUFnQixPQUFLQyxJQUFyQixFQUEyQkgsSUFBM0IsR0FBa0MsT0FBS0UsVUFBTCxDQUFnQixPQUFLQyxJQUFyQixFQUEyQkgsSUFBM0IsQ0FBZ0NpQixNQUFoQyxDQUF1Q1IsSUFBdkMsQ0FBbEM7QUFDRCxpQkFBS1AsVUFBTCxDQUFnQixPQUFLQyxJQUFyQixFQUEyQnFCLEtBQTNCLEdBQW1DZCxJQUFJVixJQUFKLENBQVNBLElBQVQsQ0FBY3lCLElBQWQsQ0FBbUJELEtBQXREO0FBQ0EsaUJBQUt0QixVQUFMLENBQWdCLE9BQUtDLElBQXJCLEVBQTJCRixJQUEzQjtBQUNBLGlCQUFLaUIsU0FBTCxHQUFpQixPQUFLaEIsVUFBTCxDQUFnQixPQUFLQyxJQUFyQixFQUEyQkgsSUFBNUM7QUFDQSxpQkFBS21CLE1BQUw7QUFDRDtBQUVKLE9BcEJLLEVBb0JITyxLQXBCRyxDQW9CSSxhQUFLO0FBQ2I7QUFDQTtBQUNBO0FBQ0QsT0F4QkssQ0FBUDtBQXlCRjs7O29DQUVjO0FBQUE7O0FBQ1osYUFBTyxlQUFLN0IsT0FBTCxDQUFhLEVBQUNDLEtBQUksaUJBQVE2QixVQUFiLEVBQXdCM0IsTUFBSyxFQUFDRyxNQUFPLEtBQUtBLElBQWIsRUFBbUJrQixNQUFNLEtBQUtPLGdCQUFMLEVBQXpCLEVBQTdCO0FBQ2hCeEIsZ0JBQVE7QUFDTCxnQ0FBb0IsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR2QyxTQURRLEVBQWIsRUFJTEMsSUFKSyxDQUlDLGVBQU87QUFDVixZQUFJQyxPQUFPQyxJQUFJVixJQUFKLENBQVNBLElBQVQsQ0FBY1MsSUFBekI7QUFDQSxlQUFLb0IsVUFBTCxHQUFrQnBCLEtBQUtPLEtBQUwsQ0FBVyxDQUFYLEVBQWEsR0FBYixDQUFsQjtBQUNBLGVBQUthLFVBQUwsQ0FBZ0JqQixPQUFoQixDQUF5QixlQUFPO0FBQzlCQyxjQUFJaUIsT0FBSixHQUFjLElBQWQ7QUFDRCxTQUZEO0FBR0EsZUFBS1gsTUFBTDtBQUNILE9BWEssQ0FBUDtBQVlGOzs7b0NBR2M7QUFBQTs7QUFDWixhQUFPLGVBQUt0QixPQUFMLENBQWEsRUFBQ0MsS0FBSSxpQkFBUUMsU0FBYixFQUF1QkMsTUFBSyxFQUFDQyxNQUFNLEtBQUtBLElBQVosRUFBNUI7QUFDaEJHLGdCQUFRO0FBQ0wsZ0NBQW9CLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEdkMsU0FEUSxFQUFiLEVBSUxDLElBSkssQ0FJQyxlQUFPO0FBQ1YsWUFBSUMsT0FBT0MsSUFBSVYsSUFBSixDQUFTQSxJQUFULENBQWNTLElBQXpCO0FBQ0EsZUFBS3NCLFVBQUwsR0FBa0JyQixJQUFJVixJQUFKLENBQVNBLElBQVQsQ0FBY3lCLElBQWQsQ0FBbUJELEtBQXJDO0FBQ0EsZUFBS0wsTUFBTDtBQUNILE9BUkssQ0FBUDtBQVNGOzs7NkJBRVE7QUFDUDtBQUNBLFdBQUsxQixTQUFMLENBQWU0QixJQUFmLEdBQXNCLEtBQUtPLGdCQUFMLEVBQXRCO0FBQ0EsV0FBS2xDLFVBQUwsQ0FBZ0IyQixJQUFoQixHQUF1QixLQUFLTyxnQkFBTCxFQUF2QjtBQUNBLFdBQUtqQyxZQUFMLENBQWtCMEIsSUFBbEIsR0FBeUIsS0FBS08sZ0JBQUwsRUFBekI7QUFDQSxXQUFLbEMsVUFBTCxDQUFnQnNDLEtBQWhCLEdBQXdCLEtBQUtKLGdCQUFMLENBQXVCLElBQUlLLElBQUosQ0FBUyxJQUFJQSxJQUFKLEdBQVdDLE9BQVgsS0FBdUIsU0FBaEMsQ0FBdkIsQ0FBeEI7QUFDQSxXQUFLdkMsWUFBTCxDQUFrQnFDLEtBQWxCLEdBQTBCLEtBQUtKLGdCQUFMLEVBQTFCO0FBQ0EsV0FBS2xDLFVBQUwsQ0FBZ0J5QyxHQUFoQixHQUFzQixLQUFLUCxnQkFBTCxFQUF0QjtBQUNBLFdBQUtqQyxZQUFMLENBQWtCd0MsR0FBbEIsR0FBd0IsS0FBS1AsZ0JBQUwsQ0FBdUIsSUFBSUssSUFBSixDQUFTLElBQUlBLElBQUosR0FBV0MsT0FBWCxLQUF1QixTQUFoQyxDQUF2QixDQUF4QjtBQUNBLFdBQUtFLFlBQUw7QUFDQSxXQUFLQyxhQUFMO0FBQ0EsV0FBS0MsYUFBTDtBQUNEOztBQUVEOzs7OzZCQUNRO0FBQ047O0FBRUE7QUFDQTtBQUNBOztBQUVBQyxTQUFHQyxRQUFILENBQVk7QUFDVjFDLGFBQUs7QUFESyxPQUFaO0FBSUQ7O0FBR0Q7Ozs7Ozt3Q0FHcUI7QUFDbkI7QUFDQSxXQUFLSSxVQUFMLENBQWdCLEtBQUtDLElBQXJCLEVBQTJCRixJQUEzQixHQUFrQyxDQUFsQztBQUNBLFdBQUtDLFVBQUwsQ0FBZ0IsS0FBS0MsSUFBckIsRUFBMkJILElBQTNCLEdBQWtDLEVBQWxDO0FBQ0EsVUFBSSxLQUFLRyxJQUFMLElBQWEsQ0FBakIsRUFBb0I7QUFDbEIsYUFBS3NDLFlBQUwsR0FBb0JqQyxJQUFwQixDQUEwQixlQUFPO0FBQzdCK0IsYUFBR0csbUJBQUg7QUFDSCxTQUZEO0FBR0QsT0FKRCxNQUlLO0FBQ0gsYUFBS04sWUFBTCxHQUFvQjVCLElBQXBCLENBQTBCLGVBQU87QUFDL0IrQixhQUFHRyxtQkFBSDtBQUNELFNBRkQ7QUFHRDtBQUNGOztBQUdEOzs7O29DQUNlO0FBQUE7O0FBQ1QsV0FBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFVBQUksS0FBS3hDLElBQUwsSUFBYSxDQUFqQixFQUFvQjtBQUNoQixhQUFLc0MsWUFBTCxHQUFvQmpDLElBQXBCLENBQTBCLGVBQU87QUFDL0IsaUJBQUttQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsaUJBQUt4QixNQUFMO0FBQ0QsU0FIRDtBQUlILE9BTEQsTUFLSztBQUNELGFBQUtpQixZQUFMLEdBQW9CNUIsSUFBcEIsQ0FBMEIsZUFBTztBQUMvQixpQkFBS21DLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxpQkFBS3hCLE1BQUw7QUFDRCxTQUhEO0FBSUg7QUFDTjs7O3dDQUVtQjtBQUNsQjtBQUNBLGFBQU87QUFDSHlCLGVBQU8sS0FBS0MsWUFEVDtBQUVIQyxjQUFNLGNBRkg7QUFHSEMsa0JBQVMsdUJBSE47QUFJSEMsaUJBQVEsaUJBQVN0QyxHQUFULEVBQWM7QUFDcEI7QUFDRCxTQU5FO0FBT0h1QyxjQUFNLGNBQVN2QyxHQUFULEVBQWM7QUFDbEI7QUFDRDtBQVRFLE9BQVA7QUFXRDs7OztFQTNZZ0MsZUFBS1QsSTs7Ozs7T0FDdENpRCxNLEdBQVM7QUFDUEMsNEJBQXdCLFFBRGpCO0FBRVBDLGtDQUE4QixTQUZ2QjtBQUdQQyw0QkFBd0I7QUFIakIsRztPQU1WQyxPLEdBQVUsRTtPQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsb0JBQW1CLFlBQXBCLEVBQVYsRTtPQUNUQyxPLEdBQVUsRTtPQUNUQyxVLEdBQWE7QUFDUkMsOEJBRFE7QUFFUkMsNEJBRlE7QUFHUkMsNEJBSFE7QUFJUkM7QUFKUSxHO09BT1ZDLE0sR0FBUyxnQjtPQUVUOUQsSSxHQUFPO0FBQ0w7QUFDQUcsVUFBTSxDQUZEO0FBR0x3QyxlQUFVLEtBSEw7QUFJTEUsa0JBQWEsUUFKUjtBQUtMZCxnQkFBWSxDQUxQO0FBTUxnQyxrQkFBYSxLQU5SO0FBT0wzQyxpQkFBWSxJQVBQO0FBUUxDLFVBQU0sRUFSRDtBQVNMMkMsWUFBTyxFQVRGOztBQVdML0QsVUFBSyxDQVhBO0FBWUxpQixlQUFVLEVBWkw7QUFhTFcsZ0JBQVcsRUFiTjtBQWNMbkMsZ0JBQVc7QUFDVE8sWUFBSyxDQURJO0FBRVRELFlBQUssRUFGSTtBQUdUcUIsWUFBSyxFQUhJO0FBSVRXLGFBQU0sRUFKRztBQUtURyxXQUFJLEVBTEs7QUFNVFgsYUFBTTtBQU5HLEtBZE47QUFzQkwvQixlQUFVO0FBQ1JRLFlBQUssQ0FERztBQUVSRCxZQUFLLEVBRkc7QUFHUnFCLFlBQUssRUFIRztBQUlSRyxhQUFNO0FBSkUsS0F0Qkw7QUE0Qkw3QixrQkFBYTtBQUNYTSxZQUFLLENBRE07QUFFWEQsWUFBSyxFQUZNO0FBR1hxQixZQUFLLEVBSE07QUFJWFcsYUFBTSxFQUpLO0FBS1hHLFdBQUksRUFMTztBQU1YWCxhQUFNO0FBTkssS0E1QlI7QUFvQ0w1QixpQkFBWTtBQUNWSyxZQUFLLENBREs7QUFFVkQsWUFBSyxFQUZLO0FBR1Z3QixhQUFNO0FBSEk7O0FBcENQLEc7T0E0Q1B5QyxRLEdBQVcsRTtPQUlYQyxPLEdBQVU7QUFDTkMsb0JBRE0sNEJBQ1dDLENBRFgsRUFDYTtBQUNmLFdBQUsxRSxVQUFMLENBQWdCMkIsSUFBaEIsR0FBdUIrQyxFQUFFQyxNQUFGLENBQVNDLEtBQWhDO0FBQ0EsV0FBSzVFLFVBQUwsQ0FBZ0JPLElBQWhCLEdBQXVCLENBQXZCO0FBQ0EsV0FBS1AsVUFBTCxDQUFnQk0sSUFBaEIsR0FBdUIsRUFBdkI7QUFDQSxXQUFLb0MsWUFBTDtBQUNBLFdBQUtDLGFBQUw7QUFDSCxLQVBLO0FBUU5rQyxzQkFSTSw4QkFRYUgsQ0FSYixFQVFlO0FBQ2pCLFdBQUt6RSxZQUFMLENBQWtCMEIsSUFBbEIsR0FBeUIrQyxFQUFFQyxNQUFGLENBQVNDLEtBQWxDO0FBQ0EsV0FBSzNFLFlBQUwsQ0FBa0JNLElBQWxCLEdBQXlCLENBQXpCO0FBQ0EsV0FBS04sWUFBTCxDQUFrQkssSUFBbEIsR0FBeUIsRUFBekI7QUFDQSxXQUFLb0MsWUFBTDtBQUNBLFdBQUtDLGFBQUw7QUFDSCxLQWRLO0FBZU5tQyxjQWZNLHNCQWVNckUsSUFmTixFQWVZO0FBQ2hCLFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLFdBQUtpQixXQUFMLEdBQW1CLElBQW5CO0FBQ0E7QUFDQSxVQUFJLEtBQUtsQixVQUFMLENBQWdCQyxJQUFoQixFQUFzQkgsSUFBdEIsQ0FBMkJXLE1BQTNCLElBQXFDLENBQXpDLEVBQTRDO0FBQ3hDNEIsV0FBR2tDLFdBQUgsQ0FBZTtBQUNiN0IsaUJBQU87QUFETSxTQUFmO0FBR0EsWUFBSSxLQUFLekMsSUFBTCxJQUFhLENBQWpCLEVBQW9CO0FBQ2pCLGVBQUtzQyxZQUFMLEdBQW9CakMsSUFBcEIsQ0FBMEIsZUFBTztBQUFDK0IsZUFBR21DLFdBQUg7QUFBa0IsV0FBcEQ7QUFDRixTQUZELE1BRUs7QUFDSCxlQUFLdEMsWUFBTCxHQUFvQjVCLElBQXBCLENBQTBCLGVBQU87QUFBQytCLGVBQUdtQyxXQUFIO0FBQWtCLFdBQXBEO0FBQ0EsZUFBS3JDLGFBQUw7QUFDRDtBQUNKO0FBQ0QsV0FBS25CLFNBQUwsR0FBaUIsS0FBS2hCLFVBQUwsQ0FBZ0IsS0FBS0MsSUFBckIsRUFBMkJILElBQTVDO0FBQ0QsS0EvQks7QUFnQ04yRSxjQWhDTSx3QkFnQ007QUFDVCxXQUFLWixZQUFMLEdBQW9CLElBQXBCO0FBQ0YsS0FsQ0s7QUFtQ05hLGFBbkNNLHVCQW1DSztBQUNUckMsU0FBR3NDLFVBQUgsQ0FBYztBQUNaL0U7QUFEWSxPQUFkO0FBR0QsS0F2Q0s7QUF3Q05nRixjQXhDTSx3QkF3Q007QUFDVnZDLFNBQUdzQyxVQUFILENBQWM7QUFDWi9FO0FBRFksT0FBZDtBQUdELEtBNUNLO0FBNkNOaUYsY0E3Q00sd0JBNkNNO0FBQ1Z4QyxTQUFHc0MsVUFBSCxDQUFjO0FBQ1ovRTtBQURZLE9BQWQ7QUFHRCxLQWpESztBQWtETmtGLGFBbERNLHVCQWtESztBQUNUekMsU0FBR3NDLFVBQUgsQ0FBYztBQUNaL0U7QUFEWSxPQUFkO0FBR0QsS0F0REs7O0FBdURObUYsZ0JBQVksb0JBQVNiLENBQVQsRUFBWTtBQUNwQixXQUFLSixNQUFMLEdBQWNJLEVBQUVDLE1BQUYsQ0FBU0wsTUFBdkI7QUFDSCxLQXpESzs7QUEyRE47QUFDQWtCLG1CQTVETSwyQkE0RFdDLEtBNURYLEVBNERrQjtBQUN0QixVQUFJQSxNQUFNQyxNQUFOLElBQWdCLENBQWhCLElBQXFCRCxNQUFNQyxNQUFOLElBQWdCLENBQXJDLElBQTBDRCxNQUFNQyxNQUFOLElBQWdCLENBQTFELElBQStERCxNQUFNQyxNQUFOLElBQWdCLENBQW5GLEVBQXNGO0FBQ2xGLGFBQUt2QyxZQUFMLGdDQUEyQnNDLE1BQU1FLFdBQWpDLFVBQWlERixNQUFNRyxJQUF2RCxVQUFnRUgsTUFBTUksVUFBdEUsU0FBb0ZKLE1BQU1LLFVBQTFGLFNBQXdHTCxNQUFNTSxJQUE5RztBQUNILE9BRkQsTUFFTSxJQUFJTixNQUFNQyxNQUFOLElBQWdCLENBQUMsQ0FBckIsRUFBd0I7QUFDMUIsYUFBS3ZDLFlBQUwsR0FBdUJzQyxNQUFNRSxXQUE3QixTQUE0Q0YsTUFBTXBFLFVBQU4sQ0FBaUJDLEtBQWpCLENBQXVCLENBQXZCLEVBQXlCbUUsTUFBTXBFLFVBQU4sQ0FBaUJKLE1BQWpCLEdBQXdCLENBQWpELENBQTVDLFNBQW1Hd0UsTUFBTUcsSUFBekcsVUFBa0hILE1BQU1JLFVBQXhILFNBQXNJSixNQUFNSyxVQUE1SSxTQUEwSkwsTUFBTU0sSUFBaEs7QUFDSCxPQUZLLE1BRUEsSUFBSU4sTUFBTUMsTUFBTixJQUFnQixDQUFwQixFQUF1QjtBQUN6QixhQUFLdkMsWUFBTCxHQUF1QnNDLE1BQU1FLFdBQTdCLFNBQTRDRixNQUFNcEUsVUFBTixDQUFpQkMsS0FBakIsQ0FBdUIsQ0FBdkIsRUFBeUJtRSxNQUFNcEUsVUFBTixDQUFpQkosTUFBakIsR0FBd0IsQ0FBakQsQ0FBNUMsU0FBbUd3RSxNQUFNRyxJQUF6RyxZQUFvSEgsTUFBTU0sSUFBMUg7QUFDSCxPQUZLLE1BRUEsSUFBSU4sTUFBTUMsTUFBTixJQUFnQixDQUFDLEVBQXJCLEVBQXlCO0FBQzNCLGFBQUt2QyxZQUFMLHNDQUE0QnNDLE1BQU1FLFdBQWxDLFNBQWlERixNQUFNcEUsVUFBTixDQUFpQkMsS0FBakIsQ0FBdUIsQ0FBdkIsRUFBeUJtRSxNQUFNcEUsVUFBTixDQUFpQkosTUFBakIsR0FBd0IsQ0FBakQsQ0FBakQsU0FBd0d3RSxNQUFNRyxJQUE5RyxZQUF5SEgsTUFBTU0sSUFBL0g7QUFDSCxPQUZLLE1BRUEsSUFBSU4sTUFBTUMsTUFBTixJQUFnQixDQUFDLEVBQXJCLEVBQXlCO0FBQzNCLGFBQUt2QyxZQUFMLHNDQUE0QnNDLE1BQU1FLFdBQWxDLFNBQWlERixNQUFNcEUsVUFBTixDQUFpQkMsS0FBakIsQ0FBdUIsQ0FBdkIsRUFBeUJtRSxNQUFNcEUsVUFBTixDQUFpQkosTUFBakIsR0FBd0IsQ0FBakQsQ0FBakQsU0FBd0d3RSxNQUFNRyxJQUE5RyxZQUF5SEgsTUFBTU0sSUFBL0g7QUFDSCxPQUZLLE1BRUEsSUFBSU4sTUFBTUMsTUFBTixJQUFnQixDQUFDLEVBQXJCLEVBQXlCO0FBQzNCLGFBQUt2QyxZQUFMLHNDQUE0QnNDLE1BQU1FLFdBQWxDLFNBQWlERixNQUFNcEUsVUFBTixDQUFpQkMsS0FBakIsQ0FBdUIsQ0FBdkIsRUFBeUJtRSxNQUFNcEUsVUFBTixDQUFpQkosTUFBakIsR0FBd0IsQ0FBakQsQ0FBakQsU0FBd0d3RSxNQUFNRyxJQUE5RyxZQUF5SEgsTUFBTU0sSUFBL0g7QUFDSCxPQUZLLE1BRUEsSUFBSU4sTUFBTUMsTUFBTixJQUFnQixDQUFDLEVBQXJCLEVBQXlCO0FBQzNCLGFBQUt2QyxZQUFMLHNDQUE0QnNDLE1BQU1FLFdBQWxDLFNBQWlERixNQUFNcEUsVUFBTixDQUFpQkMsS0FBakIsQ0FBdUIsQ0FBdkIsRUFBeUJtRSxNQUFNcEUsVUFBTixDQUFpQkosTUFBakIsR0FBd0IsQ0FBakQsQ0FBakQsU0FBd0d3RSxNQUFNRyxJQUE5RyxZQUF5SEgsTUFBTU0sSUFBL0g7QUFDSCxPQUZLLE1BRUEsSUFBSU4sTUFBTUMsTUFBTixJQUFnQixDQUFDLEVBQXJCLEVBQXlCO0FBQzNCLGFBQUt2QyxZQUFMLHNDQUE0QnNDLE1BQU1FLFdBQWxDLFNBQWlERixNQUFNcEUsVUFBTixDQUFpQkMsS0FBakIsQ0FBdUIsQ0FBdkIsRUFBeUJtRSxNQUFNcEUsVUFBTixDQUFpQkosTUFBakIsR0FBd0IsQ0FBakQsQ0FBakQsU0FBd0d3RSxNQUFNRyxJQUE5RyxZQUF5SEgsTUFBTU0sSUFBL0g7QUFDSDtBQUNGLEtBOUVLOzs7QUFnRk47QUFDQUMsV0FqRk0sbUJBaUZFQyxLQWpGRixFQWlGUUMsRUFqRlIsRUFpRlc7QUFBQTs7QUFFZixVQUFJLEtBQUsxRSxTQUFMLENBQWV5RSxLQUFmLEVBQXNCRSxVQUExQixFQUF1QztBQUNyQ3RELFdBQUdrQyxXQUFILENBQWU7QUFDYjdCLGlCQUFPO0FBRE0sU0FBZjtBQUdFLHVCQUFLL0MsT0FBTCxDQUFhLEVBQUNDLEtBQUksaUJBQVFnRyxZQUFiO0FBQ1hDLGtCQUFPLFFBREk7QUFFWC9GLGdCQUFLLEVBQUNnRyxVQUFXSixFQUFaLEVBRk07QUFHVnhGLGtCQUFRO0FBQ0wsa0NBQW9CLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsS0FEdkM7QUFFTCw0QkFBZ0I7QUFGWCxXQUhFLEVBQWIsRUFPQ0MsSUFQRCxDQU9PLGVBQU87QUFDVitCLGFBQUdtQyxXQUFIO0FBQ0EsaUJBQUt4RCxTQUFMLENBQWV5RSxLQUFmLEVBQXNCRSxVQUF0QixHQUFtQyxLQUFuQztBQUNBLGlCQUFLOUQsVUFBTDtBQUNBLGlCQUFLWixNQUFMO0FBQ0E4RSxrQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDSCxTQWJEO0FBY0gsT0FsQkQsTUFrQks7QUFDRDNELFdBQUdrQyxXQUFILENBQWU7QUFDYjdCLGlCQUFPO0FBRE0sU0FBZjtBQUdBLHVCQUFLL0MsT0FBTCxDQUFhLEVBQUNDLEtBQUksaUJBQVFnRyxZQUFiO0FBQ1hDLGtCQUFPLE1BREk7QUFFWC9GLGdCQUFLO0FBQ0hnRyxzQkFBV0osRUFEUjtBQUVITyxxQkFBUSxLQUFLbkM7QUFGVixXQUZNO0FBTVY1RCxrQkFBUTtBQUNMLGtDQUFvQixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLEtBRHZDO0FBRUwsNEJBQWdCO0FBRlgsV0FORSxFQUFiLEVBVUNDLElBVkQsQ0FVTyxlQUFPO0FBQ1YrQixhQUFHbUMsV0FBSDtBQUNBLGlCQUFLeEQsU0FBTCxDQUFleUUsS0FBZixFQUFzQkUsVUFBdEIsR0FBbUMsSUFBbkM7QUFDQSxpQkFBSzlELFVBQUw7QUFDQSxpQkFBS1osTUFBTDtBQUNBOEUsa0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0gsU0FoQkQ7QUFpQkg7QUFFRjtBQTVISyxHO09BK0hWRSxNLEdBQVM7QUFDUCxxQkFBZ0Isd0JBQWE7QUFDekIsYUFBS3JDLFlBQUwsR0FBb0IsS0FBcEI7QUFDSCxLQUhNO0FBSVAsbUJBQWUsc0JBQWE7QUFDMUIsYUFBS0EsWUFBTCxHQUFvQixLQUFwQjtBQUNBLGFBQUs3RCxVQUFMLENBQWdCLE9BQUtDLElBQXJCLEVBQTJCRixJQUEzQixHQUFrQyxDQUFsQztBQUNBLGFBQUtDLFVBQUwsQ0FBZ0IsT0FBS0MsSUFBckIsRUFBMkJILElBQTNCLEdBQWtDLEVBQWxDO0FBQ0EsYUFBS29CLFdBQUw7QUFDQSxhQUFLZ0IsWUFBTDtBQUNELEtBVk07QUFXUCxrQkFBYyxxQkFBYTtBQUFBOztBQUN6QixVQUFJaUUsa0JBQWMsVUFBSzFGLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBc0YsY0FBUUMsR0FBUixDQUFlLE9BQUtJLEtBQXBCLGlCQUFxQ0QsT0FBT0UsSUFBNUMsY0FBeURGLE9BQU9HLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQWRNLEU7OztrQkFsTVVoSCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBGb2N1cyBmcm9tICdAL2NvbXBvbmVudHMvZm9jdXMnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgTGVhdWdlIGZyb20gJ0AvY29tcG9uZW50cy9sZWF1Z2UnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgRm9vdGVyIGZyb20gJ0AvY29tcG9uZW50cy9mb290ZXInIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotrPnkIPotZvkuovmr5TliIYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycgICAgICBcclxuICAgIH1cclxuXHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiTGVhdWdlXCI6e1widi1iaW5kOmxpc3Quc3luY1wiOlwibGVhZ3VlbGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdCxcclxuICAgICAgZm9vdGVyOkZvb3RlcixcclxuICAgICAgTGVhdWdlLFxyXG4gICAgICBGb2N1c1xyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIC8qIDAgLT4g5Y2z5pe2ICAxIC0+IOi1m+aenCAgMiAtPiDotZvnqIsgIDMgLT4g5YWz5rOoKi9cclxuICAgICAgdHlwZTogMCwgIFxyXG4gICAgICBpc1VwRnJhc2g6ZmFsc2UsXHJcbiAgICAgIHNoYXJlQ29udGVudDon6Laz55CD5Y2z5pe25q+U5YiGJyxcclxuICAgICAgdG90YWxGb2N1czogMCxcclxuICAgICAgaXNTaG93TGVhZ3VlOmZhbHNlLFxyXG4gICAgICBsZWFndWVGaWx0ZTpudWxsLFxyXG4gICAgICBkYXRlOiAnJyxcclxuICAgICAgZm9ybUlkOicnLFxyXG5cclxuICAgICAgcGFnZToxLFxyXG4gICAgICBtYXRjaExpc3Q6W10sXHJcbiAgICAgIGxlYWd1ZWxpc3Q6W10sXHJcbiAgICAgIHNhaWd1b0xpc3Q6e1xyXG4gICAgICAgIHBhZ2U6MSxcclxuICAgICAgICBkYXRhOltdLFxyXG4gICAgICAgIGRhdGU6JycsXHJcbiAgICAgICAgc3RhcnQ6JycsXHJcbiAgICAgICAgZW5kOicnLFxyXG4gICAgICAgIHRvdGFsOicnLFxyXG4gICAgICB9LFxyXG4gICAgICBqaXNoaUxpc3Q6e1xyXG4gICAgICAgIHBhZ2U6MSxcclxuICAgICAgICBkYXRhOltdLFxyXG4gICAgICAgIGRhdGU6JycsXHJcbiAgICAgICAgdG90YWw6JycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHNhaWNoZW5nTGlzdDp7XHJcbiAgICAgICAgcGFnZToxLFxyXG4gICAgICAgIGRhdGE6W10sXHJcbiAgICAgICAgZGF0ZTonJyxcclxuICAgICAgICBzdGFydDonJyxcclxuICAgICAgICBlbmQ6JycsXHJcbiAgICAgICAgdG90YWw6JycsXHJcbiAgICAgIH0sXHJcbiAgICAgIGd1YW56aHVMaXN0OntcclxuICAgICAgICBwYWdlOjEsXHJcbiAgICAgICAgZGF0YTpbXSxcclxuICAgICAgICB0b3RhbDonJ1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNhaUd1b0RhdGVDaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2FpZ3VvTGlzdC5kYXRlID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2FpZ3VvTGlzdC5wYWdlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zYWlndW9MaXN0LmRhdGEgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzYWlDaGVuZ0RhdGVDaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2FpY2hlbmdMaXN0LmRhdGUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zYWljaGVuZ0xpc3QucGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuc2FpY2hlbmdMaXN0LmRhdGEgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGlvY2VUeXBlKCB0eXBlICl7XHJcbiAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgdGhpcy5sZWFndWVGaWx0ZSA9IG51bGw7ICBcclxuICAgICAgICAgIC8qIOW9k+W9k+WJjeWIl+ihqOS4uuepuueahOaXtuWAmeWOu+ivt+axgiAqL1xyXG4gICAgICAgICAgaWYoIHRoaXMuZ2V0Q2F0ZU9iaih0eXBlKS5kYXRhLmxlbmd0aCA8PSAwICl7XHJcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGlmKCB0aGlzLnR5cGUgPT0gMyApe1xyXG4gICAgICAgICAgICAgICAgIHRoaXMuZ2V0Rm9jdXNMaXN0KCkudGhlbiggcmVzID0+IHt3eC5oaWRlTG9hZGluZygpO30pOyAgICBcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHt3eC5oaWRlTG9hZGluZygpO30pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5kYXRhO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3BlbkxlYWd1ZSgpe1xyXG4gICAgICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9JbmRleCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9pbmRleGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZvY3VzKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZvY3VzYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtSWQgPSBlLmRldGFpbC5mb3JtSWQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog6LCD5pW05YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgICAgc2V0U2hhcmVDb250ZW50KCBtYXRjaCApe1xyXG4gICAgICAgICAgaWYoIG1hdGNoLnN0YXR1cyA9PSAxIHx8IG1hdGNoLnN0YXR1cyA9PSAyIHx8IG1hdGNoLnN0YXR1cyA9PSAzIHx8IG1hdGNoLnN0YXR1cyA9PSA0ICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg6L+b6KGM5Lit77yaJHttYXRjaC5sZWFndWVfbmFtZX0gICR7bWF0Y2guaG9tZX0gICR7bWF0Y2guaG9tZV9zY29yZX0tJHttYXRjaC5hd2F5X3Njb3JlfSAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGAke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSAgJHttYXRjaC5ob21lX3Njb3JlfS0ke21hdGNoLmF3YXlfc2NvcmV9ICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAwICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBgJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMCApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+WPlua2iO+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTEgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvlvoXlrprvvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEyICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg5q+U6LWb6IWw5pap77yaJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMyApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+S4reaWre+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTQgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvmjqjov5/vvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDmlLbol48gKi9cclxuICAgICAgICBjb2xsZWN0KGluZGV4LGlkKXtcclxuXHJcbiAgICAgICAgICBpZiggdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgICl7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgLS0gO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Y+W5raI5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5YWz5rOo5LitJyxcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hDb2xsZWN0LFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICBtYXRjaF9pZCA6IGlkLFxyXG4gICAgICAgICAgICAgICAgICBmb3JtX2lkOnRoaXMuZm9ybUlkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YCxcclxuICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzICsrIDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aUtuiXj+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAnbGVhZ3VlLWNhbmNlbCc6KC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgICdsZWFndWUtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5wYWdlID0gMTtcclxuICAgICAgICB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5kYXRhID0gW107XHJcbiAgICAgICAgdGhpcy5sZWFndWVGaWx0ZSA9IGFyZ3NbMF07XHJcbiAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgfSxcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmui/h+W9k+WJjeeahGNhdGVfaWTojrflvpflr7nlupTnmoTnsbvliKvkuK3nmoTmlbDmja5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYXRlX2lkIOWvueW6lOeahOexu+WIq1xyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSDlr7nlupTliIbnsbvnmoTmlbDmja7lr7nosaFcclxuICAgICAqL1xyXG4gICAgZ2V0Q2F0ZU9iaihjYXRlX2lkKXtcclxuICAgICAgY2F0ZV9pZCA9IGNhdGVfaWQgKyBcIlwiO1xyXG4gICAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgIFwiMFwiOiB0aGlzLmppc2hpTGlzdCxcclxuICAgICAgICBcIjFcIjogdGhpcy5zYWlndW9MaXN0LFxyXG4gICAgICAgIFwiMlwiOiB0aGlzLnNhaWNoZW5nTGlzdCxcclxuICAgICAgICBcIjNcIjogdGhpcy5ndWFuemh1TGlzdCxcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIG9ialtjYXRlX2lkXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiDojrflj5blhbPms6jliJfooaggKi9cclxuICAgIGdldEZvY3VzTGlzdCgpe1xyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGguZm9jdXNMaXN0LGRhdGE6e3BhZ2U6IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnBhZ2V9LFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIGxpc3QubGVuZ3RoICYmICBsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsLm1hdGNoX3RpbWVfbWludXRlID0gdmFsLm1hdGNoX3RpbWUgJiYgdmFsLm1hdGNoX3RpbWUuc2xpY2UoMTAsMTYpO1xyXG4gICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VhbnpodUxpc3QuZGF0YSA9IHRoaXMuZ3VhbnpodUxpc3QuZGF0YS5jb25jYXQobGlzdClcclxuICAgICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSB0aGlzLmd1YW56aHVMaXN0LmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VhbnpodUxpc3QucGFnZSArKyA7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgZ2V0Q2xhc3NMaXN0KCApe1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgaWYoIHRoaXMubGVhZ3VlRmlsdGUgPT09IG51bGwgKXtcclxuICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcclxuICAgICAgICAgICAgcGFnZTogdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkucGFnZSxcclxuICAgICAgICAgICAgZGF0ZTogdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0ZVxyXG4gICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICB9ZWxzZXtcclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnBhZ2UsXHJcbiAgICAgICAgICAgIGRhdGU6IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGUsXHJcbiAgICAgICAgICAgIGxlYWd1ZV9pZDp0aGlzLmxlYWd1ZUZpbHRlLmpvaW4oJywnKVxyXG4gICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoTGlzdCxcclxuICAgICAgICAgICBkYXRhOmRhdGEsXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qIOWGheWuuei1i+WAvOWIsOWvueW6lOeahOWIl+ihqOS4reWOuyAqL1xyXG4gICAgICAgICAgICBpZiggbGlzdC5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgIGxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbC5tYXRjaF90aW1lX21pbnV0ZSA9IHZhbC5tYXRjaF90aW1lICYmIHZhbC5tYXRjaF90aW1lLnNsaWNlKDEwLDE2KTtcclxuICAgICAgICAgICAgICAgIH0gKTtcclxuICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YSA9IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGEuY29uY2F0KGxpc3QpO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnRvdGFsID0gcmVzLmRhdGEuZGF0YS5tZXRhLnRvdGFsO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnBhZ2UgKysgO1xyXG4gICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pLmNhdGNoKCBlID0+IHtcclxuICAgICAgICAgIC8vIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgICAgICAvLyB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICAgIC8vIHRoaXMuZ2V0Rm9jdXNUb3RhbCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVhdWdlTGlzdCgpe1xyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubGVhZ3VlTGlzdCxkYXRhOnt0eXBlIDogdGhpcy50eXBlLCBkYXRlOiB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKX0sXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgdGhpcy5sZWFndWVsaXN0ID0gbGlzdC5zbGljZSgxLDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZ3VlbGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHZhbC5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSApXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIGdldEZvY3VzVG90YWwoKXtcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLmZvY3VzTGlzdCxkYXRhOntwYWdlOiB0aGlzLnBhZ2V9LFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyA9IHJlcy5kYXRhLmRhdGEubWV0YS50b3RhbDtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgLyp0aGlzLmdldEJhbm5lcnMoKTsqL1xyXG4gICAgICB0aGlzLmppc2hpTGlzdC5kYXRlID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuc2FpZ3VvTGlzdC5kYXRlID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuc2FpY2hlbmdMaXN0LmRhdGUgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5zYWlndW9MaXN0LnN0YXJ0ID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIDYwNDgwMDAwMCkgKTtcclxuICAgICAgdGhpcy5zYWljaGVuZ0xpc3Quc3RhcnQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5zYWlndW9MaXN0LmVuZCA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLnNhaWNoZW5nTGlzdC5lbmQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgNjA0ODAwMDAwKSApO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgdGhpcy5nZXRGb2N1c1RvdGFsKCk7XHJcbiAgICB9IFxyXG5cclxuICAgIC8qIOmhtemdoumHjeaWsOaJk+W8gCAqL1xyXG4gICAgb25TaG93KCl7IFxyXG4gICAgICAvKiDmlbDmja7liJ3lp4vljJYgKi9cclxuXHJcbiAgICAgIC8vIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgIC8vIHRoaXMuZ2V0TGVhdWdlTGlzdCgpO1xyXG4gICAgICAvLyB0aGlzLmdldEZvY3VzVG90YWwoKTtcclxuICAgICAgXHJcbiAgICAgIHd4LnJlTGF1bmNoKHtcclxuICAgICAgICB1cmw6ICdwYWdlcy9pbmRleCdcclxuICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgICovXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgIC8vIOWIt+aWsOWujOWQjuWBnOatouWIt+aWsFxyXG4gICAgICB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5wYWdlID0gMTtcclxuICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YSA9IFtdO1xyXG4gICAgICBpZiggdGhpcy50eXBlID09IDMgKXtcclxuICAgICAgICB0aGlzLmdldEZvY3VzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgICB9KSBcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyog5LiK5ouJ6Kem5bqVICovXHJcbiAgICBvblJlYWNoQm90dG9tKCl7XHJcbiAgICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgICAgICBpZiggdGhpcy50eXBlID09IDMgKXtcclxuICAgICAgICAgICAgICB0aGlzLmdldEZvY3VzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNVcEZyYXNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICAgIC8qIHRvZG866K6+572u6KaB5YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZUNvbnRlbnQsXHJcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=