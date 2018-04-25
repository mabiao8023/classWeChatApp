"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),_aldStat=require("./config/ald-stat.js"),_aldStat2=_interopRequireDefault(_aldStat),_wepy=require("./npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy);require("./npm/wepy-async-function/index.js");var _config=require("./config/config.js"),_config2=_interopRequireDefault(_config),_default=function(e){function t(){_classCallCheck(this,t);var e=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.config={pages:["pages/index","pages/class","pages/classDetail","pages/classPlay","pages/airticle","pages/me","pages/meClass"],window:{backgroundTextStyle:"light",navigationBarBackgroundColor:"#2cbd6c",navigationBarTitleText:"夜猫足球",navigationBarTextStyle:""},tabBar:{color:"#333",selectedColor:"#2cbd6c",backgroundColor:"#fff",borderStyle:"#e2e2e2",list:[{pagePath:"pages/index",text:"首页",iconPath:"./images/class.png",selectedIconPath:"./images/class-active.png"},{pagePath:"pages/meClass",text:"课程",iconPath:"./images/f-learn.png",selectedIconPath:"./images/f-learn-active.png"},{pagePath:"pages/me",text:"我的",iconPath:"./images/me.png",selectedIconPath:"./images/me-active.png"}]}},e.globalData={userInfo:null,sessionID:""},e.use("requestfix"),e.use("promisify"),e}return _inherits(t,e),_createClass(t,[{key:"onLaunch",value:function(){this.login()}},{key:"getUserInfo",value:function(){var e=this;if(this.globalData.userInfo)return this.globalData.userInfo;_wepy2.default.getUserInfo().then(function(t){e.globalData.userInfo=t.userInfo,_wepy2.default.request({url:_config2.default.updateUserInfo,method:"POST",header:{cookie:"PHPSESSID="+e.globalData.sessionID},data:t.userInfo}).then(function(e){console.log(e)})})}},{key:"login",value:function(){var e=this;_wepy2.default.login().then(function(t){t.code?(console.log(t.code),_wepy2.default.request({url:_config2.default.login,method:"POST",data:{code:t.code}}).then(function(t){e.globalData.sessionID=t.data.data.session_id,e.getUserInfo()})):console.log("获取用户登录态失败！"+t.errMsg)})}}]),t}(_wepy2.default.app);App(require("./npm/wepy/lib/wepy.js").default.$createApp(_default,{noPromiseAPI:["createSelectorQuery"]}));