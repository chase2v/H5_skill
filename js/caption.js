function H5ComponentCaption(name,cfg) {
	var caption = new H5ComponentBase(name,cfg);

	var draw = document.createElement('canvas');
	caption.append(draw);
	draw.width = cfg.css.width * 3;
	draw.height = cfg.css.height * 3;
	var ctx = draw.getContext('2d');

	ctx.lineWidth = 6;
	ctx.strokeStyle = '#F86060';
	ctx.beginPath();
	ctx.moveTo(125,150);
	ctx.lineTo(775,150);
	ctx.lineTo(900,78);
	ctx.lineTo(775,6);
	ctx.lineTo(125,6);
	ctx.lineTo(0,78);
	ctx.lineTo(125,150);
	ctx.stroke();

	return caption;
}