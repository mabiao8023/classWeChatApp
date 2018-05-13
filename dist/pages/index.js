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
    navigationBarTitleText: '即时比分',
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
      total: '',
      league: null
    },
    jishiList: {
      page: 1,
      data: [],
      date: '',
      total: '',
      league: null
    },
    saichengList: {
      page: 1,
      data: [],
      date: '',
      start: '',
      end: '',
      total: '',
      league: null
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
          this.getLeaugeList();
        } else {
          this.getClassList().then(function (res) {
            wx.hideLoading();
          });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY2F0ZV9pZCIsIm9iaiIsImppc2hpTGlzdCIsInNhaWd1b0xpc3QiLCJzYWljaGVuZ0xpc3QiLCJndWFuemh1TGlzdCIsInJlcXVlc3QiLCJ1cmwiLCJmb2N1c0xpc3QiLCJkYXRhIiwicGFnZSIsImdldENhdGVPYmoiLCJ0eXBlIiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ0b2tlbiIsInRoZW4iLCJsaXN0IiwicmVzIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsIm1hdGNoX3RpbWVfbWludXRlIiwibWF0Y2hfdGltZSIsInNsaWNlIiwiY29uY2F0IiwibWF0Y2hMaXN0IiwiJGFwcGx5IiwibGVhZ3VlRmlsdGUiLCJkYXRlIiwibGVhZ3VlX2lkIiwiam9pbiIsInRvdGFsIiwibWV0YSIsImNhdGNoIiwibGVhZ3VlTGlzdCIsImdldE5vd0Zvcm1hdERhdGUiLCJsZWFndWVsaXN0IiwiY2hlY2tlZCIsInRvdGFsRm9jdXMiLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZW5kIiwiZ2V0Q2xhc3NMaXN0IiwiZ2V0TGVhdWdlTGlzdCIsImdldEZvY3VzVG90YWwiLCJnZXRGb2N1c0xpc3QiLCJ3eCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJpc1VwRnJhc2giLCJ0aXRsZSIsInNoYXJlQ29udGVudCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY29udGFjdCIsImZvb3RlciIsIkxlYXVnZSIsIkZvY3VzIiwibWl4aW5zIiwiaXNTaG93TGVhZ3VlIiwiZm9ybUlkIiwibGVhZ3VlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2FpR3VvRGF0ZUNoYW5nZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInNhaUNoZW5nRGF0ZUNoYW5nZSIsImNoaW9jZVR5cGUiLCJzaG93TG9hZGluZyIsImhpZGVMb2FkaW5nIiwib3BlbkxlYWd1ZSIsImdvdG9JbmRleCIsIm5hdmlnYXRlVG8iLCJnb3RvUmVzdWx0IiwiZ290b0ZldHVyZSIsImdvdG9Gb2N1cyIsImZvcm1TdWJtaXQiLCJzZXRTaGFyZUNvbnRlbnQiLCJtYXRjaCIsInN0YXR1cyIsImxlYWd1ZV9uYW1lIiwiaG9tZSIsImhvbWVfc2NvcmUiLCJhd2F5X3Njb3JlIiwiYXdheSIsImNvbGxlY3QiLCJpbmRleCIsImlkIiwiaXNfY29sbGVjdCIsIm1hdGNoQ29sbGVjdCIsIm1ldGhvZCIsIm1hdGNoX2lkIiwiY29uc29sZSIsImxvZyIsImZvcm1faWQiLCJldmVudHMiLCIkZXZlbnQiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUwyQztBQUNKO0FBQ0U7QUFDQTs7O0lBSXBCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzTm5COzs7OzsrQkFLV0MsTyxFQUFRO0FBQ2pCQSxnQkFBVUEsVUFBVSxFQUFwQjtBQUNBLFVBQUlDLE1BQU07QUFDUixhQUFLLEtBQUtDLFNBREY7QUFFUixhQUFLLEtBQUtDLFVBRkY7QUFHUixhQUFLLEtBQUtDLFlBSEY7QUFJUixhQUFLLEtBQUtDO0FBSkYsT0FBVjtBQU1BLGFBQU9KLElBQUlELE9BQUosQ0FBUDtBQUNEOztBQUVEOzs7O21DQUNjO0FBQUE7O0FBQ1gsYUFBTyxlQUFLTSxPQUFMLENBQWEsRUFBQ0MsS0FBSSxpQkFBUUMsU0FBYixFQUF1QkMsTUFBSyxFQUFDQyxNQUFNLEtBQUtDLFVBQUwsQ0FBZ0IsS0FBS0MsSUFBckIsRUFBMkJGLElBQWxDLEVBQTVCO0FBQ2hCRyxnQkFBUTtBQUNMLGdDQUFv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QUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsS0FEdkM7QUFFTCw0QkFBZ0I7QUFGWCxXQU5FLEVBQWIsRUFVQ0MsSUFWRCxDQVVPLGVBQU87QUFDVmdDLGFBQUdrQyxXQUFIO0FBQ0EsaUJBQUt4RCxTQUFMLENBQWV5RSxLQUFmLEVBQXNCRSxVQUF0QixHQUFtQyxJQUFuQztBQUNBLGlCQUFLOUQsVUFBTDtBQUNBLGlCQUFLWixNQUFMO0FBQ0E4RSxrQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDSCxTQWhCRDtBQWlCSDtBQUVGO0FBNUhLLEc7T0ErSFZFLE0sR0FBUztBQUNQLHFCQUFnQix3QkFBYTtBQUN6QixhQUFLdEMsWUFBTCxHQUFvQixLQUFwQjtBQUNILEtBSE07QUFJUCxtQkFBZSxzQkFBYTtBQUMxQixhQUFLQSxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsYUFBSzVELFVBQUwsQ0FBZ0IsT0FBS0MsSUFBckIsRUFBMkJGLElBQTNCLEdBQWtDLENBQWxDO0FBQ0EsYUFBS0MsVUFBTCxDQUFnQixPQUFLQyxJQUFyQixFQUEyQkgsSUFBM0IsR0FBa0MsRUFBbEM7QUFDQSxhQUFLb0IsV0FBTDtBQUNBLGFBQUtnQixZQUFMO0FBQ0QsS0FWTTtBQVdQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUlpRSxrQkFBYyxVQUFLMUYsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FzRixjQUFRQyxHQUFSLENBQWUsT0FBS0ksS0FBcEIsaUJBQXFDRCxPQUFPRSxJQUE1QyxjQUF5REYsT0FBT0csTUFBUCxDQUFjRixLQUF2RTtBQUNELEtBZE0sRTs7O2tCQXJNVWhILEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IEZvY3VzIGZyb20gJ0AvY29tcG9uZW50cy9mb2N1cycgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBMZWF1Z2UgZnJvbSAnQC9jb21wb25lbnRzL2xlYXVnZScgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBGb290ZXIgZnJvbSAnQC9jb21wb25lbnRzL2Zvb3RlcicgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WNs+aXtuavlOWIhicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJMZWF1Z2VcIjp7XCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJsZWFndWVsaXN0XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgY29udGFjdDpDb250YWN0LFxyXG4gICAgICBmb290ZXI6Rm9vdGVyLFxyXG4gICAgICBMZWF1Z2UsXHJcbiAgICAgIEZvY3VzXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW215TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgLyogMCAtPiDljbPml7YgIDEgLT4g6LWb5p6cICAyIC0+IOi1m+eoiyAgMyAtPiDlhbPms6gqL1xyXG4gICAgICB0eXBlOiAwLCAgXHJcbiAgICAgIGlzVXBGcmFzaDpmYWxzZSxcclxuICAgICAgc2hhcmVDb250ZW50OifotrPnkIPljbPml7bmr5TliIYnLFxyXG4gICAgICB0b3RhbEZvY3VzOiAwLFxyXG4gICAgICBpc1Nob3dMZWFndWU6ZmFsc2UsXHJcbiAgICAgIGxlYWd1ZUZpbHRlOm51bGwsXHJcbiAgICAgIGRhdGU6ICcnLFxyXG4gICAgICBmb3JtSWQ6JycsXHJcblxyXG4gICAgICBwYWdlOjEsXHJcbiAgICAgIG1hdGNoTGlzdDpbXSxcclxuICAgICAgbGVhZ3VlbGlzdDpbXSxcclxuICAgICAgc2FpZ3VvTGlzdDp7XHJcbiAgICAgICAgcGFnZToxLFxyXG4gICAgICAgIGRhdGE6W10sXHJcbiAgICAgICAgZGF0ZTonJyxcclxuICAgICAgICBzdGFydDonJyxcclxuICAgICAgICBlbmQ6JycsXHJcbiAgICAgICAgdG90YWw6JycsXHJcbiAgICAgICAgbGVhZ3VlOm51bGxcclxuICAgICAgfSxcclxuICAgICAgamlzaGlMaXN0OntcclxuICAgICAgICBwYWdlOjEsXHJcbiAgICAgICAgZGF0YTpbXSxcclxuICAgICAgICBkYXRlOicnLFxyXG4gICAgICAgIHRvdGFsOicnLFxyXG4gICAgICAgIGxlYWd1ZTpudWxsXHJcbiAgICAgIH0sXHJcbiAgICAgIHNhaWNoZW5nTGlzdDp7XHJcbiAgICAgICAgcGFnZToxLFxyXG4gICAgICAgIGRhdGE6W10sXHJcbiAgICAgICAgZGF0ZTonJyxcclxuICAgICAgICBzdGFydDonJyxcclxuICAgICAgICBlbmQ6JycsXHJcbiAgICAgICAgdG90YWw6JycsXHJcbiAgICAgICAgbGVhZ3VlOm51bGxcclxuICAgICAgfSxcclxuICAgICAgZ3VhbnpodUxpc3Q6e1xyXG4gICAgICAgIHBhZ2U6MSxcclxuICAgICAgICBkYXRhOltdLFxyXG4gICAgICAgIHRvdGFsOicnXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2FpR3VvRGF0ZUNoYW5nZShlKXtcclxuICAgICAgICAgICAgdGhpcy5zYWlndW9MaXN0LmRhdGUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zYWlndW9MaXN0LnBhZ2UgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnNhaWd1b0xpc3QuZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNhaUNoZW5nRGF0ZUNoYW5nZShlKXtcclxuICAgICAgICAgICAgdGhpcy5zYWljaGVuZ0xpc3QuZGF0ZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNhaWNoZW5nTGlzdC5wYWdlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zYWljaGVuZ0xpc3QuZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoaW9jZVR5cGUoIHR5cGUgKXtcclxuICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICB0aGlzLmxlYWd1ZUZpbHRlID0gbnVsbDsgIFxyXG4gICAgICAgICAgLyog5b2T5b2T5YmN5YiX6KGo5Li656m655qE5pe25YCZ5Y676K+35rGCICovXHJcbiAgICAgICAgICBpZiggdGhpcy5nZXRDYXRlT2JqKHR5cGUpLmRhdGEubGVuZ3RoIDw9IDAgKXtcclxuICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgaWYoIHRoaXMudHlwZSA9PSAzICl7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5nZXRGb2N1c0xpc3QoKS50aGVuKCByZXMgPT4ge3d4LmhpZGVMb2FkaW5nKCk7fSk7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpLnRoZW4oIHJlcyA9PiB7d3guaGlkZUxvYWRpbmcoKTt9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wZW5MZWFndWUoKXtcclxuICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvSW5kZXgoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvaW5kZXhgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b1Jlc3VsdCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9yZXN1bHRgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZldHVyZSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mZWF0dXJlYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9Gb2N1cygpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mb2N1c2BcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUlkID0gZS5kZXRhaWwuZm9ybUlkO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOiwg+aVtOWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICAgIHNldFNoYXJlQ29udGVudCggbWF0Y2ggKXtcclxuICAgICAgICAgIGlmKCBtYXRjaC5zdGF0dXMgPT0gMSB8fCBtYXRjaC5zdGF0dXMgPT0gMiB8fCBtYXRjaC5zdGF0dXMgPT0gMyB8fCBtYXRjaC5zdGF0dXMgPT0gNCApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOi/m+ihjOS4re+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICAke21hdGNoLmhvbWV9ICAke21hdGNoLmhvbWVfc2NvcmV9LSR7bWF0Y2guYXdheV9zY29yZX0gJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBgJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gICR7bWF0Y2guaG9tZV9zY29yZX0tJHttYXRjaC5hd2F5X3Njb3JlfSAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gMCApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYCR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTAgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvlj5bmtojvvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTExICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg5q+U6LWb5b6F5a6a77yaJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMiApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+iFsOaWqe+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTMgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvkuK3mlq3vvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTE0ICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg5q+U6LWb5o6o6L+f77yaJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog5pS26JePICovXHJcbiAgICAgICAgY29sbGVjdChpbmRleCxpZCl7XHJcblxyXG4gICAgICAgICAgaWYoIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ICApe1xyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICflj5bmtojkuK0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hDb2xsZWN0LFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7bWF0Y2hfaWQgOiBpZH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gLFxyXG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzIC0tIDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPlua2iOaUtuiXj+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WFs+azqOS4rScsXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoQ29sbGVjdCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgbWF0Y2hfaWQgOiBpZCxcclxuICAgICAgICAgICAgICAgICAgZm9ybV9pZDp0aGlzLmZvcm1JZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyArKyA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2xlYWd1ZS1jYW5jZWwnOiguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgICAnbGVhZ3VlLWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkucGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YSA9IFtdO1xyXG4gICAgICAgIHRoaXMubGVhZ3VlRmlsdGUgPSBhcmdzWzBdO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4flvZPliY3nmoRjYXRlX2lk6I635b6X5a+55bqU55qE57G75Yir5Lit55qE5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2F0ZV9pZCDlr7nlupTnmoTnsbvliKtcclxuICAgICAqIEByZXR1cm4ge29iamVjdH0g5a+55bqU5YiG57G755qE5pWw5o2u5a+56LGhXHJcbiAgICAgKi9cclxuICAgIGdldENhdGVPYmooY2F0ZV9pZCl7XHJcbiAgICAgIGNhdGVfaWQgPSBjYXRlX2lkICsgXCJcIjtcclxuICAgICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBcIjBcIjogdGhpcy5qaXNoaUxpc3QsXHJcbiAgICAgICAgXCIxXCI6IHRoaXMuc2FpZ3VvTGlzdCxcclxuICAgICAgICBcIjJcIjogdGhpcy5zYWljaGVuZ0xpc3QsXHJcbiAgICAgICAgXCIzXCI6IHRoaXMuZ3VhbnpodUxpc3QsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBvYmpbY2F0ZV9pZF07XHJcbiAgICB9XHJcblxyXG4gICAgLyog6I635Y+W5YWz5rOo5YiX6KGoICovXHJcbiAgICBnZXRGb2N1c0xpc3QoKXtcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLmZvY3VzTGlzdCxkYXRhOntwYWdlOiB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5wYWdlfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICBsaXN0Lmxlbmd0aCAmJiAgbGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHZhbC5tYXRjaF90aW1lX21pbnV0ZSA9IHZhbC5tYXRjaF90aW1lICYmIHZhbC5tYXRjaF90aW1lLnNsaWNlKDEwLDE2KTtcclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICB0aGlzLmd1YW56aHVMaXN0LmRhdGEgPSB0aGlzLmd1YW56aHVMaXN0LmRhdGEuY29uY2F0KGxpc3QpXHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gdGhpcy5ndWFuemh1TGlzdC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmd1YW56aHVMaXN0LnBhZ2UgKysgO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W6K++56iL5YiX6KGoXHJcbiAgICBcclxuICAgIGdldENsYXNzTGlzdCggKXtcclxuICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgIGlmKCB0aGlzLmxlYWd1ZUZpbHRlID09PSBudWxsICl7XHJcbiAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnBhZ2UsXHJcbiAgICAgICAgICAgIGRhdGU6IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGVcclxuICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBwYWdlOiB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5wYWdlLFxyXG4gICAgICAgICAgICBkYXRlOiB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5kYXRlLFxyXG4gICAgICAgICAgICBsZWFndWVfaWQ6dGhpcy5sZWFndWVGaWx0ZS5qb2luKCcsJylcclxuICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaExpc3QsXHJcbiAgICAgICAgICAgZGF0YTpkYXRhLFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvKiDlhoXlrrnotYvlgLzliLDlr7nlupTnmoTliJfooajkuK3ljrsgKi9cclxuICAgICAgICAgICAgaWYoIGxpc3QubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICAgICBsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwubWF0Y2hfdGltZV9taW51dGUgPSB2YWwubWF0Y2hfdGltZSAmJiB2YWwubWF0Y2hfdGltZS5zbGljZSgxMCwxNik7XHJcbiAgICAgICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGEgPSB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5kYXRhLmNvbmNhdChsaXN0KTtcclxuICAgICAgICAgICAgICB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS50b3RhbCA9IHJlcy5kYXRhLmRhdGEubWV0YS50b3RhbDtcclxuICAgICAgICAgICAgICB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5wYWdlICsrIDtcclxuICAgICAgICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGE7XHJcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KS5jYXRjaCggZSA9PiB7XHJcbiAgICAgICAgICAvLyB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICAgICAgLy8gdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgICAgICAvLyB0aGlzLmdldEZvY3VzVG90YWwoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldExlYXVnZUxpc3QoKXtcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLmxlYWd1ZUxpc3QsZGF0YTp7dHlwZSA6IHRoaXMudHlwZSwgZGF0ZTogdGhpcy5nZXROb3dGb3JtYXREYXRlKCl9LFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZ3VlbGlzdCA9IGxpc3Quc2xpY2UoMSwxMDApO1xyXG4gICAgICAgICAgICB0aGlzLmxlYWd1ZWxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICB2YWwuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBnZXRGb2N1c1RvdGFsKCl7XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5mb2N1c0xpc3QsZGF0YTp7cGFnZTogdGhpcy5wYWdlfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgPSByZXMuZGF0YS5kYXRhLm1ldGEudG90YWw7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIC8qdGhpcy5nZXRCYW5uZXJzKCk7Ki9cclxuICAgICAgdGhpcy5qaXNoaUxpc3QuZGF0ZSA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLnNhaWd1b0xpc3QuZGF0ZSA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLnNhaWNoZW5nTGlzdC5kYXRlID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuc2FpZ3VvTGlzdC5zdGFydCA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSggbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgLSA2MDQ4MDAwMDApICk7XHJcbiAgICAgIHRoaXMuc2FpY2hlbmdMaXN0LnN0YXJ0ID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuc2FpZ3VvTGlzdC5lbmQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5zYWljaGVuZ0xpc3QuZW5kID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDYwNDgwMDAwMCkgKTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0Rm9jdXNUb3RhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgICovXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgIC8vIOWIt+aWsOWujOWQjuWBnOatouWIt+aWsFxyXG4gICAgICB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5wYWdlID0gMTtcclxuICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YSA9IFtdO1xyXG4gICAgICBpZiggdGhpcy50eXBlID09IDMgKXtcclxuICAgICAgICB0aGlzLmdldEZvY3VzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgICB9KSBcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyog5LiK5ouJ6Kem5bqVICovXHJcbiAgICBvblJlYWNoQm90dG9tKCl7XHJcbiAgICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgICAgICBpZiggdGhpcy50eXBlID09IDMgKXtcclxuICAgICAgICAgICAgICB0aGlzLmdldEZvY3VzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNVcEZyYXNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICAgIC8qIHRvZG866K6+572u6KaB5YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZUNvbnRlbnQsXHJcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=