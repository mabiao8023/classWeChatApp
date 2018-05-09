'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _contact = require('./../components/contact.js');

var _contact2 = _interopRequireDefault(_contact);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _config = require('./../config/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // alias example


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

    value: function getClassList() {
      var _this2 = this;

      return _wepy2.default.request({ url: _config2.default.focusList, data: { page: this.page },
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
    key: 'onLoad',
    value: function onLoad() {
      /*this.getBanners();*/
      this.getClassList();
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
      var _this3 = this;

      this.isUpFrash = true;
      this.getClassList().then(function (res) {
        _this3.isUpFrash = false;
        _this3.$apply();
      });
      console.log("上拉触底了");
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
  var _this5 = this;

  this.config = {
    navigationBarTitleText: '关注',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black'
  };
  this.components = {
    contact: _contact2.default
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
    matchList: []
  };
  this.computed = {};
  this.methods = {
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
      var _this4 = this;

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
          _this4.matchList.splice(index, 1);
          // this.matchList[index].is_collect = false;
          _this4.totalFocus--;
          _this4.$apply();
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
          _this4.matchList[index].is_collect = true;
          _this4.totalFocus++;
          _this4.$apply();
          console.log('收藏成功');
        });
      }
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this5.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    } };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/focus'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvY3VzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwicmVxdWVzdCIsInVybCIsImZvY3VzTGlzdCIsImRhdGEiLCJwYWdlIiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ0b2tlbiIsInRoZW4iLCJsaXN0IiwicmVzIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsIm1hdGNoX3RpbWVfbWludXRlIiwibWF0Y2hfdGltZSIsInNsaWNlIiwibWF0Y2hMaXN0IiwiY29uY2F0IiwiJGFwcGx5IiwiZ2V0Q2xhc3NMaXN0Iiwid3giLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiaXNVcEZyYXNoIiwiY29uc29sZSIsImxvZyIsInRpdGxlIiwic2hhcmVDb250ZW50IiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJiYW5uZXJzIiwiY2xhc3NMaXN0IiwiZ2FtZUxpc3QiLCJpc1NjR2FtZSIsInRvdGFsRm9jdXMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb3RvSW5kZXgiLCJuYXZpZ2F0ZVRvIiwiZ290b1Jlc3VsdCIsImdvdG9GZXR1cmUiLCJnb3RvRm9jdXMiLCJvcGVuTWluaTEiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsImV4dHJhRGF0YSIsImZvbyIsImVudlZlcnNpb24iLCJvcGVuTWluaTIiLCJmb3JtU3VibWl0IiwiZSIsImRldGFpbCIsImZvcm1JZCIsInZhbHVlIiwic2V0U2hhcmVDb250ZW50IiwibWF0Y2giLCJzdGF0dXMiLCJsZWFndWVfbmFtZSIsImhvbWUiLCJob21lX3Njb3JlIiwiYXdheV9zY29yZSIsImF3YXkiLCJjb2xsZWN0IiwiaW5kZXgiLCJpZCIsImlzX2NvbGxlY3QiLCJzaG93TG9hZGluZyIsIm1hdGNoQ29sbGVjdCIsIm1ldGhvZCIsIm1hdGNoX2lkIiwiaGlkZUxvYWRpbmciLCJzcGxpY2UiLCJldmVudHMiLCIkZXZlbnQiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUYyQzs7O0lBSXRCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtS25COzttQ0FFYztBQUFBOztBQUNYLGFBQU8sZUFBS0MsT0FBTCxDQUFhLEVBQUNDLEtBQUksaUJBQVFDLFNBQWIsRUFBdUJDLE1BQUssRUFBQ0MsTUFBTSxLQUFLQSxJQUFaLEVBQTVCO0FBQ2hCQyxnQkFBUTtBQUNMLGdDQUFvQixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDO0FBRHZDLFNBRFEsRUFBYixFQUlMQyxJQUpLLENBSUMsZUFBTztBQUNWLFlBQUlDLE9BQU9DLElBQUlSLElBQUosQ0FBU0EsSUFBVCxDQUFjTyxJQUF6QjtBQUNBQSxhQUFLRSxNQUFMLElBQWdCRixLQUFLRyxPQUFMLENBQWMsZUFBTztBQUNuQ0MsY0FBSUMsaUJBQUosR0FBd0JELElBQUlFLFVBQUosSUFBa0JGLElBQUlFLFVBQUosQ0FBZUMsS0FBZixDQUFxQixFQUFyQixFQUF3QixFQUF4QixDQUExQztBQUNELFNBRmUsQ0FBaEI7QUFHQSxlQUFLQyxTQUFMLEdBQWlCLE9BQUtBLFNBQUwsQ0FBZUMsTUFBZixDQUF1QlIsSUFBSVIsSUFBSixDQUFTQSxJQUFULENBQWNPLElBQXJDLENBQWpCO0FBQ0EsZUFBS04sSUFBTDtBQUNBLGVBQUtnQixNQUFMO0FBQ0gsT0FaSyxDQUFQO0FBYUY7Ozs2QkFJUTtBQUNQO0FBQ0EsV0FBS0MsWUFBTDtBQUNEOztBQUVEOzs7Ozs7d0NBR3FCO0FBQ25CO0FBQ0EsV0FBS2pCLElBQUwsR0FBWSxDQUFaO0FBQ0Es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QUFDZ0YsVUFBV0wsRUFBWixFQUZNO0FBR1Z6RSxrQkFBUTtBQUNMLGtDQUFvQixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDO0FBRHZDLFdBSEUsRUFBYixFQU1DQyxJQU5ELENBTU8sZUFBTztBQUNWYSxhQUFHOEQsV0FBSDtBQUNBLGlCQUFLbEUsU0FBTCxDQUFlMkQsS0FBZixFQUFzQkUsVUFBdEIsR0FBbUMsSUFBbkM7QUFDQSxpQkFBSy9CLFVBQUw7QUFDQSxpQkFBSzVCLE1BQUw7QUFDQUssa0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0gsU0FaRDtBQWFIO0FBRUY7QUF0SEssRztPQTBIVjRELE0sR0FBUztBQUNQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUlDLGtCQUFjLFVBQUszRSxNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQWEsY0FBUUMsR0FBUixDQUFlLE9BQUs4RCxLQUFwQixpQkFBcUNELE9BQU9FLElBQTVDLGNBQXlERixPQUFPRyxNQUFQLENBQWNGLEtBQXZFO0FBQ0QsS0FKTSxFOzs7a0JBM0pVekYsSyIsImZpbGUiOiJmb2N1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflhbPms6gnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdFxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICBpbnRlcnZhbDogNTAwMCxcclxuICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgIGJhbm5lcnM6W10sXHJcbiAgICAgIGNsYXNzTGlzdDpbXSxcclxuICAgICAgZ2FtZUxpc3Q6WzEsMiwzLDQsNSw2LDcsOCw5LDIwLDMzLDMsMywzLDMsMyxdLFxyXG4gICAgICBpc1VwRnJhc2g6ZmFsc2UsXHJcbiAgICAgIHNoYXJlQ29udGVudDon5pe26Ze055yL5b6X6KeB56aP5YWL5pavJyxcclxuICAgICAgaXNTY0dhbWU6IHRydWUsXHJcbiAgICAgIHRvdGFsRm9jdXM6IDAsXHJcbiAgICAgIHBhZ2U6MSxcclxuICAgICAgbWF0Y2hMaXN0OltdXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICBcdGdvdG9JbmRleCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9pbmRleGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZvY3VzKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZvY3VzYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qIOaJk+W8gOi2s+eQg+avlOi1myAqL1xyXG4gICAgICAgIG9wZW5NaW5pMSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eGUwYTRjNWI5Zjg1ZjljZjUnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDkuJbnlYzmna/otrPnkIPmg4XmiqUgKi9cclxuICAgICAgICBvcGVuTWluaTIoKXtcclxuICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4MGMyZDUxYjdiNDMzN2MzYScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLmZvcm1JZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3Jt5Y+R55Sf5LqGc3VibWl05LqL5Lu277yM5pC65bim5pWw5o2u5Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyog6LCD5pW05YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgICAgc2V0U2hhcmVDb250ZW50KCBtYXRjaCApe1xyXG4gICAgICAgICAgaWYoIG1hdGNoLnN0YXR1cyA9PSAxIHx8IG1hdGNoLnN0YXR1cyA9PSAyIHx8IG1hdGNoLnN0YXR1cyA9PSAzIHx8IG1hdGNoLnN0YXR1cyA9PSA0ICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg6L+b6KGM5Lit77yaJHttYXRjaC5sZWFndWVfbmFtZX0gICR7bWF0Y2guaG9tZX0gICR7bWF0Y2guaG9tZV9zY29yZX0tJHttYXRjaC5hd2F5X3Njb3JlfSAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGAke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSAgJHttYXRjaC5ob21lX3Njb3JlfS0ke21hdGNoLmF3YXlfc2NvcmV9ICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAwICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBgJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMCApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+WPlua2iO+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTEgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvlvoXlrprvvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1lbHNlIGlmKCBtYXRjaC5zdGF0dXMgPT0gLTEyICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBg5q+U6LWb6IWw5pap77yaJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gdnMgJHttYXRjaC5hd2F5fWA7XHJcbiAgICAgICAgICB9ZWxzZSBpZiggbWF0Y2guc3RhdHVzID09IC0xMyApe1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hhcmVDb250ZW50ID0gYOavlOi1m+S4reaWre+8miR7bWF0Y2gubGVhZ3VlX25hbWV9ICR7bWF0Y2gubWF0Y2hfdGltZS5zbGljZSgwLG1hdGNoLm1hdGNoX3RpbWUubGVuZ3RoLTMpfSAke21hdGNoLmhvbWV9IHZzICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIG1hdGNoLnN0YXR1cyA9PSAtMTQgKXtcclxuICAgICAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGDmr5TotZvmjqjov5/vvJoke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSB2cyAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDmlLbol48gKi9cclxuICAgICAgICBjb2xsZWN0KGluZGV4LGlkKXtcclxuXHJcbiAgICAgICAgICBpZiggdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgICl7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3Quc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgICAvLyB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgLS0gO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Y+W5raI5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5YWz5rOo5LitJyxcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hDb2xsZWN0LFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6e21hdGNoX2lkIDogaWR9LFxyXG4gICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoTGlzdFtpbmRleF0uaXNfY29sbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyArKyA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICBnZXRDbGFzc0xpc3QoKXtcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLmZvY3VzTGlzdCxkYXRhOntwYWdlOiB0aGlzLnBhZ2V9LFxyXG4gICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYCR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgIH0sfSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIGxpc3QubGVuZ3RoICYmICBsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsLm1hdGNoX3RpbWVfbWludXRlID0gdmFsLm1hdGNoX3RpbWUgJiYgdmFsLm1hdGNoX3RpbWUuc2xpY2UoMTAsMTYpO1xyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSB0aGlzLm1hdGNoTGlzdC5jb25jYXQoIHJlcy5kYXRhLmRhdGEubGlzdCApO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgKysgO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAgIFxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIC8qdGhpcy5nZXRCYW5uZXJzKCk7Ki9cclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICAqL1xyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAvLyDliLfmlrDlrozlkI7lgZzmraLliLfmlrBcclxuICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgfSApO1xyXG4gICAgICAvLyBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcbiAgICAgICAgICBcclxuICAgICAgLy8gfSwyMDAwIClcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qIOS4iuaLieinpuW6lSAqL1xyXG4gICAgb25SZWFjaEJvdHRvbSgpe1xyXG4gICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0gKVxyXG4gICAgICBjb25zb2xlLmxvZyhcIuS4iuaLieinpuW6leS6hlwiKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAvKiB0b2RvOuiuvue9ruimgeWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICBjb25zb2xlLmxvZygyKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlQ29udGVudCxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==