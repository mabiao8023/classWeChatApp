"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var t = "6.1.2";var a = "log";var e = require('./ald-stat-conf.js');var s = 0;var n = 0;var r = 0;var i = 0;var o = {};function l(t) {
    var a = "";try {
      a = wx.getStorageSync("aldstat_uuid");
    } catch (t) {
      a = "uuid-getstoragesync";
    }if (!a) {
      a = "" + Date.now() + Math.floor(Math.random() * 1e7);try {
        wx.setStorageSync("aldstat_uuid", a);
      } catch (t) {
        wx.setStorageSync("aldstat_uuid", "uuid-getstoragesync");
      }t.aldstat_is_first_open = true;
    }return a;
  }function _() {
    wx.request({ url: "https://" + a + ".aldwx.com/config/app.json", header: { AldStat: "MiniApp-Stat" }, method: "GET", success: function success(t) {
        if (t.statusCode === 200) {
          for (var a in t.data) {
            wx.setStorageSync(a, t.data[a]);
          }
        }
      } });
  }function d(t, a, e) {
    if (t[a]) {
      var s = t[a];t[a] = function (t) {
        e.call(this, t, a);s.call(this, t);
      };
    } else {
      t[a] = function (t) {
        e.call(this, t, a);
      };
    }
  }function c(t, a, e) {
    if (t[a]) {
      var s = t[a];t[a] = function (t) {
        var n = s.call(this, t);e.call(this, [t, n], a);return n;
      };
    } else {
      t[a] = function (t) {
        e.call(this, t, a);
      };
    }
  }var f = function f(t) {
    if (wx.getSetting) {
      wx.getSetting({ success: function success(a) {
          if (a.authSetting["scope.userInfo"]) {
            wx.getUserInfo({ withCredentials: false, success: function success(a) {
                t(a);
              } });
          }
        } });
    }
  };var u = function u(t, e, n) {
    if (typeof arguments[1] === "undefined") e = "GET";if (typeof arguments[2] === "undefined") n = "d.html";var r = 0;var i = function i() {
      s += 1;t["rq_c"] = s;wx.request({ url: "https://" + a + ".aldwx.com/" + n, data: t, header: { AldStat: "MiniApp-Stat" }, method: e, success: function success() {}, fail: function fail() {
          if (r < 2) {
            r++;t["retryTimes"] = r;i();
          }
        } });
    };i();
  };var p = function p(a, s, n, r) {
    var i = { ak: e["app_key"], uu: l(a), at: a.aldstat_access_token, st: Date.now(), tp: n, ev: s, v: t };if (r) {
      i["ct"] = r;
    }if (a.aldstat_qr) {
      i["qr"] = a.aldstat_qr;
    }u(i, "GET", "d.html");
  };var h = function h(a, s, n, r) {
    if (typeof a["aldstat_showoption"] === "undefined") {
      a["aldstat_showoption"] = {};
    }var i = { ak: e["app_key"], wsr: a.aldstat_showoption, uu: l(a), at: a.aldstat_access_token, st: Date.now(), tp: n, ev: s, nt: a.aldstat_network_type, pm: a.aldstat_phone_model, pr: a.aldstat_pixel_ratio, ww: a.aldstat_window_width, wh: a.aldstat_window_height, lang: a.aldstat_language, wv: a.aldstat_wechat_version, lat: a.aldstat_lat, lng: a.aldstat_lng, spd: a.aldstat_speed, v: t };if (r) {
      i["ct"] = r;
    }if (a.aldstat_location_name) {
      i["ln"] = a.aldstat_location_name;
    }if (a.aldstat_src) {
      i["sr"] = a.aldstat_src;
    }if (a.aldstat_qr) {
      i["qr"] = a.aldstat_qr;
    }u(i, "GET", "d.html");
  };function g(t) {
    this.app = t;
  }g.prototype["debug"] = function (t) {
    h(this.app, "debug", 0, t);
  };g.prototype["warn"] = function (t) {
    h(this.app, "debug", 1, t);
  };g.prototype["error"] = function (t) {
    p(this.app, "debug", 2, t);
  };g.prototype["sendEvent"] = function (t, a) {
    if (!D(t)) {
      return false;
    }if (t.length >= 255) {
      return false;
    }if ((typeof a === "undefined" ? "undefined" : _typeof(a)) === "object") {
      for (var e in a) {
        if (!D(e)) {
          return false;
        }if (_typeof(a[e]) == "object") {
          return false;
        }if (!D(a[e])) {
          return false;
        }
      }h(this.app, "event", t, JSON.stringify(a));
    } else {
      if (typeof a === "string" && a.length <= 255) {
        if (D(a)) {
          var s = String(a);var n = new Object();n[s] = a;h(this.app, "event", t, a);
        }
      } else {
        h(this.app, "event", t, false);
      }
    }
  };var w = function w() {
    var t = this;t.aldstat_duration += Date.now() - t.aldstat_showtime;m(t, "app", "unLaunch");
  };var v = function v(t, a, e) {
    if (typeof wx["getShareInfo"] != "undefined") {
      wx.getShareInfo({ shareTicket: a, success: function success(a) {
          h(t, "event", "ald_share_" + e, JSON.stringify(a));
        }, fail: function fail() {
          h(t, "event", "ald_share_" + e, "1");
        } });
    } else {
      h(t, "event", "ald_share_" + e, "1");
    }
  };var y = function y(t) {
    _();this["aldstat"] = new g(this);var a = "";try {
      a = wx.getStorageSync("aldstat_src");
    } catch (t) {
      a = "uuid-getstoragesync";
    }if (a) {
      this.aldstat_src = a;
    }var s = l(this);this.aldstat_uuid = s;this.aldstat_timestamp = Date.now();this.aldstat_showtime = Date.now();this.aldstat_duration = 0;var n = this;n.aldstat_error_count = 0;n.aldstat_page_count = 1;n.aldstat_first_page = 0;if (typeof t != "undefined") {
      this.aldstat_showoption = t;
    } else {
      this.aldstat_showoption = {};
    }var r = function r() {
      wx.getNetworkType({ success: function success(t) {
          n.aldstat_network_type = t["networkType"];
        }, complete: i });
    };var i = function i() {
      wx.getSystemInfo({ success: function success(t) {
          n.aldstat_vsdk_version = typeof t["SDKVersion"] === "undefined" ? "1.0.0" : t["SDKVersion"];n.aldstat_phone_model = t["model"];n.aldstat_pixel_ratio = t["pixelRatio"];n.aldstat_window_width = t["windowWidth"];n.aldstat_window_height = t["windowHeight"];n.aldstat_language = t["language"];n.aldstat_wechat_version = t["version"];n.aldstat_sv = t["system"];n.aldstat_wvv = t["platform"];
        }, complete: function complete() {
          if (e["getLocation"]) {
            c();
          }d();
        } });
    };var d = function d() {
      f(function (t) {
        var a = "";try {
          a = wx.getStorageSync("aldstat_uuid");
        } catch (t) {
          a = "uuid-getstoragesync";
        }t["userInfo"]["uu"] = a;o = t;u(t["userInfo"], "GET", "u.html");
      });
    };var c = function c() {
      wx.getLocation({ type: "wgs84", success: function success(t) {
          n.aldstat_lat = t["latitude"];n.aldstat_lng = t["longitude"];n.aldstat_speed = t["speed"];
        } });
    };r();var p = "";try {
      p = wx.getStorageSync("app_session_key_create_launch_upload");
    } catch (t) {
      p = "";
    }if (!p) {
      n.aldstat_access_token = "" + Date.now() + Math.floor(Math.random() * 1e7);
    } else {
      if (p > 0 && typeof p === "number") {
        n.aldstat_access_token = "" + Date.now() + Math.floor(Math.random() * 1e7);
      }
    }m(n, "app", "launch");
  };var S = function S(t, a) {
    var e = this;if (typeof this.aldstat_error_count === "undefined") {
      this.aldstat_error_count = 1;
    } else {
      this.aldstat_error_count++;
    }h(e, "event", "ald_error_message", JSON.stringify(t));
  };var m = function m(a, s, o) {
    var _ = "";try {
      _ = wx.getStorageSync("app_" + o + "_upload");
    } catch (t) {
      _ = "";
    }if (!_ && o !== "launch") {
      return;
    }if (_ < 1 && typeof _ === "number") {
      return;
    }if (typeof a.aldstat_timestamp === "undefined") {
      a.aldstat_timestamp = Date.now();
    }var d = wx.getSystemInfoSync();a.aldstat_vsdk_version = typeof d["SDKVersion"] === "undefined" ? "1.0.0" : d["SDKVersion"];a.aldstat_phone_model = d["model"];a.aldstat_pixel_ratio = d["pixelRatio"];a.aldstat_window_width = d["windowWidth"];a.aldstat_window_height = d["windowHeight"];a.aldstat_language = d["language"];a.aldstat_sv = d["system"];a.aldstat_wvv = d["platform"];var c = { ak: e["app_key"], waid: e["appid"], wst: e["appsecret"], uu: l(a), at: a.aldstat_access_token, wsr: a.aldstat_showoption, st: a.aldstat_timestamp, dr: a.aldstat_duration, et: Date.now(), pc: a.aldstat_page_count, fp: a.aldstat_first_page, lp: a.aldstat_last_page, life: o, ec: a.aldstat_error_count, nt: a.aldstat_network_type, pm: a.aldstat_phone_model, wsdk: a.aldstat_vsdk_version, pr: a.aldstat_pixel_ratio, ww: a.aldstat_window_width, wh: a.aldstat_window_height, lang: a.aldstat_language, wv: a.aldstat_wechat_version, lat: a.aldstat_lat, lng: a.aldstat_lng, spd: a.aldstat_speed, v: t, ev: s, sv: a.aldstat_sv, wvv: a.aldstat_wvv };if (o === "launch") {
      n += 1;
    } else if (o === "show") {
      r += 1;
    } else {
      i += 1;
    }c["la_c"] = n;c["as_c"] = r;c["ah_c"] = i;if (a.page_share_count && typeof a.page_share_count === "number") {
      c["sc"] = a.page_share_count;
    }if (a.aldstat_is_first_open) {
      c["ifo"] = "true";
    }if (a.aldstat_location_name) {
      c["ln"] = a.aldstat_location_name;
    }if (a.aldstat_src) {
      c["sr"] = a.aldstat_src;
    }if (a.aldstat_qr) {
      c["qr"] = a.aldstat_qr;
    }if (a.ald_share_src) {
      c["usr"] = a.ald_share_src;
    }u(c, "GET", "d.html");
  };var x = function x(t) {
    this.aldstat_showtime = Date.now();if (typeof t != "undefined") {
      this.aldstat_showoption = t;
    } else {
      this.aldstat_showoption = {};
    }var a = "";try {
      a = wx.getStorageSync("app_session_key_create_show_upload");
    } catch (t) {
      a = "";
    }if (a) {
      if (a > 0 && typeof a === "number") {
        this.aldstat_access_token = "" + Date.now() + Math.floor(Math.random() * 1e7);
      }
    }m(this, "app", "show");if (typeof t != "undefined") {
      if (typeof t["shareTicket"] != "undefined") {
        v(this, t["shareTicket"], "click");
      } else if (typeof t["query"] != "undefined") {
        if (typeof t["query"]["ald_share_src"] != "undefined") {
          v(this, "0", "click");
        }
      }
    }
  };var k = function k(t, a) {
    var e = this;if (e.aldstat_is_first_open) {
      e.aldstat_is_first_open = false;
    }e.aldstat_duration = Date.now() - e.aldstat_showtime;m(e, "app", "hide");
  };function q(t) {
    for (var a in t) {
      return false;
    }return true;
  }function D(t) {
    if (typeof t !== "string") {
      return false;
    }var a = t.replace(/\s+/g, "_");if (/[~`!@/#+=\$%\^()&\*]+/g.test(a)) {
      return false;
    }return true;
  }var T = function T(t, a) {
    var e = getApp();M(e, this, "hide");
  };var b = function b(t, a) {
    var e = getApp();M(e, this, "unload");
  };var A = function A(t, a) {
    var e = "";try {
      e = wx.getStorageSync("aldstat_src");
    } catch (t) {
      e = "";
    }var s = getApp();if (typeof wx["showShareMenu"] != "undefined") {}if (e) {
      s.aldstat_src = e;
    }if (!q(t)) {
      if (typeof t.aldsrc != "undefined") {
        if (!e) {
          try {
            wx.setStorageSync("aldstat_src", t.aldsrc);
          } catch (t) {}s.aldstat_src = t.aldsrc;s.aldstat_qr = t.aldsrc;
        } else {
          s.aldstat_qr = t.aldsrc;
        }
      }if (typeof t.ald_share_src != "undefined") {
        s.ald_share_src = t.ald_share_src;
      }this.aldstat_page_args = JSON.stringify(t);
    }M(s, this, "load");
  };var M = function M(a, s, n) {
    var r = "";try {
      r = wx.getStorageSync("page_" + n + "_upload");
    } catch (t) {
      r = "";
    }if (!r && n !== "show") {
      return;
    }if (r < 1 && typeof r === "number") {
      return;
    }s.aldstat_start_time = Date.now();s.aldstat_error_count = 0;if (!a.aldstat_page_count) {
      a.aldstat_page_count = 1;
    } else {
      a.aldstat_page_count++;
    }if (!a.aldstat_first_page) {
      a.aldstat_first_page = s["__route__"];s.aldstat_is_first_page = true;
    }a.aldstat_last_page = s["__route__"];var i = { uu: l(a), at: a.aldstat_access_token, wsr: a.aldstat_showoption, ak: e["app_key"], ev: "page", st: s.aldstat_start_time, dr: Date.now() - s.aldstat_start_time, pp: s["__route__"], life: n, sc: s.page_share_count, ec: s.aldstat_error_count, nt: a.aldstat_network_type, pm: a.aldstat_phone_model, pr: a.aldstat_pixel_ratio, ww: a.aldstat_window_width, wh: a.aldstat_window_height, lang: a.aldstat_language, wv: a.aldstat_wechat_version, lat: a.aldstat_lat, lng: a.aldstat_lng, spd: a.aldstat_speed, v: t, wsdk: a.aldstat_vsdk_version, sv: a.aldstat_sv, wvv: a.aldstat_wvv };if (s.aldstat_is_first_page) {
      i["ifp"] = "true";
    }if (a.aldstat_page_last_page) {
      i["lp"] = a.aldstat_page_last_page;
    }if (a.aldstat_location_name) {
      i["ln"] = a.aldstat_location_name;
    }if (s.aldstat_page_args) {
      i["ag"] = s.aldstat_page_args;
    }if (a.aldstat_src) {
      i["sr"] = a.aldstat_src;
    }if (a.aldstat_qr) {
      i["qr"] = a.aldstat_qr;
    }if (a.ald_share_src) {
      i["usr"] = a.ald_share_src;
    }a.aldstat_page_last_page = s["__route__"];u(i, "GET", "d.html");
  };var I = function I(t, a) {
    var e = getApp();M(e, this, "show");
  };var E = function E(t, a) {
    var e = getApp();h(e, "event", "ald_pulldownrefresh", 1);
  };var O = function O(t, a) {
    var e = getApp();h(e, "event", "ald_reachbottom", 1);
  };var G = function G(t, a) {
    var s = this;var n = getApp();if (typeof t == "undefined") {
      return;
    }if (typeof t[1] == "undefined") {
      return;
    }var r = "";try {
      r = wx.getStorageSync("aldstat_uuid");
    } catch (t) {
      r = "uuid-getstoragesync";
    }var i = "";try {
      i = wx.getStorageSync(r);
    } catch (t) {
      i = "p_share_count_getst";
    }var o = "";if (n.ald_share_src === "undefined" || !n.ald_share_src) {
      try {
        o = wx.getStorageSync("aldstat_uuid");
      } catch (t) {
        o = "ald_share_src_getst";
      }
    } else {
      o = n.ald_share_src;var l = o.split(",");var _ = true;for (var d = 0, c = l.length; d < c; d++) {
        var p = l[d];if (p.replace('"', "") == r) {
          _ = false;break;
        }
      }if (l.length >= 3) {
        if (_) {
          l.shift();
        } else {}o = l.toString();
      }if (o !== "" && _) {
        o = o + "," + r;
      }
    }if (!t[1].path || t[1].path === "undefined") {
      if (e["defaultPath"]) {
        t[1].path = e["defaultPath"];
      } else {
        t[1].path = s["__route__"];
      }
    }if (t[1].path.indexOf("?") != -1) {
      t[1].path += "&ald_share_src=" + o;
    } else {
      t[1].path += "?ald_share_src=" + o;
    }h(n, "event", "ald_share_chain", { path: n.aldstat_last_page, chain: o });if (i === "" || typeof i === "undefined") {
      try {
        wx.setStorageSync(r, 1);
      } catch (t) {}i = 1;n.page_share_count = i;
    } else {
      i = parseInt(wx.getStorageSync(r)) + 1;n.page_share_count = i;try {
        wx.setStorageSync(r, i);
      } catch (t) {}
    }f(function (t) {
      var a = "";try {
        a = wx.getStorageSync("aldstat_uuid");
      } catch (t) {
        a = "uuid-getstoragesync";
      }t["userInfo"]["uu"] = a;u(t["userInfo"], "GET", "u.html");
    });var g = t[1];if (typeof t[1]["success"] === "undefined") {
      t[1]["success"] = function (t) {};
    }if (typeof t[1]["fail"] === "undefined") {
      t[1]["fail"] = function (t) {};
    }var w = t[1]["fail"];var y = t[1]["success"];t[1]["success"] = function (t) {
      var a = new Array();if (_typeof(t["shareTickets"]) === "object") {
        for (var e = 0; e < t["shareTickets"].length; e++) {
          v(n, t["shareTickets"][e], "user");
        }
      }h(n, "event", "ald_share_status", JSON.stringify(t));y(t);
    };t[1]["fail"] = function (t) {
      h(n, "event", "ald_share_status", "fail");w(t);
    };return t[1];
  };var j = function j(t) {
    var a = new Object();if (t.indexOf("?") != -1) {
      var e = t.split("?")[1];var s = e.split("&");for (var n = 0; n < s.length; n++) {
        a[s[n].split("=")[0]] = unescape(s[n].split("=")[1]);
      }
    } else {
      a = t;
    }return a;
  };var N = App;App = function App(t) {
    d(t, "onLaunch", y);d(t, "onUnlaunch", w);d(t, "onShow", x);d(t, "onHide", k);d(t, "onError", S);N(t);
  };var J = Page;Page = function Page(t) {
    d(t, "onLoad", A);d(t, "onUnload", b);d(t, "onShow", I);d(t, "onHide", T);d(t, "onReachBottom", O);d(t, "onPullDownRefresh", E);if (typeof t["onShareAppMessage"] != "undefined") {
      c(t, "onShareAppMessage", G);
    }J(t);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZC1zdGF0LmpzIl0sIm5hbWVzIjpbInQiLCJhIiwiZSIsInJlcXVpcmUiLCJzIiwibiIsInIiLCJpIiwibyIsImwiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInNldFN0b3JhZ2VTeW5jIiwiYWxkc3RhdF9pc19maXJzdF9vcGVuIiwiXyIsInJlcXVlc3QiLCJ1cmwiLCJoZWFkZXIiLCJBbGRTdGF0IiwibWV0aG9kIiwic3VjY2VzcyIsInN0YXR1c0NvZGUiLCJkYXRhIiwiZCIsImNhbGwiLCJjIiwiZiIsImdldFNldHRpbmciLCJhdXRoU2V0dGluZyIsImdldFVzZXJJbmZvIiwid2l0aENyZWRlbnRpYWxzIiwidSIsImFyZ3VtZW50cyIsImZhaWwiLCJwIiwiYWsiLCJ1dSIsImF0IiwiYWxkc3RhdF9hY2Nlc3NfdG9rZW4iLCJzdCIsInRwIiwiZXYiLCJ2IiwiYWxkc3RhdF9xciIsImgiLCJ3c3IiLCJhbGRzdGF0X3Nob3dvcHRpb24iLCJudCIsImFsZHN0YXRfbmV0d29ya190eXBlIiwicG0iLCJhbGRzdGF0X3Bob25lX21vZGVsIiwicHIiLCJhbGRzdGF0X3BpeGVsX3JhdGlvIiwid3ciLCJhbGRzdGF0X3dpbmRvd193aWR0aCIsIndoIiwiYWxkc3RhdF93aW5kb3dfaGVpZ2h0IiwibGFuZyIsImFsZHN0YXRfbGFuZ3VhZ2UiLCJ3diIsImFsZHN0YXRfd2VjaGF0X3ZlcnNpb24iLCJsYXQiLCJhbGRzdGF0X2xhdCIsImxuZyIsImFsZHN0YXRfbG5nIiwic3BkIiwiYWxkc3RhdF9zcGVlZCIsImFsZHN0YXRfbG9jYXRpb25fbmFtZSIsImFsZHN0YXRfc3JjIiwiZyIsImFwcCIsInByb3RvdHlwZSIsIkQiLCJsZW5ndGgiLCJKU09OIiwic3RyaW5naWZ5IiwiU3RyaW5nIiwiT2JqZWN0IiwidyIsImFsZHN0YXRfZHVyYXRpb24iLCJhbGRzdGF0X3Nob3d0aW1lIiwibSIsImdldFNoYXJlSW5mbyIsInNoYXJlVGlja2V0IiwieSIsImFsZHN0YXRfdXVpZCIsImFsZHN0YXRfdGltZXN0YW1wIiwiYWxkc3RhdF9lcnJvcl9jb3VudCIsImFsZHN0YXRfcGFnZV9jb3VudCIsImFsZHN0YXRfZmlyc3RfcGFnZSIsImdldE5ldHdvcmtUeXBlIiwiY29tcGxldGUiLCJnZXRTeXN0ZW1JbmZvIiwiYWxkc3RhdF92c2RrX3ZlcnNpb24iLCJhbGRzdGF0X3N2IiwiYWxkc3RhdF93dnYiLCJnZXRMb2NhdGlvbiIsInR5cGUiLCJTIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3YWlkIiwid3N0IiwiZHIiLCJldCIsInBjIiwiZnAiLCJscCIsImFsZHN0YXRfbGFzdF9wYWdlIiwibGlmZSIsImVjIiwid3NkayIsInN2Iiwid3Z2IiwicGFnZV9zaGFyZV9jb3VudCIsImFsZF9zaGFyZV9zcmMiLCJ4IiwiayIsInEiLCJyZXBsYWNlIiwidGVzdCIsIlQiLCJnZXRBcHAiLCJNIiwiYiIsIkEiLCJhbGRzcmMiLCJhbGRzdGF0X3BhZ2VfYXJncyIsImFsZHN0YXRfc3RhcnRfdGltZSIsImFsZHN0YXRfaXNfZmlyc3RfcGFnZSIsInBwIiwic2MiLCJhbGRzdGF0X3BhZ2VfbGFzdF9wYWdlIiwiSSIsIkUiLCJPIiwiRyIsInNwbGl0Iiwic2hpZnQiLCJ0b1N0cmluZyIsInBhdGgiLCJpbmRleE9mIiwiY2hhaW4iLCJwYXJzZUludCIsIkFycmF5IiwiaiIsInVuZXNjYXBlIiwiTiIsIkFwcCIsIkoiLCJQYWdlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsQ0FBQyxZQUFVO0FBQUMsTUFBSUEsSUFBRSxPQUFOLENBQWMsSUFBSUMsSUFBRSxLQUFOLENBQVksSUFBSUMsSUFBRUMsUUFBUSxvQkFBUixDQUFOLENBQW9DLElBQUlDLElBQUUsQ0FBTixDQUFRLElBQUlDLElBQUUsQ0FBTixDQUFRLElBQUlDLElBQUUsQ0FBTixDQUFRLElBQUlDLElBQUUsQ0FBTixDQUFRLElBQUlDLElBQUUsRUFBTixDQUFTLFNBQVNDLENBQVQs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SSxVQUFFRCxDQUFGO0FBQUksWUFBT0MsQ0FBUDtBQUFTLEdBQXJNLENBQXNNLElBQUlzSixJQUFFQyxHQUFOLENBQVVBLE1BQUksYUFBU3hKLENBQVQsRUFBVztBQUFDNEIsTUFBRTVCLENBQUYsRUFBSSxVQUFKLEVBQWV5RixDQUFmLEVBQWtCN0QsRUFBRTVCLENBQUYsRUFBSSxZQUFKLEVBQWlCbUYsQ0FBakIsRUFBb0J2RCxFQUFFNUIsQ0FBRixFQUFJLFFBQUosRUFBYXdILENBQWIsRUFBZ0I1RixFQUFFNUIsQ0FBRixFQUFJLFFBQUosRUFBYXlILENBQWIsRUFBZ0I3RixFQUFFNUIsQ0FBRixFQUFJLFNBQUosRUFBY3VHLENBQWQsRUFBaUJnRCxFQUFFdkosQ0FBRjtBQUFLLEdBQTVHLENBQTZHLElBQUl5SixJQUFFQyxJQUFOLENBQVdBLE9BQUssY0FBUzFKLENBQVQsRUFBVztBQUFDNEIsTUFBRTVCLENBQUYsRUFBSSxRQUFKLEVBQWFpSSxDQUFiLEVBQWdCckcsRUFBRTVCLENBQUYsRUFBSSxVQUFKLEVBQWVnSSxDQUFmLEVBQWtCcEcsRUFBRTVCLENBQUYsRUFBSSxRQUFKLEVBQWF5SSxDQUFiLEVBQWdCN0csRUFBRTVCLENBQUYsRUFBSSxRQUFKLEVBQWE2SCxDQUFiLEVBQWdCakcsRUFBRTVCLENBQUYsRUFBSSxlQUFKLEVBQW9CMkksQ0FBcEIsRUFBdUIvRyxFQUFFNUIsQ0FBRixFQUFJLG1CQUFKLEVBQXdCMEksQ0FBeEIsRUFBMkIsSUFBRyxPQUFPMUksRUFBRSxtQkFBRixDQUFQLElBQStCLFdBQWxDLEVBQThDO0FBQUM4QixRQUFFOUIsQ0FBRixFQUFJLG1CQUFKLEVBQXdCNEksQ0FBeEI7QUFBMkIsT0FBRTVJLENBQUY7QUFBSyxHQUFwTjtBQUFxTixDQUF4cFgiLCJmaWxlIjoiYWxkLXN0YXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXt2YXIgdD1cIjYuMS4yXCI7dmFyIGE9XCJsb2dcIjt2YXIgZT1yZXF1aXJlKFwiLi9hbGQtc3RhdC1jb25mLmpzXCIpO3ZhciBzPTA7dmFyIG49MDt2YXIgcj0wO3ZhciBpPTA7dmFyIG89e307ZnVuY3Rpb24gbCh0KXt2YXIgYT1cIlwiO3RyeXthPXd4LmdldFN0b3JhZ2VTeW5jKFwiYWxkc3RhdF91dWlkXCIpfWNhdGNoKHQpe2E9XCJ1dWlkLWdldHN0b3JhZ2VzeW5jXCJ9aWYoIWEpe2E9XCJcIitEYXRlLm5vdygpK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxZTcpO3RyeXt3eC5zZXRTdG9yYWdlU3luYyhcImFsZHN0YXRfdXVpZFwiLGEpfWNhdGNoKHQpe3d4LnNldFN0b3JhZ2VTeW5jKFwiYWxkc3RhdF91dWlkXCIsXCJ1dWlkLWdldHN0b3JhZ2VzeW5jXCIpfXQuYWxkc3RhdF9pc19maXJzdF9vcGVuPXRydWV9cmV0dXJuIGF9ZnVuY3Rpb24gXygpe3d4LnJlcXVlc3Qoe3VybDpcImh0dHBzOi8vXCIrYStcIi5hbGR3eC5jb20vY29uZmlnL2FwcC5qc29uXCIsaGVhZGVyOntBbGRTdGF0OlwiTWluaUFwcC1TdGF0XCJ9LG1ldGhvZDpcIkdFVFwiLHN1Y2Nlc3M6ZnVuY3Rpb24odCl7aWYodC5zdGF0dXNDb2RlPT09MjAwKXtmb3IodmFyIGEgaW4gdC5kYXRhKXt3eC5zZXRTdG9yYWdlU3luYyhhLHQuZGF0YVthXSl9fX19KX1mdW5jdGlvbiBkKHQsYSxlKXtpZih0W2FdKXt2YXIgcz10W2FdO3RbYV09ZnVuY3Rpb24odCl7ZS5jYWxsKHRoaXMsdCxhKTtzLmNhbGwodGhpcyx0KX19ZWxzZXt0W2FdPWZ1bmN0aW9uKHQpe2UuY2FsbCh0aGlzLHQsYSl9fX1mdW5jdGlvbiBjKHQsYSxlKXtpZih0W2FdKXt2YXIgcz10W2FdO3RbYV09ZnVuY3Rpb24odCl7dmFyIG49cy5jYWxsKHRoaXMsdCk7ZS5jYWxsKHRoaXMsW3Qsbl0sYSk7cmV0dXJuIG59fWVsc2V7dFthXT1mdW5jdGlvbih0KXtlLmNhbGwodGhpcyx0LGEpfX19dmFyIGY9ZnVuY3Rpb24odCl7aWYod3guZ2V0U2V0dGluZyl7d3guZ2V0U2V0dGluZyh7c3VjY2VzczpmdW5jdGlvbihhKXtpZihhLmF1dGhTZXR0aW5nW1wic2NvcGUudXNlckluZm9cIl0pe3d4LmdldFVzZXJJbmZvKHt3aXRoQ3JlZGVudGlhbHM6ZmFsc2Usc3VjY2VzczpmdW5jdGlvbihhKXt0KGEpfX0pfX19KX19O3ZhciB1PWZ1bmN0aW9uKHQsZSxuKXtpZih0eXBlb2YgYXJndW1lbnRzWzFdPT09XCJ1bmRlZmluZWRcIillPVwiR0VUXCI7aWYodHlwZW9mIGFyZ3VtZW50c1syXT09PVwidW5kZWZpbmVkXCIpbj1cImQuaHRtbFwiO3ZhciByPTA7dmFyIGk9ZnVuY3Rpb24oKXtzKz0xO3RbXCJycV9jXCJdPXM7d3gucmVxdWVzdCh7dXJsOlwiaHR0cHM6Ly9cIithK1wiLmFsZHd4LmNvbS9cIituLGRhdGE6dCxoZWFkZXI6e0FsZFN0YXQ6XCJNaW5pQXBwLVN0YXRcIn0sbWV0aG9kOmUsc3VjY2VzczpmdW5jdGlvbigpe30sZmFpbDpmdW5jdGlvbigpe2lmKHI8Mil7cisrO3RbXCJyZXRyeVRpbWVzXCJdPXI7aSgpfX19KX07aSgpfTt2YXIgcD1mdW5jdGlvbihhLHMsbixyKXt2YXIgaT17YWs6ZVtcImFwcF9rZXlcIl0sdXU6bChhKSxhdDphLmFsZHN0YXRfYWNjZXNzX3Rva2VuLHN0OkRhdGUubm93KCksdHA6bixldjpzLHY6dH07aWYocil7aVtcImN0XCJdPXJ9aWYoYS5hbGRzdGF0X3FyKXtpW1wicXJcIl09YS5hbGRzdGF0X3FyfXUoaSxcIkdFVFwiLFwiZC5odG1sXCIpfTt2YXIgaD1mdW5jdGlvbihhLHMsbixyKXtpZih0eXBlb2YgYVtcImFsZHN0YXRfc2hvd29wdGlvblwiXT09PVwidW5kZWZpbmVkXCIpe2FbXCJhbGRzdGF0X3Nob3dvcHRpb25cIl09e319dmFyIGk9e2FrOmVbXCJhcHBfa2V5XCJdLHdzcjphLmFsZHN0YXRfc2hvd29wdGlvbix1dTpsKGEpLGF0OmEuYWxkc3RhdF9hY2Nlc3NfdG9rZW4sc3Q6RGF0ZS5ub3coKSx0cDpuLGV2OnMsbnQ6YS5hbGRzdGF0X25ldHdvcmtfdHlwZSxwbTphLmFsZHN0YXRfcGhvbmVfbW9kZWwscHI6YS5hbGRzdGF0X3BpeGVsX3JhdGlvLHd3OmEuYWxkc3RhdF93aW5kb3dfd2lkdGgsd2g6YS5hbGRzdGF0X3dpbmRvd19oZWlnaHQsbGFuZzphLmFsZHN0YXRfbGFuZ3VhZ2Usd3Y6YS5hbGRzdGF0X3dlY2hhdF92ZXJzaW9uLGxhdDphLmFsZHN0YXRfbGF0LGxuZzphLmFsZHN0YXRfbG5nLHNwZDphLmFsZHN0YXRfc3BlZWQsdjp0fTtpZihyKXtpW1wiY3RcIl09cn1pZihhLmFsZHN0YXRfbG9jYXRpb25fbmFtZSl7aVtcImxuXCJdPWEuYWxkc3RhdF9sb2NhdGlvbl9uYW1lfWlmKGEuYWxkc3RhdF9zcmMpe2lbXCJzclwiXT1hLmFsZHN0YXRfc3JjfWlmKGEuYWxkc3RhdF9xcil7aVtcInFyXCJdPWEuYWxkc3RhdF9xcn11KGksXCJHRVRcIixcImQuaHRtbFwiKX07ZnVuY3Rpb24gZyh0KXt0aGlzLmFwcD10fWcucHJvdG90eXBlW1wiZGVidWdcIl09ZnVuY3Rpb24odCl7aCh0aGlzLmFwcCxcImRlYnVnXCIsMCx0KX07Zy5wcm90b3R5cGVbXCJ3YXJuXCJdPWZ1bmN0aW9uKHQpe2godGhpcy5hcHAsXCJkZWJ1Z1wiLDEsdCl9O2cucHJvdG90eXBlW1wiZXJyb3JcIl09ZnVuY3Rpb24odCl7cCh0aGlzLmFwcCxcImRlYnVnXCIsMix0KX07Zy5wcm90b3R5cGVbXCJzZW5kRXZlbnRcIl09ZnVuY3Rpb24odCxhKXtpZighRCh0KSl7cmV0dXJuIGZhbHNlfWlmKHQubGVuZ3RoPj0yNTUpe3JldHVybiBmYWxzZX1pZih0eXBlb2YgYT09PVwib2JqZWN0XCIpe2Zvcih2YXIgZSBpbiBhKXtpZighRChlKSl7cmV0dXJuIGZhbHNlfWlmKHR5cGVvZiBhW2VdPT1cIm9iamVjdFwiKXtyZXR1cm4gZmFsc2V9aWYoIUQoYVtlXSkpe3JldHVybiBmYWxzZX19aCh0aGlzLmFwcCxcImV2ZW50XCIsdCxKU09OLnN0cmluZ2lmeShhKSl9ZWxzZXtpZih0eXBlb2YgYT09PVwic3RyaW5nXCImJmEubGVuZ3RoPD0yNTUpe2lmKEQoYSkpe3ZhciBzPVN0cmluZyhhKTt2YXIgbj1uZXcgT2JqZWN0O25bc109YTtoKHRoaXMuYXBwLFwiZXZlbnRcIix0LGEpfX1lbHNle2godGhpcy5hcHAsXCJldmVudFwiLHQsZmFsc2UpfX19O3ZhciB3PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0LmFsZHN0YXRfZHVyYXRpb24rPURhdGUubm93KCktdC5hbGRzdGF0X3Nob3d0aW1lO20odCxcImFwcFwiLFwidW5MYXVuY2hcIil9O3ZhciB2PWZ1bmN0aW9uKHQsYSxlKXtpZih0eXBlb2Ygd3hbXCJnZXRTaGFyZUluZm9cIl0hPVwidW5kZWZpbmVkXCIpe3d4LmdldFNoYXJlSW5mbyh7c2hhcmVUaWNrZXQ6YSxzdWNjZXNzOmZ1bmN0aW9uKGEpe2godCxcImV2ZW50XCIsXCJhbGRfc2hhcmVfXCIrZSxKU09OLnN0cmluZ2lmeShhKSl9LGZhaWw6ZnVuY3Rpb24oKXtoKHQsXCJldmVudFwiLFwiYWxkX3NoYXJlX1wiK2UsXCIxXCIpfX0pfWVsc2V7aCh0LFwiZXZlbnRcIixcImFsZF9zaGFyZV9cIitlLFwiMVwiKX19O3ZhciB5PWZ1bmN0aW9uKHQpe18oKTt0aGlzW1wiYWxkc3RhdFwiXT1uZXcgZyh0aGlzKTt2YXIgYT1cIlwiO3RyeXthPXd4LmdldFN0b3JhZ2VTeW5jKFwiYWxkc3RhdF9zcmNcIil9Y2F0Y2godCl7YT1cInV1aWQtZ2V0c3RvcmFnZXN5bmNcIn1pZihhKXt0aGlzLmFsZHN0YXRfc3JjPWF9dmFyIHM9bCh0aGlzKTt0aGlzLmFsZHN0YXRfdXVpZD1zO3RoaXMuYWxkc3RhdF90aW1lc3RhbXA9RGF0ZS5ub3coKTt0aGlzLmFsZHN0YXRfc2hvd3RpbWU9RGF0ZS5ub3coKTt0aGlzLmFsZHN0YXRfZHVyYXRpb249MDt2YXIgbj10aGlzO24uYWxkc3RhdF9lcnJvcl9jb3VudD0wO24uYWxkc3RhdF9wYWdlX2NvdW50PTE7bi5hbGRzdGF0X2ZpcnN0X3BhZ2U9MDtpZih0eXBlb2YgdCE9XCJ1bmRlZmluZWRcIil7dGhpcy5hbGRzdGF0X3Nob3dvcHRpb249dH1lbHNle3RoaXMuYWxkc3RhdF9zaG93b3B0aW9uPXt9fXZhciByPWZ1bmN0aW9uKCl7d3guZ2V0TmV0d29ya1R5cGUoe3N1Y2Nlc3M6ZnVuY3Rpb24odCl7bi5hbGRzdGF0X25ldHdvcmtfdHlwZT10W1wibmV0d29ya1R5cGVcIl19LGNvbXBsZXRlOml9KX07dmFyIGk9ZnVuY3Rpb24oKXt3eC5nZXRTeXN0ZW1JbmZvKHtzdWNjZXNzOmZ1bmN0aW9uKHQpe24uYWxkc3RhdF92c2RrX3ZlcnNpb249dHlwZW9mIHRbXCJTREtWZXJzaW9uXCJdPT09XCJ1bmRlZmluZWRcIj9cIjEuMC4wXCI6dFtcIlNES1ZlcnNpb25cIl07bi5hbGRzdGF0X3Bob25lX21vZGVsPXRbXCJtb2RlbFwiXTtuLmFsZHN0YXRfcGl4ZWxfcmF0aW89dFtcInBpeGVsUmF0aW9cIl07bi5hbGRzdGF0X3dpbmRvd193aWR0aD10W1wid2luZG93V2lkdGhcIl07bi5hbGRzdGF0X3dpbmRvd19oZWlnaHQ9dFtcIndpbmRvd0hlaWdodFwiXTtuLmFsZHN0YXRfbGFuZ3VhZ2U9dFtcImxhbmd1YWdlXCJdO24uYWxkc3RhdF93ZWNoYXRfdmVyc2lvbj10W1widmVyc2lvblwiXTtuLmFsZHN0YXRfc3Y9dFtcInN5c3RlbVwiXTtuLmFsZHN0YXRfd3Z2PXRbXCJwbGF0Zm9ybVwiXX0sY29tcGxldGU6ZnVuY3Rpb24oKXtpZihlW1wiZ2V0TG9jYXRpb25cIl0pe2MoKX1kKCl9fSl9O3ZhciBkPWZ1bmN0aW9uKCl7ZihmdW5jdGlvbih0KXt2YXIgYT1cIlwiO3RyeXthPXd4LmdldFN0b3JhZ2VTeW5jKFwiYWxkc3RhdF91dWlkXCIpfWNhdGNoKHQpe2E9XCJ1dWlkLWdldHN0b3JhZ2VzeW5jXCJ9dFtcInVzZXJJbmZvXCJdW1widXVcIl09YTtvPXQ7dSh0W1widXNlckluZm9cIl0sXCJHRVRcIixcInUuaHRtbFwiKX0pfTt2YXIgYz1mdW5jdGlvbigpe3d4LmdldExvY2F0aW9uKHt0eXBlOlwid2dzODRcIixzdWNjZXNzOmZ1bmN0aW9uKHQpe24uYWxkc3RhdF9sYXQ9dFtcImxhdGl0dWRlXCJdO24uYWxkc3RhdF9sbmc9dFtcImxvbmdpdHVkZVwiXTtuLmFsZHN0YXRfc3BlZWQ9dFtcInNwZWVkXCJdfX0pfTtyKCk7dmFyIHA9XCJcIjt0cnl7cD13eC5nZXRTdG9yYWdlU3luYyhcImFwcF9zZXNzaW9uX2tleV9jcmVhdGVfbGF1bmNoX3VwbG9hZFwiKX1jYXRjaCh0KXtwPVwiXCJ9aWYoIXApe24uYWxkc3RhdF9hY2Nlc3NfdG9rZW49XCJcIitEYXRlLm5vdygpK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxZTcpfWVsc2V7aWYocD4wJiZ0eXBlb2YgcD09PVwibnVtYmVyXCIpe24uYWxkc3RhdF9hY2Nlc3NfdG9rZW49XCJcIitEYXRlLm5vdygpK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxZTcpfX1tKG4sXCJhcHBcIixcImxhdW5jaFwiKX07dmFyIFM9ZnVuY3Rpb24odCxhKXt2YXIgZT10aGlzO2lmKHR5cGVvZiB0aGlzLmFsZHN0YXRfZXJyb3JfY291bnQ9PT1cInVuZGVmaW5lZFwiKXt0aGlzLmFsZHN0YXRfZXJyb3JfY291bnQ9MX1lbHNle3RoaXMuYWxkc3RhdF9lcnJvcl9jb3VudCsrfWgoZSxcImV2ZW50XCIsXCJhbGRfZXJyb3JfbWVzc2FnZVwiLEpTT04uc3RyaW5naWZ5KHQpKX07dmFyIG09ZnVuY3Rpb24oYSxzLG8pe3ZhciBfPVwiXCI7dHJ5e189d3guZ2V0U3RvcmFnZVN5bmMoXCJhcHBfXCIrbytcIl91cGxvYWRcIil9Y2F0Y2godCl7Xz1cIlwifWlmKCFfJiZvIT09XCJsYXVuY2hcIil7cmV0dXJufWlmKF88MSYmdHlwZW9mIF89PT1cIm51bWJlclwiKXtyZXR1cm59aWYodHlwZW9mIGEuYWxkc3RhdF90aW1lc3RhbXA9PT1cInVuZGVmaW5lZFwiKXthLmFsZHN0YXRfdGltZXN0YW1wPURhdGUubm93KCl9dmFyIGQ9d3guZ2V0U3lzdGVtSW5mb1N5bmMoKTthLmFsZHN0YXRfdnNka192ZXJzaW9uPXR5cGVvZiBkW1wiU0RLVmVyc2lvblwiXT09PVwidW5kZWZpbmVkXCI/XCIxLjAuMFwiOmRbXCJTREtWZXJzaW9uXCJdO2EuYWxkc3RhdF9waG9uZV9tb2RlbD1kW1wibW9kZWxcIl07YS5hbGRzdGF0X3BpeGVsX3JhdGlvPWRbXCJwaXhlbFJhdGlvXCJdO2EuYWxkc3RhdF93aW5kb3dfd2lkdGg9ZFtcIndpbmRvd1dpZHRoXCJdO2EuYWxkc3RhdF93aW5kb3dfaGVpZ2h0PWRbXCJ3aW5kb3dIZWlnaHRcIl07YS5hbGRzdGF0X2xhbmd1YWdlPWRbXCJsYW5ndWFnZVwiXTthLmFsZHN0YXRfc3Y9ZFtcInN5c3RlbVwiXTthLmFsZHN0YXRfd3Z2PWRbXCJwbGF0Zm9ybVwiXTt2YXIgYz17YWs6ZVtcImFwcF9rZXlcIl0sd2FpZDplW1wiYXBwaWRcIl0sd3N0OmVbXCJhcHBzZWNyZXRcIl0sdXU6bChhKSxhdDphLmFsZHN0YXRfYWNjZXNzX3Rva2VuLHdzcjphLmFsZHN0YXRfc2hvd29wdGlvbixzdDphLmFsZHN0YXRfdGltZXN0YW1wLGRyOmEuYWxkc3RhdF9kdXJhdGlvbixldDpEYXRlLm5vdygpLHBjOmEuYWxkc3RhdF9wYWdlX2NvdW50LGZwOmEuYWxkc3RhdF9maXJzdF9wYWdlLGxwOmEuYWxkc3RhdF9sYXN0X3BhZ2UsbGlmZTpvLGVjOmEuYWxkc3RhdF9lcnJvcl9jb3VudCxudDphLmFsZHN0YXRfbmV0d29ya190eXBlLHBtOmEuYWxkc3RhdF9waG9uZV9tb2RlbCx3c2RrOmEuYWxkc3RhdF92c2RrX3ZlcnNpb24scHI6YS5hbGRzdGF0X3BpeGVsX3JhdGlvLHd3OmEuYWxkc3RhdF93aW5kb3dfd2lkdGgsd2g6YS5hbGRzdGF0X3dpbmRvd19oZWlnaHQsbGFuZzphLmFsZHN0YXRfbGFuZ3VhZ2Usd3Y6YS5hbGRzdGF0X3dlY2hhdF92ZXJzaW9uLGxhdDphLmFsZHN0YXRfbGF0LGxuZzphLmFsZHN0YXRfbG5nLHNwZDphLmFsZHN0YXRfc3BlZWQsdjp0LGV2OnMsc3Y6YS5hbGRzdGF0X3N2LHd2djphLmFsZHN0YXRfd3Z2fTtpZihvPT09XCJsYXVuY2hcIil7bis9MX1lbHNlIGlmKG89PT1cInNob3dcIil7cis9MX1lbHNle2krPTF9Y1tcImxhX2NcIl09bjtjW1wiYXNfY1wiXT1yO2NbXCJhaF9jXCJdPWk7aWYoYS5wYWdlX3NoYXJlX2NvdW50JiZ0eXBlb2YgYS5wYWdlX3NoYXJlX2NvdW50PT09XCJudW1iZXJcIil7Y1tcInNjXCJdPWEucGFnZV9zaGFyZV9jb3VudH1pZihhLmFsZHN0YXRfaXNfZmlyc3Rfb3Blbil7Y1tcImlmb1wiXT1cInRydWVcIn1pZihhLmFsZHN0YXRfbG9jYXRpb25fbmFtZSl7Y1tcImxuXCJdPWEuYWxkc3RhdF9sb2NhdGlvbl9uYW1lfWlmKGEuYWxkc3RhdF9zcmMpe2NbXCJzclwiXT1hLmFsZHN0YXRfc3JjfWlmKGEuYWxkc3RhdF9xcil7Y1tcInFyXCJdPWEuYWxkc3RhdF9xcn1pZihhLmFsZF9zaGFyZV9zcmMpe2NbXCJ1c3JcIl09YS5hbGRfc2hhcmVfc3JjfXUoYyxcIkdFVFwiLFwiZC5odG1sXCIpfTt2YXIgeD1mdW5jdGlvbih0KXt0aGlzLmFsZHN0YXRfc2hvd3RpbWU9RGF0ZS5ub3coKTtpZih0eXBlb2YgdCE9XCJ1bmRlZmluZWRcIil7dGhpcy5hbGRzdGF0X3Nob3dvcHRpb249dH1lbHNle3RoaXMuYWxkc3RhdF9zaG93b3B0aW9uPXt9fXZhciBhPVwiXCI7dHJ5e2E9d3guZ2V0U3RvcmFnZVN5bmMoXCJhcHBfc2Vzc2lvbl9rZXlfY3JlYXRlX3Nob3dfdXBsb2FkXCIpfWNhdGNoKHQpe2E9XCJcIn1pZihhKXtpZihhPjAmJnR5cGVvZiBhPT09XCJudW1iZXJcIil7dGhpcy5hbGRzdGF0X2FjY2Vzc190b2tlbj1cIlwiK0RhdGUubm93KCkrTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjFlNyl9fW0odGhpcyxcImFwcFwiLFwic2hvd1wiKTtpZih0eXBlb2YgdCE9XCJ1bmRlZmluZWRcIil7aWYodHlwZW9mIHRbXCJzaGFyZVRpY2tldFwiXSE9XCJ1bmRlZmluZWRcIil7dih0aGlzLHRbXCJzaGFyZVRpY2tldFwiXSxcImNsaWNrXCIpfWVsc2UgaWYodHlwZW9mIHRbXCJxdWVyeVwiXSE9XCJ1bmRlZmluZWRcIil7aWYodHlwZW9mIHRbXCJxdWVyeVwiXVtcImFsZF9zaGFyZV9zcmNcIl0hPVwidW5kZWZpbmVkXCIpe3YodGhpcyxcIjBcIixcImNsaWNrXCIpfX19fTt2YXIgaz1mdW5jdGlvbih0LGEpe3ZhciBlPXRoaXM7aWYoZS5hbGRzdGF0X2lzX2ZpcnN0X29wZW4pe2UuYWxkc3RhdF9pc19maXJzdF9vcGVuPWZhbHNlfWUuYWxkc3RhdF9kdXJhdGlvbj1EYXRlLm5vdygpLWUuYWxkc3RhdF9zaG93dGltZTttKGUsXCJhcHBcIixcImhpZGVcIil9O2Z1bmN0aW9uIHEodCl7Zm9yKHZhciBhIGluIHQpe3JldHVybiBmYWxzZX1yZXR1cm4gdHJ1ZX1mdW5jdGlvbiBEKHQpe2lmKHR5cGVvZiB0IT09XCJzdHJpbmdcIil7cmV0dXJuIGZhbHNlfXZhciBhPXQucmVwbGFjZSgvXFxzKy9nLFwiX1wiKTtpZigvW35gIUAvIys9XFwkJVxcXigpJlxcKl0rL2cudGVzdChhKSl7cmV0dXJuIGZhbHNlfXJldHVybiB0cnVlfXZhciBUPWZ1bmN0aW9uKHQsYSl7dmFyIGU9Z2V0QXBwKCk7TShlLHRoaXMsXCJoaWRlXCIpfTt2YXIgYj1mdW5jdGlvbih0LGEpe3ZhciBlPWdldEFwcCgpO00oZSx0aGlzLFwidW5sb2FkXCIpfTt2YXIgQT1mdW5jdGlvbih0LGEpe3ZhciBlPVwiXCI7dHJ5e2U9d3guZ2V0U3RvcmFnZVN5bmMoXCJhbGRzdGF0X3NyY1wiKX1jYXRjaCh0KXtlPVwiXCJ9dmFyIHM9Z2V0QXBwKCk7aWYodHlwZW9mIHd4W1wic2hvd1NoYXJlTWVudVwiXSE9XCJ1bmRlZmluZWRcIil7fWlmKGUpe3MuYWxkc3RhdF9zcmM9ZX1pZighcSh0KSl7aWYodHlwZW9mIHQuYWxkc3JjIT1cInVuZGVmaW5lZFwiKXtpZighZSl7dHJ5e3d4LnNldFN0b3JhZ2VTeW5jKFwiYWxkc3RhdF9zcmNcIix0LmFsZHNyYyl9Y2F0Y2godCl7fXMuYWxkc3RhdF9zcmM9dC5hbGRzcmM7cy5hbGRzdGF0X3FyPXQuYWxkc3JjfWVsc2V7cy5hbGRzdGF0X3FyPXQuYWxkc3JjfX1pZih0eXBlb2YgdC5hbGRfc2hhcmVfc3JjIT1cInVuZGVmaW5lZFwiKXtzLmFsZF9zaGFyZV9zcmM9dC5hbGRfc2hhcmVfc3JjfXRoaXMuYWxkc3RhdF9wYWdlX2FyZ3M9SlNPTi5zdHJpbmdpZnkodCl9TShzLHRoaXMsXCJsb2FkXCIpfTt2YXIgTT1mdW5jdGlvbihhLHMsbil7dmFyIHI9XCJcIjt0cnl7cj13eC5nZXRTdG9yYWdlU3luYyhcInBhZ2VfXCIrbitcIl91cGxvYWRcIil9Y2F0Y2godCl7cj1cIlwifWlmKCFyJiZuIT09XCJzaG93XCIpe3JldHVybn1pZihyPDEmJnR5cGVvZiByPT09XCJudW1iZXJcIil7cmV0dXJufXMuYWxkc3RhdF9zdGFydF90aW1lPURhdGUubm93KCk7cy5hbGRzdGF0X2Vycm9yX2NvdW50PTA7aWYoIWEuYWxkc3RhdF9wYWdlX2NvdW50KXthLmFsZHN0YXRfcGFnZV9jb3VudD0xfWVsc2V7YS5hbGRzdGF0X3BhZ2VfY291bnQrK31pZighYS5hbGRzdGF0X2ZpcnN0X3BhZ2Upe2EuYWxkc3RhdF9maXJzdF9wYWdlPXNbXCJfX3JvdXRlX19cIl07cy5hbGRzdGF0X2lzX2ZpcnN0X3BhZ2U9dHJ1ZX1hLmFsZHN0YXRfbGFzdF9wYWdlPXNbXCJfX3JvdXRlX19cIl07dmFyIGk9e3V1OmwoYSksYXQ6YS5hbGRzdGF0X2FjY2Vzc190b2tlbix3c3I6YS5hbGRzdGF0X3Nob3dvcHRpb24sYWs6ZVtcImFwcF9rZXlcIl0sZXY6XCJwYWdlXCIsc3Q6cy5hbGRzdGF0X3N0YXJ0X3RpbWUsZHI6RGF0ZS5ub3coKS1zLmFsZHN0YXRfc3RhcnRfdGltZSxwcDpzW1wiX19yb3V0ZV9fXCJdLGxpZmU6bixzYzpzLnBhZ2Vfc2hhcmVfY291bnQsZWM6cy5hbGRzdGF0X2Vycm9yX2NvdW50LG50OmEuYWxkc3RhdF9uZXR3b3JrX3R5cGUscG06YS5hbGRzdGF0X3Bob25lX21vZGVsLHByOmEuYWxkc3RhdF9waXhlbF9yYXRpbyx3dzphLmFsZHN0YXRfd2luZG93X3dpZHRoLHdoOmEuYWxkc3RhdF93aW5kb3dfaGVpZ2h0LGxhbmc6YS5hbGRzdGF0X2xhbmd1YWdlLHd2OmEuYWxkc3RhdF93ZWNoYXRfdmVyc2lvbixsYXQ6YS5hbGRzdGF0X2xhdCxsbmc6YS5hbGRzdGF0X2xuZyxzcGQ6YS5hbGRzdGF0X3NwZWVkLHY6dCx3c2RrOmEuYWxkc3RhdF92c2RrX3ZlcnNpb24sc3Y6YS5hbGRzdGF0X3N2LHd2djphLmFsZHN0YXRfd3Z2fTtpZihzLmFsZHN0YXRfaXNfZmlyc3RfcGFnZSl7aVtcImlmcFwiXT1cInRydWVcIn1pZihhLmFsZHN0YXRfcGFnZV9sYXN0X3BhZ2Upe2lbXCJscFwiXT1hLmFsZHN0YXRfcGFnZV9sYXN0X3BhZ2V9aWYoYS5hbGRzdGF0X2xvY2F0aW9uX25hbWUpe2lbXCJsblwiXT1hLmFsZHN0YXRfbG9jYXRpb25fbmFtZX1pZihzLmFsZHN0YXRfcGFnZV9hcmdzKXtpW1wiYWdcIl09cy5hbGRzdGF0X3BhZ2VfYXJnc31pZihhLmFsZHN0YXRfc3JjKXtpW1wic3JcIl09YS5hbGRzdGF0X3NyY31pZihhLmFsZHN0YXRfcXIpe2lbXCJxclwiXT1hLmFsZHN0YXRfcXJ9aWYoYS5hbGRfc2hhcmVfc3JjKXtpW1widXNyXCJdPWEuYWxkX3NoYXJlX3NyY31hLmFsZHN0YXRfcGFnZV9sYXN0X3BhZ2U9c1tcIl9fcm91dGVfX1wiXTt1KGksXCJHRVRcIixcImQuaHRtbFwiKX07dmFyIEk9ZnVuY3Rpb24odCxhKXt2YXIgZT1nZXRBcHAoKTtNKGUsdGhpcyxcInNob3dcIil9O3ZhciBFPWZ1bmN0aW9uKHQsYSl7dmFyIGU9Z2V0QXBwKCk7aChlLFwiZXZlbnRcIixcImFsZF9wdWxsZG93bnJlZnJlc2hcIiwxKX07dmFyIE89ZnVuY3Rpb24odCxhKXt2YXIgZT1nZXRBcHAoKTtoKGUsXCJldmVudFwiLFwiYWxkX3JlYWNoYm90dG9tXCIsMSl9O3ZhciBHPWZ1bmN0aW9uKHQsYSl7dmFyIHM9dGhpczt2YXIgbj1nZXRBcHAoKTtpZih0eXBlb2YgdD09XCJ1bmRlZmluZWRcIil7cmV0dXJufWlmKHR5cGVvZiB0WzFdPT1cInVuZGVmaW5lZFwiKXtyZXR1cm59dmFyIHI9XCJcIjt0cnl7cj13eC5nZXRTdG9yYWdlU3luYyhcImFsZHN0YXRfdXVpZFwiKX1jYXRjaCh0KXtyPVwidXVpZC1nZXRzdG9yYWdlc3luY1wifXZhciBpPVwiXCI7dHJ5e2k9d3guZ2V0U3RvcmFnZVN5bmMocil9Y2F0Y2godCl7aT1cInBfc2hhcmVfY291bnRfZ2V0c3RcIn12YXIgbz1cIlwiO2lmKG4uYWxkX3NoYXJlX3NyYz09PVwidW5kZWZpbmVkXCJ8fCFuLmFsZF9zaGFyZV9zcmMpe3RyeXtvPXd4LmdldFN0b3JhZ2VTeW5jKFwiYWxkc3RhdF91dWlkXCIpfWNhdGNoKHQpe289XCJhbGRfc2hhcmVfc3JjX2dldHN0XCJ9fWVsc2V7bz1uLmFsZF9zaGFyZV9zcmM7dmFyIGw9by5zcGxpdChcIixcIik7dmFyIF89dHJ1ZTtmb3IodmFyIGQ9MCxjPWwubGVuZ3RoO2Q8YztkKyspe3ZhciBwPWxbZF07aWYocC5yZXBsYWNlKCdcIicsXCJcIik9PXIpe189ZmFsc2U7YnJlYWt9fWlmKGwubGVuZ3RoPj0zKXtpZihfKXtsLnNoaWZ0KCl9ZWxzZXt9bz1sLnRvU3RyaW5nKCl9aWYobyE9PVwiXCImJl8pe289bytcIixcIityfX1pZighdFsxXS5wYXRofHx0WzFdLnBhdGg9PT1cInVuZGVmaW5lZFwiKXtpZihlW1wiZGVmYXVsdFBhdGhcIl0pe3RbMV0ucGF0aD1lW1wiZGVmYXVsdFBhdGhcIl19ZWxzZXt0WzFdLnBhdGg9c1tcIl9fcm91dGVfX1wiXX19aWYodFsxXS5wYXRoLmluZGV4T2YoXCI/XCIpIT0tMSl7dFsxXS5wYXRoKz1cIiZhbGRfc2hhcmVfc3JjPVwiK299ZWxzZXt0WzFdLnBhdGgrPVwiP2FsZF9zaGFyZV9zcmM9XCIrb31oKG4sXCJldmVudFwiLFwiYWxkX3NoYXJlX2NoYWluXCIse3BhdGg6bi5hbGRzdGF0X2xhc3RfcGFnZSxjaGFpbjpvfSk7aWYoaT09PVwiXCJ8fHR5cGVvZiBpPT09XCJ1bmRlZmluZWRcIil7dHJ5e3d4LnNldFN0b3JhZ2VTeW5jKHIsMSl9Y2F0Y2godCl7fWk9MTtuLnBhZ2Vfc2hhcmVfY291bnQ9aX1lbHNle2k9cGFyc2VJbnQod3guZ2V0U3RvcmFnZVN5bmMocikpKzE7bi5wYWdlX3NoYXJlX2NvdW50PWk7dHJ5e3d4LnNldFN0b3JhZ2VTeW5jKHIsaSl9Y2F0Y2godCl7fX1mKGZ1bmN0aW9uKHQpe3ZhciBhPVwiXCI7dHJ5e2E9d3guZ2V0U3RvcmFnZVN5bmMoXCJhbGRzdGF0X3V1aWRcIil9Y2F0Y2godCl7YT1cInV1aWQtZ2V0c3RvcmFnZXN5bmNcIn10W1widXNlckluZm9cIl1bXCJ1dVwiXT1hO3UodFtcInVzZXJJbmZvXCJdLFwiR0VUXCIsXCJ1Lmh0bWxcIil9KTt2YXIgZz10WzFdO2lmKHR5cGVvZiB0WzFdW1wic3VjY2Vzc1wiXT09PVwidW5kZWZpbmVkXCIpe3RbMV1bXCJzdWNjZXNzXCJdPWZ1bmN0aW9uKHQpe319aWYodHlwZW9mIHRbMV1bXCJmYWlsXCJdPT09XCJ1bmRlZmluZWRcIil7dFsxXVtcImZhaWxcIl09ZnVuY3Rpb24odCl7fX12YXIgdz10WzFdW1wiZmFpbFwiXTt2YXIgeT10WzFdW1wic3VjY2Vzc1wiXTt0WzFdW1wic3VjY2Vzc1wiXT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgQXJyYXk7aWYodHlwZW9mIHRbXCJzaGFyZVRpY2tldHNcIl09PT1cIm9iamVjdFwiKXtmb3IodmFyIGU9MDtlPHRbXCJzaGFyZVRpY2tldHNcIl0ubGVuZ3RoO2UrKyl7dihuLHRbXCJzaGFyZVRpY2tldHNcIl1bZV0sXCJ1c2VyXCIpfX1oKG4sXCJldmVudFwiLFwiYWxkX3NoYXJlX3N0YXR1c1wiLEpTT04uc3RyaW5naWZ5KHQpKTt5KHQpfTt0WzFdW1wiZmFpbFwiXT1mdW5jdGlvbih0KXtoKG4sXCJldmVudFwiLFwiYWxkX3NoYXJlX3N0YXR1c1wiLFwiZmFpbFwiKTt3KHQpfTtyZXR1cm4gdFsxXX07dmFyIGo9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IE9iamVjdDtpZih0LmluZGV4T2YoXCI/XCIpIT0tMSl7dmFyIGU9dC5zcGxpdChcIj9cIilbMV07dmFyIHM9ZS5zcGxpdChcIiZcIik7Zm9yKHZhciBuPTA7bjxzLmxlbmd0aDtuKyspe2Fbc1tuXS5zcGxpdChcIj1cIilbMF1dPXVuZXNjYXBlKHNbbl0uc3BsaXQoXCI9XCIpWzFdKX19ZWxzZXthPXR9cmV0dXJuIGF9O3ZhciBOPUFwcDtBcHA9ZnVuY3Rpb24odCl7ZCh0LFwib25MYXVuY2hcIix5KTtkKHQsXCJvblVubGF1bmNoXCIsdyk7ZCh0LFwib25TaG93XCIseCk7ZCh0LFwib25IaWRlXCIsayk7ZCh0LFwib25FcnJvclwiLFMpO04odCl9O3ZhciBKPVBhZ2U7UGFnZT1mdW5jdGlvbih0KXtkKHQsXCJvbkxvYWRcIixBKTtkKHQsXCJvblVubG9hZFwiLGIpO2QodCxcIm9uU2hvd1wiLEkpO2QodCxcIm9uSGlkZVwiLFQpO2QodCxcIm9uUmVhY2hCb3R0b21cIixPKTtkKHQsXCJvblB1bGxEb3duUmVmcmVzaFwiLEUpO2lmKHR5cGVvZiB0W1wib25TaGFyZUFwcE1lc3NhZ2VcIl0hPVwidW5kZWZpbmVkXCIpe2ModCxcIm9uU2hhcmVBcHBNZXNzYWdlXCIsRyl9Sih0KX19KSgpOyJdfQ==