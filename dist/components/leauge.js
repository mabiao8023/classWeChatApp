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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Contact.__proto__ || Object.getPrototypeOf(Contact)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      list: {
        type: Array,
        default: []
      }
    }, _this.data = {}, _this.events = {}, _this.methods = {
      cancel: function cancel() {
        this.$emit('league-cancel');
      },
      gotosx: function gotosx() {
        wx.navigateTo({
          url: '/pages/shaixuan'
        });
      },
      choice: function choice(index) {
        this.list[index].checked = !this.list[index].checked;
      },
      allin: function allin() {
        this.list.forEach(function (val) {
          val.checked = true;
        });
      },
      allout: function allout() {
        this.list.forEach(function (val) {
          val.checked = false;
        });
      },
      sure: function sure() {
        var leagueIds = [];
        this.list.forEach(function (val) {
          if (val.checked == true) {
            leagueIds.push(val.id);
          }
        });
        this.$emit('league-emit', leagueIds);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Contact, [{
    key: 'onLoad',
    value: function onLoad() {
      // this.list.forEach( val => {
      // 	val.checked = true;
      // } )
    }
  }]);

  return Contact;
}(_wepy2.default.component);

exports.default = Contact;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxlYXVnZS5qcyJdLCJuYW1lcyI6WyJDb250YWN0IiwicHJvcHMiLCJsaXN0IiwidHlwZSIsIkFycmF5IiwiZGVmYXVsdCIsImRhdGEiLCJldmVudHMiLCJtZXRob2RzIiwiY2FuY2VsIiwiJGVtaXQiLCJnb3Rvc3giLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjaG9pY2UiLCJpbmRleCIsImNoZWNrZWQiLCJhbGxpbiIsImZvckVhY2giLCJ2YWwiLCJhbGxvdXQiLCJzdXJlIiwibGVhZ3VlSWRzIiwicHVzaCIsImlkIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDcEJDLEssR0FBUTtBQUNQQyxZQUFLO0FBQ0pDLGNBQU1DLEtBREY7QUFFSkMsaUJBQVE7QUFGSjtBQURFLEssUUFPUEMsSSxHQUFPLEUsUUFHUEMsTSxHQUFTLEUsUUFJVEMsTyxHQUFVO0FBQ1JDLFlBRFEsb0JBQ0E7QUFDTixhQUFLQyxLQUFMLENBQVcsZUFBWDtBQUNELE9BSE87QUFJUkMsWUFKUSxvQkFJQTtBQUNMQyxXQUFHQyxVQUFILENBQWM7QUFDWEM7QUFEVyxTQUFkO0FBR0YsT0FSTztBQVNSQyxZQVRRLGtCQVNEQyxLQVRDLEVBU0s7QUFDWixhQUFLZCxJQUFMLENBQVVjLEtBQVYsRUFBaUJDLE9BQWpCLEdBQTJCLENBQUMsS0FBS2YsSUFBTCxDQUFVYyxLQUFWLEVBQWlCQyxPQUE3QztBQUNBLE9BWE87QUFZUkMsV0FaUSxtQkFZRDtBQUNOLGFBQUtoQixJQUFMLENBQVVpQixPQUFWLENBQW1CLGVBQU87QUFDekJDLGNBQUlILE9BQUosR0FBYyxJQUFkO0FBQ0EsU0FGRDtBQUdBLE9BaEJPO0FBaUJSSSxZQWpCUSxvQkFpQkE7QUFDUCxhQUFLbkIsSUFBTCxDQUFVaUIsT0FBVixDQUFtQixlQUFPO0FBQ3pCQyxjQUFJSCxPQUFKLEdBQWMsS0FBZDtBQUNBLFNBRkQ7QUFHQSxPQXJCTztBQXNCUkssVUF0QlEsa0JBc0JGO0FBQ0wsWUFBSUMsWUFBWSxFQUFoQjtBQUNBLGFBQUtyQixJQUFMLENBQVVpQixPQUFWLENBQW1CLGVBQU87QUFDekIsY0FBSUMsSUFBSUgsT0FBSixJQUFlLElBQW5CLEVBQXlCO0FBQ3hCTSxzQkFBVUMsSUFBVixDQUFlSixJQUFJSyxFQUFuQjtBQUNBO0FBRUQsU0FMRDtBQU1BLGFBQUtmLEtBQUwsQ0FBVyxhQUFYLEVBQXlCYSxTQUF6QjtBQUNBO0FBL0JPLEs7Ozs7OzZCQWtDQTtBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7O0VBckRrQyxlQUFLRyxTOztrQkFBckIxQixPIiwiZmlsZSI6ImxlYXVnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgLy8gaW1wb3J0IGFiYyBmcm9tICdhYmMnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgXHRwcm9wcyA9IHtcclxuICBcdFx0bGlzdDp7XHJcbiAgXHRcdFx0dHlwZTogQXJyYXksXHJcbiAgXHRcdFx0ZGVmYXVsdDpbXVxyXG4gIFx0XHR9XHJcbiAgXHR9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgXHRcdFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGNhbmNlbCgpe1xyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2xlYWd1ZS1jYW5jZWwnKTtcclxuICAgICAgfSxcclxuICAgICAgZ290b3N4KCl7XHJcbiAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvc2hhaXh1YW5gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBjaG9pY2UoaW5kZXgpe1xyXG4gICAgICBcdHRoaXMubGlzdFtpbmRleF0uY2hlY2tlZCA9ICF0aGlzLmxpc3RbaW5kZXhdLmNoZWNrZWQ7XHJcbiAgICAgIH0sXHJcbiAgICAgIGFsbGluKCl7XHJcbiAgICAgIFx0dGhpcy5saXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgIFx0XHR2YWwuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgIFx0fSApXHJcbiAgICAgIH0sXHJcbiAgICAgIGFsbG91dCgpe1xyXG4gICAgICBcdHRoaXMubGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICBcdFx0dmFsLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgXHR9IClcclxuICAgICAgfSxcclxuICAgICAgc3VyZSgpe1xyXG4gICAgICBcdGxldCBsZWFndWVJZHMgPSBbXTtcclxuICAgICAgXHR0aGlzLmxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgXHRcdGlmKCB2YWwuY2hlY2tlZCA9PSB0cnVlICl7XHJcbiAgICAgIFx0XHRcdGxlYWd1ZUlkcy5wdXNoKHZhbC5pZClcdFxyXG4gICAgICBcdFx0fVxyXG4gICAgICBcdFx0XHJcbiAgICAgIFx0fSApXHJcbiAgICAgIFx0dGhpcy4kZW1pdCgnbGVhZ3VlLWVtaXQnLGxlYWd1ZUlkcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgXHQvLyB0aGlzLmxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgIFx0Ly8gXHR2YWwuY2hlY2tlZCA9IHRydWU7XHJcbiAgICBcdC8vIH0gKVxyXG4gICAgfVxyXG4gIH1cclxuIl19