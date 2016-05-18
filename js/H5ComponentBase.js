function H5ComponentBase(name,cfg) {
	var base = $('<div class="H5Component H5Component_' + cfg.type + ' H5Component_' + name + '">');
	base.attr('id', name + '_' + Math.ceil(Math.random()*10000));

	cfg.css && base.css(cfg.css);

	cfg.text && base.html(cfg.text);

	if(cfg.direc){
		base.text(cfg.direc);
		base.on('click',function () {
			$.fn.fullpage.moveTo(3,0);
		});
	}

	if (cfg.center === true) {
		base.css({left:'50%',transform:'translateX(-50%)'});
	}

	cfg.title && base.append($('<div class="title">'+cfg.title+'</div>'))

	base.on('onLoad',function () {
		base.show();
		setTimeout(function () {
			base.animate(cfg.animateIn,cfg.speed);
		},cfg.delay);
	});
	base.on('onLeave',function () {
		if(name != 'caption'){
			base.hide();
		}		
		setTimeout(function () {
			base.animate(cfg.animateOut);
		},cfg.delay);
	})

	return base;
}