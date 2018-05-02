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

      return _wepy2.default.request({ url: _config2.default.matchList, data: { type: 2, page: this.page } }).then(function (res) {
        var list = res.data.data.list;
        list.forEach(function (val) {
          val.isFocus = false;
          val.match_time = val.match_time.slice(10, 16);
        });
        _this2.total = res.data.data.meta.total;
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
  var _this4 = this;

  this.config = {
    navigationBarTitleText: '赛程',
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
    total: 0
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
    setShareContent: function setShareContent() {
      console.log(1);
      this.shareContent = "啊哈哈沙发或多或少";
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this4.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    } };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/feature'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmUuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJyZXF1ZXN0IiwidXJsIiwibWF0Y2hMaXN0IiwiZGF0YSIsInR5cGUiLCJwYWdlIiwidGhlbiIsImxpc3QiLCJyZXMiLCJmb3JFYWNoIiwidmFsIiwiaXNGb2N1cyIsIm1hdGNoX3RpbWUiLCJzbGljZSIsInRvdGFsIiwibWV0YSIsImNvbmNhdCIsIiRhcHBseSIsImdldENsYXNzTGlzdCIsInd4Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImlzVXBGcmFzaCIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZSIsInNoYXJlQ29udGVudCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJtaXhpbnMiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiYmFubmVycyIsImNsYXNzTGlzdCIsImdhbWVMaXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ290b1Jlc3VsdCIsIm5hdmlnYXRlVG8iLCJnb3RvRmV0dXJlIiwib3Blbk1pbmkxIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJleHRyYURhdGEiLCJmb28iLCJlbnZWZXJzaW9uIiwib3Blbk1pbmkyIiwiZm9ybVN1Ym1pdCIsImUiLCJkZXRhaWwiLCJmb3JtSWQiLCJ2YWx1ZSIsInNldFNoYXJlQ29udGVudCIsImV2ZW50cyIsIiRldmVudCIsImxlbmd0aCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBRjJDOzs7SUFJdEJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStGbkI7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cG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotZvnqIsnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdFxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICBpbnRlcnZhbDogNTAwMCxcclxuICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgIGJhbm5lcnM6W10sXHJcbiAgICAgIGNsYXNzTGlzdDpbXSxcclxuICAgICAgZ2FtZUxpc3Q6WzEsMiwzLDQsNSw2LDcsOCw5LDIwLDMzLDMsMywzLDMsMyxdLFxyXG4gICAgICBpc1VwRnJhc2g6ZmFsc2UsXHJcbiAgICAgIHNoYXJlQ29udGVudDon5pe26Ze055yL5b6X6KeB56aP5YWL5pavJyxcclxuICAgICAgcGFnZToxLFxyXG4gICAgICBtYXRjaExpc3Q6W10sXHJcbiAgICAgIHRvdGFsOjAsXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgZ290b1Jlc3VsdCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9yZXN1bHRgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZldHVyZSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mZWF0dXJlYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qIOaJk+W8gOi2s+eQg+avlOi1myAqL1xyXG4gICAgICAgIG9wZW5NaW5pMSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eGUwYTRjNWI5Zjg1ZjljZjUnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDkuJbnlYzmna/otrPnkIPmg4XmiqUgKi9cclxuICAgICAgICBvcGVuTWluaTIoKXtcclxuICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4MGMyZDUxYjdiNDMzN2MzYScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZm9ybUlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm3lj5HnlJ/kuoZzdWJtaXTkuovku7bvvIzmkLrluKbmlbDmja7kuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDosIPmlbTliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgICBzZXRTaGFyZUNvbnRlbnQoKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKDEpO1xyXG4gICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBcIuWViuWTiOWTiOaymeWPkeaIluWkmuaIluWwkVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICBnZXRDbGFzc0xpc3QoKXtcclxuICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLm1hdGNoTGlzdCxkYXRhOnt0eXBlIDogMixwYWdlOiB0aGlzLnBhZ2V9fSlcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgbGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICB2YWwuaXNGb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YWwubWF0Y2hfdGltZSA9IHZhbC5tYXRjaF90aW1lLnNsaWNlKDEwLDE2KTtcclxuICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgdGhpcy50b3RhbCA9IHJlcy5kYXRhLmRhdGEubWV0YS50b3RhbDtcclxuICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gdGhpcy5tYXRjaExpc3QuY29uY2F0KCByZXMuZGF0YS5kYXRhLmxpc3QgKTtcclxuICAgICAgICAgIHRoaXMucGFnZSArKyA7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAvKnRoaXMuZ2V0QmFubmVycygpOyovXHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAgKi9cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgLy8g5Yi35paw5a6M5ZCO5YGc5q2i5Yi35pawXHJcbiAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qIOS4iuaLieinpuW6lSAqL1xyXG4gICAgb25SZWFjaEJvdHRvbSgpe1xyXG4gICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0gKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAvKiB0b2RvOuiuvue9ruimgeWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICBjb25zb2xlLmxvZygyKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlQ29udGVudCxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==