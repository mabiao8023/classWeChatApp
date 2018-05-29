'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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
    key: 'getBanners',


    // 获取banners列表

    value: function getBanners() {
      var _this2 = this;

      _wepy2.default.request(_config2.default.leagueList).then(function (res) {
        console.log(res.data.data);
        _this2.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.getBanners();
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      return {
        title: '夜猫足彩课程',
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
  var _this3 = this;

  this.config = {
    navigationBarTitleText: '赛事筛选',
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
    ls: ['法甲', '欧冠杯', '自由杯', '巴西乙', '哥轮甲春', '法甲', '欧冠杯', '自由杯', '巴西乙', '哥轮甲春', '法甲', '欧冠杯', '自由杯', '巴西乙', '哥轮甲春', '法甲', '欧冠杯', '自由杯', '巴西乙', '哥轮甲春', '法甲', '欧冠杯', '自由杯', '巴西乙', '哥轮甲春', '法甲', '欧冠杯', '自由杯', '巴西乙', '哥轮甲春', '法甲', '欧冠杯', '自由杯', '巴西乙', '哥轮甲春', '法甲', '欧冠杯', '自由杯', '巴西乙', '哥轮甲春', '法甲', '欧冠杯', '自由杯', '巴西乙', '哥轮甲春'],
    leagueList: []
  };
  this.computed = {};
  this.methods = {
    banneGotoClassIndex: function banneGotoClassIndex(url) {
      var id = 6;
      try {
        id = url.split('?')[1].split('=')[1];
      } catch (e) {}
      wx.navigateTo({
        url: '/pages/classDetail?id=' + id
      });
    },
    gotoClassIndex: function gotoClassIndex(id) {
      wx.navigateTo({
        url: '/pages/classDetail?id=' + id
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
    }

  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this3.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    } };
};

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYWl4dWFuLmpzIl0sIm5hbWVzIjpbIkluZGV4Iiwid2VweSIsInJlcXVlc3QiLCJhcGlQYXRoIiwibGVhZ3VlTGlzdCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwiZGF0YSIsIiRhcHBseSIsImdldEJhbm5lcnMiLCJ0aXRsZSIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImNvbXBvbmVudHMiLCJjb250YWN0IiwiQ29udGFjdCIsIm1peGlucyIsIm15TWl4aW4iLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiYmFubmVycyIsImNsYXNzTGlzdCIsImxzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmFubmVHb3RvQ2xhc3NJbmRleCIsInVybCIsImlkIiwic3BsaXQiLCJlIiwid3giLCJuYXZpZ2F0ZVRvIiwiZ290b0NsYXNzSW5kZXgiLCJvcGVuTWluaTEiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsImV4dHJhRGF0YSIsImZvbyIsImVudlZlcnNpb24iLCJvcGVuTWluaTIiLCJmb3JtU3VibWl0IiwiZGV0YWlsIiwiZm9ybUlkIiwidmFsdWUiLCJldmVudHMiLCIkZXZlbnQiLCJsZW5ndGgiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUYyQzs7O0lBSXRCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzR25COztpQ0FFWTtBQUFBOztBQUNWQyxxQkFBS0MsT0FBTCxDQUFhQyxpQkFBUUMsVUFBckIsRUFDR0MsSUFESCxDQUNTLGVBQU87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ZUFQd0IsbUJBT2hCUCxHQVBnQixFQU9YO0FBQ1g7QUFDRDtBQVR1QixPQUF6QjtBQVdGLEtBOUNLOztBQStDTjRDLGdCQUFZLG9CQUFTWCxDQUFULEVBQVk7QUFDcEI7QUFDQW5DLGNBQVFDLEdBQVIsQ0FBWWtDLEVBQUVZLE1BQUYsQ0FBU0MsTUFBckI7QUFDQWhELGNBQVFDLEdBQVIsQ0FBWSx3QkFBWixFQUFzQ2tDLEVBQUVZLE1BQUYsQ0FBU0UsS0FBL0M7QUFDSDs7QUFuREssRztPQXVEVkMsTSxHQUFTO0FBQ1Asa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSUMsa0JBQWMsVUFBS0MsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FwRCxjQUFRQyxHQUFSLENBQWUsT0FBS29ELEtBQXBCLGlCQUFxQ0YsT0FBT0csSUFBNUMsY0FBeURILE9BQU9JLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQUpNLEU7OztrQkEvRlUzRCxLIiwiZmlsZSI6InNoYWl4dWFuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i1m+S6i+etm+mAiScsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3RcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICBiYW5uZXJzOltdLFxyXG4gICAgICBjbGFzc0xpc3Q6W10sXHJcbiAgICAgIGxzOltcclxuICAgICAgICAn5rOV55SyJywn5qyn5Yag5p2vJywn6Ieq55Sx5p2vJywn5be06KW/5LmZJywn5ZOl6L2u55Sy5pilJyxcclxuICAgICAgICAn5rOV55SyJywn5qyn5Yag5p2vJywn6Ieq55Sx5p2vJywn5be06KW/5LmZJywn5ZOl6L2u55Sy5pilJyxcclxuICAgICAgICAn5rOV55SyJywn5qyn5Yag5p2vJywn6Ieq55Sx5p2vJywn5be06KW/5LmZJywn5ZOl6L2u55Sy5pilJyxcclxuICAgICAgICAn5rOV55SyJywn5qyn5Yag5p2vJywn6Ieq55Sx5p2vJywn5be06KW/5LmZJywn5ZOl6L2u55Sy5pilJyxcclxuICAgICAgICAn5rOV55SyJywn5qyn5Yag5p2vJywn6Ieq55Sx5p2vJywn5be06KW/5LmZJywn5ZOl6L2u55Sy5pilJyxcclxuICAgICAgICAn5rOV55SyJywn5qyn5Yag5p2vJywn6Ieq55Sx5p2vJywn5be06KW/5LmZJywn5ZOl6L2u55Sy5pilJyxcclxuICAgICAgICAn5rOV55SyJywn5qyn5Yag5p2vJywn6Ieq55Sx5p2vJywn5be06KW/5LmZJywn5ZOl6L2u55Sy5pilJyxcclxuICAgICAgICAn5rOV55SyJywn5qyn5Yag5p2vJywn6Ieq55Sx5p2vJywn5be06KW/5LmZJywn5ZOl6L2u55Sy5pilJyxcclxuICAgICAgICAn5rOV55SyJywn5qyn5Yag5p2vJywn6Ieq55Sx5p2vJywn5be06KW/5LmZJywn5ZOl6L2u55Sy5pilJyxcclxuICAgICAgXSxcclxuICAgICAgbGVhZ3VlTGlzdDpbXSxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBiYW5uZUdvdG9DbGFzc0luZGV4KHVybCl7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IDY7XHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICBpZCA9IHVybC5zcGxpdCgnPycpWzFdLnNwbGl0KCc9JylbMV0gIFxyXG4gICAgICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3NEZXRhaWw/aWQ9JHtpZH1gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgIFxyXG4gICAgICAgIGdvdG9DbGFzc0luZGV4KGlkKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3NEZXRhaWw/aWQ9JHtpZH1gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyog5omT5byA6Laz55CD5q+U6LWbICovXHJcbiAgICAgICAgb3Blbk1pbmkxKCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4ZTBhNGM1YjlmODVmOWNmNScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qIOS4lueVjOadr+i2s+eQg+aDheaKpSAqL1xyXG4gICAgICAgIG9wZW5NaW5pMigpe1xyXG4gICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3gwYzJkNTFiN2I0MzM3YzNhJyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XHJcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC5mb3JtSWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnN1Ym1pdOS6i+S7tu+8jOaQuuW4puaVsOaNruS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5ZiYW5uZXJz5YiX6KGoXHJcbiAgICBcclxuICAgIGdldEJhbm5lcnMoKXtcclxuICAgICAgd2VweS5yZXF1ZXN0KGFwaVBhdGgubGVhZ3VlTGlzdClcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICB0aGlzLmdldEJhbm5lcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICflpJznjKvotrPlvanor77nqIsnLFxyXG4gICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=