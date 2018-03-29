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
      isPayed: false,
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
      gotoClassIndex: function gotoClassIndex() {
        wx.navigateTo({
          url: '/pages/class?id=' + this.classId
        });
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
            class_id: Number(this.classId),
            paysource: 1
          },
          header: {
            'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
          }
        }).then(function (res) {
          var jsApiConfig = {};
          var data = res.data.data;
          try {
            jsApiConfig = JSON.parse(data.jsapiConfig);
          } catch (e) {
            console.error(e);
          }
          wx.hideLoading();
          wx.requestPayment({
            'timeStamp': jsApiConfig.timeStamp,
            'nonceStr': jsApiConfig.nonceStr,
            'package': jsApiConfig.package,
            'signType': 'MD5',
            'paySign': jsApiConfig.paySign,
            'success': function success(res) {
              // 支付成功
              wx.navigateTo({
                url: '/pages/class?id=' + this.classId
              });
            },
            'fail': function fail(res) {
              // 支付失败
            }
          });
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
          class_id: Number(this.classId),
          paysource: 1
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/classDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJtaXhpbnMiLCJkYXRhIiwiaXNIYXNWaWRlbyIsImNsYXNzSW5mbyIsIm5hdlR5cGUiLCJpc1BheWVkIiwiY2xhc3NJZCIsImZyZWVDbGFzc0xpc3QiLCJjaGFwdGVyTGlzdCIsInZpZGVvIiwic3JjIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsImZvckVhY2giLCJ2YWwiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJpdGVtIiwibWVkaWFfdXJsIiwiZ290b0NsYXNzSW5kZXgiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwYXl0aXAiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImdvdG9QYXkiLCJzaG93TG9hZGluZyIsInJlcXVlc3QiLCJjbGFzc1BheSIsIm1ldGhvZCIsImNsYXNzX2lkIiwiTnVtYmVyIiwicGF5c291cmNlIiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzZXNzaW9uSUQiLCJ0aGVuIiwianNBcGlDb25maWciLCJyZXMiLCJKU09OIiwicGFyc2UiLCJqc2FwaUNvbmZpZyIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJoaWRlTG9hZGluZyIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwicGF5U2lnbiIsImdvdG9BaXJjbGUiLCJpZCIsImV2ZW50cyIsInByaWNlIiwiZm9ybWF0ZU1vbmV5IiwiZXhwaXJlX21vbnRoIiwiZm9ybWF0ZU1vbnRoIiwiJGFwcGx5IiwibG9nIiwiY2xhc3NUcnkiLCJsZW5ndGgiLCJjbGFzc0NoYXB0ZXIiLCJpIiwic2xpZGUiLCJsZXNzb24iLCJ2YWwyIiwibXNnIiwib3B0aW9ucyIsImdldENsYXNzSW5mbyIsImdldFRyeUxpc3QiLCJnZXRDaGFwdGVyTGlzdCIsImdldElzUGF5ZWQiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUYyQzs7O0lBR3RCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQO0FBRE8sSyxRQUdUQyxVLEdBQWE7QUFDWEM7QUFEVyxLLFFBSWJDLE0sR0FBUyxnQixRQUVUQyxJLEdBQU87QUFDSEMsa0JBQVcsS0FEUjtBQUVIQyxpQkFBVSxFQUZQO0FBR0hDLGVBQVEsQ0FITDtBQUlIQyxlQUFRLEtBSkw7QUFLSEMsZUFBUSxDQUxMO0FBTUhDLHFCQUFjLEVBTlg7QUFPSEMsbUJBQVksRUFQVDtBQVFIQyxhQUFNO0FBQ0pDLGFBQUk7QUFEQTtBQVJILEssUUFhUEMsUSxHQUFXLEUsUUFJWEMsTyxHQUFVO0FBQ1JDLFlBRFEsa0JBQ0RDLElBREMsRUFDSTtBQUNWLGFBQUtWLE9BQUwsR0FBZVUsSUFBZjtBQUNELE9BSE87QUFJUkMsZUFKUSx1QkFJRztBQUNULGFBQUtiLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxhQUFLSyxhQUFMLENBQW1CUyxPQUFuQixDQUE0QixlQUFPO0FBQ2pDQyxjQUFJQyxRQUFKLENBQWFDLE9BQWIsR0FBdUIsS0FBdkI7QUFDRCxTQUZEO0FBR0FDLGFBQUtGLFFBQUwsQ0FBY0MsT0FBZCxHQUF3QixJQUF4QjtBQUNBLGFBQUtWLEtBQUwsQ0FBV0MsR0FBWCxHQUFpQlUsS0FBS0YsUUFBTCxDQUFjRyxTQUEvQjtBQUNELE9BWE87QUFZUkMsb0JBWlEsNEJBWVE7QUFDYkMsV0FBR0MsVUFBSCxDQUFjO0FBQ1ZDLG9DQUF3QixLQUFLbkI7QUFEbkIsU0FBZDtBQUdGLE9BaEJPO0FBaUJSb0IsWUFqQlEsb0JBaUJBO0FBQ04sWUFBRyxLQUFLckIsT0FBUixFQUFnQjtBQUNka0IsYUFBR0MsVUFBSCxDQUFjO0FBQ1hDLHNDQUF3QixLQUFLbkI7QUFEbEIsV0FBZDtBQUdBO0FBQ0Q7QUFDRmlCLFdBQUdJLFNBQUgsQ0FBYTtBQUNWQyxpQkFBTyxRQURHO0FBRVZDLGdCQUFNLFNBRkk7QUFHVkMsb0JBQVU7QUFIQSxTQUFiO0FBS0EsT0E3Qk87QUErQlJDLGFBL0JRLHFCQStCQztBQUNQUixXQUFHUyxXQUFILENBQWU7QUFDYkosaUJBQU87QUFETSxTQUFmO0FBR0EsdUJBQUtLLE9BQUwsQ0FBYTtBQUNUUixlQUFJLGlCQUFRUyxRQURIO0FBRVRDLGtCQUFPLE1BRkU7QUFHVGxDLGdCQUFLO0FBQ0htQyxzQkFBU0MsT0FBTyxLQUFLL0IsT0FBWixDQUROO0FBRUhnQyx1QkFBVTtBQUZQLFdBSEk7QUFPVEMsa0JBQVE7QUFDTixxQ0FBdUIsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR6QztBQVBDLFNBQWIsRUFVS0MsSUFWTCxDQVVXLGVBQU87QUFDZCxjQUFJQyxjQUFjLEVBQWxCO0FBQ0EsY0FBSTNDLE9BQU80QyxJQUFJNUMsSUFBSixDQUFTQSxJQUFwQjtBQUNBLGNBQUc7QUFDRDJDLDBCQUFjRSxLQUFLQyxLQUFMLENBQVc5QyxLQUFLK0MsV0FBaEIsQ0FBZDtBQUNELFdBRkQsQ0FFQyxPQUFPQyxDQUFQLEVBQVM7QUFDUkMsb0JBQVFDLEtBQVIsQ0FBY0YsQ0FBZDtBQUNEO0FBQ0QxQixhQUFHNkIsV0FBSDtBQUNBN0IsYUFBRzhCLGNBQUgsQ0FBa0I7QUFDZix5QkFBYVQsWUFBWVUsU0FEVjtBQUVmLHdCQUFZVixZQUFZVyxRQUZUO0FBR2YsdUJBQVdYLFlBQVlZLE9BSFI7QUFJZix3QkFBWSxLQUpHO0FBS2YsdUJBQVdaLFlBQVlhLE9BTFI7QUFNZix1QkFBVSxpQkFBU1osR0FBVCxFQUFhO0FBQ3BCO0FBQ0F0QixpQkFBR0MsVUFBSCxDQUFjO0FBQ1hDLDBDQUF3QixLQUFLbkI7QUFEbEIsZUFBZDtBQUdGLGFBWGM7QUFZZixvQkFBTyxjQUFTdUMsR0FBVCxFQUFhO0FBQ2pCO0FBQ0Y7QUFkYyxXQUFsQjtBQWdCSCxTQW5DRDtBQXFDRCxPQXhFTztBQXlFUmEsZ0JBekVRLHNCQXlFR0MsRUF6RUgsRUF5RU07QUFDVnBDLFdBQUdDLFVBQUgsQ0FBYztBQUNaQyx1Q0FBMkJrQztBQURmLFNBQWQ7QUFHSDtBQTdFTyxLLFFBZ0ZWQyxNLEdBQVMsRTs7Ozs7OztBQUlUO21DQUNjO0FBQUE7O0FBQ1ZyQyxTQUFHUyxXQUFILENBQWU7QUFDYkosZUFBTztBQURNLE9BQWY7QUFHQSxxQkFBS0ssT0FBTCxDQUFhO0FBQ1RSLGFBQUksaUJBQVF0QixTQURIO0FBRVRnQyxnQkFBTyxLQUZFO0FBR1RsQyxjQUFLO0FBQ0htQyxvQkFBUyxLQUFLOUI7QUFEWCxTQUhJO0FBTVRpQyxnQkFBUTtBQUNOLG1DQUF1QixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDO0FBRHpDO0FBTkMsT0FBYixFQVNLQyxJQVRMLENBU1UsZUFBTztBQUNmcEIsV0FBRzZCLFdBQUg7QUFDQSxlQUFLakQsU0FBTCxHQUFpQjBDLElBQUk1QyxJQUFKLENBQVNBLElBQTFCO0FBQ0EsZUFBS0UsU0FBTCxDQUFlMEQsS0FBZixHQUF1QixPQUFLQyxZQUFMLENBQWtCLE9BQUszRCxTQUFMLENBQWUwRCxLQUFqQyxDQUF2QjtBQUNBLGVBQUsxRCxTQUFMLENBQWU0RCxZQUFmLEdBQThCLE9BQUtDLFlBQUwsQ0FBa0IsT0FBSzdELFNBQUwsQ0FBZTRELFlBQWpDLENBQTlCO0FBQ0EsZUFBS0UsTUFBTDtBQUNBZixnQkFBUWdCLEdBQVIsQ0FBWXJCLElBQUk1QyxJQUFoQjtBQUNELE9BaEJEO0FBaUJIOztBQUVEOzs7O2lDQUNZO0FBQUE7O0FBQ1YscUJBQUtnQyxPQUFMLENBQWE7QUFDUFIsYUFBSSxpQkFBUTBDLFFBREw7QUFFUGhDLGdCQUFPLEtBRkE7QUFHUGxDLGNBQUs7QUFDSG1DLG9CQUFTLEtBQUs5QjtBQURYLFNBSEU7QUFNUGlDLGdCQUFRO0FBQ04sbUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFORCxPQUFiLEVBU09DLElBVFAsQ0FTWSxlQUFPO0FBQ2YsWUFBSTFDLE9BQU80QyxJQUFJNUMsSUFBSixDQUFTQSxJQUFwQjtBQUNBLFlBQUlBLEtBQUttRSxNQUFULEVBQWlCO0FBQ2JuRSxlQUFLZSxPQUFMLENBQWEsZUFBTztBQUNsQkMsZ0JBQUlFLE9BQUosR0FBYyxLQUFkO0FBQ0QsV0FGRDtBQUdBLGlCQUFLWixhQUFMLEdBQXFCTixJQUFyQjtBQUNBLGlCQUFLZ0UsTUFBTDtBQUNILFNBTkQsTUFNSyxDQUVKO0FBRUYsT0FyQkg7QUFzQkQ7O0FBRUQ7Ozs7cUNBQ2dCO0FBQUE7O0FBQ2QscUJBQUtoQyxPQUFMLENBQWE7QUFDUFIsYUFBSSxpQkFBUTRDLFlBREw7QUFFUGxDLGdCQUFPLEtBRkE7QUFHUGxDLGNBQUs7QUFDSG1DLG9CQUFTLEtBQUs5QjtBQURYLFNBSEU7QUFNUGlDLGdCQUFRO0FBQ04sbUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFORCxPQUFiLEVBU09DLElBVFAsQ0FTWSxlQUFPO0FBQ2YsWUFBSTFDLE9BQU80QyxJQUFJNUMsSUFBSixDQUFTQSxJQUFwQjtBQUNBLFlBQUlBLEtBQUttRSxNQUFULEVBQWlCO0FBQ2JuRSxlQUFLZSxPQUFMLENBQWMsVUFBQ0MsR0FBRCxFQUFLcUQsQ0FBTCxFQUFXO0FBQ3ZCckQsZ0JBQUlzRCxLQUFKLEdBQVlELE1BQU0sQ0FBTixHQUFXLEtBQVgsR0FBbUIsSUFBL0I7QUFDQXJELGdCQUFJdUQsTUFBSixJQUFjdkQsSUFBSXVELE1BQUosQ0FBV3hELE9BQVgsQ0FBb0IsZ0JBQVE7QUFDeEN5RCxtQkFBS3ZELFFBQUwsQ0FBY0MsT0FBZCxHQUF3QixLQUF4QjtBQUNELGFBRmEsQ0FBZDtBQUdELFdBTEQ7QUFNQSxpQkFBS1gsV0FBTCxHQUFtQlAsSUFBbkI7QUFDQSxpQkFBS2dFLE1BQUw7QUFDSCxTQVRELE1BU0ssQ0FFSjtBQUNGLE9BdkJIO0FBd0JEOztBQUVEOzs7O2lDQUNZO0FBQUE7O0FBQ1IscUJBQUtoQyxPQUFMLENBQWE7QUFDVFIsYUFBSSxpQkFBUVMsUUFESDtBQUVUQyxnQkFBTyxNQUZFO0FBR1RsQyxjQUFLO0FBQ0htQyxvQkFBU0MsT0FBTyxLQUFLL0IsT0FBWixDQUROO0FBRUhnQyxxQkFBVTtBQUZQLFNBSEk7QUFPVEMsZ0JBQVE7QUFDTixtQ0FBdUIsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR6QztBQVBDLE9BQWIsRUFVS0MsSUFWTCxDQVVXLGVBQU87QUFDaEJPLGdCQUFRZ0IsR0FBUixDQUFZckIsR0FBWjtBQUNBLFlBQUlBLElBQUk1QyxJQUFKLENBQVN5RSxHQUFULElBQWdCLFNBQXBCLEVBQThCO0FBQzVCLGlCQUFLckUsT0FBTCxHQUFlLElBQWY7QUFDRCxTQUZELE1BRUs7QUFDSCxpQkFBS0EsT0FBTCxHQUFlLEtBQWY7QUFDRDtBQUNGLE9BakJEO0FBa0JIOzs7MkJBR01zRSxPLEVBQVM7QUFDZCxXQUFLckUsT0FBTCxHQUFlcUUsUUFBUWhCLEVBQXZCO0FBQ0EsV0FBS2lCLFlBQUw7QUFDQSxXQUFLQyxVQUFMO0FBQ0EsV0FBS0MsY0FBTDtBQUNBLFdBQUtDLFVBQUw7QUFDRDs7O3dDQUVtQjtBQUNkLGFBQU87QUFDUG5ELGVBQU8sUUFEQTtBQUVQb0QsY0FBTSxjQUZDO0FBR1BDLGtCQUFTLHVCQUhGO0FBSVBDLGlCQUFRLGlCQUFTckMsR0FBVCxFQUFjO0FBQ3BCO0FBQ0QsU0FOTTtBQU9Qc0MsY0FBTSxjQUFTdEMsR0FBVCxFQUFjO0FBQ2xCO0FBQ0Q7QUFUTSxPQUFQO0FBV0Q7Ozs7RUF4TzRCLGVBQUt1QyxJOztrQkFBbkJ4RixLIiwiZmlsZSI6ImNsYXNzRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAvL25hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICd0ZXN0J1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgY29udGFjdDpDb250YWN0XHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW215TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBpc0hhc1ZpZGVvOmZhbHNlLFxyXG4gICAgICAgIGNsYXNzSW5mbzp7fSxcclxuICAgICAgICBuYXZUeXBlOjEsXHJcbiAgICAgICAgaXNQYXllZDpmYWxzZSxcclxuICAgICAgICBjbGFzc0lkOjgsXHJcbiAgICAgICAgZnJlZUNsYXNzTGlzdDpbXSxcclxuICAgICAgICBjaGFwdGVyTGlzdDpbXSxcclxuICAgICAgICB2aWRlbzp7XHJcbiAgICAgICAgICBzcmM6JydcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIG5hdnRhZyh0eXBlKXtcclxuICAgICAgICB0aGlzLm5hdlR5cGUgPSB0eXBlO1xyXG4gICAgICB9LFxyXG4gICAgICBwbGF5VmlkZW8oKXtcclxuICAgICAgICB0aGlzLmlzSGFzVmlkZW8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUNsYXNzTGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgdmFsLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgaXRlbS5yZXNvdXJjZS5wbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IGl0ZW0ucmVzb3VyY2UubWVkaWFfdXJsO1xyXG4gICAgICB9LFxyXG4gICAgICBnb3RvQ2xhc3NJbmRleCgpe1xyXG4gICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBwYXl0aXAoKXtcclxuICAgICAgICBpZih0aGlzLmlzUGF5ZWQpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHt0aGlzLmNsYXNzSWR9YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7flhYjotK3kubDor77nqIsnLFxyXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDE1MDBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgZ290b1BheSgpe1xyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5LitLi4uJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOk51bWJlcih0aGlzLmNsYXNzSWQpLFxyXG4gICAgICAgICAgICAgIHBheXNvdXJjZToxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGpzQXBpQ29uZmlnID0ge307XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTsgXHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICBqc0FwaUNvbmZpZyA9IEpTT04ucGFyc2UoZGF0YS5qc2FwaUNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1jYXRjaCAoZSl7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcclxuICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IGpzQXBpQ29uZmlnLnRpbWVTdGFtcCxcclxuICAgICAgICAgICAgICAgJ25vbmNlU3RyJzoganNBcGlDb25maWcubm9uY2VTdHIsXHJcbiAgICAgICAgICAgICAgICdwYWNrYWdlJzoganNBcGlDb25maWcucGFja2FnZSxcclxuICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXHJcbiAgICAgICAgICAgICAgICdwYXlTaWduJzoganNBcGlDb25maWcucGF5U2lnbixcclxuICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOmZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgIC8vIOaUr+S7mOaIkOWKn1xyXG4gICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzP2lkPSR7dGhpcy5jbGFzc0lkfWBcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgJ2ZhaWwnOmZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgIC8vIOaUr+S7mOWksei0pVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgXHJcbiAgICAgIH0sXHJcbiAgICAgIGdvdG9BaXJjbGUoaWQpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9haXJ0aWNsZT9pZD0ke2lkfWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflvpfor77nqIvnmoTkv6Hmga9cclxuICAgIGdldENsYXNzSW5mbygpe1xyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn6I635Y+W5LitLi4uJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzSW5mbyxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mbyA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5wcmljZSA9IHRoaXMuZm9ybWF0ZU1vbmV5KHRoaXMuY2xhc3NJbmZvLnByaWNlKTtcclxuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCA9IHRoaXMuZm9ybWF0ZU1vbnRoKHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCk7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635b6X5YWN6LS56K+V5ZCs5YiX6KGoXHJcbiAgICBnZXRUcnlMaXN0KCl7XHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzVHJ5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgaWYoIGRhdGEubGVuZ3RoICl7XHJcbiAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgdGhpcy5mcmVlQ2xhc3NMaXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPlueroOiKguWIl+ihqFxyXG4gICAgZ2V0Q2hhcHRlckxpc3QoKXtcclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NDaGFwdGVyLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgaWYoIGRhdGEubGVuZ3RoICl7XHJcbiAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCAodmFsLGkpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbC5zbGlkZSA9IGkgPT09IDAgPyAgZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdmFsLmxlc3NvbiAmJiB2YWwubGVzc29uLmZvckVhY2goIHZhbDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jaGFwdGVyTGlzdCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgIH0gXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bmmK/lkKblt7Lnu4/otK3kubDov4for6Xor77nqItcclxuICAgIGdldElzUGF5ZWQoKXtcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BheSxcclxuICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDpOdW1iZXIodGhpcy5jbGFzc0lkKSxcclxuICAgICAgICAgICAgICBwYXlzb3VyY2U6MVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgaWYoIHJlcy5kYXRhLm1zZyA9PSAn5oKo5bey6LSt5Lmw5q2k6K++56iLJyl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQYXllZCA9IHRydWU7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5pc1BheWVkID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuY2xhc3NJZCA9IG9wdGlvbnMuaWQ7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NJbmZvKCk7XHJcbiAgICAgIHRoaXMuZ2V0VHJ5TGlzdCgpO1xyXG4gICAgICB0aGlzLmdldENoYXB0ZXJMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0SXNQYXllZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiAn5aSc54yr6Laz5b2p6K++56iLJyxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gIH1cclxuIl19