function H5ComponentPie(name,cfg) {
	var pie = new H5ComponentBase(name,cfg);
	var pieWidth = cfg.css.width*3;
	var pieHeight = cfg.css.height*3;
	var r = pieWidth/2;

	var draw = document.createElement('canvas');
	draw.height = pieHeight;
	draw.width = pieWidth;
	pie.append(draw);
	var ctx = draw.getContext('2d');

	function pieAnimation() {
		ctx.clearRect(0,0,pieWidth,pieHeight);

		ctx.strokeWidth = 3;
		ctx.strokeStyle = '#ccc';

		// 圆心（200,200） r 100
		// x 坐标 = a + Math.sin(rad) * r;
		// y 坐标 = b + Math.cos(rad) * r;
		// rad = 360/cfg.date.name.length * 2*Math.PI/360 * ?
		var per = 0;
		var prePer = 0;
		var rad;
		var x = r;
		var y = 0;
		var preCircleRad;
		var circleRad = -0.5 * Math.PI;
		for(var i = 0; i < cfg.date.name.length; i++){
			ctx.fillStyle = cfg.date.color[i];
			ctx.strokeStyle = cfg.date.color[i];
			ctx.beginPath();
			ctx.moveTo(r,r);
			ctx.lineTo(x,y);
			
			prePer += per;
			per = cfg.date.percent[i];

			// 2p(1-(per+pre+1/2))
			// 停点计算
			rad = 2*Math.PI - (2*Math.PI * per + Math.PI + prePer * 2*Math.PI);
			x = r + Math.sin(rad) * r;
			y = r + Math.cos(rad) * r;

			// 画弧线
			preCircleRad = circleRad;
			circleRad = per * 2*Math.PI + preCircleRad;
			ctx.arc(r,r,r,preCircleRad,circleRad);

			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			// 添加名称，百分比
			// 位置为每段弧线的中间位置
			// 则 per = 1/2 per; 即 rad += per*Math.PI
			if (t==100) {
				var midX = r + Math.sin(rad+per*Math.PI) * r;
				var midY = r + Math.cos(rad+per*Math.PI) * r;

				var lineX = midX + Math.sin(rad+per*Math.PI) * 90;
				var lineY = midY + Math.cos(rad+per*Math.PI) * 90;
				// ctx.strokeWidth = 9;
				// ctx.strokeStyle = '#000';
				// ctx.beginPath();
				// ctx.moveTo(midX,midY);
				// ctx.lineTo(lineX,lineY);
				// ctx.stroke();

				var childName = $('<div class="H5ComponentPie_name">' + cfg.date.name[i] + '<br>' + per*100 + '%</div>');
				cfg.date.color[i] && childName.css('color',cfg.date.color[i]);
				if (midX<(cfg.css.width/2)) {
					childName.css({right:(cfg.css.width-lineX/3)});
				} else{
					childName.css('left',(lineX/3)+'px');
				}
				if (midY<(cfg.css.height/2)) {
					childName.css('bottom',(cfg.css.height-lineY/3) +'px');
				} else if(midY == (cfg.css.height/2)){
					childName.css('top',(lineY/3-15)+'px');
				}else{
					childName.css('top',lineY/3+'px');
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
		ctx.moveTo(r,r);
		ctx.lineTo(r,0);
		ctx.arc(r,r,r,-0.5*Math.PI,2*Math.PI/100*t-0.5*Math.PI,true);
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