'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./../config/config.js');

var _config2 = _interopRequireDefault(_config);

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
            list: []
        }, _this.events = {}, _this.methods = {
            gotosx: function gotosx() {
                wx.navigateTo({
                    url: '/pages/shaixuan'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Contact, [{
        key: 'getFooterData',


        /* 获取页脚tab的数据 */
        value: function getFooterData() {
            var _this2 = this;

            return _wepy2.default.request({ url: _config2.default.footerList,
                header: {
                    'Authorization': '' + this.$parent.$parent.globalData.token
                } }).then(function (res) {
                _this2.list = res.data.data.list;
                _this2.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            this.getFooterData();
        }
    }]);

    return Contact;
}(_wepy2.default.component);

exports.default = Contact;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5qcyJdLCJuYW1lcyI6WyJDb250YWN0IiwiZGF0YSIsImxpc3QiLCJldmVudHMiLCJtZXRob2RzIiwiZ290b3N4Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmVxdWVzdCIsImZvb3Rlckxpc3QiLCJoZWFkZXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInRva2VuIiwidGhlbiIsInJlcyIsIiRhcHBseSIsImdldEZvb3RlckRhdGEiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBRUM7Ozs7Ozs7Ozs7O0FBREQ7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBRW5CQyxJLEdBQU87QUFDSEMsa0JBQUs7QUFERixTLFFBSVBDLE0sR0FBUyxFLFFBSVRDLE8sR0FBVTtBQUNSQyxrQkFEUSxvQkFDQTtBQUNMQyxtQkFBR0MsVUFBSCxDQUFjO0FBQ1hDO0FBRFcsaUJBQWQ7QUFHRjtBQUxPLFM7Ozs7Ozs7QUFRVjt3Q0FDaUI7QUFBQTs7QUFDWCxtQkFBTyxlQUFLQyxPQUFMLENBQWEsRUFBQ0QsS0FBSSxpQkFBUUUsVUFBYjtBQUNmQyx3QkFBUTtBQUNMLDBDQUFvQixLQUFLQyxPQUFMLENBQWFBLE9BQWIsQ0FBcUJDLFVBQXJCLENBQWdDQztBQUQvQyxpQkFETyxFQUFiLEVBSUpDLElBSkksQ0FJRSxlQUFPO0FBQ1YsdUJBQUtiLElBQUwsR0FBWWMsSUFBSWYsSUFBSixDQUFTQSxJQUFULENBQWNDLElBQTFCO0FBQ0EsdUJBQUtlLE1BQUw7QUFDSCxhQVBJLENBQVA7QUFRSDs7O2lDQUVLO0FBQ04saUJBQUtDLGFBQUw7QUFDRDs7OztFQWhDa0MsZUFBS0MsUzs7a0JBQXJCbkIsTyIsImZpbGUiOiJmb290ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIC8vIGltcG9ydCBhYmMgZnJvbSAnYWJjJ1xyXG4gICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsaXN0OltdXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBnb3Rvc3goKXtcclxuICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9zaGFpeHVhbmBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgLyog6I635Y+W6aG16ISadGFi55qE5pWw5o2uICovXHJcbiAgICAgIGdldEZvb3RlckRhdGEoKXtcclxuICAgICAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe3VybDphcGlQYXRoLmZvb3Rlckxpc3QsXHJcbiAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGAke3RoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW59YFxyXG4gICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgfVxyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICB0aGlzLmdldEZvb3RlckRhdGEoKTtcclxuICAgIH1cclxuICB9XHJcbiJdfQ==