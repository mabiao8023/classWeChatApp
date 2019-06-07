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
      isFree: false,
      isPhone: wx.getStorageSync('phone') ? true : false
    }, _this.computed = {}, _this.methods = {
      getPhone: function getPhone(e) {
        var _this2 = this;

        var that = this;
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
          var phone = res.data.data.phoneNumber;
          wx.setStorageSync('phone', res.data.data.phoneNumber);
          _wepy2.default.request({
            url: _config2.default.classPay,
            method: "POST",
            data: {
              class_id: Number(_this2.classId),
              paysource: 1,
              phone: phone
            },
            header: {
              'cookie': 'PHPSESSID=' + _this2.$parent.globalData.sessionID
            }
          }).then(function (res) {
            wx.navigateTo({
              url: '/pages/class?id=' + _this2.classId
            });
            wx.hideLoading();
          });
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
      gotoPay: function gotoPay(phone) {
        var _this3 = this;

        wx.showLoading({
          title: '解锁中'
        });
        _wepy2.default.request({
          url: _config2.default.classPay,
          method: "POST",
          data: {
            class_id: Number(this.classId),
            paysource: 1,
            phone: wx.getStorageSync('phone')
          },
          header: {
            'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
          }
        }).then(function (res) {
          wx.navigateTo({
            url: '/pages/class?id=' + _this3.classId
          });
          // let jsApiConfig = {};
          // let data = res.data.data; 
          // /* 免费的直接跳转不用支付 */
          // if( this.isFree ){
          //   wx.navigateTo({
          //     url: `/pages/class?id=${this.classId}`
          //   });
          //   return;
          // }

          // try{
          //   jsApiConfig = JSON.parse(data.jsapiConfig);
          // }catch (e){
          //   console.error(e)
          // }

          wx.hideLoading();
          // wx.requestPayment({
          //    'timeStamp': jsApiConfig.timeStamp,
          //    'nonceStr': jsApiConfig.nonceStr,
          //    'package': jsApiConfig.package,
          //    'signType': 'MD5',
          //    'paySign': jsApiConfig.paySign,
          //    'success':function(res){
          //       // 支付成功
          //       wx.navigateTo({
          //          url: `/pages/class?id=${this.classId}`
          //       })
          //    },
          //    'fail':function(res){
          //       // 支付失败
          //    }
          // })
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
      var _this4 = this;

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
        _this4.classInfo = res.data.data;
        if (+_this4.classInfo.price <= 0) {
          _this4.isFree = true;
        } else {
          _this4.isFree = false;
        }
        _this4.classInfo.price = _this4.formateMoney(_this4.classInfo.price);
        _this4.classInfo.expire_month = _this4.formateMonth(_this4.classInfo.expire_month);
        _this4.$apply();
        console.log(res.data);
      });
    }

    // 获得免费试听列表

  }, {
    key: 'getTryList',
    value: function getTryList() {
      var _this5 = this;

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
            val.resource.media_time = val.resource.media_time && _this5.secondsFormate(val.resource.media_time);
          });
          _this5.freeClassList = data;
          _this5.$apply();
        } else {}
      });
    }

    // 获取章节列表

  }, {
    key: 'getChapterList',
    value: function getChapterList() {
      var _this6 = this;

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
              val2.resource.media_time = val2.resource.media_time && _this6.secondsFormate(val2.resource.media_time);
            });
          });
          _this6.chapterList = data;
          _this6.$apply();
        } else {}
      });
    }

    // getIsPayed

  }, {
    key: 'getIsPayed',
    value: function getIsPayed() {
      var _this7 = this;

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
          _this7.isPayed = true;
        } else {
          _this7.isPayed = false;
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
      // this.getIsPayed();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImNvbnRhY3QiLCJDb250YWN0IiwibWl4aW5zIiwibXlNaXhpbiIsImRhdGEiLCJpc0hhc1ZpZGVvIiwiY2xhc3NJbmZvIiwibmF2VHlwZSIsImlzUGF5ZWQiLCJjbGFzc0lkIiwiZnJlZUNsYXNzTGlzdCIsImNoYXB0ZXJMaXN0IiwidmlkZW8iLCJzcmMiLCJpc0ZyZWUiLCJpc1Bob25lIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdldFBob25lIiwiZSIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJhcGlQYXRoIiwiZGVjcnlwdERhdGEiLCJtZXRob2QiLCJlbmNyeXB0ZWREYXRhIiwiZGV0YWlsIiwiaXYiLCJoZWFkZXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNlc3Npb25JRCIsInRoZW4iLCJwaG9uZSIsInJlcyIsInBob25lTnVtYmVyIiwic2V0U3RvcmFnZVN5bmMiLCJjbGFzc1BheSIsImNsYXNzX2lkIiwiTnVtYmVyIiwicGF5c291cmNlIiwibmF2aWdhdGVUbyIsImhpZGVMb2FkaW5nIiwibmF2dGFnIiwidHlwZSIsInBsYXlWaWRlbyIsIml0ZW0iLCJpbmRleCIsImZvckVhY2giLCJ2YWwiLCJpZHgiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJtZWRpYV91cmwiLCJnb3RvQ2xhc3NJbmRleCIsInBheXRpcCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwiZ290b1BheSIsInNob3dMb2FkaW5nIiwiZ290b0FpcmNsZSIsImlkIiwiZXZlbnRzIiwicHJpY2UiLCJmb3JtYXRlTW9uZXkiLCJleHBpcmVfbW9udGgiLCJmb3JtYXRlTW9udGgiLCIkYXBwbHkiLCJjbGFzc1RyeSIsImxlbmd0aCIsIm1lZGlhX3RpbWUiLCJzZWNvbmRzRm9ybWF0ZSIsImNsYXNzQ2hhcHRlciIsImkiLCJzbGlkZSIsImxlc3NvbiIsInZhbDIiLCJtc2ciLCJvcHRpb25zIiwiZ2V0Q2xhc3NJbmZvIiwiZ2V0VHJ5TGlzdCIsImdldENoYXB0ZXJMaXN0IiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFGMkM7OztJQUd0QkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUDtBQURPLEssUUFHVEMsVSxHQUFhO0FBQ1hDLGVBQVFDO0FBREcsSyxRQUliQyxNLEdBQVMsQ0FBQ0MsY0FBRCxDLFFBRVRDLEksR0FBTztBQUNIQyxrQkFBVyxLQURSO0FBRUhDLGlCQUFVLEVBRlA7QUFHSEMsZUFBUSxDQUhMO0FBSUhDLGVBQVEsS0FKTDtBQUtIQyxlQUFRLENBTEw7QUFNSEMscUJBQWMsRUFOWDtBQU9IQyxtQkFBWSxFQVBUO0FBUUhDLGFBQU07QUFDSkMsYUFBSTtBQURBLE9BUkg7QUFXSEMsY0FBUSxLQVhMO0FBWUhDLGVBQVNDLEdBQUdDLGNBQUgsQ0FBa0IsT0FBbEIsSUFBNkIsSUFBN0IsR0FBb0M7QUFaMUMsSyxRQWVQQyxRLEdBQVcsRSxRQUlYQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDQ0MsQ0FERCxFQUNJO0FBQUE7O0FBQ1YsWUFBSUMsT0FBTyxJQUFYO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVlILENBQVo7QUFDQUksdUJBQUtDLE9BQUwsQ0FBYTtBQUNUQyxlQUFJQyxpQkFBUUMsV0FESDtBQUVUQyxrQkFBTyxNQUZFO0FBR1QxQixnQkFBSztBQUNIMkIsMkJBQWVWLEVBQUVXLE1BQUYsQ0FBU0QsYUFEckI7QUFFSEUsZ0JBQUlaLEVBQUVXLE1BQUYsQ0FBU0M7QUFGVixXQUhJO0FBT1RDLGtCQUFRO0FBQ04scUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFQQyxTQUFiLEVB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TDtBQUNBO0FBQ0Q7Ozt3Q0FFbUI7QUFDZCxhQUFPO0FBQ1AxQixlQUFPLFFBREE7QUFFUDJCLGNBQU0sY0FGQztBQUdQQyxrQkFBUyx1QkFIRjtBQUlQQyxpQkFBUSxpQkFBU3BELEdBQVQsRUFBYztBQUNwQjtBQUNELFNBTk07QUFPUHFELGNBQU0sY0FBU3JELEdBQVQsRUFBYztBQUNsQjtBQUNEO0FBVE0sT0FBUDtBQVdEOzs7O0VBcFM0QmYsZUFBS3FFLEk7O2tCQUFuQmpHLEsiLCJmaWxlIjoiY2xhc3NEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcbiAgaW1wb3J0IG15TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAvL25hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICd0ZXN0J1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgY29udGFjdDpDb250YWN0XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW215TWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgICBpc0hhc1ZpZGVvOmZhbHNlLFxuICAgICAgICBjbGFzc0luZm86e30sXG4gICAgICAgIG5hdlR5cGU6MSxcbiAgICAgICAgaXNQYXllZDpmYWxzZSxcbiAgICAgICAgY2xhc3NJZDo4LFxuICAgICAgICBmcmVlQ2xhc3NMaXN0OltdLFxuICAgICAgICBjaGFwdGVyTGlzdDpbXSxcbiAgICAgICAgdmlkZW86e1xuICAgICAgICAgIHNyYzonJ1xuICAgICAgICB9LFxuICAgICAgICBpc0ZyZWU6IGZhbHNlLFxuICAgICAgICBpc1Bob25lOiB3eC5nZXRTdG9yYWdlU3luYygncGhvbmUnKSA/IHRydWUgOiBmYWxzZVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdldFBob25lKGUpIHtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmRlY3J5cHREYXRhLFxuICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICB9XG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcbiAgICAgICAgICAgIGxldCBwaG9uZSA9IHJlcy5kYXRhLmRhdGEucGhvbmVOdW1iZXI7XG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygncGhvbmUnLCByZXMuZGF0YS5kYXRhLnBob25lTnVtYmVyKTtcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxuICAgICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgIGNsYXNzX2lkOk51bWJlcih0aGlzLmNsYXNzSWQpLFxuICAgICAgICAgICAgICAgIHBheXNvdXJjZToxLFxuICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHt0aGlzLmNsYXNzSWR9YFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9ICk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIG5hdnRhZyh0eXBlKXtcbiAgICAgICAgdGhpcy5uYXZUeXBlID0gdHlwZTtcbiAgICAgIH0sXG4gICAgICBwbGF5VmlkZW8oaXRlbSxpbmRleCl7XG4gICAgICAgIHRoaXMuaXNIYXNWaWRlbyA9IHRydWU7XG4gICAgICAgIHRoaXMuZnJlZUNsYXNzTGlzdC5mb3JFYWNoKCAodmFsLGlkeCkgPT4ge1xuICAgICAgICAgIGlmKCBpZHggPT0gaW5kZXggKXtcbiAgICAgICAgICAgIHZhbC5yZXNvdXJjZS5wbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhbC5yZXNvdXJjZS5wbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9ICk7XG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gaXRlbS5yZXNvdXJjZS5tZWRpYV91cmw7XG4gICAgICB9LFxuICAgICAgZ290b0NsYXNzSW5kZXgoKXtcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXG4gICAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBwYXl0aXAoKXtcbiAgICAgICAgaWYodGhpcy5pc1BheWVkIHx8IHRoaXMuaXNGcmVlKXtcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHt0aGlzLmNsYXNzSWR9YFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+ivt+WFiOi0reS5sOivvueoiycsXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICAgIH0pXG4gICAgICB9LFxuXG4gICAgICBnb3RvUGF5KHBob25lKXtcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn6Kej6ZSB5LitJyxcbiAgICAgICAgfSlcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGF5LFxuICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgIGNsYXNzX2lkOk51bWJlcih0aGlzLmNsYXNzSWQpLFxuICAgICAgICAgICAgICBwYXlzb3VyY2U6MSxcbiAgICAgICAgICAgICAgcGhvbmU6IHd4LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzP2lkPSR7dGhpcy5jbGFzc0lkfWBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gbGV0IGpzQXBpQ29uZmlnID0ge307XG4gICAgICAgICAgICAvLyBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7IFxuICAgICAgICAgICAgLy8gLyog5YWN6LS555qE55u05o6l6Lez6L2s5LiN55So5pSv5LuYICovXG4gICAgICAgICAgICAvLyBpZiggdGhpcy5pc0ZyZWUgKXtcbiAgICAgICAgICAgIC8vICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAvLyAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzP2lkPSR7dGhpcy5jbGFzc0lkfWBcbiAgICAgICAgICAgIC8vICAgfSk7XG4gICAgICAgICAgICAvLyAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgLy8gdHJ5e1xuICAgICAgICAgICAgLy8gICBqc0FwaUNvbmZpZyA9IEpTT04ucGFyc2UoZGF0YS5qc2FwaUNvbmZpZyk7XG4gICAgICAgICAgICAvLyB9Y2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAvLyB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAvLyAgICAndGltZVN0YW1wJzoganNBcGlDb25maWcudGltZVN0YW1wLFxuICAgICAgICAgICAgLy8gICAgJ25vbmNlU3RyJzoganNBcGlDb25maWcubm9uY2VTdHIsXG4gICAgICAgICAgICAvLyAgICAncGFja2FnZSc6IGpzQXBpQ29uZmlnLnBhY2thZ2UsXG4gICAgICAgICAgICAvLyAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgIC8vICAgICdwYXlTaWduJzoganNBcGlDb25maWcucGF5U2lnbixcbiAgICAgICAgICAgIC8vICAgICdzdWNjZXNzJzpmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgLy8gICAgICAgLy8g5pSv5LuY5oiQ5YqfXG4gICAgICAgICAgICAvLyAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIC8vICAgICAgICAgIHVybDogYC9wYWdlcy9jbGFzcz9pZD0ke3RoaXMuY2xhc3NJZH1gXG4gICAgICAgICAgICAvLyAgICAgICB9KVxuICAgICAgICAgICAgLy8gICAgfSxcbiAgICAgICAgICAgIC8vICAgICdmYWlsJzpmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgLy8gICAgICAgLy8g5pSv5LuY5aSx6LSlXG4gICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICB9ICk7XG4gICAgICAgXG4gICAgICB9LFxuICAgICAgZ290b0FpcmNsZShpZCl7XG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvYWlydGljbGU/aWQ9JHtpZH1gXG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgXG4gICAgfVxuXG4gICAgLy8g6I635b6X6K++56iL55qE5L+h5oGvXG4gICAgZ2V0Q2xhc3NJbmZvKCl7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+iOt+WPluS4rS4uLicsXG4gICAgICAgIH0pXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc0luZm8sXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgfSApLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICBpZiggKCt0aGlzLmNsYXNzSW5mby5wcmljZSkgPD0gMCApe1xuICAgICAgICAgICAgdGhpcy5pc0ZyZWUgPSB0cnVlO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5pc0ZyZWUgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8ucHJpY2UgPSB0aGlzLmZvcm1hdGVNb25leSh0aGlzLmNsYXNzSW5mby5wcmljZSk7XG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8uZXhwaXJlX21vbnRoID0gdGhpcy5mb3JtYXRlTW9udGgodGhpcy5jbGFzc0luZm8uZXhwaXJlX21vbnRoKTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyDojrflvpflhY3otLnor5XlkKzliJfooahcbiAgICBnZXRUcnlMaXN0KCl7XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NUcnksXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgfSApLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgaWYoIGRhdGEubGVuZ3RoICl7XG4gICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgICAgICAgICAgIHZhbC5wbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFsLnJlc291cmNlLm1lZGlhX3RpbWUgPSB2YWwucmVzb3VyY2UubWVkaWFfdGltZSAmJiB0aGlzLnNlY29uZHNGb3JtYXRlKHZhbC5yZXNvdXJjZS5tZWRpYV90aW1lKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgdGhpcy5mcmVlQ2xhc3NMaXN0ID0gZGF0YTtcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIOiOt+WPlueroOiKguWIl+ihqFxuICAgIGdldENoYXB0ZXJMaXN0KCl7XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NDaGFwdGVyLFxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgIGlmKCBkYXRhLmxlbmd0aCApe1xuICAgICAgICAgICAgICBkYXRhLmZvckVhY2goICh2YWwsaSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhbC5zbGlkZSA9IGkgPT09IDAgPyAgZmFsc2UgOiB0cnVlO1xuICAgICAgICAgICAgICAgIHZhbC5sZXNzb24gJiYgdmFsLmxlc3Nvbi5mb3JFYWNoKCB2YWwyID0+IHtcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lID0gdmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lICYmIHRoaXMuc2Vjb25kc0Zvcm1hdGUodmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy5jaGFwdGVyTGlzdCA9IGRhdGE7XG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICB9IFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIGdldElzUGF5ZWRcbiAgICBnZXRJc1BheWVkKCl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BheSxcbiAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICBjbGFzc19pZDpOdW1iZXIodGhpcy5jbGFzc0lkKSxcbiAgICAgICAgICAgICAgcGF5c291cmNlOjFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICBpZiggcmVzLmRhdGEubXNnID09ICfmgqjlt7LotK3kubDmraTor77nqIsnKXtcbiAgICAgICAgICAgIHRoaXMuaXNQYXllZCA9IHRydWU7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmlzUGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuY2xhc3NJZCA9IG9wdGlvbnMuaWQgfHwgNjtcbiAgICAgIHRoaXMuZ2V0Q2xhc3NJbmZvKCk7XG4gICAgICB0aGlzLmdldFRyeUxpc3QoKTtcbiAgICAgIHRoaXMuZ2V0Q2hhcHRlckxpc3QoKTtcbiAgICAgIC8vIHRoaXMuZ2V0SXNQYXllZCgpO1xuICAgIH1cblxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGl0bGU6ICflpJznjKvotrPlvanor77nqIsnLFxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxuICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgfVxuIl19