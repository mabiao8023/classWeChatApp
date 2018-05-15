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
        if (list.length > 0) {
          list.forEach(function (val) {
            val.match_time_minute = val.match_time && val.match_time.slice(10, 16);
          });
          _this2.guanzhuList.data = _this2.guanzhuList.data.concat(list);
          _this2.matchList = _this2.guanzhuList.data;
          _this2.guanzhuList.page++;
          _this2.$apply();
        }
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
      wx.showLoading({
        title: '获取中'
      });
      this.getClassList().then(function (res) {
        wx.hideLoading();
      });
      this.getLeaugeList();
      this.getFocusTotal();
    }

    /* 页面重新打开 */

  }, {
    key: 'onShow',
    value: function onShow() {
      /* 数据初始化 */
      wx.showLoading({
        title: '获取中'
      });
      this.getCateObj(this.type).page = 1;
      this.getCateObj(this.type).data = [];
      this.matchList = [];
      if (this.type == 3) {
        this.getFocusList().then(function (res) {
          wx.hideLoading();
        });
      } else {
        this.getClassList().then(function (res) {
          wx.hideLoading();
        });
      }
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
  this.$props = { "contact": { "xmlns:wx": "" }, "Leauge": { "v-bind:list.sync": "leaguelist" } };
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
    },
    isShowLeagueBtn: true

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

        if (this.type == 3) {
          // this.getFocusList().then( res => {wx.hideLoading();});    
        } else {
          wx.showLoading({
            title: '加载中'
          });
          this.getClassList().then(function (res) {
            wx.hideLoading();
          });
          this.getLeaugeList();
        }
      }
      /* 每次去调联赛信息 */
      if (this.type != 3) {
        this.isShowLeagueBtn = true;
        this.getLeaugeList();
      } else {
        /* 每次请求关注的数据 */
        wx.showLoading({
          title: '加载中'
        });
        this.getFocusList().then(function (res) {
          wx.hideLoading();
        });
        this.isShowLeagueBtn = false;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY2F0ZV9pZCIsIm9iaiIsImppc2hpTGlzdCIsInNhaWd1b0xpc3QiLCJzYWljaGVuZ0xpc3QiLCJndWFuemh1TGlzdCIsInJlcXVlc3QiLCJ1cmwiLCJmb2N1c0xpc3QiLCJkYXRhIiwicGFnZSIsImdldENhdGVPYmoiLCJ0eXBlIiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ0b2tlbiIsInRoZW4iLCJsaXN0IiwicmVzIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsIm1hdGNoX3RpbWVfbWludXRlIiwibWF0Y2hfdGltZSIsInNsaWNlIiwiY29uY2F0IiwibWF0Y2hMaXN0IiwiJGFwcGx5IiwibGVhZ3VlRmlsdGUiLCJkYXRlIiwibGVhZ3VlX2lkIiwiam9pbiIsInRvdGFsIiwibWV0YSIsImNhdGNoIiwibGVhZ3VlTGlzdCIsImdldE5vd0Zvcm1hdERhdGUiLCJsZWFndWVsaXN0IiwiY2hlY2tlZCIsInRvdGFsRm9jdXMiLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZW5kIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwiZ2V0Q2xhc3NMaXN0IiwiaGlkZUxvYWRpbmciLCJnZXRMZWF1Z2VMaXN0IiwiZ2V0Rm9jdXNUb3RhbCIsImdldEZvY3VzTGlzdCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJpc1VwRnJhc2giLCJzaGFyZUNvbnRlbnQiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJmb290ZXIiLCJMZWF1Z2UiLCJGb2N1cyIsIm1peGlucyIsImlzU2hvd0xlYWd1ZSIsImZvcm1JZCIsImlzU2hvd0xlYWd1ZUJ0biIsImNvbXB1dGVkIiwibWV0aG9kcyIsInNhaUd1b0RhdGVDaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzYWlDaGVuZ0RhdGVDaGFuZ2UiLCJjaGlvY2VUeXBlIiwib3BlbkxlYWd1ZSIsImdvdG9JbmRleCIsIm5hdmlnYXRlVG8iLCJnb3RvUmVzdWx0IiwiZ290b0ZldHVyZSIsImdvdG9Gb2N1cyIsImZvcm1TdWJtaXQiLCJzZXRTaGFyZUNvbnRlbnQiLCJtYXRjaCIsInN0YXR1cyIsImxlYWd1ZV9uYW1lIiwiaG9tZSIsImhvbWVfc2NvcmUiLCJhd2F5X3Njb3JlIiwiYXdheSIsImNvbGxlY3QiLCJpbmRleCIsImlkIiwiaXNfY29sbGVjdCIsIm1hdGNoQ29sbGVjdCIsIm1ldGhvZCIsIm1hdGNoX2lkIiwiY29uc29sZSIsImxvZyIsImZvcm1faWQiLCJldmVudHMiLCIkZXZlbnQiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUwyQztBQUNKO0FBQ0U7QUFDQTs7O0lBSXBCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrT25COzs7OzsrQkFLV0MsTyxFQUFRO0FBQ2pCQSxnQkFBVUEsVUFBVSxFQUFwQjtBQUNBLFVBQUlDLE1BQU07QUFDUixhQUFLLEtBQUtDLFNBREY7QUFFUixhQUFLLEtBQUtDLFVBRkY7QUFHUixhQUFLLEtBQUtDLFlBSEY7QUFJUixhQUFLLEtBQUtDO0FBSkYsT0FBVjtBQU1BLGFBQU9KLElBQUlELE9BQUosQ0FBUDtBQUNEOztBQUVEOzs7O21DQUNjO0FBQUE7O0FBQ1gsYUFBTyxlQUFLTSxPQUFMLENBQWEsRUFBQ0MsS0FBSSxpQkFBUUMsU0FBYixFQUF1QkMsTUFBSyxFQUFDQyxNQUFNLEtBQUtDLFVBQUwsQ0FBZ0IsS0FBS0MsSUFBckIsRUFBMkJGLElBQWxDLEVBQTVCO0FBQ2hCRyxnQkFBUTtB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QXNCRSxVQUF0QixHQUFtQyxJQUFuQztBQUNBLGlCQUFLOUQsVUFBTDtBQUNBLGlCQUFLWixNQUFMO0FBQ0E4RSxrQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDSCxTQWhCRDtBQWlCSDtBQUVGO0FBMUlLLEc7T0E2SVZFLE0sR0FBUztBQUNQLHFCQUFnQix3QkFBYTtBQUN6QixhQUFLcEMsWUFBTCxHQUFvQixLQUFwQjtBQUNILEtBSE07QUFJUCxtQkFBZSxzQkFBYTtBQUMxQixhQUFLQSxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsYUFBSzlELFVBQUwsQ0FBZ0IsT0FBS0MsSUFBckIsRUFBMkJGLElBQTNCLEdBQWtDLENBQWxDO0FBQ0EsYUFBS0MsVUFBTCxDQUFnQixPQUFLQyxJQUFyQixFQUEyQkgsSUFBM0IsR0FBa0MsRUFBbEM7QUFDQSxhQUFLb0IsV0FBTDtBQUNBLGFBQUttQixZQUFMO0FBQ0QsS0FWTTtBQVdQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUk4RCxrQkFBYyxVQUFLMUYsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FzRixjQUFRQyxHQUFSLENBQWUsT0FBS0ksS0FBcEIsaUJBQXFDRCxPQUFPRSxJQUE1QyxjQUF5REYsT0FBT0csTUFBUCxDQUFjRixLQUF2RTtBQUNELEtBZE0sRTs7O2tCQWpOVWhILEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IEZvY3VzIGZyb20gJ0AvY29tcG9uZW50cy9mb2N1cycgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBMZWF1Z2UgZnJvbSAnQC9jb21wb25lbnRzL2xlYXVnZScgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBGb290ZXIgZnJvbSAnQC9jb21wb25lbnRzL2Zvb3RlcicgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i2s+eQg+i1m+S6i+avlOWIhicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJjb250YWN0XCI6e1wieG1sbnM6d3hcIjpcIlwifSxcIkxlYXVnZVwiOntcInYtYmluZDpsaXN0LnN5bmNcIjpcImxlYWd1ZWxpc3RcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3QsXHJcbiAgICAgIGZvb3RlcjpGb290ZXIsXHJcbiAgICAgIExlYXVnZSxcclxuICAgICAgRm9jdXNcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAvKiAwIC0+IOWNs+aXtiAgMSAtPiDotZvmnpwgIDIgLT4g6LWb56iLICAzIC0+IOWFs+azqCovXHJcbiAgICAgIHR5cGU6IDAsICBcclxuICAgICAgaXNVcEZyYXNoOmZhbHNlLFxyXG4gICAgICBzaGFyZUNvbnRlbnQ6J+i2s+eQg+WNs+aXtuavlOWIhicsXHJcbiAgICAgIHRvdGFsRm9jdXM6IDAsXHJcbiAgICAgIGlzU2hvd0xlYWd1ZTpmYWxzZSxcclxuICAgICAgbGVhZ3VlRmlsdGU6bnVsbCxcclxuICAgICAgZGF0ZTogJycsXHJcbiAgICAgIGZvcm1JZDonJyxcclxuXHJcbiAgICAgIHBhZ2U6MSxcclxuICAgICAgbWF0Y2hMaXN0OltdLFxyXG4gICAgICBsZWFndWVsaXN0OltdLFxyXG4gICAgICBzYWlndW9MaXN0OntcclxuICAgICAgICBwYWdlOjEsXHJcbiAgICAgICAgZGF0YTpbXSxcclxuICAgICAgICBkYXRlOicnLFxyXG4gICAgICAgIHN0YXJ0OicnLFxyXG4gICAgICAgIGVuZDonJyxcclxuICAgICAgICB0b3RhbDonJyxcclxuICAgICAgfSxcclxuICAgICAgamlzaGlMaXN0OntcclxuICAgICAgICBwYWdlOjEsXHJcbiAgICAgICAgZGF0YTpbXSxcclxuICAgICAgICBkYXRlOicnLFxyXG4gICAgICAgIHRvdGFsOicnLFxyXG4gICAgICB9LFxyXG4gICAgICBzYWljaGVuZ0xpc3Q6e1xyXG4gICAgICAgIHBhZ2U6MSxcclxuICAgICAgICBkYXRhOltdLFxyXG4gICAgICAgIGRhdGU6JycsXHJcbiAgICAgICAgc3RhcnQ6JycsXHJcbiAgICAgICAgZW5kOicnLFxyXG4gICAgICAgIHRvdGFsOicnLFxyXG4gICAgICB9LFxyXG4gICAgICBndWFuemh1TGlzdDp7XHJcbiAgICAgICAgcGFnZToxLFxyXG4gICAgICAgIGRhdGE6W10sXHJcbiAgICAgICAgdG90YWw6JydcclxuICAgICAgfSxcclxuICAgICAgaXNTaG93TGVhZ3VlQnRuOnRydWVcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2FpR3VvRGF0ZUNoYW5nZShlKXtcclxuICAgICAgICAgICAgdGhpcy5zYWlndW9MaXN0LmRhdGUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zYWlndW9MaXN0LnBhZ2UgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnNhaWd1b0xpc3QuZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNhaUNoZW5nRGF0ZUNoYW5nZShlKXtcclxuICAgICAgICAgICAgdGhpcy5zYWljaGVuZ0xpc3QuZGF0ZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNhaWNoZW5nTGlzdC5wYWdlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zYWljaGVuZ0xpc3QuZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoaW9jZVR5cGUoIHR5cGUgKXtcclxuICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICB0aGlzLmxlYWd1ZUZpbHRlID0gbnVsbDsgIFxyXG4gICAgICAgICAgLyog5b2T5b2T5YmN5YiX6KGo5Li656m655qE5pe25YCZ5Y676K+35rGCICovXHJcbiAgICAgICAgICBpZiggdGhpcy5nZXRDYXRlT2JqKHR5cGUpLmRhdGEubGVuZ3RoIDw9IDAgKXtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBpZiggdGhpcy50eXBlID09IDMgKXtcclxuICAgICAgICAgICAgICAgICAvLyB0aGlzLmdldEZvY3VzTGlzdCgpLnRoZW4oIHJlcyA9PiB7d3guaGlkZUxvYWRpbmcoKTt9KTsgICAgXHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge3d4LmhpZGVMb2FkaW5nKCk7fSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvKiDmr4/mrKHljrvosIPogZTotZvkv6Hmga8gKi9cclxuICAgICAgICAgIGlmKCB0aGlzLnR5cGUgIT0gMyApe1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZUJ0biA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TGVhdWdlTGlzdCgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8qIOavj+asoeivt+axguWFs+azqOeahOaVsOaNriAqL1xyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Rm9jdXNMaXN0KCkudGhlbiggcmVzID0+IHt3eC5oaWRlTG9hZGluZygpfSApO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZUJ0biA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcGVuTGVhZ3VlKCl7XHJcbiAgICAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0luZGV4KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2luZGV4YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9SZXN1bHQoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvcmVzdWx0YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9GZXR1cmUoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvZmVhdHVyZWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRm9jdXMoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvZm9jdXNgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1JZCA9IGUuZGV0YWlsLmZvcm1JZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDosIPmlbTliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgICBzZXRTaGFyZUNvbnRlbnQoIG1hdGNoICl7XHJcbiAgICAgICAgICBpZiggbWF0Y2guc3RhdHVzID09IDEgfHwgbWF0Y2guc3RhdHVzID09IDIgfHwgbWF0Y2guc3RhdHVzID09IDMgfHwgbWF0Y2guc3RhdHVzID09IDQgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDov5vooYzkuK3vvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAgJHttYXRjaC5ob21lfSAgJHttYXRjaC5ob21lX3Njb3JlfS0ke21hdGNoLmF3YXlfc2NvcmV9ICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMSApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYCR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9ICAke21hdGNoLmhvbWVfc2NvcmV9LSR7bWF0Y2guYXdheV9zY29yZX0gJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IDAgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGAke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEwICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg5q+U6LWb5Y+W5raI77yaJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMSApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+W+heWumu+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTIgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvohbDmlqnvvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEzICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg5q+U6LWb5Lit5pat77yaJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xNCApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+aOqOi/n++8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOaUtuiXjyAqL1xyXG4gICAgICAgIGNvbGxlY3QoaW5kZXgsaWQpe1xyXG5cclxuICAgICAgICAgIGlmKCB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCAgKXtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5Y+W5raI5LitJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoQ29sbGVjdCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6e21hdGNoX2lkIDogaWR9LFxyXG4gICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YCxcclxuICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyAtLSA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflj5bmtojmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICflhbPms6jkuK0nLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgIG1hdGNoX2lkIDogaWQsXHJcbiAgICAgICAgICAgICAgICAgIGZvcm1faWQ6dGhpcy5mb3JtSWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gLFxyXG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgKysgO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICdsZWFndWUtY2FuY2VsJzooLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgJ2xlYWd1ZS1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGEgPSBbXTtcclxuICAgICAgICB0aGlzLmxlYWd1ZUZpbHRlID0gYXJnc1swXTtcclxuICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICB9LFxyXG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H5b2T5YmN55qEY2F0ZV9pZOiOt+W+l+WvueW6lOeahOexu+WIq+S4reeahOaVsOaNrlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNhdGVfaWQg5a+55bqU55qE57G75YirXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IOWvueW6lOWIhuexu+eahOaVsOaNruWvueixoVxyXG4gICAgICovXHJcbiAgICBnZXRDYXRlT2JqKGNhdGVfaWQpe1xyXG4gICAgICBjYXRlX2lkID0gY2F0ZV9pZCArIFwiXCI7XHJcbiAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgXCIwXCI6IHRoaXMuamlzaGlMaXN0LFxyXG4gICAgICAgIFwiMVwiOiB0aGlzLnNhaWd1b0xpc3QsXHJcbiAgICAgICAgXCIyXCI6IHRoaXMuc2FpY2hlbmdMaXN0LFxyXG4gICAgICAgIFwiM1wiOiB0aGlzLmd1YW56aHVMaXN0LFxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gb2JqW2NhdGVfaWRdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIOiOt+WPluWFs+azqOWIl+ihqCAqL1xyXG4gICAgZ2V0Rm9jdXNMaXN0KCl7XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5mb2N1c0xpc3QsZGF0YTp7cGFnZTogdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkucGFnZX0sXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgaWYoIGxpc3QubGVuZ3RoID4gIDAgKXtcclxuICAgICAgICAgICAgICAgIGxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICAgICAgdmFsLm1hdGNoX3RpbWVfbWludXRlID0gdmFsLm1hdGNoX3RpbWUgJiYgdmFsLm1hdGNoX3RpbWUuc2xpY2UoMTAsMTYpO1xyXG4gICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ndWFuemh1TGlzdC5kYXRhID0gdGhpcy5ndWFuemh1TGlzdC5kYXRhLmNvbmNhdChsaXN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSB0aGlzLmd1YW56aHVMaXN0LmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmd1YW56aHVMaXN0LnBhZ2UgKysgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgZ2V0Q2xhc3NMaXN0KCApe1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgaWYoIHRoaXMubGVhZ3VlRmlsdGUgPT09IG51bGwgKXtcclxuICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcclxuICAgICAgICAgICAgcGFnZTogdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkucGFnZSxcclxuICAgICAgICAgICAgZGF0ZTogdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0ZVxyXG4gICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICB9ZWxzZXtcclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnBhZ2UsXHJcbiAgICAgICAgICAgIGRhdGU6IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGUsXHJcbiAgICAgICAgICAgIGxlYWd1ZV9pZDp0aGlzLmxlYWd1ZUZpbHRlLmpvaW4oJywnKVxyXG4gICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoTGlzdCxcclxuICAgICAgICAgICBkYXRhOmRhdGEsXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qIOWGheWuuei1i+WAvOWIsOWvueW6lOeahOWIl+ihqOS4reWOuyAqL1xyXG4gICAgICAgICAgICBpZiggbGlzdC5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgIGxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbC5tYXRjaF90aW1lX21pbnV0ZSA9IHZhbC5tYXRjaF90aW1lICYmIHZhbC5tYXRjaF90aW1lLnNsaWNlKDEwLDE2KTtcclxuICAgICAgICAgICAgICAgIH0gKTtcclxuICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YSA9IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGEuY29uY2F0KGxpc3QpO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnRvdGFsID0gcmVzLmRhdGEuZGF0YS5tZXRhLnRvdGFsO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnBhZ2UgKysgO1xyXG4gICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pLmNhdGNoKCBlID0+IHtcclxuICAgICAgICAgIC8vIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgICAgICAvLyB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICAgIC8vIHRoaXMuZ2V0Rm9jdXNUb3RhbCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVhdWdlTGlzdCgpe1xyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubGVhZ3VlTGlzdCxkYXRhOnt0eXBlIDogdGhpcy50eXBlLCBkYXRlOiB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKX0sXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgdGhpcy5sZWFndWVsaXN0ID0gbGlzdC5zbGljZSgxLDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZ3VlbGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHZhbC5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSApXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIGdldEZvY3VzVG90YWwoKXtcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLmZvY3VzTGlzdCxkYXRhOntwYWdlOiB0aGlzLnBhZ2V9LFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyA9IHJlcy5kYXRhLmRhdGEubWV0YS50b3RhbDtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgLyp0aGlzLmdldEJhbm5lcnMoKTsqL1xyXG4gICAgICB0aGlzLmppc2hpTGlzdC5kYXRlID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuc2FpZ3VvTGlzdC5kYXRlID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuc2FpY2hlbmdMaXN0LmRhdGUgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5zYWlndW9MaXN0LnN0YXJ0ID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIDYwNDgwMDAwMCkgKTtcclxuICAgICAgdGhpcy5zYWljaGVuZ0xpc3Quc3RhcnQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5zYWlndW9MaXN0LmVuZCA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLnNhaWNoZW5nTGlzdC5lbmQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgNjA0ODAwMDAwKSApO1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgdGl0bGU6ICfojrflj5bkuK0nLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgIH0gKTtcclxuICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0Rm9jdXNUb3RhbCgpO1xyXG4gICAgfSBcclxuXHJcbiAgICAvKiDpobXpnaLph43mlrDmiZPlvIAgKi9cclxuICAgIG9uU2hvdygpeyBcclxuICAgICAgLyog5pWw5o2u5Yid5aeL5YyWICovXHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICB0aXRsZTogJ+iOt+WPluS4rScsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5wYWdlID0gMTtcclxuICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YSA9IFtdO1xyXG4gICAgICB0aGlzLm1hdGNoTGlzdCA9IFtdO1xyXG4gICAgICBpZiggdGhpcy50eXBlID09IDMgKXtcclxuICAgICAgICAgdGhpcy5nZXRGb2N1c0xpc3QoKS50aGVuKCByZXMgPT4ge3d4LmhpZGVMb2FkaW5nKCk7fSk7ICAgIFxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpLnRoZW4oIHJlcyA9PiB7d3guaGlkZUxvYWRpbmcoKTt9KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgdGhpcy5nZXRGb2N1c1RvdGFsKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgICovXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgIC8vIOWIt+aWsOWujOWQjuWBnOatouWIt+aWsFxyXG4gICAgICB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5wYWdlID0gMTtcclxuICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YSA9IFtdO1xyXG4gICAgICBpZiggdGhpcy50eXBlID09IDMgKXtcclxuICAgICAgICB0aGlzLmdldEZvY3VzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgICB9KSBcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyog5LiK5ouJ6Kem5bqVICovXHJcbiAgICBvblJlYWNoQm90dG9tKCl7XHJcbiAgICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgICAgICBpZiggdGhpcy50eXBlID09IDMgKXtcclxuICAgICAgICAgICAgICB0aGlzLmdldEZvY3VzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNVcEZyYXNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICAgIC8qIHRvZG866K6+572u6KaB5YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZUNvbnRlbnQsXHJcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=