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
          'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
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
          'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
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
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/class'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiY2xhc3NJZCIsImNsYXNzSW5mbyIsInZpZGVvIiwic3JjIiwiaXNIYXNWaWRlbyIsImNoYXB0ZXJMaXN0IiwibGVzc29uTGVuZ3RoIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ290b0FpcmNsZSIsImFpcnRjbGVJZCIsInNldFByb2dyZXNzIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwicGxheVZpZGVvIiwibGVzc29uIiwicmVzb3VyY2UiLCJwbGF5aW5nIiwicmVzb3VyY2VfaWQiLCJtZWRpYV91cmwiLCIkYXBwbHkiLCJldmVudHMiLCJzaG93TG9hZGluZyIsInRpdGxlIiwicmVxdWVzdCIsInVzZXJDaGFwdGVyIiwibWV0aG9kIiwiY2xhc3NfaWQiLCJoZWFkZXIiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJyZXMiLCJjaGFwdGVyIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsImkiLCJ2YWwyIiwibWVkaWFfdGltZSIsInNlY29uZHNGb3JtYXRlIiwiY29uc29sZSIsImxvZyIsIm51bSIsImtleSIsInByZWNlbnQiLCJ2YWx1ZSIsImdldFN0b3JhZ2VTeW5jIiwiYWxyZWFkeSIsInNvbWUiLCJwdXNoIiwicGFyc2VJbnQiLCJzZXRTdG9yYWdlU3luYyIsInRvdGFsIiwiZSIsImxlYXJuX3BlcmNlbnQiLCJjbGFzc1BlcmNlbnQiLCJwZXJjZW50Iiwib3B0aW9ucyIsImlkIiwiZ2V0Q2xhc3NDaGFwdGVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBSWJDLE0sR0FBUyxnQixRQUVUQyxJ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LG9CQUFVTSxTQUFTLElBQUUsS0FBSzdDLFlBQVAsR0FBc0IsR0FBL0IsQ0FBVjtBQUNIO0FBQ0YsT0FkRCxDQWNFLE9BQU9nRCxDQUFQLEVBQVU7QUFDVjtBQUNEO0FBQ0QsV0FBS3JELFNBQUwsQ0FBZXNELGFBQWYsR0FBK0JWLE9BQS9COztBQUVBLHFCQUFLcEIsT0FBTCxDQUFhO0FBQ1BYLGFBQUksaUJBQVEwQyxZQURMO0FBRVA3QixnQkFBTyxNQUZBO0FBR1A1QixjQUFLO0FBQ0g2QixvQkFBUyxLQUFLNUIsT0FEWDtBQUVIeUQsbUJBQVFaO0FBRkwsU0FIRTtBQU9QaEIsZ0JBQVE7QUFDTixvQkFBVTtBQURKO0FBUEQsT0FBYixFQVVPQyxJQVZQLENBVWEsZUFBTyxDQUNqQixDQVhIO0FBYUQ7O0FBRUQ7Ozs7MkJBRU80QixPLEVBQVM7QUFDZCxXQUFLMUQsT0FBTCxHQUFlMEQsUUFBUUMsRUFBdkI7QUFDQSxXQUFLQyxlQUFMO0FBQ0Q7Ozs7RUEvSGdDLGVBQUtDLEk7O2tCQUFuQm5FLEsiLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICd0ZXN0J1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBjbGFzc0lkOjgsXHJcbiAgICAgIGNsYXNzSW5mbzp7fSxcclxuICAgICAgdmlkZW86e1xyXG4gICAgICAgIHNyYzonJ1xyXG4gICAgICB9LFxyXG4gICAgICBpc0hhc1ZpZGVvOmZhbHNlLFxyXG4gICAgICBjaGFwdGVyTGlzdDpbXSxcclxuICAgICAgbGVzc29uTGVuZ3RoOjAsXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGdvdG9BaXJjbGUoYWlydGNsZUlkKXtcclxuICAgICAgICB0aGlzLnNldFByb2dyZXNzKCBhaXJ0Y2xlSWQgKTtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2FpcnRpY2xlP2lkPSR7YWlydGNsZUlkfWBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBwbGF5VmlkZW8obGVzc29uKXtcclxuICAgICAgICB0aGlzLmlzSGFzVmlkZW8gPSB0cnVlO1xyXG4gICAgICAgIGxlc3Nvbi5yZXNvdXJjZS5wbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldFByb2dyZXNzKCBsZXNzb24ucmVzb3VyY2VfaWQgKTtcclxuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IGxlc3Nvbi5yZXNvdXJjZS5tZWRpYV91cmw7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9ncmVzcygpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGFzc0NoYXB0ZXIoKXtcclxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfojrflj5bkuK0uLi4nLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGgudXNlckNoYXB0ZXIsXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICBpZiggZGF0YS5jaGFwdGVyLmxlbmd0aCApe1xyXG4gICAgICAgICAgICAgICAgICBkYXRhLmNoYXB0ZXIuZm9yRWFjaCggKHZhbCxpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uLmZvckVhY2goIHZhbDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lID0gdmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lICYmIHRoaXMuc2Vjb25kc0Zvcm1hdGUodmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5sZXNzb25MZW5ndGgrKztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jaGFwdGVyTGlzdCA9IGRhdGEuY2hhcHRlcjtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNoYXB0ZXJMaXN0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIH0gKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8g6K6+572u5pys5Zyw6L+b5bqm5Yiw5pys5ZywXHJcbiAgICBzZXRQcm9ncmVzcyggbnVtICl7XHJcbiAgICAgIGxldCBrZXkgID0gdGhpcy5jbGFzc0lkICsgJyc7XHJcbiAgICAgIGxldCBwcmVjZW50ID0gMDtcclxuICAgICAgLy8g5Yik5pat5b2T5YmN57yT5a2Y5pyJ5rKh5pyJ6L+b5bqmXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gd3guZ2V0U3RvcmFnZVN5bmMoa2V5KTtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgIGlmKCF2YWx1ZS5hbHJlYWR5LnNvbWUoIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbCA9PSBudW0gXHJcbiAgICAgICAgICAgIH0gKSl7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5hbHJlYWR5LnB1c2gobnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmVjZW50ID0gcGFyc2VJbnQodmFsdWUuYWxyZWFkeS5sZW5ndGgvdGhpcy5sZXNzb25MZW5ndGggKiAxMDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhrZXksIHt0b3RhbDp0aGlzLmxlc3Nvbkxlbmd0aCxhbHJlYWR5OltudW1dfSk7XHJcbiAgICAgICAgICAgIHByZWNlbnQgPSBwYXJzZUludCgxL3RoaXMubGVzc29uTGVuZ3RoICogMTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2hlbiBjYXRjaCBlcnJvclxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2xhc3NJbmZvLmxlYXJuX3BlcmNlbnQgPSBwcmVjZW50O1xyXG5cclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NQZXJjZW50LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZCxcclxuICAgICAgICAgICAgICBwZXJjZW50OnByZWNlbnRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgfSApXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiuvue9ruW9k+WJjei/m+W6pueahOmhtemdouaVsOaNrlxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuY2xhc3NJZCA9IG9wdGlvbnMuaWQ7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NDaGFwdGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=