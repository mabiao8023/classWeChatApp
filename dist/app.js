"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),_wepy=require("./npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy);require("./npm/wepy-async-function/index.js");var _config=require("./config/config.js"),_config2=_interopRequireDefault(_config),_default=function(e){function t(){_classCallCheck(this,t);var e=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.config={pages:["pages/index","pages/webview"],window:{backgroundTextStyle:"light",navigationBarBackgroundColor:"#FF741F",navigationBarTitleText:"赛事比分",navigationBarTextStyle:"",enablePullDownRefresh:!0}},e.globalData={userInfo:null,token:""},e.use("requestfix"),e.use("promisify"),e}return _inherits(t,e),_createClass(t,[{key:"onLaunch",value:function(){}},{key:"login",value:function(){var e=this;_wepy2.default.login().then(function(t){t.code?_wepy2.default.request({url:_config2.default.login,method:"GET",data:{login_type:4,code:t.code}}).then(function(t){e.globalData.token=t.data.data.token,wx.setStorageSync("token",t.data.data.token)}):console.log("获取用户登录态失败！"+t.errMsg)})}}]),t}(_wepy2.default.app);App(require("./npm/wepy/lib/wepy.js").default.$createApp(_default,{noPromiseAPI:["createSelectorQuery"]}));