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
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/class'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJjb250YWN0IiwiQ29udGFjdCIsIm1peGlucyIsInRlc3RNaXhpbiIsImRhdGEiLCJjbGFzc0lkIiwiY2xhc3NJbmZvIiwidmlkZW8iLCJzcmMiLCJpc0hhc1ZpZGVvIiwiY2hhcHRlckxpc3QiLCJsZXNzb25MZW5ndGgiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb3RvQWlyY2xlIiwiYWlydGNsZUlkIiwic2V0UHJvZ3Jlc3MiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwbGF5VmlkZW8iLCJsZXNzb24iLCJyZXNvdXJjZSIsInBsYXlpbmciLCJyZXNvdXJjZV9pZCIsIm1lZGlhX3VybCIsIiRhcHBseSIsImV2ZW50cyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJ3ZXB5IiwicmVxdWVzdCIsImFwaVBhdGgiLCJ1c2VyQ2hhcHRlciIsIm1ldGhvZCIsImNsYXNzX2lkIiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzZXNzaW9uSUQiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJyZXMiLCJjaGFwdGVyIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsImkiLCJ2YWwyIiwibWVkaWFfdGltZSIsInNlY29uZHNGb3JtYXRlIiwiY29uc29sZSIsImxvZyIsIm51bSIsImtleSIsInByZWNlbnQiLCJ2YWx1ZSIsImdldFN0b3JhZ2VTeW5jIiwiYWxyZWFkeSIsInNvbWUiLCJwdXNoIiwicGFyc2VJbnQiLCJzZXRTdG9yYWdlU3luYyIsInRvdGFsIiwiZSIsImxlYXJuX3BlcmNlbnQiLCJjbGFzc1BlcmNlbnQiLCJwZXJjZW50Iiwib3B0aW9ucyIsImlkIiwiZ2V0Q2xhc3NDaGFwdGVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBRjJD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ZCxNQUFkLEdBQXFCLEtBQUtqQyxZQUExQixHQUF5QyxHQUFsRCxDQUFWO0FBQ0gsU0FSRCxNQVFLO0FBQ0RNLGFBQUc2QyxjQUFILENBQWtCUixHQUFsQixFQUF1QixFQUFDUyxPQUFNLEtBQUtwRCxZQUFaLEVBQXlCK0MsU0FBUSxDQUFDTCxHQUFELENBQWpDLEVBQXZCO0FBQ0FFLG9CQUFVTSxTQUFTLElBQUUsS0FBS2xELFlBQVAsR0FBc0IsR0FBL0IsQ0FBVjtBQUNIO0FBQ0YsT0FkRCxDQWNFLE9BQU9xRCxDQUFQLEVBQVU7QUFDVjtBQUNEO0FBQ0QsV0FBSzFELFNBQUwsQ0FBZTJELGFBQWYsR0FBK0JWLE9BQS9COztBQUVBekIscUJBQUtDLE9BQUwsQ0FBYTtBQUNQWixhQUFJYSxpQkFBUWtDLFlBREw7QUFFUGhDLGdCQUFPLE1BRkE7QUFHUDlCLGNBQUs7QUFDSCtCLG9CQUFTLEtBQUs5QixPQURYO0FBRUg4RCxtQkFBUVo7QUFGTCxTQUhFO0FBT1BuQixnQkFBUTtBQUNOLDBCQUFnQixtQ0FEVjtBQUVOLG1DQUF1QixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDO0FBRnpDO0FBUEQsT0FBYixFQVdPQyxJQVhQLENBV2EsZUFBTyxDQUNqQixDQVpIO0FBY0Q7O0FBRUQ7Ozs7MkJBRU80QixPLEVBQVM7QUFDZCxXQUFLL0QsT0FBTCxHQUFlK0QsUUFBUUMsRUFBdkI7QUFDQSxXQUFLQyxlQUFMO0FBQ0Q7Ozs7RUFoSWdDeEMsZUFBS3lDLEk7O2tCQUFuQjNFLEsiLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpJznjKvotrPnkIMtLeivvueoi+mmlumhtSdcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGNvbnRhY3Q6Q29udGFjdFxuICAgIH1cblxuICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgY2xhc3NJZDo4LFxuICAgICAgY2xhc3NJbmZvOnt9LFxuICAgICAgdmlkZW86e1xuICAgICAgICBzcmM6JydcbiAgICAgIH0sXG4gICAgICBpc0hhc1ZpZGVvOmZhbHNlLFxuICAgICAgY2hhcHRlckxpc3Q6W10sXG4gICAgICBsZXNzb25MZW5ndGg6MCxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb3RvQWlyY2xlKGFpcnRjbGVJZCl7XG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoIGFpcnRjbGVJZCApO1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9haXJ0aWNsZT9pZD0ke2FpcnRjbGVJZH1gXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgcGxheVZpZGVvKGxlc3Nvbil7XG4gICAgICAgIHRoaXMuaXNIYXNWaWRlbyA9IHRydWU7XG4gICAgICAgIGxlc3Nvbi5yZXNvdXJjZS5wbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyggbGVzc29uLnJlc291cmNlX2lkICk7XG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gbGVzc29uLnJlc291cmNlLm1lZGlhX3VybDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgIFxuICAgIH1cblxuICAgIGdldFByb2dyZXNzKCl7XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzc0NoYXB0ZXIoKXtcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+iOt+WPluS4rS4uLicsXG4gICAgICAgIH0pXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6YXBpUGF0aC51c2VyQ2hhcHRlcixcbiAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICB9XG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgICAgIGlmKCBkYXRhLmNoYXB0ZXIubGVuZ3RoICl7XG4gICAgICAgICAgICAgICAgICBkYXRhLmNoYXB0ZXIuZm9yRWFjaCggKHZhbCxpKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFsLmxlc3Nvbi5mb3JFYWNoKCB2YWwyID0+IHtcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lID0gdmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lICYmIHRoaXMuc2Vjb25kc0Zvcm1hdGUodmFsMi5yZXNvdXJjZS5tZWRpYV90aW1lKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubGVzc29uTGVuZ3RoKys7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuY2hhcHRlckxpc3QgPSBkYXRhLmNoYXB0ZXI7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2hhcHRlckxpc3QpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNsYXNzSW5mbyA9IGRhdGE7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIH0gKVxuICAgIH1cblxuXG5cbiAgICAvLyDorr7nva7mnKzlnLDov5vluqbliLDmnKzlnLBcbiAgICBzZXRQcm9ncmVzcyggbnVtICl7XG4gICAgICBsZXQga2V5ICA9IHRoaXMuY2xhc3NJZCArICcnO1xuICAgICAgbGV0IHByZWNlbnQgPSAwO1xuICAgICAgLy8g5Yik5pat5b2T5YmN57yT5a2Y5pyJ5rKh5pyJ6L+b5bqmXG4gICAgICB0cnkge1xuICAgICAgICB2YXIgdmFsdWUgPSB3eC5nZXRTdG9yYWdlU3luYyhrZXkpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgaWYoIXZhbHVlLmFscmVhZHkuc29tZSggdmFsID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbCA9PSBudW0gXG4gICAgICAgICAgICB9ICkpe1xuICAgICAgICAgICAgICAgIHZhbHVlLmFscmVhZHkucHVzaChudW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlY2VudCA9IHBhcnNlSW50KHZhbHVlLmFscmVhZHkubGVuZ3RoL3RoaXMubGVzc29uTGVuZ3RoICogMTAwKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhrZXksIHt0b3RhbDp0aGlzLmxlc3Nvbkxlbmd0aCxhbHJlYWR5OltudW1dfSk7XG4gICAgICAgICAgICBwcmVjZW50ID0gcGFyc2VJbnQoMS90aGlzLmxlc3Nvbkxlbmd0aCAqIDEwMCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdoZW4gY2F0Y2ggZXJyb3JcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xhc3NJbmZvLmxlYXJuX3BlcmNlbnQgPSBwcmVjZW50O1xuXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOmFwaVBhdGguY2xhc3NQZXJjZW50LFxuICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgIGNsYXNzX2lkOnRoaXMuY2xhc3NJZCxcbiAgICAgICAgICAgICAgcGVyY2VudDpwcmVjZW50XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6IGBQSFBTRVNTSUQ9JHt0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXNzaW9uSUR9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgIH0gKVxuXG4gICAgfVxuXG4gICAgLy8g6K6+572u5b2T5YmN6L+b5bqm55qE6aG16Z2i5pWw5o2uXG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgdGhpcy5jbGFzc0lkID0gb3B0aW9ucy5pZDtcbiAgICAgIHRoaXMuZ2V0Q2xhc3NDaGFwdGVyKCk7XG4gICAgfVxuICB9XG4iXX0=