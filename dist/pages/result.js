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

    // 获取课程列表

    value: function getClassList() {
      var _this2 = this;

      wx.showLoading({
        title: '加载中'
      });
      return _wepy2.default.request({ url: _config2.default.matchList,
        data: {
          type: 1,
          page: this.page,
          date: this.date
        },
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
    key: 'onLoad',
    value: function onLoad() {
      /*this.getBanners();*/
      this.date = this.getNowFormatDate();
      this.start = this.getNowFormatDate(new Date(new Date().getTime() - 604800000));
      this.end = this.getNowFormatDate();
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
    navigationBarTitleText: '赛果',
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
    page: 1,
    matchList: [],
    total: 0,
    date: '',
    start: '',
    end: ''
  };
  this.computed = {};
  this.methods = {
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
          _this4.matchList[index].is_collect = false;
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/result'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInJlcXVlc3QiLCJ1cmwiLCJtYXRjaExpc3QiLCJkYXRhIiwidHlwZSIsInBhZ2UiLCJkYXRlIiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ0b2tlbiIsInRoZW4iLCJoaWRlTG9hZGluZyIsImxpc3QiLCJyZXMiLCJ0b3RhbCIsIm1ldGEiLCJsZW5ndGgiLCJmb3JFYWNoIiwidmFsIiwibWF0Y2hfdGltZV9taW51dGUiLCJtYXRjaF90aW1lIiwic2xpY2UiLCJjb25jYXQiLCIkYXBwbHkiLCJnZXROb3dGb3JtYXREYXRlIiwic3RhcnQiLCJEYXRlIiwiZ2V0VGltZSIsImVuZCIsImdldENsYXNzTGlzdCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJpc1VwRnJhc2giLCJjb25zb2xlIiwibG9nIiwic2hhcmVDb250ZW50IiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIm1peGlucyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJiYW5uZXJzIiwiY2xhc3NMaXN0IiwiZ2FtZUxpc3QiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb3RvUmVzdWx0IiwibmF2aWdhdGVUbyIsImdvdG9GZXR1cmUiLCJvcGVuTWluaTEiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsImV4dHJhRGF0YSIsImZvbyIsImVudlZlcnNpb24iLCJvcGVuTWluaTIiLCJmb3JtU3VibWl0IiwiZSIsImRldGFpbCIsImZvcm1JZCIsInZhbHVlIiwic2V0U2hhcmVDb250ZW50IiwibWF0Y2giLCJsZWFndWVfbmFtZSIsImhvbWUiLCJob21lX3Njb3JlIiwiYXdheV9zY29yZSIsImF3YXkiLCJiaW5kRGF0ZUNoYW5nZSIsImNvbGxlY3QiLCJpbmRleCIsImlkIiwiaXNfY29sbGVjdCIsIm1hdGNoQ29sbGVjdCIsIm1ldGhvZCIsIm1hdGNoX2lkIiwidG90YWxGb2N1cyIsImV2ZW50cyIsIiRldmVudCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBRjJDOzs7SUFJdEJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStJbkI7O0FBRUM7O21DQUVhO0FBQUE7O0FBQ1pDLFNBQUdDLFdBQUgsQ0FBZTtBQUNQQyxlQUFPO0FBREEsT0FBZjtBQUdDLGFBQU8sZUFBS0MsT0FBTCxDQUFhLEVBQUNDLEtBQUksaUJBQVFDLFNBQWI7QUFDakJDLGNBQUs7QUFDSEMsZ0JBQU8sQ0FESjtBQUVIQyxnQkFBTSxLQUFLQSxJQUZSO0FBR0hDLGdCQUFNLEtBQUtBO0FBSFIsU0FEWTtBQU1qQkMsZ0JBQVE7QUFDSixnQ0FBb0IsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR4QyxTQU5TLEVBQWIsRUFTTEMsSUFUSyxDQVNDLGVBQU87QUFDWmQsV0FBR2UsV0FBSDtBQUNBLFlBQUlDLE9BQU9DLElBQUlYLElBQUosQ0FBU0EsSUFBVCxDQUFjVSxJQUF6QjtBQUNBLGVBQUtFLEtBQUwsR0FBYUQsSUFBSVgsSUFBSixDQUFTQSxJQUFULENBQWNhLElBQWQsQ0FBbUJELEtBQWhDO0FBQ0FGLGFBQUtJLE1BQUwsSUFBZUosS0FBS0ssT0FBTCxDQUFjLGVBQU87QUFDbENDLGNBQUlDLGlCQUFKLEdBQXdCRCxJQUFJRSxVQUFKLElBQWtCRixJQUFJRSxVQUFKLENBQWVDLEtBQWYsQ0FBcUIsRUFBckIsRUFBd0IsRUFBeEIsQ0FBMUM7QUFDRCxTQUZjLENBQWY7QUFHRSxlQUFLcEIsU0FBTCxHQUFpQixPQUFLQSxT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LENBQWUsT0FBS3VELEtBQXBCLGlCQUFxQ0QsT0FBT0UsSUFBNUMsY0FBeURGLE9BQU9HLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQUpNLEU7OztrQkF2SVU3RixLIiwiZmlsZSI6InJlc3VsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotZvmnpwnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdFxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICBpbnRlcnZhbDogNTAwMCxcclxuICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgIGJhbm5lcnM6W10sXHJcbiAgICAgIGNsYXNzTGlzdDpbXSxcclxuICAgICAgZ2FtZUxpc3Q6WzEsMiwzLDQsNSw2LDcsOCw5LDIwLDMzLDMsMywzLDMsMyxdLFxyXG4gICAgICBpc1VwRnJhc2g6ZmFsc2UsXHJcbiAgICAgIHNoYXJlQ29udGVudDon5pe26Ze055yL5b6X6KeB56aP5YWL5pavJyxcclxuICAgICAgcGFnZToxLFxyXG4gICAgICBtYXRjaExpc3Q6W10sXHJcbiAgICAgIHRvdGFsOjAsXHJcbiAgICAgIGRhdGU6ICcnLFxyXG4gICAgICBzdGFydDogJycsXHJcbiAgICAgIGVuZDonJyxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyog5omT5byA6Laz55CD5q+U6LWbICovXHJcbiAgICAgICAgb3Blbk1pbmkxKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4ZTBhNGM1YjlmODVmOWNmNScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOS4lueVjOadr+i2s+eQg+aDheaKpSAqL1xyXG4gICAgICAgIG9wZW5NaW5pMigpe1xyXG4gICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3gwYzJkNTFiN2I0MzM3YzNhJyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC5mb3JtSWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnN1Ym1pdOS6i+S7tu+8jOaQuuW4puaVsOaNruS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOiwg+aVtOWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICAgIHNldFNoYXJlQ29udGVudChtYXRjaCl7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IGAke21hdGNoLmxlYWd1ZV9uYW1lfSAke21hdGNoLm1hdGNoX3RpbWUuc2xpY2UoMCxtYXRjaC5tYXRjaF90aW1lLmxlbmd0aC0zKX0gJHttYXRjaC5ob21lfSAgJHttYXRjaC5ob21lX3Njb3JlfS0ke21hdGNoLmF3YXlfc2NvcmV9ICR7bWF0Y2guYXdheX1gO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJpbmREYXRlQ2hhbmdlKGUpe1xyXG4gICAgICAgICAgdGhpcy5kYXRlID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSBbXTtcclxuICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiDmlLbol48gKi9cclxuICAgICAgICBjb2xsZWN0KGluZGV4LGlkKXtcclxuXHJcbiAgICAgICAgICBpZiggdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgICl7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzIC0tIDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPlua2iOaUtuiXj+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WFs+azqOS4rScsXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoQ29sbGVjdCxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnttYXRjaF9pZCA6IGlkfSxcclxuICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaExpc3RbaW5kZXhdLmlzX2NvbGxlY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsRm9jdXMgKysgO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pS26JeP5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICBnZXRDbGFzc0xpc3QoKXtcclxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoTGlzdCxcclxuICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICB0eXBlIDogMSxcclxuICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICAgICAgICBkYXRlOiB0aGlzLmRhdGVcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VufWBcclxuICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICB0aGlzLnRvdGFsID0gcmVzLmRhdGEuZGF0YS5tZXRhLnRvdGFsO1xyXG4gICAgICAgICAgbGlzdC5sZW5ndGggJiYgbGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICB2YWwubWF0Y2hfdGltZV9taW51dGUgPSB2YWwubWF0Y2hfdGltZSAmJiB2YWwubWF0Y2hfdGltZS5zbGljZSgxMCwxNik7XHJcbiAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSB0aGlzLm1hdGNoTGlzdC5jb25jYXQoIHJlcy5kYXRhLmRhdGEubGlzdCApO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgKysgO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAvKnRoaXMuZ2V0QmFubmVycygpOyovXHJcbiAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLnN0YXJ0ID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gNjA0ODAwMDAwKSk7XHJcbiAgICAgIHRoaXMuZW5kID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAgKi9cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgLy8g5Yi35paw5a6M5ZCO5YGc5q2i5Yi35pawXHJcbiAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qIOS4iuaLieinpuW6lSAqL1xyXG4gICAgb25SZWFjaEJvdHRvbSgpe1xyXG4gICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0gKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAvKiB0b2RvOuiuvue9ruimgeWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICBjb25zb2xlLmxvZygyKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlQ29udGVudCxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==