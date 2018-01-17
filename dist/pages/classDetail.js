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
            'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
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
          'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiaXNIYXNWaWRlbyIsImNsYXNzSW5mbyIsIm5hdlR5cGUiLCJpc1BheWVkIiwiY2xhc3NJZCIsImZyZWVDbGFzc0xpc3QiLCJjaGFwdGVyTGlzdCIsInZpZGVvIiwic3JjIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsImZvckVhY2giLCJ2YWwiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJpdGVtIiwibWVkaWFfdXJsIiwicGF5dGlwIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJnb3RvUGF5Iiwic2hvd0xvYWRpbmciLCJyZXF1ZXN0IiwiY2xhc3NQYXkiLCJtZXRob2QiLCJjbGFzc19pZCIsImhlYWRlciIsInRoZW4iLCJoaWRlTG9hZGluZyIsImdvdG9BaXJjbGUiLCJpZCIsImV2ZW50cyIsInJlcyIsInByaWNlIiwiZm9ybWF0ZU1vbmV5IiwiZXhwaXJlX21vbnRoIiwiZm9ybWF0ZU1vbnRoIiwiJGFwcGx5IiwiY29uc29sZSIsImxvZyIsImNsYXNzVHJ5IiwibGVuZ3RoIiwiY2xhc3NDaGFwdGVyIiwiaSIsInNsaWRlIiwibGVzc29uIiwidmFsMiIsIm1zZyIsIm9wdGlvbnMiLCJnZXRDbGFzc0luZm8iLCJnZXRUcnlMaXN0IiwiZ2V0Q2hhcHRlckxpc3QiLCJnZXRJc1BheWVkIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBSWJDLE0sR0FBUyxnQixRQUVUQyxJLEdB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QkFBUVEsUUFESDtBQUVUQyxnQkFBTyxNQUZFO0FBR1RqQyxjQUFLO0FBQ0hrQyxvQkFBUyxLQUFLN0I7QUFEWCxTQUhJO0FBTVQ4QixnQkFBUTtBQUNOLG9CQUFVO0FBREo7QUFOQyxPQUFiLEVBU0tDLElBVEwsQ0FTVyxlQUFPO0FBQ2hCVyxnQkFBUUMsR0FBUixDQUFZUCxHQUFaO0FBQ0EsWUFBSUEsSUFBSXpDLElBQUosQ0FBU3dELEdBQVQsSUFBZ0IsU0FBcEIsRUFBOEI7QUFDNUIsaUJBQUtwRCxPQUFMLEdBQWUsSUFBZjtBQUNELFNBRkQsTUFFSztBQUNILGlCQUFLQSxPQUFMLEdBQWUsS0FBZjtBQUNEO0FBQ0YsT0FoQkQ7QUFpQkg7OzsyQkFHTXFELE8sRUFBUztBQUNkLFdBQUtwRCxPQUFMLEdBQWVvRCxRQUFRbEIsRUFBdkI7QUFDQSxXQUFLbUIsWUFBTDtBQUNBLFdBQUtDLFVBQUw7QUFDQSxXQUFLQyxjQUFMO0FBQ0EsV0FBS0MsVUFBTDtBQUNEOzs7O0VBdk1nQyxlQUFLQyxJOztrQkFBbkJuRSxLIiwiZmlsZSI6ImNsYXNzRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ3Rlc3QnXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbbXlNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGlzSGFzVmlkZW86ZmFsc2UsXHJcbiAgICAgICAgY2xhc3NJbmZvOnt9LFxyXG4gICAgICAgIG5hdlR5cGU6MSxcclxuICAgICAgICBpc1BheWVkOnRydWUsXHJcbiAgICAgICAgY2xhc3NJZDo4LFxyXG4gICAgICAgIGZyZWVDbGFzc0xpc3Q6W10sXHJcbiAgICAgICAgY2hhcHRlckxpc3Q6W10sXHJcbiAgICAgICAgdmlkZW86e1xyXG4gICAgICAgICAgc3JjOicnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBuYXZ0YWcodHlwZSl7XHJcbiAgICAgICAgdGhpcy5uYXZUeXBlID0gdHlwZTtcclxuICAgICAgfSxcclxuICAgICAgcGxheVZpZGVvKCl7XHJcbiAgICAgICAgdGhpcy5pc0hhc1ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVDbGFzc0xpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgIHZhbC5yZXNvdXJjZS5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgIGl0ZW0ucmVzb3VyY2UucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52aWRlby5zcmMgPSBpdGVtLnJlc291cmNlLm1lZGlhX3VybDtcclxuICAgICAgfSxcclxuICAgICAgcGF5dGlwKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc1BheWVkKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzP2lkPSR7dGhpcy5jbGFzc0lkfWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6K+35YWI6LSt5Lmw6K++56iLJyxcclxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGdvdG9QYXkoKXtcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+aUr+S7mOS4rS4uLicsXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BheSxcclxuICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgLy8gdG9kbzrosIPlvq7kv6HmlK/ku5hcclxuICAgICAgICAgICAgLy8gaWYocmVzLmpzYXBpQ29uZmlnKXtcclxuICAgICAgICAgICAgLy8gbGV0IHd4Q29uZmlnID0gcmVzLmpzYXBpQ29uZmlnO1xyXG4gICAgICAgICAgICAvLyBjb21tb25Gbi53eFBheSh7XHJcbiAgICAgICAgICAgIC8vICAgd3hQYXlDb25mOnd4Q29uZmlnLFxyXG4gICAgICAgICAgICAvLyAgIHN1Y2Nlc3NDYjp0aGlzLnd4UGF5U3VjLmJpbmQodGhpcyx3eENvbmZpZyksXHJcbiAgICAgICAgICAgIC8vICAgZmFpbENiOnRoaXMubGF5ZXIuYmluZCh0aGlzLCfmlK/ku5jlpLHotKXvvIzor7fph43or5UnKSxcclxuICAgICAgICAgICAgLy8gICBjYW5jZWxDYjp0aGlzLmxheWVyLmJpbmQodGhpcywn5pSv5LuY5aSx6LSl77yM6K+36YeN6K+VJyksXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgIFxyXG4gICAgICB9LFxyXG4gICAgICBnb3RvQWlyY2xlKGlkKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvYWlydGljbGU/aWQ9JHtpZH1gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635b6X6K++56iL55qE5L+h5oGvXHJcbiAgICBnZXRDbGFzc0luZm8oKXtcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+iOt+WPluS4rS4uLicsXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc0luZm8sXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mbyA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5wcmljZSA9IHRoaXMuZm9ybWF0ZU1vbmV5KHRoaXMuY2xhc3NJbmZvLnByaWNlKTtcclxuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCA9IHRoaXMuZm9ybWF0ZU1vbnRoKHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCk7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+W+l+WFjei0ueivleWQrOWIl+ihqFxyXG4gICAgZ2V0VHJ5TGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1RyeSxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgaWYoIGRhdGEubGVuZ3RoICl7XHJcbiAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgdGhpcy5mcmVlQ2xhc3NMaXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPlueroOiKguWIl+ihqFxyXG4gICAgZ2V0Q2hhcHRlckxpc3QoKXtcclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NDaGFwdGVyLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcclxuICAgICAgICAgICAgICBkYXRhLmZvckVhY2goICh2YWwsaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsLnNsaWRlID0gaSA9PT0gMCA/ICBmYWxzZSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uICYmIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYXB0ZXJMaXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluaYr+WQpuW3sue7j+i0reS5sOi/h+ivpeivvueoi1xyXG4gICAgZ2V0SXNQYXllZCgpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICBpZiggcmVzLmRhdGEubXNnID09ICfmgqjlt7LotK3kubDmraTor77nqIsnKXtcclxuICAgICAgICAgICAgdGhpcy5pc1BheWVkID0gdHJ1ZTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmlzUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5jbGFzc0lkID0gb3B0aW9ucy5pZDtcclxuICAgICAgdGhpcy5nZXRDbGFzc0luZm8oKTtcclxuICAgICAgdGhpcy5nZXRUcnlMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0Q2hhcHRlckxpc3QoKTtcclxuICAgICAgdGhpcy5nZXRJc1BheWVkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=