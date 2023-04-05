!function(){"use strict";var t=function(){var t=arguments.length,e=arguments[0]||{};"object"!=typeof e&&"function"!=typeof e&&(e={}),1==t&&(e=this,i--);for(var i=1;i<t;i++){var n=arguments[i];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},e=function(t){return"function"==typeof t&&"number"!=typeof t.nodeType},i=function(e,n){this.$element=e,this.options=t({},i.DEFAULTS,n),this.$element.style.position="relative",this.$element.style.width=this.options.width+"px",this.$element.style.margin="0 auto",this.init()};i.VERSION="1.0",i.Author="argo@163.com",i.DEFAULTS={width:280,height:155,PI:Math.PI,sliderL:42,sliderR:9,offset:5,loadingText:"Loading...",failedText:"Try Again",barText:"Slide To Verify",repeatIcon:"fa fa-repeat",maxLoadCount:3,localImages:function(){return"images/Pic"+Math.round(4*Math.random())+".jpg"},verify:function(t,e){var i=!1;return $.ajax({url:e,data:{datas:JSON.stringify(t)},dataType:"json",type:"post",async:!1,success:function(t){i=JSON.stringify(t),console.log("Result: "+i)}}),i},remoteUrl:null},window.sliderCaptcha=function(t){var e=document.getElementById(t.id);return new i(e,"object"==typeof t&&t)},window.sliderCaptcha.Constructor=i;var n=i.prototype;n.init=function(){this.initDOM(),this.initImg(),this.bindEvents()},n.initDOM=function(){var i=function(t,e){var i=document.createElement(t);return i.className=e,i},n=function(t,e){var i=document.createElement("canvas");return i.width=t,i.height=e,i}(this.options.width-2,this.options.height),o=n.cloneNode(!0),s=i("div","sliderContainer"),r=i("i","refreshIcon "+this.options.repeatIcon),a=i("div","sliderMask"),l=i("div","sliderbg"),d=i("div","slider"),c=i("i","fa fa-arrow-right sliderIcon"),h=i("span","sliderText");o.className="block",h.innerHTML=this.options.barText;var p=this.$element;p.appendChild(n),p.appendChild(r),p.appendChild(o),d.appendChild(c),a.appendChild(d),s.appendChild(l),s.appendChild(a),s.appendChild(h),p.appendChild(s);var u={canvas:n,block:o,sliderContainer:s,refreshIcon:r,slider:d,sliderMask:a,sliderIcon:c,text:h,canvasCtx:n.getContext("2d"),blockCtx:o.getContext("2d")};e(Object.assign)?Object.assign(this,u):t(this,u)},n.initImg=function(){var t=this,i=window.navigator.userAgent.indexOf("Trident")>-1,n=this.options.sliderL+2*this.options.sliderR+3,o=function(e,n){var o=t.options.sliderL,s=t.options.sliderR,r=t.options.PI,a=t.x,l=t.y;e.beginPath(),e.moveTo(a,l),e.arc(a+o/2,l-s+2,s,.72*r,2.26*r),e.lineTo(a+o,l),e.arc(a+o+s-2,l+o/2,s,1.21*r,2.78*r),e.lineTo(a+o,l+o),e.lineTo(a,l+o),e.arc(a+s-2,l+o/2,s+.4,2.76*r,1.24*r,!0),e.lineTo(a,l),e.lineWidth=2,e.fillStyle="rgba(255, 255, 255, 0.7)",e.strokeStyle="rgba(255, 255, 255, 0.7)",e.stroke(),e[n](),e.globalCompositeOperation=i?"xor":"destination-over"},s=function(t,e){return Math.round(Math.random()*(e-t)+t)},r=new Image;r.crossOrigin="Anonymous";var a=0;r.onload=function(){t.x=s(n+10,t.options.width-(n+10)),t.y=s(10+2*t.options.sliderR,t.options.height-(n+10)),o(t.canvasCtx,"fill"),o(t.blockCtx,"clip"),t.canvasCtx.drawImage(r,0,0,t.options.width-2,t.options.height),t.blockCtx.drawImage(r,0,0,t.options.width-2,t.options.height);var e=t.y-2*t.options.sliderR-1,i=t.blockCtx.getImageData(t.x-3,e,n,n);t.block.width=n,t.blockCtx.putImageData(i,0,e+1),t.text.textContent=t.text.getAttribute("data-text")},r.onerror=function(){if(a++,"file:"===window.location.protocol&&(a=t.options.maxLoadCount,console.error("can't load pic resource file from File protocal. Please try http or https")),a>=t.options.maxLoadCount)return t.text.textContent="加载失败",void t.classList.add("text-danger");r.src=t.options.localImages()},r.setSrc=function(){var n="";if(a=0,t.text.classList.remove("text-danger"),e(t.options.setSrc)&&(n=t.options.setSrc()),n&&""!==n||(n="https://picsum.photos/"+t.options.width+"/"+t.options.height+"/?image="+Math.round(20*Math.random())),i){var o=new XMLHttpRequest;o.onloadend=function(t){var e=new FileReader;e.readAsDataURL(t.target.response),e.onloadend=function(t){r.src=t.target.result}},o.open("GET",n),o.responseType="blob",o.send()}else r.src=n},r.setSrc(),this.text.setAttribute("data-text",this.options.barText),this.text.textContent=this.options.loadingText,this.img=r},n.clean=function(){this.canvasCtx.clearRect(0,0,this.options.width,this.options.height),this.blockCtx.clearRect(0,0,this.options.width,this.options.height),this.block.width=this.options.width},n.bindEvents=function(){var t=this;this.$element.addEventListener("selectstart",function(){return!1}),this.refreshIcon.addEventListener("click",function(){t.text.textContent=t.options.barText,t.reset(),e(t.options.onRefresh)&&t.options.onRefresh.call(t.$element)});var i,n,o=[],s=!1,r=function(e){t.text.classList.contains("text-danger")||(i=e.clientX||e.touches[0].clientX,n=e.clientY||e.touches[0].clientY,s=!0)},a=function(e){if(!s)return!1;var r=e.clientX||e.touches[0].clientX,a=e.clientY||e.touches[0].clientY,l=r-i,d=a-n;if(l<0||l+40>t.options.width)return!1;t.slider.style.left=l-1+"px";var c=(t.options.width-40-20)/(t.options.width-40)*l;t.block.style.left=c+"px",t.sliderContainer.classList.add("sliderContainer_active"),t.sliderMask.style.width=l+4+"px",o.push(Math.round(d))},l=function(n){if(!s)return!1;if(s=!1,(n.clientX||n.changedTouches[0].clientX)===i)return!1;t.sliderContainer.classList.remove("sliderContainer_active"),t.trail=o;var r=t.verify();r.spliced&&r.verified?(t.sliderContainer.classList.add("sliderContainer_success"),e(t.options.onSuccess)&&t.options.onSuccess.call(t.$element)):(t.sliderContainer.classList.add("sliderContainer_fail"),e(t.options.onFail)&&t.options.onFail.call(t.$element),setTimeout(function(){t.text.innerHTML=t.options.failedText,t.reset()},1e3))};this.slider.addEventListener("mousedown",r),this.slider.addEventListener("touchstart",r),document.addEventListener("mousemove",a),document.addEventListener("touchmove",a),document.addEventListener("mouseup",l),document.addEventListener("touchend",l),document.addEventListener("mousedown",function(){return!1}),document.addEventListener("touchstart",function(){return!1}),document.addEventListener("swipe",function(){return!1})},n.verify=function(){var t=this.trail,e=parseInt(this.block.style.left),i=!1;if(null!==this.options.remoteUrl)i=this.options.verify(t,this.options.remoteUrl);else{var n=function(t,e){return t+e},o=t.reduce(n)/t.length,s=t.map(function(t){return t-o});i=0!==Math.sqrt(s.map(function(t){return t*t}).reduce(n)/t.length)}return{spliced:Math.abs(e-this.x)<this.options.offset,verified:i}},n.reset=function(){this.sliderContainer.classList.remove("sliderContainer_fail"),this.sliderContainer.classList.remove("sliderContainer_success"),this.slider.style.left=0,this.block.style.left=0,this.sliderMask.style.width=0,this.clean(),this.text.setAttribute("data-text",this.text.textContent),this.text.textContent=this.options.loadingText,this.img.setSrc()}}();


var __style = document.createElement("style");
__style.innerHTML  = '.card.slidercaptcha {\n' +
	'  display: flex;\n' +
	'  flex-direction: column;\n' +
	'  min-width: 0;\n' +
	'  word-wrap: break-word;\n' +
	'  background-clip: border-box;\n' +
	'  border: 1px solid rgba(0, 0, 0, 0.125);\n' +
	'  margin: 0 auto;\n' +
	'  width: 314px;\n' +
	'  height: 286px;\n' +
	'  border-radius: 4px;\n' +
	'  box-shadow: 0 0 10px rgba(0, 0, 0, 0.125); }\n' +
	'  .card.slidercaptcha .block {\n' +
	'    position: absolute;\n' +
	'    left: 0;\n' +
	'    top: 0; }\n' +
	'  .card.slidercaptcha .card-header {\n' +
	'    padding: .75rem 1.25rem;\n' +
	'    margin-bottom: 0;\n' +
	'    background-image: none;\n' +
	'    background-color: rgba(0, 0, 0, 0.03);\n' +
	'    border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n' +
	'    .card.slidercaptcha .card-header:first-child {\n' +
	'      border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0; }\n' +
	'  .card.slidercaptcha .card-body {\n' +
	'    flex: 1 1 auto;\n' +
	'    padding: 1rem; }\n' +
	'  .card.slidercaptcha canvas:first-child {\n' +
	'    border-radius: 4px;\n' +
	'    border: 1px solid #e6e8eb; }\n' +
	'  .card.slidercaptcha .sliderContainer {\n' +
	'    position: relative;\n' +
	'    text-align: center;\n' +
	'    line-height: 40px;\n' +
	'    background: #f7f9fa;\n' +
	'    color: #45494c;\n' +
	'    border-radius: 2px; }\n' +
	'  .card.slidercaptcha .sliderbg {\n' +
	'    position: absolute;\n' +
	'    left: 0;\n' +
	'    right: 0;\n' +
	'    top: 0;\n' +
	'    background-color: #f7f9fa;\n' +
	'    height: 40px;\n' +
	'    border-radius: 2px;\n' +
	'    border: 1px solid #e6e8eb; }\n' +
	'  .card.slidercaptcha .sliderContainer_active .slider {\n' +
	'    top: -1px;\n' +
	'    border: 1px solid #1991FA; }\n' +
	'  .card.slidercaptcha .sliderContainer_active .sliderMask {\n' +
	'    border-width: 1px 0 1px 1px; }\n' +
	'  .card.slidercaptcha .sliderContainer_success .slider {\n' +
	'    top: -1px;\n' +
	'    border: 1px solid #52CCBA;\n' +
	'    background-color: #52CCBA !important; }\n' +
	'  .card.slidercaptcha .sliderContainer_success .sliderMask {\n' +
	'    border: 1px solid #52CCBA;\n' +
	'    border-width: 1px 0 1px 1px;\n' +
	'    background-color: #D2F4EF; }\n' +
	'  .card.slidercaptcha .sliderContainer_success .sliderIcon:before {\n' +
	'    content: "\\f00c"; }\n' +
	'  .card.slidercaptcha .sliderContainer_fail .slider {\n' +
	'    top: -1px;\n' +
	'    border: 1px solid #f57a7a;\n' +
	'    background-color: #f57a7a !important; }\n' +
	'  .card.slidercaptcha .sliderContainer_fail .sliderMask {\n' +
	'    border: 1px solid #f57a7a;\n' +
	'    background-color: #fce1e1;\n' +
	'    border-width: 1px 0 1px 1px; }\n' +
	'  .card.slidercaptcha .sliderContainer_fail .sliderIcon:before {\n' +
	'    content: "\\f00d"; }\n' +
	'  .card.slidercaptcha .sliderContainer_active .sliderText, .card.slidercaptcha .sliderContainer_success .sliderText, .card.slidercaptcha .sliderContainer_fail .sliderText {\n' +
	'    display: none; }\n' +
	'  .card.slidercaptcha .sliderMask {\n' +
	'    position: absolute;\n' +
	'    left: 0;\n' +
	'    top: 0;\n' +
	'    height: 40px;\n' +
	'    border: 0 solid #1991FA;\n' +
	'    background: #D1E9FE;\n' +
	'    border-radius: 2px; }\n' +
	'  .card.slidercaptcha .slider {\n' +
	'    position: absolute;\n' +
	'    top: 0;\n' +
	'    left: 0;\n' +
	'    width: 40px;\n' +
	'    height: 40px;\n' +
	'    background: #fff;\n' +
	'    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);\n' +
	'    cursor: pointer;\n' +
	'    transition: background .2s linear;\n' +
	'    border-radius: 2px;\n' +
	'    display: flex;\n' +
	'    align-items: center;\n' +
	'    justify-content: center; }\n' +
	'    .card.slidercaptcha .slider:hover {\n' +
	'      background: #1991FA; }\n' +
	'      .card.slidercaptcha .slider:hover .sliderIcon {\n' +
	'        background-position: 0 -13px; }\n' +
	'  .card.slidercaptcha .sliderText {\n' +
	'    position: relative; }\n' +
	'  .card.slidercaptcha .refreshIcon {\n' +
	'    position: absolute;\n' +
	'    right: 0;\n' +
	'    top: -54px;\n' +
	'    cursor: pointer;\n' +
	'    margin: 6px;\n' +
	'    color: rgba(0, 0, 0, 0.25);\n' +
	'    font-size: 1rem;\n' +
	'    z-index: 5;\n' +
	'    transition: color .3s linear; }\n' +
	'    .card.slidercaptcha .refreshIcon:hover {\n' +
	'      color: #6c757d; }';
document.head.appendChild(__style);

var _0x348598=_0x5c8e;(function(_0x2482b3,_0xef5634){var _0x51a2b6=_0x5c8e,_0x426795=_0x2482b3();while(!![]){try{var _0x2ff9b7=parseInt(_0x51a2b6(0x1b3))/0x1*(parseInt(_0x51a2b6(0x1b5))/0x2)+parseInt(_0x51a2b6(0x1b7))/0x3*(-parseInt(_0x51a2b6(0x1b4))/0x4)+-parseInt(_0x51a2b6(0x1bc))/0x5*(parseInt(_0x51a2b6(0x1bb))/0x6)+-parseInt(_0x51a2b6(0x1b1))/0x7*(-parseInt(_0x51a2b6(0x1af))/0x8)+-parseInt(_0x51a2b6(0x1ac))/0x9*(parseInt(_0x51a2b6(0x1b9))/0xa)+-parseInt(_0x51a2b6(0x1ae))/0xb+parseInt(_0x51a2b6(0x1bf))/0xc;if(_0x2ff9b7===_0xef5634)break;else _0x426795['push'](_0x426795['shift']());}catch(_0x59eb8b){_0x426795['push'](_0x426795['shift']());}}}(_0x4d9e,0x32f53));function _0x5c8e(_0x1edfc5,_0x371af4){var _0x4d9e49=_0x4d9e();return _0x5c8e=function(_0x5c8e0b,_0x17984b){_0x5c8e0b=_0x5c8e0b-0x1ac;var _0x40c20e=_0x4d9e49[_0x5c8e0b];return _0x40c20e;},_0x5c8e(_0x1edfc5,_0x371af4);}if(document[_0x348598(0x1b8)](_0x348598(0x1ba)))var captcha=sliderCaptcha({'id':_0x348598(0x1ba),'onSuccess':function(){var _0x2eccb2=_0x348598,_0x40c533=new Date();_0x40c533['setMinutes'](_0x40c533[_0x2eccb2(0x1c0)]()+0x2);var _0x1b8dbf=encodeURIComponent(window['btoa'](_0x40c533['toUTCString']())),_0x3b5f3c=document[_0x2eccb2(0x1b2)](_0x2eccb2(0x1be));_0x3b5f3c[_0x2eccb2(0x1c1)]=_0x2eccb2(0x1b6),_0x3b5f3c[_0x2eccb2(0x1b0)]=_0x1b8dbf,_0x3b5f3c[_0x2eccb2(0x1bd)]=_0x2eccb2(0x1ad),document[_0x2eccb2(0x1b8)](_0x2eccb2(0x1ba))['appendChild'](_0x3b5f3c);}});function _0x4d9e(){var _0x194c69=['8RCYNVa','hidden','87mufyzo','getElementById','10cVnMXF','captcha','18WNggJV','211845IsemEd','name','input','10902852RRcyIQ','getMinutes','type','3395016gALyWi','_captcha','3250522FojIaB','40WCFGFe','value','330785QmBIdD','createElement','30467nbdOOj','35608fzbDmd'];_0x4d9e=function(){return _0x194c69;};return _0x4d9e();}

