window.onload = function(){
	var wrap = document.querySelector(".wrap");
	var childN = wrap.childNodes;
	for (var i = 0; i < childN.length; i++) {
		if(childN[i].nodeType == '8'){
			var str  = childN[i].nodeValue;
			childN[i].nodeValue = '';
		}
	}
	/*生成按钮*/
	getBtns (wrap);
	/*-----------*/
	
	/*生成所有的第一个子级的li*/
	var arrLiChild = [];
	for (var i = 0; i < data.length; i++) {
		arrLiChild.push(LiChild (data[i]));
	}
	function LiChild (arr) {
		var sf = getHtml (arr,str);
		return getLi (fn(sf));
	}
	/*---------------------*/
	
	/*初始化*/
	function getCont () {
		var ulP = document.createElement("ul");
		var divl = document.createElement("div");
		ulP.setAttribute('class','list1 clearfix');
		divl.setAttribute('class','wrapBox');
		ulP.appendChild(arrLiChild[0]);
		ulP.appendChild(arrLiChild[1]);
		divl.appendChild(ulP);
		return divl;
	}
	wrap.appendChild(getCont());
	/*-------------*/
	var divBox = wrap.querySelector('.wrapBox');
	var list1 = divBox.children[0];
	/*ul无缝滚动*/
	(function(){
		var btn = document.getElementById("btns"),
			btns = btn.children;
		btns[0].onclick = leftMove;
		function leftMove(){
			btns[0].onclick =null;
			var childLi = list1.children;
			var l = css(childLi[0],'width');
			mTween(list1,{left:-l},500,'linear',function(){
				list1.removeChild(childLi[0]);
				list1.appendChild(arrLiChild[2]);
				list1.style.left=0;
				arrLiChild.push(arrLiChild.shift());
				btns[0].onclick = leftMove;
			});
			divMove ();
		};
		btns[1].onclick = rightMove;
		function rightMove(){
			btns[1].onclick = null;
			var childLi = list1.children;
			arrLiChild.unshift(arrLiChild.pop());
			list1.insertBefore(arrLiChild[0],childLi[0]);
			var r1 = css(childLi[0],'width');
			list1.style.left= -r1 +'px';
			list1.removeChild(childLi[2]);
			mTween(list1,{left:0},500,'linear',function () {
				btns[1].onclick = rightMove;
			});
			divMove ();
		};
		
	})();
	
	/*div高度动画*/
	divMove ();
	function divMove () {
		var as = list1.querySelectorAll("a");
		for (var i = 0; i < as.length; i++) {
			(function(e) {
				e.onmouseover = function() {
					divShow(e);
				};
//				e.onmouseout = function() {
//					divHide(e);
//				};
			})(as[i])
		}
	}
	function divShow(ele){
		ele.onmouseover = null;
		
		var showDiv = ele.querySelector('.show');
		var showPlay = ele.querySelector('.paly');
		if(showDiv){
			if(css(showDiv,'height') == 160){
				showDiv.style.height = '160px';
				clearTimeout(ele.timer);
			}else{
				clearTimeout(ele.timer);
				ele.timer = setTimeout(function () {
					showDiv.style.cssText = 'border: 1px solid red;border-top: none;';
					showDiv.style.zIndex = 100;
					mTween(showDiv,{height:160},300,'linear');
				},200);
			}
		}
		ele.className = 'active';
		showPlay.style.display = 'block';
		/*ele.onmouseover = function() {
			divShow(this);
		};*/
		
		ele.onmouseout = function() {
			divHide(ele);
		};
	};
	
	function divHide(ele){
		ele.onmouseout = null;
		clearTimeout(ele.timer);
		var showDiv = ele.querySelector('.show');
		var showPlay = ele.querySelector('.paly');
		if(showDiv){
			ele.timer = setTimeout(function () {
				mTween(showDiv,{height:0},100,'linear',function(){
					showDiv.style.border = '';
					ele.className = '';
					showPlay.style.display = '';
					showDiv.style.zIndex = 10;
				});
			},80);
		}else{
			ele.className = '';
			showPlay.style.display = '';
		}
		
		/*ele.onmouseout = function() {
			divHide(ele);
		};*/
		
		ele.onmouseover = function() {
			divShow(ele);
		};
	};


};
/*---------生成结构------------*/
function getBtns (parent) {
	var div	= document.createElement("div"),
		a1 = document.createElement("a"),
		a2 = document.createElement("a");
	a1.innerHTML = '<';
	a2.innerHTML ='>';
	a1.setAttribute('href','javascript:;');
	a2.setAttribute('href','javascript:;');
	div.setAttribute('id','btns');
	div.appendChild(a1);
	div.appendChild(a2);
	parent.appendChild(div);
}
function getHtml (arr,str) {
	
	var arrStr = str.split('{{break}}');
	var arrNew = arrStr.splice(1,1);
	var arr1 = arrNew.join().split('{{break1}}');
	var arr2 = arr1.splice(1,1);
	var arr3 = arr2.join('').split('{{break2}}');
	var arrHtml=[];
	var inner = ''
	
	if(!arr[0].summary){
		var arr4= arr3.splice(1,1);
		inner = arr3.join('').replace('{{box1}}','box1 first')
						   .replace('{{src}}','src')
						   .replace('{{img}}',arr[0].img)
						   .replace('{{tittle}}',arr[0].tittle)
						   .replace('{{songer}}',arr[0].songer);
						   
		arrHtml.push(inner);
		arr3.splice(1,0,arr4);
		for (var i = 1; i < arr.length; i++) {
			inner = arr3.join('').replace('{{box1}}','box1')
						   .replace('{{src}}','src')
						   .replace('{{img}}',arr[i].img)
						   .replace('{{tittle}}',arr[i].tittle)
						   .replace('{{songer}}',arr[i].songer)
						   .replace('{{summary}}',arr[i].summary)
						   .replace('{{paly}}',arr[i].paly)
						   .replace('{{message}}',arr[i].message)
						   .replace('{{list}}',arr[i].list)
						   .replace('{{describe}}',arr[i].describe);
			arrHtml.push(inner);
			
		}
	}else{
		for (var i = 0; i < arr.length; i++) {
			inner = arr3.join('').replace('{{box1}}','box1')
						   .replace('{{src}}','src')
						   .replace('{{img}}',arr[i].img)
						   .replace('{{tittle}}',arr[i].tittle)
						   .replace('{{songer}}',arr[i].songer)
						   .replace('{{summary}}',arr[i].summary)
						   .replace('{{paly}}',arr[i].paly)
						   .replace('{{message}}',arr[i].message)
						   .replace('{{list}}',arr[i].list)
						   .replace('{{describe}}',arr[i].describe);
			arrHtml.push(inner);
		}
		
	}
	
	return arrHtml;
}

/*-----------------------------*/
/*数组中每两个合并为一个*/
function fn (arr) {
	var newArr = [];
	if(arr.length%2 == 0){
		for (var i = 0; i < arr.length; i+=2) {
			newArr.push(arr[i]+arr[i+1]);
		}
	}else{
		newArr.push(arr[0]);
		for (var i = 1; i < arr.length; i+=2) {
			newArr.push(arr[i]+arr[i+1]);
		}
		
	}
	return newArr;
}

/*--------------------------------------------------*/
/*----生成父级li---*/
function getLi (arr) {
	var liP = document.createElement("li")
	var ul = document.createElement("ul");
	ul.setAttribute('class','list2 clearfix');
	for (var i = 0; i < arr.length; i++) {
		var li = document.createElement("li");
		li.innerHTML = arr[i];
		ul.appendChild(li);
	}
	liP.appendChild(ul);
	return liP;
}

/*---------------------------*/
