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
    key: 'getClassList',


    // 获取课程列表

    value: function getClassList() {
      var _this2 = this;

      _wepy2.default.request(_config2.default.classList).then(function (res) {
        _this2.classList = res.data.data.list;
        _this2.classList.forEach(function (val) {
          val.price = _this2.formateMoney(val.price);
          val.expire_month = _this2.formateMonth(val.expire_month);
        });
        _this2.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {}
    /*this.getBanners();
    this.getClassList();*/


    /**
     * 页面相关事件处理函数--监听用户下拉动作
    */

  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      // 刷新完后停止刷新

      setTimeout(function () {
        wx.stopPullDownRefresh();
      }, 2000);
    }

    /* 上拉触底 */

  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      var _this3 = this;

      this.isUpFrash = true;
      setTimeout(function () {
        _this3.isUpFrash = false;
        _this3.$apply();
      }, 2000);
      console.log("上拉触底了");
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      /* todo:设置要分享的内容 */
      console.log(2);
      return {
        title: this.shareContent,
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
    navigationBarTitleText: '夜猫足球实时比分'
  };
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
    gameList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 33, 3, 3, 3, 3, 3],
    isUpFrash: false,
    shareContent: '时间看得见福克斯'
  };
  this.computed = {};
  this.methods = {
    gotoResult: function gotoResult() {
      wx.navigateTo({
        url: '/pages/result'
      });
    },
    gotoFeture: function gotoFeture() {
      wx.navigateTo({
        url: '/pages/feature'
      });
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
    },

    formSubmit: function formSubmit(e) {
      // console.log(e);
      console.log(e.detail.formId);
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
    },

    /* 调整分享的内容 */
    setShareContent: function setShareContent() {
      console.log(1);
      this.shareContent = "啊哈哈沙发或多或少";
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this4.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    } };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/result'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsInJlcXVlc3QiLCJjbGFzc0xpc3QiLCJ0aGVuIiwicmVzIiwiZGF0YSIsImxpc3QiLCJmb3JFYWNoIiwidmFsIiwicHJpY2UiLCJmb3JtYXRlTW9uZXkiLCJleHBpcmVfbW9udGgiLCJmb3JtYXRlTW9udGgiLCIkYXBwbHkiLCJzZXRUaW1lb3V0Iiwid3giLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiaXNVcEZyYXNoIiwiY29uc29sZSIsImxvZyIsInRpdGxlIiwic2hhcmVDb250ZW50IiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJwYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJjb250YWN0IiwibWl4aW5zIiwiaW5kaWNhdG9yRG90cyIsImF1dG9wbGF5IiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImJhbm5lcnMiLCJnYW1lTGlzdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvdG9SZXN1bHQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ290b0ZldHVyZSIsIm9wZW5NaW5pMSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwiZXh0cmFEYXRhIiwiZm9vIiwiZW52VmVyc2lvbiIsIm9wZW5NaW5pMiIsImZvcm1TdWJtaXQiLCJlIiwiZGV0YWlsIiwiZm9ybUlkIiwidmFsdWUiLCJzZXRTaGFyZUNvbnRlbnQiLCJldmVudHMiLCIkZXZlbnQiLCJsZW5ndGgiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUYyQzs7O0lBSXRCQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Rm5COzttQ0FFYztBQUFBOztBQUNaLHFCQUFLQyxPQUFMLENBQWEsaUJBQVFDLFNBQXJCLEVBQ0dDLElBREgsQ0FDUyxlQUFPO0FBQ1YsZUFBS0Qs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aUMsRUFBRUMsTUFBRixDQUFTQyxNQUFyQjtBQUNBcEMsY0FBUUMsR0FBUixDQUFZLHdCQUFaLEVBQXNDaUMsRUFBRUMsTUFBRixDQUFTRSxLQUEvQztBQUNILEtBNUNLOztBQThDTjtBQUNBQyxtQkEvQ00sNkJBK0NXO0FBQ2Z0QyxjQUFRQyxHQUFSLENBQVksQ0FBWjtBQUNBLFdBQUtFLFlBQUwsR0FBb0IsV0FBcEI7QUFDRDtBQWxESyxHO09Bc0RWb0MsTSxHQUFTO0FBQ1Asa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSUMsa0JBQWMsVUFBS0MsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0F6QyxjQUFRQyxHQUFSLENBQWUsT0FBS3lDLEtBQXBCLGlCQUFxQ0YsT0FBT0csSUFBNUMsY0FBeURILE9BQU9JLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRCxLQUpNLEU7OztrQkFqRlU1RCxLIiwiZmlsZSI6InJlc3VsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IENvbnRhY3QgZnJvbSAnQC9jb21wb25lbnRzL2NvbnRhY3QnIC8vIGFsaWFzIGV4YW1wbGVcclxuICBpbXBvcnQgbXlNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcclxuICBpbXBvcnQgYXBpUGF0aCBmcm9tICcuLi9jb25maWcvY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpJznjKvotrPnkIPlrp7ml7bmr5TliIYnXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgY29udGFjdDpDb250YWN0XHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW215TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcclxuICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgIGludGVydmFsOiA1MDAwLFxyXG4gICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgYmFubmVyczpbXSxcclxuICAgICAgY2xhc3NMaXN0OltdLFxyXG4gICAgICBnYW1lTGlzdDpbMSwyLDMsNCw1LDYsNyw4LDksMjAsMzMsMywzLDMsMywzLF0sXHJcbiAgICAgIGlzVXBGcmFzaDpmYWxzZSxcclxuICAgICAgc2hhcmVDb250ZW50Oifml7bpl7TnnIvlvpfop4Hnpo/lhYvmlq8nXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgZ290b1Jlc3VsdCgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9yZXN1bHRgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ290b0ZldHVyZSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9mZWF0dXJlYFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qIOaJk+W8gOi2s+eQg+avlOi1myAqL1xyXG4gICAgICAgIG9wZW5NaW5pMSgpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eGUwYTRjNWI5Zjg1ZjljZjUnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICBmb286ICdiYXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDkuJbnlYzmna/otrPnkIPmg4XmiqUgKi9cclxuICAgICAgICBvcGVuTWluaTIoKXtcclxuICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4MGMyZDUxYjdiNDMzN2MzYScsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xyXG4gICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZm9ybUlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm3lj5HnlJ/kuoZzdWJtaXTkuovku7bvvIzmkLrluKbmlbDmja7kuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiDosIPmlbTliIbkuqvnmoTlhoXlrrkgKi9cclxuICAgICAgICBzZXRTaGFyZUNvbnRlbnQoKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKDEpO1xyXG4gICAgICAgICAgdGhpcy5zaGFyZUNvbnRlbnQgPSBcIuWViuWTiOWTiOaymeWPkeaIluWkmuaIluWwkVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDojrflj5bor77nqIvliJfooahcclxuICAgIFxyXG4gICAgZ2V0Q2xhc3NMaXN0KCl7XHJcbiAgICAgIHdlcHkucmVxdWVzdChhcGlQYXRoLmNsYXNzTGlzdClcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QgPSByZXMuZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmZvckVhY2goIHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsLnByaWNlID0gdGhpcy5mb3JtYXRlTW9uZXkodmFsLnByaWNlKTtcclxuICAgICAgICAgICAgICB2YWwuZXhwaXJlX21vbnRoID0gdGhpcy5mb3JtYXRlTW9udGgodmFsLmV4cGlyZV9tb250aCk7XHJcbiAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAvKnRoaXMuZ2V0QmFubmVycygpO1xyXG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpOyovXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAgKi9cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgLy8g5Yi35paw5a6M5ZCO5YGc5q2i5Yi35pawXHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcbiAgICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcclxuICAgICAgfSwyMDAwIClcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qIOS4iuaLieinpuW6lSAqL1xyXG4gICAgb25SZWFjaEJvdHRvbSgpe1xyXG4gICAgICB0aGlzLmlzVXBGcmFzaCA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNVcEZyYXNoID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9LDIwMDAgKVxyXG4gICAgICBjb25zb2xlLmxvZyhcIuS4iuaLieinpuW6leS6hlwiKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAvKiB0b2RvOuiuvue9ruimgeWIhuS6q+eahOWGheWuuSAqL1xyXG4gICAgICBjb25zb2xlLmxvZygyKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlQ29udGVudCxcclxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6Jy9pbWFnZXMvc2hhcmVfaW1nLmpwZycsXHJcbiAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==