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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsidGVzdE1peGluIiwiZGF0YSIsIm1peGluIiwibWV0aG9kcyIsInRhcCIsImNvbnNvbGUiLCJsb2ciLCJ2YWx1ZSIsInllYXIiLCJwYXJzZUludCIsIm1vbnRoIiwicHJpemVTdHIiLCJyZXBsYWNlIiwic2Vjb25kcyIsImpvaW4iLCJkYXRlIiwiRGF0ZSIsInNlcGVyYXRvcjEiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwic3RyRGF0ZSIsImdldERhdGUiLCJjdXJyZW50ZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxJLEdBQU87QUFDTEMsYUFBTztBQURGLEssUUFHUEMsTyxHQUFVO0FBQ1JDLFNBRFEsaUJBQ0Q7QUFDTCxhQUFLRixLQUFMLEdBQWEsd0JBQWI7QUFDQUcsZ0JBQVFDLEdBQVIsQ0FBWSxrQkFBWjtBQUNEO0FBSk8sSzs7Ozs7aUNBT0dDLEssRUFBTTtBQUNULFVBQUlDLE9BQU9DLFNBQVNGLFFBQU0sRUFBZixFQUFrQixFQUFsQixDQUFYO0FBQ0EsVUFBSUcsUUFBUUgsUUFBUSxFQUFwQjtBQUNBLFVBQUlDLE9BQU8sQ0FBUCxJQUFZRSxTQUFTLENBQXpCLEVBQTRCO0FBQ3hCLGVBQVVGLElBQVY7QUFDSDtBQUNELGFBQU9BLE9BQU8sQ0FBUCxHQUFjQSxJQUFkLGNBQXNCRSxLQUF0QixvQkFBcUNBLEtBQXJDLGlCQUFQO0FBQ1A7OztpQ0FFWUgsSyxFQUFNO0FBQ2pCLFVBQUcsQ0FBQ0EsS0FBSixFQUFVO0FBQ1IsZUFBTyxFQUFQO0FBQ0Q7QUFDRCxVQUFJSSxXQUFZSixRQUFRLEVBQXhCO0FBQ0EsYUFBT0ksU0FBU0MsT0FBVCxDQUFpQixhQUFqQixFQUErQixJQUEvQixDQUFQO0FBQ0Q7OzttQ0FFY0MsTyxFQUFRO0FBQ3JCLGFBQU8sQ0FDR0osU0FBU0ksVUFBVSxFQUFWLEdBQWUsRUFBeEIsQ0FESCxFQUVHSixTQUFTSSxVQUFVLEVBQVYsR0FBZSxFQUF4QixDQUZILEVBR0dKLFNBQVNJLFVBQVUsRUFBbkIsQ0FISCxFQUlDQyxJQUpELENBSU0sR0FKTixFQUlXRixPQUpYLENBSW1CLFdBSm5CLEVBSWdDLEtBSmhDLENBQVA7QUFLRDs7OzZCQUVNO0FBQ1BQLGNBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0Q7Ozs2QkFFUTtBQUNQRCxjQUFRQyxHQUFSLENBQVksY0FBWjtBQUNEOztBQUVEOzs7O3FDQUNrQlMsSSxFQUFPO0FBQ25CLFVBQUlBLE9BQU9BLFFBQVEsSUFBSUMsSUFBSixFQUFuQjtBQUNBLFVBQUlDLGFBQWEsR0FBakI7QUFDQSxVQUFJVCxPQUFPTyxLQUFLRyxXQUFMLEVBQVg7QUFDQSxVQUFJUixRQUFRSyxLQUFLSSxRQUFMLEtBQWtCLENBQTlCO0FBQ0EsVUFBSUMsVUFBVUwsS0FBS00sT0FBTCxFQUFkO0FBQ0EsVUFBSVgsU0FBUyxDQUFULElBQWNBLFNBQVMsQ0FBM0IsRUFBOEI7QUFDMUJBLGdCQUFRLE1BQU1BLEtBQWQ7QUFDSDtBQUNELFVBQUlVLFdBQVcsQ0FBWCxJQUFnQkEsV0FBVyxDQUEvQixFQUFrQztBQUM5QkEsa0JBQVUsTUFBTUEsT0FBaEI7QUFDSDtBQUNELFVBQUlFLGNBQWNkLE9BQU9TLFVBQVAsR0FBb0JQLEtBQXBCLEdBQTRCTyxVQUE1QixHQUF5Q0csT0FBM0Q7QUFDQSxhQUFPRSxXQUFQO0FBQ0g7Ozs7RUEzRGtDLGVBQUtwQixLOztrQkFBdkJGLFMiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0ZXN0TWl4aW4gZXh0ZW5kcyB3ZXB5Lm1peGluIHtcclxuICBkYXRhID0ge1xyXG4gICAgbWl4aW46ICdUaGlzIGlzIG1peGluIGRhdGEuJ1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgdGFwICgpIHtcclxuICAgICAgdGhpcy5taXhpbiA9ICdtaXhpbiBkYXRhIHdhcyBjaGFuZ2VkJ1xyXG4gICAgICBjb25zb2xlLmxvZygnbWl4aW4gbWV0aG9kIHRhcCcpXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgfVxyXG4gIGZvcm1hdGVNb250aCh2YWx1ZSl7XHJcbiAgICAgICAgICAgIGxldCB5ZWFyID0gcGFyc2VJbnQodmFsdWUvMTIsMTApO1xyXG4gICAgICAgICAgICBsZXQgbW9udGggPSB2YWx1ZSAlIDEyO1xyXG4gICAgICAgICAgICBpZiggeWVhciA+IDAgJiYgbW9udGggPT0gMCApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3llYXJ95bm0YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4geWVhciA+IDAgPyBgJHt5ZWFyfeW5tCR7bW9udGh95Liq5pyIYCA6IGAke21vbnRofeS4quaciGA7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybWF0ZU1vbmV5KHZhbHVlKXtcclxuICAgICAgaWYoIXZhbHVlKXtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHByaXplU3RyID0gIHZhbHVlICsgXCJcIjtcclxuICAgICAgcmV0dXJuIHByaXplU3RyLnJlcGxhY2UoL14oXFxkKylcXC4wKyQvLFwiJDFcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNlY29uZHNGb3JtYXRlKHNlY29uZHMpe1xyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoc2Vjb25kcyAvIDYwIC8gNjApLFxyXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoc2Vjb25kcyAvIDYwICUgNjApLFxyXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoc2Vjb25kcyAlIDYwKVxyXG4gICAgICAgICAgICBdLmpvaW4oXCI6XCIpLnJlcGxhY2UoL1xcYihcXGQpXFxiL2csIFwiMCQxXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgb25TaG93KCkge1xyXG4gICAgY29uc29sZS5sb2coJ21peGluIG9uU2hvdycpXHJcbiAgfVxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnbWl4aW4gb25Mb2FkJylcclxuICB9XHJcblxyXG4gIC8qIOW9k+WJjeaXtumXtOagvOW8j+WMliAqL1xyXG4gIGdldE5vd0Zvcm1hdERhdGUoIGRhdGUgKSB7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBkYXRlIHx8IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdmFyIHNlcGVyYXRvcjEgPSBcIi1cIjtcclxuICAgICAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgIHZhciBzdHJEYXRlID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgaWYgKG1vbnRoID49IDEgJiYgbW9udGggPD0gOSkge1xyXG4gICAgICAgICAgICBtb250aCA9IFwiMFwiICsgbW9udGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdHJEYXRlID49IDAgJiYgc3RyRGF0ZSA8PSA5KSB7XHJcbiAgICAgICAgICAgIHN0ckRhdGUgPSBcIjBcIiArIHN0ckRhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdXJyZW50ZGF0ZSA9IHllYXIgKyBzZXBlcmF0b3IxICsgbW9udGggKyBzZXBlcmF0b3IxICsgc3RyRGF0ZTtcclxuICAgICAgICByZXR1cm4gY3VycmVudGRhdGU7XHJcbiAgICB9XHJcbn1cclxuIl19