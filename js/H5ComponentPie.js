function H5ComponentPie(name,cfg) {
	var pie = new H5ComponentBase(name,cfg);

	var draw = document.createElement('canvas');
	draw.height = 400;
	draw.width = 400;
	// draw.style.background = 'red';
	pie.append(draw);
	var ctx = draw.getContext('2d');

	function pieAnimation() {
		ctx.clearRect(0,0,400,400);
		ctx.strokeWidth = 1;
		ctx.strokeStyle = '#ccc';

		ctx.fillStyle = '#ccc';
		ctx.beginPath();
		ctx.arc(200,200,100,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();

		// 圆心（200,200） r 100
		// x 坐标 = a + Math.sin(rad) * r;
		// y 坐标 = b + Math.cos(rad) * r;
		// rad = 360/cfg.date.name.length * 2*Math.PI/360 * ?
		var per = 0;
		var prePer = 0;
		var rad;
		var x = 200;
		var y = 100;
		var preCircleRad;
		var circleRad = -0.5 * Math.PI;
		for(var i = 0; i < cfg.date.name.length; i++){
			ctx.fillStyle = cfg.date.color[i];
			ctx.strokeStyle = cfg.date.color[i];
			ctx.beginPath();
			ctx.moveTo(200,200);
			ctx.lineTo(x,y);
			
			prePer += per;
			per = cfg.date.percent[i];

			// 2p(1-(per+pre+1/2))
			// 停点计算
			rad = 2*Math.PI - (2*Math.PI * per + Math.PI + prePer * 2*Math.PI);
			x = 200 + Math.sin(rad) * 100;
			y = 200 + Math.cos(rad) * 100;

			// 画弧线
			preCircleRad = circleRad;
			circleRad = per * 2*Math.PI + preCircleRad;
			ctx.arc(200,200,100,preCircleRad,circleRad);

			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			// 添加名称，百分比
			// 位置为每段弧线的中间位置
			// 则 per = 1/2 per; 即 rad += per*Math.PI
			if (t==100) {
				var midX = 200 + Math.sin(rad+per*Math.PI) * 100;
				var midY = 200 + Math.cos(rad+per*Math.PI) * 100;

				var lineX = midX + Math.sin(rad+per*Math.PI) * 30;
				var lineY = midY + Math.cos(rad+per*Math.PI) * 30;
				ctx.strokeStyle = '#ccc';
				ctx.beginPath();
				ctx.moveTo(midX,midY);
				ctx.lineTo(lineX,lineY);
				ctx.stroke();

				var childName = $('<div class="H5ComponentPie_name">' + cfg.date.name[i] + '<br>' + per*100 + '%</div>');
				cfg.date.color[i] && childName.css('color',cfg.date.color[i]);
				if (midX<200) {
					childName.css({right:(400-lineX)});
				} else{
					childName.css('left',(lineX)+'px');
				}
				if (midY<200) {
					childName.css('bottom',(400-lineY) +'px');
				} else if(midY == 200){
					childName.css('top',(lineY-15)+'px');
				}else{
					childName.css('top',lineY+'px');
				}
				setTimeout(function (childName) {
					return function () {
						pie.append(childName);
					}					
				}(childName),100*i);					
			}
		}

		// 动画遮罩层
		ctx.fillStyle = '#ccc';
		ctx.strokeStyle = '#ccc';
		ctx.beginPath();
		ctx.moveTo(200,200);
		ctx.lineTo(200,100);
		ctx.arc(200,200,100,-0.5*Math.PI,2*Math.PI/100*t-0.5*Math.PI,true);
		if (t != 100) {
			ctx.closePath();
			ctx.fill();	
			ctx.stroke();
		}		

		t++;
		if (t <= 100) {
			setTimeout(function () {
				pieAnimation();
			},10);
		}
	}

	var t;
	pie.on('onLoad',function () {
		// pie.show();
		t = 1;
		pieAnimation();
	});
	pie.on('onLeave',function () {
		// pie.hide();
	});
	
	return pie;
}