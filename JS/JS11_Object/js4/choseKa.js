(function(w){
	
	w.Tab = function (id) {
		this.box = document.getElementById(id);
		this.nav = this.box.getElementsByTagName('nav')[0];
		this.navs = this.nav.getElementsByTagName('span');
		this.cont = this.box.getElementsByTagName('ul')[0];
		this.conts = this.cont.getElementsByTagName('li');
		this.num = 0;
		this.timer = null;
	}
	Tab.prototype.init = function () {
		this.change();
		this.events();
	}
	Tab.prototype.events = function () {
		var that = this;
		for ( var i=0; i<this.navs.length; i++ ) {
			(function(index){
				that.navs[index].onclick = function () {
					that.num = index;
					that.change();
				}
			})(i)
		}
	}
	Tab.prototype.change = function () {
		for ( var i=0; i<this.navs.length; i++ ) {
			this.navs[i].className = '';
			this.conts[i].className = 'hid';
		}
		this.navs[this.num].className = 'active';
		this.conts[this.num].className = 'show';
	}
	Tab.prototype.autoPlay = function () {
		var that = this;
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			that.num ++;
			if (that.num>=that.navs.length){that.num = 0;}
			that.change();
		},1000)
	}
	Tab.prototype.stop = function() {
		clearInterval(this.timer);
		this.timer = null;
	}
	Tab.prototype.onOff = function () {
		return !!this.timer;
	}
})(window)
