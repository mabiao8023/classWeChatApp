'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _config = require('./../config/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      navigationBarTitleText: 'test'
    }, _this.components = {}, _this.mixins = [_test2.default], _this.data = {
      isHasVideo: false,
      classInfo: {},
      navType: 2,
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
      paytip: function paytip() {
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
            'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
          }
        }).then(function (res) {
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
        wx.hideLoading();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'getClassInfo',


    // 获得课程的信息
    value: function getClassInfo() {
      var _this2 = this;

      _wepy2.default.request({
        url: _config2.default.classInfo,
        method: "GET",
        data: {
          class_id: this.classId
        },
        header: {
          'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
        }
      }).then(function (res) {
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
          'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
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
          'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
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
          'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
        }
      }).then(function (res) {
        if (res.data.msg == '您已购买此课程') {
          _this5.isPayed = true;
        } else {
          _this5.isPayed = false;
        }
      }).catch(function (e) {
        console.log(e);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.getClassInfo();
      this.getTryList();
      this.getChapterList();
      this.getIsPayed();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/classDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiaXNIYXNWaWRlbyIsImNsYXNzSW5mbyIsIm5hdlR5cGUiLCJpc1BheWVkIiwiY2xhc3NJZCIsImZyZWVDbGFzc0xpc3QiLCJjaGFwdGVyTGlzdCIsInZpZGVvIiwic3JjIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsImZvckVhY2giLCJ2YWwiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJpdGVtIiwibWVkaWFfdXJsIiwicGF5dGlwIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImdvdG9QYXkiLCJzaG93TG9hZGluZyIsInJlcXVlc3QiLCJ1cmwiLCJjbGFzc1BheSIsIm1ldGhvZCIsImNsYXNzX2lkIiwiaGVhZGVyIiwidGhlbiIsImhpZGVMb2FkaW5nIiwiZXZlbnRzIiwicmVzIiwicHJpY2UiLCJmb3JtYXRlTW9uZXkiLCJleHBpcmVfbW9udGgiLCJmb3JtYXRlTW9udGgiLCIkYXBwbHkiLCJjb25zb2xlIiwibG9nIiwiY2xhc3NUcnkiLCJsZW5ndGgiLCJjbGFzc0NoYXB0ZXIiLCJpIiwic2xpZGUiLCJsZXNzb24iLCJ2YWwyIiwibXNnIiwiY2F0Y2giLCJlIiwiZ2V0Q2xhc3NJbmZvIiwiZ2V0VHJ5TGlzdCIsImdldENoYXB0ZXJMaXN0IiwiZ2V0SXNQYXllZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUliQyxNLEdBQVMsZ0IsUUFFVEMsSSxHQUFPO0FBQ0hDLGtCQUFXLEtBRFI7QUFFSEMsaUJB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S0FmSCxDQWVTLGFBQUs7QUFDWlYsZ0JBQVFDLEdBQVIsQ0FBWVUsQ0FBWjtBQUNELE9BakJEO0FBa0JIOzs7NkJBR1E7QUFDUCxXQUFLQyxZQUFMO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUtDLGNBQUw7QUFDQSxXQUFLQyxVQUFMO0FBQ0Q7Ozs7RUF0TGdDLGVBQUtDLEk7O2tCQUFuQmpFLEsiLCJmaWxlIjoiY2xhc3NEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAndGVzdCdcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaXNIYXNWaWRlbzpmYWxzZSxcclxuICAgICAgICBjbGFzc0luZm86e30sXHJcbiAgICAgICAgbmF2VHlwZToyLFxyXG4gICAgICAgIGlzUGF5ZWQ6ZmFsc2UsXHJcbiAgICAgICAgY2xhc3NJZDo4LFxyXG4gICAgICAgIGZyZWVDbGFzc0xpc3Q6W10sXHJcbiAgICAgICAgY2hhcHRlckxpc3Q6W10sXHJcbiAgICAgICAgdmlkZW86e1xyXG4gICAgICAgICAgc3JjOicnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBuYXZ0YWcodHlwZSl7XHJcbiAgICAgICAgdGhpcy5uYXZUeXBlID0gdHlwZTtcclxuICAgICAgfSxcclxuICAgICAgcGxheVZpZGVvKCl7XHJcbiAgICAgICAgdGhpcy5pc0hhc1ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVDbGFzc0xpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgIHZhbC5yZXNvdXJjZS5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgIGl0ZW0ucmVzb3VyY2UucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52aWRlby5zcmMgPSBpdGVtLnJlc291cmNlLm1lZGlhX3VybDtcclxuICAgICAgfSxcclxuICAgICAgcGF5dGlwKCl7XHJcbiAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7flhYjotK3kubDor77nqIsnLFxyXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDE1MDBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgZ290b1BheSgpe1xyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5LitLi4uJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgLy8gdG9kbzrosIPlvq7kv6HmlK/ku5hcclxuICAgICAgICAgICAgLy8gaWYocmVzLmpzYXBpQ29uZmlnKXtcclxuICAgICAgICAgICAgLy8gbGV0IHd4Q29uZmlnID0gcmVzLmpzYXBpQ29uZmlnO1xyXG4gICAgICAgICAgICAvLyBjb21tb25Gbi53eFBheSh7XHJcbiAgICAgICAgICAgIC8vICAgd3hQYXlDb25mOnd4Q29uZmlnLFxyXG4gICAgICAgICAgICAvLyAgIHN1Y2Nlc3NDYjp0aGlzLnd4UGF5U3VjLmJpbmQodGhpcyx3eENvbmZpZyksXHJcbiAgICAgICAgICAgIC8vICAgZmFpbENiOnRoaXMubGF5ZXIuYmluZCh0aGlzLCfmlK/ku5jlpLHotKXvvIzor7fph43or5UnKSxcclxuICAgICAgICAgICAgLy8gICBjYW5jZWxDYjp0aGlzLmxheWVyLmJpbmQodGhpcywn5pSv5LuY5aSx6LSl77yM6K+36YeN6K+VJyksXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICB9LFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflvpfor77nqIvnmoTkv6Hmga9cclxuICAgIGdldENsYXNzSW5mbygpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzSW5mbyxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8gPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8ucHJpY2UgPSB0aGlzLmZvcm1hdGVNb25leSh0aGlzLmNsYXNzSW5mby5wcmljZSk7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGggPSB0aGlzLmZvcm1hdGVNb250aCh0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGgpO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+W+l+WFjei0ueivleWQrOWIl+ihqFxyXG4gICAgZ2V0VHJ5TGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1RyeSxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgaWYoIGRhdGEubGVuZ3RoICl7XHJcbiAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgdGhpcy5mcmVlQ2xhc3NMaXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bnq6DoioLliJfooahcclxuICAgIGdldENoYXB0ZXJMaXN0KCl7XHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzQ2hhcHRlcixcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgaWYoIGRhdGEubGVuZ3RoICl7XHJcbiAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCAodmFsLGkpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbC5zbGlkZSA9IGkgPT09IDAgPyAgZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdmFsLmxlc3NvbiAmJiB2YWwubGVzc29uLmZvckVhY2goIHZhbDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jaGFwdGVyTGlzdCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgIH0gXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bmmK/lkKblt7Lnu4/otK3kubDov4for6Xor77nqItcclxuICAgIGdldElzUGF5ZWQoKXtcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BheSxcclxuICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICBpZiggcmVzLmRhdGEubXNnID09ICfmgqjlt7LotK3kubDmraTor77nqIsnKXtcclxuICAgICAgICAgICAgdGhpcy5pc1BheWVkID0gdHJ1ZTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmlzUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgdGhpcy5nZXRDbGFzc0luZm8oKTtcclxuICAgICAgdGhpcy5nZXRUcnlMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0Q2hhcHRlckxpc3QoKTtcclxuICAgICAgdGhpcy5nZXRJc1BheWVkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=