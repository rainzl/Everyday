(function(w){
	function otherEvent(id) {
		if (typeof id == 'string') {
			this.obj = document.getElementById(id);
		} else {
			this.obj = id;
		}
	}
	otherEvent.prototype.addEvent = function (Event,fn,ele) {
		var that = this;
		this.obj = ele || this.obj;
		this.obj.addEventListener(Event,function(){
			fn(that.obj);
		});
	}
	otherEvent.prototype.over = function () {
		var that = this;
		this.obj = ele || this.obj;
		console.log(this.obj)
		this.obj.addEventListener(Event,function(){
			fn(this);
		});
	}
	//页面初始化
	
	var dataRand = new DataRander('filesHead','filesTab');
	
	dataRand.init(data.files,2);
	dataRand.clickRand('filesHead','a');
	//dataRand.clickRand('filesTab','tr'); //调整chekbox中
	
	
	setBodyHei();//设置页面宽高
	headPic('headIn','headInfoCaption','headInShow');
	headPic('filesSortId','filesSortList','filesSortListShow',true);
	
	//循环排列顺序的span列表加,给span加鼠标移入移出事件
	circuleEv('filesSortId','#filesList .filesSortList span','active');
	
	
	
	fnfileList();//文件夹交互操作
	function fnfileList() {
		var otherE = new otherEvent('filesTab')
		var table = document.getElementById('filesTab');
		var rows = table.tBodies[0].rows;
		for ( var i=0; i<rows.length; i++ ) {
			(function(i){
				var checkbox = rows[i].cells[0].getElementsByTagName('em')[0];
				checkbox.addEventListener('click',function(){
					tools.addClass(this,'filesChecked');
					var parent = tools.findParent(this,rows);
					if (parent) {
						tools.addClass(parent,'active');
					}
				})
			})(i)
		}
	}
	
	function circuleEv(id,selector,className) {
		var spans = tools.$(selector);
		if(spans.length>1) {
			for ( var i=0; i<spans.length; i++ ) {
				var otherE = new otherEvent(id);
				otherE.addEvent('mouseover',function(obj){
					tools.addClass(obj,className);
				},spans[i]);
				otherE.addEvent('mouseout',function(obj){
					tools.rmClass(obj,className);
				},spans[i]);
				otherE.addEvent('click',function(obj){
					var prev = obj.parentNode.getElementsByClassName('show')[0];
					var i = obj.getElementsByTagName('i')[0];
					tools.rmClass(prev,'show');
					tools.addClass(i,'show');
				},spans[i]);
			}
		}
	}
	function headPic(id,className,addClass,beal) {
		beal = beal || false;
		var otherE = new otherEvent(id);
		otherE.addEvent('mouseover',function(obj){
			var list = obj.getElementsByClassName(className)[0];
			clearTimeout(list.timer);
			if ( beal ) {
				obj = list;
			}
			tools.addClass(obj,addClass);
		});
		otherE.addEvent('mouseout',function(obj){
			var list = obj.getElementsByClassName(className)[0];
			list.timer = setTimeout(function(){
				if ( beal ) {
					obj = list;
				}
				tools.rmClass(obj,addClass);
			},200)
		});
	}
	
	function setBodyHei() {
		var oWrap = document.getElementById('tBody');
		var oHeader = document.getElementById('header');
		var H = document.documentElement.clientHeight || document.body.clientHeight;
		var h = H - oHeader.offsetHeight < 500? 500: H - oHeader.offsetHeight;
		oWrap.style.height = h + 'px';	
	}
})(window)
