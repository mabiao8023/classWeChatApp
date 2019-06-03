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
  }]);

  return testMixin;
}(_wepy2.default.mixin);

exports.default = testMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsidGVzdE1peGluIiwiZGF0YSIsIm1peGluIiwibWV0aG9kcyIsInRhcCIsImNvbnNvbGUiLCJsb2ciLCJ2YWx1ZSIsInllYXIiLCJwYXJzZUludCIsIm1vbnRoIiwicHJpemVTdHIiLCJyZXBsYWNlIiwic2Vjb25kcyIsImpvaW4iLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEksR0FBTztBQUNMQyxhQUFPO0FBREYsSyxRQUdQQyxPLEdBQVU7QUFDUkMsU0FEUSxpQkFDRDtBQUNMLGFBQUtGLEtBQUwsR0FBYSx3QkFBYjtBQUNBRyxnQkFBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0Q7QUFKTyxLOzs7OztpQ0FPR0MsSyxFQUFNO0FBQ1QsVUFBSUMsT0FBT0MsU0FBU0YsUUFBTSxFQUFmLEVBQWtCLEVBQWxCLENBQVg7QUFDQSxVQUFJRyxRQUFRSCxRQUFRLEVBQXBCO0FBQ0EsVUFBSUMsT0FBTyxDQUFQLElBQVlFLFNBQVMsQ0FBekIsRUFBNEI7QUFDeEIsZUFBVUYsSUFBVjtBQUNIO0FBQ0QsYUFBT0EsT0FBTyxDQUFQLEdBQWNBLElBQWQsY0FBc0JFLEtBQXRCLG9CQUFxQ0EsS0FBckMsaUJBQVA7QUFDUDs7O2lDQUVZSCxLLEVBQU07QUFDakIsVUFBRyxDQUFDQSxLQUFKLEVBQVU7QUFDUixlQUFPLEVBQVA7QUFDRDtBQUNELFVBQUlJLFdBQVlKLFFBQVEsRUFBeEI7QUFDQSxhQUFPSSxTQUFTQyxPQUFULENBQWlCLGFBQWpCLEVBQStCLElBQS9CLENBQVA7QUFDRDs7O21DQUVjQyxPLEVBQVE7QUFDckIsYUFBTyxDQUNHSixTQUFTSSxVQUFVLEVBQVYsR0FBZSxFQUF4QixDQURILEVBRUdKLFNBQVNJLFVBQVUsRUFBVixHQUFlLEVBQXhCLENBRkgsRUFHR0osU0FBU0ksVUFBVSxFQUFuQixDQUhILEVBSUNDLElBSkQsQ0FJTSxHQUpOLEVBSVdGLE9BSlgsQ0FJbUIsV0FKbkIsRUFJZ0MsS0FKaEMsQ0FBUDtBQUtEOzs7NkJBRU07QUFDUFAsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDRDs7OzZCQUVRO0FBQ1BELGNBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0Q7Ozs7RUExQ29DUyxlQUFLYixLOztrQkFBdkJGLFMiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRlc3RNaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xuICBkYXRhID0ge1xuICAgIG1peGluOiAnVGhpcyBpcyBtaXhpbiBkYXRhLidcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHRhcCAoKSB7XG4gICAgICB0aGlzLm1peGluID0gJ21peGluIGRhdGEgd2FzIGNoYW5nZWQnXG4gICAgICBjb25zb2xlLmxvZygnbWl4aW4gbWV0aG9kIHRhcCcpXG4gICAgfSxcbiAgICBcbiAgfVxuICBmb3JtYXRlTW9udGgodmFsdWUpe1xuICAgICAgICAgICAgbGV0IHllYXIgPSBwYXJzZUludCh2YWx1ZS8xMiwxMCk7XG4gICAgICAgICAgICBsZXQgbW9udGggPSB2YWx1ZSAlIDEyO1xuICAgICAgICAgICAgaWYoIHllYXIgPiAwICYmIG1vbnRoID09IDAgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7eWVhcn3lubRgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHllYXIgPiAwID8gYCR7eWVhcn3lubQke21vbnRofeS4quaciGAgOiBgJHttb250aH3kuKrmnIhgO1xuICAgIH1cblxuICAgIGZvcm1hdGVNb25leSh2YWx1ZSl7XG4gICAgICBpZighdmFsdWUpe1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICB2YXIgcHJpemVTdHIgPSAgdmFsdWUgKyBcIlwiO1xuICAgICAgcmV0dXJuIHByaXplU3RyLnJlcGxhY2UoL14oXFxkKylcXC4wKyQvLFwiJDFcIik7XG4gICAgfVxuICAgIFxuICAgIHNlY29uZHNGb3JtYXRlKHNlY29uZHMpe1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBwYXJzZUludChzZWNvbmRzIC8gNjAgLyA2MCksXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoc2Vjb25kcyAvIDYwICUgNjApLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KHNlY29uZHMgJSA2MClcbiAgICAgICAgICAgIF0uam9pbihcIjpcIikucmVwbGFjZSgvXFxiKFxcZClcXGIvZywgXCIwJDFcIik7XG4gICAgfVxuICAgIFxuICBvblNob3coKSB7XG4gICAgY29uc29sZS5sb2coJ21peGluIG9uU2hvdycpXG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coJ21peGluIG9uTG9hZCcpXG4gIH1cbn1cbiJdfQ==