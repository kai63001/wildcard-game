(this.webpackJsonpweb3gl=this.webpackJsonpweb3gl||[]).push([[67],{573:function(n,t,e){"use strict";e.r(t);var r=e(2),o=e.n(r),a=(e(80),e(137));e(51),e(99),e(98),e(82);function i(n,t,e,r,o,a,i){try{var u=n[a](i),s=u.value}catch(c){return void e(c)}u.done?t(s):Promise.resolve(s).then(r,o)}function u(n){return function(){var t=this,e=arguments;return new Promise((function(r,o){var a=n.apply(t,e);function u(n){i(a,r,o,u,s,"next",n)}function s(n){i(a,r,o,u,s,"throw",n)}u(void 0)}))}}t.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=n.heading,e=n.description,r=n.icon,i=n.html,s=n.button;return function(){var n=u(o.a.mark((function n(u){var c,d,l,f;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(c=u.wallet,d=u.address,l=u.stateSyncStatus,f=u.stateStore,null!==d){n.next=5;break}if(!l.address){n.next=5;break}return n.next=5,new Promise((function(n){l.address&&l.address.then(n),setTimeout((function(){null===d&&n(void 0)}),500)}));case 5:if(f.address.get()||!c||!c.name){n.next=7;break}return n.abrupt("return",{heading:t||"Login and Authorize Your Wallet",description:e||"This dapp requires access to your wallet, please login and authorize access to your ".concat(c.name," accounts to continue."),eventCode:"loginFail",action:c.connect,icon:r||a.g,html:i,button:s});case 7:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()}}}]);