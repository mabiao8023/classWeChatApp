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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJjb250YWN0IiwibWl4aW5zIiwiZGF0YSIsImNsYXNzSWQiLCJjbGFzc0luZm8iLCJ2aWRlbyIsInNyYyIsImlzSGFzVmlkZW8iLCJjaGFwdGVyTGlzdCIsImxlc3Nvbkxlbmd0aCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvdG9BaXJjbGUiLCJhaXJ0Y2xlSWQiLCJzZXRQcm9ncmVzcyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInBsYXlWaWRlbyIsImxlc3NvbiIsInJlc291cmNlIiwicGxheWluZyIsInJlc291cmNlX2lkIiwibWVkaWFfdXJsIiwiJGFwcGx5IiwiZXZlbnRzIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInJlcXVlc3QiLCJ1c2VyQ2hhcHRlciIsIm1ldGhvZCIsImNsYXNzX2lkIiwiaGVhZGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzZXNzaW9uSUQiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJyZXMiLCJjaGFwdGVyIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsImkiLCJ2YWwyIiwibWVkaWFfdGltZSIsInNlY29uZHNGb3JtYXRlIiwiY29uc29sZSIsImxvZyIsIm51bSIsImtleSIsInByZWNlbnQiLCJ2YWx1ZSIsImdldFN0b3JhZ2VTeW5jIiwiYWxyZWFkeSIsInNvbWUiLCJwdXNoIiwicGFyc2VJbnQiLCJzZXRTdG9yYWdlU3luYyIsInRvdGFsIiwiZSIsImxlYXJuX3BlcmNlbnQiLCJjbGFzc1BlcmNlbnQiLCJwZXJjZW50Iiwib3B0aW9ucyIsImlkIiwiZ2V0Q2xhc3NDaGFwdGVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBRjJDOzs7SUFHdEJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFT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O0FBQ0RNLGFBQUcyQyxjQUFILENBQWtCUixHQUFsQixFQUF1QixFQUFDUyxPQUFNLEtBQUtsRCxZQUFaLEVBQXlCNkMsU0FBUSxDQUFDTCxHQUFELENBQWpDLEVBQXZCO0FBQ0FFLG9CQUFVTSxTQUFTLElBQUUsS0FBS2hELFlBQVAsR0FBc0IsR0FBL0IsQ0FBVjtBQUNIO0FBQ0YsT0FkRCxDQWNFLE9BQU9tRCxDQUFQLEVBQVU7QUFDVjtBQUNEO0FBQ0QsV0FBS3hELFNBQUwsQ0FBZXlELGFBQWYsR0FBK0JWLE9BQS9COztBQUVBLHFCQUFLdkIsT0FBTCxDQUFhO0FBQ1BYLGFBQUksaUJBQVE2QyxZQURMO0FBRVBoQyxnQkFBTyxNQUZBO0FBR1A1QixjQUFLO0FBQ0g2QixvQkFBUyxLQUFLNUIsT0FEWDtBQUVINEQsbUJBQVFaO0FBRkwsU0FIRTtBQU9QbkIsZ0JBQVE7QUFDTixtQ0FBdUIsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUR6QztBQVBELE9BQWIsRUFVT0MsSUFWUCxDQVVhLGVBQU8sQ0FDakIsQ0FYSDtBQWFEOztBQUVEOzs7OzJCQUVPNEIsTyxFQUFTO0FBQ2QsV0FBSzdELE9BQUwsR0FBZTZELFFBQVFDLEVBQXZCO0FBQ0EsV0FBS0MsZUFBTDtBQUNEOzs7O0VBL0hnQyxlQUFLQyxJOztrQkFBbkJ2RSxLIiwiZmlsZSI6ImNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxyXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpJznjKvotrPnkIMtLeivvueoi+mmlumhtSdcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIGNvbnRhY3Q6Q29udGFjdFxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgY2xhc3NJZDo4LFxyXG4gICAgICBjbGFzc0luZm86e30sXHJcbiAgICAgIHZpZGVvOntcclxuICAgICAgICBzcmM6JydcclxuICAgICAgfSxcclxuICAgICAgaXNIYXNWaWRlbzpmYWxzZSxcclxuICAgICAgY2hhcHRlckxpc3Q6W10sXHJcbiAgICAgIGxlc3Nvbkxlbmd0aDowLFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBnb3RvQWlyY2xlKGFpcnRjbGVJZCl7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyggYWlydGNsZUlkICk7XHJcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9haXJ0aWNsZT9pZD0ke2FpcnRjbGVJZH1gXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgcGxheVZpZGVvKGxlc3Nvbil7XHJcbiAgICAgICAgdGhpcy5pc0hhc1ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICBsZXNzb24ucmVzb3VyY2UucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyggbGVzc29uLnJlc291cmNlX2lkICk7XHJcbiAgICAgICAgdGhpcy52aWRlby5zcmMgPSBsZXNzb24ucmVzb3VyY2UubWVkaWFfdXJsO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvZ3Jlc3MoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xhc3NDaGFwdGVyKCl7XHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn6I635Y+W5LitLi4uJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLnVzZXJDaGFwdGVyLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgIGlmKCBkYXRhLmNoYXB0ZXIubGVuZ3RoICl7XHJcbiAgICAgICAgICAgICAgICAgIGRhdGEuY2hhcHRlci5mb3JFYWNoKCAodmFsLGkpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbDIucmVzb3VyY2UucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUgPSB2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUgJiYgdGhpcy5zZWNvbmRzRm9ybWF0ZSh2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmxlc3Nvbkxlbmd0aCsrO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNoYXB0ZXJMaXN0ID0gZGF0YS5jaGFwdGVyO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2hhcHRlckxpc3QpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jbGFzc0luZm8gPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfSApXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyDorr7nva7mnKzlnLDov5vluqbliLDmnKzlnLBcclxuICAgIHNldFByb2dyZXNzKCBudW0gKXtcclxuICAgICAgbGV0IGtleSAgPSB0aGlzLmNsYXNzSWQgKyAnJztcclxuICAgICAgbGV0IHByZWNlbnQgPSAwO1xyXG4gICAgICAvLyDliKTmlq3lvZPliY3nvJPlrZjmnInmsqHmnInov5vluqZcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB3eC5nZXRTdG9yYWdlU3luYyhrZXkpO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXR1cm4gdmFsdWVcclxuICAgICAgICAgICAgaWYoIXZhbHVlLmFscmVhZHkuc29tZSggdmFsID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gdmFsID09IG51bSBcclxuICAgICAgICAgICAgfSApKXtcclxuICAgICAgICAgICAgICAgIHZhbHVlLmFscmVhZHkucHVzaChudW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZWNlbnQgPSBwYXJzZUludCh2YWx1ZS5hbHJlYWR5Lmxlbmd0aC90aGlzLmxlc3Nvbkxlbmd0aCAqIDEwMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKGtleSwge3RvdGFsOnRoaXMubGVzc29uTGVuZ3RoLGFscmVhZHk6W251bV19KTtcclxuICAgICAgICAgICAgcHJlY2VudCA9IHBhcnNlSW50KDEvdGhpcy5sZXNzb25MZW5ndGggKiAxMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aGVuIGNhdGNoIGVycm9yXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jbGFzc0luZm8ubGVhcm5fcGVyY2VudCA9IHByZWNlbnQ7XHJcblxyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BlcmNlbnQsXHJcbiAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkLFxyXG4gICAgICAgICAgICAgIHBlcmNlbnQ6cHJlY2VudFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgfSApXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiuvue9ruW9k+WJjei/m+W6pueahOmhtemdouaVsOaNrlxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuY2xhc3NJZCA9IG9wdGlvbnMuaWQ7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NDaGFwdGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=