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

      _wepy2.default.request(_config2.default.classList).then(function (res) {
        _this2.classList = res.data.data.list;
        _this2.classList.forEach(function (val) {
          val.price = _this2.formateMoney(val.price);
          val.expire_month = _this2.formateMonth(val.expire_month);
        });
        _this2.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {}
    /*this.getBanners();
    this.getClassList();*/


    /**
     * 页面相关事件处理函数--监听用户下拉动作
    */

  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      // 刷新完后停止刷新

      setTimeout(function () {
        wx.stopPullDownRefresh();
      }, 2000);
    }

    /* 上拉触底 */

  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      var _this3 = this;

      this.isUpFrash = true;
      setTimeout(function () {
        _this3.isUpFrash = false;
        _this3.$apply();
      }, 2000);
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
  var _this4 = this;

  this.config = {
    navigationBarTitleText: '赛程',
    navigationBarBackgroundColor: '#ffffff',
    enablePullDownRefresh: false,
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
    shareContent: '时间看得见福克斯'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmUuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJyZXF1ZXN0IiwiY2xhc3NMaXN0IiwidGhlbiIsInJlcyIsImRhdGEiLCJsaXN0IiwiZm9yRWFjaCIsInZhbCIsInByaWNlIiwiZm9ybWF0ZU1vbmV5IiwiZXhwaXJlX21vbnRoIiwiZm9ybWF0ZU1vbnRoIiwiJGFwcGx5Iiwic2V0VGltZW91dCIsInd4Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImlzVXBGcmFzaCIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZSIsInNoYXJlQ29udGVudCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImNvbXBvbmVudHMiLCJjb250YWN0IiwibWl4aW5zIiwiaW5kaWNhdG9yRG90cyIsImF1dG9wbGF5IiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImJhbm5lcnMiLCJnYW1lTGlzdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvdG9SZXN1bHQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ290b0ZldHVyZSIsIm9wZW5NaW5pMSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwiZXh0cmFEYXRhIiwiZm9vIiwiZW52VmVyc2lvbiIsIm9wZW5NaW5pMiIsImZvcm1TdWJtaXQiLCJlIiwiZGV0YWlsIiwiZm9ybUlkIiwidmFsdWUiLCJzZXRTaGFyZUNvbnRlbnQiLCJldmVudHMiLCIkZXZlbnQiLCJsZW5ndGgiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUYyQzs7O0lBSXRCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0Rm5COzttQ0FFYztBQUFBOztBQUNaLHFCQUFLQyxPQUFMLENBQWEsaUJBQVFDLFNBQXJCLEVBQ0dDLElBREgsQ0FDUyxlQUFPO0FBQ1YsZUFBS0QsU0FBTCxHQUFpQkUsSUFBSUMsSUFBSixDQUFTQSxJQUFULENBQWNDLElBQS9CO0FBQ0EsZUFBS0osU0FBTCxDQUFlSyxPQUFmLENBQXdCLGVBQU87QUFDN0JDLGNBQUlDLEtBQUosR0FBWSxPQUFLQyxZQUFMLENBQWtCRixJQUFJQyxLQUF0QixDQUFaO0FBQ0FELGNBQUlHLFlBQUosR0FBbUIsT0FBS0MsWUFBTCxDQUFrQkosSUFBSUcsWUFBdEIsQ0FBbkI7QUFDRCxTQUhEO0FBSUEsZUFBS0UsTUFBTDtBQUNILE9BUkg7QUFTRDs7OzZCQUVRLENBR1I7QUFGQzs7OztBQUlGOzs7Ozs7d0NBR3FCO0FBQ25COztBQUVBQyxpQkFBWSxZQUFNO0FBQ2RDLFdBQUdDLG1CQUFIO0FBQ0gsT0FGRCxFQUVFLElBRkY7QUFHRDs7QUFHRDs7OztvQ0FDZTtBQUFBOztBQUNiLFdBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQUgsaUJBQVksWUFBTTtBQUNkLGVBQUtHLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxlQUFLSixNQUFMO0FBQ0gsT0FIRCxFQUdFLElBSEY7QUFJQUssY0FBUUMsR0FBUixDQUFZLE9BQVo7QUFDRDs7O3dDQUVtQjtBQUNsQjtBQUNBRCxjQUFRQyxHQUFSLENBQVksQ0FBWjtBQUNBLGFBQU87QUFDSEMsZUFBTyxLQUFLQyxZQURUO0FBRUhDLGNBQU0sY0FGSDtBQUdIQyxrQkFBUyx1QkFITjtBQUlIQyxpQkFBUSxpQkFBU3BCLEdBQVQsRUFBYztBQUNwQjtBQUNELFNBTkU7QUFPSHFCLGNBQU0sY0FBU3JCLEdBQVQsRUFBYztBQUNsQjtBQUNEO0FBVEUsT0FBUDtBQVdEOzs7O0VBbkpnQyxlQUFLc0IsSTs7Ozs7T0FDdENDLE0sR0FBUztBQUNQQyw0QkFBd0IsSUFEakI7QUFFUEMsa0NBQThCLFNBRnZCO0FBR1BDLDJCQUF1QixLQUhoQjtBQUlQQyw0QkFBd0I7QUFKakIsRztPQU9UQyxVLEdBQWE7QUFDWEM7QUFEVyxHO09BSWJDLE0sR0FBUyxnQjtPQUVUN0IsSSxHQUFPO0FBQ0w4QixtQkFBZSxJQURWO0FBRUxDLGNBQVUsSUFGTDtBQUdMQyxjQUFVLElBSEw7QUFJTEMsY0FBVSxJQUpMO0FBS0xDLGFBQVEsRUFMSDtBQU1MckMsZUFBVSxFQU5MO0FBT0xzQyxjQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsRUFBbkIsRUFBc0IsRUFBdEIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsQ0FQSjtBQVFMdkIsZUFBVSxLQVJMO0FBU0xJLGtCQUFhO0FBVFIsRztPQVlQb0IsUSxHQUFXLEU7T0FJWEMsTyxHQUFVO0FBQ05DLGNBRE0sd0JBQ007QUFDVjVCLFNBQUc2QixVQUFILENBQWM7QUFDWkM7QUFEWSxPQUFkO0FBR0QsS0FMSztBQU1OQyxjQU5NLHdCQU1NO0FBQ1YvQixTQUFHNkIsVUFBSCxDQUFjO0FBQ1pDO0FBRFksT0FBZDtBQUdELEtBVks7O0FBV047QUFDQUUsYUFaTSx1QkFZSztBQUNUaEMsU0FBR2lDLHFCQUFILENBQXlCO0FBQ3ZCQyxlQUFPLG9CQURnQjtBQUV2QjNCLGNBQU0sYUFGaUI7QUFHdkI0QixtQkFBVztBQUNUQyxlQUFLO0FBREksU0FIWTtBQU12QkMsb0JBQVksU0FOVztBQU92QjVCLGVBUHVCLG1CQU9mcEIsR0FQZSxFQU9WO0FBQ1g7QUFDRDtBQVRzQixPQUF6QjtBQVdELEtBeEJLOzs7QUEwQk47QUFDQWlELGFBM0JNLHVCQTJCSztBQUNSdEMsU0FBR2lDLHFCQUFILENBQXlCO0FBQ3hCQyxlQUFPLG9CQURpQjtBQUV4QjNCLGNBQU0sYUFGa0I7QUFHeEI0QixtQkFBVztBQUNUQyxlQUFLO0FBREksU0FIYTtBQU14QkMsb0JBQVksU0FOWTtBQU94QjVCLGVBUHdCLG1CQU9oQnBCLEdBUGdCLEVBT1g7QUFDWDtBQUNEO0FBVHVCLE9BQXpCO0FBV0YsS0F2Q0s7O0FBd0NOa0QsZ0JBQVksb0JBQVNDLENBQVQsRUFBWTtBQUNwQjtBQUNBckMsY0FBUUMsR0FBUixDQUFZb0MsRUFBRUMsTUFBRixDQUFTQyxNQUFyQjtBQUNBdkMsY0FBUUMsR0FBUixDQUFZLHdCQUFaLEVBQXNDb0MsRUFBRUMsTUFBRixDQUFTRSxLQUEvQztBQUNILEtBNUNLOztBQThDTjtBQUNBQyxtQkEvQ00sNkJBK0NXO0FBQ2Z6QyxjQUFRQyxHQUFSLENBQVksQ0FBWjtBQUNBLFdBQUtFLFlBQUwsR0FBb0IsV0FBcEI7QUFDRDtBQWxESyxHO09Bc0RWdUMsTSxHQUFTO0FBQ1Asa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSUMsa0JBQWMsVUFBS0MsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0E1QyxjQUFRQyxHQUFSLENBQWUsT0FBSzRDLEtBQXBCLGlCQUFxQ0YsT0FBT0csSUFBNUMsY0FBeURILE9BQU9JLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQUpNLEU7OztrQkFwRlUvRCxLIiwiZmlsZSI6ImZlYXR1cmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LWb56iLJyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snICBcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3RcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICBiYW5uZXJzOltdLFxyXG4gICAgICBjbGFzc0xpc3Q6W10sXHJcbiAgICAgIGdhbWVMaXN0OlsxLDIsMyw0LDUsNiw3LDgsOSwyMCwzMywzLDMsMywzLDMsXSxcclxuICAgICAgaXNVcEZyYXNoOmZhbHNlLFxyXG4gICAgICBzaGFyZUNvbnRlbnQ6J+aXtumXtOeci+W+l+ingeemj+WFi+aWrydcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBnb3RvUmVzdWx0KCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3Jlc3VsdGBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3RvRmV0dXJlKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2ZlYXR1cmVgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyog5omT5byA6Laz55CD5q+U6LWbICovXHJcbiAgICAgICAgb3Blbk1pbmkxKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4ZTBhNGM1YjlmODVmOWNmNScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOS4lueVjOadr+i2s+eQg+aDheaKpSAqL1xyXG4gICAgICAgIG9wZW5NaW5pMigpe1xyXG4gICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3gwYzJkNTFiN2I0MzM3YzNhJyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC5mb3JtSWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnN1Ym1pdOS6i+S7tu+8jOaQuuW4puaVsOaNruS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOiwg+aVtOWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICAgIHNldFNoYXJlQ29udGVudCgpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coMSk7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlQ29udGVudCA9IFwi5ZWK5ZOI5ZOI5rKZ5Y+R5oiW5aSa5oiW5bCRXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOiOt+WPluivvueoi+WIl+ihqFxyXG4gICAgXHJcbiAgICBnZXRDbGFzc0xpc3QoKXtcclxuICAgICAgd2VweS5yZXF1ZXN0KGFwaVBhdGguY2xhc3NMaXN0KVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgICAgICB2YWwucHJpY2UgPSB0aGlzLmZvcm1hdGVNb25leSh2YWwucHJpY2UpO1xyXG4gICAgICAgICAgICAgIHZhbC5leHBpcmVfbW9udGggPSB0aGlzLmZvcm1hdGVNb250aCh2YWwuZXhwaXJlX21vbnRoKTtcclxuICAgICAgICAgICAgfSApXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIC8qdGhpcy5nZXRCYW5uZXJzKCk7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KCk7Ki9cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICAqL1xyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAvLyDliLfmlrDlrozlkI7lgZzmraLliLfmlrBcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcclxuICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICB9LDIwMDAgKVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyog5LiK5ouJ6Kem5bqVICovXHJcbiAgICBvblJlYWNoQm90dG9tKCl7XHJcbiAgICAgIHRoaXMuaXNVcEZyYXNoID0gdHJ1ZTtcclxuICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc1VwRnJhc2ggPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0sMjAwMCApXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi5LiK5ouJ6Kem5bqV5LqGXCIpXHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICAgIC8qIHRvZG866K6+572u6KaB5YiG5Lqr55qE5YaF5a65ICovXHJcbiAgICAgIGNvbnNvbGUubG9nKDIpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVDb250ZW50LFxyXG4gICAgICAgICAgcGF0aDogJy9wYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICBpbWFnZVVybDonL2ltYWdlcy9zaGFyZV9pbWcuanBnJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HlpLHotKVcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19