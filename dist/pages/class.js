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
      playVideo: function playVideo(lesson, index, idx) {
        this.isHasVideo = true;
        this.chapterList.forEach(function (val) {
          val.lesson.forEach(function (val2) {
            val2.resource.playing = false;
          });
        });
        this.chapterList[index].lesson[idx].resource.playing = true;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJjb250YWN0IiwibWl4aW5zIiwiZGF0YSIsImNsYXNzSWQiLCJjbGFzc0luZm8iLCJ2aWRlbyIsInNyYyIsImlzSGFzVmlkZW8iLCJjaGFwdGVyTGlzdCIsImxlc3Nvbkxlbmd0aCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvdG9BaXJjbGUiLCJhaXJ0Y2xlSWQiLCJzZXRQcm9ncmVzcyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInBsYXlWaWRlbyIsImxlc3NvbiIsImluZGV4IiwiaWR4IiwiZm9yRWFjaCIsInZhbCIsInZhbDIiLCJyZXNvdXJjZSIsInBsYXlpbmciLCJyZXNvdXJjZV9pZCIsIm1lZGlhX3VybCIsIiRhcHBseSIsImV2ZW50cyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJyZXF1ZXN0IiwidXNlckNoYXB0ZXIiLCJtZXRob2QiLCJjbGFzc19pZCIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2Vzc2lvbklEIiwidGhlbiIsImhpZGVMb2FkaW5nIiwicmVzIiwiY2hhcHRlciIsImxlbmd0aCIsImkiLCJtZWRpYV90aW1lIiwic2Vjb25kc0Zvcm1hdGUiLCJjb25zb2xlIiwibG9nIiwibnVtIiwia2V5IiwicHJlY2VudCIsInZhbHVlIiwiZ2V0U3RvcmFnZVN5bmMiLCJhbHJlYWR5Iiwic29tZSIsInB1c2giLCJwYXJzZUludCIsInNldFN0b3JhZ2VTeW5jIiwidG90YWwiLCJlIiwibGVhcm5fcGVyY2VudCIsImNsYXNzUGVyY2VudCIsInBlcmNlbnQiLCJvcHRpb25zIiwiaWQiLCJnZXRDbGFzc0NoYXB0ZXIiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7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UEMsa0JBQVMsdUJBSEY7QUFJUEMsaUJBQVEsaUJBQVM1QixHQUFULEVBQWM7QUFDcEI7QUFDRCxTQU5NO0FBT1A2QixjQUFNLGNBQVM3QixHQUFULEVBQWM7QUFDbEI7QUFDRDtBQVRNLE9BQVA7QUFXRDs7OztFQW5KNEIsZUFBSzhCLEk7O2tCQUFuQjdFLEsiLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXHJcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WknOeMq+i2s+eQgy0t6K++56iL6aaW6aG1J1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgY29udGFjdDpDb250YWN0XHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBjbGFzc0lkOjgsXHJcbiAgICAgIGNsYXNzSW5mbzp7fSxcclxuICAgICAgdmlkZW86e1xyXG4gICAgICAgIHNyYzonJ1xyXG4gICAgICB9LFxyXG4gICAgICBpc0hhc1ZpZGVvOmZhbHNlLFxyXG4gICAgICBjaGFwdGVyTGlzdDpbXSxcclxuICAgICAgbGVzc29uTGVuZ3RoOjAsXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGdvdG9BaXJjbGUoYWlydGNsZUlkKXtcclxuICAgICAgICB0aGlzLnNldFByb2dyZXNzKCBhaXJ0Y2xlSWQgKTtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2FpcnRpY2xlP2lkPSR7YWlydGNsZUlkfWBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBwbGF5VmlkZW8obGVzc29uLGluZGV4LGlkeCl7XHJcbiAgICAgICAgdGhpcy5pc0hhc1ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoYXB0ZXJMaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICB2YWwubGVzc29uLmZvckVhY2goIHZhbDIgPT4ge1xyXG4gICAgICAgICAgICB2YWwyLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIH0gKVxyXG4gICAgICAgIH0gKVxyXG4gICAgICAgIHRoaXMuY2hhcHRlckxpc3RbaW5kZXhdLmxlc3NvbltpZHhdLnJlc291cmNlLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoIGxlc3Nvbi5yZXNvdXJjZV9pZCApO1xyXG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gbGVzc29uLnJlc291cmNlLm1lZGlhX3VybDtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2dyZXNzKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldENsYXNzQ2hhcHRlcigpe1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+iOt+WPluS4rS4uLicsXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC51c2VyQ2hhcHRlcixcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICBpZiggZGF0YS5jaGFwdGVyLmxlbmd0aCApe1xyXG4gICAgICAgICAgICAgICAgICBkYXRhLmNoYXB0ZXIuZm9yRWFjaCggKHZhbCxpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uLmZvckVhY2goIHZhbDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lID0gdmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lICYmIHRoaXMuc2Vjb25kc0Zvcm1hdGUodmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5sZXNzb25MZW5ndGgrKztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jaGFwdGVyTGlzdCA9IGRhdGEuY2hhcHRlcjtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNoYXB0ZXJMaXN0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIH0gKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8g6K6+572u5pys5Zyw6L+b5bqm5Yiw5pys5ZywXHJcbiAgICBzZXRQcm9ncmVzcyggbnVtICl7XHJcbiAgICAgIGxldCBrZXkgID0gdGhpcy5jbGFzc0lkICsgJyc7XHJcbiAgICAgIGxldCBwcmVjZW50ID0gMDtcclxuICAgICAgLy8g5Yik5pat5b2T5YmN57yT5a2Y5pyJ5rKh5pyJ6L+b5bqmXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gd3guZ2V0U3RvcmFnZVN5bmMoa2V5KTtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgIGlmKCF2YWx1ZS5hbHJlYWR5LnNvbWUoIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbCA9PSBudW0gXHJcbiAgICAgICAgICAgIH0gKSl7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5hbHJlYWR5LnB1c2gobnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmVjZW50ID0gcGFyc2VJbnQodmFsdWUuYWxyZWFkeS5sZW5ndGgvdGhpcy5sZXNzb25MZW5ndGggKiAxMDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhrZXksIHt0b3RhbDp0aGlzLmxlc3Nvbkxlbmd0aCxhbHJlYWR5OltudW1dfSk7XHJcbiAgICAgICAgICAgIHByZWNlbnQgPSBwYXJzZUludCgxL3RoaXMubGVzc29uTGVuZ3RoICogMTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2hlbiBjYXRjaCBlcnJvclxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2xhc3NJbmZvLmxlYXJuX3BlcmNlbnQgPSBwcmVjZW50O1xyXG5cclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NQZXJjZW50LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZCxcclxuICAgICAgICAgICAgICBwZXJjZW50OnByZWNlbnRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB9IClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+572u5b2T5YmN6L+b5bqm55qE6aG16Z2i5pWw5o2uXHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5jbGFzc0lkID0gb3B0aW9ucy5pZDtcclxuICAgICAgdGhpcy5nZXRDbGFzc0NoYXB0ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogJ+WknOeMq+i2s+W9qeivvueoiycsXHJcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgIGltYWdlVXJsOicvaW1hZ2VzL3NoYXJlX2ltZy5qcGcnLFxyXG4gICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gIH1cclxuIl19