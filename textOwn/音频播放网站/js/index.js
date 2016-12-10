(function(w){
	//生成列表的样式
	var head = document.getElementById('header');
	var zbjList = document.getElementById('zbjListC');
	var zbjListCanvers = zbjList.getElementsByTagName('canvas')[0];
	var zbjListA = zbjList.getElementsByClassName('zbjlistA')[0];
	var zbjCxt = zbjListCanvers.getContext('2d');
	var W = document.documentElement.clientWidth,
		H = document.documentElement.clientHeight;
	var search = 1;
	var zbjArrLise = getLiSty(search);
	
	drawEle(zbjArrLise,zbjCxt);
	
	function drawEle(arr,cxt) {
		cxt.canvas.width = zbjListA.offsetWidth;
		cxt.canvas.height = H-head.offsetHeight;
		
		arr.forEach(function(item,i){
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
			drawRing(cxt,oriX,oriY,w/2-2,arrColor);
			drawImg(cxt,oriX,oriY,w/2-w/6,img);
			drawTitle(cxt,l,oriY+w/2+w/12,w,title);
			drawInfo(cxt,l,oriY+w/2+w/5,w,info);
		});
		
	}
	function drawRing(cxt,x,y,r,arrColor) {
		cxt.save();
		var rad = 2*Math.PI/arrColor.length;
		var lastRad = 0;
		for ( var i=0; i<arrColor.length; i++ ) {
			var start = Math.round(Math.random()*270);
			cxt.beginPath();
			cxt.strokeStyle = arrColor[i];
			cxt.lineWidth = 3;
			cxt.arc(x,y,r,lastRad,start*Math.PI/180);
			cxt.stroke();
			cxt.closePath();
			lastRad = start*Math.PI/180;
		}
		cxt.restore();
	}
	function drawImg(cxt,x,y,r,img) {
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
			arr.push({'w':w,'h':w,'t':t,'l':l,'spaceX':spaceX,'spaceY':spaceY,'js':js});
			zbjListA.appendChild(a);
		}
		return arr;
	}
})(window)
