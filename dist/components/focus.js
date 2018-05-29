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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvY3VzLmpzIl0sIm5hbWVzIjpbIkNvbnRhY3QiLCJkYXRhIiwiaXNTaG93IiwiZXZlbnRzIiwibWV0aG9kcyIsImdvdG9zeCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInNob3dGb2N1cyIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFFbkJDLEksR0FBTztBQUNMQyxjQUFRO0FBREgsSyxRQUlQQyxNLEdBQVMsRSxRQUlUQyxPLEdBQVU7QUFDUkMsWUFEUSxvQkFDQTtBQUNMQyxXQUFHQyxVQUFILENBQWM7QUFDWEM7QUFEVyxTQUFkO0FBR0YsT0FMTztBQU1SQyxlQU5RLHVCQU1HO0FBQ1QsYUFBS1AsTUFBTCxHQUFjLENBQUMsS0FBS0EsTUFBcEI7QUFDRDtBQVJPLEs7Ozs7RUFWeUJRLGVBQUtDLFM7O2tCQUFyQlgsTyIsImZpbGUiOiJmb2N1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgLy8gaW1wb3J0IGFiYyBmcm9tICdhYmMnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgaXNTaG93OiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICBcclxuICAgIH1cclxuICAgICAgXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBnb3Rvc3goKXtcclxuICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9zaGFpeHVhbmBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIHNob3dGb2N1cygpe1xyXG4gICAgICAgIHRoaXMuaXNTaG93ID0gIXRoaXMuaXNTaG93O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=