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
        _wepy2.default.request({
          url: _config2.default.decryptData,
          method: "POST",
          data: {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
          },
          header: {
            'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
          }
        }).then(function (res) {
          console.log(res);
        });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJDb250YWN0IiwibWl4aW5zIiwibXlNaXhpbiIsImRhdGEiLCJpc0hhc1ZpZGVvIiwiY2xhc3NJbmZvIiwibmF2VHlwZSIsImlzUGF5ZWQiLCJjbGFzc0lkIiwiZnJlZUNsYXNzTGlzdCIsImNoYXB0ZXJMaXN0IiwidmlkZW8iLCJzcmMiLCJpc0ZyZWUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnZXRQaG9uZSIsImUiLCJjb25zb2xlIiwibG9nIiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJhcGlQYXRoIiwiZGVjcnlwdERhdGEiLCJtZXRob2QiLCJlbmNyeXB0ZWREYXRhIiwiZGV0YWlsIiwiaXYiLCJoZWFkZXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNlc3Npb25JRCIsInRoZW4iLCJyZXMiLCJuYXZ0YWciLCJ0eXBlIiwicGxheVZpZGVvIiwiaXRlbSIsImluZGV4IiwiZm9yRWFjaCIsInZhbCIsImlkeCIsInJlc291cmNlIiwicGxheWluZyIsIm1lZGlhX3VybCIsImdvdG9DbGFzc0luZGV4Iiwid3giLCJuYXZpZ2F0ZVRvIiwicGF5dGlwIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJnb3RvUGF5Iiwic2hvd0xvYWRpbmciLCJjbGFzc1BheSIsImNsYXNzX2lkIiwiTnVtYmVyIiwicGF5c291cmNlIiwianNBcGlDb25maWciLCJKU09OIiwicGFyc2UiLCJqc2FwaUNvbmZpZyIsImVycm9yIiwiaGlkZUxvYWRpbmciLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsIm5vbmNlU3RyIiwicGFja2FnZSIsInBheVNpZ24iLCJnb3RvQWlyY2xlIiwiaWQiLCJldmVudHMiLCJwcmljZSIsImZvcm1hdGVNb25leSIsImV4cGlyZV9tb250aCIsImZvcm1hdGVNb250aCIsIiRhcHBseSIsImNsYXNzVHJ5IiwibGVuZ3RoIiwibWVkaWFfdGltZSIsInNlY29uZHNGb3JtYXRlIiwiY2xhc3NDaGFwdGVyIiwiaSIsInNsaWRlIiwibGVzc29uIiwidmFsMiIsIm1zZyIsIm9wdGlvbnMiLCJnZXRDbGFzc0luZm8iLCJnZXRUcnlMaXN0IiwiZ2V0Q2hhcHRlckxpc3QiLCJnZXRJc1BheWVkIiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFGMkM7OztJQUd0QkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUDtBQURPLEssUUFHVEMsVSxHQUFhO0FBQ1hDLGVBQVFDO0FBREcsSyxRQUliQyxNLEdBQVMsQ0FBQ0MsY0FBRCxDLFFBRVRDLEksR0FBTztBQUNIQyxrQkFBVyxLQURSO0FBRUhDLGlCQUFVLEVBRlA7QUFHSEMsZUFBUSxDQUhMO0FBSUhDLGVBQVEsS0FKTDtBQUtIQyxlQUFRLENBTEw7QUFNSEMscUJBQWMsRUFOWDtBQU9IQyxtQkFBWSxFQVBUO0FBUUhDLGFBQU07QUFDSkMsYUFBSTtBQURBLE9BUkg7QUFXSEMsY0FBUTtBQVhMLEssUUFjUEMsUSxHQUFXLEUsUUFJWEMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0NDLENBREQsRUFDSTtBQUNWQyxnQkFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0FHLHVCQUFLQyxPQUFMLENBQWE7QUFDVEMsZUFBSUMsaUJBQVFDLFdBREg7QUFFVEMsa0JBQU8sTUFGRTtBQUdUdEIsZ0JBQUs7QUFDSHVCLDJCQUFlVCxFQUFFVSxNQUFGLENBQVNELGFBRHJCO0FBRUhFLGdCQUFJWCxFQUFFVSxNQUFGLENBQVNDO0FBRlYsV0FISTtBQU9UQyxrQkFBUTtBQUNOLHFDQUF1QixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDO0FBRHpDO0FBUEMsU0FBYixFQVVLQyxJQVZMLENBVVcsZUFBTztBQUNkZixrQkFBUUMsR0FB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QUFULEVBQWM7QUFDbEI7QUFDRDtBQVRNLE9BQVA7QUFXRDs7OztFQTdRNEJkLGVBQUs4RSxJOztrQkFBbkJ0RyxLIiwiZmlsZSI6ImNsYXNzRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgLy9uYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAndGVzdCdcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGNvbnRhY3Q6Q29udGFjdFxuICAgIH1cblxuICAgIG1peGlucyA9IFtteU1peGluXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgaXNIYXNWaWRlbzpmYWxzZSxcbiAgICAgICAgY2xhc3NJbmZvOnt9LFxuICAgICAgICBuYXZUeXBlOjEsXG4gICAgICAgIGlzUGF5ZWQ6ZmFsc2UsXG4gICAgICAgIGNsYXNzSWQ6OCxcbiAgICAgICAgZnJlZUNsYXNzTGlzdDpbXSxcbiAgICAgICAgY2hhcHRlckxpc3Q6W10sXG4gICAgICAgIHZpZGVvOntcbiAgICAgICAgICBzcmM6JydcbiAgICAgICAgfSxcbiAgICAgICAgaXNGcmVlOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnZXRQaG9uZShlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOmFwaVBhdGguZGVjcnlwdERhdGEsXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgaXY6IGUuZGV0YWlsLml2XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBuYXZ0YWcodHlwZSl7XG4gICAgICAgIHRoaXMubmF2VHlwZSA9IHR5cGU7XG4gICAgICB9LFxuICAgICAgcGxheVZpZGVvKGl0ZW0saW5kZXgpe1xuICAgICAgICB0aGlzLmlzSGFzVmlkZW8gPSB0cnVlO1xuICAgICAgICB0aGlzLmZyZWVDbGFzc0xpc3QuZm9yRWFjaCggKHZhbCxpZHgpID0+IHtcbiAgICAgICAgICBpZiggaWR4ID09IGluZGV4ICl7XG4gICAgICAgICAgICB2YWwucmVzb3VyY2UucGxheWluZyA9IHRydWU7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YWwucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy52aWRlby5zcmMgPSBpdGVtLnJlc291cmNlLm1lZGlhX3VybDtcbiAgICAgIH0sXG4gICAgICBnb3RvQ2xhc3NJbmRleCgpe1xuICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzP2lkPSR7dGhpcy5jbGFzc0lkfWBcbiAgICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBheXRpcCgpe1xuICAgICAgICBpZih0aGlzLmlzUGF5ZWQgfHwgdGhpcy5pc0ZyZWUpe1xuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn6K+35YWI6LSt5Lmw6K++56iLJyxcbiAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgZHVyYXRpb246IDE1MDBcbiAgICAgICAgfSlcbiAgICAgIH0sXG5cbiAgICAgIGdvdG9QYXkoKXtcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5LitLi4uJyxcbiAgICAgICAgfSlcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxuICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgIGNsYXNzX2lkOk51bWJlcih0aGlzLmNsYXNzSWQpLFxuICAgICAgICAgICAgICBwYXlzb3VyY2U6MVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICB9XG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcbiAgICAgICAgICAgIGxldCBqc0FwaUNvbmZpZyA9IHt9O1xuICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhOyBcbiAgICAgICAgICAgIC8qIOWFjei0ueeahOebtOaOpei3s+i9rOS4jeeUqOaUr+S7mCAqL1xuICAgICAgICAgICAgaWYoIHRoaXMuaXNGcmVlICl7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAganNBcGlDb25maWcgPSBKU09OLnBhcnNlKGRhdGEuanNhcGlDb25maWcpO1xuICAgICAgICAgICAgfWNhdGNoIChlKXtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IGpzQXBpQ29uZmlnLnRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICdub25jZVN0cic6IGpzQXBpQ29uZmlnLm5vbmNlU3RyLFxuICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBqc0FwaUNvbmZpZy5wYWNrYWdlLFxuICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAncGF5U2lnbic6IGpzQXBpQ29uZmlnLnBheVNpZ24sXG4gICAgICAgICAgICAgICAnc3VjY2Vzcyc6ZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgIC8vIOaUr+S7mOaIkOWKn1xuICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHt0aGlzLmNsYXNzSWR9YFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAnZmFpbCc6ZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgIC8vIOaUr+S7mOWksei0pVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSApO1xuICAgICAgIFxuICAgICAgfSxcbiAgICAgIGdvdG9BaXJjbGUoaWQpe1xuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2FpcnRpY2xlP2lkPSR7aWR9YFxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgIFxuICAgIH1cblxuICAgIC8vIOiOt+W+l+ivvueoi+eahOS/oeaBr1xuICAgIGdldENsYXNzSW5mbygpe1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfojrflj5bkuK0uLi4nLFxuICAgICAgICB9KVxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NJbmZvLFxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mbyA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgaWYoICgrdGhpcy5jbGFzc0luZm8ucHJpY2UpIDw9IDAgKXtcbiAgICAgICAgICAgIHRoaXMuaXNGcmVlID0gdHJ1ZTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaXNGcmVlID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLnByaWNlID0gdGhpcy5mb3JtYXRlTW9uZXkodGhpcy5jbGFzc0luZm8ucHJpY2UpO1xuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCA9IHRoaXMuZm9ybWF0ZU1vbnRoKHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCk7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8g6I635b6X5YWN6LS56K+V5ZCs5YiX6KGoXG4gICAgZ2V0VHJ5TGlzdCgpe1xuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzVHJ5LFxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgIGlmKCBkYXRhLmxlbmd0aCApe1xuICAgICAgICAgICAgICBkYXRhLmZvckVhY2godmFsID0+IHtcbiAgICAgICAgICAgICAgICB2YWwucGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhbC5yZXNvdXJjZS5tZWRpYV90aW1lID0gdmFsLnJlc291cmNlLm1lZGlhX3RpbWUgJiYgdGhpcy5zZWNvbmRzRm9ybWF0ZSh2YWwucmVzb3VyY2UubWVkaWFfdGltZSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHRoaXMuZnJlZUNsYXNzTGlzdCA9IGRhdGE7XG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyDojrflj5bnq6DoioLliJfooahcbiAgICBnZXRDaGFwdGVyTGlzdCgpe1xuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzQ2hhcHRlcixcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICB9XG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcbiAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCAodmFsLGkpID0+IHtcbiAgICAgICAgICAgICAgICB2YWwuc2xpZGUgPSBpID09PSAwID8gIGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uICYmIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UubWVkaWFfdGltZSA9IHZhbDIucmVzb3VyY2UubWVkaWFfdGltZSAmJiB0aGlzLnNlY29uZHNGb3JtYXRlKHZhbDIucmVzb3VyY2UubWVkaWFfdGltZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuY2hhcHRlckxpc3QgPSBkYXRhO1xuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgfSBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyDojrflj5bmmK/lkKblt7Lnu4/otK3kubDov4for6Xor77nqItcbiAgICBnZXRJc1BheWVkKCl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BheSxcbiAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICBjbGFzc19pZDpOdW1iZXIodGhpcy5jbGFzc0lkKSxcbiAgICAgICAgICAgICAgcGF5c291cmNlOjFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICBpZiggcmVzLmRhdGEubXNnID09ICfmgqjlt7LotK3kubDmraTor77nqIsnKXtcbiAgICAgICAgICAgIHRoaXMuaXNQYXllZCA9IHRydWU7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmlzUGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuY2xhc3NJZCA9IG9wdGlvbnMuaWQgfHwgNjtcbiAgICAgIHRoaXMuZ2V0Q2xhc3NJbmZvKCk7XG4gICAgICB0aGlzLmdldFRyeUxpc3QoKTtcbiAgICAgIHRoaXMuZ2V0Q2hhcHRlckxpc3QoKTtcbiAgICAgIHRoaXMuZ2V0SXNQYXllZCgpO1xuICAgIH1cblxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGl0bGU6ICflpJznjKvotrPlvanor77nqIsnLFxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxuICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgfVxuIl19