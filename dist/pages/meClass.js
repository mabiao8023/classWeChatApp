'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _config = require('./../config/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'getMeClassList',
        value: function getMeClassList() {
            var _this2 = this;

            wx.showLoading({
                title: '获取中...'
            });
            _wepy2.default.request({
                url: _config2.default.userClass,
                method: "GET",
                header: {
                    'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
                }
            }).then(function (res) {
                wx.hideLoading();
                _this2.classList = res.data.data;
                _this2.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            this.getMeClassList();
        }
    }]);

    return Index;
}(_wepy2.default.page);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.config = {
        navigationBarTitleText: 'test'
    };
    this.components = {};
    this.mixins = [_test2.default];
    this.data = {
        classList: []
    };
    this.computed = {};
    this.methods = {};
    this.events = {
        'index-emit': function indexEmit() {
            var _ref2;

            var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
            console.log(_this3.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
        }
    };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/meClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lQ2xhc3MuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJyZXF1ZXN0IiwidXJsIiwidXNlckNsYXNzIiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsImhpZGVMb2FkaW5nIiwiY2xhc3NMaXN0IiwicmVzIiwiZGF0YSIsIiRhcHBseSIsImdldE1lQ2xhc3NMaXN0IiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwiJGV2ZW50IiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUNBNkJIO0FBQUE7O0FBQ1pDLGVBQUdDLFdBQUgsQ0FBZTtBQUNiQyx1QkFBTztBQURNLGFBQWY7QUFHQSwyQkFBS0MsT0FBTCxDQUFhO0FBQ1RDLHFCQUFJLGlCQUFRQyxTQURIO0FBRVRDLHdCQUFPLEtBRkU7QUFHVEMsd0JBQVE7QUFDTiw4QkFBVTtBQURKO0FBSEMsYUFBYixFQU1LQyxJQU5MLENBTVcsZUFBTztBQUNkUixtQkFBR1MsV0FBSDtBQUNBLHVCQUFLQyxTQUFMLEdBQWlCQyxJQUFJQyxJQUFKLENBQVNBLElBQTFCO0FBQ0EsdUJBQUtDLE1BQUw7QUFDRCxhQVZIO0FBV0g7OztpQ0FFUTtBQUNMLGlCQUFLQyxjQUFMO0FBQ0g7Ozs7RUFoRGdDLGVBQUtDLEk7Ozs7O1NBQ3RDQyxNLEdBQVM7QUFDUEMsZ0NBQXdCO0FBRGpCLEs7U0FJVEMsVSxHQUFhLEU7U0FHYkMsTSxHQUFTLGdCO1NBRVRQLEksR0FBTztBQUNMRixtQkFBVTtBQURMLEs7U0FJUFUsUSxHQUFXLEU7U0FJWEMsTyxHQUFVLEU7U0FJVkMsTSxHQUFTO0FBQ1Asc0JBQWMscUJBQWE7QUFBQTs7QUFDekIsZ0JBQUlDLGtCQUFjLFVBQUtDLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBQyxvQkFBUUMsR0FBUixDQUFlLE9BQUtDLEtBQXBCLGlCQUFxQ0osT0FBT0ssSUFBNUMsY0FBeURMLE9BQU9NLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRDtBQUpNLEs7OztrQkF0QlU1QixLIiwiZmlsZSI6Im1lQ2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAndGVzdCdcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgY2xhc3NMaXN0OltdXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNZUNsYXNzTGlzdCgpe1xyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn6I635Y+W5LitLi4uJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLnVzZXJDbGFzcyxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdCA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0TWVDbGFzc0xpc3QoKTtcclxuICAgIH0gXHJcbiAgfVxyXG4iXX0=