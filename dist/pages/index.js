"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_contact=require("./../components/contact.js"),_contact2=_interopRequireDefault(_contact),_focus=require("./../components/focus.js"),_focus2=_interopRequireDefault(_focus),_leauge=require("./../components/leauge.js"),_leauge2=_interopRequireDefault(_leauge),_footer=require("./../components/footer.js"),_footer2=_interopRequireDefault(_footer),_test=require("./../mixins/test.js"),_test2=_interopRequireDefault(_test),_config=require("./../config/config.js"),_config2=_interopRequireDefault(_config),Index=function(e){function t(){var e,a,i,o;_classCallCheck(this,t);for(var n=arguments.length,s=Array(n),l=0;l<n;l++)s[l]=arguments[l];return a=i=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),_initialiseProps.call(i),o=a,_possibleConstructorReturn(i,o)}return _inherits(t,e),_createClass(t,[{key:"getClassList",value:function(){var e=this,t={};return t=null===this.leagueFilte?{type:0,page:this.page,date:this.date}:{type:0,page:this.page,date:this.date,league_id:this.leagueFilte.join(",")},_wepy2.default.request({url:_config2.default.matchList,data:t,header:{Authorization:""+this.$parent.globalData.token}}).then(function(t){var a=t.data.data.list;a.length&&a.forEach(function(e){e.match_time_minute=e.match_time&&e.match_time.slice(10,16)}),e.matchList=e.matchList.concat(t.data.data.list),e.page++,e.$apply()}).catch(function(e){})}},{key:"getLeaugeList",value:function(){var e=this;return _wepy2.default.request({url:_config2.default.leagueList,data:{type:0,date:this.getNowFormatDate()},header:{Authorization:""+this.$parent.globalData.token}}).then(function(t){var a=t.data.data.list;e.leaguelist=a.slice(1,100),e.leaguelist.forEach(function(e){e.checked=!0}),e.$apply()})}},{key:"getFocusTotal",value:function(){var e=this;return _wepy2.default.request({url:_config2.default.focusList,data:{page:this.page},header:{Authorization:""+this.$parent.globalData.token}}).then(function(t){t.data.data.list;e.totalFocus=t.data.data.meta.total,e.$apply()})}},{key:"onLoad",value:function(){this.date=this.getNowFormatDate(),this.getClassList(),this.getLeaugeList(),this.getFocusTotal()}},{key:"onPullDownRefresh",value:function(){this.page=1,this.matchList=[],this.getClassList().then(function(e){wx.stopPullDownRefresh()})}},{key:"onReachBottom",value:function(){var e=this;this.isUpFrash=!0,this.getClassList().then(function(t){e.isUpFrash=!1,e.$apply()}),console.log("上拉触底了")}},{key:"onShareAppMessage",value:function(){return{title:this.shareContent,path:"/pages/index",imageUrl:"/images/share_img.jpg",success:function(e){},fail:function(e){}}}}]),t}(_wepy2.default.page),_initialiseProps=function(){var e=this;this.config={navigationBarTitleText:"即时比分",navigationBarBackgroundColor:"#ffffff",navigationBarTextStyle:"black"},this.$repeat={},this.$props={Leauge:{"xmlns:v-bind":"","v-bind:list.sync":"leaguelist"}},this.$events={},this.components={contact:_contact2.default,footer:_footer2.default,Leauge:_leauge2.default,Focus:_focus2.default},this.mixins=[_test2.default],this.data={indicatorDots:!0,autoplay:!0,interval:5e3,duration:1e3,banners:[],classList:[],gameList:[1,2,3,4,5,6,7,8,9,20,33,3,3,3,3,3],isUpFrash:!1,shareContent:"时间看得见福克斯",isScGame:!0,totalFocus:0,page:1,matchList:[],leaguelist:[],isShowLeague:!1,leagueFilte:null,date:"",formId:""},this.computed={},this.methods={openLeague:function(){this.isShowLeague=!0},scGame:function(){this.isScGame=!this.isScGame},gotoIndex:function(){wx.navigateTo({url:"/pages/index"})},gotoResult:function(){wx.navigateTo({url:"/pages/result"})},gotoFeture:function(){wx.navigateTo({url:"/pages/feature"})},gotoFocus:function(){wx.navigateTo({url:"/pages/focus"})},openMini1:function(){wx.navigateToMiniProgram({appId:"wxe0a4c5b9f85f9cf5",path:"pages/index",extraData:{foo:"bar"},envVersion:"release",success:function(e){}})},openMini2:function(){wx.navigateToMiniProgram({appId:"wx0c2d51b7b4337c3a",path:"pages/index",extraData:{foo:"bar"},envVersion:"release",success:function(e){}})},formSubmit:function(e){this.formId=e.detail.formId,console.log(e.detail.formId),console.log("form发生了submit事件，携带数据为：",e.detail.value)},setShareContent:function(e){1==e.status||2==e.status||3==e.status||4==e.status?this.shareContent="进行中："+e.league_name+"  "+e.home+"  "+e.home_score+"-"+e.away_score+" "+e.away:-1==e.status?this.shareContent=e.league_name+" "+e.match_time.slice(0,e.match_time.length-3)+" "+e.home+"  "+e.home_score+"-"+e.away_score+" "+e.away:0==e.status?this.shareContent=e.league_name+" "+e.match_time.slice(0,e.match_time.length-3)+" "+e.home+" vs "+e.away:-10==e.status?this.shareContent="比赛取消："+e.league_name+" "+e.match_time.slice(0,e.match_time.length-3)+" "+e.home+" vs "+e.away:-11==e.status?this.shareContent="比赛待定："+e.league_name+" "+e.match_time.slice(0,e.match_time.length-3)+" "+e.home+" vs "+e.away:-12==e.status?this.shareContent="比赛腰斩："+e.league_name+" "+e.match_time.slice(0,e.match_time.length-3)+" "+e.home+" vs "+e.away:-13==e.status?this.shareContent="比赛中断："+e.league_name+" "+e.match_time.slice(0,e.match_time.length-3)+" "+e.home+" vs "+e.away:-14==e.status&&(this.shareContent="比赛推迟："+e.league_name+" "+e.match_time.slice(0,e.match_time.length-3)+" "+e.home+" vs "+e.away)},collect:function(e,t){var a=this;this.matchList[e].is_collect?(wx.showLoading({title:"取消中"}),_wepy2.default.request({url:_config2.default.matchCollect,method:"DELETE",data:{match_id:t},header:{Authorization:""+this.$parent.globalData.token,"content-type":"application/json"}}).then(function(t){wx.hideLoading(),a.matchList[e].is_collect=!1,a.totalFocus--,a.$apply(),console.log("取消收藏成功")})):(wx.showLoading({title:"关注中"}),_wepy2.default.request({url:_config2.default.matchCollect,method:"POST",data:{match_id:t,form_id:this.formId},header:{Authorization:""+this.$parent.globalData.token,"content-type":"application/json"}}).then(function(t){wx.hideLoading(),a.matchList[e].is_collect=!0,a.totalFocus++,a.$apply(),console.log("收藏成功")}))}},this.events={"league-cancel":function(){e.isShowLeague=!1},"league-emit":function(){console.log(arguments.length<=0?void 0:arguments[0]),e.isShowLeague=!1,e.page=1,e.matchList=[],e.leagueFilte=arguments.length<=0?void 0:arguments[0],e.getClassList()},"index-emit":function(){var t,a=(t=arguments.length-1,arguments.length<=t?void 0:arguments[t]);console.log(e.$name+" receive "+a.name+" from "+a.source.$name)}}};Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Index,"pages/index"));