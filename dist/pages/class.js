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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiY2xhc3NJZCIsImNsYXNzSW5mbyIsInZpZGVvIiwic3JjIiwiaXNIYXNWaWRlbyIsImNoYXB0ZXJMaXN0IiwibGVzc29uTGVuZ3RoIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ290b0FpcmNsZSIsImFpcnRjbGVJZCIsInNldFByb2dyZXNzIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwicGxheVZpZGVvIiwibGVzc29uIiwicmVzb3VyY2UiLCJwbGF5aW5nIiwicmVzb3VyY2VfaWQiLCJtZWRpYV91cmwiLCIkYXBwbHkiLCJldmVudHMiLCJyZXF1ZXN0IiwidXNlckNoYXB0ZXIiLCJtZXRob2QiLCJjbGFzc19pZCIsImhlYWRlciIsInRoZW4iLCJyZXMiLCJjaGFwdGVyIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsImkiLCJ2YWwyIiwibWVkaWFfdGltZSIsInNlY29uZHNGb3JtYXRlIiwiY29uc29sZSIsImxvZyIsIm51bSIsImtleSIsInByZWNlbnQiLCJ2YWx1ZSIsImdldFN0b3JhZ2VTeW5jIiwiYWxyZWFkeSIsInNvbWUiLCJwdXNoIiwicGFyc2VJbnQiLCJzZXRTdG9yYWdlU3luYyIsInRvdGFsIiwiZSIsImxlYXJuX3BlcmNlbnQiLCJjbGFzc1BlcmNlbnQiLCJwZXJjZW50Iiwib3B0aW9ucyIsImlkIiwiZ2V0Q2xhc3NDaGFwdGVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBSWJDLE0sR0FBUyxnQixRQUVUQyxJLEdBQU87QUFDTEMsZUFBUSxDQURIO0FBRUxDLGlCQUFVLEVB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LFdBQUtsRCxTQUFMLENBQWVtRCxhQUFmLEdBQStCVixPQUEvQjs7QUFFQSxxQkFBS25CLE9BQUwsQ0FBYTtBQUNQVCxhQUFJLGlCQUFRdUMsWUFETDtBQUVQNUIsZ0JBQU8sTUFGQTtBQUdQMUIsY0FBSztBQUNIMkIsb0JBQVMsS0FBSzFCLE9BRFg7QUFFSHNELG1CQUFRWjtBQUZMLFNBSEU7QUFPUGYsZ0JBQVE7QUFDTixvQkFBVTtBQURKO0FBUEQsT0FBYixFQVVPQyxJQVZQLENBVWEsZUFBTyxDQUNqQixDQVhIO0FBYUQ7O0FBRUQ7Ozs7MkJBRU8yQixPLEVBQVM7QUFDZCxXQUFLdkQsT0FBTCxHQUFldUQsUUFBUUMsRUFBdkI7QUFDQSxXQUFLQyxlQUFMO0FBQ0Q7Ozs7RUEzSGdDLGVBQUtDLEk7O2tCQUFuQmhFLEsiLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICd0ZXN0J1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBjbGFzc0lkOjgsXHJcbiAgICAgIGNsYXNzSW5mbzp7fSxcclxuICAgICAgdmlkZW86e1xyXG4gICAgICAgIHNyYzonJ1xyXG4gICAgICB9LFxyXG4gICAgICBpc0hhc1ZpZGVvOmZhbHNlLFxyXG4gICAgICBjaGFwdGVyTGlzdDpbXSxcclxuICAgICAgbGVzc29uTGVuZ3RoOjAsXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGdvdG9BaXJjbGUoYWlydGNsZUlkKXtcclxuICAgICAgICB0aGlzLnNldFByb2dyZXNzKCBhaXJ0Y2xlSWQgKTtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2FpcnRpY2xlP2lkPSR7YWlydGNsZUlkfWBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBwbGF5VmlkZW8obGVzc29uKXtcclxuICAgICAgICB0aGlzLmlzSGFzVmlkZW8gPSB0cnVlO1xyXG4gICAgICAgIGxlc3Nvbi5yZXNvdXJjZS5wbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldFByb2dyZXNzKCBsZXNzb24ucmVzb3VyY2VfaWQgKTtcclxuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IGxlc3Nvbi5yZXNvdXJjZS5tZWRpYV91cmw7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9ncmVzcygpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGFzc0NoYXB0ZXIoKXtcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC51c2VyQ2hhcHRlcixcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgIGlmKCBkYXRhLmNoYXB0ZXIubGVuZ3RoICl7XHJcbiAgICAgICAgICAgICAgICAgIGRhdGEuY2hhcHRlci5mb3JFYWNoKCAodmFsLGkpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUgPSB2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUgJiYgdGhpcy5zZWNvbmRzRm9ybWF0ZSh2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmxlc3Nvbkxlbmd0aCsrO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYXB0ZXJMaXN0ID0gZGF0YS5jaGFwdGVyO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2hhcHRlckxpc3QpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jbGFzc0luZm8gPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfSApXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyDorr7nva7mnKzlnLDov5vluqbliLDmnKzlnLBcclxuICAgIHNldFByb2dyZXNzKCBudW0gKXtcclxuICAgICAgbGV0IGtleSAgPSB0aGlzLmNsYXNzSWQgKyAnJztcclxuICAgICAgbGV0IHByZWNlbnQgPSAwO1xyXG4gICAgICAvLyDliKTmlq3lvZPliY3nvJPlrZjmnInmsqHmnInov5vluqZcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB3eC5nZXRTdG9yYWdlU3luYyhrZXkpO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXR1cm4gdmFsdWVcclxuICAgICAgICAgICAgaWYoIXZhbHVlLmFscmVhZHkuc29tZSggdmFsID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gdmFsID09IG51bSBcclxuICAgICAgICAgICAgfSApKXtcclxuICAgICAgICAgICAgICAgIHZhbHVlLmFscmVhZHkucHVzaChudW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZWNlbnQgPSBwYXJzZUludCh2YWx1ZS5hbHJlYWR5Lmxlbmd0aC90aGlzLmxlc3Nvbkxlbmd0aCAqIDEwMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKGtleSwge3RvdGFsOnRoaXMubGVzc29uTGVuZ3RoLGFscmVhZHk6W251bV19KTtcclxuICAgICAgICAgICAgcHJlY2VudCA9IHBhcnNlSW50KDEvdGhpcy5sZXNzb25MZW5ndGggKiAxMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aGVuIGNhdGNoIGVycm9yXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jbGFzc0luZm8ubGVhcm5fcGVyY2VudCA9IHByZWNlbnQ7XHJcblxyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BlcmNlbnQsXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkLFxyXG4gICAgICAgICAgICAgIHBlcmNlbnQ6cHJlY2VudFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogJ1BIUFNFU1NJRD03b2dqOXRlZGttazdubjJubWc5cGdudGd1NSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICB9IClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+572u5b2T5YmN6L+b5bqm55qE6aG16Z2i5pWw5o2uXHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5jbGFzc0lkID0gb3B0aW9ucy5pZDtcclxuICAgICAgdGhpcy5nZXRDbGFzc0NoYXB0ZXIoKTtcclxuICAgIH1cclxuICB9XHJcbiJdfQ==