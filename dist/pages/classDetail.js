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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      //navigationBarTitleText: 'test'
    }, _this.components = {
      contact: _contact2.default
    }, _this.mixins = [_test2.default], _this.data = {
      isHasVideo: false,
      classInfo: {},
      navType: 1,
      isPayed: true,
      classId: 8,
      freeClassList: [],
      chapterList: [],
      video: {
        src: ''
      }
    }, _this.computed = {}, _this.methods = {
      navtag: function navtag(type) {
        this.navType = type;
      },
      playVideo: function playVideo() {
        this.isHasVideo = true;
        this.freeClassList.forEach(function (val) {
          val.resource.playing = false;
        });
        item.resource.playing = true;
        this.video.src = item.resource.media_url;
      },
      paytip: function paytip() {
        if (this.isPayed) {
          wx.navigateTo({
            url: '/pages/class?id=' + this.classId
          });
          return;
        }
        wx.showToast({
          title: '请先购买课程',
          icon: 'success',
          duration: 1500
        });
      },
      gotoPay: function gotoPay() {
        wx.showLoading({
          title: '支付中...'
        });
        _wepy2.default.request({
          url: _config2.default.classPay,
          method: "POST",
          data: {
            class_id: this.classId
          },
          header: {
            'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
          }
        }).then(function (res) {
          wx.hideLoading();
          // todo:调微信支付
          // if(res.jsapiConfig){
          // let wxConfig = res.jsapiConfig;
          // commonFn.wxPay({
          //   wxPayConf:wxConfig,
          //   successCb:this.wxPaySuc.bind(this,wxConfig),
          //   failCb:this.layer.bind(this,'支付失败，请重试'),
          //   cancelCb:this.layer.bind(this,'支付失败，请重试'),
          // });
        });
      },
      gotoAircle: function gotoAircle(id) {
        wx.navigateTo({
          url: '/pages/airticle?id=' + id
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'getClassInfo',


    // 获得课程的信息
    value: function getClassInfo() {
      var _this2 = this;

      wx.showLoading({
        title: '获取中...'
      });
      _wepy2.default.request({
        url: _config2.default.classInfo,
        method: "GET",
        data: {
          class_id: this.classId
        },
        header: {
          'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
        }
      }).then(function (res) {
        wx.hideLoading();
        _this2.classInfo = res.data.data;
        _this2.classInfo.price = _this2.formateMoney(_this2.classInfo.price);
        _this2.classInfo.expire_month = _this2.formateMonth(_this2.classInfo.expire_month);
        _this2.$apply();
        console.log(res.data);
      });
    }

    // 获得免费试听列表

  }, {
    key: 'getTryList',
    value: function getTryList() {
      var _this3 = this;

      _wepy2.default.request({
        url: _config2.default.classTry,
        method: "GET",
        data: {
          class_id: this.classId
        },
        header: {
          'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
        }
      }).then(function (res) {
        var data = res.data.data;
        if (data.length) {
          data.forEach(function (val) {
            val.playing = false;
          });
          _this3.freeClassList = data;
          _this3.$apply();
        } else {}
      });
    }

    // 获取章节列表

  }, {
    key: 'getChapterList',
    value: function getChapterList() {
      var _this4 = this;

      _wepy2.default.request({
        url: _config2.default.classChapter,
        method: "GET",
        data: {
          class_id: this.classId
        },
        header: {
          'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
        }
      }).then(function (res) {
        var data = res.data.data;
        if (data.length) {
          data.forEach(function (val, i) {
            val.slide = i === 0 ? false : true;
            val.lesson && val.lesson.forEach(function (val2) {
              val2.resource.playing = false;
            });
          });
          _this4.chapterList = data;
          _this4.$apply();
        } else {}
      });
    }

    // 获取是否已经购买过该课程

  }, {
    key: 'getIsPayed',
    value: function getIsPayed() {
      var _this5 = this;

      _wepy2.default.request({
        url: _config2.default.classPay,
        method: "POST",
        data: {
          class_id: this.classId
        },
        header: {
          'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
        }
      }).then(function (res) {
        console.log(res);
        if (res.data.msg == '您已购买此课程') {
          _this5.isPayed = true;
        } else {
          _this5.isPayed = false;
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      this.classId = options.id;
      this.getClassInfo();
      this.getTryList();
      this.getChapterList();
      this.getIsPayed();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/classDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJtaXhpbnMiLCJkYXRhIiwiaXNIYXNWaWRlbyIsImNsYXNzSW5mbyIsIm5hdlR5cGUiLCJpc1BheWVkIiwiY2xhc3NJZCIsImZyZWVDbGFzc0xpc3QiLCJjaGFwdGVyTGlzdCIsInZpZGVvIiwic3JjIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsImZvckVhY2giLCJ2YWwiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJpdGVtIiwibWVkaWFfdXJsIiwicGF5dGlwIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJnb3RvUGF5Iiwic2hvd0xvYWRpbmciLCJyZXF1ZXN0IiwiY2xhc3NQYXkiLCJtZXRob2QiLCJjbGFzc19pZCIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2Vzc2lvbklEIiwidGhlbiIsImhpZGVMb2FkaW5nIiwiZ290b0FpcmNsZSIsImlkIiwiZXZlbnRzIiwicmVzIiwicHJpY2UiLCJmb3JtYXRlTW9uZXkiLCJleHBpcmVfbW9udGgiLCJmb3JtYXRlTW9udGgiLCIkYXBwbHkiLCJjb25zb2xlIiwibG9nIiwiY2xhc3NUcnkiLCJsZW5ndGgiLCJjbGFzc0NoYXB0ZXIiLCJpIiwic2xpZGUiLCJsZXNzb24iLCJ2YWwyIiwibXNnIiwib3B0aW9ucyIsImdldENsYXNzSW5mbyIsImdldFRyeUxpc3QiLCJnZXRDaGFwdGVyTGlzdCIsImdldElzUGF5ZWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFGMkM7OztJQUd0QkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUDtBQURPLEssUUFHVEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUliQyxNLEdBQVMsZ0IsUUFFVEMsSSxHQUFPO0FBQ0hDLGtCQUFXLEtBRFI7QUFFSEMsaUJBQVUsRUFGUDtBQUdIQyxlQUFRLENBSEw7QUFJSEMsZUFBUSxJQUpMO0FBS0hDLGVBQVEsQ0FMTDtBQU1IQyxxQkFBYyxFQU5YO0FBT0hDLG1CQUFZLEVBUFQ7QUFRSEMsYUFBTTtBQUNKQyxhQUFJO0FBREE7QUFSSCxLLFFBYVBDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUNSQyxZQURRLGtCQUNEQyxJQURDLEVBQ0k7QUFDVixhQUFLVixPQUFMLEdBQWVVLElBQWY7QUFDRCxPQUhPO0FBSVJDLGVBSlEsdUJBSUc7QUFDVCxhQUFLYixVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS0ssYUFBTCxDQUFtQlMsT0FBbkIsQ0FBNEIsZUFBTztBQUNqQ0MsY0FBSUMsUUFBSixDQUFhQyxPQUFiLEdBQXVCLEtBQXZCO0FBQ0QsU0FGRDtBQUdBQyxhQUFLRixRQUFMLENBQWNDLE9BQWQsR0FBd0IsSUFBeEI7QUFDQSxhQUFLVixLQUFMLENBQVdDLEdBQVgsR0FBaUJVLEtBQUtGLFFBQUwsQ0FBY0csU0FBL0I7QUFDRCxPQVhPO0FBWVJDLFlBWlEsb0JBWUE7QUFDTixZQUFHLEtBQUtqQixPQUFSLEVBQWdCO0FBQ2RrQixhQUFHQyxVQUFILENBQWM7QUFDWEMsc0NBQXdCLEtBQUtuQjtBQURsQixXQUFkO0FBR0E7QUFDRDtBQUNGaUIsV0FBR0csU0FBSCxDQUFhO0FBQ1ZDLGlCQUFPLFFBREc7QUFFVkMsZ0JBQU0sU0FGSTtBQUdWQyxvQkFBVTtBQUhBLFNBQWI7QUFLQSxPQXhCTztBQTBCUkMsYUExQlEscUJBMEJDO0FBQ1BQLFdBQUdRLFdBQUgsQ0FBZTtBQUNiSixpQkFBTztBQURNLFNBQWY7QUFHQSx1QkFBS0ssT0FBTCxDQUFhO0FBQ1RQLGVBQUksaUJBQVFRLFFBREg7QUFFVEMsa0JBQU8sTUFGRTtBQUdUakMsZ0JBQUs7QUFDSGtDLHNCQUFTLEtBQUs3QjtBQURYLFdBSEk7QUFNVDhCLGtCQUFRO0FBQ04scUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFOQyxTQUFiLEVBU0tDLElBVEwsQ0FTVyxlQUFPO0FBQ2ZqQixhQUFHa0IsV0FBSDtBQUNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILFNBcEJEO0FBc0JELE9BcERPO0FBcURSQyxnQkFyRFEsc0JBcURHQyxFQXJESCxFQXFETTtBQUNWcEIsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLHVDQUEyQmtCO0FBRGYsU0FBZDtBQUdIO0FBekRPLEssUUE0RFZDLE0sR0FBUyxFOzs7Ozs7O0FBSVQ7bUNBQ2M7QUFBQTs7QUFDVnJCLFNBQUdRLFdBQUgsQ0FBZTtBQUNiSixlQUFPO0FBRE0sT0FBZjtBQUdBLHFCQUFLSyxPQUFMLENBQWE7QUFDVFAsYUFBSSxpQkFBUXRCLFNBREg7QUFFVCtCLGdCQUFPLEtBRkU7QUFHVGpDLGNBQUs7QUFDSGtDLG9CQUFTLEtBQUs3QjtBQURYLFNBSEk7QUFNVDhCLGdCQUFRO0FBQ04sbUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFOQyxPQUFiLEVBU0tDLElBVEwsQ0FTVSxlQUFPO0FBQ2ZqQixXQUFHa0IsV0FBSDtBQUNBLGVBQUt0QyxTQUFMLEdBQWlCMEMsSUFBSTVDLElBQUosQ0FBU0EsSUFBMUI7QUFDQSxlQUFLRSxTQUFMLENBQWUyQyxLQUFmLEdBQXVCLE9BQUtDLFlBQUwsQ0FBa0IsT0FBSzVDLFNBQUwsQ0FBZTJDLEtBQWpDLENBQXZCO0FBQ0EsZUFBSzNDLFNBQUwsQ0FBZTZDLFlBQWYsR0FBOEIsT0FBS0MsWUFBTCxDQUFrQixPQUFLOUMsU0FBTCxDQUFlNkMsWUFBakMsQ0FBOUI7QUFDQSxlQUFLRSxNQUFMO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVlQLElBQUk1QyxJQUFoQjtBQUNELE9BaEJEO0FBbUJIOztBQUVEOzs7O2lDQUNZO0FBQUE7O0FBQ1YscUJBQUsrQixPQUFMLENBQWE7QUFDUFAsYUFBSSxpQkFBUTRCLFFBREw7QUFFUG5CLGdCQUFPLEtBRkE7QUFHUGpDLGNBQUs7QUFDSGtDLG9CQUFTLEtBQUs3QjtBQURYLFNBSEU7QUFNUDhCLGdCQUFRO0FBQ04sbUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFORCxPQUFiLEVBU09DLElBVFAsQ0FTWSxlQUFPO0FBQ2YsWUFBSXZDLE9BQU80QyxJQUFJNUMsSUFBSixDQUFTQSxJQUFwQjtBQUNBLFlBQUlBLEtBQUtxRCxNQUFULEVBQWlCO0FBQ2JyRCxlQUFLZSxPQUFMLENBQWEsZUFBTztBQUNsQkMsZ0JBQUlFLE9BQUosR0FBYyxLQUFkO0FBQ0QsV0FGRDtBQUdBLGlCQUFLWixhQUFMLEdBQXFCTixJQUFyQjtBQUNBLGlCQUFLaUQsTUFBTDtBQUNILFNBTkQsTUFNSyxDQUVKO0FBRUYsT0FyQkg7QUFzQkQ7O0FBRUQ7Ozs7cUNBQ2dCO0FBQUE7O0FBQ2QscUJBQUtsQixPQUFMLENBQWE7QUFDUFAsYUFBSSxpQkFBUThCLFlBREw7QUFFUHJCLGdCQUFPLEtBRkE7QUFHUGpDLGNBQUs7QUFDSGtDLG9CQUFTLEtBQUs3QjtBQURYLFNBSEU7QUFNUDhCLGdCQUFRO0FBQ04sbUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFORCxPQUFiLEVBU09DLElBVFAsQ0FTWSxlQUFPO0FBQ2YsWUFBSXZDLE9BQU80QyxJQUFJNUMsSUFBSixDQUFTQSxJQUFwQjtBQUNBLFlBQUlBLEtBQUtxRCxNQUFULEVBQWlCO0FBQ2JyRCxlQUFLZSxPQUFMLENBQWMsVUFBQ0MsR0FBRCxFQUFLdUMsQ0FBTCxFQUFXO0FBQ3ZCdkMsZ0JBQUl3QyxLQUFKLEdBQVlELE1BQU0sQ0FBTixHQUFXLEtBQVgsR0FBbUIsSUFBL0I7QUFDQXZDLGdCQUFJeUMsTUFBSixJQUFjekMsSUFBSXlDLE1BQUosQ0FBVzFDLE9BQVgsQ0FBb0IsZ0JBQVE7QUFDeEMyQyxtQkFBS3pDLFFBQUwsQ0FBY0MsT0FBZCxHQUF3QixLQUF4QjtBQUNELGFBRmEsQ0FBZDtBQUdELFdBTEQ7QUFNQSxpQkFBS1gsV0FBTCxHQUFtQlAsSUFBbkI7QUFDQSxpQkFBS2lELE1BQUw7QUFDSCxTQVRELE1BU0ssQ0FFSjtBQUNGLE9BdkJIO0FBd0JEOztBQUVEOzs7O2lDQUNZO0FBQUE7O0FBQ1IscUJBQUtsQixPQUFMLENBQWE7QUFDVFAsYUFBSSxpQkFBUVEsUUFESDtBQUVUQyxnQkFBTyxNQUZFO0FBR1RqQyxjQUFLO0FBQ0hrQyxvQkFBUyxLQUFLN0I7QUFEWCxTQUhJO0FBTVQ4QixnQkFBUTtBQUNOLG1DQUF1QixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDO0FBRHpDO0FBTkMsT0FBYixFQVNLQyxJQVRMLENBU1csZUFBTztBQUNoQlcsZ0JBQVFDLEdBQVIsQ0FBWVAsR0FBWjtBQUNBLFlBQUlBLElBQUk1QyxJQUFKLENBQVMyRCxHQUFULElBQWdCLFNBQXBCLEVBQThCO0FBQzVCLGlCQUFLdkQsT0FBTCxHQUFlLElBQWY7QUFDRCxTQUZELE1BRUs7QUFDSCxpQkFBS0EsT0FBTCxHQUFlLEtBQWY7QUFDRDtBQUNGLE9BaEJEO0FBaUJIOzs7MkJBR013RCxPLEVBQVM7QUFDZCxXQUFLdkQsT0FBTCxHQUFldUQsUUFBUWxCLEVBQXZCO0FBQ0EsV0FBS21CLFlBQUw7QUFDQSxXQUFLQyxVQUFMO0FBQ0EsV0FBS0MsY0FBTDtBQUNBLFdBQUtDLFVBQUw7QUFDRDs7OztFQXZNZ0MsZUFBS0MsSTs7a0JBQW5CdEUsSyIsImZpbGUiOiJjbGFzc0RldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgLy9uYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAndGVzdCdcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdFxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaXNIYXNWaWRlbzpmYWxzZSxcclxuICAgICAgICBjbGFzc0luZm86e30sXHJcbiAgICAgICAgbmF2VHlwZToxLFxyXG4gICAgICAgIGlzUGF5ZWQ6dHJ1ZSxcclxuICAgICAgICBjbGFzc0lkOjgsXHJcbiAgICAgICAgZnJlZUNsYXNzTGlzdDpbXSxcclxuICAgICAgICBjaGFwdGVyTGlzdDpbXSxcclxuICAgICAgICB2aWRlbzp7XHJcbiAgICAgICAgICBzcmM6JydcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIG5hdnRhZyh0eXBlKXtcclxuICAgICAgICB0aGlzLm5hdlR5cGUgPSB0eXBlO1xyXG4gICAgICB9LFxyXG4gICAgICBwbGF5VmlkZW8oKXtcclxuICAgICAgICB0aGlzLmlzSGFzVmlkZW8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUNsYXNzTGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgdmFsLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgaXRlbS5yZXNvdXJjZS5wbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IGl0ZW0ucmVzb3VyY2UubWVkaWFfdXJsO1xyXG4gICAgICB9LFxyXG4gICAgICBwYXl0aXAoKXtcclxuICAgICAgICBpZih0aGlzLmlzUGF5ZWQpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHt0aGlzLmNsYXNzSWR9YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7flhYjotK3kubDor77nqIsnLFxyXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDE1MDBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgZ290b1BheSgpe1xyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5LitLi4uJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgLy8gdG9kbzrosIPlvq7kv6HmlK/ku5hcclxuICAgICAgICAgICAgLy8gaWYocmVzLmpzYXBpQ29uZmlnKXtcclxuICAgICAgICAgICAgLy8gbGV0IHd4Q29uZmlnID0gcmVzLmpzYXBpQ29uZmlnO1xyXG4gICAgICAgICAgICAvLyBjb21tb25Gbi53eFBheSh7XHJcbiAgICAgICAgICAgIC8vICAgd3hQYXlDb25mOnd4Q29uZmlnLFxyXG4gICAgICAgICAgICAvLyAgIHN1Y2Nlc3NDYjp0aGlzLnd4UGF5U3VjLmJpbmQodGhpcyx3eENvbmZpZyksXHJcbiAgICAgICAgICAgIC8vICAgZmFpbENiOnRoaXMubGF5ZXIuYmluZCh0aGlzLCfmlK/ku5jlpLHotKXvvIzor7fph43or5UnKSxcclxuICAgICAgICAgICAgLy8gICBjYW5jZWxDYjp0aGlzLmxheWVyLmJpbmQodGhpcywn5pSv5LuY5aSx6LSl77yM6K+36YeN6K+VJyksXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgIFxyXG4gICAgICB9LFxyXG4gICAgICBnb3RvQWlyY2xlKGlkKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvYWlydGljbGU/aWQ9JHtpZH1gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635b6X6K++56iL55qE5L+h5oGvXHJcbiAgICBnZXRDbGFzc0luZm8oKXtcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+iOt+WPluS4rS4uLicsXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc0luZm8sXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8gPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8ucHJpY2UgPSB0aGlzLmZvcm1hdGVNb25leSh0aGlzLmNsYXNzSW5mby5wcmljZSk7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGggPSB0aGlzLmZvcm1hdGVNb250aCh0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGgpO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflvpflhY3otLnor5XlkKzliJfooahcclxuICAgIGdldFRyeUxpc3QoKXtcclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NUcnksXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcclxuICAgICAgICAgICAgICBkYXRhLmZvckVhY2godmFsID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB0aGlzLmZyZWVDbGFzc0xpc3QgPSBkYXRhO1xyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W56ug6IqC5YiX6KGoXHJcbiAgICBnZXRDaGFwdGVyTGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc0NoYXB0ZXIsXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcclxuICAgICAgICAgICAgICBkYXRhLmZvckVhY2goICh2YWwsaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsLnNsaWRlID0gaSA9PT0gMCA/ICBmYWxzZSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uICYmIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYXB0ZXJMaXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluaYr+WQpuW3sue7j+i0reS5sOi/h+ivpeivvueoi1xyXG4gICAgZ2V0SXNQYXllZCgpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgaWYoIHJlcy5kYXRhLm1zZyA9PSAn5oKo5bey6LSt5Lmw5q2k6K++56iLJyl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQYXllZCA9IHRydWU7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5pc1BheWVkID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuY2xhc3NJZCA9IG9wdGlvbnMuaWQ7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NJbmZvKCk7XHJcbiAgICAgIHRoaXMuZ2V0VHJ5TGlzdCgpO1xyXG4gICAgICB0aGlzLmdldENoYXB0ZXJMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0SXNQYXllZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuIl19