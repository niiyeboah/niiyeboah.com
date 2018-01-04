!function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,n){"use strict";(function(t){var n,i,o,r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(s,a){"object"===r(e)&&"object"===r(t)?t.exports=a():(i=[],n=a,void 0!==(o="function"==typeof n?n.apply(e,i):n)&&(t.exports=o))}(0,function(){return function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:420,o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];i(this,t);var r;if(e){var s=document.getElementById(e);"CANVAS"!==s.tagName?(r=document.createElement("canvas"),s.appendChild(r)):r=s}else r=document.createElement("canvas");r.height=r.width=n,this._canvas=r,this._context=r.getContext("2d"),this._context.lineJoin="miter",this._context.strokeStyle="#000",this._context.globalAlpha=0,this._initParams(this._canvas.width),o&&this.draw()}return o(t,[{key:"draw",value:function(){this._initParams(),this._resetCanvas();var e=this._canvas.width,n=this._lw;this._context.save(),this._context.globalAlpha=1,this._context.beginPath(),this._context.moveTo(t._3_4ths(e),e-t._3_4ths(e/2)),this._context.lineTo(e-t._7_8ths(e/2),t._3_4ths(e/2)),this._context.lineTo(e-t._7_8ths(e/2),n/2),this._context.lineTo(e-n/2,n/2),this._context.lineTo(e-n/2,e-n/2),this._context.lineTo(t._7_8ths(e/2)+n/2,e-n/2),this._context.stroke(),this._context.beginPath(),this._context.moveTo(e-t._3_4ths(e),t._3_4ths(e/2)),this._context.lineTo(t._7_8ths(e/2),e-t._3_4ths(e/2)),this._context.lineTo(t._7_8ths(e/2),e-n/2),this._context.lineTo(n/2,e-n/2),this._context.lineTo(n/2,n/2),this._context.lineTo(e-t._7_8ths(e/2)-n/2,n/2),this._context.stroke(),this._context.restore(),this._hideInnerLineEdges()}},{key:"download",value:function(){var t=this._canvas.toDataURL("image/png"),e=document.createElement("a");e.download="n-logo.png",e.href=t,e.click()}},{key:"_animateLogo",value:function(t){var e=this;this._resetCanvas(),this._context.globalAlpha<1&&(this._context.globalAlpha+=.02),this._updateAllParam(),this._animationComplete()?t&&t():requestAnimationFrame(function(){return e._animateLogo(t)})}},{key:"animate",value:function(t){this._initParams(),this._animateLogo(t)}},{key:"setWidth",value:function(t){this._canvas.height=this._canvas.width=t}},{key:"_resetCanvas",value:function(){var t=this._canvas.width;this._context.save(),this._context.clearRect(0,0,t,t),this._context.globalAlpha=1,this._context.fillStyle="#FFF",this._context.fillRect(0,0,t,t),this._context.restore()}},{key:"_animationComplete",value:function(){for(var t=!1,e=0;e<this._params.length;e++)this._params[e].complete&&(t=this._params[e].complete);return t}},{key:"_updateAllParam",value:function(){for(var t=0;t<this._params.length;t++)this._updateAndDrawLine(this._params[t])}},{key:"_updateAndDrawLine",value:function(t){if(!t.complete){var e=t.line,n=t.segmentIndex,i=t.f,o=e.vectorArray[n].x,r=e.vectorArray[n].y,s=e.vectorArray[n+1].x,a=e.vectorArray[n+1].y,h=function(t,e,n){return Math.round(t+(e-t)*n)};t.line.currX=h(o,s,i),t.line.currY=h(r,a,i),this._drawLine(t.line,t.segmentIndex),this._hideInnerLineEdges(),i<1?t.f+=.1:(t.f=0,n+2<=t.line.segmentCount?t.segmentIndex++:t.complete=!0),t.complete?this._outerBorder():this._drawBrushTip(t.line.currX,t.line.currY)}}},{key:"_drawLine",value:function(t,e){this._context.beginPath(),this._context.moveTo(t.vectorArray[0].x,t.vectorArray[0].y);for(var n=1;n<e+1;n++)this._context.lineTo(t.vectorArray[n].x,t.vectorArray[n].y);this._context.lineTo(t.currX,t.currY),this._context.stroke()}},{key:"_hideInnerLineEdges",value:function(){var t=this._canvas.width,e=this._lw,n=this._iw,i=this._lh;this._context.save(),this._context.globalAlpha=1,this._context.fillStyle="#FFF",this._context.fillRect(t-e-n,t-e-i,n,i),this._context.fillRect(e,e,n,i),this._context.restore()}},{key:"_outerBorder",value:function(){this._context.beginPath(),this._context.moveTo(0,0),this._context.lineTo(this._canvas.width,0),this._context.lineTo(this._canvas.width,this._canvas.width),this._context.lineTo(0,this._canvas.width),this._context.lineTo(0,0),this._context.stroke()}},{key:"_drawBrushTip",value:function(t,e){this._context.save(),this._context.globalAlpha=1,this._context.beginPath(),this._context.arc(t,e,this._lw/2,0,2*Math.PI,!1),this._context.fillStyle="#000",this._context.fill(),this._context.restore()}},{key:"_initParams",value:function(){var e=this._canvas.width,n=Math.round(.08*e);this._lw=n,this._iw=Math.round((e-2*n)/2),this._lh=Math.round(t._3_4ths(this._iw)+.045*t._3_4ths(this._iw)),this._context.globalAlpha=0,this._context.lineWidth=n;var i=new s([new a(t._3_4ths(e),e-t._3_4ths(e/2)),new a(e-t._7_8ths(e/2),t._3_4ths(e/2)),new a(e-t._7_8ths(e/2),n/2),new a(e-n/2,n/2),new a(e-n/2,e-n/2),new a(t._7_8ths(e/2)+n/2,e-n/2)]),o=new s([new a(e-t._3_4ths(e),t._3_4ths(e/2)),new a(t._7_8ths(e/2),e-t._3_4ths(e/2)),new a(t._7_8ths(e/2),e-n/2),new a(n/2,e-n/2),new a(n/2,n/2),new a(e-t._7_8ths(e/2)-n/2,n/2)]);this._params=[],this._params.push(new h(i,0,0,!1)),this._params.push(new h(o,0,0,!1))}}],[{key:"_7_8ths",value:function(t){return Math.round(.875*t)}},{key:"_3_4ths",value:function(t){return Math.round(.75*t)}}]),t}();e.default=r;var s=e.Line=function t(e){i(this,t),this.vectorArray=e,this.segmentCount=e.length-1,this.currX=e[0].x,this.currY=e[0].y},a=e.Vector=function t(e,n){i(this,t),this.x=e,this.y=n},h=e.AnimationParam=function t(e,n,o,r){i(this,t),this.line=e,this.segmentIndex=n,this.f=o,this.complete=r}}])})}).call(e,n(1)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,n){"use strict";function i(){if(l.clientHeight>window.innerHeight)c.style.height="auto",h.style.paddingTop="50px";else{var t=h.clientHeight+_.clientHeight;c.style.height="100vh",h.style.paddingTop=(window.innerHeight-t)/2+"px"}}function o(t){var e=window.innerWidth-20,n=window.innerHeight,i=(e>n?n:e)*(window.innerWidth<=768?.8:.4);return t.style.width=t.style.height=i,i}var r=n(0),s=function(t){return t&&t.__esModule?t:{default:t}}(r),a=!1,h=document.getElementById("logo"),c=document.querySelector("body"),l=document.getElementById("container"),_=document.getElementById("info"),u=o(h),f=new s.default("canvas",u);i(),f.animate(),window.onresize=function(){clearTimeout(a),a=setTimeout(function(){u=o(h),f.setWidth(u),f._initParams(),f.draw(),i()},500)}}]);