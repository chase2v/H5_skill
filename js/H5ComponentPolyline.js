function H5ComponentPolyline(name,cfg) {
	var polyline = new H5ComponentBase(name,cfg);
	var polyWidth = cfg.css.width*3;
	var polyHeight = cfg.css.height*3;

	var draw = document.createElement('canvas');
	draw.width = polyWidth;
	draw.height = polyHeight;
	polyline.append(draw);
	var ctx = draw.getContext('2d');

	function polylineAnimation() {
		ctx.clearRect(0,0,polyWidth,polyHeight);

		// 画方格线
		var verNum = 10;
		var horNum = cfg.date.name.length+1;
		var gridWidth = polyWidth/horNum;

		ctx.strokeStyle = '#ccc';
		ctx.lineWidth = 3;
		ctx.beginPath();
		for(var i = 0; i <= verNum; i++) {
			ctx.moveTo(0,polyHeight/verNum*i);
			ctx.lineTo(polyWidth,polyHeight/verNum*i);
		}
		for(var i = 0; i <= horNum; i++){
			ctx.moveTo(gridWidth*i,0);
			ctx.lineTo(gridWidth*i,polyHeight);
		}
		ctx.stroke();

		// 画曲线
		ctx.strokeStyle = '#ff7676';
		ctx.fillStyle = 'rgba(256,112,112,.3)';
		ctx.beginPath();
		ctx.moveTo(gridWidth,(1-(cfg.date.percent[0]/100*times))*polyHeight);
		for(var i = 0; i < 5; i++){
			var x = (gridWidth*(i+1));
			var y = (1-(cfg.date.percent[i]/100*times))*polyHeight;
			ctx.lineTo(x,y);
			ctx.arc(x,y,3,0,2*Math.PI);

			// 添加项目名称
			if(times == 100){
				var perNum = $('<div class="H5ComponentPolyline_per">' + cfg.date.percent[i]*100 + '%</div>');
				perNum.css({bottom:(polyHeight+15-y)/3+'px',left:(x-15)/3+'px'});
				cfg.date.color[i] && perNum.css('color',cfg.date.color[i]);
				polyline.append(perNum);
				setTimeout(function (i) {
					return function(){
						polyline.append($('<div class="H5ComponentPolyline_name">' + cfg.date.name[i] + '</div>'))
					}
				}(i),100*(i+1));					
			}			
		}
		ctx.stroke();
		ctx.strokeStyle = '#ccc';
		ctx.lineTo(polyWidth-gridWidth,polyHeight);
		ctx.lineTo(gridWidth,polyHeight);
		ctx.fill();
		times++;
		if(times<=100){
			setTimeout(polylineAnimation,10);
		}
	}
	var times;
	polyline.on('onLoad',function () {
		polyline.show();
		times = 1;
		polylineAnimation();
	});
	polyline.on('onLeave',function () {
		polyline.hide();
	});

	return polyline;
}