function wss_canvas(cxt,obj){
	var R = obj[0].w/2 - 20;
	var rows = obj[0].numY,cells = obj[0].numX;
	var img = obj[0].js.img;
	var defineArr = [];
	defineArr.length = 0;
	var List = document.getElementById('zbjListC');
	var ListA = List.getElementsByClassName('zbjlistA')[0];
	var as = ListA.children;
	var arrColor = ['red','green','blue'];
	
	
	defineAttr(rows,cells);
	getAll();
//	document.addEventListener('click',roundMAll);
	
	/*for(var i = 0;i < as.length;i++){
		as[i].index = i;
		as[i].addEventListener('click',roundMAll);
		as[i].addEventListener('mouseover',mouseMAll);
		as[i].addEventListener('mouseout',outMAll);
	}*/
	
	
	////////////////////////////////////
	
	
	
	
	function defineAttr(rows,cells){
		var n=0;
		for(var i = 0; i < rows ; i++ ){
			for(var j = 0;j< cells ;j++){
				var ball = {
					x: obj[n].l+obj[n].w/2,
					y: obj[n].t+obj[n].h/2,
					vx:0,
					vy:20,
					g:2,
					r:parseInt(Math.random()*10 + 20),
					time:parseInt(Math.random()*100 + 500),
					startDeg:10,
					endDeg:-10,
					dir:false
				}
				if(i>0){
					ball.vy =0;
				}
				n++;
				defineArr.push(ball);
			}
		}
	}
	function getAll(){
		for(var i = 0;i < defineArr.length;i++){
			(function (index) {
			    setTimeout(function(){
			    	
			    	wss_mTween(defineArr[index],R-20,500,cxt);
					ringMOve(cxt,defineArr[index],arrColor,3);
			    },50*(index+1));
			})(i)
		}
	}
	
	function drawImg(cxt,x,y,r,img) {//画圆
//		cxt.clearRect(x - (r+2), y - (r+2), 2*(r+2), 2*(r+2));
		cxt.save();
		cxt.beginPath();
		var img1 = new Image();
		img1.src = img;
		img1.onload = function () {
			var pattern = cxt.createPattern(img1,'repeat');
			cxt.fillStyle = pattern;
			cxt.arc(x,y,r,0,2*Math.PI);
			cxt.fill();
			cxt.closePath();
			cxt.restore();
		}
	}
	
	function drawRing(cxt,x,y,r,arrColor,width,num) {
//		cxt.clearRect(x - (r+2), y - (r+2), 2*(r+2), 2*(r+2));
		cxt.save();
		var rad = 2*Math.PI/arrColor.length;
		for ( var i=0; i<arrColor.length; i++ ) {
			cxt.beginPath();
			cxt.strokeStyle = arrColor[i];
			cxt.lineWidth = width;
			cxt.arc(x,y,r,i*rad+num*Math.PI/180,(i+1)*rad+num*Math.PI/180);
			cxt.stroke();
			cxt.closePath();
		}
		cxt.restore();
	}
	
	function drawAll(cxt,obj,width,num){
		cxt.clearRect(obj.x - (R+2), obj.y - (R+2), 2*(R+2), 2*(R+2));
		drawRing(cxt,obj.x,obj.y,R-20,arrColor,width,num);
		drawImg(cxt,obj.x,obj.y,R,img);
	}
	
	
	
	function backOut(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}
	function wss_mTween(el,target,time,cxt) {
		var t = 0;
		var b = el.r; 
		var c = target - el.r; 
		var d = time/20; 
		clearInterval(el.timer);
		el.timer = setInterval(function(){
			t++;
			if(t > d) { 
				drawImg(cxt,el.x,el.y,target,img);
				clearInterval(el.timer); 
			} else {
				var val = backOut(t,b,c,d);
//				drawImg(cxt,el.x,el.y,val,img);
				
				drawAll(cxt, el.x, el.y, val ,img )
			}
		},20);
	}
	
	function wss_mTweenRing(el,target,time, num, callBack) {
		clearInterval(el.timer);
		var t = 0;
		var b = {}; 
		var c = {}; 	
		var d = time/20; 
		for(var s in target) {
			b[s] = el[s];  
			c[s] = target[s] - b[s];
		}
		el.timer = setInterval(function(){
			t++;
			if(t>d) {
				clearInterval(el.timer);
				callBack&&callBack(); 
			} else {
				var val = {};
				for(var s in target) {
					val[s] = linear(t,b[s],c[s],d);
				}
				drawRing(cxt, el, val);
			}
		},20);
	}
	
	
	
	
	//小球运动
	
	function roundMAll () { 
		for(var i = 0;i<cells;i++){
			(function(index){
				setTimeout(function(){
					setInterval(function(){
		 				cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
			 			drawMove(cxt);
		 				roundMove(index);
			 		},30);
				},defineArr[index].time);
			})(i)
		}
		
	}
	
	
	function roundMove (i) {
		defineArr[i].y += defineArr[i].vy;
		defineArr[i].vy += defineArr[i].g;
		defineArr[i].x += defineArr[i].vx;
		

		defineArr[i+cells].y += defineArr[i+cells].vy;
		defineArr[i+cells].vy += defineArr[i+cells].g;
		defineArr[i+cells].x += defineArr[i+cells].vx;
		
		if(defineArr[i+cells] && (defineArr[i].y + R) >= (defineArr[i+cells].y - R)){
			defineArr[i].vx  = Math.pow(-1,Math.ceil(Math.random() * 1000)) * 2;
			defineArr[i+cells].vy = defineArr[i].vy*1.2;
			defineArr[i].vy = -defineArr[i].vy*0.1;
			defineArr[i].y += defineArr[i].vy;
			
			defineArr[i+cells].vx = -defineArr[i].vx*1.8;
		}
	}
	function drawMove(cxt) {//绘制运动后的小球
	    /*for(var i = 0;i<defineArr.length;i++){
	    	cxt.beginPath();
	    	var img1 = new Image();
			img1.src = img;
			img1.onload = function () {
				var pattern = cxt.createPattern(img1,'repeat');
				cxt.fillStyle = pattern;
				cxt.arc(defineArr[i].x, defineArr[i].y, R, 0, 2*Math.PI);
				cxt.fill();
			}
	    	
	    }*/
	   
	   cxt.fillStyle = 'green';
	    for(var i = 0;i<defineArr.length;i++){
	    	cxt.beginPath();
	    	cxt.arc(defineArr[i].x, defineArr[i].y, R, 0, 2*Math.PI);
	    	cxt.fill();
	    }
	}
}