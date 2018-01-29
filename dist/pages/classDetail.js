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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJtaXhpbnMiLCJkYXRhIiwiaXNIYXNWaWRlbyIsImNsYXNzSW5mbyIsIm5hdlR5cGUiLCJpc1BheWVkIiwiY2xhc3NJZCIsImZyZWVDbGFzc0xpc3QiLCJjaGFwdGVyTGlzdCIsInZpZGVvIiwic3JjIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsImZvckVhY2giLCJ2YWwiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJpdGVtIiwibWVkaWFfdXJsIiwicGF5dGlwIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJnb3RvUGF5Iiwic2hvd0xvYWRpbmciLCJyZXF1ZXN0IiwiY2xhc3NQYXkiLCJtZXRob2QiLCJjbGFzc19pZCIsIk51bWJlciIsInBheXNvdXJjZSIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2Vzc2lvbklEIiwidGhlbiIsImhpZGVMb2FkaW5nIiwiZ290b0FpcmNsZSIsImlkIiwiZXZlbnRzIiwicmVzIiwicHJpY2UiLCJmb3JtYXRlTW9uZXkiLCJleHBpcmVfbW9udGgiLCJmb3JtYXRlTW9udGgiLCIkYXBwbHkiLCJjb25zb2xlIiwibG9nIiwiY2xhc3NUcnkiLCJsZW5ndGgiLCJjbGFzc0NoYXB0ZXIiLCJpIiwic2xpZGUiLCJsZXNzb24iLCJ2YWwyIiwibXNnIiwib3B0aW9ucyIsImdldENsYXNzSW5mbyIsImdldFRyeUxpc3QiLCJnZXRDaGFwdGVyTGlzdCIsImdldElzUGF5ZWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFGMkM7OztJQUd0QkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUDtB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LGdCQUFRO0FBQ3hDNkMsbUJBQUszQyxRQUFMLENBQWNDLE9BQWQsR0FBd0IsS0FBeEI7QUFDRCxhQUZhLENBQWQ7QUFHRCxXQUxEO0FBTUEsaUJBQUtYLFdBQUwsR0FBbUJQLElBQW5CO0FBQ0EsaUJBQUttRCxNQUFMO0FBQ0gsU0FURCxNQVNLLENBRUo7QUFDRixPQXZCSDtBQXdCRDs7QUFFRDs7OztpQ0FDWTtBQUFBOztBQUNSLHFCQUFLcEIsT0FBTCxDQUFhO0FBQ1RQLGFBQUksaUJBQVFRLFFBREg7QUFFVEMsZ0JBQU8sTUFGRTtBQUdUakMsY0FBSztBQUNIa0Msb0JBQVNDLE9BQU8sS0FBSzlCLE9BQVosQ0FETjtBQUVIK0IscUJBQVU7QUFGUCxTQUhJO0FBT1RDLGdCQUFRO0FBQ04sbUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFQQyxPQUFiLEVBVUtDLElBVkwsQ0FVVyxlQUFPO0FBQ2hCVyxnQkFBUUMsR0FBUixDQUFZUCxHQUFaO0FBQ0EsWUFBSUEsSUFBSTlDLElBQUosQ0FBUzZELEdBQVQsSUFBZ0IsU0FBcEIsRUFBOEI7QUFDNUIsaUJBQUt6RCxPQUFMLEdBQWUsSUFBZjtBQUNELFNBRkQsTUFFSztBQUNILGlCQUFLQSxPQUFMLEdBQWUsS0FBZjtBQUNEO0FBQ0YsT0FqQkQ7QUFrQkg7OzsyQkFHTTBELE8sRUFBUztBQUNkLFdBQUt6RCxPQUFMLEdBQWV5RCxRQUFRbEIsRUFBdkI7QUFDQSxXQUFLbUIsWUFBTDtBQUNBLFdBQUtDLFVBQUw7QUFDQSxXQUFLQyxjQUFMO0FBQ0EsV0FBS0MsVUFBTDtBQUNEOzs7O0VBek1nQyxlQUFLQyxJOztrQkFBbkJ4RSxLIiwiZmlsZSI6ImNsYXNzRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAvL25hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICd0ZXN0J1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgY29udGFjdDpDb250YWN0XHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW215TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBpc0hhc1ZpZGVvOmZhbHNlLFxyXG4gICAgICAgIGNsYXNzSW5mbzp7fSxcclxuICAgICAgICBuYXZUeXBlOjEsXHJcbiAgICAgICAgaXNQYXllZDpmYWxzZSxcclxuICAgICAgICBjbGFzc0lkOjgsXHJcbiAgICAgICAgZnJlZUNsYXNzTGlzdDpbXSxcclxuICAgICAgICBjaGFwdGVyTGlzdDpbXSxcclxuICAgICAgICB2aWRlbzp7XHJcbiAgICAgICAgICBzcmM6JydcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIG5hdnRhZyh0eXBlKXtcclxuICAgICAgICB0aGlzLm5hdlR5cGUgPSB0eXBlO1xyXG4gICAgICB9LFxyXG4gICAgICBwbGF5VmlkZW8oKXtcclxuICAgICAgICB0aGlzLmlzSGFzVmlkZW8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUNsYXNzTGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICAgICAgdmFsLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgaXRlbS5yZXNvdXJjZS5wbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IGl0ZW0ucmVzb3VyY2UubWVkaWFfdXJsO1xyXG4gICAgICB9LFxyXG4gICAgICBwYXl0aXAoKXtcclxuICAgICAgICBpZih0aGlzLmlzUGF5ZWQpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHt0aGlzLmNsYXNzSWR9YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7flhYjotK3kubDor77nqIsnLFxyXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDE1MDBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgZ290b1BheSgpe1xyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5LitLi4uJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOk51bWJlcih0aGlzLmNsYXNzSWQpLFxyXG4gICAgICAgICAgICAgIHBheXNvdXJjZToxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICAvLyB0b2RvOuiwg+W+ruS/oeaUr+S7mFxyXG4gICAgICAgICAgICAvLyBpZihyZXMuanNhcGlDb25maWcpe1xyXG4gICAgICAgICAgICAvLyBsZXQgd3hDb25maWcgPSByZXMuanNhcGlDb25maWc7XHJcbiAgICAgICAgICAgIC8vIGNvbW1vbkZuLnd4UGF5KHtcclxuICAgICAgICAgICAgLy8gICB3eFBheUNvbmY6d3hDb25maWcsXHJcbiAgICAgICAgICAgIC8vICAgc3VjY2Vzc0NiOnRoaXMud3hQYXlTdWMuYmluZCh0aGlzLHd4Q29uZmlnKSxcclxuICAgICAgICAgICAgLy8gICBmYWlsQ2I6dGhpcy5sYXllci5iaW5kKHRoaXMsJ+aUr+S7mOWksei0pe+8jOivt+mHjeivlScpLFxyXG4gICAgICAgICAgICAvLyAgIGNhbmNlbENiOnRoaXMubGF5ZXIuYmluZCh0aGlzLCfmlK/ku5jlpLHotKXvvIzor7fph43or5UnKSxcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgXHJcbiAgICAgIH0sXHJcbiAgICAgIGdvdG9BaXJjbGUoaWQpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9haXJ0aWNsZT9pZD0ke2lkfWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflvpfor77nqIvnmoTkv6Hmga9cclxuICAgIGdldENsYXNzSW5mbygpe1xyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn6I635Y+W5LitLi4uJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzSW5mbyxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mbyA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5wcmljZSA9IHRoaXMuZm9ybWF0ZU1vbmV5KHRoaXMuY2xhc3NJbmZvLnByaWNlKTtcclxuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCA9IHRoaXMuZm9ybWF0ZU1vbnRoKHRoaXMuY2xhc3NJbmZvLmV4cGlyZV9tb250aCk7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+W+l+WFjei0ueivleWQrOWIl+ihqFxyXG4gICAgZ2V0VHJ5TGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1RyeSxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgIGlmKCBkYXRhLmxlbmd0aCApe1xyXG4gICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCh2YWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHRoaXMuZnJlZUNsYXNzTGlzdCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bnq6DoioLliJfooahcclxuICAgIGdldENoYXB0ZXJMaXN0KCl7XHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzQ2hhcHRlcixcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgIGlmKCBkYXRhLmxlbmd0aCApe1xyXG4gICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCggKHZhbCxpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwuc2xpZGUgPSBpID09PSAwID8gIGZhbHNlIDogdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZhbC5sZXNzb24gJiYgdmFsLmxlc3Nvbi5mb3JFYWNoKCB2YWwyID0+IHtcclxuICAgICAgICAgICAgICAgICAgdmFsMi5yZXNvdXJjZS5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2hhcHRlckxpc3QgPSBkYXRhO1xyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W5piv5ZCm5bey57uP6LSt5Lmw6L+H6K+l6K++56iLXHJcbiAgICBnZXRJc1BheWVkKCl7XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NQYXksXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6TnVtYmVyKHRoaXMuY2xhc3NJZCksXHJcbiAgICAgICAgICAgICAgcGF5c291cmNlOjFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgIGlmKCByZXMuZGF0YS5tc2cgPT0gJ+aCqOW3sui0reS5sOatpOivvueoiycpe1xyXG4gICAgICAgICAgICB0aGlzLmlzUGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQYXllZCA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICB0aGlzLmNsYXNzSWQgPSBvcHRpb25zLmlkO1xyXG4gICAgICB0aGlzLmdldENsYXNzSW5mbygpO1xyXG4gICAgICB0aGlzLmdldFRyeUxpc3QoKTtcclxuICAgICAgdGhpcy5nZXRDaGFwdGVyTGlzdCgpO1xyXG4gICAgICB0aGlzLmdldElzUGF5ZWQoKTtcclxuICAgIH1cclxuICB9XHJcbiJdfQ==