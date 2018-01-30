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
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/classDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJtaXhpbnMiLCJkYXRhIiwiaXNIYXNWaWRlbyIsImNsYXNzSW5mbyIsIm5hdlR5cGUiLCJpc1BheWVkIiwiY2xhc3NJZCIsImZyZWVDbGFzc0xpc3QiLCJjaGFwdGVyTGlzdCIsInZpZGVvIiwic3JjIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsImZvckVhY2giLCJ2YWwiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJpdGVtIiwibWVkaWFfdXJsIiwiZ290b0NsYXNzSW5kZXgiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwYXl0aXAiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImdvdG9QYXkiLCJzaG93TG9hZGluZyIsInJlcXVlc3QiLCJjbGFzc1BheSIsIm1ldGhvZCIsImNsYXNzX2lkIiwiTnVtYmVyIiwicGF5c291cmNlIiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzZXNzaW9uSUQiLCJ0aGVuIiwianNBcGlDb25maWciLCJyZXMiLCJKU09OIiwicGFyc2UiLCJqc2FwaUNvbmZpZyIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJoaWRlTG9hZGluZyIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwicGF5U2lnbiIsImdvdG9BaXJjbGUiLCJpZCIsImV2ZW50cyIsInByaWNlIiwiZm9ybWF0ZU1vbmV5IiwiZXhwaXJlX21vbnRoIiwiZm9ybWF0ZU1vbnRoIiwiJGFwcGx5IiwibG9nIiwiY2xhc3NUcnkiLCJsZW5ndGgiLCJjbGFzc0NoYXB0ZXIiLCJpIiwic2xpZGUiLCJsZXNzb24iLCJ2YWwyIiwibXNnIiwib3B0aW9ucyIsImdldENsYXNzSW5mbyIsImdldFRyeUxpc3QiLCJnZXRDaGFwdGVyTGlzdCIs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Y0FBSztBQUNIbUMsb0JBQVNDLE9BQU8sS0FBSy9CLE9BQVosQ0FETjtBQUVIZ0MscUJBQVU7QUFGUCxTQUhJO0FBT1RDLGdCQUFRO0FBQ04sbUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFQQyxPQUFiLEVBVUtDLElBVkwsQ0FVVyxlQUFPO0FBQ2hCTyxnQkFBUWdCLEdBQVIsQ0FBWXJCLEdBQVo7QUFDQSxZQUFJQSxJQUFJNUMsSUFBSixDQUFTeUUsR0FBVCxJQUFnQixTQUFwQixFQUE4QjtBQUM1QixpQkFBS3JFLE9BQUwsR0FBZSxJQUFmO0FBQ0QsU0FGRCxNQUVLO0FBQ0gsaUJBQUtBLE9BQUwsR0FBZSxLQUFmO0FBQ0Q7QUFDRixPQWpCRDtBQWtCSDs7OzJCQUdNc0UsTyxFQUFTO0FBQ2QsV0FBS3JFLE9BQUwsR0FBZXFFLFFBQVFoQixFQUF2QjtBQUNBLFdBQUtpQixZQUFMO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUtDLGNBQUw7QUFDQSxXQUFLQyxVQUFMO0FBQ0Q7Ozs7RUExTmdDLGVBQUtDLEk7O2tCQUFuQnBGLEsiLCJmaWxlIjoiY2xhc3NEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIC8vbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ3Rlc3QnXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3RcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGlzSGFzVmlkZW86ZmFsc2UsXHJcbiAgICAgICAgY2xhc3NJbmZvOnt9LFxyXG4gICAgICAgIG5hdlR5cGU6MSxcclxuICAgICAgICBpc1BheWVkOmZhbHNlLFxyXG4gICAgICAgIGNsYXNzSWQ6OCxcclxuICAgICAgICBmcmVlQ2xhc3NMaXN0OltdLFxyXG4gICAgICAgIGNoYXB0ZXJMaXN0OltdLFxyXG4gICAgICAgIHZpZGVvOntcclxuICAgICAgICAgIHNyYzonJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgbmF2dGFnKHR5cGUpe1xyXG4gICAgICAgIHRoaXMubmF2VHlwZSA9IHR5cGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIHBsYXlWaWRlbygpe1xyXG4gICAgICAgIHRoaXMuaXNIYXNWaWRlbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlQ2xhc3NMaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICB2YWwucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgICBpdGVtLnJlc291cmNlLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gaXRlbS5yZXNvdXJjZS5tZWRpYV91cmw7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdvdG9DbGFzc0luZGV4KCl7XHJcbiAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzP2lkPSR7dGhpcy5jbGFzc0lkfWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIHBheXRpcCgpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNQYXllZCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+WFiOi0reS5sOivvueoiycsXHJcbiAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTUwMFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBnb3RvUGF5KCl7XHJcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfmlK/ku5jkuK0uLi4nLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NQYXksXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6TnVtYmVyKHRoaXMuY2xhc3NJZCksXHJcbiAgICAgICAgICAgICAgcGF5c291cmNlOjFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQganNBcGlDb25maWcgPSB7fTtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhOyBcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgIGpzQXBpQ29uZmlnID0gSlNPTi5wYXJzZShkYXRhLmpzYXBpQ29uZmlnKTtcclxuICAgICAgICAgICAgfWNhdGNoIChlKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgICAgICAgICAndGltZVN0YW1wJzoganNBcGlDb25maWcudGltZVN0YW1wLFxyXG4gICAgICAgICAgICAgICAnbm9uY2VTdHInOiBqc0FwaUNvbmZpZy5ub25jZVN0cixcclxuICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBqc0FwaUNvbmZpZy5wYWNrYWdlLFxyXG4gICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcclxuICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBqc0FwaUNvbmZpZy5wYXlTaWduLFxyXG4gICAgICAgICAgICAgICAnc3VjY2Vzcyc6ZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgICAgLy8g5pSv5LuY5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHt0aGlzLmNsYXNzSWR9YFxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAnZmFpbCc6ZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgICAgLy8g5pSv5LuY5aSx6LSlXHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9ICk7XHJcbiAgICAgICBcclxuICAgICAgfSxcclxuICAgICAgZ290b0FpcmNsZShpZCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2FpcnRpY2xlP2lkPSR7aWR9YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+W+l+ivvueoi+eahOS/oeaBr1xyXG4gICAgZ2V0Q2xhc3NJbmZvKCl7XHJcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfojrflj5bkuK0uLi4nLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NJbmZvLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLnByaWNlID0gdGhpcy5mb3JtYXRlTW9uZXkodGhpcy5jbGFzc0luZm8ucHJpY2UpO1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8uZXhwaXJlX21vbnRoID0gdGhpcy5mb3JtYXRlTW9udGgodGhpcy5jbGFzc0luZm8uZXhwaXJlX21vbnRoKTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflvpflhY3otLnor5XlkKzliJfooahcclxuICAgIGdldFRyeUxpc3QoKXtcclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NUcnksXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcclxuICAgICAgICAgICAgICBkYXRhLmZvckVhY2godmFsID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB0aGlzLmZyZWVDbGFzc0xpc3QgPSBkYXRhO1xyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W56ug6IqC5YiX6KGoXHJcbiAgICBnZXRDaGFwdGVyTGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc0NoYXB0ZXIsXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcclxuICAgICAgICAgICAgICBkYXRhLmZvckVhY2goICh2YWwsaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsLnNsaWRlID0gaSA9PT0gMCA/ICBmYWxzZSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uICYmIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYXB0ZXJMaXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluaYr+WQpuW3sue7j+i0reS5sOi/h+ivpeivvueoi1xyXG4gICAgZ2V0SXNQYXllZCgpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOk51bWJlcih0aGlzLmNsYXNzSWQpLFxyXG4gICAgICAgICAgICAgIHBheXNvdXJjZToxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICBpZiggcmVzLmRhdGEubXNnID09ICfmgqjlt7LotK3kubDmraTor77nqIsnKXtcclxuICAgICAgICAgICAgdGhpcy5pc1BheWVkID0gdHJ1ZTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmlzUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5jbGFzc0lkID0gb3B0aW9ucy5pZDtcclxuICAgICAgdGhpcy5nZXRDbGFzc0luZm8oKTtcclxuICAgICAgdGhpcy5nZXRUcnlMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0Q2hhcHRlckxpc3QoKTtcclxuICAgICAgdGhpcy5nZXRJc1BheWVkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=