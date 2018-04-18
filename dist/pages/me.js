"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_contact=require("./../components/contact.js"),_contact2=_interopRequireDefault(_contact),_test=require("./../mixins/test.js"),_test2=_interopRequireDefault(_test),_config=require("./../config/config.js"),_config2=_interopRequireDefault(_config),Index=function(e){function t(){var e,n,o,r;_classCallCheck(this,t);for(var i=arguments.length,a=Array(i),s=0;s<i;s++)a[s]=arguments[s];return n=o=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),_initialiseProps.call(o),r=n,_possibleConstructorReturn(o,r)}return _inherits(t,e),_createClass(t,[{key:"getPerson",value:function(){var e=this;wx.showLoading({title:"获取中..."}),_wepy2.default.request({url:_config2.default.getPerson,method:"GET",header:{cookie:"PHPSESSID="+this.$parent.globalData.sessionID}}).then(function(t){wx.hideLoading(),e.user=t.data.data,e.$apply()})}},{key:"onLoad",value:function(){this.getPerson()}},{key:"onShareAppMessage",value:function(){return{title:"夜猫足彩课程",path:"/pages/index",imageUrl:"/images/share_img.jpg",success:function(e){},fail:function(e){}}}}]),t}(_wepy2.default.page),_initialiseProps=function(){var e=this;this.config={navigationBarTitleText:"夜猫足球--个人中心"},this.components={contact:_contact2.default},this.mixins=[_test2.default],this.data={user:{headimgurl:"",nickname:""}},this.computed={},this.methods={gotoMeClassList:function(){wx.switchTab({url:"/pages/meClass"})}},this.events={"index-emit":function(){var t,n=(t=arguments.length-1,arguments.length<=t?void 0:arguments[t]);console.log(e.$name+" receive "+n.name+" from "+n.source.$name)}}};Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Index,"pages/me"));