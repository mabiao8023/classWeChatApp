"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_contact=require("./../components/contact.js"),_contact2=_interopRequireDefault(_contact),_test=require("./../mixins/test.js"),_test2=_interopRequireDefault(_test),_config=require("./../config/config.js"),_config2=_interopRequireDefault(_config),Index=function(e){function t(){var e,n,a,o;_classCallCheck(this,t);for(var i=arguments.length,r=Array(i),s=0;s<i;s++)r[s]=arguments[s];return n=a=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(r))),_initialiseProps.call(a),o=n,_possibleConstructorReturn(a,o)}return _inherits(t,e),_createClass(t,[{key:"getBanners",value:function(){var e=this;_wepy2.default.request(_config2.default.leagueList).then(function(t){console.log(t.data.data),e.$apply()})}},{key:"onLoad",value:function(){this.getBanners()}},{key:"onShareAppMessage",value:function(){return{title:"夜猫足彩课程",path:"/pages/index",imageUrl:"/images/share_img.jpg",success:function(e){},fail:function(e){}}}}]),t}(_wepy2.default.page),_initialiseProps=function(){var e=this;this.config={navigationBarTitleText:"赛事筛选",navigationBarBackgroundColor:"#ffffff",enablePullDownRefresh:!1,navigationBarTextStyle:"black"},this.components={contact:_contact2.default},this.mixins=[_test2.default],this.data={indicatorDots:!0,autoplay:!0,interval:5e3,duration:1e3,banners:[],classList:[],ls:["法甲","欧冠杯","自由杯","巴西乙","哥轮甲春","法甲","欧冠杯","自由杯","巴西乙","哥轮甲春","法甲","欧冠杯","自由杯","巴西乙","哥轮甲春","法甲","欧冠杯","自由杯","巴西乙","哥轮甲春","法甲","欧冠杯","自由杯","巴西乙","哥轮甲春","法甲","欧冠杯","自由杯","巴西乙","哥轮甲春","法甲","欧冠杯","自由杯","巴西乙","哥轮甲春","法甲","欧冠杯","自由杯","巴西乙","哥轮甲春","法甲","欧冠杯","自由杯","巴西乙","哥轮甲春"],leagueList:[]},this.computed={},this.methods={banneGotoClassIndex:function(e){var t=6;try{t=e.split("?")[1].split("=")[1]}catch(e){}wx.navigateTo({url:"/pages/classDetail?id="+t})},gotoClassIndex:function(e){wx.navigateTo({url:"/pages/classDetail?id="+e})},openMini1:function(){wx.navigateToMiniProgram({appId:"wxe0a4c5b9f85f9cf5",path:"pages/index",extraData:{foo:"bar"},envVersion:"release",success:function(e){}})},openMini2:function(){wx.navigateToMiniProgram({appId:"wx0c2d51b7b4337c3a",path:"pages/index",extraData:{foo:"bar"},envVersion:"release",success:function(e){}})},formSubmit:function(e){console.log(e.detail.formId),console.log("form发生了submit事件，携带数据为：",e.detail.value)}},this.events={"index-emit":function(){var t,n=(t=arguments.length-1,arguments.length<=t?void 0:arguments[t]);console.log(e.$name+" receive "+n.name+" from "+n.source.$name)}}};Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Index,"pages/shaixuan"));