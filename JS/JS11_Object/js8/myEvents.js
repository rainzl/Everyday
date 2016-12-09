var myEvents = function () {
	
	return function Wheel(id) {
		this.obj = document.getElementById(id);
		this.settings = {
			fnUp:function(){},
			fnDown:function(){}
		}
	}
	Wheel.prototype.init = function (json) {
		this.settings = tools.extend(this.settings,json);
	};
	Wheel.prototype.done = function (beal) {
		beal? this.settings.fnUp(): this.settings.fnDown();
	}
	Wheel.prototype.wheel = function () {
		var that = this;
		this.obj.addEventListener('mousewheel',fnScroll);
		this.obj.addEventListener('DOMMouseScroll',fnScroll);
		function fnScroll(ev) {
			var ev = ev || event;
			that.done(that.scroll(ev));
		}
	}
	Wheel.prototype.scroll = function (ev) {
		var beal = null;
		if ( ev.wheelDelta ) {
			beal = ev.wheelDelta>0? true: false;
		} else {
			beal = ev.detail >0? false: true;
		}
		return beal;
	}
	
	
}
