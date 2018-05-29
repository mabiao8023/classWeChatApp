'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var testMixin = function (_wepy$mixin) {
  _inherits(testMixin, _wepy$mixin);

  function testMixin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, testMixin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = testMixin.__proto__ || Object.getPrototypeOf(testMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      mixin: 'This is mixin data.'
    }, _this.methods = {
      tap: function tap() {
        this.mixin = 'mixin data was changed';
        console.log('mixin method tap');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(testMixin, [{
    key: 'formateMonth',
    value: function formateMonth(value) {
      var year = parseInt(value / 12, 10);
      var month = value % 12;
      if (year > 0 && month == 0) {
        return year + '\u5E74';
      }
      return year > 0 ? year + '\u5E74' + month + '\u4E2A\u6708' : month + '\u4E2A\u6708';
    }
  }, {
    key: 'formateMoney',
    value: function formateMoney(value) {
      if (!value) {
        return '';
      }
      var prizeStr = value + "";
      return prizeStr.replace(/^(\d+)\.0+$/, "$1");
    }
  }, {
    key: 'secondsFormate',
    value: function secondsFormate(seconds) {
      return [parseInt(seconds / 60 / 60), parseInt(seconds / 60 % 60), parseInt(seconds % 60)].join(":").replace(/\b(\d)\b/g, "0$1");
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      console.log('mixin onShow');
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log('mixin onLoad');
    }

    /* 当前时间格式化 */

  }, {
    key: 'getNowFormatDate',
    value: function getNowFormatDate(date) {
      var date = date || new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  }]);

  return testMixin;
}(_wepy2.default.mixin);

exports.default = testMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsidGVzdE1peGluIiwiZGF0YSIsIm1peGluIiwibWV0aG9kcyIsInRhcCIsImNvbnNvbGUiLCJsb2ciLCJ2YWx1ZSIsInllYXIiLCJwYXJzZUludCIsIm1vbnRoIiwicHJpemVTdHIiLCJyZXBsYWNlIiwic2Vjb25kcyIsImpvaW4iLCJkYXRlIiwiRGF0ZSIsInNlcGVyYXRvcjEiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwic3RyRGF0ZSIsImdldERhdGUiLCJjdXJyZW50ZGF0ZSIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSSxHQUFPO0FBQ0xDLGFBQU87QUFERixLLFFBR1BDLE8sR0FBVTtBQUNSQyxTQURRLGlCQUNEO0FBQ0wsYUFBS0YsS0FBTCxHQUFhLHdCQUFiO0FBQ0FHLGdCQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDRDtBQUpPLEs7Ozs7O2lDQU9HQyxLLEVBQU07QUFDVCxVQUFJQyxPQUFPQyxTQUFTRixRQUFNLEVBQWYsRUFBa0IsRUFBbEIsQ0FBWDtBQUNBLFVBQUlHLFFBQVFILFFBQVEsRUFBcEI7QUFDQSxVQUFJQyxPQUFPLENBQVAsSUFBWUUsU0FBUyxDQUF6QixFQUE0QjtBQUN4QixlQUFVRixJQUFWO0FBQ0g7QUFDRCxhQUFPQSxPQUFPLENBQVAsR0FBY0EsSUFBZCxjQUFzQkUsS0FBdEIsb0JBQXFDQSxLQUFyQyxpQkFBUDtBQUNQOzs7aUNBRVlILEssRUFBTTtBQUNqQixVQUFHLENBQUNBLEtBQUosRUFBVTtBQUNSLGVBQU8sRUFBUDtBQUNEO0FBQ0QsVUFBSUksV0FBWUosUUFBUSxFQUF4QjtBQUNBLGFBQU9JLFNBQVNDLE9BQVQsQ0FBaUIsYUFBakIsRUFBK0IsSUFBL0IsQ0FBUDtBQUNEOzs7bUNBRWNDLE8sRUFBUTtBQUNyQixhQUFPLENBQ0dKLFNBQVNJLFVBQVUsRUFBVixHQUFlLEVBQXhCLENBREgsRUFFR0osU0FBU0ksVUFBVSxFQUFWLEdBQWUsRUFBeEIsQ0FGSCxFQUdHSixTQUFTSSxVQUFVLEVBQW5CLENBSEgsRUFJQ0MsSUFKRCxDQUlNLEdBSk4sRUFJV0YsT0FKWCxDQUltQixXQUpuQixFQUlnQyxLQUpoQyxDQUFQO0FBS0Q7Ozs2QkFFTTtBQUNQUCxjQUFRQyxHQUFSLENBQVksY0FBWjtBQUNEOzs7NkJBRVE7QUFDUEQsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDRDs7QUFFRDs7OztxQ0FDa0JTLEksRUFBTztBQUNuQixVQUFJQSxPQUFPQSxRQUFRLElBQUlDLElBQUosRUFBbkI7QUFDQSxVQUFJQyxhQUFhLEdBQWpCO0FBQ0EsVUFBSVQsT0FBT08sS0FBS0csV0FBTCxFQUFYO0FBQ0EsVUFBSVIsUUFBUUssS0FBS0ksUUFBTCxLQUFrQixDQUE5QjtBQUNBLFVBQUlDLFVBQVVMLEtBQUtNLE9BQUwsRUFBZDtBQUNBLFVBQUlYLFNBQVMsQ0FBVCxJQUFjQSxTQUFTLENBQTNCLEVBQThCO0FBQzFCQSxnQkFBUSxNQUFNQSxLQUFkO0FBQ0g7QUFDRCxVQUFJVSxXQUFXLENBQVgsSUFBZ0JBLFdBQVcsQ0FBL0IsRUFBa0M7QUFDOUJBLGtCQUFVLE1BQU1BLE9BQWhCO0FBQ0g7QUFDRCxVQUFJRSxjQUFjZCxPQUFPUyxVQUFQLEdBQW9CUCxLQUFwQixHQUE0Qk8sVUFBNUIsR0FBeUNHLE9BQTNEO0FBQ0EsYUFBT0UsV0FBUDtBQUNIOzs7O0VBM0RrQ0MsZUFBS3JCLEs7O2tCQUF2QkYsUyIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRlc3RNaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xyXG4gIGRhdGEgPSB7XHJcbiAgICBtaXhpbjogJ1RoaXMgaXMgbWl4aW4gZGF0YS4nXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICB0YXAgKCkge1xyXG4gICAgICB0aGlzLm1peGluID0gJ21peGluIGRhdGEgd2FzIGNoYW5nZWQnXHJcbiAgICAgIGNvbnNvbGUubG9nKCdtaXhpbiBtZXRob2QgdGFwJylcclxuICAgIH0sXHJcbiAgICBcclxuICB9XHJcbiAgZm9ybWF0ZU1vbnRoKHZhbHVlKXtcclxuICAgICAgICAgICAgbGV0IHllYXIgPSBwYXJzZUludCh2YWx1ZS8xMiwxMCk7XHJcbiAgICAgICAgICAgIGxldCBtb250aCA9IHZhbHVlICUgMTI7XHJcbiAgICAgICAgICAgIGlmKCB5ZWFyID4gMCAmJiBtb250aCA9PSAwICl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7eWVhcn3lubRgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFyID4gMCA/IGAke3llYXJ95bm0JHttb250aH3kuKrmnIhgIDogYCR7bW9udGh95Liq5pyIYDtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtYXRlTW9uZXkodmFsdWUpe1xyXG4gICAgICBpZighdmFsdWUpe1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfVxyXG4gICAgICB2YXIgcHJpemVTdHIgPSAgdmFsdWUgKyBcIlwiO1xyXG4gICAgICByZXR1cm4gcHJpemVTdHIucmVwbGFjZSgvXihcXGQrKVxcLjArJC8sXCIkMVwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2Vjb25kc0Zvcm1hdGUoc2Vjb25kcyl7XHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBwYXJzZUludChzZWNvbmRzIC8gNjAgLyA2MCksXHJcbiAgICAgICAgICAgICAgICBwYXJzZUludChzZWNvbmRzIC8gNjAgJSA2MCksXHJcbiAgICAgICAgICAgICAgICBwYXJzZUludChzZWNvbmRzICUgNjApXHJcbiAgICAgICAgICAgIF0uam9pbihcIjpcIikucmVwbGFjZSgvXFxiKFxcZClcXGIvZywgXCIwJDFcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICBvblNob3coKSB7XHJcbiAgICBjb25zb2xlLmxvZygnbWl4aW4gb25TaG93JylcclxuICB9XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdtaXhpbiBvbkxvYWQnKVxyXG4gIH1cclxuXHJcbiAgLyog5b2T5YmN5pe26Ze05qC85byP5YyWICovXHJcbiAgZ2V0Tm93Rm9ybWF0RGF0ZSggZGF0ZSApIHtcclxuICAgICAgICB2YXIgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGUoKTtcclxuICAgICAgICB2YXIgc2VwZXJhdG9yMSA9IFwiLVwiO1xyXG4gICAgICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgdmFyIHN0ckRhdGUgPSBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICBpZiAobW9udGggPj0gMSAmJiBtb250aCA8PSA5KSB7XHJcbiAgICAgICAgICAgIG1vbnRoID0gXCIwXCIgKyBtb250aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0ckRhdGUgPj0gMCAmJiBzdHJEYXRlIDw9IDkpIHtcclxuICAgICAgICAgICAgc3RyRGF0ZSA9IFwiMFwiICsgc3RyRGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnRkYXRlID0geWVhciArIHNlcGVyYXRvcjEgKyBtb250aCArIHNlcGVyYXRvcjEgKyBzdHJEYXRlO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50ZGF0ZTtcclxuICAgIH1cclxufVxyXG4iXX0=