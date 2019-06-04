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
    key: 'getBanners',


    // 获取banners列表

    value: function getBanners() {
      var _this2 = this;

      _wepy2.default.request(_config2.default.bannerList).then(function (res) {
        _this2.banners = res.data.data;
        _this2.$apply();
      });
    }

    // 获取课程列表

  }, {
    key: 'getClassList',
    value: function getClassList() {
      var _this3 = this;

      _wepy2.default.request(_config2.default.classList).then(function (res) {
        _this3.classList = res.data.data.list;
        _this3.classList.forEach(function (val) {
          val.price = _this3.formateMoney(val.price);
          val.expire_month = _this3.formateMonth(val.expire_month);
          if (val.id != 6) {
            _this3.currentId = true;
          }
        });
        _this3.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.getBanners();
      this.getClassList();
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
  var _this4 = this;

  this.config = {
    navigationBarTitleText: '夜猫足球'
  };
  this.$repeat = {};
  this.$props = { "contact": { "xmlns:wx": "" } };
  this.$events = {};
  this.components = {
    contact: _contact2.default
  };
  this.mixins = [_test2.default];
  this.data = {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    banners: [],
    classList: [],
    currentId: false
  };
  this.computed = {};
  this.methods = {
    banneGotoClassIndex: function banneGotoClassIndex(url) {
      var id = 6;
      try {
        id = url.split('?')[1].split('=')[1];
      } catch (e) {}
      if (id == 6) {
        wx.navigateTo({
          url: '/pages/classPlay?id=' + id
        });
      } else {
        wx.navigateTo({
          url: '/pages/classDetail?id=' + id
        });
      }
    },
    gotoClassIndex: function gotoClassIndex(id) {
      if (id == 6) {
        wx.navigateTo({
          url: '/pages/classPlay?id=' + id
        });
      } else {
        wx.navigateTo({
          url: '/pages/classDetail?id=' + id
        });
      }
    },

    /* 打开足球比赛 */
    openMini1: function openMini1() {
      wx.navigateToMiniProgram({
        appId: 'wxe0a4c5b9f85f9cf5',
        path: 'pages/index',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success: function success(res) {
          // 打开成功
        }
      });
    },


    /* 世界杯足球情报 */
    openMini2: function openMini2() {
      wx.navigateToMiniProgram({
        appId: 'wx0c2d51b7b4337c3a',
        path: 'pages/index',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success: function success(res) {
          // 打开成功
        }
      });
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this4.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    } };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4Iiwid2VweSIsInJlcXVlc3QiLCJhcGlQYXRoIiwiYmFubmVyTGlzdCIsInRoZW4iLCJiYW5uZXJzIiwicmVzIiwiZGF0YSIsIiRhcHBseSIsImNsYXNzTGlzdCIsImxpc3QiLCJmb3JFYWNoIiwidmFsIiwicHJpY2UiLCJmb3JtYXRlTW9uZXkiLCJleHBpcmVfbW9udGgiLCJmb3JtYXRlTW9udGgiLCJpZCIsImN1cnJlbnRJZCIsImdldEJhbm5lcnMiLCJnZXRDbGFzc0xpc3QiLCJ0aXRsZSIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJmYWlsIiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb250YWN0IiwiQ29udGFjdCIsIm1peGlucyIsIm15TWl4aW4iLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmFubmVHb3RvQ2xhc3NJbmRleCIsInVybCIsInNwbGl0IiwiZSIsInd4IiwibmF2aWdhdGVUbyIsImdvdG9DbGFzc0luZGV4Iiwib3Blbk1pbmkxIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJleHRyYURhdGEiLCJmb28iLCJlbnZWZXJzaW9uIiwib3Blbk1pbmkyIiwiZXZlbnRzIiwiJGV2ZW50IiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBRjJDOzs7SUFJdEJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtHbkI7O2lDQUVZO0FBQUE7O0FBQ1ZDLHFCQUFLQyxPQUFMLENBQWFDLGlCQUFRQyxVQUFyQixFQUNHQyxJQURILENBQ1MsZUFBTztBQUNWLGVBQUtDLE9BQUwsR0FBZUMsSUFBSUMsSUFBSixDQUFTQSxJQUF4QjtBQUNBLGVBQUtDLE1BQUw7QUFDSCxPQUpIO0FBS0Q7O0FBRUQ7Ozs7bUNBRWM7QUFBQTs7QUFDWlIscUJBQUtDLE9BQUwsQ0FBYUMsaUJBQVFPLFNBQXJCLEVBQ0dMLElBREgsQ0FDUyxlQUFPO0FBQ1YsZUFBS0ssU0FBTCxHQUFpQkgsSUFBSUMsSUFBSixDQUFTQSxJQUFULENBQWNHLElBQS9CO0FBQ0EsZUFBS0QsU0FBTCxDQUFlRSxPQUFmLENBQXdCLGVBQU87QUFDN0JDLGNBQUlDLEtBQUosR0FBWSxPQUFLQyxZQUFMLENBQWtCRixJQUFJQyxLQUF0QixDQUFaO0FBQ0FELGNBQUlHLFlBQUosR0FBbUIsT0FBS0MsWUFBTCxDQUFrQkosSUFBSUcsWUFBdEIsQ0FBbkI7QUFDQSxjQUFJSCxJQUFJSyxFQUFKLElBQVUsQ0FBZCxFQUFpQjtBQUNiLG1CQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0g7QUFDRixTQU5EO0FBT0EsZUFBS1YsTUFBTDtBQUNILE9BWEg7QUFZRDs7OzZCQUVRO0FBQ1AsV0FBS1csVUFBTDtBQUNBLFdBQUtDLFlBQUw7QUFDRDs7O3dDQUVtQjtBQUNsQixhQUFPO0FBQ1BDLGVBQU8sUUFEQTtBQUVQQyxjQUFNLGNBRkM7QUFHUEMsa0JBQVMsdUJBSEY7QUFJUEMsaUJBQVEsaUJBQVNsQixHQUFULEVBQWM7QUFDcEI7QUFDRCxTQU5NO0FBT1BtQixjQUFNLGNBQVNuQixHQUFULEVBQWM7QUFDbEI7QUFDRDtBQVRNLE9BQVA7QUFXRDs7OztFQTlJZ0NOLGVBQUswQixJOzs7OztPQUN0Q0MsTSxHQUFTO0FBQ1BDLDRCQUF3QjtBQURqQixHO09BSVZDLE8sR0FBVSxFO09BQ2JDLE0sR0FBUyxFQUFDLFdBQVUsRUFBQyxZQUFXLEVBQVosRUFBWCxFO09BQ1RDLE8sR0FBVSxFO09BQ1RDLFUsR0FBYTtBQUNSQyxhQUFRQztBQURBLEc7T0FJVkMsTSxHQUFTLENBQUNDLGNBQUQsQztPQUVUN0IsSSxHQUFPO0FBQ0w4QixtQkFBZSxJQURWO0FBRUxDLGNBQVUsSUFGTDtBQUdMQyxjQUFVLElBSEw7QUFJTEMsY0FBVSxJQUpMO0FBS0xuQyxhQUFRLEVBTEg7QUFNTEksZUFBVSxFQU5MO0FBT0xTLGVBQVU7QUFQTCxHO09BVVB1QixRLEdBQVcsRTtPQUlYQyxPLEdBQVU7QUFDTkMsdUJBRE0sK0JBQ2NDLEdBRGQsRUFDa0I7QUFDcEIsVUFBSTNCLEtBQUssQ0FBVDtBQUNBLFVBQUc7QUFDREEsYUFBSzJCLElBQUlDLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixFQUFrQkEsS0FBbEIsQ0FBd0IsR0FBeEIsRUFBNkIsQ0FBN0IsQ0FBTDtBQUNELE9BRkQsQ0FFQyxPQUFNQyxDQUFOLEVBQVEsQ0FFUjtBQUNELFVBQUk3QixNQUFNLENBQVYsRUFBYTtBQUNYOEIsV0FBR0MsVUFBSCxDQUFjO0FBQ1pKLHdDQUE0QjNCO0FBRGhCLFNBQWQ7QUFHRCxPQUpELE1BSUs7QUFDSDhCLFdBQUdDLFVBQUgsQ0FBYztBQUNaSiwwQ0FBOEIzQjtBQURsQixTQUFkO0FBR0Q7QUFDSixLQWpCSztBQW1CTmdDLGtCQW5CTSwwQkFtQlNoQyxFQW5CVCxFQW1CWTtBQUNoQixVQUFJQSxNQUFNLENBQVYsRUFBYTtBQUNYOEIsV0FBR0MsVUFBSCxDQUFjO0FBQ1pKLHdDQUE0QjNCO0FBRGhCLFNBQWQ7QUFHRCxPQUpELE1BSUs7QUFDSDhCLFdBQUdDLFVBQUgsQ0FBYztBQUNaSiwwQ0FBOEIzQjtBQURsQixTQUFkO0FBR0Q7QUFFRixLQTlCSzs7QUErQk47QUFDQWlDLGFBaENNLHVCQWdDSztBQUNUSCxTQUFHSSxxQkFBSCxDQUF5QjtBQUN2QkMsZUFBTyxvQkFEZ0I7QUFFdkI5QixjQUFNLGFBRmlCO0FBR3ZCK0IsbUJBQVc7QUFDVEMsZUFBSztBQURJLFNBSFk7QUFNdkJDLG9CQUFZLFNBTlc7QUFPdkIvQixlQVB1QixtQkFPZmxCLEdBUGUsRUFPVjtBQUNYO0FBQ0Q7QUFUc0IsT0FBekI7QUFXRCxLQTVDSzs7O0FBOENOO0FBQ0FrRCxhQS9DTSx1QkErQ0s7QUFDUlQsU0FBR0kscUJBQUgsQ0FBeUI7QUFDeEJDLGVBQU8sb0JBRGlCO0FBRXhCOUIsY0FBTSxhQUZrQjtBQUd4QitCLG1CQUFXO0FBQ1RDLGVBQUs7QUFESSxTQUhhO0FBTXhCQyxvQkFBWSxTQU5ZO0FBT3hCL0IsZUFQd0IsbUJBT2hCbEIsR0FQZ0IsRUFPWDtBQUNYO0FBQ0Q7QUFUdUIsT0FBekI7QUFXRjtBQTNESyxHO09BK0RWbUQsTSxHQUFTO0FBQ1Asa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSUMsa0JBQWMsVUFBS0MsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FDLGNBQVFDLEdBQVIsQ0FBZSxPQUFLQyxLQUFwQixpQkFBcUNKLE9BQU9LLElBQTVDLGNBQXlETCxPQUFPTSxNQUFQLENBQWNGLEtBQXZFO0FBQ0QsS0FKTSxFOzs7a0JBM0ZVL0QsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQ29udGFjdCBmcm9tICdAL2NvbXBvbmVudHMvY29udGFjdCcgLy8gYWxpYXMgZXhhbXBsZVxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgaW1wb3J0IGFwaVBhdGggZnJvbSAnLi4vY29uZmlnL2NvbmZpZydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WknOeMq+i2s+eQgydcbiAgICB9XG5cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiY29udGFjdFwiOntcInhtbG5zOnd4XCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY29udGFjdDpDb250YWN0XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW215TWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXG4gICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgIGJhbm5lcnM6W10sXG4gICAgICBjbGFzc0xpc3Q6W10sXG4gICAgICBjdXJyZW50SWQ6ZmFsc2UsXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBiYW5uZUdvdG9DbGFzc0luZGV4KHVybCl7XG4gICAgICAgICAgICBsZXQgaWQgPSA2O1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBpZCA9IHVybC5zcGxpdCgnPycpWzFdLnNwbGl0KCc9JylbMV0gIFxuICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIGlkID09IDYgKXtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NsYXNzUGxheT9pZD0ke2lkfWBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3NEZXRhaWw/aWQ9JHtpZH1gXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IFxuICAgICAgICB9LFxuICAgICAgICAgIFxuICAgICAgICBnb3RvQ2xhc3NJbmRleChpZCl7XG4gICAgICAgICAgaWYoIGlkID09IDYgKXtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3NQbGF5P2lkPSR7aWR9YFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY2xhc3NEZXRhaWw/aWQ9JHtpZH1gXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgLyog5omT5byA6Laz55CD5q+U6LWbICovXG4gICAgICAgIG9wZW5NaW5pMSgpe1xuICAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XG4gICAgICAgICAgICBhcHBJZDogJ3d4ZTBhNGM1YjlmODVmOWNmNScsXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7XG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qIOS4lueVjOadr+i2s+eQg+aDheaKpSAqL1xuICAgICAgICBvcGVuTWluaTIoKXtcbiAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcbiAgICAgICAgICAgIGFwcElkOiAnd3gwYzJkNTFiN2I0MzM3YzNhJyxcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcbiAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8g6I635Y+WYmFubmVyc+WIl+ihqFxuICAgIFxuICAgIGdldEJhbm5lcnMoKXtcbiAgICAgIHdlcHkucmVxdWVzdChhcGlQYXRoLmJhbm5lckxpc3QpXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5iYW5uZXJzID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8g6I635Y+W6K++56iL5YiX6KGoXG4gICAgXG4gICAgZ2V0Q2xhc3NMaXN0KCl7XG4gICAgICB3ZXB5LnJlcXVlc3QoYXBpUGF0aC5jbGFzc0xpc3QpXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5mb3JFYWNoKCB2YWwgPT4ge1xuICAgICAgICAgICAgICB2YWwucHJpY2UgPSB0aGlzLmZvcm1hdGVNb25leSh2YWwucHJpY2UpO1xuICAgICAgICAgICAgICB2YWwuZXhwaXJlX21vbnRoID0gdGhpcy5mb3JtYXRlTW9udGgodmFsLmV4cGlyZV9tb250aCk7XG4gICAgICAgICAgICAgIGlmKCB2YWwuaWQgIT0gNiApe1xuICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IClcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgdGhpcy5nZXRCYW5uZXJzKCk7XG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpO1xuICAgIH1cblxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5aSc54yr6Laz5b2p6K++56iLJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxuICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXG4gICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xuICAgICAgICAvLyDovazlj5HmiJDlip9cbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXG4gICAgICB9XG4gICAgfVxuICAgIH1cbiAgfVxuIl19