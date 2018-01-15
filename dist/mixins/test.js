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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsidGVzdE1peGluIiwiZGF0YSIsIm1peGluIiwibWV0aG9kcyIsInRhcCIsImNvbnNvbGUiLCJsb2ciLCJ2YWx1ZSIsInllYXIiLCJwYXJzZUludCIsIm1vbnRoIiwicHJpemVTdHIiLCJyZXBsYWNlIiwic2Vjb25kcyIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSSxHQUFPO0FBQ0xDLGFBQU87QUFERixLLFFBR1BDLE8sR0FBVTtBQUNSQyxTQURRLGlCQUNEO0FBQ0wsYUFBS0YsS0FBTCxHQUFhLHdCQUFiO0FBQ0FHLGdCQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDRDtBQUpPLEs7Ozs7O2lDQU9HQyxLLEVBQU07QUFDVCxVQUFJQyxPQUFPQyxTQUFTRixRQUFNLEVBQWYsRUFBa0IsRUFBbEIsQ0FBWDtBQUNBLFVBQUlHLFFBQVFILFFBQVEsRUFBcEI7QUFDQSxVQUFJQyxPQUFPLENBQVAsSUFBWUUsU0FBUyxDQUF6QixFQUE0QjtBQUN4QixlQUFVRixJQUFWO0FBQ0g7QUFDRCxhQUFPQSxPQUFPLENBQVAsR0FBY0EsSUFBZCxjQUFzQkUsS0FBdEIsb0JBQXFDQSxLQUFyQyxpQkFBUDtBQUNQOzs7aUNBRVlILEssRUFBTTtBQUNqQixVQUFHLENBQUNBLEtBQUosRUFBVTtBQUNSLGVBQU8sRUFBUDtBQUNEO0FBQ0QsVUFBSUksV0FBWUosUUFBUSxFQUF4QjtBQUNBLGFBQU9JLFNBQVNDLE9BQVQsQ0FBaUIsYUFBakIsRUFBK0IsSUFBL0IsQ0FBUDtBQUNEOzs7bUNBRWNDLE8sRUFBUTtBQUNyQixhQUFPLENBQ0dKLFNBQVNJLFVBQVUsRUFBVixHQUFlLEVBQXhCLENBREgsRUFFR0osU0FBU0ksVUFBVSxFQUFWLEdBQWUsRUFBeEIsQ0FGSCxFQUdHSixTQUFTSSxVQUFVLEVBQW5CLENBSEgsRUFJQ0MsSUFKRCxDQUlNLEdBSk4sRUFJV0YsT0FKWCxDQUltQixXQUpuQixFQUlnQyxLQUpoQyxDQUFQO0FBS0Q7Ozs2QkFFTTtBQUNQUCxjQUFRQyxHQUFSLENBQVksY0FBWjtBQUNEOzs7NkJBRVE7QUFDUEQsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDRDs7OztFQTFDb0MsZUFBS0osSzs7a0JBQXZCRixTIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGVzdE1peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XHJcbiAgZGF0YSA9IHtcclxuICAgIG1peGluOiAnVGhpcyBpcyBtaXhpbiBkYXRhLidcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHRhcCAoKSB7XHJcbiAgICAgIHRoaXMubWl4aW4gPSAnbWl4aW4gZGF0YSB3YXMgY2hhbmdlZCdcclxuICAgICAgY29uc29sZS5sb2coJ21peGluIG1ldGhvZCB0YXAnKVxyXG4gICAgfSxcclxuICAgIFxyXG4gIH1cclxuICBmb3JtYXRlTW9udGgodmFsdWUpe1xyXG4gICAgICAgICAgICBsZXQgeWVhciA9IHBhcnNlSW50KHZhbHVlLzEyLDEwKTtcclxuICAgICAgICAgICAgbGV0IG1vbnRoID0gdmFsdWUgJSAxMjtcclxuICAgICAgICAgICAgaWYoIHllYXIgPiAwICYmIG1vbnRoID09IDAgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHt5ZWFyfeW5tGA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHllYXIgPiAwID8gYCR7eWVhcn3lubQke21vbnRofeS4quaciGAgOiBgJHttb250aH3kuKrmnIhgO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1hdGVNb25leSh2YWx1ZSl7XHJcbiAgICAgIGlmKCF2YWx1ZSl7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBwcml6ZVN0ciA9ICB2YWx1ZSArIFwiXCI7XHJcbiAgICAgIHJldHVybiBwcml6ZVN0ci5yZXBsYWNlKC9eKFxcZCspXFwuMCskLyxcIiQxXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZWNvbmRzRm9ybWF0ZShzZWNvbmRzKXtcclxuICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHBhcnNlSW50KHNlY29uZHMgLyA2MCAvIDYwKSxcclxuICAgICAgICAgICAgICAgIHBhcnNlSW50KHNlY29uZHMgLyA2MCAlIDYwKSxcclxuICAgICAgICAgICAgICAgIHBhcnNlSW50KHNlY29uZHMgJSA2MClcclxuICAgICAgICAgICAgXS5qb2luKFwiOlwiKS5yZXBsYWNlKC9cXGIoXFxkKVxcYi9nLCBcIjAkMVwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gIG9uU2hvdygpIHtcclxuICAgIGNvbnNvbGUubG9nKCdtaXhpbiBvblNob3cnKVxyXG4gIH1cclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgY29uc29sZS5sb2coJ21peGluIG9uTG9hZCcpXHJcbiAgfVxyXG59XHJcbiJdfQ==