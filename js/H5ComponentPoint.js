function H5ComponentPoint(name,cfg) {
	var point = new H5ComponentBase(name,cfg);
	cfg.ischild && point.css('z-index',-1);
	// cfg.ismain && point.css('z-index')

	// 动画层
	var point_child = $('<div class="H5Component H5Component_point H5Component_pointChild">');
	point_child.css('background',cfg.css.background);
	point.append(point_child);

	point.append($('<div class="point_date"><div>' + cfg.name + '</div><div>' + cfg.date + '</div></div>'));

	point.on('click',function () {
		point.css('box-shadow','0 0 10px');
	});

	return point;
}