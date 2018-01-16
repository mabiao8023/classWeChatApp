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

            _wepy2.default.request({
                url: _config2.default.userClass,
                method: "GET",
                header: {
                    'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
                }
            }).then(function (res) {
                _this2.classList = res.data.data;
                _this2.$apply();
            }).catch(function (e) {
                _this2.layer(e);
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
    this.methods = {
        gotoClassIndex: function gotoClassIndex(id) {
            wx.navigateTo({
                url: '/pages/class?id=' + id
            });
        }
    };
    this.events = {
        'index-emit': function indexEmit() {
            var _ref2;

            var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
            console.log(_this3.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
        }
    };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/meClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lQ2xhc3MuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJyZXF1ZXN0IiwidXJsIiwidXNlckNsYXNzIiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsImNsYXNzTGlzdCIsInJlcyIsImRhdGEiLCIkYXBwbHkiLCJjYXRjaCIsImxheWVyIiwiZSIsImdldE1lQ2xhc3NMaXN0IiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ290b0NsYXNzSW5kZXgiLCJpZCIsInd4IiwibmF2aWdhdGVUbyIsImV2ZW50cyIsIiRldmVudCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lDQWlDSDtBQUFBOztBQUNaLDJCQUFLQyxPQUFMLENBQWE7QUFDVEMscUJBQUksaUJBQVFDLFNBREg7QUFFVEMsd0JBQU8sS0FGRTtBQUdUQyx3QkFBUTtBQUNOLDhCQUFVO0FBREo7QUFIQyxhQUFiLEVBTUtDLElBTkwsQ0FNVyxlQUFPO0FBQ2QsdUJBQUtDLFNBQUwsR0FBaUJDLElBQUlDLElBQUosQ0FBU0EsSUFBMUI7QUFDQSx1QkFBS0MsTUFBTDtBQUNELGFBVEgsRUFTTUMsS0FUTixDQVNhLGFBQUs7QUFBQyx1QkFBS0MsS0FBTCxDQUFXQyxDQUFYO0FBQWMsYUFUakM7QUFVSDs7O2lDQUVRO0FBQ0wsaUJBQUtDLGNBQUw7QUFDSDs7OztFQWhEZ0MsZUFBS0MsSTs7Ozs7U0FDdENDLE0sR0FBUztBQUNQQyxnQ0FBd0I7QUFEakIsSztTQUlUQyxVLEdBQWEsRTtTQUdiQyxNLEdBQVMsZ0I7U0FFVFYsSSxHQUFPO0FBQ0xGLG1CQUFVO0FBREwsSztTQUlQYSxRLEdBQVcsRTtTQUlYQyxPLEdBQVU7QUFDUkMsc0JBRFEsMEJBQ09DLEVBRFAsRUFDVTtBQUNoQkMsZUFBR0MsVUFBSCxDQUFjO0FBQ1Z2QiwwQ0FBd0JxQjtBQURkLGFBQWQ7QUFHRDtBQUxPLEs7U0FRVkcsTSxHQUFTO0FBQ1Asc0JBQWMscUJBQWE7QUFBQTs7QUFDekIsZ0JBQUlDLGtCQUFjLFVBQUtDLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBQyxvQkFBUUMsR0FBUixDQUFlLE9BQUtDLEtBQXBCLGlCQUFxQ0osT0FBT0ssSUFBNUMsY0FBeURMLE9BQU9NLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRDtBQUpNLEs7OztrQkExQlUvQixLIiwiZmlsZSI6Im1lQ2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXHJcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAndGVzdCdcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgY2xhc3NMaXN0OltdXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGdvdG9DbGFzc0luZGV4KGlkKXtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzP2lkPSR7aWR9YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNZUNsYXNzTGlzdCgpe1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDphcGlQYXRoLnVzZXJDbGFzcyxcclxuICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb29raWUnOiAnUEhQU0VTU0lEPTdvZ2o5dGVka21rN25uMm5tZzlwZ250Z3U1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gKS50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdCA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9ICkuY2F0Y2goIGUgPT4ge3RoaXMubGF5ZXIoZSl9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0TWVDbGFzc0xpc3QoKTtcclxuICAgIH0gXHJcbiAgfVxyXG4iXX0=