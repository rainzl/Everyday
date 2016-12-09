//数据渲染函数
	function DataRander(headId,tableId) {
		this.head = document.getElementById(headId);
		this.table = document.getElementById(tableId);
		this.data = null;
		this.id = -1;
		this.tags = null;
	}
	DataRander.prototype.init = function (data,id) {
		this.data = data;
		this.id = id;
		this.nav();
		this.body();
	}
	DataRander.prototype.nav = function () {
		var level = dataControl.getParents(this.data,this.id);
		var str = '<div class="filesListRoute left">';
		if ( level.length <= 1 ) {
			str += `<span>${level[0].title}</span>`;
		} else {
			str += this.randNav(level);
		}
		str += '</div><div class="filesListCount right"><span>已加载100个</span></div>';
		this.head.innerHTML = str;
	}
	
	DataRander.prototype.randNav = function (level) {
		var str = `<a data-file-id="${level[1].id}" class="filesListReturn" href="javascript:;">返回上一级</a>
					<i>|</i>`;
		for ( var i=level.length-1; i>=0; i-- ) {
			if ( level[i].id == this.id ) {
				str += `<span>${level[i].title}</span>`;
			} else {
				str += `<a data-file-id="${level[i].id}" href="javascript:;">${level[i].title}</a>
					<i>></i>`;
			}
		}
		return str;
	}
	DataRander.prototype.body = function () {
		//获取这个id下所有的子级数据，添加到页面中
		
		var arrChild = dataControl.getChildById(this.data,this.id);
		var tbody = this.table.tBodies[0];
		var arr = [];
		for ( var i=0; i<arrChild.length; i++ ) {
			arr.push(this.randBody(arrChild[i]));
		}
		
		tbody.innerHTML = arr.join('');
	}
	
	DataRander.prototype.randBody = function(json) {
		return `
				<tr data-file-id="${json.id}">
					<td>
						<em class="filesBtn"></em>
						<i class="${json.type}Icon"></i>
						<span>${json.title}</span>
						<div class="filesFns right">
							<a class="icon icon-share" href="javascript:;">分享</a>
							<a class="icon icon-download" href="javascript:;">下载</a>
							<a class="icon icon-more" href="javascript:;">更多</a>
						</div>
					</td>
					<td>
						<span>-</span>
					</td>
					<td>
						<span>2016-12-04 15:26</span>
					</td>
				</tr>
				`;
	}
	DataRander.prototype.clickRand = function(id,tag) {
		if ( id === 'filesHead' ) {
			this.tag = this.head.getElementsByTagName(tag);
		} else {
			this.tag = this.table.tBodies[0].rows;
		}
		var that = this;
		for ( var i=0; i<this.tag.length; i++ ) {
			this.tag[i].onclick = function () {
				var fileId = this.getAttribute('data-file-id');
				that.init(data.files,fileId);
				that.clickRand('filesHead','a');
				that.clickRand('filesTab','tr');
			}
		}
	}