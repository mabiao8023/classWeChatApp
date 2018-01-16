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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiY2xhc3NJZCIsImNsYXNzSW5mbyIsInZpZGVvIiwic3JjIiwiaXNIYXNWaWRlbyIsImNoYXB0ZXJMaXN0IiwibGVzc29uTGVuZ3RoIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ290b0FpcmNsZSIsImFpcnRjbGVJZCIsInNldFByb2dyZXNzIiwiZXZlbnRzIiwicmVxdWVzdCIsInVybCIsInVzZXJDaGFwdGVyIiwibWV0aG9kIiwiY2xhc3NfaWQiLCJoZWFkZXIiLCJ0aGVuIiwicmVzIiwiY2hhcHRlciIsImxlbmd0aCIsImZvckVhY2giLCJ2YWwiLCJpIiwic2xpZGUiLCJsZXNzb24iLCJ2YWwyIiwicmVzb3VyY2UiLCJwbGF5aW5nIiwiJGFwcGx5IiwibnVtIiwia2V5IiwicHJlY2VudCIsInZhbHVlIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImFscmVhZHkiLCJzb21lIiwicHVzaCIsInBhcnNlSW50Iiwic2V0U3RvcmFnZVN5bmMiLCJ0b3RhbCIsImUiLCJsZWFybl9wZXJjZW50IiwiY2xhc3NQZXJjZW50IiwicGVyY2VudCIsImdldENsYXNzQ2hhcHRlciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUliQyxNLEdBQVMsZ0IsUUFFVEMsSSxHQUFPO0FBQ0xDLGVBQVEsQ0FESDtBQUVMQyxpQkFBVSxFQUZMO0FBR0xDLGFBQU07QUFDSkMsYUFBSTtBQURBLE9BSEQ7QUFNTEMsa0JBQVcsS0FOTjtBQU9MQyxtQkFBWSxFQVBQO0FBUUxDLG9CQUFhO0FBUlIsSyxRQVdQQyxRLEdBQVcsRSxRQUlYQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLFNBREgsRUFDYTtBQUNuQixhQUFLQyxXQUFMLENBQWtCRCxTQUFsQjtBQUNEO0FBSE8sSyxRQU9WRSxNLEdBQVMsRTs7Ozs7a0NBSUksQ0FFWjs7O3NDQUVnQjtBQUFBOztBQUNiLHFCQUFLQyxPQUFMLENBQWE7QUFDVEMsYUFBSSxpQkFBUUMsV0FESDtBQUVUQyxnQkFBTyxLQUZFO0FBR1RqQixjQUFLO0FBQ0hrQixvQkFBUyxLQUFLakI7QUFEWCxTQUhJO0FBTVRrQixnQkFBUTtBQUNOLG9CQUFVO0FBREo7QUFOQyxPQUFiLEVBU0tDLElBVEwsQ0FTVyxlQUFPO0FBQ2QsWUFBSXBCLE9BQU9xQixJQUFJckIsSUFBSixDQUFTQSxJQUFwQjtBQUNFLFlBQUlBLEtBQUtzQixPQUFMLENBQWFDLE1BQWpCLEVBQXlCO0FBQ3JCdkIsZUFBS3NCLE9BQUwsQ0FBYUUsT0FBYixDQUFzQixVQUFDQyxHQUFELEVBQUtDLENBQUwsRUFBVztBQUNuQ0QsZ0JBQUlFLEtBQUosR0FBWUQsTUFBTSxDQUFOLEdBQVcsS0FBWCxHQUFtQixJQUEvQjtBQUNBRCxnQkFBSUcsTUFBSixDQUFXSixPQUFYLENBQW9CLGdCQUFRO0FBQzFCSyxtQkFBS0MsUUFBTCxDQUFjQyxPQUFkLEdBQXdCLEtBQXhCO0FBQ0EscUJBQUt4QixZQUFMO0FBQ0QsYUFIRDtBQUlELFdBTkc7QUFPSixpQkFBS0QsV0FBTCxHQUFtQk4sS0FBS3NCLE9BQXhCO0FBQ0Q7QUFDRCxlQUFLcEIsU0FBTCxHQUFpQkYsSUFBakI7QUFDQSxlQUFLZ0MsTUFBTDtBQUNELE9BdkJIO0FBd0JIOztBQUlEOzs7O2dDQUNhQyxHLEVBQUs7QUFDaEIsVUFBSUMsTUFBTyxLQUFLakMsT0FBTCxHQUFlLEVBQTFCO0FBQ0EsVUFBSWtDLFVBQVUsQ0FBZDtBQUNBO0FBQ0EsVUFBSTtBQUNGLFlBQUlDLFFBQVFDLEdBQUdDLGNBQUgsQ0FBa0JKLEdBQWxCLENBQVo7QUFDQSxZQUFJRSxLQUFKLEVBQVc7QUFDUDtBQUNBLGNBQUcsQ0FBQ0EsTUFBTUcsT0FBTixDQUFjQyxJQUFkLENBQW9CLGVBQU87QUFDN0IsbUJBQU9mLE9BQU9RLEdBQWQ7QUFDRCxXQUZHLENBQUosRUFFSTtBQUNBRyxrQkFBTUcsT0FBTixDQUFjRSxJQUFkLENBQW1CUixHQUFuQjtBQUNIO0FBQ0RFLG9CQUFVTyxTQUFTTixNQUFNRyxPQUFOLENBQWNoQixNQUFkLEdBQXFCLEtBQUtoQixZQUExQixHQUF5QyxHQUFsRCxDQUFWO0FBQ0gsU0FSRCxNQVFLO0FBQ0Q4QixhQUFHTSxjQUFILENBQWtCVCxHQUFsQixFQUF1QixFQUFDVSxPQUFNLEtBQUtyQyxZQUFaLEVBQXlCZ0MsU0FBUSxDQUFDTixHQUFELENBQWpDLEVBQXZCO0FBQ0FFLG9CQUFVTyxTQUFTLElBQUUsS0FBS25DLFlBQVAsR0FBc0IsR0FBL0IsQ0FBVjtBQUNIO0FBQ0YsT0FkRCxDQWNFLE9BQU9zQyxDQUFQLEVBQVU7QUFDVjtBQUNEO0FBQ0QsV0FBSzNDLFNBQUwsQ0FBZTRDLGFBQWYsR0FBK0JYLE9BQS9COztBQUVBLHFCQUFLckIsT0FBTCxDQUFhO0FBQ1BDLGFBQUksaUJBQVFnQyxZQURMO0FBRVA5QixnQkFBTyxNQUZBO0FBR1BqQixjQUFLO0FBQ0hrQixvQkFBUyxLQUFLakIsT0FEWDtBQUVIK0MsbUJBQVFiO0FBRkwsU0FIRTtBQU9QaEIsZ0JBQVE7QUFDTixvQkFBVTtBQURKO0FBUEQsT0FBYixFQVVPQyxJQVZQLENBVWEsZUFBTyxDQUNqQixDQVhIO0FBYUQ7O0FBRUQ7Ozs7NkJBRVM7QUFDUCxXQUFLNkIsZUFBTDtBQUNEOzs7O0VBaEhnQyxlQUFLQyxJOztrQkFBbkJ2RCxLIiwiZmlsZSI6ImNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAndGVzdCdcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgY2xhc3NJZDo4LFxyXG4gICAgICBjbGFzc0luZm86e30sXHJcbiAgICAgIHZpZGVvOntcclxuICAgICAgICBzcmM6JydcclxuICAgICAgfSxcclxuICAgICAgaXNIYXNWaWRlbzpmYWxzZSxcclxuICAgICAgY2hhcHRlckxpc3Q6W10sXHJcbiAgICAgIGxlc3Nvbkxlbmd0aDowLFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBnb3RvQWlyY2xlKGFpcnRjbGVJZCl7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyggYWlydGNsZUlkICk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2dyZXNzKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldENsYXNzQ2hhcHRlcigpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLnVzZXJDaGFwdGVyLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgY2xhc3NfaWQ6dGhpcy5jbGFzc0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgaWYoIGRhdGEuY2hhcHRlci5sZW5ndGggKXtcclxuICAgICAgICAgICAgICAgICAgZGF0YS5jaGFwdGVyLmZvckVhY2goICh2YWwsaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsLnNsaWRlID0gaSA9PT0gMCA/ICBmYWxzZSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YWwubGVzc29uLmZvckVhY2goIHZhbDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2YWwyLnJlc291cmNlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5sZXNzb25MZW5ndGgrKztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jaGFwdGVyTGlzdCA9IGRhdGEuY2hhcHRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNsYXNzSW5mbyA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9IClcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vIOiuvue9ruacrOWcsOi/m+W6puWIsOacrOWcsFxyXG4gICAgc2V0UHJvZ3Jlc3MoIG51bSApe1xyXG4gICAgICBsZXQga2V5ICA9IHRoaXMuY2xhc3NJZCArICcnO1xyXG4gICAgICBsZXQgcHJlY2VudCA9IDA7XHJcbiAgICAgIC8vIOWIpOaWreW9k+WJjee8k+WtmOacieayoeaciei/m+W6plxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHd4LmdldFN0b3JhZ2VTeW5jKGtleSk7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICBpZighdmFsdWUuYWxyZWFkeS5zb21lKCB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiB2YWwgPT0gbnVtIFxyXG4gICAgICAgICAgICB9ICkpe1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuYWxyZWFkeS5wdXNoKG51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJlY2VudCA9IHBhcnNlSW50KHZhbHVlLmFscmVhZHkubGVuZ3RoL3RoaXMubGVzc29uTGVuZ3RoICogMTAwKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoa2V5LCB7dG90YWw6dGhpcy5sZXNzb25MZW5ndGgsYWxyZWFkeTpbbnVtXX0pO1xyXG4gICAgICAgICAgICBwcmVjZW50ID0gcGFyc2VJbnQoMS90aGlzLmxlc3Nvbkxlbmd0aCAqIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdoZW4gY2F0Y2ggZXJyb3JcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNsYXNzSW5mby5sZWFybl9wZXJjZW50ID0gcHJlY2VudDtcclxuXHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLmNsYXNzUGVyY2VudCxcclxuICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICBjbGFzc19pZDp0aGlzLmNsYXNzSWQsXHJcbiAgICAgICAgICAgICAgcGVyY2VudDpwcmVjZW50XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgIH0gKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyDorr7nva7lvZPliY3ov5vluqbnmoTpobXpnaLmlbDmja5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NDaGFwdGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=