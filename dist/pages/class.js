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
            val.slide = i === 0 ? false : true;
            val.lesson.forEach(function (val2) {
              val2.resource.playing = false;
              _this2.lessonLength++;
            });
          });
          _this2.chapterList = data.chapter;
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
    value: function onLoad() {
      this.getClassChapter();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/class'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiY2xhc3NJZCIsImNsYXNzSW5mbyIsInZpZGVvIiwic3JjIiwiaXNIYXNWaWRlbyIsImNoYXB0ZXJMaXN0IiwibGVzc29uTGVuZ3RoIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ290b0FpcmNsZSIsImFpcnRjbGVJZCIsInNldFByb2dyZXNzIiwiZXZlbnRzIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwicmVxdWVzdCIsInVybCIsInVzZXJDaGFwdGVyIiwibWV0aG9kIiwiY2xhc3NfaWQiLCJoZWFkZXIiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJyZXMiLCJjaGFwdGVyIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsImkiLCJzbGlkZSIsImxlc3NvbiIsInZhbDIiLCJyZXNvdXJjZSIsInBsYXlpbmciLCIkYXBwbHkiLCJudW0iLCJrZXkiLCJwcmVjZW50IiwidmFsdWUiLCJnZXRTdG9yYWdlU3luYyIsImFscmVhZHkiLCJzb21lIiwicHVzaCIsInBhcnNlSW50Iiwic2V0U3RvcmFnZVN5bmMiLCJ0b3RhbCIsImUiLCJsZWFybl9wZXJjZW50IiwiY2xhc3NQZXJjZW50IiwicGVyY2VudCIsImdldENsYXNzQ2hhcHRlciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUliQyxNLEdBQVMsZ0IsUUFFVEMsSSxHQUFPO0FBQ0xDLGVBQVEsQ0FESDtBQUVMQyxpQkFBVSxFQUZMO0FBR0xDLGFBQU07QUFDSkMsYUFBSTtBQURBLE9BSEQ7QUFNTEMsa0JBQVcsS0FOTjtBQU9MQyxtQkFBWSxFQVBQ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XHJcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ3Rlc3QnXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGNsYXNzSWQ6OCxcclxuICAgICAgY2xhc3NJbmZvOnt9LFxyXG4gICAgICB2aWRlbzp7XHJcbiAgICAgICAgc3JjOicnXHJcbiAgICAgIH0sXHJcbiAgICAgIGlzSGFzVmlkZW86ZmFsc2UsXHJcbiAgICAgIGNoYXB0ZXJMaXN0OltdLFxyXG4gICAgICBsZXNzb25MZW5ndGg6MCxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgZ290b0FpcmNsZShhaXJ0Y2xlSWQpe1xyXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoIGFpcnRjbGVJZCApO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9ncmVzcygpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGFzc0NoYXB0ZXIoKXtcclxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfojrflj5bkuK0uLi4nLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGgudXNlckNoYXB0ZXIsXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICBpZiggZGF0YS5jaGFwdGVyLmxlbmd0aCApe1xyXG4gICAgICAgICAgICAgICAgICBkYXRhLmNoYXB0ZXIuZm9yRWFjaCggKHZhbCxpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwuc2xpZGUgPSBpID09PSAwID8gIGZhbHNlIDogdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmxlc3Nvbkxlbmd0aCsrO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYXB0ZXJMaXN0ID0gZGF0YS5jaGFwdGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIH0gKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8g6K6+572u5pys5Zyw6L+b5bqm5Yiw5pys5ZywXHJcbiAgICBzZXRQcm9ncmVzcyggbnVtICl7XHJcbiAgICAgIGxldCBrZXkgID0gdGhpcy5jbGFzc0lkICsgJyc7XHJcbiAgICAgIGxldCBwcmVjZW50ID0gMDtcclxuICAgICAgLy8g5Yik5pat5b2T5YmN57yT5a2Y5pyJ5rKh5pyJ6L+b5bqmXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gd3guZ2V0U3RvcmFnZVN5bmMoa2V5KTtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgIGlmKCF2YWx1ZS5hbHJlYWR5LnNvbWUoIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbCA9PSBudW0gXHJcbiAgICAgICAgICAgIH0gKSl7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5hbHJlYWR5LnB1c2gobnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmVjZW50ID0gcGFyc2VJbnQodmFsdWUuYWxyZWFkeS5sZW5ndGgvdGhpcy5sZXNzb25MZW5ndGggKiAxMDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhrZXksIHt0b3RhbDp0aGlzLmxlc3Nvbkxlbmd0aCxhbHJlYWR5OltudW1dfSk7XHJcbiAgICAgICAgICAgIHByZWNlbnQgPSBwYXJzZUludCgxL3RoaXMubGVzc29uTGVuZ3RoICogMTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2hlbiBjYXRjaCBlcnJvclxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2xhc3NJbmZvLmxlYXJuX3BlcmNlbnQgPSBwcmVjZW50O1xyXG5cclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NQZXJjZW50LFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZCxcclxuICAgICAgICAgICAgICBwZXJjZW50OnByZWNlbnRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgfSApXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiuvue9ruW9k+WJjei/m+W6pueahOmhtemdouaVsOaNrlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgdGhpcy5nZXRDbGFzc0NoYXB0ZXIoKTtcclxuICAgIH1cclxuICB9XHJcbiJdfQ==