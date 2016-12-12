/*example
 *
 * var from = new From('form');
from.init('name',verify);	//第一个参数 

function verify(obj,name) {//obj是需要设置的输入元素
	var onOff = true;
	switch (obj[name]) {
		case 'birthday':
			var arr = obj.value.match(/\d+/g);
			var birDate = new Date(arr[0],arr[1]%12,arr[2]);
			var year = birDate.getFullYear(),
				month = birDate.getMonth()==0? 12: birDate.getMonth(),
				day = birDate.getDate();
			var nowDate = new Date();
			if ( year == arr[0] && month == arr[1] && day == arr[2] && nowDate-birDate>=10000 && nowDate-birDate<=(80*365*24*60*60*1000)) {
				onOff = true
			} else {
				onOff = false;
			}	
			break;
	}
	return onOff;
	}*/

(function(){
	function From(id) {//传from的id进来
		this.obj = document.getElementById(id);//form的id
		this.re = {
			phone: /^1([3|5|7|8][0-9]|14[7|5])\d{8}$/,
			identify: /^[1-9](\d{14}|\d{17}|\d{16}x)$/,
			email: /^[a-z]\w+@[a-z0-9]+.(com|cn|com.cn)$/,
			qq: /^[1-9][0-9]{4,11}$/,
			birthday: /^(\d{4})\D+(\d{1,2})\D+(\d{1,2})(\D+)?$/
		}
		this.forms = [];
		this.num = 0;
	}
	From.prototype.init = function (name,callBack) {
		var that = this;
		this.forms = this.getInput(name);
		this.obj.addEventListener('submit',function(ev) {
			var ev = ev || event;
			that.submit(ev);
		})
		for ( var i=0; i<this.forms.length; i++ ) {
			this.forms[i].addEventListener('input',function(){
				that.input(this,name,callBack);
			});
		}
	}
	From.prototype.submit = function (ev) {
		for ( var i=0; i<this.forms.length; i++ ) {
			if (this.forms[i].onOff||this.forms[i].value) {
				this.succeed(this.forms[i]);
				this.num ++;
			} else {
				this.failed(this.forms[i]);
			}
		}
		if ( this.num != this.forms.length ) {
			ev.preventDefault();
		}
	}
	From.prototype.input = function (that,name,callBack) {
		if (this.re[that[name]].test(that.value)) {
			if ( callBack && !callBack(that,name) ) { //上传callBack并且callBack返回值是假
				that.onOff = false;
				this.failed(that);
			} else { //包含有传callBack并且callBack返回值是真 和没有传callBack两种方式
				that.onOff = true;
				this.succeed(that);
			}
		} else {
			that.onOff = false;
			this.failed(that);
		}
	}
	From.prototype.succeed = function (that) {//传进来的是需要操作的元素
		that.style.borderColor = 'green';
	}
	From.prototype.failed = function (that) {//传进来的是需要操作的元素
		that.style.borderColor = 'red';
	}
	From.prototype.getInput = function (name) {
		var child = this.obj.getElementsByTagName('*');
		var arr = [];
		for ( var i=0; i<child.length; i++ ) {
			if ( child[i].getAttribute(name) ) {
				arr.push(child[i]);
			}
		}
		return arr;
	}
	window.From = From;
})()
