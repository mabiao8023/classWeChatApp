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
      console.log(this.leagueFilte === null);
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
      this.shareContent = match.league_name + ' ' + match.match_time.slice(0, match.match_time.length - 3) + ' ' + match.home + '  ' + match.home_score + '-' + match.away_score + ' ' + match.away;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJsZWFndWVGaWx0ZSIsInR5cGUiLCJwYWdlIiwibGVhZ3VlX2lkIiwiam9pbiIsInJlcXVlc3QiLCJ1cmwiLCJtYXRjaExpc3QiLCJoZWFkZXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInRva2VuIiwidGhlbiIsImxpc3QiLCJyZXMiLCJsZW5ndGgiLCJmb3JFYWNoIiwidmFsIiwibWF0Y2hfdGltZV9taW51dGUiLCJtYXRjaF90aW1lIiwic2xpY2UiLCJjb25jYXQiLCIkYXBwbHkiLCJsZWFndWVMaXN0IiwiZGF0ZSIsImdldE5vd0Zvcm1hdERhdGUiLCJsZWFndWVsaXN0IiwiY2hlY2tlZCIsImZvY3VzTGlzdCIsInRvdGFsRm9jdXMiLCJtZXRhIiwidG90YWwiLCJnZXRDbGFzc0xpc3QiLCJnZXRMZWF1Z2VMaXN0IiwiZ2V0Rm9jdXNUb3RhbCIsInd4Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImlzVXBGcmFzaCIsInRpdGxlIiwic2hhcmVDb250ZW50IiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb250YWN0IiwiZm9vdGVyIiwiTGVhdWdlIiwibWl4aW5zIiwiaW5kaWNhdG9yRG90cyIsImF1dG9wbGF5IiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImJhbm5lcnMiLCJjbGFzc0xpc3QiLCJnYW1lTGlzdCIsImlzU2NHYW1lIiwiaXNTaG93TGVhZ3VlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3BlbkxlYWd1ZSIsInNjR2FtZSIsImdvdG9JbmRleCIsIm5hdmlnYXRlVG8iLCJnb3RvUmVzdWx0IiwiZ290b0ZldHVyZSIsImdvdG9Gb2N1cyIsIm9wZW5NaW5pMSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwiZXh0cmFEYXRhIiwiZm9vIiwiZW52VmVyc2lvbiIsIm9wZW5NaW5pMiIsImZvcm1TdWJtaXQiLCJlIiwiZGV0YWlsIiwiZm9ybUlkIiwidmFsdWUiLCJzZXRTaGFyZUNvbnRlbnQiLCJtYXRjaCIsImxlYWd1ZV9uYW1lIiwiaG9tZSIsImhvbWVfc2NvcmUiLCJhd2F5X3Njb3JlIiwiYXdheSIsImNvbGxlY3QiLCJpbmRleCIsImlkIiwiaXNfY29sbGVjdCIsInNob3dMb2FkaW5nIiwibWF0Y2hDb2xsZWN0IiwibWV0aG9kIiwibWF0Y2hfaWQiLCJoaWRlTG9hZGluZyIsImV2ZW50cyIsIiRldmVudCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUoyQztBQUNGO0FBQ0E7OztJQUlwQkEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3S25COzs7QUFHQTs7bUNBRWU7QUFBQTs7QUFDYixVQUFJQyxPQUFPLEVBQVg7QUFDQUMsY0FBUUMsR0FBUixDQUFZLEtBQUtDLFdBQUwsS0FBcUIsSUFBakM7QUFDQyxVQUFJLEtBQUtBLFdBQUwsS0FBcUIsSUFBekIsRUFBK0I7QUFDOUJILGVBQU87QUFDSEksZ0JBQU8sQ0FESjtBQUVIQyxnQkFBTSxLQUFLQTtBQUZSLFNBQVA7QUFLQSxPQU5ELE1BTUs7QUFDQ0wsZUFBTztBQUNBSSxnQkFBTyxDQURQO0FBRUFDLGdCQUFNLEtBQUtBLElBRlg7QUFHQUMscUJBQVUsS0FBS0gsV0FBTCxDQUFpQkksSUFBakIsQ0FBc0IsR0FBdEI7QUFIVixTQUFQO0FBS0w7QUFDRCxhQUFPLGVBQUtDLE9BQUwsQ0FBYSxFQUFDQyxLQUFJLGlCQUFRQyxTQUFiO0FBQ2hCVixjQUFLQSxJQURXO0FBRWhCVyxnQkFBUTtBQUNM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QUFaLEVBRk07QUFHVnZGLGtCQUFRO0FBQ0wsa0NBQW9CLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsS0FEdkM7QUFFTCw0QkFBZ0I7QUFGWCxXQUhFLEVBQWIsRUFPQ0MsSUFQRCxDQU9PLGVBQU87QUFDVnVCLGFBQUdrRSxXQUFIO0FBQ0EsaUJBQUs5RixTQUFMLENBQWV1RixLQUFmLEVBQXNCRSxVQUF0QixHQUFtQyxJQUFuQztBQUNBLGlCQUFLbkUsVUFBTDtBQUNBLGlCQUFLUCxNQUFMO0FBQ0F4QixrQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDSCxTQWJEO0FBY0g7QUFFRjtBQTlHSyxHO09BaUhWdUcsTSxHQUFTO0FBQ1AsbUJBQWUsc0JBQWE7QUFDMUJ4RyxjQUFRQyxHQUFSO0FBQ0EsYUFBS2lFLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxhQUFLOUQsSUFBTCxHQUFZLENBQVo7QUFDQSxhQUFLSyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsYUFBS1AsV0FBTDtBQUNBLGFBQUtnQyxZQUFMO0FBQ0QsS0FSTTtBQVNQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUl1RSxrQkFBYyxVQUFLeEYsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FqQixjQUFRQyxHQUFSLENBQWUsT0FBS3lHLEtBQXBCLGlCQUFxQ0QsT0FBT0UsSUFBNUMsY0FBeURGLE9BQU9HLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQVpNLEU7OztrQkExSlU1RyxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBMZWF1Z2UgZnJvbSAnQC9jb21wb25lbnRzL2xlYXVnZScgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBGb290ZXIgZnJvbSAnQC9jb21wb25lbnRzL2Zvb3RlcicgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WNs+aXtuavlOWIhicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJMZWF1Z2VcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwibGVhZ3VlbGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdCxcclxuICAgICAgZm9vdGVyOkZvb3RlcixcclxuICAgICAgTGVhdWdlXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW215TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcclxuICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgIGludGVydmFsOiA1MDAwLFxyXG4gICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgYmFubmVyczpbXSxcclxuICAgICAgY2xhc3NMaXN0OltdLFxyXG4gICAgICBnYW1lTGlzdDpbMSwyLDMsNCw1LDYsNyw4LDksMjAsMzMsMywzLDMsMywzLF0sXHJcbiAgICAgIGlzVXBGcmFzaDpmYWxzZSxcclxuICAgICAgc2hhcmVDb250ZW50Oifml7bpl7TnnIvlvpfop4Hnpo/lhYvmlq8nLFxyXG4gICAgICBpc1NjR2FtZTogdHJ1ZSxcclxuICAgICAgdG90YWxGb2N1czogMCxcclxuICAgICAgcGFnZToxLFxyXG4gICAgICBtYXRjaExpc3Q6W10sXHJcbiAgICAgIGxlYWd1ZWxpc3Q6W10sXHJcbiAgICAgIGlzU2hvd0xlYWd1ZTpmYWxzZSxcclxuICAgICAgbGVhZ3VlRmlsdGU6bnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIG9wZW5MZWFndWUoKXtcclxuICAgICAgICAgICB0aGlzLmlzU2hvd0xlYWd1ZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY0dhbWUoKXtcclxuICAgICAgICAgIHRoaXMuaXNTY0dhbWUgPSAhdGhpcy5pc1NjR2FtZTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdvdG9JbmRleCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9pbmRleGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZvY3VzKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZvY3VzYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qIOaJk+W8gOi2s+eQg+avlOi1myAqL1xyXG4gICAgICAgIG9wZW5NaW5pMSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eGUwYTRjNWI5Zjg1ZjljZjUnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDkuJbnlYzmna/otrPnkIPmg4XmiqUgKi9cclxuICAgICAgICBvcGVuTWluaTIoKXtcclxuICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4MGMyZDUxYjdiNDMzN2MzYScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZm9ybUlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm3lj5HnlJ/kuoZzdWJtaXTkuovku7bvvIzmkLrluKbmlbDmja7kuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDosIPmlbTliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgICBzZXRTaGFyZUNvbnRlbnQoIG1hdGNoICl7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGAke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSAgJHttYXRjaC5ob21lX3Njb3JlfS0ke21hdGNoLmF3YXlfc2NvcmV9ICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOaUtuiXjyAqL1xyXG4gICAgICAgIGNvbGxlY3QoaW5kZXgsaWQpe1xyXG5cclxuICAgICAgICAgIGlmKCB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCAgKXtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5Y+W5raI5LitJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoQ29sbGVjdCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6e21hdGNoX2lkIDogaWR9LFxyXG4gICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YCxcclxuICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyAtLSA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflj5bmtojmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICflhbPms6jkuK0nLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7bWF0Y2hfaWQgOiBpZH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gLFxyXG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgKysgO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICdsZWFndWUtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJnc1swXSk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dMZWFndWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5sZWFndWVGaWx0ZSA9IGFyZ3NbMF07XHJcbiAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgfSxcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOaUtuiXj+avlOi1m1xyXG5cclxuXHJcbiAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgZ2V0Q2xhc3NMaXN0KCApe1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmxlYWd1ZUZpbHRlID09PSBudWxsKVxyXG4gICAgICAgaWYoIHRoaXMubGVhZ3VlRmlsdGUgPT09IG51bGwgKXtcclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0eXBlIDogMCxcclxuICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcclxuICAgICAgICAgICAgICAgICAgICBsZWFndWVfaWQ6dGhpcy5sZWFndWVGaWx0ZS5qb2luKCcsJylcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICAgICAgcmV0dXJuIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hMaXN0LFxyXG4gICAgICAgICAgIGRhdGE6ZGF0YSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICBsaXN0Lmxlbmd0aCAmJiAgbGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHZhbC5tYXRjaF90aW1lX21pbnV0ZSA9IHZhbC5tYXRjaF90aW1lICYmIHZhbC5tYXRjaF90aW1lLnNsaWNlKDEwLDE2KTtcclxuICAgICAgICAgICAgfSApXHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gdGhpcy5tYXRjaExpc3QuY29uY2F0KCByZXMuZGF0YS5kYXRhLmxpc3QgKTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlICsrIDtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldExlYXVnZUxpc3QoKXtcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLmxlYWd1ZUxpc3QsZGF0YTp7dHlwZSA6IDAsIGRhdGU6IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLmxlYWd1ZWxpc3QgPSBsaXN0LnNsaWNlKDEsMTAwKTtcclxuICAgICAgICAgICAgdGhpcy5sZWFndWVsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRGb2N1c1RvdGFsKCl7XHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5mb2N1c0xpc3QsZGF0YTp7cGFnZTogdGhpcy5wYWdlfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgPSByZXMuZGF0YS5kYXRhLm1ldGEudG90YWw7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIC8qdGhpcy5nZXRCYW5uZXJzKCk7Ki9cclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgICAgdGhpcy5nZXRMZWF1Z2VMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0Rm9jdXNUb3RhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgICovXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgIC8vIOWIt+aWsOWujOWQjuWBnOatouWIt+aWsFxyXG4gICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICB0aGlzLm1hdGNoTGlzdCA9IFtdO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xyXG4gICAgICB9ICk7XHJcbiAgICAgIC8vIHNldFRpbWVvdXQoICgpID0+IHtcclxuICAgICAgICAgIFxyXG4gICAgICAvLyB9LDIwMDAgKVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyog5LiK5ouJ6Kem5bqVICovXHJcbiAgICBvblJlYWNoQm90dG9tKCl7XHJcbiAgICAgIHRoaXMuaXNVcEZyYXNoID0gdHJ1ZTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNVcEZyYXNoID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSApXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi5LiK5ouJ6Kem5bqV5LqGXCIpXHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICAgIC8qIHRvZG866K6+572u6KaB5YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZUNvbnRlbnQsXHJcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=