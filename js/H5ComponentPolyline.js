function H5ComponentPolyline(name,cfg) {
	var polyline = new H5ComponentBase(name,cfg);

	var draw = document.createElement('canvas');
	polyline.append(draw);
	var ctx = draw.getContext('2d');

	function polylineAnimation() {
		ctx.clearRect(0,0,300,150);

		// 画方格线
		ctx.strokeStyle = '#ccc';
		ctx.lineWidth = 1;
		ctx.beginPath();
		for(var i = 0; i <= 10; i++) {
			ctx.moveTo(0,15*i);
			ctx.lineTo(300,15*i);
		}
		for(var i = 0; i <= 6; i++){
			ctx.moveTo(50*i,0);
			ctx.lineTo(50*i,150);
		}
		ctx.stroke();

		// 画曲线
		ctx.strokeStyle = '#ff7676';
		ctx.fillStyle = 'rgba(256,112,112,.3)';
		ctx.beginPath();
		ctx.moveTo(50,(1-(cfg.date.percent[0]/100*times))*150);
		for(var i = 0; i < 5; i++){
			var x = (50*(i+1));
			var y = (1-(cfg.date.percent[i]/100*times))*150;
			ctx.lineTo(x,y);
			ctx.arc(x,y,3,0,2*Math.PI);

			// 添加项目名称
			if(times == 100){
				var perNum = $('<div class="H5ComponentPolyline_per">' + cfg.date.percent[i]*100 + '%</div>');
				perNum.css({bottom:(155-y)+'px',left:(x-5)+'px'});
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
		ctx.lineTo(250,150);
		ctx.lineTo(50,150);
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