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
    key: 'getPerson',
    value: function getPerson() {
      var _this2 = this;

      wx.showLoading({
        title: '获取中...'
      });
      _wepy2.default.request({
        url: _config2.default.getPerson,
        method: "GET",
        header: {
          'cookie': 'PHPSESSID=7ogj9tedkmk7nn2nmg9pgntgu5'
        }
      }).then(function (res) {
        wx.hideLoading();
        _this2.user = res.data.data;
        _this2.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.getPerson();
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
    user: {
      headimgurl: '',
      nickname: ''
    }
  };
  this.computed = {};
  this.methods = {
    gotoMeClassList: function gotoMeClassList() {
      wx.switchTab({
        url: '/pages/meClass'
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/me'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lLmpzIl0sIm5hbWVzIjpbIkluZGV4Iiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwicmVxdWVzdCIsInVybCIsImdldFBlcnNvbiIsIm1ldGhvZCIsImhlYWRlciIsInRoZW4iLCJoaWRlTG9hZGluZyIsInVzZXIiLCJyZXMiLCJkYXRhIiwiJGFwcGx5IiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiaGVhZGltZ3VybCIsIm5pY2tuYW1lIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ290b01lQ2xhc3NMaXN0Iiwic3dpdGNoVGFiIiwiZXZlbnRzIiwiJGV2ZW50IiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBcUNSO0FBQUE7O0FBQ1RDLFNBQUdDLFdBQUgsQ0FBZTtBQUNYQyxlQUFPO0FBREksT0FBZjtBQUdJLHFCQUFLQyxPQUFMLENBQWE7QUFDWEMsYUFBSSxpQkFBUUMsU0FERDtBQUVYQyxnQkFBTyxLQUZJO0FBR1hDLGdCQUFRO0FBQ04sb0JBQVU7QUFESjtBQUhHLE9BQWIsRUFNR0MsSUFOSCxDQU1TLGVBQU87QUFDWlIsV0FBR1MsV0FBSDtBQUNBLGVBQUtDLElBQUwsR0FBWUMsSUFBSUMsSUFBSixDQUFTQSxJQUFyQjtBQUNBLGVBQUtDLE1BQUw7QUFDRixPQVZGO0FBV0w7Ozs2QkFFUTtBQUNQLFdBQUtSLFNBQUw7QUFDRDs7OztFQXhEZ0MsZUFBS1MsSTs7Ozs7T0FDdENDLE0sR0FBUztBQUNQQyw0QkFBd0I7QUFEakIsRztPQUlUQyxVLEdBQWEsRTtPQUliQyxNLEdBQVMsZ0I7T0FFVE4sSSxHQUFPO0FBQ0xGLFVBQUs7QUFDSFMsa0JBQVcsRUFEUjtBQUVIQyxnQkFBUztBQUZOO0FBREEsRztPQU9QQyxRLEdBQVcsRTtPQUlYQyxPLEdBQVU7QUFDUkMsbUJBRFEsNkJBQ1M7QUFDZnZCLFNBQUd3QixTQUFILENBQWE7QUFDWHBCLGFBQUs7QUFETSxPQUFiO0FBR0Q7QUFMTyxHO09BUVZxQixNLEdBQVM7QUFDUCxrQkFBYyxxQkFBYTtBQUFBOztBQUN6QixVQUFJQyxrQkFBYyxVQUFLQyxNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQUMsY0FBUUMsR0FBUixDQUFlLE9BQUtDLEtBQXBCLGlCQUFxQ0osT0FBT0ssSUFBNUMsY0FBeURMLE9BQU9NLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRDtBQUpNLEc7OztrQkE5QlUvQixLIiwiZmlsZSI6Im1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xyXG4gIGltcG9ydCBhcGlQYXRoIGZyb20gJy4uL2NvbmZpZy9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ3Rlc3QnXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICB1c2VyOntcclxuICAgICAgICBoZWFkaW1ndXJsOicnLFxyXG4gICAgICAgIG5pY2tuYW1lOicnXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgZ290b01lQ2xhc3NMaXN0KCl7XHJcbiAgICAgICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgICAgIHVybDogJy9wYWdlcy9tZUNsYXNzJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGVyc29uKCl7XHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn6I635Y+W5LitLi4uJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOmFwaVBhdGguZ2V0UGVyc29uLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2Nvb2tpZSc6ICdQSFBTRVNTSUQ9N29najl0ZWRrbWs3bm4ybm1nOXBnbnRndTUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXIgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgfSApXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICB0aGlzLmdldFBlcnNvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuIl19