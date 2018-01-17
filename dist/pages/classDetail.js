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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiaXNIYXNWaWRlbyIsImNsYXNzSW5mbyIsIm5hdlR5cGUiLCJpc1BheWVkIiwiY2xhc3NJZCIsImZyZWVDbGFzc0xpc3QiLCJjaGFwdGVyTGlzdCIsInZpZGVvIiwic3JjIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsImZvckVhY2giLCJ2YWwiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJpdGVtIiwibWVkaWFfdXJsIiwicGF5dGlwIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImdvdG9QYXkiLCJzaG93TG9hZGluZyIsInJlcXVlc3QiLCJ1cmwiLCJjbGFzc1BheSIsIm1ldGhvZCIsImNsYXNzX2lkIiwiaGVhZGVyIiwidGhlbiIsImhpZGVMb2FkaW5nIiwiZ290b0FpcmNsZSIsImlkIiwibmF2aWdhdGVUbyIsImV2ZW50cyIsInJlcyIsInByaWNlIiwiZm9ybWF0ZU1vbmV5IiwiZXhwaXJlX21vbnRoIiwiZm9ybWF0ZU1vbnRoIiwiJGFwcGx5IiwiY29uc29sZSIsImxvZyIsImNsYXNzVHJ5IiwibGVuZ3RoIiwiY2xhc3NDaGFwdGVyIiwiaSIsInNsaWRlIiwibGVzc29uIiwidmFsMiIsIm1zZyIsImNhdGNoIiwiZSIsImdldENsYXNzSW5mbyIsImdldFRyeUxpc3QiLCJnZXRDaGFwdGVyTGlzdCIsImdldElzUGF5ZWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFJYkMsTSxHQUFTLGdCLFFBRVRDLEks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b0JBQVU7QUFESjtBQU5DLE9BQWIsRUFTS0MsSUFUTCxDQVNXLGVBQU87QUFDaEIsWUFBSU0sSUFBSXpDLElBQUosQ0FBU3dELEdBQVQsSUFBZ0IsU0FBcEIsRUFBOEI7QUFDNUIsaUJBQUtwRCxPQUFMLEdBQWUsSUFBZjtBQUNELFNBRkQsTUFFSztBQUNILGlCQUFLQSxPQUFMLEdBQWUsS0FBZjtBQUNEO0FBQ0YsT0FmRCxFQWVHcUQsS0FmSCxDQWVTLGFBQUs7QUFDWlYsZ0JBQVFDLEdBQVIsQ0FBWVUsQ0FBWjtBQUNELE9BakJEO0FBa0JIOzs7NkJBR1E7QUFDUCxXQUFLQyxZQUFMO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUtDLGNBQUw7QUFDQSxXQUFLQyxVQUFMO0FBQ0Q7Ozs7RUFqTWdDLGVBQUtDLEk7O2tCQUFuQnBFLEsiLCJmaWxlIjoiY2xhc3NEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBteU1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAndGVzdCdcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtteU1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaXNIYXNWaWRlbzpmYWxzZSxcclxuICAgICAgICBjbGFzc0luZm86e30sXHJcbiAgICAgICAgbmF2VHlwZToxLFxyXG4gICAgICAgIGlzUGF5ZWQ6ZmFsc2UsXHJcbiAgICAgICAgY2xhc3NJZDo4LFxyXG4gICAgICAgIGZyZWVDbGFzc0xpc3Q6W10sXHJcbiAgICAgICAgY2hhcHRlckxpc3Q6W10sXHJcbiAgICAgICAgdmlkZW86e1xyXG4gICAgICAgICAgc3JjOicnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBuYXZ0YWcodHlwZSl7XHJcbiAgICAgICAgdGhpcy5uYXZUeXBlID0gdHlwZTtcclxuICAgICAgfSxcclxuICAgICAgcGxheVZpZGVvKCl7XHJcbiAgICAgICAgdGhpcy5pc0hhc1ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVDbGFzc0xpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgICAgIHZhbC5yZXNvdXJjZS5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgIGl0ZW0ucmVzb3VyY2UucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52aWRlby5zcmMgPSBpdGVtLnJlc291cmNlLm1lZGlhX3VybDtcclxuICAgICAgfSxcclxuICAgICAgcGF5dGlwKCl7XHJcbiAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7flhYjotK3kubDor77nqIsnLFxyXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDE1MDBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgZ290b1BheSgpe1xyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5LitLi4uJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICAvLyB0b2RvOuiwg+W+ruS/oeaUr+S7mFxyXG4gICAgICAgICAgICAvLyBpZihyZXMuanNhcGlDb25maWcpe1xyXG4gICAgICAgICAgICAvLyBsZXQgd3hDb25maWcgPSByZXMuanNhcGlDb25maWc7XHJcbiAgICAgICAgICAgIC8vIGNvbW1vbkZuLnd4UGF5KHtcclxuICAgICAgICAgICAgLy8gICB3eFBheUNvbmY6d3hDb25maWcsXHJcbiAgICAgICAgICAgIC8vICAgc3VjY2Vzc0NiOnRoaXMud3hQYXlTdWMuYmluZCh0aGlzLHd4Q29uZmlnKSxcclxuICAgICAgICAgICAgLy8gICBmYWlsQ2I6dGhpcy5sYXllci5iaW5kKHRoaXMsJ+aUr+S7mOWksei0pe+8jOivt+mHjeivlScpLFxyXG4gICAgICAgICAgICAvLyAgIGNhbmNlbENiOnRoaXMubGF5ZXIuYmluZCh0aGlzLCfmlK/ku5jlpLHotKXvvIzor7fph43or5UnKSxcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgXHJcbiAgICAgIH0sXHJcbiAgICAgIGdvdG9BaXJjbGUoaWQpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9haXJ0aWNsZT9pZD0ke2lkfWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflvpfor77nqIvnmoTkv6Hmga9cclxuICAgIGdldENsYXNzSW5mbygpe1xyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn6I635Y+W5LitLi4uJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzSW5mbyxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLnByaWNlID0gdGhpcy5mb3JtYXRlTW9uZXkodGhpcy5jbGFzc0luZm8ucHJpY2UpO1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8uZXhwaXJlX21vbnRoID0gdGhpcy5mb3JtYXRlTW9udGgodGhpcy5jbGFzc0luZm8uZXhwaXJlX21vbnRoKTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635b6X5YWN6LS56K+V5ZCs5YiX6KGoXHJcbiAgICBnZXRUcnlMaXN0KCl7XHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzVHJ5LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcclxuICAgICAgICAgICAgICBkYXRhLmZvckVhY2godmFsID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB0aGlzLmZyZWVDbGFzc0xpc3QgPSBkYXRhO1xyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W56ug6IqC5YiX6KGoXHJcbiAgICBnZXRDaGFwdGVyTGlzdCgpe1xyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc0NoYXB0ZXIsXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgIGlmKCBkYXRhLmxlbmd0aCApe1xyXG4gICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCggKHZhbCxpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwuc2xpZGUgPSBpID09PSAwID8gIGZhbHNlIDogdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZhbC5sZXNzb24gJiYgdmFsLmxlc3Nvbi5mb3JFYWNoKCB2YWwyID0+IHtcclxuICAgICAgICAgICAgICAgICAgdmFsMi5yZXNvdXJjZS5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2hhcHRlckxpc3QgPSBkYXRhO1xyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W5piv5ZCm5bey57uP6LSt5Lmw6L+H6K+l6K++56iLXHJcbiAgICBnZXRJc1BheWVkKCl7XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NQYXksXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgaWYoIHJlcy5kYXRhLm1zZyA9PSAn5oKo5bey6LSt5Lmw5q2k6K++56iLJyl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQYXllZCA9IHRydWU7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5pc1BheWVkID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NJbmZvKCk7XHJcbiAgICAgIHRoaXMuZ2V0VHJ5TGlzdCgpO1xyXG4gICAgICB0aGlzLmdldENoYXB0ZXJMaXN0KCk7XHJcbiAgICAgIHRoaXMuZ2V0SXNQYXllZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuIl19