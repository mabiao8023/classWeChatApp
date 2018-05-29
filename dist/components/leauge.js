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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxlYXVnZS5qcyJdLCJuYW1lcyI6WyJDb250YWN0IiwicHJvcHMiLCJsaXN0IiwidHlwZSIsIkFycmF5IiwiZGVmYXVsdCIsImRhdGEiLCJldmVudHMiLCJtZXRob2RzIiwiY2FuY2VsIiwiJGVtaXQiLCJnb3Rvc3giLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjaG9pY2UiLCJpbmRleCIsImNoZWNrZWQiLCJhbGxpbiIsImZvckVhY2giLCJ2YWwiLCJhbGxvdXQiLCJzdXJlIiwibGVhZ3VlSWRzIiwicHVzaCIsImlkIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztBQUNBOztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ3BCQyxLLEdBQVE7QUFDUEMsWUFBSztBQUNKQyxjQUFNQyxLQURGO0FBRUpDLGlCQUFRO0FBRko7QUFERSxLLFFBT1BDLEksR0FBTyxFLFFBR1BDLE0sR0FBUyxFLFFBSVRDLE8sR0FBVTtBQUNSQyxZQURRLG9CQUNBO0FBQ04sYUFBS0MsS0FBTCxDQUFXLGVBQVg7QUFDRCxPQUhPO0FBSVJDLFlBSlEsb0JBSUE7QUFDTEMsV0FBR0MsVUFBSCxDQUFjO0FBQ1hDO0FBRFcsU0FBZDtBQUdGLE9BUk87QUFTUkMsWUFUUSxrQkFTREMsS0FUQyxFQVNLO0FBQ1osYUFBS2QsSUFBTCxDQUFVYyxLQUFWLEVBQWlCQyxPQUFqQixHQUEyQixDQUFDLEtBQUtmLElBQUwsQ0FBVWMsS0FBVixFQUFpQkMsT0FBN0M7QUFDQSxPQVhPO0FBWVJDLFdBWlEsbUJBWUQ7QUFDTixhQUFLaEIsSUFBTCxDQUFVaUIsT0FBVixDQUFtQixlQUFPO0FBQ3pCQyxjQUFJSCxPQUFKLEdBQWMsSUFBZDtBQUNBLFNBRkQ7QUFHQSxPQWhCTztBQWlCUkksWUFqQlEsb0JBaUJBO0FBQ1AsYUFBS25CLElBQUwsQ0FBVWlCLE9BQVYsQ0FBbUIsZUFBTztBQUN6QkMsY0FBSUgsT0FBSixHQUFjLEtBQWQ7QUFDQSxTQUZEO0FBR0EsT0FyQk87QUFzQlJLLFVBdEJRLGtCQXNCRjtBQUNMLFlBQUlDLFlBQVksRUFBaEI7QUFDQSxhQUFLckIsSUFBTCxDQUFVaUIsT0FBVixDQUFtQixlQUFPO0FBQ3pCLGNBQUlDLElBQUlILE9BQUosSUFBZSxJQUFuQixFQUF5QjtBQUN4Qk0sc0JBQVVDLElBQVYsQ0FBZUosSUFBSUssRUFBbkI7QUFDQTtBQUVELFNBTEQ7QUFNQSxhQUFLZixLQUFMLENBQVcsYUFBWCxFQUF5QmEsU0FBekI7QUFDQTtBQS9CTyxLOzs7Ozs2QkFrQ0E7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7OztFQXJEa0NHLGVBQUtDLFM7O2tCQUFyQjNCLE8iLCJmaWxlIjoibGVhdWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICAvLyBpbXBvcnQgYWJjIGZyb20gJ2FiYydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFjdCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICBcdHByb3BzID0ge1xyXG4gIFx0XHRsaXN0OntcclxuICBcdFx0XHR0eXBlOiBBcnJheSxcclxuICBcdFx0XHRkZWZhdWx0OltdXHJcbiAgXHRcdH1cclxuICBcdH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICBcdFx0XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgY2FuY2VsKCl7XHJcbiAgICAgICAgdGhpcy4kZW1pdCgnbGVhZ3VlLWNhbmNlbCcpO1xyXG4gICAgICB9LFxyXG4gICAgICBnb3Rvc3goKXtcclxuICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9zaGFpeHVhbmBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIGNob2ljZShpbmRleCl7XHJcbiAgICAgIFx0dGhpcy5saXN0W2luZGV4XS5jaGVja2VkID0gIXRoaXMubGlzdFtpbmRleF0uY2hlY2tlZDtcclxuICAgICAgfSxcclxuICAgICAgYWxsaW4oKXtcclxuICAgICAgXHR0aGlzLmxpc3QuZm9yRWFjaCggdmFsID0+IHtcclxuICAgICAgXHRcdHZhbC5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgXHR9IClcclxuICAgICAgfSxcclxuICAgICAgYWxsb3V0KCl7XHJcbiAgICAgIFx0dGhpcy5saXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgIFx0XHR2YWwuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICBcdH0gKVxyXG4gICAgICB9LFxyXG4gICAgICBzdXJlKCl7XHJcbiAgICAgIFx0bGV0IGxlYWd1ZUlkcyA9IFtdO1xyXG4gICAgICBcdHRoaXMubGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgICBcdFx0aWYoIHZhbC5jaGVja2VkID09IHRydWUgKXtcclxuICAgICAgXHRcdFx0bGVhZ3VlSWRzLnB1c2godmFsLmlkKVx0XHJcbiAgICAgIFx0XHR9XHJcbiAgICAgIFx0XHRcclxuICAgICAgXHR9IClcclxuICAgICAgXHR0aGlzLiRlbWl0KCdsZWFndWUtZW1pdCcsbGVhZ3VlSWRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICBcdC8vIHRoaXMubGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xyXG4gICAgXHQvLyBcdHZhbC5jaGVja2VkID0gdHJ1ZTtcclxuICAgIFx0Ly8gfSApXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=