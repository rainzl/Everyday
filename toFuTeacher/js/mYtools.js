var tools = (function(){
	var toolsObj = {
		$: function (selector,parent) {
			parent = parent? parent: document;
			if ( selector.substr(0,1) == '#'&& selector.split(' ').length == 1 ) {
				return document.getElementById(selector.substr(1));
			} else {
				var arr = Array.from(document.querySelectorAll(selector));
				return arr.length == 1? arr[0]: arr;
			}
		},
		getByClass: function (className,parent) {
			parent = parent? parent: document;
			if (parent.getElementsByClassName) {
				return parent.getElementsByClassName(className);
			} else {
				var ele = parent.getElementsByTagName('*');
				var arr = [];
				for ( var i=0; i<ele.length; i++ ) {
					if ( tools.hasClass(ele[i].className,className) ) {
						arr.push(ele[i]);
					}
				}
				return arr;
			}
		},
		addClass: function ( obj,className ){
			if ( obj.className ) {
				if ( !tools.hasClass(obj.className,className) ) {
					obj.className += ' ' +className;
				}
			} else {
				obj.className = className;
			}
		},
		rmClass: function ( obj,className ) {
			if ( obj.className ) {
				if ( tools.hasClass(obj.className,className) ) {
					var arrClass = obj.className.split(' ');
					for ( var i=0; i<arrClass.length; i++ ) {
						if ( arrClass[i] == className ) {
							arrClass.splice(i,1);
						}
					}
					obj.className = arrClass.join(' ');
				}
			}
		},
		hasClass: function (element,className) {
			var re = new RegExp('\\b'+className+'\\b','g');
			return re.test(element);
		},
		addEvent: function (obj,event,fn) {
			obj.Event = obj.Event || {};
			obj.Event[event] = obj.Event[event] || [];
			if ( tools.arrIndexOf(fn,obj.Event[event]) ) {
				obj.Event[event].push(fn);
			}
		},
		trigger: function (obj,event) {
			if ( obj.Event[event] ) {
				obj.Event[event].forEach(function(item){
					item();
				});
			}
		},
		arrIndexOf: function (obj,arr) {
			var onOff = true;
			arr.forEach(function(item){
				if ( obj === item ) {
					onOff = false;
				}
			})
			return onOff;
		},
		extend: function (obj1,obj2) {
			if ( obj2 ) {
				for ( var attr in obj2 ) {
					obj1[attr] = obj2[attr];
				}
				return obj1;
			} else {
				var newObj = obj1.push? []: {};
				for ( var attr in obj1 ) {
					if (typeof obj1[attr] === "object") {
						newObj[attr] = tools.extend(obj1[attr]);
					} else {
						newObj[attr] = obj1[attr];
					}
				}
				return newObj;
			}
		},
		findParent: function (obj,parentSelector) { //当前元素，父级元素的集合，或者父级元素
			var parent = null;
			for ( var i=0; i<parentSelector.length; i++ ) {
				if ( obj == parentSelector[i] ) {
					parent = obj;
				}
			}
			parent = parent || this.findParent(obj.parentNode,parentSelector);
			return parent;
		}
	};
	return toolsObj;
})();
