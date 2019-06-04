'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _contact = require('./../components/contact.js');

var _contact2 = _interopRequireDefault(_contact);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _config = require('./../config/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // alias example


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
          'cookie': 'PHPSESSID=' + this.$parent.globalData.sessionID
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
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      return {
        title: '夜猫足彩课程',
        path: '/pages/index',
        imageUrl: '/images/share_img.jpg',
        success: function success(res) {
          // 转发成功
        },
        fail: function fail(res) {
          // 转发失败
        }
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.config = {
    navigationBarTitleText: '夜猫足球--课程列表'
  };
  this.components = {
    contact: _contact2.default
  };
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lQ2xhc3MuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsImFwaVBhdGgiLCJ1c2VyQ2xhc3MiLCJtZXRob2QiLCJoZWFkZXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNlc3Npb25JRCIsInRoZW4iLCJoaWRlTG9hZGluZyIsImNsYXNzTGlzdCIsInJlcyIsImRhdGEiLCIkYXBwbHkiLCJnZXRNZUNsYXNzTGlzdCIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiY29udGFjdCIsIkNvbnRhY3QiLCJtaXhpbnMiLCJ0ZXN0TWl4aW4iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb3RvQ2xhc3NJbmRleCIsImlkIiwibmF2aWdhdGVUbyIsImV2ZW50cyIsIiRldmVudCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUYyQzs7O0lBSXRCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQWtDSDtBQUFBOztBQUNaQyxTQUFHQyxXQUFILENBQWU7QUFDYkMsZUFBTztBQURNLE9BQWY7QUFHQUMscUJBQUtDLE9BQUwsQ0FBYTtBQUNUQyxhQUFJQyxpQkFBUUMsU0FESDtBQUVUQyxnQkFBTyxLQUZFO0FBR1RDLGdCQUFRO0FBQ04sbUNBQXVCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkM7QUFEekM7QUFIQyxPQUFiLEVBTUtDLElBTkwsQ0FNVyxlQUFPO0FBQ2RiLFdBQUdjLFdBQUg7QUFDQSxlQUFLQyxTQUFMLEdBQWlCQyxJQUFJQyxJQUFKLENBQVNBLElBQTFCO0FBQ0EsZUFBS0MsTUFBTDtBQUNELE9BVkg7QUFXSDs7OzZCQUVRO0FBQ0wsV0FBS0MsY0FBTDtBQUNIOzs7d0NBRW1CO0FBQ2xCLGFBQU87QUFDUGpCLGVBQU8sUUFEQTtBQUVQa0IsY0FBTSxjQUZDO0FBR1BDLGtCQUFTLHVCQUhGO0FBSVBDLGlCQUFRLGlCQUFTTixHQUFULEVBQWM7QUFDcEI7QUFDRCxTQU5NO0FBT1BPLGNBQU0sY0FBU1AsR0FBVCxFQUFjO0FBQ2xCO0FBQ0Q7QUFUTSxPQUFQO0FBV0Q7Ozs7RUFuRWdDYixlQUFLcUIsSTs7Ozs7T0FDdENDLE0sR0FBUztBQUNQQyw0QkFBd0I7QUFEakIsRztPQUlUQyxVLEdBQWE7QUFDWEMsYUFBUUM7QUFERyxHO09BSWJDLE0sR0FBUyxDQUFDQyxjQUFELEM7T0FFVGQsSSxHQUFPO0FBQ0xGLGVBQVU7QUFETCxHO09BSVBpQixRLEdBQVcsRTtPQUlYQyxPLEdBQVU7QUFDUkMsa0JBRFEsMEJBQ09DLEVBRFAsRUFDVTtBQUNoQm5DLFNBQUdvQyxVQUFILENBQWM7QUFDVi9CLGtDQUF3QjhCO0FBRGQsT0FBZDtBQUdEO0FBTE8sRztPQVFWRSxNLEdBQVM7QUFDUCxrQkFBYyxxQkFBYTtBQUFBOztBQUN6QixVQUFJQyxrQkFBYyxVQUFLQyxNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQUMsY0FBUUMsR0FBUixDQUFlLE9BQUtDLEtBQXBCLGlCQUFxQ0osT0FBT0ssSUFBNUMsY0FBeURMLE9BQU9NLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRDtBQUpNLEc7OztrQkEzQlUzQyxLIiwiZmlsZSI6Im1lQ2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WknOeMq+i2s+eQgy0t6K++56iL5YiX6KGoJ1xuICAgIH1cblxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb250YWN0OkNvbnRhY3RcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGNsYXNzTGlzdDpbXVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvdG9DbGFzc0luZGV4KGlkKXtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3M/aWQ9JHtpZH1gXG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxuICAgICAgfVxuICAgIH1cblxuICAgIGdldE1lQ2xhc3NMaXN0KCl7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+iOt+WPluS4rS4uLicsXG4gICAgICAgIH0pXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6YXBpUGF0aC51c2VyQ2xhc3MsXG4gICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAnY29va2llJzogYFBIUFNFU1NJRD0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlc3Npb25JRH1gXG4gICAgICAgICAgICB9XG4gICAgICAgICB9ICkudGhlbiggcmVzID0+IHtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdCA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuZ2V0TWVDbGFzc0xpc3QoKTtcbiAgICB9IFxuXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflpJznjKvotrPlvanor77nqIsnLFxuICAgICAgcGF0aDogJy9wYWdlcy9pbmRleCcsXG4gICAgICBpbWFnZVVybDonL2ltYWdlcy9zaGFyZV9pbWcuanBnJyxcbiAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIC8vIOi9rOWPkeaIkOWKn1xuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAvLyDovazlj5HlpLHotKVcbiAgICAgIH1cbiAgICB9XG4gICAgfVxuICB9XG4iXX0=