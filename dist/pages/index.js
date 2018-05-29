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
          'Authorization': '' + this.token
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
          'Authorization': '' + this.token
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
          'Authorization': '' + this.token
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
          'Authorization': '' + this.token
        } }).then(function (res) {
        var list = res.data.data.list;
        _this5.totalFocus = res.data.data.meta.total;
        _this5.$apply();
      });
    }

    // 登录

  }, {
    key: 'login',
    value: function login() {
      var _this6 = this;

      var self = this;
      //登录态过期
      _wepy2.default.login().then(function (res) {
        if (res.code) {
          //发起网络请求
          _wepy2.default.request({
            url: _config2.default.login,
            method: 'GET',
            data: {
              login_type: 5,
              code: res.code
            }
          }).then(function (res) {
            _this6.token = res.data.data.token;
            wx.setStorageSync("token", res.data.data.token);

            wx.showLoading({
              title: '获取中'
            });
            _this6.getClassList().then(function (res) {
              wx.hideLoading();
            });
            _this6.getLeaugeList();
            _this6.getFocusTotal();
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
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
      try {
        this.token = wx.getStorageSync('token');
      } catch (e) {
        // Do something when catch error
        this.token = "";
      }
      if (!this.token) {
        this.login();
      } else {
        wx.showLoading({
          title: '获取中'
        });
        this.getClassList().then(function (res) {
          wx.hideLoading();
        });
        this.getLeaugeList();
        this.getFocusTotal();
      }
    }

    /* 页面重新打开 */

  }, {
    key: 'onShow',
    value: function onShow() {
      if (this.token) {
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
      var _this7 = this;

      this.isUpFrash = true;
      if (this.type == 3) {
        this.getFocusList().then(function (res) {
          _this7.isUpFrash = false;
          _this7.$apply();
        });
      } else {
        this.getClassList().then(function (res) {
          _this7.isUpFrash = false;
          _this7.$apply();
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
  var _this9 = this;

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
    isShowLeagueBtn: true,
    token: ''

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
      var _this8 = this;

      if (this.matchList[index].is_collect) {
        wx.showLoading({
          title: '取消中'
        });
        _wepy2.default.request({ url: _config2.default.matchCollect,
          method: 'DELETE',
          data: { match_id: id },
          header: {
            'Authorization': '' + this.token,
            'content-type': 'application/json'
          } }).then(function (res) {
          wx.hideLoading();
          _this8.matchList[index].is_collect = false;
          _this8.totalFocus--;
          _this8.$apply();
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
            'Authorization': '' + this.token,
            'content-type': 'application/json'
          } }).then(function (res) {
          wx.hideLoading();
          _this8.matchList[index].is_collect = true;
          _this8.totalFocus++;
          _this8.$apply();
          console.log('收藏成功');
        });
      }
    }
  };
  this.events = {
    'league-cancel': function leagueCancel() {
      _this9.isShowLeague = false;
    },
    'league-emit': function leagueEmit() {
      _this9.isShowLeague = false;
      _this9.getCateObj(_this9.type).page = 1;
      _this9.getCateObj(_this9.type).data = [];
      _this9.leagueFilte = arguments.length <= 0 ? undefined : arguments[0];
      _this9.getClassList();
    },
    'index-emit': function indexEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this9.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    } };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY2F0ZV9pZCIsIm9iaiIsImppc2hpTGlzdCIsInNhaWd1b0xpc3QiLCJzYWljaGVuZ0xpc3QiLCJndWFuemh1TGlzdCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiYXBpUGF0aCIsImZvY3VzTGlzdCIsImRhdGEiLCJwYWdlIiwiZ2V0Q2F0ZU9iaiIsInR5cGUiLCJoZWFkZXIiLCJ0b2tlbiIsInRoZW4iLCJsaXN0IiwicmVzIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsIm1hdGNoX3RpbWVfbWludXRlIiwibWF0Y2hfdGltZSIsInNsaWNlIiwiY29uY2F0IiwibWF0Y2hMaXN0IiwiJGFwcGx5IiwibGVhZ3VlRmlsdGUiLCJkYXRlIiwibGVhZ3VlX2lkIiwiam9pbiIsInRvdGFsIiwibWV0YSIsImNhdGNoIiwibGVhZ3VlTGlzdCIsImdldE5vd0Zvcm1hdERhdGUiLCJsZWFndWVsaXN0IiwiY2hlY2tlZCIsInRvdGFsRm9jdXMiLCJzZWxmIiwibG9naW4iLCJjb2RlIiwibWV0aG9kIiwibG9naW5fdHlwZSIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJzaG93TG9hZGluZyIsInRpdGxlIiwiZ2V0Q2xhc3NMaXN0IiwiaGlkZUxvYWRpbmciLCJnZXRMZWF1Z2VMaXN0IiwiZ2V0Rm9jdXNUb3RhbCIsImNvbnNvbGUiLCJsb2ciLCJlcnJNc2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZW5kIiwiZ2V0U3RvcmFnZVN5bmMiLCJlIiwiZ2V0Rm9jdXNMaXN0Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImlzVXBGcmFzaCIsInNoYXJlQ29udGVudCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIkNvbnRhY3QiLCJmb290ZXIiLCJGb290ZXIiLCJMZWF1Z2UiLCJGb2N1cyIsIm1peGlucyIsIm15TWl4aW4iLCJpc1Nob3dMZWFndWUiLCJmb3JtSWQiLCJpc1Nob3dMZWFndWVCdG4iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzYWlHdW9EYXRlQ2hhbmdlIiwiZGV0YWlsIiwidmFsdWUiLCJzYWlDaGVuZ0RhdGVDaGFuZ2UiLCJjaGlvY2VUeXBlIiwib3BlbkxlYWd1ZSIsImdvdG9JbmRleCIsIm5hdmlnYXRlVG8iLCJmb3JtU3VibWl0Iiwic2V0U2hhcmVDb250ZW50IiwibWF0Y2giLCJzdGF0dXMiLCJsZWFndWVfbmFtZSIsImhvbWUiLCJob21lX3Njb3JlIiwiYXdheV9zY29yZSIsImF3YXkiLCJjb2xsZWN0IiwiaW5kZXgiLCJpZCIsImlzX2NvbGxlY3QiLCJtYXRjaENvbGxlY3QiLCJtYXRjaF9pZCIsImZvcm1faWQiLCJldmVudHMiLCIkZXZlbnQiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUwyQztBQUNKO0FBQ0U7QUFDQTs7O0lBSXBCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvTm5COzs7OzsrQkFLV0MsTyxFQUFRO0FBQ2pCQSxnQkFBVUEsVUFBVSxFQUFwQjtBQUNBLFVBQUlDLE1BQU07QUFDUixhQUFLLEtBQUtDLFNBREY7QUFFUixhQUFLLEtBQUtDLFVBRkY7QUFHUixhQUFLLEtBQUtDLFlBSEY7QUFJUixhQUFLLEtBQUtDO0FBSkYsT0FBVjtBQU1BLGFBQU9KLElBQUlELE9BQUosQ0FBUDtBQUNEOztBQUVEOzs7O21DQUNjO0FBQUE7O0FBQ1gsYUFBT00sZUFBS0MsT0FBTCxDQUFhLEVBQUNDLEtBQUlDLGlCQUFRQyxTQUFiLEVBQXVCQyxNQUFLLEVBQUNDLE1B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QjtBQUNBLGFBQUsxRSxVQUFMLENBQWdCLE9BQUtDLElBQXJCLEVBQTJCRixJQUEzQixHQUFrQyxDQUFsQztBQUNBLGFBQUtDLFVBQUwsQ0FBZ0IsT0FBS0MsSUFBckIsRUFBMkJILElBQTNCLEdBQWtDLEVBQWxDO0FBQ0EsYUFBS2tCLFdBQUw7QUFDQSxhQUFLcUIsWUFBTDtBQUNELEtBVk07QUFXUCxrQkFBYyxxQkFBYTtBQUFBOztBQUN6QixVQUFJbUUsa0JBQWMsVUFBS2pHLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBa0MsY0FBUUMsR0FBUixDQUFlLE9BQUsrRCxLQUFwQixpQkFBcUNELE9BQU9FLElBQTVDLGNBQXlERixPQUFPRyxNQUFQLENBQWNGLEtBQXZFO0FBQ0QsS0FkTSxFOzs7a0JBbk1VdkgsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgRm9jdXMgZnJvbSAnQC9jb21wb25lbnRzL2ZvY3VzJyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IExlYXVnZSBmcm9tICdAL2NvbXBvbmVudHMvbGVhdWdlJyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IEZvb3RlciBmcm9tICdAL2NvbXBvbmVudHMvZm9vdGVyJyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6Laz55CD6LWb5LqL5q+U5YiGJyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNvbnRhY3RcIjp7XCJ4bWxuczp3eFwiOlwiXCJ9LFwiTGVhdWdlXCI6e1widi1iaW5kOmxpc3Quc3luY1wiOlwibGVhZ3VlbGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdCxcclxuICAgICAgZm9vdGVyOkZvb3RlcixcclxuICAgICAgTGVhdWdlLFxyXG4gICAgICBGb2N1c1xyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIC8qIDAgLT4g5Y2z5pe2ICAxIC0+IOi1m+aenCAgMiAtPiDotZvnqIsgIDMgLT4g5YWz5rOoKi9cclxuICAgICAgdHlwZTogMCwgIFxyXG4gICAgICBpc1VwRnJhc2g6ZmFsc2UsXHJcbiAgICAgIHNoYXJlQ29udGVudDon6Laz55CD5Y2z5pe25q+U5YiGJyxcclxuICAgICAgdG90YWxGb2N1czogMCxcclxuICAgICAgaXNTaG93TGVhZ3VlOmZhbHNlLFxyXG4gICAgICBsZWFndWVGaWx0ZTpudWxsLFxyXG4gICAgICBkYXRlOiAnJyxcclxuICAgICAgZm9ybUlkOicnLFxyXG5cclxuICAgICAgcGFnZToxLFxyXG4gICAgICBtYXRjaExpc3Q6W10sXHJcbiAgICAgIGxlYWd1ZWxpc3Q6W10sXHJcbiAgICAgIHNhaWd1b0xpc3Q6e1xyXG4gICAgICAgIHBhZ2U6MSxcclxuICAgICAgICBkYXRhOltdLFxyXG4gICAgICAgIGRhdGU6JycsXHJcbiAgICAgICAgc3RhcnQ6JycsXHJcbiAgICAgICAgZW5kOicnLFxyXG4gICAgICAgIHRvdGFsOicnLFxyXG4gICAgICB9LFxyXG4gICAgICBqaXNoaUxpc3Q6e1xyXG4gICAgICAgIHBhZ2U6MSxcclxuICAgICAgICBkYXRhOltdLFxyXG4gICAgICAgIGRhdGU6JycsXHJcbiAgICAgICAgdG90YWw6JycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHNhaWNoZW5nTGlzdDp7XHJcbiAgICAgICAgcGFnZToxLFxyXG4gICAgICAgIGRhdGE6W10sXHJcbiAgICAgICAgZGF0ZTonJyxcclxuICAgICAgICBzdGFydDonJyxcclxuICAgICAgICBlbmQ6JycsXHJcbiAgICAgICAgdG90YWw6JycsXHJcbiAgICAgIH0sXHJcbiAgICAgIGd1YW56aHVMaXN0OntcclxuICAgICAgICBwYWdlOjEsXHJcbiAgICAgICAgZGF0YTpbXSxcclxuICAgICAgICB0b3RhbDonJ1xyXG4gICAgICB9LFxyXG4gICAgICBpc1Nob3dMZWFndWVCdG46dHJ1ZSxcclxuICAgICAgdG9rZW46JydcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2FpR3VvRGF0ZUNoYW5nZShlKXtcclxuICAgICAgICAgICAgdGhpcy5zYWlndW9MaXN0LmRhdGUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zYWlndW9MaXN0LnBhZ2UgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnNhaWd1b0xpc3QuZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNhaUNoZW5nRGF0ZUNoYW5nZShlKXtcclxuICAgICAgICAgICAgdGhpcy5zYWljaGVuZ0xpc3QuZGF0ZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNhaWNoZW5nTGlzdC5wYWdlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zYWljaGVuZ0xpc3QuZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoaW9jZVR5cGUoIHR5cGUgKXtcclxuICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICB0aGlzLmxlYWd1ZUZpbHRlID0gbnVsbDsgIFxyXG4gICAgICAgICAgLyog5b2T5b2T5YmN5YiX6KGo5Li656m655qE5pe25YCZ5Y676K+35rGCICovXHJcbiAgICAgICAgICBpZiggdGhpcy5nZXRDYXRlT2JqKHR5cGUpLmRhdGEubGVuZ3RoIDw9IDAgKXtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBpZiggdGhpcy50eXBlID09IDMgKXtcclxuICAgICAgICAgICAgICAgICAvLyB0aGlzLmdldEZvY3VzTGlzdCgpLnRoZW4oIHJlcyA9PiB7d3guaGlkZUxvYWRpbmcoKTt9KTsgICAgXHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge3d4LmhpZGVMb2FkaW5nKCk7fSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvKiDmr4/mrKHljrvosIPogZTotZvkv6Hmga8gKi9cclxuICAgICAgICAgIGlmKCB0aGlzLnR5cGUgIT0gMyApe1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZUJ0biA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TGVhdWdlTGlzdCgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8qIOavj+asoeivt+axguWFs+azqOeahOaVsOaNriAqL1xyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Rm9jdXNMaXN0KCkudGhlbiggcmVzID0+IHt3eC5oaWRlTG9hZGluZygpfSApO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZUJ0biA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcGVuTGVhZ3VlKCl7XHJcbiAgICAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0luZGV4KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2luZGV4YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtSWQgPSBlLmRldGFpbC5mb3JtSWQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog6LCD5pW05YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgICAgc2V0U2hhcmVDb250ZW50KCBtYXRjaCApe1xyXG4gICAgICAgICAgaWYoIG1hdGNoLnN0YXR1cyA9PSAxIHx8IG1hdGNoLnN0YXR1cyA9PSAyIHx8IG1hdGNoLnN0YXR1cyA9PSAzIHx8IG1hdGNoLnN0YXR1cyA9PSA0ICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg6L+b6KGM5Lit77yaJHttYXRjaC5sZWFndWVfbmFtZX0gICR7bWF0Y2guaG9tZX0gICR7bWF0Y2guaG9tZV9zY29yZX0tJHttYXRjaC5hd2F5X3Njb3JlfSAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGAke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSAgJHttYXRjaC5ob21lX3Njb3JlfS0ke21hdGNoLmF3YXlfc2NvcmV9ICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAwICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBgJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMCApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+WPlua2iO+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTEgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvlvoXlrprvvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEyICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg5q+U6LWb6IWw5pap77yaJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMyApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+S4reaWre+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTQgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvmjqjov5/vvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDmlLbol48gKi9cclxuICAgICAgICBjb2xsZWN0KGluZGV4LGlkKXtcclxuXHJcbiAgICAgICAgICBpZiggdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgICl7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMudG9rZW59YCxcclxuICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyAtLSA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflj5bmtojmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICflhbPms6jkuK0nLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgIG1hdGNoX2lkIDogaWQsXHJcbiAgICAgICAgICAgICAgICAgIGZvcm1faWQ6dGhpcy5mb3JtSWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLnRva2VufWAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyArKyA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2xlYWd1ZS1jYW5jZWwnOiguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgICAnbGVhZ3VlLWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkucGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YSA9IFtdO1xyXG4gICAgICAgIHRoaXMubGVhZ3VlRmlsdGUgPSBhcmdzWzBdO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4flvZPliY3nmoRjYXRlX2lk6I635b6X5a+55bqU55qE57G75Yir5Lit55qE5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2F0ZV9pZCDlr7nlupTnmoTnsbvliKtcclxuICAgICAqIEByZXR1cm4ge29iamVjdH0g5a+55bqU5YiG57G755qE5pWw5o2u5a+56LGhXHJcbiAgICAgKi9cclxuICAgIGdldENhdGVPYmooY2F0ZV9pZCl7XHJcbiAgICAgIGNhdGVfaWQgPSBjYXRlX2lkICsgXCJcIjtcclxuICAgICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBcIjBcIjogdGhpcy5qaXNoaUxpc3QsXHJcbiAgICAgICAgXCIxXCI6IHRoaXMuc2FpZ3VvTGlzdCxcclxuICAgICAgICBcIjJcIjogdGhpcy5zYWljaGVuZ0xpc3QsXHJcbiAgICAgICAgXCIzXCI6IHRoaXMuZ3VhbnpodUxpc3QsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBvYmpbY2F0ZV9pZF07XHJcbiAgICB9XHJcblxyXG4gICAgLyog6I635Y+W5YWz5rOo5YiX6KGoICovXHJcbiAgICBnZXRGb2N1c0xpc3QoKXtcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLmZvY3VzTGlzdCxkYXRhOntwYWdlOiB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5wYWdlfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIGlmKCBsaXN0Lmxlbmd0aCA+ICAwICl7XHJcbiAgICAgICAgICAgICAgICBsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbC5tYXRjaF90aW1lX21pbnV0ZSA9IHZhbC5tYXRjaF90aW1lICYmIHZhbC5tYXRjaF90aW1lLnNsaWNlKDEwLDE2KTtcclxuICAgICAgICAgICAgICAgIH0gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3VhbnpodUxpc3QuZGF0YSA9IHRoaXMuZ3VhbnpodUxpc3QuZGF0YS5jb25jYXQobGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gdGhpcy5ndWFuemh1TGlzdC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ndWFuemh1TGlzdC5wYWdlICsrIDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W6K++56iL5YiX6KGoXHJcbiAgICBcclxuICAgIGdldENsYXNzTGlzdCggKXtcclxuICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgIGlmKCB0aGlzLmxlYWd1ZUZpbHRlID09PSBudWxsICl7XHJcbiAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnBhZ2UsXHJcbiAgICAgICAgICAgIGRhdGU6IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGVcclxuICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBwYWdlOiB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5wYWdlLFxyXG4gICAgICAgICAgICBkYXRlOiB0aGlzLmdldENhdGVPYmoodGhpcy50eXBlKS5kYXRlLFxyXG4gICAgICAgICAgICBsZWFndWVfaWQ6dGhpcy5sZWFndWVGaWx0ZS5qb2luKCcsJylcclxuICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaExpc3QsXHJcbiAgICAgICAgICAgZGF0YTpkYXRhLFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qIOWGheWuuei1i+WAvOWIsOWvueW6lOeahOWIl+ihqOS4reWOuyAqL1xyXG4gICAgICAgICAgICBpZiggbGlzdC5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgIGxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbC5tYXRjaF90aW1lX21pbnV0ZSA9IHZhbC5tYXRjaF90aW1lICYmIHZhbC5tYXRjaF90aW1lLnNsaWNlKDEwLDE2KTtcclxuICAgICAgICAgICAgICAgIH0gKTtcclxuICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YSA9IHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGEuY29uY2F0KGxpc3QpO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnRvdGFsID0gcmVzLmRhdGEuZGF0YS5tZXRhLnRvdGFsO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLnBhZ2UgKysgO1xyXG4gICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pLmNhdGNoKCBlID0+IHtcclxuICAgICAgICAgIC8vIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgICAgICAvLyB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICAgIC8vIHRoaXMuZ2V0Rm9jdXNUb3RhbCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVhdWdlTGlzdCgpe1xyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubGVhZ3VlTGlzdCxkYXRhOnt0eXBlIDogdGhpcy50eXBlLCBkYXRlOiB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKX0sXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLmxlYWd1ZWxpc3QgPSBsaXN0LnNsaWNlKDEsMTAwKTtcclxuICAgICAgICAgICAgdGhpcy5sZWFndWVsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgZ2V0Rm9jdXNUb3RhbCgpe1xyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGguZm9jdXNMaXN0LGRhdGE6e3BhZ2U6IHRoaXMucGFnZX0sXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgPSByZXMuZGF0YS5kYXRhLm1ldGEudG90YWw7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgIC8vIOeZu+W9lVxyXG4gICAgbG9naW4oKXtcclxuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAvL+eZu+W9leaAgei/h+acn1xyXG4gICAgICB3ZXB5LmxvZ2luKCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Y+R6LW3572R57uc6K+35rGCXHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgIHVybDogYXBpUGF0aC5sb2dpbixcclxuICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9naW5fdHlwZTogNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogcmVzLmNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHJlcy5kYXRhLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInRva2VuXCIscmVzLmRhdGEuZGF0YS50b2tlbilcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+iOt+WPluS4rScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRGb2N1c1RvdGFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIEnICsgcmVzLmVyck1zZylcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgLyp0aGlzLmdldEJhbm5lcnMoKTsqL1xyXG4gICAgICB0aGlzLmppc2hpTGlzdC5kYXRlID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuc2FpZ3VvTGlzdC5kYXRlID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuc2FpY2hlbmdMaXN0LmRhdGUgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5zYWlndW9MaXN0LnN0YXJ0ID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIDYwNDgwMDAwMCkgKTtcclxuICAgICAgdGhpcy5zYWljaGVuZ0xpc3Quc3RhcnQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5zYWlndW9MaXN0LmVuZCA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLnNhaWNoZW5nTGlzdC5lbmQgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgNjA0ODAwMDAwKSApO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMudG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdoZW4gY2F0Y2ggZXJyb3JcclxuICAgICAgICB0aGlzLnRva2VuID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgICBpZiggIXRoaXMudG9rZW4gKXtcclxuICAgICAgICB0aGlzLmxvZ2luKCk7IFxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfojrflj5bkuK0nLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgIHRoaXMuZ2V0TGVhdWdlTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuZ2V0Rm9jdXNUb3RhbCgpO1xyXG5cclxuICAgICAgfVxyXG4gICAgfSBcclxuXHJcbiAgICAvKiDpobXpnaLph43mlrDmiZPlvIAgKi9cclxuICAgIG9uU2hvdygpeyBcclxuICAgICAgaWYoIHRoaXMudG9rZW4gKXtcclxuICAgICAgICAvKiDmlbDmja7liJ3lp4vljJYgKi9cclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+iOt+WPluS4rScsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkucGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkuZGF0YSA9IFtdO1xyXG4gICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgICAgaWYoIHRoaXMudHlwZSA9PSAzICl7XHJcbiAgICAgICAgICAgdGhpcy5nZXRGb2N1c0xpc3QoKS50aGVuKCByZXMgPT4ge3d4LmhpZGVMb2FkaW5nKCk7fSk7ICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge3d4LmhpZGVMb2FkaW5nKCk7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0TGVhdWdlTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuZ2V0Rm9jdXNUb3RhbCgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICAqL1xyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAvLyDliLfmlrDlrozlkI7lgZzmraLliLfmlrBcclxuICAgICAgdGhpcy5nZXRDYXRlT2JqKHRoaXMudHlwZSkucGFnZSA9IDE7XHJcbiAgICAgIHRoaXMuZ2V0Q2F0ZU9iaih0aGlzLnR5cGUpLmRhdGEgPSBbXTtcclxuICAgICAgaWYoIHRoaXMudHlwZSA9PSAzICl7XHJcbiAgICAgICAgdGhpcy5nZXRGb2N1c0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICAgICAgfSkgXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgICB9ICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qIOS4iuaLieinpuW6lSAqL1xyXG4gICAgb25SZWFjaEJvdHRvbSgpe1xyXG4gICAgICAgICAgdGhpcy5pc1VwRnJhc2ggPSB0cnVlO1xyXG4gICAgICAgICAgaWYoIHRoaXMudHlwZSA9PSAzICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5nZXRGb2N1c0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1VwRnJhc2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAvKiB0b2RvOuiuvue9ruimgeWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVDb250ZW50LFxyXG4gICAgICAgICAgcGF0aDogJy9wYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICBpbWFnZVVybDonL2ltYWdlcy9zaGFyZV9pbWcuanBnJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HlpLHotKVcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19