(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"2df4":function(e,t,n){"use strict";var o=n("b109"),r=n.n(o);r.a},"39a9":function(e,t,n){"use strict";n.r(t);var o=n("a87c"),r=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=r.a},"5def":function(e,t,n){"use strict";(function(e){n("a69e");var t=i(n("8064")),o=i(n("7abf")),r=i(n("66fd")),c=i(n("0932")),u=f(n("e3aa"));function a(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function f(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var c=o?Object.getOwnPropertyDescriptor(e,r):null;c&&(c.get||c.set)?Object.defineProperty(n,r,c):n[r]=e[r]}return n.default=e,t&&t.set(e,n),n}function i(e){return e&&e.__esModule?e:{default:e}}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}wx.__webpack_require_UNI_MP_PLUGIN__=n,r.default.config.productionTip=!1,t.default.mpType="app";var d=new r.default(s(s({},t.default),{},{store:o.default}));e(d).$mount();var b=function(){n.e("components/test-my").then(function(){return resolve(n("59ec"))}.bind(null,n)).catch(n.oe)},m=function(){n.e("components/nav-custom").then(function(){return resolve(n("9e92"))}.bind(null,n)).catch(n.oe)},v=function(){n.e("components/home-title").then(function(){return resolve(n("6150"))}.bind(null,n)).catch(n.oe)},y=function(){n.e("components/good-item").then(function(){return resolve(n("93b7"))}.bind(null,n)).catch(n.oe)};for(var O in r.default.use(c.default),r.default.component("good-item",y),r.default.component("home-title",v),r.default.component("my-comp",b),r.default.component("nav-custom",m),u)r.default.prototype[O]=u[O]}).call(this,n("543d")["createApp"])},8064:function(e,t,n){"use strict";n.r(t);var o=n("39a9");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("2df4");var c,u,a,f,i=n("f0c5"),l=Object(i["a"])(o["default"],c,u,!1,null,null,null,!1,a,f);t["default"]=l.exports},a87c:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={onLaunch:function(){try{var t=e.getStorageSync("userInfo");t&&(console.log(t),this.$store.commit("user/initInfo",t),this.$store.dispatch("address/addressInitAct",t.objectId))}catch(n){console.log("提取用户信息失败")}}};t.default=n}).call(this,n("543d")["default"])},b109:function(e,t,n){}},[["5def","common/runtime","common/vendor"]]]);