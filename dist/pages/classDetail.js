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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJDb250YWN0IiwibWl4aW5zIiwibXlNaXhpbiIsImRhdGEiLCJpc0hhc1ZpZGVvIiwiY2xhc3NJbmZvIiwibmF2VHlwZSIsImlzUGF5ZWQiLCJjbGFzc0lkIiwiZnJlZUNsYXNzTGlzdCIsImNoYXB0ZXJMaXN0IiwidmlkZW8iLCJzcmMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJuYXZ0YWciLCJ0eXBlIiwicGxheVZpZGVvIiwiZm9yRWFjaCIsInZhbCIsInJlc291cmNlIiwicGxheWluZyIsIml0ZW0iLCJtZWRpYV91cmwiLCJnb3RvQ2xhc3NJbmRleCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInBheXRpcCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwiZ290b1BheSIsInNob3dMb2FkaW5nIiwid2VweSIsInJlcXVlc3QiLCJhcGlQYXRoIiwiY2xhc3NQYXkiLCJtZXRob2QiLCJjbGFzc19pZCIsIk51bWJlciIsInBheXNvdXJjZSIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2Vzc2lvbklEIiwidGhlbiIsImpzQXBpQ29uZmlnIiwicmVzIiwiSlNPTiIsInBhcnNlIiwianNhcGlDb25maWciLCJlIiwiY29uc29sZSIsImVycm9yIiwiaGlkZUxvYWRpbmciLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsIm5vbmNlU3RyIiwicGFja2FnZSIsInBheVNpZ24iLCJnb3RvQWlyY2xlIiwiaWQiLCJldmVudHMiLCJwcmljZSIsImZvcm1hdGVNb25leSIsImV4cGlyZV9tb250aCIsImZvcm1hdGVNb250aCIsIiRhcHBseSIsImxvZyIsImNsYXNzVHJ5IiwibGVuZ3RoIiwiY2xhc3NDaGFwdGVyIiwiaSIsInNsaWRlIiwibGVzc29uIiwidmFsMiIsIm1zZyIsIm9wdGlvbnMiLCJnZXRDbGFz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QUFLQyxPQUFMLENBQWE7QUFDVFQsYUFBSVUsaUJBQVFDLFFBREg7QUFFVEMsZ0JBQU8sTUFGRTtBQUdUcEMsY0FBSztBQUNIcUMsb0JBQVNDLE9BQU8sS0FBS2pDLE9BQVosQ0FETjtBQUVIa0MscUJBQVU7QUFGUCxTQUhJO0FBT1RDLGdCQUFRO0FBQ04sbUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFQQyxPQUFiLEVBVUtDLElBVkwsQ0FVVyxlQUFPO0FBQ2hCTyxnQkFBUWdCLEdBQVIsQ0FBWXJCLEdBQVo7QUFDQSxZQUFJQSxJQUFJOUMsSUFBSixDQUFTMkUsR0FBVCxJQUFnQixTQUFwQixFQUE4QjtBQUM1QixpQkFBS3ZFLE9BQUwsR0FBZSxJQUFmO0FBQ0QsU0FGRCxNQUVLO0FBQ0gsaUJBQUtBLE9BQUwsR0FBZSxLQUFmO0FBQ0Q7QUFDRixPQWpCRDtBQWtCSDs7OzJCQUdNd0UsTyxFQUFTO0FBQ2QsV0FBS3ZFLE9BQUwsR0FBZXVFLFFBQVFoQixFQUF2QjtBQUNBLFdBQUtpQixZQUFMO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUtDLGNBQUw7QUFDQSxXQUFLQyxVQUFMO0FBQ0Q7Ozs7RUExTmdDaEQsZUFBS2lELEk7O2tCQUFuQnhGLEsiLCJmaWxlIjoiY2xhc3NEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAvL25hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICd0ZXN0J1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgY29udGFjdDpDb250YWN0XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW215TWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgICBpc0hhc1ZpZGVvOmZhbHNlLFxuICAgICAgICBjbGFzc0luZm86e30sXG4gICAgICAgIG5hdlR5cGU6MSxcbiAgICAgICAgaXNQYXllZDpmYWxzZSxcbiAgICAgICAgY2xhc3NJZDo4LFxuICAgICAgICBmcmVlQ2xhc3NMaXN0OltdLFxuICAgICAgICBjaGFwdGVyTGlzdDpbXSxcbiAgICAgICAgdmlkZW86e1xuICAgICAgICAgIHNyYzonJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmF2dGFnKHR5cGUpe1xuICAgICAgICB0aGlzLm5hdlR5cGUgPSB0eXBlO1xuICAgICAgfSxcbiAgICAgIHBsYXlWaWRlbygpe1xuICAgICAgICB0aGlzLmlzSGFzVmlkZW8gPSB0cnVlO1xuICAgICAgICB0aGlzLmZyZWVDbGFzc0xpc3QuZm9yRWFjaCggdmFsID0+IHtcbiAgICAgICAgICB2YWwucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xuICAgICAgICB9ICk7XG4gICAgICAgIGl0ZW0ucmVzb3VyY2UucGxheWluZyA9IHRydWU7XG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gaXRlbS5yZXNvdXJjZS5tZWRpYV91cmw7XG4gICAgICB9LFxuICAgICAgZ290b0NsYXNzSW5kZXgoKXtcbiAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXG4gICAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBwYXl0aXAoKXtcbiAgICAgICAgaWYodGhpcy5pc1BheWVkKXtcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHt0aGlzLmNsYXNzSWR9YFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+ivt+WFiOi0reS5sOivvueoiycsXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICAgIH0pXG4gICAgICB9LFxuXG4gICAgICBnb3RvUGF5KCl7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+aUr+S7mOS4rS4uLicsXG4gICAgICAgIH0pXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BheSxcbiAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICBjbGFzc19pZDpOdW1iZXIodGhpcy5jbGFzc0lkKSxcbiAgICAgICAgICAgICAgcGF5c291cmNlOjFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgICAgICBsZXQganNBcGlDb25maWcgPSB7fTtcbiAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTsgXG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgIGpzQXBpQ29uZmlnID0gSlNPTi5wYXJzZShkYXRhLmpzYXBpQ29uZmlnKTtcbiAgICAgICAgICAgIH1jYXRjaCAoZSl7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAndGltZVN0YW1wJzoganNBcGlDb25maWcudGltZVN0YW1wLFxuICAgICAgICAgICAgICAgJ25vbmNlU3RyJzoganNBcGlDb25maWcubm9uY2VTdHIsXG4gICAgICAgICAgICAgICAncGFja2FnZSc6IGpzQXBpQ29uZmlnLnBhY2thZ2UsXG4gICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICdwYXlTaWduJzoganNBcGlDb25maWcucGF5U2lnbixcbiAgICAgICAgICAgICAgICdzdWNjZXNzJzpmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgICAgLy8g5pSv5LuY5oiQ5YqfXG4gICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICdmYWlsJzpmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgICAgLy8g5pSv5LuY5aSx6LSlXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ICk7XG4gICAgICAgXG4gICAgICB9LFxuICAgICAgZ290b0FpcmNsZShpZCl7XG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvYWlydGljbGU/aWQ9JHtpZH1gXG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgXG4gICAgfVxuXG4gICAgLy8g6I635b6X6K++56iL55qE5L+h5oGvXG4gICAgZ2V0Q2xhc3NJbmZvKCl7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+iOt+WPluS4rS4uLicsXG4gICAgICAgIH0pXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc0luZm8sXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgfSApLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5wcmljZSA9IHRoaXMuZm9ybWF0ZU1vbmV5KHRoaXMuY2xhc3NJbmZvLnByaWNlKTtcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGggPSB0aGlzLmZvcm1hdGVNb250aCh0aGlzLmNsYXNzSW5mby5leHBpcmVfbW9udGgpO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIOiOt+W+l+WFjei0ueivleWQrOWIl+ihqFxuICAgIGdldFRyeUxpc3QoKXtcbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1RyeSxcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICB9XG4gICAgICAgICB9ICkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICBpZiggZGF0YS5sZW5ndGggKXtcbiAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKHZhbCA9PiB7XG4gICAgICAgICAgICAgICAgdmFsLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgdGhpcy5mcmVlQ2xhc3NMaXN0ID0gZGF0YTtcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIOiOt+WPlueroOiKguWIl+ihqFxuICAgIGdldENoYXB0ZXJMaXN0KCl7XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NDaGFwdGVyLFxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgIGlmKCBkYXRhLmxlbmd0aCApe1xuICAgICAgICAgICAgICBkYXRhLmZvckVhY2goICh2YWwsaSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhbC5zbGlkZSA9IGkgPT09IDAgPyAgZmFsc2UgOiB0cnVlO1xuICAgICAgICAgICAgICAgIHZhbC5sZXNzb24gJiYgdmFsLmxlc3Nvbi5mb3JFYWNoKCB2YWwyID0+IHtcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLmNoYXB0ZXJMaXN0ID0gZGF0YTtcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgIH0gXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8g6I635Y+W5piv5ZCm5bey57uP6LSt5Lmw6L+H6K+l6K++56iLXG4gICAgZ2V0SXNQYXllZCgpe1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NQYXksXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6TnVtYmVyKHRoaXMuY2xhc3NJZCksXG4gICAgICAgICAgICAgIHBheXNvdXJjZToxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgaWYoIHJlcy5kYXRhLm1zZyA9PSAn5oKo5bey6LSt5Lmw5q2k6K++56iLJyl7XG4gICAgICAgICAgICB0aGlzLmlzUGF5ZWQgPSB0cnVlO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5pc1BheWVkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICB0aGlzLmNsYXNzSWQgPSBvcHRpb25zLmlkO1xuICAgICAgdGhpcy5nZXRDbGFzc0luZm8oKTtcbiAgICAgIHRoaXMuZ2V0VHJ5TGlzdCgpO1xuICAgICAgdGhpcy5nZXRDaGFwdGVyTGlzdCgpO1xuICAgICAgdGhpcy5nZXRJc1BheWVkKCk7XG4gICAgfVxuICB9XG4iXX0=