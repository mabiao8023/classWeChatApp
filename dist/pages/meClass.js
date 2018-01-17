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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lQ2xhc3MuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJyZXF1ZXN0IiwidXJsIiwidXNlckNsYXNzIiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsImhpZGVMb2FkaW5nIiwiY2xhc3NMaXN0IiwicmVzIiwiZGF0YSIsIiRhcHBseSIsImdldE1lQ2xhc3NMaXN0IiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ290b0NsYXNzSW5kZXgiLCJpZCIsIm5hdmlnYXRlVG8iLCJldmVudHMiLCIkZXZlbnQiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5Q0FpQ0g7QUFBQTs7QUFDWkMsZUFBR0MsV0FBSCxDQUFlO0FBQ2JDLHVCQUFPO0FBRE0sYUFBZjtBQUdBLDJCQUFLQyxPQUFMLENBQWE7QUFDVEMscUJBQUksaUJBQVFDLFNBREg7QUFFVEMsd0JBQU8sS0FGRTtBQUdUQyx3QkFBUTtBQUNOLDhCQUFVO0FBREo7QUFIQyxhQUFiLEVBTUtDLElBTkwsQ0FNVyxlQUFPO0FBQ2RSLG1CQUFHUyxXQUFIO0FBQ0EsdUJBQUtDLFNBQUwsR0FBaUJDLElBQUlDLElBQUosQ0FBU0EsSUFBMUI7QUFDQSx1QkFBS0MsTUFBTDtBQUNELGFBVkg7QUFXSDs7O2lDQUVRO0FBQ0wsaUJBQUtDLGNBQUw7QUFDSDs7OztFQXBEZ0MsZUFBS0MsSTs7Ozs7U0FDdENDLE0sR0FBUztBQUNQQyxnQ0FBd0I7QUFEakIsSztTQUlUQyxVLEdBQWEsRTtTQUdiQyxNLEdBQVMsZ0I7U0FFVFAsSSxHQUFPO0FBQ0xGLG1CQUFVO0FBREwsSztTQUlQVSxRLEdBQVcsRTtTQUlYQyxPLEdBQVU7QUFDUkMsc0JBRFEsMEJBQ09DLEVBRFAsRUFDVTtBQUNoQnZCLGVBQUd3QixVQUFILENBQWM7QUFDVnBCLDBDQUF3Qm1CO0FBRGQsYUFBZDtBQUdEO0FBTE8sSztTQVFWRSxNLEdBQVM7QUFDUCxzQkFBYyxxQkFBYTtBQUFBOztBQUN6QixnQkFBSUMsa0JBQWMsVUFBS0MsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FDLG9CQUFRQyxHQUFSLENBQWUsT0FBS0MsS0FBcEIsaUJBQXFDSixPQUFPSyxJQUE1QyxjQUF5REwsT0FBT00sTUFBUCxDQUFjRixLQUF2RTtBQUNEO0FBSk0sSzs7O2tCQTFCVS9CLEsiLCJmaWxlIjoibWVDbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICd0ZXN0J1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBjbGFzc0xpc3Q6W11cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgZ290b0NsYXNzSW5kZXgoaWQpe1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHtpZH1gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1lQ2xhc3NMaXN0KCl7XHJcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfojrflj5bkuK0uLi4nLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGgudXNlckNsYXNzLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0ID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRNZUNsYXNzTGlzdCgpO1xyXG4gICAgfSBcclxuICB9XHJcbiJdfQ==