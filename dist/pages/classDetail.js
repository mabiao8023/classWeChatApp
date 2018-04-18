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
      playVideo: function playVideo(item, index) {
        this.isHasVideo = true;
        this.freeClassList.forEach(function (val, idx) {
          if (idx == index) {
            val.resource.playing = true;
          } else {
            val.resource.playing = false;
          }
        });

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
            val.resource.media_time = val.resource.media_time && _this3.secondsFormate(val.resource.media_time);
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
              val2.resource.media_time = val2.resource.media_time && _this4.secondsFormate(val2.resource.media_time);
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
      this.classId = options.id || 6;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJtaXhpbnMiLCJkYXRhIiwiaXNIYXNWaWRlbyIsImNsYXNzSW5mbyIsIm5hdlR5cGUiLCJpc1BheWVkIiwiY2xhc3NJZCIsImZyZWVDbGFzc0xpc3QiLCJjaGFwdGVyTGlzdCIsInZpZGVvIiwic3JjIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsIml0ZW0iLCJpbmRleCIsImZvckVhY2giLCJ2YWwiLCJpZHgiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJtZWRpYV91cmwiLCJnb3RvQ2xhc3NJbmRleCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInBheXRpcCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwiZ290b1BheSIsInNob3dMb2FkaW5nIiwicmVxdWVzdCIsImNsYXNzUGF5IiwibWV0aG9kIiwiY2xhc3NfaWQiLCJOdW1iZXIiLCJwYXlzb3VyY2UiLCJoZWFkZXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNlc3Npb25JRCIsInRoZW4iLCJqc0FwaUNvbmZpZyIsInJlcyIsIkpTT04iLCJwYXJzZSIsImpzYXBpQ29uZmlnIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImhpZGVMb2FkaW5nIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJub25jZVN0ciIsInBhY2thZ2UiLCJwYXlTaWduIiwiZ290b0FpcmNsZSIsImlkIiwiZXZlbnRzIiwicHJpY2UiLCJmb3JtYXRlTW9uZXkiLCJleHBpcmVfbW9udGgiLCJmb3JtYXRlTW9udGgiLCIkYXBwbHkiLCJsb2ciLCJjbGFzc1RyeSIsImxlbmd0aCIsIm1lZGlhX3RpbWUiLCJzZWNvbmRzRm9ybWF0ZSIsImNsYXNzQ2hhcHRlciIsImkiLCJzbGlkZSIsImxlc3NvbiIsInZhbDIiLCJtc2ciLCJvcHRpb25zIiwiZ2V0Q2xhc3NJbmZvIiwiZ2V0VHJ5TGlzdCIsImdldENoYXB0ZXJMaXN0IiwiZ2V0SXNQYXllZCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBRjJDOzs7SUFHdEJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1A7QUFETyxLLFFBR1RDLFUsR0FBYTtBQUNYQztBQURXLEssUUFJYkMsTSxHQUFTLGdCLFFBRVRDLEksR0FBTztBQUNIQyxrQkFBVyxLQURSO0FBRUhDLGlCQUFVLEVBRlA7QUFHSEMsZUFBUSxDQUhMO0FBSUhDLGVBQVEsS0FKTDtBQUtIQyxlQUFRLENBTEw7QUFNSEMscUJBQWMsRUFOWDtBQU9IQyxtQkFBWSxFQVBUO0FBUUhDLGFBQU07QUFDSkMsYUFBSTtBQURBO0FBUkgsSyxRQWFQQyxRLEdBQVcsRSxRQUlYQyxPLEdBQVU7QUFDUkMsWUFEUSxrQkFDREMsSUFEQyxFQUNJO0FBQ1YsYUFBS1YsT0FBTCxHQUFlVSxJQUFmO0FBQ0QsT0FITztBQUlSQyxlQUpRLHFCQUlFQyxJQUpGLEVBSU9DLEtBSlAsRUFJYTtBQUNuQixhQUFLZixVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS0ssYUFBTCxDQUFtQlcsT0FBbkIsQ0FBNEIsVUFBQ0MsR0FBRCxFQUFLQyxHQUFMLEVBQWE7QUFDdkMsY0FBSUEsT0FBT0gsS0FBWCxFQUFrQjtBQUNoQkUsZ0JBQUlFLFFBQUosQ0FBYUMsT0FBYixHQUF1QixJQUF2QjtBQUNELFdBRkQsTUFFSztBQUNISCxnQkFBSUUsUUFBSixDQUFhQyxPQUFiLEdBQXVCLEtBQXZCO0FBQ0Q7QUFDRixTQU5EOztBQVFBLGFBQUtiLEtBQUwsQ0FBV0MsR0FBWCxHQUFpQk0sS0FBS0ssUUFBTCxDQUFjRSxTQUEvQjtBQUNELE9BZk87QUFnQlJDLG9CQWhCUSw0QkFnQlE7QUFDYkMsV0FBR0MsVUFBSCxDQUFjO0FB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TztBQUNQckQsZUFBTyxRQURBO0FBRVBzRCxjQUFNLGNBRkM7QUFHUEMsa0JBQVMsdUJBSEY7QUFJUEMsaUJBQVEsaUJBQVN2QyxHQUFULEVBQWM7QUFDcEI7QUFDRCxTQU5NO0FBT1B3QyxjQUFNLGNBQVN4QyxHQUFULEVBQWM7QUFDbEI7QUFDRDtBQVRNLE9BQVA7QUFXRDs7OztFQTlPNEIsZUFBS3lDLEk7O2tCQUFuQjVGLEsiLCJmaWxlIjoiY2xhc3NEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIC8vbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ3Rlc3QnXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3RcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGlzSGFzVmlkZW86ZmFsc2UsXHJcbiAgICAgICAgY2xhc3NJbmZvOnt9LFxyXG4gICAgICAgIG5hdlR5cGU6MSxcclxuICAgICAgICBpc1BheWVkOmZhbHNlLFxyXG4gICAgICAgIGNsYXNzSWQ6OCxcclxuICAgICAgICBmcmVlQ2xhc3NMaXN0OltdLFxyXG4gICAgICAgIGNoYXB0ZXJMaXN0OltdLFxyXG4gICAgICAgIHZpZGVvOntcclxuICAgICAgICAgIHNyYzonJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgbmF2dGFnKHR5cGUpe1xyXG4gICAgICAgIHRoaXMubmF2VHlwZSA9IHR5cGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIHBsYXlWaWRlbyhpdGVtLGluZGV4KXtcclxuICAgICAgICB0aGlzLmlzSGFzVmlkZW8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUNsYXNzTGlzdC5mb3JFYWNoKCAodmFsLGlkeCkgPT4ge1xyXG4gICAgICAgICAgaWYoIGlkeCA9PSBpbmRleCApe1xyXG4gICAgICAgICAgICB2YWwucmVzb3VyY2UucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmFsLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy52aWRlby5zcmMgPSBpdGVtLnJlc291cmNlLm1lZGlhX3VybDtcclxuICAgICAgfSxcclxuICAgICAgZ290b0NsYXNzSW5kZXgoKXtcclxuICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHt0aGlzLmNsYXNzSWR9YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgcGF5dGlwKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc1BheWVkKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzP2lkPSR7dGhpcy5jbGFzc0lkfWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+35YWI6LSt5Lmw6K++56iLJyxcclxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGdvdG9QYXkoKXtcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+aUr+S7mOS4rS4uLicsXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BheSxcclxuICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDpOdW1iZXIodGhpcy5jbGFzc0lkKSxcclxuICAgICAgICAgICAgICBwYXlzb3VyY2U6MVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBqc0FwaUNvbmZpZyA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7IFxyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAganNBcGlDb25maWcgPSBKU09OLnBhcnNlKGRhdGEuanNhcGlDb25maWcpO1xyXG4gICAgICAgICAgICB9Y2F0Y2ggKGUpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XHJcbiAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiBqc0FwaUNvbmZpZy50aW1lU3RhbXAsXHJcbiAgICAgICAgICAgICAgICdub25jZVN0cic6IGpzQXBpQ29uZmlnLm5vbmNlU3RyLFxyXG4gICAgICAgICAgICAgICAncGFja2FnZSc6IGpzQXBpQ29uZmlnLnBhY2thZ2UsXHJcbiAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxyXG4gICAgICAgICAgICAgICAncGF5U2lnbic6IGpzQXBpQ29uZmlnLnBheVNpZ24sXHJcbiAgICAgICAgICAgICAgICdzdWNjZXNzJzpmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAvLyDmlK/ku5jmiJDlip9cclxuICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICdmYWlsJzpmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAvLyDmlK/ku5jlpLHotKVcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gKTtcclxuICAgICAgIFxyXG4gICAgICB9LFxyXG4gICAgICBnb3RvQWlyY2xlKGlkKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvYWlydGljbGU/aWQ9JHtpZH1gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635b6X6K++56iL55qE5L+h5oGvXHJcbiAgICBnZXRDbGFzc0luZm8oKXtcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+iOt+WPluS4rS4uLicsXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc0luZm8sXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8gPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8ucHJpY2UgPSB0aGlzLmZvcm1hdGVNb25leSh0aGlzLmNsYXNzSW5mby5wcmljZSk7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGggPSB0aGlzLmZvcm1hdGVNb250aCh0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGgpO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+W+l+WFjei0ueivleWQrOWIl+ihqFxyXG4gICAgZ2V0VHJ5TGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1RyeSxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgIGlmKCBkYXRhLmxlbmd0aCApe1xyXG4gICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCh2YWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhbC5yZXNvdXJjZS5tZWRpYV90aW1lID0gdmFsLnJlc291cmNlLm1lZGlhX3RpbWUgJiYgdGhpcy5zZWNvbmRzRm9ybWF0ZSh2YWwucmVzb3VyY2UubWVkaWFfdGltZSk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB0aGlzLmZyZWVDbGFzc0xpc3QgPSBkYXRhO1xyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W56ug6IqC5YiX6KGoXHJcbiAgICBnZXRDaGFwdGVyTGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc0NoYXB0ZXIsXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcclxuICAgICAgICAgICAgICBkYXRhLmZvckVhY2goICh2YWwsaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsLnNsaWRlID0gaSA9PT0gMCA/ICBmYWxzZSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uICYmIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUgPSB2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUgJiYgdGhpcy5zZWNvbmRzRm9ybWF0ZSh2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYXB0ZXJMaXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluaYr+WQpuW3sue7j+i0reS5sOi/h+ivpeivvueoi1xyXG4gICAgZ2V0SXNQYXllZCgpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOk51bWJlcih0aGlzLmNsYXNzSWQpLFxyXG4gICAgICAgICAgICAgIHBheXNvdXJjZToxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICBpZiggcmVzLmRhdGEubXNnID09ICfmgqjlt7LotK3kubDmraTor77nqIsnKXtcclxuICAgICAgICAgICAgdGhpcy5pc1BheWVkID0gdHJ1ZTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmlzUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5jbGFzc0lkID0gb3B0aW9ucy5pZCB8fCA2O1xyXG4gICAgICB0aGlzLmdldENsYXNzSW5mbygpO1xyXG4gICAgICB0aGlzLmdldFRyeUxpc3QoKTtcclxuICAgICAgdGhpcy5nZXRDaGFwdGVyTGlzdCgpO1xyXG4gICAgICB0aGlzLmdldElzUGF5ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogJ+WknOeMq+i2s+W9qeivvueoiycsXHJcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICB9XHJcbiJdfQ==