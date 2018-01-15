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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiaXNIYXNWaWRlbyIsImNsYXNzSW5mbyIsIm5hdlR5cGUiLCJpc1BheWVkIiwiY2xhc3NJZCIsImZyZWVDbGFzc0xpc3QiLCJjaGFwdGVyTGlzdCIsInZpZGVvIiwic3JjIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsImZvckVhY2giLCJ2YWwiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJpdGVtIiwibWVkaWFfdXJsIiwicGF5dGlwIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImdvdG9QYXkiLCJzaG93TG9hZGluZyIsInJlcXVlc3QiLCJ1cmwiLCJjbGFzc1BheSIsIm1ldGhvZCIsImNsYXNzX2lkIiwiaGVhZGVyIiwidGhlbiIsImhpZGVMb2FkaW5nIiwiZ290b0FpcmNsZSIsImlkIiwibmF2aWdhdGVUbyIsImV2ZW50cyIsInJlcyIsInByaWNlIiwiZm9ybWF0ZU1vbmV5IiwiZXhwaXJlX21vbnRoIiwiZm9ybWF0ZU1vbnRoIiwiJGFwcGx5IiwiY29uc29sZSIsImxvZyIsImNsYXNzVHJ5IiwibGVuZ3RoIiwiY2xhc3NDaGFwdGVyIiwiaSIsInNsaWRlIiwibGVzc29uIiwidmFsMiIsIm1zZyIsImNhdGNoIiwiZSIsImdldENsYXNzSW5mbyIsImdldFRyeUxpc3QiLCJnZXRDaGFwdGVyTGlzdCIsImdldElzUGF5ZWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFJYkMsTSxHQUFTLGdCLFFBRVRDLEks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QUFKLENBQVN3RCxHQUFULElBQWdCLFNBQXBCLEVBQThCO0FBQzVCLGlCQUFLcEQsT0FBTCxHQUFlLElBQWY7QUFDRCxTQUZELE1BRUs7QUFDSCxpQkFBS0EsT0FBTCxHQUFlLEtBQWY7QUFDRDtBQUNGLE9BZkQsRUFlR3FELEtBZkgsQ0FlUyxhQUFLO0FBQ1pWLGdCQUFRQyxHQUFSLENBQVlVLENBQVo7QUFDRCxPQWpCRDtBQWtCSDs7OzZCQUdRO0FBQ1AsV0FBS0MsWUFBTDtBQUNBLFdBQUtDLFVBQUw7QUFDQSxXQUFLQyxjQUFMO0FBQ0EsV0FBS0MsVUFBTDtBQUNEOzs7O0VBMUxnQyxlQUFLQyxJOztrQkFBbkJwRSxLIiwiZmlsZSI6ImNsYXNzRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ3Rlc3QnXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGlzSGFzVmlkZW86ZmFsc2UsXHJcbiAgICAgICAgY2xhc3NJbmZvOnt9LFxyXG4gICAgICAgIG5hdlR5cGU6MSxcclxuICAgICAgICBpc1BheWVkOmZhbHNlLFxyXG4gICAgICAgIGNsYXNzSWQ6OCxcclxuICAgICAgICBmcmVlQ2xhc3NMaXN0OltdLFxyXG4gICAgICAgIGNoYXB0ZXJMaXN0OltdLFxyXG4gICAgICAgIHZpZGVvOntcclxuICAgICAgICAgIHNyYzonJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgbmF2dGFnKHR5cGUpe1xyXG4gICAgICAgIHRoaXMubmF2VHlwZSA9IHR5cGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIHBsYXlWaWRlbygpe1xyXG4gICAgICAgIHRoaXMuaXNIYXNWaWRlbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlQ2xhc3NMaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICB2YWwucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgICBpdGVtLnJlc291cmNlLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gaXRlbS5yZXNvdXJjZS5tZWRpYV91cmw7XHJcbiAgICAgIH0sXHJcbiAgICAgIHBheXRpcCgpe1xyXG4gICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+35YWI6LSt5Lmw6K++56iLJyxcclxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGdvdG9QYXkoKXtcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+aUr+S7mOS4rS4uLicsXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BheSxcclxuICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIC8vIHRvZG866LCD5b6u5L+h5pSv5LuYXHJcbiAgICAgICAgICAgIC8vIGlmKHJlcy5qc2FwaUNvbmZpZyl7XHJcbiAgICAgICAgICAgIC8vIGxldCB3eENvbmZpZyA9IHJlcy5qc2FwaUNvbmZpZztcclxuICAgICAgICAgICAgLy8gY29tbW9uRm4ud3hQYXkoe1xyXG4gICAgICAgICAgICAvLyAgIHd4UGF5Q29uZjp3eENvbmZpZyxcclxuICAgICAgICAgICAgLy8gICBzdWNjZXNzQ2I6dGhpcy53eFBheVN1Yy5iaW5kKHRoaXMsd3hDb25maWcpLFxyXG4gICAgICAgICAgICAvLyAgIGZhaWxDYjp0aGlzLmxheWVyLmJpbmQodGhpcywn5pSv5LuY5aSx6LSl77yM6K+36YeN6K+VJyksXHJcbiAgICAgICAgICAgIC8vICAgY2FuY2VsQ2I6dGhpcy5sYXllci5iaW5kKHRoaXMsJ+aUr+S7mOWksei0pe+8jOivt+mHjeivlScpLFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgfSxcclxuICAgICAgZ290b0FpcmNsZShpZCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2FpcnRpY2xlP2lkPSR7aWR9YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+W+l+ivvueoi+eahOS/oeaBr1xyXG4gICAgZ2V0Q2xhc3NJbmZvKCl7XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NJbmZvLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mbyA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5wcmljZSA9IHRoaXMuZm9ybWF0ZU1vbmV5KHRoaXMuY2xhc3NJbmZvLnByaWNlKTtcclxuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCA9IHRoaXMuZm9ybWF0ZU1vbnRoKHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCk7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635b6X5YWN6LS56K+V5ZCs5YiX6KGoXHJcbiAgICBnZXRUcnlMaXN0KCl7XHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzVHJ5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcclxuICAgICAgICAgICAgICBkYXRhLmZvckVhY2godmFsID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB0aGlzLmZyZWVDbGFzc0xpc3QgPSBkYXRhO1xyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPlueroOiKguWIl+ihqFxyXG4gICAgZ2V0Q2hhcHRlckxpc3QoKXtcclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NDaGFwdGVyLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcclxuICAgICAgICAgICAgICBkYXRhLmZvckVhY2goICh2YWwsaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsLnNsaWRlID0gaSA9PT0gMCA/ICBmYWxzZSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uICYmIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYXB0ZXJMaXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluaYr+WQpuW3sue7j+i0reS5sOi/h+ivpeivvueoi1xyXG4gICAgZ2V0SXNQYXllZCgpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgIGlmKCByZXMuZGF0YS5tc2cgPT0gJ+aCqOW3sui0reS5sOatpOivvueoiycpe1xyXG4gICAgICAgICAgICB0aGlzLmlzUGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQYXllZCA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICB0aGlzLmdldENsYXNzSW5mbygpO1xyXG4gICAgICB0aGlzLmdldFRyeUxpc3QoKTtcclxuICAgICAgdGhpcy5nZXRDaGFwdGVyTGlzdCgpO1xyXG4gICAgICB0aGlzLmdldElzUGF5ZWQoKTtcclxuICAgIH1cclxuICB9XHJcbiJdfQ==