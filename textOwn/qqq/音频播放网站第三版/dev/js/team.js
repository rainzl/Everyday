(function(){
	var contentPhoto = document.querySelector('.content_photo');
	var imgs = contentPhoto.querySelectorAll('.img');
	var zfClose = contentPhoto.querySelectorAll('.zf_close');
	var zfOk = document.querySelector(".zf_ok");//所有input
	var inp = document.getElementById("inp");//input
	var btn = document.querySelector(".zf_btn");//ok
	var hintBtn = document.querySelector(".zf_ok_p");//黄字
	var arr1 = ["张兵军","顾争艳","华妍","王松松","宋志银","耿太良","韩兆科","郑峰"];

	
	//鼠标移入图片
	start();
	function start() {
		var IMG = Array.from(imgs);
		IMG.forEach((e,i)=>{
			e.parentNode.zIndex = 3;
			e.parentNode.setAttribute("name",arr1[i]);
			e.parentNode.style.left= (i+1)*140 + "px";
			e.parentNode.style.top = 20 + "px";
			e.parentNode.style.opacity = 1;
			e.parentNode.style.transform = "scale(1)";
			e.parentNode.style.transform = "rotateY(0deg)";
			e.addEventListener('mouseenter',imgOver);
			e.addEventListener('mouseout',imgOut);
			console.log(i)
		})
	}
	
	function imgOver(){
		var ele = this;
		mTween(this,{rotateY:720},200,"linear");
		ele.nextElementSibling.style.display = "block";
		mTween(this.nextElementSibling,{scale:2},300,"linear",function(){
			mTween(ele.nextElementSibling,{scale:1},200,"linear");
		});
	}
	function imgOut(){
		var ele = this;
		ele.nextElementSibling.style.display = "none";
		mTween(this,{rotateY:0},200,"linear");
	}
	//=========================
	//输入框
	var hintBtn = document.querySelector(".zf_ok_p");//黄
	var hint = document.querySelector(".hint");//提示点击
	var hint_close = document.querySelector(".hint_close");//关闭提示
	var trade = document.querySelector(".trade");//换一批
	
	hintBtn.onclick = function(){//点击出现提示信息
		hint.className = "hint show";
		hintBtn.className = "hide";
	};
	var spans = document.querySelectorAll(".zf_span");//每个人的名字
	var tab = false;
	for(var i = 0; i < spans.length; i++){
		spans[i].innerHTML = arr1[i];
	}
	hint_close.onclick = function(){//关闭提示
		hint.className = "hint hide";
		hintBtn.className = "zf_ok_p"
	}
	trade.onclick = function(){//换一批
		if(tab){
			for(var i = 0; i < spans.length; i++){
				spans[i].innerHTML = arr1[i];
			}
		}else {		
			for(var i = 0; i < spans.length; i++){
				spans[i].innerHTML = arr1[i+4];
			}
		}
		tab = !tab;
	};
	
	//详细图片放大
	btn.onclick = function(){
		mes();
	}
//---------------
	for (var i = 0; i <spans.length; i++) {
		spans[i].onclick = function(){
			inp.value = this.innerHTML;
		}
	}

//----------------
	//详细图片放大
	function mes(){
		inp.focus();
		var val = inp.value;
		if(!inp.value) {
			alert('请选择名字');
		} else {
			mTween(zfOk,{rotateX:540,opacity: 0},500,"linear",zfCome);
			function zfCome() {
				for (var i = 0; i < imgs.length; i++) {
					if(val !== imgs[i].parentNode.getAttribute('name')){
						mTween(imgs[i].parentNode,{opacity:0},(500+i*100),'elasticOut');
					}else{
						var close = imgs[i].parentNode.children[2];
						var img = imgs[i].parentNode;
						mTween(imgs[i].parentNode,{left:600,top: 100,rotateY:720,scale:3},500,"linear");
						mTween(zfClose[i],{opacity:100},1000,"linear");
						inp.value = "";
						close.onclick = function() {
							start();
							this.style.opacity = 0;
							mTween(zfOk,{rotateX:720,opacity: 100},500,"linear");
//							for(var i = 0; i < imgs.length; i++) {
//								mTween(imgs[i],{opacity: 100},500,"linear");
//							}
//							mTween(img,{left:(i+1)*140,top: 100,rotateY:720,scale:1,opacity: 100},500,"linear");
							
						}
					}
				}
			};
		}
	};
	
	for(var i = 0; i < zfClose.length; i++) {
//		zfClose[i].onclick = function() {
//			zfClose[i].style.opacity = 1;
//			zfClose[i].style.transform = 1;
//		};
	}
	
/*	function mes(){
		inp.focus();
		var val = inp.value;
		
		for (var i = 0; i < imgs.length; i++) {
			// if(val == ""){
			// 	alert("请输入搜索信息!");
			// }else if(val != arr1[i]){
			// 	alert("点击提示信息获取开发者姓名！");
			// }else{
				if(val !== imgs[i].parentNode.getAttribute('name')){
					mTween(imgs[i].parentNode,{top:300,opacity:0},(500+i*100),'elasticOut');
				}else{
					mTween(imgs[i].parentNode,{left:600,rotateY:720,scale:1.5},500,"linear");
				}
		//	}
			
		}
	//	inp.disabled = true;
	}
*/
})()







