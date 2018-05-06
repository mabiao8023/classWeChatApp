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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmUuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJkYXRhIiwibGVhZ3VlRmlsdGUiLCJ0eXBlIiwicGFnZSIsImRhdGUiLCJsZWFndWVfaWQiLCJqb2luIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwicmVxdWVzdCIsInVybCIsIm1hdGNoTGlzdCIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidG9rZW4iLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJsaXN0IiwicmVzIiwidG90YWwiLCJtZXRhIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsIm1hdGNoX3RpbWVfbWludXRlIiwibWF0Y2hfdGltZSIsInNsaWNlIiwiY29uY2F0IiwiJGFwcGx5IiwibGVhZ3VlTGlzdCIsImxlYWd1ZWxpc3QiLCJjaGVja2VkIiwiZ2V0Tm93Rm9ybWF0RGF0ZSIsInN0YXJ0IiwiZW5kIiwiRGF0ZSIsImdldFRpbWUiLCJnZXRDbGFzc0xpc3QiLCJnZXRMZWF1Z2VMaXN0Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImlzVXBGcmFzaCIsImNvbnNvbGUiLCJsb2ciLCJzaGFyZUNvbnRlbnQiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJMZWF1Z2UiLCJtaXhpbnMiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiYmFubmVycyIsImNsYXNzTGlzdCIsImdhbWVMaXN0IiwiaXNTaG93TGVhZ3VlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3BlbkxlYWd1ZSIsImdvdG9SZXN1bHQiLCJuYXZpZ2F0ZVRvIiwiZ290b0ZldHVyZSIsIm9wZW5NaW5pMSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwiZXh0cmFEYXRhIiwiZm9vIiwiZW52VmVyc2lvbiIsIm9wZW5NaW5pMiIsImZvcm1TdWJtaXQiLCJlIiwiZGV0YWlsIiwiZm9ybUlkIiwidmFsdWUiLCJzZXRTaGFyZUNvbnRlbnQiLCJtYXRjaCIsImxlYWd1ZV9uYW1lIiwiaG9tZSIsImhvbWVfc2NvcmUiLCJhd2F5X3Njb3JlIiwiYXdheSIsImJpbmREYXRlQ2hhbmdlIiwiY29sbGVjdCIsImluZGV4IiwiaWQiLCJpc19jb2xsZWN0IiwibWF0Y2hDb2xsZWN0IiwibWV0aG9kIiwibWF0Y2hfaWQiLCJ0b3RhbEZvY3VzIiwiZXZlbnRzIiwiJGV2ZW50IiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUgyQztBQUNGOzs7SUFJcEJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFLbkI7O0FBRUM7O21DQUVhO0FBQUE7O0FBQ1osVUFBSUMsT0FBTyxFQUFYO0FBQ0MsVUFBSSxLQUFLQyxXQUFMLEtBQXFCLElBQXpCLEVBQStCO0FBQzlCRCxlQUFPO0FBQ0hFLGdCQUFPLENBREo7QUFFSEMsZ0JBQU0sS0FBS0EsSUFGUjtBQUdIQyxnQkFBTSxLQUFLQTtBQUhSLFNBQVA7QUFNQSxPQVBELE1BT0s7QUFDQ0osZUFBTztBQUNBRSxnQkFBTyxDQURQO0FBRUFDLGdCQUFNLEtBQUtBLElBRlg7QUFHQUMsZ0JBQU0sS0FBS0EsSUFIWDtBQUlBQyxxQkFBVSxLQUFLSixXQUFMLENBQWlCSyxJQUFqQixDQUFzQixHQUF0QjtBQUpWLFNBQVA7QUFNTDtBQUNGQyxTQUFHQyxXQUFILENBQWU7QUFDUEMsZUFBTztBQURBLE9BQWY7QUFHQyxhQUFPLGVBQUtDLE9BQUwsQ0FBYSxFQUFDQyxLQUFJLGlCQUFRQyxTQUFiO0FBQ2pCWixjQUFLQSxJQURZO0FBRWpCYSxnQkFBUTtBQUNK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QUtJLFVBQUw7QUFDQSxpQkFBS3hFLE1BQUw7QUFDQWEsa0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0gsU0FaRDtBQWFIO0FBRUY7QUFuR0ssRztPQXVHVjJELE0sR0FBUztBQUNOLHFCQUFnQix3QkFBYTtBQUMxQixhQUFLbkMsWUFBTCxHQUFvQixLQUFwQjtBQUNILEtBSE07O0FBS1AsbUJBQWUsc0JBQWE7QUFDMUJ6QixjQUFRQyxHQUFSO0FBQ0EsYUFBS3dCLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxhQUFLakUsSUFBTCxHQUFZLENBQVo7QUFDQSxhQUFLUyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsYUFBS1gsV0FBTDtBQUNBLGFBQUtzQyxZQUFMO0FBQ0QsS0FaTTtBQWFQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUlpRSxrQkFBYyxVQUFLakYsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FvQixjQUFRQyxHQUFSLENBQWUsT0FBSzZELEtBQXBCLGlCQUFxQ0QsT0FBT0UsSUFBNUMsY0FBeURGLE9BQU9HLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQWhCTSxFOzs7a0JBakpVMUcsSyIsImZpbGUiOiJmZWF0dXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBMZWF1Z2UgZnJvbSAnQC9jb21wb25lbnRzL2xlYXVnZScgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i1m+eoiycsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyAgXHJcbiAgICB9XHJcblxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkxlYXVnZVwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJsZWFndWVsaXN0XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgY29udGFjdDpDb250YWN0LFxyXG4gICAgICBMZWF1Z2U6TGVhdWdlXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW215TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcclxuICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgIGludGVydmFsOiA1MDAwLFxyXG4gICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgYmFubmVyczpbXSxcclxuICAgICAgY2xhc3NMaXN0OltdLFxyXG4gICAgICBnYW1lTGlzdDpbMSwyLDMsNCw1LDYsNyw4LDksMjAsMzMsMywzLDMsMywzLF0sXHJcbiAgICAgIGlzVXBGcmFzaDpmYWxzZSxcclxuICAgICAgc2hhcmVDb250ZW50Oifml7bpl7TnnIvlvpfop4Hnpo/lhYvmlq8nLFxyXG4gICAgICBwYWdlOjEsXHJcbiAgICAgIG1hdGNoTGlzdDpbXSxcclxuICAgICAgdG90YWw6MCxcclxuICAgICAgZGF0ZTogJycsXHJcbiAgICAgIHN0YXJ0OiAnJyxcclxuICAgICAgZW5kOicnLFxyXG4gICAgICBsZWFndWVsaXN0OltdLFxyXG4gICAgICBpc1Nob3dMZWFndWU6ZmFsc2UsXHJcbiAgICAgIGxlYWd1ZUZpbHRlOm51bGxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgb3BlbkxlYWd1ZSgpe1xyXG4gICAgICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9SZXN1bHQoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvcmVzdWx0YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvdG9GZXR1cmUoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvZmVhdHVyZWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmiZPlvIDotrPnkIPmr5TotZsgKi9cclxuICAgICAgICBvcGVuTWluaTEoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3hlMGE0YzViOWY4NWY5Y2Y1JyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog5LiW55WM5p2v6Laz55CD5oOF5oqlICovXHJcbiAgICAgICAgb3Blbk1pbmkyKCl7XHJcbiAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eDBjMmQ1MWI3YjQzMzdjM2EnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLmZvcm1JZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3Jt5Y+R55Sf5LqGc3VibWl05LqL5Lu277yM5pC65bim5pWw5o2u5Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog6LCD5pW05YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgICAgc2V0U2hhcmVDb250ZW50KG1hdGNoKXtcclxuICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYCR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9ICAke21hdGNoLmhvbWVfc2NvcmV9LSR7bWF0Y2guYXdheV9zY29yZX0gJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmluZERhdGVDaGFuZ2UoZSl7XHJcbiAgICAgICAgICB0aGlzLmRhdGUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IFtdO1xyXG4gICAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qIOaUtuiXjyAqL1xyXG4gICAgICAgIGNvbGxlY3QoaW5kZXgsaWQpe1xyXG5cclxuICAgICAgICAgIGlmKCB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCAgKXtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5Y+W5raI5LitJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoQ29sbGVjdCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6e21hdGNoX2lkIDogaWR9LFxyXG4gICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgLS0gO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Y+W5raI5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5YWz5rOo5LitJyxcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hDb2xsZWN0LFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6e21hdGNoX2lkIDogaWR9LFxyXG4gICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyArKyA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICAnbGVhZ3VlLWNhbmNlbCc6KC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgIFxyXG4gICAgICAnbGVhZ3VlLWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3NbMF0pO1xyXG4gICAgICAgIHRoaXMuaXNTaG93TGVhZ3VlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMubGVhZ3VlRmlsdGUgPSBhcmdzWzBdO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICAgLy8g6I635Y+W6K++56iL5YiX6KGoXHJcbiAgICBcclxuICAgIGdldENsYXNzTGlzdCgpe1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgaWYoIHRoaXMubGVhZ3VlRmlsdGUgPT09IG51bGwgKXtcclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0eXBlIDogMixcclxuICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICAgICAgICBkYXRlOiB0aGlzLmRhdGVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogMixcclxuICAgICAgICAgICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogdGhpcy5kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlYWd1ZV9pZDp0aGlzLmxlYWd1ZUZpbHRlLmpvaW4oJywnKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaExpc3QsXHJcbiAgICAgICAgICBkYXRhOmRhdGEsXHJcbiAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG5cclxuICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgdGhpcy50b3RhbCA9IHJlcy5kYXRhLmRhdGEubWV0YS50b3RhbDtcclxuICAgICAgICAgIGxpc3QubGVuZ3RoICYmIGxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuXHJcbiAgICAgICAgICAgIHZhbC5tYXRjaF90aW1lX21pbnV0ZSA9IHZhbC5tYXRjaF90aW1lICYmIHZhbC5tYXRjaF90aW1lLnNsaWNlKDEwLDE2KTtcclxuICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLm1hdGNoTGlzdCA9IHRoaXMubWF0Y2hMaXN0LmNvbmNhdCggcmVzLmRhdGEuZGF0YS5saXN0ICk7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSArKyA7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRMZWF1Z2VMaXN0KCl7XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5sZWFndWVMaXN0LGRhdGE6e3R5cGUgOiAyLCBkYXRlOiB0aGlzLmRhdGV9LFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZ3VlbGlzdCA9IGxpc3Quc2xpY2UoMSwxMDApO1xyXG4gICAgICAgICAgICB0aGlzLmxlYWd1ZWxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICB2YWwuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgLyp0aGlzLmdldEJhbm5lcnMoKTsqL1xyXG4gICAgICB0aGlzLmRhdGUgPSB0aGlzLmdldE5vd0Zvcm1hdERhdGUoKTtcclxuICAgICAgdGhpcy5zdGFydCA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLmVuZCA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZShuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDYwNDgwMDAwMCkpO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICB0aGlzLmdldExlYXVnZUxpc3QoKTtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICAqL1xyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAvLyDliLfmlrDlrozlkI7lgZzmraLliLfmlrBcclxuICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyog5LiK5ouJ6Kem5bqVICovXHJcbiAgICBvblJlYWNoQm90dG9tKCl7XHJcbiAgICAgIHRoaXMuaXNVcEZyYXNoID0gdHJ1ZTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNVcEZyYXNoID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSApXHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICAgIC8qIHRvZG866K6+572u6KaB5YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgIGNvbnNvbGUubG9nKDIpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVDb250ZW50LFxyXG4gICAgICAgICAgcGF0aDogJy9wYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICBpbWFnZVVybDonL2ltYWdlcy9zaGFyZV9pbWcuanBnJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HlpLHotKVcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19