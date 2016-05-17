function H5ComponentRing(name,cfg) {
	var ring = new H5ComponentBase(name,cfg);

	var draw = document.createElement('canvas');
	draw.height = 400;
	draw.width = 400;
	// draw.style.background = 'red';
	ring.append(draw);
	var ctx = draw.getContext('2d');

	function ringAnimation() {
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
		
		ctx.fillStyle = cfg.date.color;
		ctx.strokeStyle = cfg.date.color;
		ctx.beginPath();
		ctx.moveTo(200,200);
		ctx.lineTo(x,y);
		
		prePer += per;
		per = cfg.date.percent;

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

		ctx.fillStyle = '#fff';
		ctx.strokeStyle = '#fff';
		ctx.beginPath();
		ctx.arc(200,200,80,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();

		t++;
		if (t <= 100) {
			setTimeout(function () {
				ringAnimation();
			},10);
		} else{
			var childName = $('<div class="H5ComponentRing_name">' + cfg.date.name + '<br>' + per*100 + '%</div>')
			cfg.date.color && childName.css('color',cfg.date.color);
			ring.append(childName);
		}
	}

	var t;
	ring.on('onLoad',function () {
		t = 1;
		ringAnimation();
	});
	ring.on('onLeave',function () {
	});
	
	return ring;
}