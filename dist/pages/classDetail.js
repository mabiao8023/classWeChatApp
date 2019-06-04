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
      },
      isFree: false
    }, _this.computed = {}, _this.methods = {
      getPhone: function getPhone(e) {
        console.log(e);
      },
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
        if (this.isPayed || this.isFree) {
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
        var _this2 = this;

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
          /* 免费的直接跳转不用支付 */
          if (_this2.isFree) {
            wx.navigateTo({
              url: '/pages/class?id=' + _this2.classId
            });
            return;
          }

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
      var _this3 = this;

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
        _this3.classInfo = res.data.data;
        if (+_this3.classInfo.price <= 0) {
          _this3.isFree = true;
        } else {
          _this3.isFree = false;
        }
        _this3.classInfo.price = _this3.formateMoney(_this3.classInfo.price);
        _this3.classInfo.expire_month = _this3.formateMonth(_this3.classInfo.expire_month);
        _this3.$apply();
        console.log(res.data);
      });
    }

    // 获得免费试听列表

  }, {
    key: 'getTryList',
    value: function getTryList() {
      var _this4 = this;

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
            val.resource.media_time = val.resource.media_time && _this4.secondsFormate(val.resource.media_time);
          });
          _this4.freeClassList = data;
          _this4.$apply();
        } else {}
      });
    }

    // 获取章节列表

  }, {
    key: 'getChapterList',
    value: function getChapterList() {
      var _this5 = this;

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
              val2.resource.media_time = val2.resource.media_time && _this5.secondsFormate(val2.resource.media_time);
            });
          });
          _this5.chapterList = data;
          _this5.$apply();
        } else {}
      });
    }

    // 获取是否已经购买过该课程

  }, {
    key: 'getIsPayed',
    value: function getIsPayed() {
      var _this6 = this;

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
          _this6.isPayed = true;
        } else {
          _this6.isPayed = false;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJDb250YWN0IiwibWl4aW5zIiwibXlNaXhpbiIsImRhdGEiLCJpc0hhc1ZpZGVvIiwiY2xhc3NJbmZvIiwibmF2VHlwZSIsImlzUGF5ZWQiLCJjbGFzc0lkIiwiZnJlZUNsYXNzTGlzdCIsImNoYXB0ZXJMaXN0IiwidmlkZW8iLCJzcmMiLCJpc0ZyZWUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnZXRQaG9uZSIsImUiLCJjb25zb2xlIiwibG9nIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsIml0ZW0iLCJpbmRleCIsImZvckVhY2giLCJ2YWwiLCJpZHgiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJtZWRpYV91cmwiLCJnb3RvQ2xhc3NJbmRleCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInBheXRpcCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwiZ290b1BheSIsInNob3dMb2FkaW5nIiwid2VweSIsInJlcXVlc3QiLCJhcGlQYXRoIiwiY2xhc3NQYXkiLCJtZXRob2QiLCJjbGFzc19pZCIsIk51bWJlciIsInBheXNvdXJjZSIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2Vzc2lvbklEIiwidGhlbiIsImpzQXBpQ29uZmlnIiwicmVzIiwiSlNPTiIsInBhcnNlIiwianNhcGlDb25maWciLCJlcnJvciIsImhpZGVMb2FkaW5nIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJub25jZVN0ciIsInBhY2thZ2UiLCJwYXlTaWduIiwiZ290b0FpcmNsZSIsImlkIiwiZXZlbnRzIiwicHJpY2UiLCJmb3JtYXRlTW9uZXkiLCJleHBpcmVfbW9udGgiLCJmb3JtYXRlTW9udGgiLCIkYXBwbHkiLCJjbGFzc1RyeSIsImxlbmd0aCIsIm1lZGlhX3RpbWUiLCJzZWNvbmRzRm9ybWF0ZSIsImNsYXNzQ2hhcHRlciIsImkiLCJzbGlkZSIsImxlc3NvbiIsInZhbDIiLCJtc2ciLCJvcHRpb25zIiwiZ2V0Q2xhc3NJbmZvIiwiZ2V0VHJ5TGlzdCIsImdldENoYXB0ZXJMaXN0IiwiZ2V0SXNQYXllZCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBRjJDOzs7SUFHdEJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1A7QUFETyxLLFFBR1RDLFUsR0FBYTtBQUNYQyxlQUFRQztBQURHLEssUUFJYkMsTSxHQUFTLENBQUNDLGNBQUQsQyxRQUVUQyxJLEdBQU87QUFDSEMsa0JBQVcsS0FEUjtBQUVIQyxpQkFBVSxFQUZQO0FBR0hDLGVBQVEsQ0FITDtBQUlIQyxlQUFRLEtBSkw7QUFLSEMsZUFBUSxDQUxMO0FBTUhDLHFCQUFjLEVBTlg7QUFPSEMsbUJBQVksRUFQVDtBQVFIQyxhQUFNO0FBQ0pDLGFBQUk7QUFEQSxPQVJIO0FBV0hDLGNBQVE7QUFYTCxLLFFBY1BDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDQyxDQURELEVBQ0k7QUFDVkMsZ0JBQVFDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNELE9BSE87QUFJUkcsWUFKUSxrQkFJREMsSUFKQyxFQUlJO0FBQ1YsYUFBS2YsT0FBTCxHQUFlZSxJQUFmO0FBQ0QsT0FOTztBQU9SQyxlQVBRLHFCQU9FQyxJQVBGLEVBT09DLEtBUFAsRUFPYTtBQUNuQixhQUFLcEIsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGFBQUtLLGFBQUwsQ0FBbUJnQixPQUFuQixDQUE0QixVQUFDQyxHQUFELEVBQUtDLEdBQUwsRUFBYTtBQUN2QyxjQUFJQSxPQUFPSCxLQUFYLEVBQWtCO0FBQ2hCRSxnQkFBSUUsUUFBSixDQUFhQyxPQUFiLEdBQXVCLElBQXZCO0FBQ0QsV0FGRCxNQUVLO0FBQ0hILGdCQUFJ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QUZQLFNBSEk7QUFPVEMsZ0JBQVE7QUFDTixtQ0FBdUIsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR6QztBQVBDLE9BQWIsRUFVS0MsSUFWTCxDQVVXLGVBQU87QUFDaEJwQyxnQkFBUUMsR0FBUixDQUFZcUMsR0FBWjtBQUNBLFlBQUlBLElBQUlyRCxJQUFKLENBQVNpRixHQUFULElBQWdCLFNBQXBCLEVBQThCO0FBQzVCLGlCQUFLN0UsT0FBTCxHQUFlLElBQWY7QUFDRCxTQUZELE1BRUs7QUFDSCxpQkFBS0EsT0FBTCxHQUFlLEtBQWY7QUFDRDtBQUNGLE9BakJEO0FBa0JIOzs7MkJBR004RSxPLEVBQVM7QUFDZCxXQUFLN0UsT0FBTCxHQUFlNkUsUUFBUWpCLEVBQVIsSUFBYyxDQUE3QjtBQUNBLFdBQUtrQixZQUFMO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUtDLGNBQUw7QUFDQSxXQUFLQyxVQUFMO0FBQ0Q7Ozt3Q0FFbUI7QUFDZCxhQUFPO0FBQ1BwRCxlQUFPLFFBREE7QUFFUHFELGNBQU0sY0FGQztBQUdQQyxrQkFBUyx1QkFIRjtBQUlQQyxpQkFBUSxpQkFBU3BDLEdBQVQsRUFBYztBQUNwQjtBQUNELFNBTk07QUFPUHFDLGNBQU0sY0FBU3JDLEdBQVQsRUFBYztBQUNsQjtBQUNEO0FBVE0sT0FBUDtBQVdEOzs7O0VBaFE0QmQsZUFBS29ELEk7O2tCQUFuQmxHLEsiLCJmaWxlIjoiY2xhc3NEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAvL25hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICd0ZXN0J1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgY29udGFjdDpDb250YWN0XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW215TWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgICBpc0hhc1ZpZGVvOmZhbHNlLFxuICAgICAgICBjbGFzc0luZm86e30sXG4gICAgICAgIG5hdlR5cGU6MSxcbiAgICAgICAgaXNQYXllZDpmYWxzZSxcbiAgICAgICAgY2xhc3NJZDo4LFxuICAgICAgICBmcmVlQ2xhc3NMaXN0OltdLFxuICAgICAgICBjaGFwdGVyTGlzdDpbXSxcbiAgICAgICAgdmlkZW86e1xuICAgICAgICAgIHNyYzonJ1xuICAgICAgICB9LFxuICAgICAgICBpc0ZyZWU6IGZhbHNlLFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdldFBob25lKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgIH0sXG4gICAgICBuYXZ0YWcodHlwZSl7XG4gICAgICAgIHRoaXMubmF2VHlwZSA9IHR5cGU7XG4gICAgICB9LFxuICAgICAgcGxheVZpZGVvKGl0ZW0saW5kZXgpe1xuICAgICAgICB0aGlzLmlzSGFzVmlkZW8gPSB0cnVlO1xuICAgICAgICB0aGlzLmZyZWVDbGFzc0xpc3QuZm9yRWFjaCggKHZhbCxpZHgpID0+IHtcbiAgICAgICAgICBpZiggaWR4ID09IGluZGV4ICl7XG4gICAgICAgICAgICB2YWwucmVzb3VyY2UucGxheWluZyA9IHRydWU7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YWwucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy52aWRlby5zcmMgPSBpdGVtLnJlc291cmNlLm1lZGlhX3VybDtcbiAgICAgIH0sXG4gICAgICBnb3RvQ2xhc3NJbmRleCgpe1xuICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzP2lkPSR7dGhpcy5jbGFzc0lkfWBcbiAgICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBheXRpcCgpe1xuICAgICAgICBpZih0aGlzLmlzUGF5ZWQgfHwgdGhpcy5pc0ZyZWUpe1xuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn6K+35YWI6LSt5Lmw6K++56iLJyxcbiAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgZHVyYXRpb246IDE1MDBcbiAgICAgICAgfSlcbiAgICAgIH0sXG5cbiAgICAgIGdvdG9QYXkoKXtcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5LitLi4uJyxcbiAgICAgICAgfSlcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxuICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgIGNsYXNzX2lkOk51bWJlcih0aGlzLmNsYXNzSWQpLFxuICAgICAgICAgICAgICBwYXlzb3VyY2U6MVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICB9XG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcbiAgICAgICAgICAgIGxldCBqc0FwaUNvbmZpZyA9IHt9O1xuICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhOyBcbiAgICAgICAgICAgIC8qIOWFjei0ueeahOebtOaOpei3s+i9rOS4jeeUqOaUr+S7mCAqL1xuICAgICAgICAgICAgaWYoIHRoaXMuaXNGcmVlICl7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAganNBcGlDb25maWcgPSBKU09OLnBhcnNlKGRhdGEuanNhcGlDb25maWcpO1xuICAgICAgICAgICAgfWNhdGNoIChlKXtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IGpzQXBpQ29uZmlnLnRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICdub25jZVN0cic6IGpzQXBpQ29uZmlnLm5vbmNlU3RyLFxuICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBqc0FwaUNvbmZpZy5wYWNrYWdlLFxuICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAncGF5U2lnbic6IGpzQXBpQ29uZmlnLnBheVNpZ24sXG4gICAgICAgICAgICAgICAnc3VjY2Vzcyc6ZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgIC8vIOaUr+S7mOaIkOWKn1xuICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHt0aGlzLmNsYXNzSWR9YFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAnZmFpbCc6ZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgIC8vIOaUr+S7mOWksei0pVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSApO1xuICAgICAgIFxuICAgICAgfSxcbiAgICAgIGdvdG9BaXJjbGUoaWQpe1xuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2FpcnRpY2xlP2lkPSR7aWR9YFxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgIFxuICAgIH1cblxuICAgIC8vIOiOt+W+l+ivvueoi+eahOS/oeaBr1xuICAgIGdldENsYXNzSW5mbygpe1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfojrflj5bkuK0uLi4nLFxuICAgICAgICB9KVxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NJbmZvLFxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mbyA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgaWYoICgrdGhpcy5jbGFzc0luZm8ucHJpY2UpIDw9IDAgKXtcbiAgICAgICAgICAgIHRoaXMuaXNGcmVlID0gdHJ1ZTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaXNGcmVlID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLnByaWNlID0gdGhpcy5mb3JtYXRlTW9uZXkodGhpcy5jbGFzc0luZm8ucHJpY2UpO1xuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCA9IHRoaXMuZm9ybWF0ZU1vbnRoKHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCk7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8g6I635b6X5YWN6LS56K+V5ZCs5YiX6KGoXG4gICAgZ2V0VHJ5TGlzdCgpe1xuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzVHJ5LFxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgIGlmKCBkYXRhLmxlbmd0aCApe1xuICAgICAgICAgICAgICBkYXRhLmZvckVhY2godmFsID0+IHtcbiAgICAgICAgICAgICAgICB2YWwucGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhbC5yZXNvdXJjZS5tZWRpYV90aW1lID0gdmFsLnJlc291cmNlLm1lZGlhX3RpbWUgJiYgdGhpcy5zZWNvbmRzRm9ybWF0ZSh2YWwucmVzb3VyY2UubWVkaWFfdGltZSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHRoaXMuZnJlZUNsYXNzTGlzdCA9IGRhdGE7XG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyDojrflj5bnq6DoioLliJfooahcbiAgICBnZXRDaGFwdGVyTGlzdCgpe1xuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzQ2hhcHRlcixcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICB9XG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcbiAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCAodmFsLGkpID0+IHtcbiAgICAgICAgICAgICAgICB2YWwuc2xpZGUgPSBpID09PSAwID8gIGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uICYmIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UubWVkaWFfdGltZSA9IHZhbDIucmVzb3VyY2UubWVkaWFfdGltZSAmJiB0aGlzLnNlY29uZHNGb3JtYXRlKHZhbDIucmVzb3VyY2UubWVkaWFfdGltZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuY2hhcHRlckxpc3QgPSBkYXRhO1xuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgfSBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyDojrflj5bmmK/lkKblt7Lnu4/otK3kubDov4for6Xor77nqItcbiAgICBnZXRJc1BheWVkKCl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BheSxcbiAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICBjbGFzc19pZDpOdW1iZXIodGhpcy5jbGFzc0lkKSxcbiAgICAgICAgICAgICAgcGF5c291cmNlOjFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICBpZiggcmVzLmRhdGEubXNnID09ICfmgqjlt7LotK3kubDmraTor77nqIsnKXtcbiAgICAgICAgICAgIHRoaXMuaXNQYXllZCA9IHRydWU7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmlzUGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuY2xhc3NJZCA9IG9wdGlvbnMuaWQgfHwgNjtcbiAgICAgIHRoaXMuZ2V0Q2xhc3NJbmZvKCk7XG4gICAgICB0aGlzLmdldFRyeUxpc3QoKTtcbiAgICAgIHRoaXMuZ2V0Q2hhcHRlckxpc3QoKTtcbiAgICAgIHRoaXMuZ2V0SXNQYXllZCgpO1xuICAgIH1cblxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGl0bGU6ICflpJznjKvotrPlvanor77nqIsnLFxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxuICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgfVxuIl19