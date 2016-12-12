(function(){
	//构造函数
	function DeleEle(id) {
		this.obj = document.getElementById(id);
		this.settings = {
			deleBtn: null, //删除按钮
			checkAll: null,
			checkBtns: [],
			hint: null,
			lis: [],
			fnMove: function(){},
			fnUp: function(){}
		}
		this.arr = [];//存储一倍选中的元素
		this.disX = 0;
		this.disY = 0;
	}
	DeleEle.prototype = {
		constructor: DeleEle,
		//功能初始化
		init: function (json) {
			this.settings = tools.extend(this.settings,json);
			this.checkAllClick();
			for ( var i=0; i<this.settings.checkBtns.length; i++ ) {
				this.settings.lis[i].onOff = true;
				this.settings.checkBtns[i].index = i;
				this.settings.lis[i].index = i;
				this.objClick(this.settings.checkBtns[i],true);
				this.objClick(this.settings.lis[i]);
				
			}
			this.deleBtnClick();
			this.drag(this.obj);
		},
		//点击删除
		deleBtnClick: function () {
			var _this = this;
			this.settings.deleBtn.addEventListener('click',function(){
				_this.delet();
			})
		},
		//拖拽删除
		drag: function (obj) {
			var that  = this;
			obj.addEventListener('mousedown',fnDown)
			function fnDown(ev){
				ev = ev || event;
				that.down(ev,fnDown);
				ev.preventDefault();
			}
		},
		down: function (ev,fnDown) {
			var _this = this;
			var time = new Date().getTime();
			document.addEventListener('mousemove',fnMove);
			function fnMove(ev) {
				_this.move(ev,time);
			};
			document.addEventListener('mouseup',fnUp);
			function fnUp(ev) {
				_this.up(ev,fnMove,fnUp,fnDown);
			};
		},
		move: function (ev,time) {
			var nowTime = new Date().getTime();
			if ( nowTime - time >400 ) {
				this.settings.fnMove(ev.pageX,ev.pageY,this.arr.length);
			}
		},
		up: function (ev,fnMove,fnUp,fnDown) {
			if ( this.settings.fnUp(ev.pageX,ev.pageY) ) {
				this.delet();
			}
			
			document.removeEventListener('mousemove',fnMove);
			document.removeEventListener('mouseup',fnUp);
		},
		delet: function () {
			if ( this.arr.length > 0 ) {
				for ( var i=this.arr.length-1; i>=0; i-- ) {
					this.arr[i].parentNode.removeChild(this.arr[i]);
					this.arr.length = this.arr.length-1;
				}
			}
		},
		//全选按钮的点击
		checkAllClick: function () {
			var that = this;
			this.settings.checkAll.addEventListener('click',function(){
				if ( that.arr.length == that.settings.lis.length ) {
					that.settings.checkAll.checked = false;
					that.arr = [];
					for ( var i=0; i<that.settings.lis.length; i++ ) {
						that.settings.checkBtns[i].checked = false;
						tools.rmClass(that.settings.lis[i],'active');
						that.settings.lis[i].onOff = true;
					}
				} else {
					that.settings.checkAll.checked = true;
					that.arr = [];
					for ( var i=0; i<that.settings.lis.length; i++ ) {
						that.checked(i);
					}
				}
			});
		},
		//点击选框和li的时候调用 obj:点击的元素，onOff:是否需要阻止冒泡
		objClick: function (obj,onOff) { 
			var that = this;
			obj.addEventListener('click',function(ev){
				if (that.settings.lis[this.index].onOff) {
					that.checked(this.index);
				} else {
					that.noChecked(this.index);
				}
				
				if ( onOff ) ev.cancelBubble = true;
				that.settings.checkAll.checked = that.arr.length == that.settings.lis.length? true: false;
			});
			
		},
		//选中时需要执行的操作
		checked: function (index) {
			this.settings.checkBtns[index].checked = true;
			tools.addClass(this.settings.lis[index],'active');
			this.arr.push(this.settings.lis[index]);
			this.settings.lis[index].onOff = false;
		},
		//取消选中时需要执行的操作
		noChecked: function (index) {
			this.settings.checkBtns[index].checked = false;
			tools.rmClass(this.settings.lis[index],'active');
			var num = tools.arrIndexOf(this.settings.lis[index],this.arr);
			this.arr.length == 1? this.arr=[]: this.arr.splice(num,1);
			
			this.settings.lis[index].onOff = true;
		}
	}
	
	//--函数调用去------------------------
	
	var Hint = document.getElementById('hint3');//鼠标拖拽时的提示框
	var dustbin = document.getElementsByClassName('dustbin')[0];//垃圾箱
	var email = document.getElementById('email');
	setCenter('box');//设置元素屏幕居中
	
	var deleEmail = new DeleEle('email');
	deleEmail.init({
		deleBtn: tools.$('#delet'),
		checkAll: tools.$('.emailHead input'),
		checkBtns: email.getElementsByTagName('input'),
		lis: email.children,
		fnMove: fnMove,
		fnUp: fnUp,
		hint: Hint
	});
	
	function fnMove(x,y,num) {
		Hint.innerHTML = '选中'+num+'封邮件';
		Hint.style.left = x+5+'px';
		Hint.style.top = y+5+'px';
		Hint.style.display = 'block';
	}
	function fnUp(x,y) {
		
		Hint.style.display = 'none';
		var t = dustbin.offsetTop,
			l = dustbin.getBoundingClientRect().left,
			b = t + dustbin.offsetHeight,
			r = l + dustbin.offsetWidth;
		
		if (x>l&&x<r&&y>t&&y<b) {
			return true;
		} else {
			return false;
		}
	}
	
	
	
	function setCenter(id) {
		var oBox = document.getElementById(id);
		var H = document.documentElement.clientHeight;
		var W = document.documentElement.clientWidth;
		oBox.style.top = (H-oBox.offsetHeight)/2 + 'px';
		oBox.style.left = (W-oBox.offsetWidth)/2 + 'px';
	}
})()
