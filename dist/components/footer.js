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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5qcyJdLCJuYW1lcyI6WyJDb250YWN0IiwiZGF0YSIsImV2ZW50cyIsIm1ldGhvZHMiLCJnb3Rvc3giLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFFbkJDLEksR0FBTyxFLFFBSVBDLE0sR0FBUyxFLFFBSVRDLE8sR0FBVTtBQUNSQyxZQURRLG9CQUNBO0FBQ0xDLFdBQUdDLFVBQUgsQ0FBYztBQUNYQztBQURXLFNBQWQ7QUFHRjtBQUxPLEs7Ozs7RUFWeUIsZUFBS0MsUzs7a0JBQXJCUixPIiwiZmlsZSI6ImZvb3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgLy8gaW1wb3J0IGFiYyBmcm9tICdhYmMnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcblxyXG4gICAgZGF0YSA9IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGdvdG9zeCgpe1xyXG4gICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL3NoYWl4dWFuYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19