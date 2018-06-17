"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_contact=require("./../components/contact.js"),_contact2=_interopRequireDefault(_contact),_test=require("./../mixins/test.js"),_test2=_interopRequireDefault(_test),_config=require("./../config/config.js"),_config2=_interopRequireDefault(_config),Index=function(e){function t(){var e,n,r,s;_classCallCheck(this,t);for(var o=arguments.length,a=Array(o),i=0;i<o;i++)a[i]=arguments[i];return n=r=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.config={navigationBarTitleText:"夜猫足球--课程首页"},r.components={contact:_contact2.default},r.mixins=[_test2.default],r.data={classId:8,classInfo:{},video:{src:""},isHasVideo:!1,chapterList:[],lessonLength:0},r.computed={},r.methods={gotoAircle:function(e){this.setProgress(e),wx.navigateTo({url:"/pages/airticle?id="+e})},playVideo:function(e,t,n){this.isHasVideo=!0,this.chapterList.forEach(function(e){e.lesson.forEach(function(e){e.resource.playing=!1})}),this.chapterList[t].lesson[n].resource.playing=!0,this.setProgress(e.resource_id),this.video.src=e.resource.media_url,this.$apply()}},r.events={},s=n,_possibleConstructorReturn(r,s)}return _inherits(t,e),_createClass(t,[{key:"getProgress",value:function(){}},{key:"getClassChapter",value:function(){var e=this;wx.showLoading({title:"获取中..."}),_wepy2.default.request({url:_config2.default.userChapter,method:"GET",data:{class_id:this.classId},header:{cookie:"PHPSESSID="+this.$parent.globalData.sessionID}}).then(function(t){wx.hideLoading();var n=t.data.data;n.chapter.length&&(n.chapter.forEach(function(t,n){t.lesson.forEach(function(t){t.resource.playing=!1,t.resource.media_time=t.resource.media_time&&e.secondsFormate(t.resource.media_time),e.lessonLength++})}),e.chapterList=n.chapter,console.log(e.chapterList)),e.classInfo=n,e.$apply()})}},{key:"setProgress",value:function(e){var t=this.classId+"",n=0;try{var r=wx.getStorageSync(t);r?(r.already.some(function(t){return t==e})||r.already.push(e),n=parseInt(r.already.length/this.lessonLength*100)):(wx.setStorageSync(t,{total:this.lessonLength,already:[e]}),n=parseInt(1/this.lessonLength*100))}catch(e){}this.classInfo.learn_percent=n,_wepy2.default.request({url:_config2.default.classPercent,method:"POST",data:{class_id:this.classId,percent:n},header:{"content-type":"application/x-www-form-urlencoded",cookie:"PHPSESSID="+this.$parent.globalData.sessionID}}).then(function(e){})}},{key:"onLoad",value:function(e){this.classId=e.id,this.getClassChapter()}},{key:"onShareAppMessage",value:function(){return{title:"夜猫足彩课程",path:"/pages/index",imageUrl:"/images/share_img.jpg",success:function(e){},fail:function(e){}}}}]),t}(_wepy2.default.page);exports.default=Index;