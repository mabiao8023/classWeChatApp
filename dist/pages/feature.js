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
          type: 2,
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
      this.start = this.getNowFormatDate();
      this.end = this.getNowFormatDate(new Date(new Date().getTime() + 604800000));
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/feature'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmUuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJyZXF1ZXN0IiwidXJsIiwibWF0Y2hMaXN0IiwiZGF0YSIsInR5cGUiLCJwYWdlIiwiZGF0ZSIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidG9rZW4iLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJsaXN0IiwicmVzIiwidG90YWwiLCJtZXRhIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsIm1hdGNoX3RpbWVfbWludXRlIiwibWF0Y2hfdGltZSIsInNsaWNlIiwiY29uY2F0IiwiJGFwcGx5IiwiZ2V0Tm93Rm9ybWF0RGF0ZSIsInN0YXJ0IiwiZW5kIiwiRGF0ZSIsImdldFRpbWUiLCJnZXRDbGFzc0xpc3QiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiaXNVcEZyYXNoIiwiY29uc29sZSIsImxvZyIsInNoYXJlQ29udGVudCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJtaXhpbnMiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiYmFubmVycyIsImNsYXNzTGlzdCIsImdhbWVMaXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ290b1Jlc3VsdCIsIm5hdmlnYXRlVG8iLCJnb3RvRmV0dXJlIiwib3Blbk1pbmkxIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJleHRyYURhdGEiLCJmb28iLCJlbnZWZXJzaW9uIiwib3Blbk1pbmkyIiwiZm9ybVN1Ym1pdCIsImUiLCJkZXRhaWwiLCJmb3JtSWQiLCJ2YWx1ZSIsInNldFNoYXJlQ29udGVudCIsIm1hdGNoIiwibGVhZ3VlX25hbWUiLCJob21lIiwiaG9tZV9zY29yZSIsImF3YXlfc2NvcmUiLCJhd2F5IiwiYmluZERhdGVDaGFuZ2UiLCJjb2xsZWN0IiwiaW5kZXgiLCJpZCIsImlzX2NvbGxlY3QiLCJtYXRjaENvbGxlY3QiLCJtZXRob2QiLCJtYXRjaF9pZCIsInRvdGFsRm9jdXMiLCJldmVudHMiLCIkZXZlbnQiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUYyQzs7O0lBSXRCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErSW5COztBQUVDOzttQ0FFYTtBQUFBOztBQUNaQyxTQUFHQyxXQUFILENBQWU7QUFDUEMsZUFBTztBQURBLE9BQWY7QUFHQyxhQUFPLGVBQUtDLE9BQUwsQ0FBYSxFQUFDQyxLQUFJLGlCQUFRQyxTQUFiO0FBQ2pCQyxjQUFLO0FBQ0hDLGdCQUFPLENBREo7QUFFSEMsZ0JBQU0sS0FBS0EsSUFGUjtBQUdIQyxnQkFBTSxLQUFLQTtBQUhSLFNBRFk7QUFNakJDLGdCQUFRO0FBQ0osZ0NBQW9CLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEeEMsU0FOUyxFQUFiLEVBU0xDLElBVEssQ0FTQyxlQUFPO0FBQ1pkLFdBQUdlLFdBQUg7O0FBRUEsWUFBSUMsT0FBT0MsSUFBSVgsSUFBSixDQUFTQSxJQUFULENBQWNVLElBQXpCO0FBQ0EsZUFBS0UsS0FBTCxHQUFhRCxJQUFJWCxJQUFKLENBQVNBLElBQVQsQ0FBY2EsSUFBZCxDQUFtQkQsS0FBaEM7QUFDQUYsYUFBS0ksTUFBTCxJQUFlSixLQUFLSyxPQUFMLENBQWMsZUFBTzs7QUFFbENDLGNBQUlDLGlCQUFKLEdBQXdCRCxJQUFJRSxVQUFKLElBQWtCRixJQUFJRSxVQUFKLENBQWVDLEtBQWYsQ0FBcUIsRUFBckIsRUFBd0IsRUFBeEIsQ0FBMUM7QUFDRCxTQUhjLENBQWY7QUFJRSxlQUFLcEIsU0FBTCxHQUFpQixPQUFLQSxTQUFMLENBQWVxQixNQUFmLENBQXVCVCxJQUFJWCxJQUFKLENBQVNBLElBQVQsQ0FBY1UsSUFBckMsQ0FBakI7QUFDQSxlQUFLUixJQUFMO0FBQ0EsZUFBS21CLE1BQUw7QUFDSCxPQXJCSyxDQUFQO0FBc0JGOzs7NkJBRVE7QUFDUDtBQUNBLFdBQUtsQixJQUFMLEdBQVksS0FBS21CLGdCQUFMLEVBQVo7QUFDQSxXQUFLQyxLQUFMLEdBQWEsS0FBS0QsZ0JBQUwsRUFBYjtBQUNBLFdBQUtFLEdBQUwsR0FBVyxLQUFLRixnQkFBTCxDQUFzQixJQUFJRyxJQUFKLENBQVMsSUFBSUEsSUFBSixHQUFXQyxPQUFYLEtBQXVCLFNBQWhDLENBQXRCLENBQVg7QUFDQSxXQUFLQyxZQUFMO0FBRUQ7O0FBSUQ7Ozs7Ozt3Q0FHcUI7QUFDbkI7QUFDQSxXQUFLekIsSUFBTCxHQUFZLENBQVo7QUFDQSxXQUFLSCxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsV0FBSzRCLFlBQUwsR0FBb0JuQixJQUFwQixDQUEwQixlQUFPO0FBQy9CZCxXQUFHa0MsbUJBQUg7QUFDRCxPQUZEO0FBR0Q7O0FBR0Q7Ozs7b0NBQ2U7QUFBQTs7QUFDYixXQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsV0FBS0YsWUFBTCxHQUFvQm5CLElBQXBCLENBQTBCLGVBQU87QUFDL0IsZUFBS3FCLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxlQUFLUixNQUFMO0FBQ0QsT0FIRDtBQUlEOzs7d0NBRW1CO0FBQ2xCO0FBQ0FTLGNBQVFDLEdBQVIsQ0FBWSxDQUFaO0FBQ0EsYUFBTztBQUNIbkMsZUFBTyxLQUFLb0MsWUFEVDtBQUVIQyxjQUFNLGNBRkg7QUFHSEMsa0JBQVMsdUJBSE47QUFJSEMsaUJBQVEsaUJBQVN4QixHQUFULEVBQWM7QUFDcEI7QUFDRCxTQU5FO0FBT0h5QixjQUFNLGNBQVN6QixHQUFULEVBQWM7QUFDbEI7QUFDRDtBQVRFLE9BQVA7QUFXRDs7OztFQTlOZ0MsZUFBS1QsSTs7Ozs7T0FDdENtQyxNLEdBQVM7QUFDUEMsNEJBQXdCLElBRGpCO0FBRVBDLGtDQUE4QixTQUZ2QjtBQUdQQyw0QkFBd0I7QUFIakIsRztPQU1UQyxVLEdBQWE7QUFDWEM7QUFEVyxHO09BSWJDLE0sR0FBUyxnQjtPQUVUM0MsSSxHQUFPO0FBQ0w0QyxtQkFBZSxJQURWO0FBRUxDLGNBQVUsSUFGTDtBQUdMQyxjQUFVLElBSEw7QUFJTEMsY0FBVSxJQUpMO0FBS0xDLGFBQVEsRUFMSDtBQU1MQyxlQUFVLEVBTkw7QUFPTEMsY0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLEVBQW5CLEVBQXNCLEVBQXRCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQTZCLENBQTdCLEVBQStCLENBQS9CLEVBQWlDLENBQWpDLENBUEo7QUFRTHJCLGVBQVUsS0FSTDtBQVNMRyxrQkFBYSxVQVRSO0FBVUw5QixVQUFLLENBVkE7QUFXTEgsZUFBVSxFQVhMO0FBWUxhLFdBQU0sQ0FaRDtBQWFMVCxVQUFNLEVBYkQ7QUFjTG9CLFdBQU8sRUFkRjtBQWVMQyxTQUFJO0FBZkMsRztPQWtCUDJCLFEsR0FBVyxFO09BSVhDLE8sR0FBVTtBQUNOQyxjQURNLHdCQUNNO0FBQ1YzRCxTQUFHNEQsVUFBSCxDQUFjO0FBQ1p4RDtBQURZLE9BQWQ7QUFHRCxLQUxLO0FBTU55RCxjQU5NLHdCQU1NO0FBQ1Y3RCxTQUFHNEQsVUFBSCxDQUFjO0FBQ1p4RDtBQURZLE9BQWQ7QUFHRCxLQVZLOztBQVdOO0FBQ0EwRCxhQVpNLHVCQVlLO0FBQ1Q5RCxTQUFHK0QscUJBQUgsQ0FBeUI7QUFDdkJDLGVBQU8sb0JBRGdCO0FBRXZCekIsY0FBTSxhQUZpQjtBQUd2QjBCLG1CQUFXO0FBQ1RDLGVBQUs7QUFESSxTQUhZO0FBTXZCQyxvQkFBWSxTQU5XO0FBT3ZCMUIsZUFQdUIsbUJBT2Z4QixHQVBlLEVBT1Y7QUFDWDtBQUNEO0FBVHNCLE9BQXpCO0FBV0QsS0F4Qks7OztBQTBCTjtBQUNBbUQsYUEzQk0sdUJBMkJLO0FBQ1JwRSxTQUFHK0QscUJBQUgsQ0FBeUI7QUFDeEJDLGVBQU8sb0JBRGlCO0FBRXhCekIsY0FBTSxhQUZrQjtBQUd4QjBCLG1CQUFXO0FBQ1RDLGVBQUs7QUFESSxTQUhhO0FBTXhCQyxvQkFBWSxTQU5ZO0FBT3hCMUIsZUFQd0IsbUJBT2hCeEIsR0FQZ0IsRUFPWDtBQUNYO0FBQ0Q7QUFUdUIsT0FBekI7QUFXRixLQXZDSzs7QUF3Q05vRCxnQkFBWSxvQkFBU0MsQ0FBVCxFQUFZO0FBQ3BCO0FBQ0FsQyxjQUFRQyxHQUFSLENBQVlpQyxFQUFFQyxNQUFGLENBQVNDLE1BQXJCO0FBQ0FwQyxjQUFRQyxHQUFSLENBQVksd0JBQVosRUFBc0NpQyxFQUFFQyxNQUFGLENBQVNFLEtBQS9DO0FBQ0gsS0E1Q0s7O0FBOENOO0FBQ0FDLG1CQS9DTSwyQkErQ1VDLEtBL0NWLEVBK0NnQjtBQUNwQixXQUFLckMsWUFBTCxHQUF1QnFDLE1BQU1DLFdBQTdCLFNBQTRDRCxNQUFNbkQsVUFBTixDQUFpQkMsS0FBakIsQ0FBdUIsQ0FBdkIsRUFBeUJrRCxNQUFNbkQsVUFBTixDQUFpQkosTUFBakIsR0FBd0IsQ0FBakQsQ0FBNUMsU0FBbUd1RCxNQUFNRSxJQUF6RyxVQUFrSEYsTUFBTUcsVUFBeEgsU0FBc0lILE1BQU1JLFVBQTVJLFNBQTBKSixNQUFNSyxJQUFoSztBQUNELEtBakRLO0FBbUROQyxrQkFuRE0sMEJBbURTWCxDQW5EVCxFQW1EVztBQUNmLFdBQUs3RCxJQUFMLEdBQVk2RCxFQUFFQyxNQUFGLENBQVNFLEtBQXJCO0FBQ0EsV0FBS2pFLElBQUwsR0FBWSxDQUFaO0FBQ0EsV0FBS0gsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFdBQUs0QixZQUFMO0FBQ0QsS0F4REs7O0FBeUROO0FBQ0FpRCxXQTFETSxtQkEwREVDLEtBMURGLEVBMERRQyxFQTFEUixFQTBEVztBQUFBOztBQUVmLFVBQUksS0FBSy9FLFNBQUwsQ0FBZThFLEtBQWYsRUFBc0JFLFVBQTFCLEVBQXVDO0FBQ3JDckYsV0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPO0FBRE0sU0FBZjtBQUdFLHVCQUFLQyxPQUFMLENBQWEsRUFBQ0MsS0FBSSxpQkFBUWtGLFlBQWI7QUFDWEMsa0JBQU8sUUFESTtBQUVYakYsZ0JBQUssRUFBQ2tGLFVBQVdKLEVBQVosRUFGTTtBQUdWMUUsa0JBQVE7QUFDTCxrQ0FBb0IsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR2QyxXQUhFLEVBQWIsRUFNQ0MsSUFORCxDQU1PLGVBQU87QUFDVmQsYUFBR2UsV0FBSDtBQUNBLGlCQUFLVixTQUFMLENBQWU4RSxLQUFmLEVBQXNCRSxVQUF0QixHQUFtQyxLQUFuQztBQUNBLGlCQUFLSSxVQUFMO0FBQ0EsaUJBQUs5RCxNQUFMO0FBQ0FTLGtCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNILFNBWkQ7QUFhSCxPQWpCRCxNQWlCSztBQUNEckMsV0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPO0FBRE0sU0FBZjtBQUdBLHVCQUFLQyxPQUFMLENBQWEsRUFBQ0MsS0FBSSxpQkFBUWtGLFlBQWI7QUFDWEMsa0JBQU8sTUFESTtBQUVYakYsZ0JBQUssRUFBQ2tGLFVBQVdKLEVBQVosRUFGTTtBQUdWMUUsa0JBQVE7QUFDTCxrQ0FBb0IsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR2QyxXQUhFLEVBQWIsRUFNQ0MsSUFORCxDQU1PLGVBQU87QUFDVmQsYUFBR2UsV0FBSDtBQUNBLGlCQUFLVixTQUFMLENBQWU4RSxLQUFmLEVBQXNCRSxVQUF0QixHQUFtQyxJQUFuQztBQUNBLGlCQUFLSSxVQUFMO0FBQ0EsaUJBQUs5RCxNQUFMO0FBQ0FTLGtCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNILFNBWkQ7QUFhSDtBQUVGO0FBaEdLLEc7T0FvR1ZxRCxNLEdBQVM7QUFDUCxrQkFBYyxxQkFBYTtBQUFBOztBQUN6QixVQUFJQyxrQkFBYyxVQUFLdkUsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FnQixjQUFRQyxHQUFSLENBQWUsT0FBS3VELEtBQXBCLGlCQUFxQ0QsT0FBT0UsSUFBNUMsY0FBeURGLE9BQU9HLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQUpNLEU7OztrQkF2SVU3RixLIiwiZmlsZSI6ImZlYXR1cmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LWb56iLJyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snICBcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3RcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICBiYW5uZXJzOltdLFxyXG4gICAgICBjbGFzc0xpc3Q6W10sXHJcbiAgICAgIGdhbWVMaXN0OlsxLDIsMyw0LDUsNiw3LDgsOSwyMCwzMywzLDMsMywzLDMsXSxcclxuICAgICAgaXNVcEZyYXNoOmZhbHNlLFxyXG4gICAgICBzaGFyZUNvbnRlbnQ6J+aXtumXtOeci+W+l+ingeemj+WFi+aWrycsXHJcbiAgICAgIHBhZ2U6MSxcclxuICAgICAgbWF0Y2hMaXN0OltdLFxyXG4gICAgICB0b3RhbDowLFxyXG4gICAgICBkYXRlOiAnJyxcclxuICAgICAgc3RhcnQ6ICcnLFxyXG4gICAgICBlbmQ6JycsXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgZ290b1Jlc3VsdCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9yZXN1bHRgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZldHVyZSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mZWF0dXJlYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qIOaJk+W8gOi2s+eQg+avlOi1myAqL1xyXG4gICAgICAgIG9wZW5NaW5pMSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eGUwYTRjNWI5Zjg1ZjljZjUnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDkuJbnlYzmna/otrPnkIPmg4XmiqUgKi9cclxuICAgICAgICBvcGVuTWluaTIoKXtcclxuICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4MGMyZDUxYjdiNDMzN2MzYScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZm9ybUlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm3lj5HnlJ/kuoZzdWJtaXTkuovku7bvvIzmkLrluKbmlbDmja7kuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDosIPmlbTliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgICBzZXRTaGFyZUNvbnRlbnQobWF0Y2gpe1xyXG4gICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBgJHttYXRjaC5sZWFndWVfbmFtZX0gJHttYXRjaC5tYXRjaF90aW1lLnNsaWNlKDAsbWF0Y2gubWF0Y2hfdGltZS5sZW5ndGgtMyl9ICR7bWF0Y2guaG9tZX0gICR7bWF0Y2guaG9tZV9zY29yZX0tJHttYXRjaC5hd2F5X3Njb3JlfSAke21hdGNoLmF3YXl9YDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kRGF0ZUNoYW5nZShlKXtcclxuICAgICAgICAgIHRoaXMuZGF0ZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyog5pS26JePICovXHJcbiAgICAgICAgY29sbGVjdChpbmRleCxpZCl7XHJcblxyXG4gICAgICAgICAgaWYoIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ICApe1xyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICflj5bmtojkuK0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7dXJsOmFwaVBhdGgubWF0Y2hDb2xsZWN0LFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7bWF0Y2hfaWQgOiBpZH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxGb2N1cyAtLSA7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflj5bmtojmlLbol4/miJDlip8nKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICflhbPms6jkuK0nLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaENvbGxlY3QsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7bWF0Y2hfaWQgOiBpZH0sXHJcbiAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hMaXN0W2luZGV4XS5pc19jb2xsZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEZvY3VzICsrIDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aUtuiXj+aIkOWKnycpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g6I635Y+W6K++56iL5YiX6KGoXHJcbiAgICBcclxuICAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgZ2V0Q2xhc3NMaXN0KCl7XHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICByZXR1cm4gd2VweS5yZXF1ZXN0KHt1cmw6YXBpUGF0aC5tYXRjaExpc3QsXHJcbiAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgdHlwZSA6IDIsXHJcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcclxuICAgICAgICAgICAgZGF0ZTogdGhpcy5kYXRlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbn1gXHJcbiAgICAgICAgICAgfSx9KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuXHJcbiAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgIHRoaXMudG90YWwgPSByZXMuZGF0YS5kYXRhLm1ldGEudG90YWw7XHJcbiAgICAgICAgICBsaXN0Lmxlbmd0aCAmJiBsaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcblxyXG4gICAgICAgICAgICB2YWwubWF0Y2hfdGltZV9taW51dGUgPSB2YWwubWF0Y2hfdGltZSAmJiB2YWwubWF0Y2hfdGltZS5zbGljZSgxMCwxNik7XHJcbiAgICAgICAgICB9IClcclxuICAgICAgICAgICAgdGhpcy5tYXRjaExpc3QgPSB0aGlzLm1hdGNoTGlzdC5jb25jYXQoIHJlcy5kYXRhLmRhdGEubGlzdCApO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgKysgO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAvKnRoaXMuZ2V0QmFubmVycygpOyovXHJcbiAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZ2V0Tm93Rm9ybWF0RGF0ZSgpO1xyXG4gICAgICB0aGlzLnN0YXJ0ID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKCk7XHJcbiAgICAgIHRoaXMuZW5kID0gdGhpcy5nZXROb3dGb3JtYXREYXRlKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgNjA0ODAwMDAwKSk7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAgKi9cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgLy8g5Yi35paw5a6M5ZCO5YGc5q2i5Yi35pawXHJcbiAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgIHRoaXMubWF0Y2hMaXN0ID0gW107XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qIOS4iuaLieinpuW6lSAqL1xyXG4gICAgb25SZWFjaEJvdHRvbSgpe1xyXG4gICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB0aGlzLmlzVXBGcmFzaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0gKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAvKiB0b2RvOuiuvue9ruimgeWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICBjb25zb2xlLmxvZygyKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlQ29udGVudCxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==