var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //鍥炵缉鐨勮窛绂�
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};

/*-----------------获取和添加样式函数-----------------*/
function getStyle(obj,attr,val) {
	if ( arguments.length < 3 ) {
		var num = obj.currentStyle? obj.currentStyle[attr]: getComputedStyle(obj)[attr];
		num = parseFloat(num);
		if ( attr == 'opacity' ) {
			num = num*100;	
		}
		return num;
	} else {
		if ( attr == 'opacity' ) {
			obj.style.opacity = val/100;
			obj.style.filter = 'alpha(opacity='+val+')';
		} else {
			obj.style[attr] = val + 'px';
		}
		
	}
	
}

//运动函数
function mTween(obj,target,time,type,fn) {
	
	var init = {};
	
	for(var attr in target){
		if(attr == 'opacity'){
			init[attr] = Math.round(getComputedStyle(obj)[attr]*100);
		}else{
			init[attr] = parseInt(getComputedStyle(obj)[attr])
		}
	}
	
	var start = new Date().getTime();
	
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		
		var now = new Date().getTime();
		
		var t = Math.min(time,now - start);
		
		if(t == time){
			clearInterval(obj.timer)
			fn&&fn.call()
			return
		}
		
		for(var attr in target){
			
			var value = Tween[type](t,init[attr],target[attr] - init[attr],time);
			
			obj.style[attr] = value + 'px';
		}
	},16);
	
	
	//var timer = 0;
	/*var t = 0; // 当前步数
	var b = {};//元素移动的初始位置
	var c = {};//初始位置和终点位置的差值
	var d = time/20;//元素移动的总步数
	for ( var s in target ) {
		b[s] = getStyle(obj,s);
		c[s] = target[s] - b[s];
	}
	clearInterval(obj.timer);
	obj.timer = setInterval(
		function () {
			if ( t < d ) {
				t++;
			} else {
				t = d; 
				clearInterval(obj.timer);
				fnEnd && fnEnd();
			}
			for ( var s in target ) {
				//b[s] = getStyle(obj,s);
				c[s] = target[s] - b[s];
				var val = Tween[type](t, b[s], c[s], d);
				getStyle(obj,s,val);
			}
		},20
	);*/
}
//获取元素的函数
function getEle(obj) {
	if ( obj.substr(0,1) == '#' && obj.split(' ').length == 1 ) {
		return document.getElementById(obj.substr(1));
	} else {
		var objArr = Array.from(document.querySelectorAll(obj));
	}
	return objArr.length == 1? objArr[0]: objArr;
}
