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
      navigationBarTitleText: '夜猫足球--课程首页'
    }, _this.components = {
      contact: _contact2.default
    }, _this.mixins = [_test2.default], _this.data = {
      classId: 8,
      classInfo: {},
      video: {
        src: ''
      },
      isHasVideo: false,
      chapterList: [],
      lessonLength: 0
    }, _this.computed = {}, _this.methods = {
      gotoAircle: function gotoAircle(airtcleId) {
        this.setProgress(airtcleId);
        wx.navigateTo({
          url: '/pages/airticle?id=' + airtcleId
        });
      },
      playVideo: function playVideo(lesson) {
        this.isHasVideo = true;
        lesson.resource.playing = true;
        this.setProgress(lesson.resource_id);
        this.video.src = lesson.resource.media_url;
        this.$apply();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'getProgress',
    value: function getProgress() {}
  }, {
    key: 'getClassChapter',
    value: function getClassChapter() {
      var _this2 = this;

      wx.showLoading({
        title: '获取中...'
      });
      _wepy2.default.request({
        url: _config2.default.userChapter,
        method: "GET",
        data: {
          class_id: this.classId
        },
        header: {
          'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
        }
      }).then(function (res) {
        wx.hideLoading();
        var data = res.data.data;
        if (data.chapter.length) {
          data.chapter.forEach(function (val, i) {
            val.lesson.forEach(function (val2) {
              val2.resource.playing = false;
              val2.resource.media_time = val2.resource.media_time && _this2.secondsFormate(val2.resource.media_time);
              _this2.lessonLength++;
            });
          });
          _this2.chapterList = data.chapter;
          console.log(_this2.chapterList);
        }
        _this2.classInfo = data;
        _this2.$apply();
      });
    }

    // 设置本地进度到本地

  }, {
    key: 'setProgress',
    value: function setProgress(num) {
      var key = this.classId + '';
      var precent = 0;
      // 判断当前缓存有没有进度
      try {
        var value = wx.getStorageSync(key);
        if (value) {
          // Do something with return value
          if (!value.already.some(function (val) {
            return val == num;
          })) {
            value.already.push(num);
          }
          precent = parseInt(value.already.length / this.lessonLength * 100);
        } else {
          wx.setStorageSync(key, { total: this.lessonLength, already: [num] });
          precent = parseInt(1 / this.lessonLength * 100);
        }
      } catch (e) {
        // Do something when catch error
      }
      this.classInfo.learn_percent = precent;

      _wepy2.default.request({
        url: _config2.default.classPercent,
        method: "POST",
        data: {
          class_id: this.classId,
          percent: precent
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
        }
      }).then(function (res) {});
    }

    // 设置当前进度的页面数据

  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      this.classId = options.id;
      this.getClassChapter();
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/class'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJjb250YWN0IiwibWl4aW5zIiwiZGF0YSIsImNsYXNzSWQiLCJjbGFzc0luZm8iLCJ2aWRlbyIsInNyYyIsImlzSGFzVmlkZW8iLCJjaGFwdGVyTGlzdCIsImxlc3Nvbkxlbmd0aCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvdG9BaXJjbGUiLCJhaXJ0Y2xlSWQiLCJzZXRQcm9ncmVzcyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInBsYXlWaWRlbyIsImxlc3NvbiIsInJlc291cmNlIiwicGxheWluZyIsInJlc291cmNlX2lkIiwibWVkaWFfdXJsIiwiJGFwcGx5IiwiZXZlbnRzIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInJlcXVlc3QiLCJ1c2VyQ2hhcHRlciIsIm1ldGhvZCIsImNsYXNzX2lkIiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzZXNzaW9uSUQiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJyZXMiLCJjaGFwdGVyIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsImkiLCJ2YWwyIiwibWVkaWFfdGltZSIsInNlY29uZHNGb3JtYXRlIiwiY29uc29sZSIsImxvZyIsIm51bSIsImtleSIsInByZWNlbnQiLCJ2YWx1ZSIsImdldFN0b3JhZ2VTeW5jIiwiYWxyZWFkeSIsInNvbWUiLCJwdXNoIiwicGFyc2VJbnQiLCJzZXRTdG9yYWdlU3luYyIsInRvdGFsIiwiZSIsImxlYXJuX3BlcmNlbnQiLCJjbGFzc1BlcmNlbnQiLCJwZXJjZW50Iiwib3B0aW9ucyIsImlkIiwiZ2V0Q2xhc3NDaGFwdGVyIiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFGMkM7OztJ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QTFCLEdBQXlDLEdBQWxELENBQVY7QUFDSCxTQVJELE1BUUs7QUFDRE0sYUFBRzJDLGNBQUgsQ0FBa0JSLEdBQWxCLEVBQXVCLEVBQUNTLE9BQU0sS0FBS2xELFlBQVosRUFBeUI2QyxTQUFRLENBQUNMLEdBQUQsQ0FBakMsRUFBdkI7QUFDQUUsb0JBQVVNLFNBQVMsSUFBRSxLQUFLaEQsWUFBUCxHQUFzQixHQUEvQixDQUFWO0FBQ0g7QUFDRixPQWRELENBY0UsT0FBT21ELENBQVAsRUFBVTtBQUNWO0FBQ0Q7QUFDRCxXQUFLeEQsU0FBTCxDQUFleUQsYUFBZixHQUErQlYsT0FBL0I7O0FBRUEscUJBQUt2QixPQUFMLENBQWE7QUFDUFgsYUFBSSxpQkFBUTZDLFlBREw7QUFFUGhDLGdCQUFPLE1BRkE7QUFHUDVCLGNBQUs7QUFDSDZCLG9CQUFTLEtBQUs1QixPQURYO0FBRUg0RCxtQkFBUVo7QUFGTCxTQUhFO0FBT1BuQixnQkFBUTtBQUNOLDBCQUFnQixtQ0FEVjtBQUVOLG1DQUF1QixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDO0FBRnpDO0FBUEQsT0FBYixFQVdPQyxJQVhQLENBV2EsZUFBTyxDQUNqQixDQVpIO0FBY0Q7O0FBRUQ7Ozs7MkJBRU80QixPLEVBQVM7QUFDZCxXQUFLN0QsT0FBTCxHQUFlNkQsUUFBUUMsRUFBdkI7QUFDQSxXQUFLQyxlQUFMO0FBQ0Q7Ozt3Q0FFbUI7QUFDZCxhQUFPO0FBQ1B2QyxlQUFPLFFBREE7QUFFUHdDLGNBQU0sY0FGQztBQUdQQyxrQkFBUyx1QkFIRjtBQUlQQyxpQkFBUSxpQkFBUy9CLEdBQVQsRUFBYztBQUNwQjtBQUNELFNBTk07QUFPUGdDLGNBQU0sY0FBU2hDLEdBQVQsRUFBYztBQUNsQjtBQUNEO0FBVE0sT0FBUDtBQVdEOzs7O0VBOUk0QixlQUFLaUMsSTs7a0JBQW5CM0UsSyIsImZpbGUiOiJjbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5aSc54yr6Laz55CDLS3or77nqIvpppbpobUnXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBjb250YWN0OkNvbnRhY3RcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGNsYXNzSWQ6OCxcclxuICAgICAgY2xhc3NJbmZvOnt9LFxyXG4gICAgICB2aWRlbzp7XHJcbiAgICAgICAgc3JjOicnXHJcbiAgICAgIH0sXHJcbiAgICAgIGlzSGFzVmlkZW86ZmFsc2UsXHJcbiAgICAgIGNoYXB0ZXJMaXN0OltdLFxyXG4gICAgICBsZXNzb25MZW5ndGg6MCxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgZ290b0FpcmNsZShhaXJ0Y2xlSWQpe1xyXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoIGFpcnRjbGVJZCApO1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvYWlydGljbGU/aWQ9JHthaXJ0Y2xlSWR9YFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIHBsYXlWaWRlbyhsZXNzb24pe1xyXG4gICAgICAgIHRoaXMuaXNIYXNWaWRlbyA9IHRydWU7XHJcbiAgICAgICAgbGVzc29uLnJlc291cmNlLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoIGxlc3Nvbi5yZXNvdXJjZV9pZCApO1xyXG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gbGVzc29uLnJlc291cmNlLm1lZGlhX3VybDtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2dyZXNzKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldENsYXNzQ2hhcHRlcigpe1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+iOt+WPluS4rS4uLicsXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC51c2VyQ2hhcHRlcixcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICBpZiggZGF0YS5jaGFwdGVyLmxlbmd0aCApe1xyXG4gICAgICAgICAgICAgICAgICBkYXRhLmNoYXB0ZXIuZm9yRWFjaCggKHZhbCxpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uLmZvckVhY2goIHZhbDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lID0gdmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lICYmIHRoaXMuc2Vjb25kc0Zvcm1hdGUodmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5sZXNzb25MZW5ndGgrKztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jaGFwdGVyTGlzdCA9IGRhdGEuY2hhcHRlcjtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNoYXB0ZXJMaXN0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIH0gKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8g6K6+572u5pys5Zyw6L+b5bqm5Yiw5pys5ZywXHJcbiAgICBzZXRQcm9ncmVzcyggbnVtICl7XHJcbiAgICAgIGxldCBrZXkgID0gdGhpcy5jbGFzc0lkICsgJyc7XHJcbiAgICAgIGxldCBwcmVjZW50ID0gMDtcclxuICAgICAgLy8g5Yik5pat5b2T5YmN57yT5a2Y5pyJ5rKh5pyJ6L+b5bqmXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gd3guZ2V0U3RvcmFnZVN5bmMoa2V5KTtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgIGlmKCF2YWx1ZS5hbHJlYWR5LnNvbWUoIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbCA9PSBudW0gXHJcbiAgICAgICAgICAgIH0gKSl7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5hbHJlYWR5LnB1c2gobnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmVjZW50ID0gcGFyc2VJbnQodmFsdWUuYWxyZWFkeS5sZW5ndGgvdGhpcy5sZXNzb25MZW5ndGggKiAxMDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhrZXksIHt0b3RhbDp0aGlzLmxlc3Nvbkxlbmd0aCxhbHJlYWR5OltudW1dfSk7XHJcbiAgICAgICAgICAgIHByZWNlbnQgPSBwYXJzZUludCgxL3RoaXMubGVzc29uTGVuZ3RoICogMTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2hlbiBjYXRjaCBlcnJvclxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2xhc3NJbmZvLmxlYXJuX3BlcmNlbnQgPSBwcmVjZW50O1xyXG5cclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NQZXJjZW50LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZCxcclxuICAgICAgICAgICAgICBwZXJjZW50OnByZWNlbnRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB9IClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+572u5b2T5YmN6L+b5bqm55qE6aG16Z2i5pWw5o2uXHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5jbGFzc0lkID0gb3B0aW9ucy5pZDtcclxuICAgICAgdGhpcy5nZXRDbGFzc0NoYXB0ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogJ+WknOeMq+i2s+W9qeivvueoiycsXHJcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gIH1cclxuIl19