(function(w){
	//生成列表的样式
	var head = document.getElementById('header');
	var zbjList = document.getElementById('zbjListC');
	var canvas = zbjList.getElementsByTagName('canvas')[0];
	var zbjListA = zbjList.getElementsByClassName('zbjlistA')[0];
	var zbjCxt = canvas.getContext('2d');
	var switchPage = document.getElementById('switchPage');
	var W = document.documentElement.clientWidth,
		H = document.documentElement.clientHeight;
	var search = 1;
	var zbjArrLise = getLiSty(search);
	zbjCxt.canvas.width = zbjListA.clientWidth;
	zbjCxt.canvas.height = H-head.offsetHeight;
	var defineArr = getdefineArr(zbjArrLise);//获取小球属性
//	drawEle(zbjArrLise,zbjCxt);
	/*window.onresize = function () {
		zbjCxt.clearRect(0,0,zbjCxt.canvas.width,zbjCxt.canvas.height);
		zbjArrLise = getLiSty(search);
//		drawEle(zbjArrLise,zbjCxt);
		zbjCxt.canvas.width = zbjListA.offsetWidth;
		zbjCxt.canvas.height = H-head.offsetHeight;
		getAll();
	}*/
	
	getAll();
	
	//操作小球
	clickBalls ()
	function clickBalls () {
	    var as = zbjListA.children;
	    for(var i = 0;i < as.length;i++){
	    	as[i].index = i;
	    	as[i].addEventListener('click',fnClick);
	    	as[i].addEventListener('mouseover',fnOver);
	    	as[i].addEventListener('mouseout',fnOut);
	    }
	    
	   
		
		function fnClick(){
			for(var i = 0;i < as.length;i++){
				clearInterval(zbjArrLise[i].timer);
			}
			wss_canvas(zbjCxt,zbjArrLise,defineArr,this.index,function(){
				window.open('www.baidu.com');
			});
		}
		
		function fnOver () {
			clearInterval(zbjArrLise[this.index].timer);
			drawEle(zbjArrLise[this.index], zbjCxt, zbjArrLise[this.index].w/2 - 40,0,6,true);
		}
		
		function fnOut () {
		    clearInterval(zbjArrLise[this.index].timer);
			drawEle(zbjArrLise[this.index], zbjCxt, zbjArrLise[this.index].w/2 - 40,0,3,true);
		}
	}
	
	//点击按钮
	
	btnClick();
	
	function btnClick(){
		var prev = switchPage.querySelector('.prev');
		var next = switchPage.querySelector('.next');
		
		prev.addEventListener('click',fnPrev);
		next.addEventListener('click',fnNext);
		
		function fnPrev(){
			for(var i = 0;i < zbjArrLise.length;i++){
				clearInterval(zbjArrLise[i].timer);
			}
			for(var i = 0;i < defineArr.length;i++){
				clearInterval(defineArr[i].dragTimer);
			}
			defineArr.length = 0;
			zbjArrLise = null;
			zbjArrLise = getLiSty(search);
			defineArr = getdefineArr(zbjArrLise);
			wss_canvas(zbjCxt,zbjArrLise,defineArr,null,function(){
				zbjCxt.clearRect(0,0,zbjCxt.canvas.width,zbjCxt.canvas.height);
				getAll();
			});

			
		}
		function fnNext(){
			for(var i = 0;i < zbjArrLise.length;i++){
				clearInterval(zbjArrLise[i].timer);
			}
			for(var i = 0;i < defineArr.length;i++){
				clearInterval(defineArr[i].dragTimer);
			}
			defineArr.length = 0;
			zbjArrLise = null;
			zbjArrLise = getLiSty(search);
			defineArr = getdefineArr(zbjArrLise);
			wss_canvas(zbjCxt,zbjArrLise,defineArr,null,function(){
				zbjCxt.clearRect(0,0,zbjCxt.canvas.width,zbjCxt.canvas.height);
				getAll();
			});
			
		}
	}
	
	
	//////////////////////////////////////////////
	function getAll(){
		for(var i = 0;i < zbjArrLise.length;i++){
			(function (index) {
			    setTimeout(function(){
			    	wss_mTween(zbjArrLise[index],zbjArrLise[index].w/2 - 40,500,zbjCxt,0,function(){
			    		var num = 0;
			    		var speed = Math.pow(-1,Math.ceil(Math.random() * 1000));
			    		var dir = false;
			    		var max = Math.floor(Math.random()*360);
			    		var min = -Math.floor(Math.random()*360);
			    		zbjArrLise[index].timer = setInterval(function(){
			    			num += speed;
			    			if(num > max || num < min){
			    				speed = -speed;
			    			}
			    			drawEle(zbjArrLise[index], zbjCxt, zbjArrLise[index].w/2 - 40, num,3,true);
			    		},50);
			    	});
			    },50*(index+1));
			})(i)
		}
	}
	
	
	
	
	function drawEle(item,cxt,val,change,width,flag) {
		var w = item.w,
			h = item.h,
			t = item.t,
			l = item.l,
			spaceX = item.spaceX,
			spanceY = item.spaceY,
			arrColor = item.js.arrColor,
			img = item.js.img,
			title = item.js.title,
			info = item.js.info;
		var oriX = l + w/2,
			oriY = t + h/2;
		cxt.clearRect(l,t,w,h);
		if(flag){
			drawRing(cxt,oriX,oriY,w/2 - 2,arrColor,change,width);
		}
		drawImg(cxt,oriX,oriY,val,img)
		drawTitle(cxt,l,oriY+w/2+w/12,w,title);
		drawInfo(cxt,l,oriY+w/2+w/5,w,info);
		
	}
	function drawRing(cxt,x,y,r,arrColor,change,width) {
		cxt.save();
		var rad = 2*Math.PI/arrColor.length;
		for ( var i=0; i<arrColor.length; i++ ) {
			cxt.beginPath();
			cxt.strokeStyle = arrColor[i];
			cxt.lineWidth = width;
			var deg = change/Math.PI;
			cxt.arc(x,y,r,i*rad+deg,(i+1)*rad+deg);
			cxt.stroke();
			cxt.closePath();
		}
		cxt.restore();
	}
	
	function drawImg(cxt,x,y,r,img) {
		cxt.save();
		cxt.beginPath();
//		var backCanvas = newCanvas(x,y,r,img);
//		var pattern = cxt.createPattern(backCanvas,'no-repeat');
		cxt.fillStyle = 'red';
		cxt.arc(x,y,r,0,2*Math.PI);
		cxt.fill();
		cxt.closePath();
		cxt.restore();
	}
	
	function drawTitle(cxt,x,y,w,title) {
		cxt.save();
		cxt.beginPath();
		cxt.font = '12px Arial';
		cxt.textBaseline = 'middle';
		cxt.fillText(title,x,y);
		cxt.stroke();
		cxt.restore();
	}
	///*需要做文字动画的函数*/
	function drawInfo(cxt,x,y,w,info) {
		cxt.save();
		cxt.beginPath();
		cxt.font = '14px Terminal';
		cxt.textBaseline = 'middle';
		if ( info.length >= parseInt(w/8) ) {
			info = info.substr(0,parseInt(w/8)) + '...';
		}
		cxt.fillText(info,x,y);
		cxt.stroke();
		cxt.restore();
	}
	
	
	//创建新的画布
	function newCanvas(x,y,r,img){
		var newCanvas = document.createElement('canvas');
		newCanvas.width = r,newCanvas.height = r;
		var newCxt = newCanvas.getContext('2d');
		
		newCxt.save();
		newCxt.beginPath();
		var backgroundImg = new Image();
		backgroundImg.src = img;
		backgroundImg.onload = function () {
			var pattern = newCxt.createPattern(backgroundImg,'no-repeat');
			newCxt.fillStyle = pattern;
			newCxt.arc(x,y,r,0,2*Math.PI);
			newCxt.fill();
			newCxt.closePath();
			newCxt.restore();
		}
		return newCanvas;
	}
	
	
	function getLiSty(search) {
		var aAs = zbjListA.children;
		var arr = [];
		var w = aAs[0].offsetWidth;
		var spaceX = 5;
		var spaceY; //垂直方向两个元素之间的间隔
		if ( w == 184 ) {
			spaceY = 80;
		} else if ( w == 162 )  {
			spaceY = 90;
		} else if ( w == 162 ) {
			spaceY = 100;
		} else if ( w == 142 ) {
			spaceY = 110;
		} else {
			spaceY = 120;
		}
		
		var AsW = zbjListA.clientWidth;//列表的宽度
		
		var numX = Math.floor(AsW/(w+spaceX));//横向可以加载几个元素
		var numY = Math.floor((H-head.offsetHeight)/(w+spaceY));//纵向可以加载几个元素
		spaceX = (AsW-numX*w)/(numX-1);//水平方向两个元素之间的间隔
		zbjListA.innerHTML = '';
		for ( var i=(search-1)*numX*numY; i<search*numX*numY; i++ ) {
			var a = document.createElement('a');
			l = i%numX*(w + spaceX);
			t = Math.floor(i/numX)*(w + spaceY);
			a.href = '#'+ i;	/*跳转页面的hash值*/
			a.style.left = l + 'px';
			a.style.top = t + 'px';
			var js = {
				'img':data[0],
				'arrColor':data[1],
				'title':data[2],
				'info':data[3]
			};
			arr.push({'w':w,'h':w,'t':t,'l':l,'spaceX':spaceX,'spaceY':spaceY,'js':js,'numX':numX,'numY':numY});
			zbjListA.appendChild(a);
		}
		return arr;
	}
	
	
	function backOut(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}
	function wss_mTween(el,target,time,cxt,width,callBack) {
		var t = 0;
		var b = 10; 
		var c = target - 10; 
		var d = time/20; 
		clearInterval(el.timer);
		el.timer = setInterval(function(){
			t++;
			if(t > d) { 
				drawEle(el,cxt,target,0,width,false);
				clearInterval(el.timer); 
				callBack();
			} else {
				var val = backOut(t,b,c,d);
				drawEle(el,cxt,val,0,width,false);
			}
		},20);
	}
	
	
	
	
	function getdefineArr(obj){
		var R = obj[0].w/2 - 40;
		var rows = obj[0].numY,cells = obj[0].numX;
		var img = obj[0].js.img;
		var defineArr = [];
		defineArr.length = 0;
		defineAttr(rows,cells);
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
						round:R,
						onoff:true,
						r:parseInt(Math.random()*10 + 20),
						time:parseInt(Math.random()*100 + 200)
						
					}
					if(i>0){
						ball.vy =0;
						ball.g = 0;
					}
					n++;
					defineArr.push(ball);
				}
			}
		}
		return defineArr;
	}
	
	
	
	
	function wss_canvas(cxt,obj,defineArr,Aindex,callBack){
		
		Aindex = Aindex ? Aindex : null;
		var R = obj[0].w/2 - 40;
		var rows = obj[0].numY,cells = obj[0].numX;
		var img = obj[0].js.img;
		//小球运动
		
		roundMAll ();
		function roundMAll () { 
			for(var i = 0;i<cells;i++){
				(function(index){
					setTimeout(function(){
						clearInterval(defineArr[index].dragTimer);
						defineArr[index].dragTimer = setInterval(function(){
			 				cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
				 			drawMove(cxt);
			 				roundMove(index);
			 				if(defineArr[index + cells].y - 2*R > zbjCxt.canvas.height && defineArr[index].y - 2*R > zbjCxt.canvas.height){

			 					clearInterval(defineArr[index].dragTimer);
			 					callBack&&callBack();
			 				}
			 				
				 		},30);
					},defineArr[index].time);
				})(i)
			}
			
		}
		
		
		function roundMove (i) {
			//判断是否被点击
			
			if(i == Aindex ){
				defineArr[i].y = defineArr[i].y;
				if(defineArr[i+cells] && defineArr[i+cells].y < zbjCxt.canvas.height){
					defineArr[i+cells].y += defineArr[i+cells].vy;
					defineArr[i+cells].vy += defineArr[i+cells].g;
					defineArr[i+cells].g = 4;
				}
			}else{
				if(defineArr[i]){
					defineArr[i].y += defineArr[i].vy;
					defineArr[i].vy += defineArr[i].g;
					defineArr[i].x += defineArr[i].vx;
				}
				
				if(defineArr[i+cells]){
					defineArr[i+cells].y += defineArr[i+cells].vy;
					defineArr[i+cells].vy += defineArr[i+cells].g;
					defineArr[i+cells].x += defineArr[i+cells].vx;
				}
				if(defineArr[i+cells] && (defineArr[i].y + R) >= (defineArr[i+cells].y - R) && defineArr[i].onoff){
					if(Aindex - cells == i){
						defineArr[i].vx  = Math.pow(-1,Math.ceil(Math.random() * 1000)) * 6;
						defineArr[i+cells].vy = 0;
						defineArr[i].vy = -defineArr[i].vy*0.4;
						defineArr[i].y += defineArr[i].vy;
						defineArr[i+cells].vx = 0;
						defineArr[i].onoff = false;
					}else{
						defineArr[i].vx  = Math.pow(-1,Math.ceil(Math.random() * 1000)) * 2;
						defineArr[i+cells].vy = defineArr[i].vy*1.2;
						defineArr[i].vy = -defineArr[i].vy*0.1;
						defineArr[i].y += defineArr[i].vy;
						defineArr[i+cells].vx = -defineArr[i].vx*1.8;
					}
					
				}
			}
			
			
			
			

		}
		function drawMove(cxt) {//绘制运动后的小球
			
		    for(var i = 0;i<defineArr.length;i++){
		    	cxt.save();
		   		cxt.fillStyle = 'red';
		    	cxt.beginPath();
		    	if(i == Aindex){
		    		defineArr[i].round -= 2;
		    		defineArr[i].round = Math.max(0,defineArr[i].round);
		    	}
		    	if(defineArr[i]){
		    		cxt.arc(defineArr[i].x, defineArr[i].y, defineArr[i].round, 0, 2*Math.PI);
		    	}
		    	cxt.fill();
		    	cxt.closePath();
		    	cxt.restore();
		    }
		}
	}
	
	
	
	
	/*function easeOut(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	}
	function wss_mTweenTwo(el,target,time,cxt) {
		var t = 0;
		var b = R; 
		var c = target - R; 
		var d = time/20; 
		clearInterval(el.timer);
		el.timer = setInterval(function(){
			t++;
			if(t > d) { 
				drawImg(cxt,el.x,el.y,val,img);
				clearInterval(el.timer); 
//				callBack();
			} else {
				var val = easeOut(t,b,c,d);
				drawImg(cxt,el.x,el.y,val,img);
			}
		},20);
	}*/
	
	
})(window)
