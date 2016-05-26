function H5ComponentBar_v(name,cfg) {
	var bar = new H5ComponentBase(name,cfg);
	var barWidth = cfg.css.width;
	var barHeight = cfg.css.height;

	for (var i = 0; i <= cfg.date.name.length - 1; i++) {
		var barChild = $('<div class="H5Component_' + cfg.type + '_child">');
		barChild.css('height',cfg.date.percent[i]*barHeight + 'px')
			.css('top','-' + cfg.date.percent[i]*barHeight + 'px')
			.append($('<div class="H5Component_' + cfg.type + '_childCover">'))
			.append($('<div class="H5Component_' + cfg.type + '_childName">' + cfg.date.name[i] + '</div>'))
			.append($('<div class="H5Component_' + cfg.type + '_childPer">' + cfg.date.percent[i]*100 + '%</div>'));
		cfg.date.color[i] && barChild.css('background',cfg.date.color[i]);
		bar.append(barChild);
	}

	bar.on('onLoad',function () {
		$('.H5Component_' + cfg.type + '_childName').each(function (i) {
			var a = $(this);
			setTimeout(function (a) {
				return function () {
					a.fadeIn();
				}
			}(a),100*i);			
		});
		setTimeout(function () {
			$('.H5Component_' + cfg.type + '_childPer').fadeIn();
		},500);
	});

	return bar;
}