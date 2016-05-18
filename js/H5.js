function H5() {
	this.fullpage = $('<div id="fullpage">');
	this.page = [];
	$('body').append(fullpage);

	// 添加页面
	this.addPage = function () {
		// 创建div,class为section
		var page = $('<div class="section">');
		this.page.push(page);
		this.fullpage.append(page);

		return this;
	}

	//添加组件
	this.addComponent = function (name,cfg) {
		var currentPage = this.page[this.page.length-1];
		switch(cfg.type){
			case 'bar':
			currentPage.append(new H5ComponentBar(name,cfg));
			break;
			case 'bar_v':
			currentPage.append(new H5ComponentBar_v(name,cfg));
			break;
			case 'pie':
			currentPage.append(new H5ComponentPie(name,cfg));
			break;
			case 'point':
			currentPage.append(new H5ComponentPoint(name,cfg));
			break;
			case 'polyline':
			currentPage.append(new H5ComponentPolyline(name,cfg));
			break;
			case 'radar':
			currentPage.append(new H5ComponentRadar(name,cfg));
			break;
			case 'ring':
			currentPage.append(new H5ComponentRing(name,cfg));
			break;
			case 'clock':
			currentPage.append(new H5ComponentClock(name,cfg));
			break;
			default:
			currentPage.append(new H5ComponentBase(name,cfg));
		}
		return this;
	}

	this.loader = function () {
		this.fullpage.fullpage({
			onLeave: function(index, nextIndex, direction){
				$(this).find('.H5Component').trigger('onLeave');
			},
			afterLoad : function(anchorLink, index){
				$(this).find('.H5Component').trigger('onLoad');
			}
		});

		this.page[0].find('.H5Component').trigger('onLoad');
		$.fn.fullpage.moveTo(2, 0);
	}

	return this;
}