/*(function(){
	//点击btn时获取inp的val  通过判断val显示对应的介绍  没有则显示请看提示信息
	var inp = document.getElementById("inp");
	var btn = document.querySelector(".zf_btn");
	var teamD = document.querySelectorAll(".zf_teamD")
	var img = document.querySelectorAll(".img")
	var zf_js = document.querySelectorAll(".zf_js");
	var zIndex = 1;
	var arr1 = ["宋志银","张兵军","王松松","顾争艳"];
	var arr2 = ["耿太良","韩兆科","郑峰","华妍"];
	var arr = ['5','-10','-10','30','10','20','30','-5'];
	for(var i = 0; i < teamD.length; i++){
		arr[i] = {
			left:img[i].offsetLeft,
			top:img[i].offsetTop,
		}
		
	}
//	console.log(cssTransform(img[0],rotate))
	function auto(){
		img[0].style.transform = "rotate(5deg)";			
		img[1].style.transform = "rotate(-10deg)";			
		img[2].style.transform = "rotate(-10deg)";
		img[3].style.transform = "rotate(30deg)";
		img[4].style.transform = "rotate(10deg)";
		img[5].style.transform = "rotate(20deg)";
		img[6].style.transform = "rotate(-30deg)";
		img[7].style.transform = "rotate(-5deg)";
		for(var i =0; i < Image.length; i++){
			img[i].style.boxShadow = "";
			img[i].style.zIndex = 1;	
			zf_js[0].style.opacity = 0;
			console.log(zf_js[0])
			//mTween(zf_js[i],{opacity:0},1000,"linear");
		}
	}
	btn.onclick = mes;
	for (var i = 0; i < img.length; i++) {
		img[i].index = i;
		img[i].onmouseover = function(){
			zIndex++;
			mTween(img[this.index],{rotate:0,scale:1.5},100,"linear",function(){
				mTween(zf_js[this.index],{opacity:100},1000,"linear");
			});
			img[this.index].style.boxShadow = "10px 10px 15px #ccc";
			img[this.index].style.zIndex = zIndex;
			img[this.index].style.borderBottomRightRadius = "140px 30px";
		}
		img[i].onmouseout = auto;
	}

	document.onkeydown = function(e){
		if(e.keyCode == 13){
			mes();
		}	
	};
	
	
	
	
	function mes(){
		var container = document.querySelector(".container")
		auto();
		inp.focus();
		var val = inp.value;
		if(val == "张兵军"){
			mesa(0);
		}else if(val == "顾争艳"){
			mesa(1);
		}else if(val == "华妍"){
			mesa(2);
		}else if(val == "王松松"){
			mesa(3);
		}else if(val == "宋志银"){
			mesa(4);
		}else if(val == "耿太良"){
			mesa(5);
		}else if(val == "韩兆科"){
			mesa(6);
		}else if(val == "郑峰"){
			mesa(7);
		}else if(val == ""){
			alert("请输入搜索信息!");
		}else {
			alert("点击提示信息获取开发者信息!");
		}
		//inp.setAttribute("readOnly",true); 
		inp.disabled = true;
		
		
		function mesa(a){//弹出信息函数
			zIndex++;
			mTween(img[a],{rotate:0,scale:1.5},100,"linear",function(){
				mTween(zf_js[a],{opacity:100},800,"linear");
			});
			img[a].style.boxShadow = "10px 10px 15px #ccc";
			img[a].style.zIndex = zIndex;
			img[a].style.borderBottomRightRadius = "140px 30px";
		}
	}
	document.onclick = function(){
		inp.disabled = false;
	}
	//提示  点击提示出现人名，点击人名加入到输入框
	var hintBtn = document.querySelector(".zf_ok_p");
	var hint = document.querySelector(".hint");
	var hint_close = document.querySelector(".hint_close");
	var trade = document.querySelector(".trade");
	
	hintBtn.onclick = function(){
		hint.className = "hint show";
		hintBtn.className = "hide";
	}
	hint_close.onclick = function(){
		hint.className = "hint hide";
		hintBtn.className = "zf_ok_p"
	}
	var spans = document.querySelectorAll(".zf_span")
	var tab = false;
	for(var i = 0; i < spans.length; i++){
		spans[i].innerHTML = arr1[i];
	}
	trade.onclick = function(){
		if(tab){
			for(var i = 0; i < spans.length; i++){
				spans[i].innerHTML = arr1[i];
			}
		}else {		
			for(var i = 0; i < spans.length; i++){
				spans[i].innerHTML = arr2[i];
			}
		}
		tab = !tab;
	}
	for (var i = 0; i <spans.length; i++) {
		spans[i].onclick = function(){
			//inp.value = this.innHTML;
			if(this.innerHTML == "张兵军"){
				inp.value = "张兵军";
			}
			if(this.innerHTML == "顾争艳"){
				inp.value = "顾争艳";
			}
			if(this.innerHTML == "王松松"){
				inp.value = "王松松";
			}
			if(this.innerHTML == "华妍"){
				inp.value = "华妍";
			}
			if(this.innerHTML == "宋志银"){
				inp.value = "宋志银";
			}
			if(this.innerHTML == "耿太良"){
				inp.value = "耿太良";
			}
			if(this.innerHTML == "郑峰"){
				inp.value = "郑峰";
			}
			if(this.innerHTML == "韩兆科"){
				inp.value = "韩兆科";
			}
		}
	}
	
	
	
})()
*/