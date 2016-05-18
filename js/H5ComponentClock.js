function H5ComponentClock(name,cfg) {
	var clock = new H5ComponentBase(name,cfg);

	var draw = document.createElement('canvas');
	draw.width = 602;
	draw.height = 602;
	clock.append(draw);
	var ctx = draw.getContext('2d');

	function clockPanel() {
		// 表盘圆
		ctx.strokeStyle = '#F86060';
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.arc(300,300,300,0,2*Math.PI);
		ctx.stroke();

		// 圆心（300,300） r 300
		// x 坐标 = 300 + Math.sin(rad) * 300;
		// y 坐标 = 300 + Math.cos(rad) * 300;
		// rad = 360/60 * 2*Math.PI/360;

		// 5分钟格子
		for (var i = 1; i <= 60; i++) {
			var rad = Math.PI / 30 * i;
			var x1 = 300 + Math.sin(rad) * 285;
			var y1 = 300 + Math.cos(rad) * 285;
			var x2 = 300 + Math.sin(rad) * 300;
			var y2 = 300 + Math.cos(rad) * 300;

			ctx.strokeStyle = '#F86060';
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
		}
		// 小时格
		for (var i = 1; i <= 12; i++) {
			var rad = Math.PI / 6 * i;
			var x1 = 300 + Math.sin(rad) * 270;
			var y1 = 300 + Math.cos(rad) * 270;
			var x2 = 300 + Math.sin(rad) * 300;
			var y2 = 300 + Math.cos(rad) * 300;

			ctx.strokeStyle = '#F86060';
			ctx.lineWidth = 6
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
		}

		ctx.strokeStyle = '#F86060';
		ctx.fillStyle = '#F86060';
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(300,300,5,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();

		// ctx.strokeStyle = '#F86060';
		// ctx.lineWidth = 1;
		// ctx.beginPath();
		// ctx.moveTo(96,300);
		// ctx.lineTo(66,300);
		// ctx.stroke();

		// ctx.strokeStyle = '#F86060';
		// ctx.lineWidth = 1;
		// ctx.beginPath();
		// ctx.moveTo(300,96);
		// ctx.lineTo(300,36);
		// ctx.stroke();
	}
	// 动画
	t = 0;

	// 数字动画
	var number = $('<div class="H5ComponentClock_number">'+t+'</div>');
	clock.append(number);

	function clockAnimation() {
		ctx.clearRect(0,0,602,602);
		clockPanel();

		// 分针
		var rad = Math.PI - Math.PI / 50 * t;
		var x1 = 300 + Math.sin(rad) * 15;
		var y1 = 300 + Math.cos(rad) * 15;
		var x2 = 300 + Math.sin(rad) * 195;
		var y2 = 300 + Math.cos(rad) * 195;

		ctx.strokeStyle = '#F86060';
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();

		// 时针
		var rad = 1.5*Math.PI - Math.PI / 600 * t;
		var x1 = 300 + Math.sin(rad) * 15;
		var y1 = 300 + Math.cos(rad) * 15;
		var x2 = 300 + Math.sin(rad) * 105;
		var y2 = 300 + Math.cos(rad) * 105;

		ctx.strokeStyle = '#F86060';
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();

		// 数字动画
		number.html('学习总时长<br>超过' + t*5 + '小时');

		t++
		if (t<=300) {
			setTimeout(clockAnimation,5);
		}
	}

	clock.on('onLoad',function () {
		t = 0;
		clockAnimation();
	});
	clock.on('onLeave',function(){
		ctx.clearRect(0,0,602,602);
		clockPanel();

		ctx.strokeStyle = '#F86060';
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.moveTo(285,300);
		ctx.lineTo(195,300);
		ctx.stroke();

		ctx.strokeStyle = '#F86060';
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(300,285);
		ctx.lineTo(300,105);
		ctx.stroke();
	});

	return clock;
}