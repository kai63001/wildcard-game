(this.webpackJsonpweb3gl=this.webpackJsonpweb3gl||[]).push([[72],{554:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=e&&("undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null==n)return;var r,a,c=[],u=!0,s=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);u=!0);}catch(o){s=!0,a=o}finally{try{u||null==n.return||n.return()}finally{if(s)throw a}}return c}(e,t)||l(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e){return function(e){if(Array.isArray(e))return f(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||l(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){if(e){if("string"===typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t,n,r,a,c,u){try{var s=e[c](u),o=s.value}catch(i){return void n(i)}s.done?t(o):Promise.resolve(o).then(r,a)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var c=e.apply(t,n);function u(e){p(c,r,a,u,s,"next",e)}function s(e){p(c,r,a,u,s,"throw",e)}u(void 0)}))}}var d="m/44'/60'";function v(e){return b.apply(this,arguments)}function b(){return(b=h(a.a.mark((function e(t){var r,c,s,l,f,p,v,b,w,g,y,x,k,P,z,S,A,O,M,j,T,E,I,N,B,L,V,H,D,U,C,W,_,J,K,q,$,F,G,Q,R,X,Y,Z,ee,te,ne,re,ae,ce,ue,se,oe,ie,le,fe,pe;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return pe=function(){return(pe=h(a.a.mark((function e(t){var n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.data,0!==B.size){e.next=4;break}return e.next=4,F();case 4:return r=i(B.values())[0],e.abrupt("return",C.signEIP712HashedMessage(r,x.bufferToHex(z(n)),x.bufferToHex(S(n))).then((function(e){var t=(e.v-27).toString(16);return t.length<2&&(t="0"+t),"0x".concat(e.r).concat(e.s).concat(t)})));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)},fe=function(e){return pe.apply(this,arguments)},le=function(){return(le=h(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==B.size){e.next=3;break}return e.next=3,F();case 3:return n=i(B.values())[0],e.abrupt("return",C.signPersonalMessage(n,x.stripHexPrefix(t.data)).then((function(e){var t=(e.v-27).toString(16);return t.length<2&&(t="0"+t),"0x".concat(e.r).concat(e.s).concat(t)})));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)},ie=function(e){return le.apply(this,arguments)},oe=function(){return(oe=h(a.a.mark((function e(t){var n,r,c,s,o,l,f,p,h,d;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=i(B.values())[0],r=x.BN,c=x.toBuffer,s=new y({chain:I||T(A)}),e.prev=3,(l=w.fromTxData(u(u({},t),{},{gasLimit:null!==(o=t.gas)&&void 0!==o?o:t.gasLimit}),{common:s,freeze:!1})).v=new r(c(A)),l.r=l.s=new r(c(0)),e.next=9,C.signTransaction(n,l.serialize().toString("hex"));case 9:return f=e.sent,p=f.v.toString(16),(h=parseInt(p,16))!==(d=2*A+35)&&(h&d)!==h&&(d+=1),p=d.toString(16),l.v=new r(c("0x".concat(p))),l.r=new r(c("0x".concat(f.r))),l.s=new r(c("0x".concat(f.s))),e.abrupt("return","0x".concat(l.serialize().toString("hex")));case 21:throw e.prev=21,e.t0=e.catch(3),e.t0;case 24:case"end":return e.stop()}}),e,null,[[3,21]])})))).apply(this,arguments)},se=function(e){return oe.apply(this,arguments)},ue=function(e){return new Promise((function(t,n){D.sendAsync({jsonrpc:"2.0",method:"eth_getBalance",params:[e,"latest"],id:42},(function(e,r){e&&n(e);var a=r&&r.result;t(null!=a?new j(a).toString(10):null)}))}))},ce=function(e){return Promise.all(e.map((function(e){return new Promise(function(){var t=h(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ue(e);case 2:r=t.sent,n({address:e,balance:r});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())})))},ae=function(){return(ae=h(a.a.mark((function e(t){var n,r,c,u,s,o,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(L){e.next=2;break}return e.abrupt("return",[]);case 2:if(!(B.size>0)||t){e.next=4;break}return e.abrupt("return",G());case 4:if(C){e.next=7;break}return e.next=7,q();case 7:if(""===N&&(N=d),N!==d){e.next=24;break}for(n=B.size,r=[],c=n;c<5+n;c++)r.push("".concat(d,"/").concat(c,"'/0/0"));u=0,s=r;case 13:if(!(u<s.length)){e.next=22;break}return o=s[u],e.next=17,C.getAddress(o);case 17:i=e.sent,B.set(i.address,o);case 19:u++,e.next=13;break;case 22:e.next=36;break;case 24:if(H){e.next=34;break}return e.prev=25,e.next=28,Y();case 28:H=e.sent,e.next=34;break;case 31:throw e.prev=31,e.t0=e.catch(25),e.t0;case 34:l(H,B.size).forEach((function(e){var t=e.dPath,n=e.address;B.set(n,t)}));case 36:return e.abrupt("return",G());case 37:case"end":return e.stop()}}),e,null,[[25,31]])})))).apply(this,arguments)},re=function(e){return ae.apply(this,arguments)},ne=function(){return(ne=h(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,re(!0);case 2:return t=e.sent,e.abrupt("return",t&&ce(t));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)},te=function(){return ne.apply(this,arguments)},ee=function(){return L?G()[0]:void 0},Z=function(){return(Z=h(a.a.mark((function e(){var t,n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(N){e.next=2;break}throw new Error("a derivation path is needed to get the public key");case 2:if(C){e.next=5;break}return e.next=5,q();case 5:return e.prev=5,e.next=8,C.getAddress(N,!1,!0);case 8:return t=e.sent,n=t.publicKey,r=t.chainCode,H={publicKey:n,chainCode:r,path:N},e.abrupt("return",H);case 14:throw e.prev=14,e.t0=e.catch(5),new Error("There was a problem accessing your Ledger accounts.");case 17:case"end":return e.stop()}}),e,null,[[5,14]])})))).apply(this,arguments)},Y=function(){return Z.apply(this,arguments)},X=function(){return(X=h(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(C){e.next=3;break}return e.next=3,q();case 3:return e.prev=3,e.next=6,C.getAddress(t);case 6:return n=e.sent,e.abrupt("return",n.address);case 10:e.prev=10,e.t0=e.catch(3);case 12:case"end":return e.stop()}}),e,null,[[3,10]])})))).apply(this,arguments)},R=function(e){return X.apply(this,arguments)},Q=function(e){var t=i(B.entries()),n=t.findIndex((function(t){return o(t,1)[0]===e}));t.unshift(t.splice(n,1)[0]),B=new Map(t)},G=function(){return Array.from(B.keys())},F=function(){return L=!0,re()},$=function(){return($=h(a.a.mark((function e(){var t,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t={next:function(e){"remove"===e.type&&W()},error:function(){},complete:function(){}},e.t0=M,e.t0){e.next=7;break}return e.next=6,m();case 6:e.t0=e.sent;case 7:if(!e.t0){e.next=13;break}return e.next=10,Promise.all([n.e(15),n.e(30)]).then(n.bind(null,1485));case 10:e.t1=e.sent.default,e.next=16;break;case 13:return e.next=15,Promise.all([n.e(15),n.e(37)]).then(n.bind(null,1515));case 15:e.t1=e.sent.default;case 16:return r=e.t1,e.next=19,r.create();case 19:U=e.sent,C=new v(U),r.listen(t),e.next=27;break;case 24:throw e.prev=24,e.t2=e.catch(0),new Error("Error connecting to Ledger wallet");case 27:case"end":return e.stop()}}),e,null,[[0,24]])})))).apply(this,arguments)},q=function(){return $.apply(this,arguments)},K=function(){return V},J=function(){return(J=h(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(f(t)){e.next=2;break}return e.abrupt("return",!1);case 2:if(t!==N&&(B=new Map),!n){e.next=10;break}return e.next=6,R(t);case 6:return r=e.sent,B.set(r,t),V=!0,e.abrupt("return",!0);case 10:return V=!1,N=t,e.abrupt("return",!0);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)},_=function(e,t){return J.apply(this,arguments)},W=function(){var e;null===(e=U)||void 0===e||e.close(),D.stop(),E({disconnected:!0,walletName:"Ledger"})},e.next=28,Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(4)]).then(n.bind(null,611));case 28:return r=e.sent,c=r.default,e.next=32,Promise.all([n.e(6),n.e(8),n.e(16)]).then(n.bind(null,749));case 32:return s=e.sent,l=s.generateAddresses,f=s.isValidPath,e.next=37,Promise.all([n.e(32),n.e(81)]).then(n.bind(null,1519));case 37:return p=e.sent,v=p.default,e.next=41,Promise.all([n.e(5),n.e(9),n.e(11)]).then(n.t.bind(null,746,7));case 41:return b=e.sent,w=b.Transaction,e.next=45,Promise.all([n.e(5),n.e(18)]).then(n.t.bind(null,843,7));case 45:return g=e.sent,y=g.default,e.next=49,Promise.all([n.e(6),n.e(19)]).then(n.t.bind(null,693,7));case 49:return x=e.sent,e.next=52,Promise.resolve().then(n.t.bind(null,8,7));case 52:return e.sent,e.next=55,Promise.all([n.e(1),n.e(35),n.e(63)]).then(n.t.bind(null,1528,7));case 55:return k=e.sent,P=k.TypedDataUtils,z=function(e){return P.hashStruct("EIP712Domain",e.domain,e.types,!0)},S=function(e){return P.hashStruct(e.primaryType,e.message,e.types,!0)},A=t.networkId,O=t.rpcUrl,M=t.LedgerTransport,j=t.BigNumber,T=t.networkName,E=t.resetWalletState,I=t.customNetwork,N="",B=new Map,L=!1,V=!1,(D=c({getAccounts:function(e){re().then((function(t){return e(null,t)})).catch((function(t){return e(t,null)}))},signTransaction:function(e,t){se(e).then((function(e){return t(null,e)})).catch((function(e){return t(e,null)}))},processMessage:function(e,t){ie(e).then((function(e){return t(null,e)})).catch((function(e){return t(e,null)}))},processPersonalMessage:function(e,t){ie(e).then((function(e){return t(null,e)})).catch((function(e){return t(e,null)}))},signMessage:function(e,t){ie(e).then((function(e){return t(null,e)})).catch((function(e){return t(e,null)}))},signPersonalMessage:function(e,t){ie(e).then((function(e){return t(null,e)})).catch((function(e){return t(e,null)}))},signTypedMessage:function(e,t){fe(e).then((function(e){return t(null,e)})).catch((function(e){return t(e,null)}))},rpcUrl:O})).setPath=_,D.dPath=N,D.enable=F,D.setPrimaryAccount=Q,D.getPrimaryAddress=ee,D.getAccounts=re,D.getMoreAccounts=te,D.getBalance=ue,D.getBalances=ce,D.send=D.sendAsync,D.disconnect=W,D.isCustomPath=K,e.abrupt("return",D);case 78:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var m=function(){return Promise.resolve(!!navigator&&!!navigator.usb&&"function"===typeof navigator.usb.getDevices)};t.default=function(e){var t=e.rpcUrl,n=e.LedgerTransport,r=e.networkId,c=e.preferred,u=e.label,s=e.iconSrc,o=e.svg,i=e.customNetwork;return{name:u||"Ledger",svg:o||'\n\t<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450" width="37" height="37"><style>.st0{fill:currentColor}</style><g id="squares_1_"><path class="st0" d="M578.2 392.7V24.3h25.6v344.1h175.3v24.3H578.2zm327.5 5.1c-39.7 0-70.4-12.8-93.4-37.1-21.7-24.3-33.3-58.8-33.3-103.6 0-43.5 10.2-79.3 32-104.9 21.7-26.9 49.9-39.7 87-39.7 32 0 57.6 11.5 76.8 33.3 19.2 23 28.1 53.7 28.1 92.1v20.5H804.6c0 37.1 9 66.5 26.9 85.7 16.6 20.5 42.2 29.4 74.2 29.4 15.3 0 29.4-1.3 40.9-3.8 11.5-2.6 26.9-6.4 44.8-14.1v24.3c-15.3 6.4-29.4 11.5-42.2 14.1-14.3 2.6-28.9 3.9-43.5 3.8zM898 135.6c-26.9 0-47.3 9-64 25.6-15.3 17.9-25.6 42.2-28.1 75.5h168.9c0-32-6.4-56.3-20.5-74.2-12.8-18-32-26.9-56.3-26.9zm238-21.8c19.2 0 37.1 3.8 51.2 10.2 14.1 7.7 26.9 19.2 38.4 37.1h1.3c-1.3-21.7-1.3-42.2-1.3-62.7V0h24.3v392.7h-16.6l-6.4-42.2c-20.5 30.7-51.2 47.3-89.6 47.3s-66.5-11.5-87-35.8c-20.5-23-29.4-57.6-29.4-102.3 0-47.3 10.2-83.2 29.4-108.7 19.2-25.6 48.6-37.2 85.7-37.2zm0 21.8c-29.4 0-52.4 10.2-67.8 32-15.3 20.5-23 51.2-23 92.1 0 78 30.7 116.4 90.8 116.4 30.7 0 53.7-9 67.8-26.9 14.1-17.9 21.7-47.3 21.7-89.6v-3.8c0-42.2-7.7-72.9-21.7-90.8-12.8-20.5-35.8-29.4-67.8-29.4zm379.9-16.6v17.9l-56.3 3.8c15.3 19.2 23 39.7 23 61.4 0 26.9-9 47.3-26.9 64-17.9 16.6-40.9 24.3-70.4 24.3-12.8 0-21.7 0-25.6-1.3-10.2 5.1-17.9 11.5-23 17.9-5.1 7.7-7.7 14.1-7.7 23s3.8 15.3 10.2 19.2c6.4 3.8 17.9 6.4 33.3 6.4h47.3c29.4 0 52.4 6.4 67.8 17.9s24.3 29.4 24.3 53.7c0 29.4-11.5 51.2-34.5 66.5-23 15.3-56.3 23-99.8 23-34.5 0-61.4-6.4-80.6-20.5-19.2-12.8-28.1-32-28.1-55 0-19.2 6.4-34.5 17.9-47.3s28.1-20.5 47.3-25.6c-7.7-3.8-15.3-9-19.2-15.3-5-6.2-7.7-13.8-7.7-21.7 0-17.9 11.5-34.5 34.5-48.6-15.3-6.4-28.1-16.6-37.1-30.7-9-14.1-12.8-30.7-12.8-48.6 0-26.9 9-49.9 25.6-66.5 17.9-16.6 40.9-24.3 70.4-24.3 17.9 0 32 1.3 42.2 5.1h85.7v1.3h.2zm-222.6 319.8c0 37.1 28.1 56.3 84.4 56.3 71.6 0 107.5-23 107.5-69.1 0-16.6-5.1-28.1-16.6-35.8-11.5-7.7-29.4-11.5-55-11.5h-44.8c-49.9 1.2-75.5 20.4-75.5 60.1zm21.8-235.4c0 21.7 6.4 37.1 19.2 49.9 12.8 11.5 29.4 17.9 51.2 17.9 23 0 40.9-6.4 52.4-17.9 12.8-11.5 17.9-28.1 17.9-49.9 0-23-6.4-40.9-19.2-52.4-12.8-11.5-29.4-17.9-52.4-17.9-21.7 0-39.7 6.4-51.2 19.2-12.8 11.4-17.9 29.3-17.9 51.1z"/><path class="st0" d="M1640 397.8c-39.7 0-70.4-12.8-93.4-37.1-21.7-24.3-33.3-58.8-33.3-103.6 0-43.5 10.2-79.3 32-104.9 21.7-26.9 49.9-39.7 87-39.7 32 0 57.6 11.5 76.8 33.3 19.2 23 28.1 53.7 28.1 92.1v20.5h-197c0 37.1 9 66.5 26.9 85.7 16.6 20.5 42.2 29.4 74.2 29.4 15.3 0 29.4-1.3 40.9-3.8 11.5-2.6 26.9-6.4 44.8-14.1v24.3c-15.3 6.4-29.4 11.5-42.2 14.1-14.1 2.6-28.2 3.8-44.8 3.8zm-6.4-262.2c-26.9 0-47.3 9-64 25.6-15.3 17.9-25.6 42.2-28.1 75.5h168.9c0-32-6.4-56.3-20.5-74.2-12.8-18-32-26.9-56.3-26.9zm245.6-21.8c11.5 0 24.3 1.3 37.1 3.8l-5.1 24.3c-11.8-2.6-23.8-3.9-35.8-3.8-23 0-42.2 10.2-57.6 29.4-15.3 20.5-23 44.8-23 75.5v149.7h-25.6V119h21.7l2.6 49.9h1.3c11.5-20.5 23-34.5 35.8-42.2 15.4-9 30.7-12.9 48.6-12.9zM333.9 12.8h-183v245.6h245.6V76.7c.1-34.5-28.1-63.9-62.6-63.9zm-239.2 0H64c-34.5 0-64 28.1-64 64v30.7h94.7V12.8zM0 165h94.7v94.7H0V165zm301.9 245.6h30.7c34.5 0 64-28.1 64-64V316h-94.7v94.6zm-151-94.6h94.7v94.7h-94.7V316zM0 316v30.7c0 34.5 28.1 64 64 64h30.7V316H0z"/></g></svg>\n',iconSrc:s,wallet:function(){var e=h(a.a.mark((function e(c){var u,s,o,l;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u=c.BigNumber,s=c.networkName,o=c.resetWalletState,e.next=3,v({rpcUrl:t,networkId:r,LedgerTransport:n,BigNumber:u,networkName:s,resetWalletState:o,customNetwork:i});case 3:return l=e.sent,e.abrupt("return",{provider:l,interface:{name:"Ledger",connect:l.enable,disconnect:l.disconnect,address:{get:function(){var e=h(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",l.getPrimaryAddress());case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},network:{get:function(){var e=h(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",r);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},balance:{get:function(){var e=h(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=l.getPrimaryAddress(),e.abrupt("return",t&&l.getBalance(t));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}}});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),type:"hardware",desktop:!0,mobile:!0,osExclusions:["iOS"],preferred:c}}}}]);