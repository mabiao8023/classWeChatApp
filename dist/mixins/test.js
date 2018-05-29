"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),testMixin=function(e){function t(){var e,n,o,r;_classCallCheck(this,t);for(var a=arguments.length,i=Array(a),u=0;u<a;u++)i[u]=arguments[u];return n=o=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),o.data={mixin:"This is mixin data."},o.methods={tap:function(){this.mixin="mixin data was changed",console.log("mixin method tap")}},r=n,_possibleConstructorReturn(o,r)}return _inherits(t,e),_createClass(t,[{key:"formateMonth",value:function(e){var t=parseInt(e/12,10),n=e%12;return t>0&&0==n?t+"年":t>0?t+"年"+n+"个月":n+"个月"}},{key:"formateMoney",value:function(e){return e?(e+"").replace(/^(\d+)\.0+$/,"$1"):""}},{key:"secondsFormate",value:function(e){return[parseInt(e/60/60),parseInt(e/60%60),parseInt(e%60)].join(":").replace(/\b(\d)\b/g,"0$1")}},{key:"onShow",value:function(){console.log("mixin onShow")}},{key:"onLoad",value:function(){console.log("mixin onLoad")}},{key:"getNowFormatDate",value:function(e){var e=e||new Date,t=e.getFullYear(),n=e.getMonth()+1,o=e.getDate();return n>=1&&n<=9&&(n="0"+n),o>=0&&o<=9&&(o="0"+o),t+"-"+n+"-"+o}}]),t}(_wepy2.default.mixin);exports.default=testMixin;