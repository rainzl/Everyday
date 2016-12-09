

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
	
	alert(1);
	defineAttr(rows,cells);
	getAll();

	
	for(var i = 0;i < as.length;i++){
		as[i].index = i;
		as[i].addEventListener('click',fnClick);
		as[i].addEventListener('mouseover',mouseMAll);
		as[i].addEventListener('mouseout',outMAll);
		
		
		
		function fnClick(){
			
			roundMAll();
		}
	}
	
	
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
	   	cxt.fillStyle = 'green';
	    for(var i = 0;i<defineArr.length;i++){
	    	cxt.beginPath();
	    	cxt.arc(defineArr[i].x, defineArr[i].y, R, 0, 2*Math.PI);
	    	cxt.fill();
	    }
	}
}