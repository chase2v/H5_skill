function H5ComponentRadar(name,cfg) {
	var radar = new H5ComponentBase(name,cfg);
	var radarWidth = cfg.css.width*3;
	var radarHeight = cfg.css.height*3;
	var r = radarWidth/2;

	var draw = document.createElement('canvas');
	draw.height = radarWidth;
	draw.width = radarWidth;
	// draw.style.background = 'red';
	radar.append(draw);
	var ctx = draw.getContext('2d');

	var radarAnimation = function () {
		ctx.clearRect(0,0,radarWidth,radarHeight);

		// 圆心（150,150） r 100
		// x 坐标 = a + Math.sin(rad) * r;
		// y 坐标 = b + Math.cos(rad) * r;
		// rad = 360/cfg.date.name.length * 2*Math.PI/360 * ?

		// 绘制雷达背景
		ctx.strokeStyle = '#ccc';
		ctx.lineWidth = 3;

		var t = cfg.date.name.length;
		var rad = 2*Math.PI/t;
		for (var i = 10; i >= 1; i--) {
			ctx.beginPath();
			ctx.moveTo(r+Math.sin(rad)*30*i,r+Math.cos(rad)*30*i);
			for (var j = 0; j <= t - 1; j++) {
				var x = Math.ceil(r + Math.sin(rad*(j+1))*30*i);
				var y = parseInt(r + Math.cos(rad*(j+1))*30*i);
				ctx.lineTo(x,y);

				// 添加项目名称
				if(at == 300 && i == 10){
					var childName = $('<div class="H5ComponentRadar_name">' + cfg.date.name[j] + '</div>');
					cfg.date.color && childName.css('color',cfg.date.color[j]);
					if (x/3==(r/3)) {
						childName.css('left',(x/3-25) +'px');
					} else if(x/3 < (r/3)){
						childName.css('right',(cfg.css.width-x/3) +'px');
					}else if(x/3 > (r/3)){
						childName.css('left',x/3+'px');
					}
					if (y/3<(r/3)) {
						childName.css('bottom',(cfg.css.height-y/3) +'px');
					} else{
						childName.css('top',y/3+'px');
					}
					setTimeout(function (childName) {
						return function () {
							radar.append(childName);
						}					
					}(childName),200*j);					
				}
			}
			if(i%2 == 0){
				ctx.fillStyle = '#99c0ff';
			} else{
				ctx.fillStyle = '#fff';
			}
			ctx.fill();
			ctx.stroke();
		}

		// 绘制折线	
		ctx.strokeStyle = '#ff7676';
		ctx.fillStyle = '#ff7676';
		ctx.lineWidth = 3;

		var per = cfg.date.percent;
		for (var i = 0; i < t; i++) {
			var x = r + Math.sin(rad*(i+1))*at*per[i];
			var y = r + Math.cos(rad*(i+1))*at*per[i];
			var nextX = r + Math.sin(rad*(i+2))*at*per[i+1];
			var nextY = r + Math.cos(rad*(i+2))*at*per[i+1];
			ctx.beginPath();
		    ctx.moveTo(x,y);
			ctx.arc(x,y,6,0,2*Math.PI);
			ctx.fill();
			
			if(i == (t-1)){
				nextX = r + Math.sin(rad)*at*per[0];
				nextY = r + Math.cos(rad)*at*per[0];
			}
			ctx.lineTo(nextX,nextY);
			
			ctx.stroke();
		}
		at += 5;
		if (at <= 300) {
			setTimeout(radarAnimation,10);
		}
	}
	var at;
	
	radar.on('onLoad',function () {
		radar.show();
		at = 0;
		radarAnimation();
	});
	radar.on('onLeave',function () {
		radar.hide();
		radar.find('.H5ComponentRadar_name').text('');
	});

	return radar;
}