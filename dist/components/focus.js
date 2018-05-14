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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Contact.__proto__ || Object.getPrototypeOf(Contact)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      isShow: false
    }, _this.events = {}, _this.methods = {
      gotosx: function gotosx() {
        wx.navigateTo({
          url: '/pages/shaixuan'
        });
      },
      showFocus: function showFocus() {
        this.isShow = !this.isShow;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Contact;
}(_wepy2.default.component);

exports.default = Contact;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvY3VzLmpzIl0sIm5hbWVzIjpbIkNvbnRhY3QiLCJkYXRhIiwiaXNTaG93IiwiZXZlbnRzIiwibWV0aG9kcyIsImdvdG9zeCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInNob3dGb2N1cyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7QUFDQTs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUVuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFESCxLLFFBSVBDLE0sR0FBUyxFLFFBSVRDLE8sR0FBVTtBQUNSQyxZQURRLG9CQUNBO0FBQ0xDLFdBQUdDLFVBQUgsQ0FBYztBQUNYQztBQURXLFNBQWQ7QUFHRixPQUxPO0FBTVJDLGVBTlEsdUJBTUc7QUFDVCxhQUFLUCxNQUFMLEdBQWMsQ0FBQyxLQUFLQSxNQUFwQjtBQUNEO0FBUk8sSzs7OztFQVZ5QixlQUFLUSxTOztrQkFBckJWLE8iLCJmaWxlIjoiZm9jdXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIC8vIGltcG9ydCBhYmMgZnJvbSAnYWJjJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGlzU2hvdzogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgZ290b3N4KCl7XHJcbiAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvc2hhaXh1YW5gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBzaG93Rm9jdXMoKXtcclxuICAgICAgICB0aGlzLmlzU2hvdyA9ICF0aGlzLmlzU2hvdztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19