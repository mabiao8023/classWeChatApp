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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiaXNIYXNWaWRlbyIsImNsYXNzSW5mbyIsIm5hdlR5cGUiLCJpc1BheWVkIiwiY2xhc3NJZCIsImZyZWVDbGFzc0xpc3QiLCJjaGFwdGVyTGlzdCIsInZpZGVvIiwic3JjIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsImZvckVhY2giLCJ2YWwiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJpdGVtIiwibWVkaWFfdXJsIiwicGF5dGlwIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJnb3RvUGF5Iiwic2hvd0xvYWRpbmciLCJyZXF1ZXN0IiwiY2xhc3NQYXkiLCJtZXRob2QiLCJjbGFzc19pZCIsImhlYWRlciIsInRoZW4iLCJoaWRlTG9hZGluZyIsImdvdG9BaXJjbGUiLCJpZCIsImV2ZW50cyIsInJlcyIsInByaWNlIiwiZm9ybWF0ZU1vbmV5IiwiZXhwaXJlX21vbnRoIiwiZm9ybWF0ZU1vbnRoIiwiJGFwcGx5IiwiY29uc29sZSIsImxvZyIsImNsYXNzVHJ5IiwibGVuZ3RoIiwiY2xhc3NDaGFwdGVyIiwiaSIsInNsaWRlIiwibGVzc29uIiwidmFsMiIsIm1zZyIsIm9wdGlvbnMiLCJnZXRDbGFzc0luZm8iLCJnZXRUcnlMaXN0IiwiZ2V0Q2hhcHRlckxpc3QiLCJnZXRJc1BheWVkIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBSWJDLE0sR0FBUyxnQixRQUVUQyxJLEdB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RFgsU0FISTtBQU1UOEIsZ0JBQVE7QUFDTixvQkFBVTtBQURKO0FBTkMsT0FBYixFQVNLQyxJQVRMLENBU1csZUFBTztBQUNoQlcsZ0JBQVFDLEdBQVIsQ0FBWVAsR0FBWjtBQUNBLFlBQUlBLElBQUl6QyxJQUFKLENBQVN3RCxHQUFULElBQWdCLFNBQXBCLEVBQThCO0FBQzVCLGlCQUFLcEQsT0FBTCxHQUFlLElBQWY7QUFDRCxTQUZELE1BRUs7QUFDSCxpQkFBS0EsT0FBTCxHQUFlLEtBQWY7QUFDRDtBQUNGLE9BaEJEO0FBaUJIOzs7MkJBR01xRCxPLEVBQVM7QUFDZCxXQUFLcEQsT0FBTCxHQUFlb0QsUUFBUWxCLEVBQXZCO0FBQ0EsV0FBS21CLFlBQUw7QUFDQSxXQUFLQyxVQUFMO0FBQ0EsV0FBS0MsY0FBTDtBQUNBLFdBQUtDLFVBQUw7QUFDRDs7OztFQWhNZ0MsZUFBS0MsSTs7a0JBQW5CbkUsSyIsImZpbGUiOiJjbGFzc0RldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICd0ZXN0J1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW215TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBpc0hhc1ZpZGVvOmZhbHNlLFxyXG4gICAgICAgIGNsYXNzSW5mbzp7fSxcclxuICAgICAgICBuYXZUeXBlOjEsXHJcbiAgICAgICAgaXNQYXllZDp0cnVlLFxyXG4gICAgICAgIGNsYXNzSWQ6OCxcclxuICAgICAgICBmcmVlQ2xhc3NMaXN0OltdLFxyXG4gICAgICAgIGNoYXB0ZXJMaXN0OltdLFxyXG4gICAgICAgIHZpZGVvOntcclxuICAgICAgICAgIHNyYzonJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgbmF2dGFnKHR5cGUpe1xyXG4gICAgICAgIHRoaXMubmF2VHlwZSA9IHR5cGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIHBsYXlWaWRlbygpe1xyXG4gICAgICAgIHRoaXMuaXNIYXNWaWRlbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlQ2xhc3NMaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICB2YWwucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgICBpdGVtLnJlc291cmNlLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gaXRlbS5yZXNvdXJjZS5tZWRpYV91cmw7XHJcbiAgICAgIH0sXHJcbiAgICAgIHBheXRpcCgpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNQYXllZCl7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+WFiOi0reS5sOivvueoiycsXHJcbiAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTUwMFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBnb3RvUGF5KCl7XHJcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfmlK/ku5jkuK0uLi4nLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NQYXksXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAvLyB0b2RvOuiwg+W+ruS/oeaUr+S7mFxyXG4gICAgICAgICAgICAvLyBpZihyZXMuanNhcGlDb25maWcpe1xyXG4gICAgICAgICAgICAvLyBsZXQgd3hDb25maWcgPSByZXMuanNhcGlDb25maWc7XHJcbiAgICAgICAgICAgIC8vIGNvbW1vbkZuLnd4UGF5KHtcclxuICAgICAgICAgICAgLy8gICB3eFBheUNvbmY6d3hDb25maWcsXHJcbiAgICAgICAgICAgIC8vICAgc3VjY2Vzc0NiOnRoaXMud3hQYXlTdWMuYmluZCh0aGlzLHd4Q29uZmlnKSxcclxuICAgICAgICAgICAgLy8gICBmYWlsQ2I6dGhpcy5sYXllci5iaW5kKHRoaXMsJ+aUr+S7mOWksei0pe+8jOivt+mHjeivlScpLFxyXG4gICAgICAgICAgICAvLyAgIGNhbmNlbENiOnRoaXMubGF5ZXIuYmluZCh0aGlzLCfmlK/ku5jlpLHotKXvvIzor7fph43or5UnKSxcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdvdG9BaXJjbGUoaWQpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9haXJ0aWNsZT9pZD0ke2lkfWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflvpfor77nqIvnmoTkv6Hmga9cclxuICAgIGdldENsYXNzSW5mbygpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzSW5mbyxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8gPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8ucHJpY2UgPSB0aGlzLmZvcm1hdGVNb25leSh0aGlzLmNsYXNzSW5mby5wcmljZSk7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGggPSB0aGlzLmZvcm1hdGVNb250aCh0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGgpO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+W+l+WFjei0ueivleWQrOWIl+ihqFxyXG4gICAgZ2V0VHJ5TGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1RyeSxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgaWYoIGRhdGEubGVuZ3RoICl7XHJcbiAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgdGhpcy5mcmVlQ2xhc3NMaXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPlueroOiKguWIl+ihqFxyXG4gICAgZ2V0Q2hhcHRlckxpc3QoKXtcclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NDaGFwdGVyLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcclxuICAgICAgICAgICAgICBkYXRhLmZvckVhY2goICh2YWwsaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsLnNsaWRlID0gaSA9PT0gMCA/ICBmYWxzZSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uICYmIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYXB0ZXJMaXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluaYr+WQpuW3sue7j+i0reS5sOi/h+ivpeivvueoi1xyXG4gICAgZ2V0SXNQYXllZCgpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICBpZiggcmVzLmRhdGEubXNnID09ICfmgqjlt7LotK3kubDmraTor77nqIsnKXtcclxuICAgICAgICAgICAgdGhpcy5pc1BheWVkID0gdHJ1ZTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmlzUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5jbGFzc0lkID0gb3B0aW9ucy5pZDtcclxuICAgICAgdGhpcy5nZXRDbGFzc0luZm8oKTtcclxuICAgICAgdGhpcy5nZXRUcnlMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0Q2hhcHRlckxpc3QoKTtcclxuICAgICAgdGhpcy5nZXRJc1BheWVkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=