'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import abc from 'abc'

var Contact = function (_wepy$component) {
  _inherits(Contact, _wepy$component);

  function Contact() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Contact);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Contact.__proto__ || Object.getPrototypeOf(Contact)).call.apply(_ref, [this].concat(args))), _this), _this.data = {}, _this.events = {}, _this.methods = {
      gotosx: function gotosx() {
        wx.navigateTo({
          url: '/pages/shaixuan'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Contact;
}(_wepy2.default.component);

exports.default = Contact;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3QuanMiXSwibmFtZXMiOlsiQ29udGFjdCIsImRhdGEiLCJldmVudHMiLCJtZXRob2RzIiwiZ290b3N4Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztBQUNBOztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBRW5CQyxJLEdBQU8sRSxRQUlQQyxNLEdBQVMsRSxRQUlUQyxPLEdBQVU7QUFDUkMsWUFEUSxvQkFDQTtBQUNMQyxXQUFHQyxVQUFILENBQWM7QUFDWEM7QUFEVyxTQUFkO0FBR0Y7QUFMTyxLOzs7O0VBVnlCLGVBQUtDLFM7O2tCQUFyQlIsTyIsImZpbGUiOiJjb250YWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICAvLyBpbXBvcnQgYWJjIGZyb20gJ2FiYydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFjdCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuXHJcbiAgICBkYXRhID0ge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgZ290b3N4KCl7XHJcbiAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvc2hhaXh1YW5gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=