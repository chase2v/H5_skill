function H5ComponentRadar(name,cfg) {
	var radar = new H5ComponentBase(name,cfg);

	var draw = document.createElement('canvas');
	draw.height = 300;
	// draw.style.background = 'red';
	radar.append(draw);
	var ctx = draw.getContext('2d');

	var radarAnimation = function () {
		ctx.clearRect(0,0,300,300);

		// 圆心（150,150） r 100
		// x 坐标 = a + Math.sin(rad) * r;
		// y 坐标 = b + Math.cos(rad) * r;
		// rad = 360/cfg.date.name.length * 2*Math.PI/360 * ?

		// 绘制雷达背景
		ctx.strokeStyle = '#ccc';
		ctx.lineWidth = 1;

		var t = cfg.date.name.length;
		var rad = 2*Math.PI/t;
		for (var i = 10; i >= 1; i--) {
			ctx.beginPath();
			ctx.moveTo(150+Math.sin(rad)*10*i,150+Math.cos(rad)*10*i);
			for (var j = 0; j <= t - 1; j++) {
				var x = 150 + Math.sin(rad*(j+1))*10*i;
				var y = 150 + Math.cos(rad*(j+1))*10*i;
				ctx.lineTo(x,y);

				// 添加项目名称
				if(at == 100 && i == 10){
					var childName = $('<div class="H5ComponentRadar_name">' + cfg.date.name[j] + '</div>');
					cfg.date.color[j] && childName.css('color',cfg.date.color[j]);
					if (x<150) {
						childName.css('right',(300-x) +'px');
					} else{
						childName.css('left',x+'px');
					}
					if (y<150) {
						childName.css('bottom',(300-y) +'px');
					} else{
						childName.css('top',y+'px');
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
		ctx.lineWidth = 1;

		var per = cfg.date.percent;
		for (var i = 0; i <= t-1; i++) {
			var x = 150 + Math.sin(rad*(i+1))*at*per[i];
			var y = 150 + Math.cos(rad*(i+1))*at*per[i];
			var nextX = 150 + Math.sin(rad*(i+2))*at*per[i+1];
			var nextY = 150 + Math.cos(rad*(i+2))*at*per[i+1];
			ctx.beginPath();
		    ctx.moveTo(x,y);
			ctx.arc(x,y,2,0,2*Math.PI);
			ctx.fill();
			ctx.lineTo(nextX,nextY)
			if(i == (t-1)){
				ctx.lineTo(150 + Math.sin(rad*(1))*at*per[0],150 + Math.cos(rad*(1))*at*per[0])
			}
			ctx.stroke();
		}
		at++;
		if (at <= 100) {
			setTimeout(radarAnimation,10);
		}
	}
	var at;
	radar.on('onLoad',function () {
		radar.show();
		at = 1;
		radarAnimation();
	});
	radar.on('onLeave',function () {
		radar.hide();
	});

	return radar;
}