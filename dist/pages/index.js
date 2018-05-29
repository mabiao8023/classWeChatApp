"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_contact=require("./../components/contact.js"),_contact2=_interopRequireDefault(_contact),_focus=require("./../components/focus.js"),_focus2=_interopRequireDefault(_focus),_leauge=require("./../components/leauge.js"),_leauge2=_interopRequireDefault(_leauge),_footer=require("./../components/footer.js"),_footer2=_interopRequireDefault(_footer),_test=require("./../mixins/test.js"),_test2=_interopRequireDefault(_test),_config=require("./../config/config.js"),_config2=_interopRequireDefault(_config),Index=function(t){function e(){var t,a,i,s;_classCallCheck(this,e);for(var n=arguments.length,o=Array(n),h=0;h<n;h++)o[h]=arguments[h];return a=i=_possibleConstructorReturn(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),_initialiseProps.call(i),s=a,_possibleConstructorReturn(i,s)}return _inherits(e,t),_createClass(e,[{key:"getCateObj",value:function(t){return t+="",{0:this.jishiList,1:this.saiguoList,2:this.saichengList,3:this.guanzhuList}[t]}},{key:"getFocusList",value:function(){var t=this;return _wepy2.default.request({url:_config2.default.focusList,data:{page:this.getCateObj(this.type).page},header:{Authorization:""+this.$parent.globalData.token}}).then(function(e){var a=e.data.data.list;a.length>0&&(a.forEach(function(t){t.match_time_minute=t.match_time&&t.match_time.slice(10,16)}),t.guanzhuList.data=t.guanzhuList.data.concat(a),t.matchList=t.guanzhuList.data,t.guanzhuList.page++,t.$apply())})}},{key:"getClassList",value:function(){var t=this,e={};return e=null===this.leagueFilte?{type:this.type,page:this.getCateObj(this.type).page,date:this.getCateObj(this.type).date}:{type:this.type,page:this.getCateObj(this.type).page,date:this.getCateObj(this.type).date,league_id:this.leagueFilte.join(",")},_wepy2.default.request({url:_config2.default.matchList,data:e,header:{Authorization:""+this.$parent.globalData.token}}).then(function(e){var a=e.data.data.list;a.length>0&&(a.forEach(function(t){t.match_time_minute=t.match_time&&t.match_time.slice(10,16)}),t.getCateObj(t.type).data=t.getCateObj(t.type).data.concat(a),t.getCateObj(t.type).total=e.data.data.meta.total,t.getCateObj(t.type).page++,t.matchList=t.getCateObj(t.type).data,t.$apply())}).catch(function(t){})}},{key:"getLeaugeList",value:function(){var t=this;return _wepy2.default.request({url:_config2.default.leagueList,data:{type:this.type,date:this.getNowFormatDate()},header:{Authorization:""+this.$parent.globalData.token}}).then(function(e){var a=e.data.data.list;t.leaguelist=a.slice(1,100),t.leaguelist.forEach(function(t){t.checked=!0}),t.$apply()})}},{key:"getFocusTotal",value:function(){var t=this;return _wepy2.default.request({url:_config2.default.focusList,data:{page:this.page},header:{Authorization:""+this.$parent.globalData.token}}).then(function(e){e.data.data.list;t.totalFocus=e.data.data.meta.total,t.$apply()})}},{key:"onLoad",value:function(){this.jishiList.date=this.getNowFormatDate(),this.saiguoList.date=this.getNowFormatDate(),this.saichengList.date=this.getNowFormatDate(),this.saiguoList.start=this.getNowFormatDate(new Date((new Date).getTime()-6048e5)),this.saichengList.start=this.getNowFormatDate(),this.saiguoList.end=this.getNowFormatDate(),this.saichengList.end=this.getNowFormatDate(new Date((new Date).getTime()+6048e5)),wx.showLoading({title:"获取中"}),this.getClassList().then(function(t){wx.hideLoading()}),this.getLeaugeList(),this.getFocusTotal()}},{key:"onShow",value:function(){wx.showLoading({title:"获取中"}),this.getCateObj(this.type).page=1,this.getCateObj(this.type).data=[],this.matchList=[],3==this.type?this.getFocusList().then(function(t){wx.hideLoading()}):this.getClassList().then(function(t){wx.hideLoading()}),this.getLeaugeList(),this.getFocusTotal()}},{key:"onPullDownRefresh",value:function(){this.getCateObj(this.type).page=1,this.getCateObj(this.type).data=[],3==this.type?this.getFocusList().then(function(t){wx.stopPullDownRefresh()}):this.getClassList().then(function(t){wx.stopPullDownRefresh()})}},{key:"onReachBottom",value:function(){var t=this;this.isUpFrash=!0,3==this.type?this.getFocusList().then(function(e){t.isUpFrash=!1,t.$apply()}):this.getClassList().then(function(e){t.isUpFrash=!1,t.$apply()})}},{key:"onShareAppMessage",value:function(){return{title:this.shareContent,path:"/pages/index",imageUrl:"/images/share_img.jpg",success:function(t){},fail:function(t){}}}}]),e}(_wepy2.default.page),_initialiseProps=function(){var t=this;this.config={navigationBarTitleText:"足球赛事比分",navigationBarBackgroundColor:"#ffffff",navigationBarTextStyle:"black"},this.$repeat={},this.$props={contact:{"xmlns:wx":""},Leauge:{"v-bind:list.sync":"leaguelist"}},this.$events={},this.components={contact:_contact2.default,footer:_footer2.default,Leauge:_leauge2.default,Focus:_focus2.default},this.mixins=[_test2.default],this.data={type:0,isUpFrash:!1,shareContent:"足球即时比分",totalFocus:0,isShowLeague:!1,leagueFilte:null,date:"",formId:"",page:1,matchList:[],leaguelist:[],saiguoList:{page:1,data:[],date:"",start:"",end:"",total:""},jishiList:{page:1,data:[],date:"",total:""},saichengList:{page:1,data:[],date:"",start:"",end:"",total:""},guanzhuList:{page:1,data:[],total:""},isShowLeagueBtn:!0},this.computed={},this.methods={saiGuoDateChange:function(t){this.saiguoList.date=t.detail.value,this.saiguoList.page=1,this.saiguoList.data=[],this.getClassList(),this.getLeaugeList()},saiChengDateChange:function(t){this.saichengList.date=t.detail.value,this.saichengList.page=1,this.saichengList.data=[],this.getClassList(),this.getLeaugeList()},chioceType:function(t){this.type=t,this.leagueFilte=null,this.getCateObj(t).data.length<=0&&(3==this.type||(wx.showLoading({title:"加载中"}),this.getClassList().then(function(t){wx.hideLoading()}),this.getLeaugeList())),3!=this.type?(this.isShowLeagueBtn=!0,this.getLeaugeList()):(wx.showLoading({title:"加载中"}),this.getFocusList().then(function(t){wx.hideLoading()}),this.isShowLeagueBtn=!1),this.matchList=this.getCateObj(this.type).data},openLeague:function(){this.isShowLeague=!0},gotoIndex:function(){wx.navigateTo({url:"/pages/index"})},gotoResult:function(){wx.navigateTo({url:"/pages/result"})},gotoFeture:function(){wx.navigateTo({url:"/pages/feature"})},gotoFocus:function(){wx.navigateTo({url:"/pages/focus"})},formSubmit:function(t){this.formId=t.detail.formId},setShareContent:function(t){1==t.status||2==t.status||3==t.status||4==t.status?this.shareContent="进行中："+t.league_name+"  "+t.home+"  "+t.home_score+"-"+t.away_score+" "+t.away:-1==t.status?this.shareContent=t.league_name+" "+t.match_time.slice(0,t.match_time.length-3)+" "+t.home+"  "+t.home_score+"-"+t.away_score+" "+t.away:0==t.status?this.shareContent=t.league_name+" "+t.match_time.slice(0,t.match_time.length-3)+" "+t.home+" vs "+t.away:-10==t.status?this.shareContent="比赛取消："+t.league_name+" "+t.match_time.slice(0,t.match_time.length-3)+" "+t.home+" vs "+t.away:-11==t.status?this.shareContent="比赛待定："+t.league_name+" "+t.match_time.slice(0,t.match_time.length-3)+" "+t.home+" vs "+t.away:-12==t.status?this.shareContent="比赛腰斩："+t.league_name+" "+t.match_time.slice(0,t.match_time.length-3)+" "+t.home+" vs "+t.away:-13==t.status?this.shareContent="比赛中断："+t.league_name+" "+t.match_time.slice(0,t.match_time.length-3)+" "+t.home+" vs "+t.away:-14==t.status&&(this.shareContent="比赛推迟："+t.league_name+" "+t.match_time.slice(0,t.match_time.length-3)+" "+t.home+" vs "+t.away)},collect:function(t,e){var a=this;this.matchList[t].is_collect?(wx.showLoading({title:"取消中"}),_wepy2.default.request({url:_config2.default.matchCollect,method:"DELETE",data:{match_id:e},header:{Authorization:""+this.$parent.globalData.token,"content-type":"application/json"}}).then(function(e){wx.hideLoading(),a.matchList[t].is_collect=!1,a.totalFocus--,a.$apply(),console.log("取消收藏成功")})):(wx.showLoading({title:"关注中"}),_wepy2.default.request({url:_config2.default.matchCollect,method:"POST",data:{match_id:e,form_id:this.formId},header:{Authorization:""+this.$parent.globalData.token,"content-type":"application/json"}}).then(function(e){wx.hideLoading(),a.matchList[t].is_collect=!0,a.totalFocus++,a.$apply(),console.log("收藏成功")}))}},this.events={"league-cancel":function(){t.isShowLeague=!1},"league-emit":function(){t.isShowLeague=!1,t.getCateObj(t.type).page=1,t.getCateObj(t.type).data=[],t.leagueFilte=arguments.length<=0?void 0:arguments[0],t.getClassList()},"index-emit":function(){var e,a=(e=arguments.length-1,arguments.length<=e?void 0:arguments[e]);console.log(t.$name+" receive "+a.name+" from "+a.source.$name)}}};Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Index,"pages/index"));