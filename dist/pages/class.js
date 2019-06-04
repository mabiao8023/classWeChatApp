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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJjb250YWN0IiwiQ29udGFjdCIsIm1peGlucyIsInRlc3RNaXhpbiIsImRhdGEiLCJjbGFzc0lkIiwiY2xhc3NJbmZvIiwidmlkZW8iLCJzcmMiLCJpc0hhc1ZpZGVvIiwiY2hhcHRlckxpc3QiLCJsZXNzb25MZW5ndGgiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb3RvQWlyY2xlIiwiYWlydGNsZUlkIiwic2V0UHJvZ3Jlc3MiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwbGF5VmlkZW8iLCJsZXNzb24iLCJpbmRleCIsImlkeCIsImZvckVhY2giLCJ2YWwiLCJ2YWwyIiwicmVzb3VyY2UiLCJwbGF5aW5nIiwicmVzb3VyY2VfaWQiLCJtZWRpYV91cmwiLCIkYXBwbHkiLCJldmVudHMiLCJzaG93TG9hZGluZyIsInRpdGxlIiwid2VweSIsInJlcXVlc3QiLCJhcGlQYXRoIiwidXNlckNoYXB0ZXIiLCJtZXRob2QiLCJjbGFzc19pZCIsImhlYWRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2Vzc2lvbklEIiwidGhlbiIsImhpZGVMb2FkaW5nIiwicmVzIiwiY2hhcHRlciIsImxlbmd0aCIsImkiLCJtZWRpYV90aW1lIiwic2Vjb25kc0Zvcm1hdGUiLCJjb25zb2xlIiwibG9nIiwibnVtIiwia2V5IiwicHJlY2VudCIsInZhbHVlIiwiZ2V0U3RvcmFnZVN5bmMiLCJhbHJlYWR5Iiwic29tZSIsInB1c2giLCJwYXJzZUludCIsInNldFN0b3JhZ2VTeW5jIiwidG90YWwiLCJlIiwibGVhcm5fcGVyY2VudCIsImNsYXNzUGVyY2VudCIsInBlcmNlbnQiLCJvcHRpb25zIiwiaWQiLCJnZXRDbGFzc0NoYXB0ZXIiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUYyQzs7O0lBR3RCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWE7QUFDWEMsZUFBUUM7QUFERyxLLFFBSWJDLE0sR0FBUyxDQUFDQyxjQUFELEMsUUFFVEMsSSxHQUFPO0FBQ0xDLGVBQVEsQ0FESDtBQUVMQyxpQkFBVSxFQUZMO0FBR0xDLGFBQU07QUFDSkMsYUFBSTtBQURBLE9BSEQ7QUFNTEMsa0JBQVcsS0FOTjtBQU9MQyxtQkFBWSxFQVBQO0FBUUxDLG9CQUFhO0FBUlIsSyxRQVdQQyxRLEdBQVcsRSxRQUlYQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLFNBREgsRUFDYTtBQUNuQixhQUFLQyxXQUFMLENBQWtCRCxTQUFsQjtBQUNBRSxXQUFHQyxVQUFILENBQWM7QUFDVkMsdUNBQTJCSjtBQURqQixTQUFkO0FBR0QsT0FOTztBQU9SSyxlQVBRLHFCQU9FQyxNQVBGLEVBT1NDLEtBUFQsRUFPZUMsR0FQZixFQU9tQjtBQUN6QixhQUFLZCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS0MsV0FBTCxDQUFpQmMsT0FBakIsQ0FBMEIsZUFBTztBQUMvQkMsY0FBSUosTUFBSixDQUFXRyxPQUFYLENBQW9CLGdCQUFRO0FBQzFCRSxpQkFBS0MsUUFBTCxDQUFjQyxPQUFkLEdBQXdCLEtBQXhCO0FBQ0QsV0FGRDtBQUdELFNBSkQ7QUFLQSxhQUFLbEIsV0FBTCxDQUFpQlksS0FBakIsRUFBd0JELE1BQXhCLENBQStCRSxHQUEvQixFQUFvQ0ksUUFBcEMsQ0FBNkNDLE9BQTdDLEdBQXVELElBQXZEO0FBQ0EsYUFBS1osV0FBTCxDQUFrQkssT0FBT1EsV0FBekI7QUFDQSxhQUFLdEIsS0FBTCxDQUFXQyxHQUFYLEdBQWlCYSxPQUFPTSxRQUFQLENBQWdCRyxTQUFqQztBQUNBLGFBQUtDLE1BQUw7QUFDRDtBQWxCTyxLLFFBcUJWQyxNLEdBQVMsRTs7Ozs7a0NBSUksQ0FFWjs7O3NDQUVnQjtBQUFBOztBQUNmZixTQUFHZ0IsV0FBSCxDQUFlO0FBQ1hDLGVBQU87QUFESSxPQUFmO0FBR0VDLHFCQUFLQyxPQUFMLENBQWE7QUFDVGpCLGFBQUlrQixpQkFBUUMsV0FESDtBQUVUQyxnQkFBTyxLQUZFO0FBR1RuQyxjQUFLO0FBQ0hvQyxvQkFBUyxLQUFLbkM7QUFEWCxTQUhJO0FBTVRvQyxnQkFBUTtBQUNOLG1DQUF1QixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDO0FBRHpDO0FBTkMsT0FBYixFQVNLQyxJQVRMLENBU1csZUFBTztBQUNkNUIsV0FBRzZCLFdBQUg7QUFDQSxZQUFJMUMsT0FBTzJDLElBQUkzQyxJQUFKLENBQVNBLElBQXBCO0FBQ0UsWUFBSUEsS0FBSzRDLE9BQUwsQ0FBYUMsTUFBakIsRUFBeUI7QUFDckI3QyxlQUFLNEMsT0FBTCxDQUFheEIsT0FBYixDQUFzQixVQUFDQyxHQUFELEVBQUt5QixDQUFMLEVBQVc7QUFDbkN6QixnQkFBSUosTUFBSixDQUFXRyxPQUFYLENBQW9CLGdCQUFRO0FBQzFCRSxtQkFBS0MsUUFBTCxDQUFjQyxPQUFkLEdBQXdCLEtBQXhCO0FBQ0FGLG1CQUFLQyxRQUFMLENBQWN3QixVQUFkLEdBQTJCekIsS0FBS0MsUUFBTCxDQUFjd0IsVUFBZCxJQUE0QixPQUFLQyxjQUFMLENBQW9CMUIsS0FBS0MsUUFBTCxDQUFjd0IsVUFBbEMsQ0FBdkQ7QUFDQSxxQkFBS3hDLFlBQUw7QUFDRCxhQUpEO0FBS0QsV0FORztBQU9KLGlCQUFLRCxXQUFMLEdBQW1CTixLQUFLNEMsT0FBeEI7QUFDQUssa0JBQVFDLEdBQVIsQ0FBWSxPQUFLNUMsV0FBakI7QUFDRDtBQUNELGVBQUtKLFNBQUwsR0FBaUJGLElBQWpCO0FBQ0EsZUFBSzJCLE1BQUw7QUFDRCxPQXpCSDtBQTBCSDs7QUFJRDs7OztnQ0FDYXdCLEcsRUFBSztBQUNoQixVQUFJQyxNQUFPLEtBQUtuRCxPQUFMLEdBQWUsRUFBMUI7QUFDQSxVQUFJb0QsVUFBVSxDQUFkO0FBQ0E7QUFDQSxVQUFJO0FBQ0YsWUFBSUMsUUFBUXpDLEdBQUcwQyxjQUFILENBQWtCSCxHQUFsQixDQUFaO0FBQ0EsWUFBSUUsS0FBSixFQUFXO0FBQ1A7QUFDQSxjQUFHLENBQUNBLE1BQU1FLE9BQU4sQ0FBY0MsSUFBZCxDQUFvQixlQUFPO0FBQzdCLG1CQUFPcEMsT0FBTzhCLEdBQWQ7QUFDRCxXQUZHLENBQUosRUFFSTtBQUNBRyxrQkFBTUUsT0FBTixDQUFjRSxJQUFkLENBQW1CUCxHQUFuQjtBQUNIO0FBQ0RFLG9CQUFVTSxTQUFTTCxNQUFNRSxPQUFOLENBQWNYLE1BQWQsR0FBcUIsS0FBS3RDLFlBQTFCLEdBQXlDLEdBQWxELENBQVY7QUFDSCxTQVJELE1BUUs7QUFDRE0sYUFBRytDLGNBQUgsQ0FBa0JSLEdBQWxCLEVBQXVCLEVBQUNTLE9BQU0sS0FBS3RELFlBQVosRUFBeUJpRCxTQUFRLENBQUNMLEdBQUQsQ0FBakMsRUFBdkI7QUFDQUUsb0JBQVVNLFNBQVMsSUFBRSxLQUFLcEQsWUFBUCxHQUFzQixHQUEvQixDQUFWO0FBQ0g7QUFDRixPQWRELENBY0UsT0FBT3VELENBQVAsRUFBVTtBQUNWO0FBQ0Q7QUFDRCxXQUFLNUQsU0FBTCxDQUFlNkQsYUFBZixHQUErQlYsT0FBL0I7O0FBRUF0QixxQkFBS0MsT0FBTCxDQUFhO0FBQ1BqQixhQUFJa0IsaUJBQVErQixZQURMO0FBRVA3QixnQkFBTyxNQUZBO0FBR1BuQyxjQUFLO0FBQ0hvQyxvQkFBUyxLQUFLbkMsT0FEWDtBQUVIZ0UsbUJBQVFaO0FBRkwsU0FIRTtBQU9QaEIsZ0JBQVE7QUFDTiwwQkFBZ0IsbUNBRFY7QUFFTixtQ0FBdUIsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQztBQUZ6QztBQVBELE9BQWIsRUFXT0MsSUFYUCxDQVdhLGVBQU8sQ0FDakIsQ0FaSDtBQWNEOztBQUVEOzs7OzJCQUVPeUIsTyxFQUFTO0FBQ2QsV0FBS2pFLE9BQUwsR0FBZWlFLFFBQVFDLEVBQXZCO0FBQ0EsV0FBS0MsZUFBTDtBQUNEOzs7d0NBRW1CO0FBQ2QsYUFBTztBQUNQdEMsZUFBTyxRQURBO0FBRVB1QyxjQUFNLGNBRkM7QUFHUEMsa0JBQVMsdUJBSEY7QUFJUEMsaUJBQVEsaUJBQVM1QixHQUFULEVBQWM7QUFDcEI7QUFDRCxTQU5NO0FBT1A2QixjQUFNLGNBQVM3QixHQUFULEVBQWM7QUFDbEI7QUFDRDtBQVRNLE9BQVA7QUFXRDs7OztFQW5KNEJaLGVBQUswQyxJOztrQkFBbkJqRixLIiwiZmlsZSI6ImNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBDb250YWN0IGZyb20gJ0AvY29tcG9uZW50cy9jb250YWN0JyAvLyBhbGlhcyBleGFtcGxlXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5aSc54yr6Laz55CDLS3or77nqIvpppbpobUnXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb250YWN0OkNvbnRhY3RcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGNsYXNzSWQ6OCxcbiAgICAgIGNsYXNzSW5mbzp7fSxcbiAgICAgIHZpZGVvOntcbiAgICAgICAgc3JjOicnXG4gICAgICB9LFxuICAgICAgaXNIYXNWaWRlbzpmYWxzZSxcbiAgICAgIGNoYXB0ZXJMaXN0OltdLFxuICAgICAgbGVzc29uTGVuZ3RoOjAsXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ290b0FpcmNsZShhaXJ0Y2xlSWQpe1xuICAgICAgICB0aGlzLnNldFByb2dyZXNzKCBhaXJ0Y2xlSWQgKTtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvYWlydGljbGU/aWQ9JHthaXJ0Y2xlSWR9YFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBsYXlWaWRlbyhsZXNzb24saW5kZXgsaWR4KXtcbiAgICAgICAgdGhpcy5pc0hhc1ZpZGVvID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaGFwdGVyTGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xuICAgICAgICAgIHZhbC5sZXNzb24uZm9yRWFjaCggdmFsMiA9PiB7XG4gICAgICAgICAgICB2YWwyLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9IClcbiAgICAgICAgfSApXG4gICAgICAgIHRoaXMuY2hhcHRlckxpc3RbaW5kZXhdLmxlc3NvbltpZHhdLnJlc291cmNlLnBsYXlpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldFByb2dyZXNzKCBsZXNzb24ucmVzb3VyY2VfaWQgKTtcbiAgICAgICAgdGhpcy52aWRlby5zcmMgPSBsZXNzb24ucmVzb3VyY2UubWVkaWFfdXJsO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcbiAgICAgXG4gICAgfVxuXG4gICAgZ2V0UHJvZ3Jlc3MoKXtcblxuICAgIH1cblxuICAgIGdldENsYXNzQ2hhcHRlcigpe1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn6I635Y+W5LitLi4uJyxcbiAgICAgICAgfSlcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDphcGlQYXRoLnVzZXJDaGFwdGVyLFxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb29raWUnOiBgUEhQU0VTU0lEPSR7dGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2Vzc2lvbklEfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgaWYoIGRhdGEuY2hhcHRlci5sZW5ndGggKXtcbiAgICAgICAgICAgICAgICAgIGRhdGEuY2hhcHRlci5mb3JFYWNoKCAodmFsLGkpID0+IHtcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uLmZvckVhY2goIHZhbDIgPT4ge1xuICAgICAgICAgICAgICAgICAgdmFsMi5yZXNvdXJjZS5wbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUgPSB2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUgJiYgdGhpcy5zZWNvbmRzRm9ybWF0ZSh2YWwyLnJlc291cmNlLm1lZGlhX3RpbWUpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5sZXNzb25MZW5ndGgrKztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy5jaGFwdGVyTGlzdCA9IGRhdGEuY2hhcHRlcjtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jaGFwdGVyTGlzdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgfSApXG4gICAgfVxuXG5cblxuICAgIC8vIOiuvue9ruacrOWcsOi/m+W6puWIsOacrOWcsFxuICAgIHNldFByb2dyZXNzKCBudW0gKXtcbiAgICAgIGxldCBrZXkgID0gdGhpcy5jbGFzc0lkICsgJyc7XG4gICAgICBsZXQgcHJlY2VudCA9IDA7XG4gICAgICAvLyDliKTmlq3lvZPliY3nvJPlrZjmnInmsqHmnInov5vluqZcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHd4LmdldFN0b3JhZ2VTeW5jKGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICBpZighdmFsdWUuYWxyZWFkeS5zb21lKCB2YWwgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsID09IG51bSBcbiAgICAgICAgICAgIH0gKSl7XG4gICAgICAgICAgICAgICAgdmFsdWUuYWxyZWFkeS5wdXNoKG51bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmVjZW50ID0gcGFyc2VJbnQodmFsdWUuYWxyZWFkeS5sZW5ndGgvdGhpcy5sZXNzb25MZW5ndGggKiAxMDApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKGtleSwge3RvdGFsOnRoaXMubGVzc29uTGVuZ3RoLGFscmVhZHk6W251bV19KTtcbiAgICAgICAgICAgIHByZWNlbnQgPSBwYXJzZUludCgxL3RoaXMubGVzc29uTGVuZ3RoICogMTAwKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2hlbiBjYXRjaCBlcnJvclxuICAgICAgfVxuICAgICAgdGhpcy5jbGFzc0luZm8ubGVhcm5fcGVyY2VudCA9IHByZWNlbnQ7XG5cbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6YXBpUGF0aC5jbGFzc1BlcmNlbnQsXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkLFxuICAgICAgICAgICAgICBwZXJjZW50OnByZWNlbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICB9XG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcbiAgICAgICAgfSApXG5cbiAgICB9XG5cbiAgICAvLyDorr7nva7lvZPliY3ov5vluqbnmoTpobXpnaLmlbDmja5cblxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICB0aGlzLmNsYXNzSWQgPSBvcHRpb25zLmlkO1xuICAgICAgdGhpcy5nZXRDbGFzc0NoYXB0ZXIoKTtcbiAgICB9XG5cbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRpdGxlOiAn5aSc54yr6Laz5b2p6K++56iLJyxcbiAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcbiAgICAgICAgICBpbWFnZVVybDonL2ltYWdlcy9zaGFyZV9pbWcuanBnJyxcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9XG5cbiAgfVxuIl19