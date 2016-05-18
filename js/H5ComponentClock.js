function H5ComponentClock(name,cfg) {
	var clock = new H5ComponentBase(name,cfg);

	var draw = document.createElement('canvas');
	draw.width = 202;
	draw.height = 202;
	clock.append(draw);
	var ctx = draw.getContext('2d');

	function clockPanel() {
		// 表盘圆
		ctx.strokeStyle = '#F86060';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(101,101,100,0,2*Math.PI);
		ctx.stroke();

		// 圆心（101,101） r 100
		// x 坐标 = 101 + Math.sin(rad) * 100;
		// y 坐标 = 101 + Math.cos(rad) * 100;
		// rad = 360/60 * 2*Math.PI/360;

		// 5分钟格子
		for (var i = 1; i <= 60; i++) {
			var rad = Math.PI / 30 * i;
			var x1 = 101 + Math.sin(rad) * 95;
			var y1 = 101 + Math.cos(rad) * 95;
			var x2 = 101 + Math.sin(rad) * 100;
			var y2 = 101 + Math.cos(rad) * 100;

			ctx.strokeStyle = '#F86060';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
		}
		// 小时格
		for (var i = 1; i <= 12; i++) {
			var rad = Math.PI / 6 * i;
			var x1 = 101 + Math.sin(rad) * 90;
			var y1 = 101 + Math.cos(rad) * 90;
			var x2 = 101 + Math.sin(rad) * 100;
			var y2 = 101 + Math.cos(rad) * 100;

			ctx.strokeStyle = '#F86060';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
		}

		ctx.strokeStyle = '#F86060';
		ctx.fillStyle = '#F86060';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(101,101,5,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();

		// ctx.strokeStyle = '#F86060';
		// ctx.lineWidth = 1;
		// ctx.beginPath();
		// ctx.moveTo(96,101);
		// ctx.lineTo(66,101);
		// ctx.stroke();

		// ctx.strokeStyle = '#F86060';
		// ctx.lineWidth = 1;
		// ctx.beginPath();
		// ctx.moveTo(101,96);
		// ctx.lineTo(101,36);
		// ctx.stroke();
	}
	// 动画
	t = 0;

	// 数字动画
	var number = $('<div class="H5ComponentClock_number">'+t+'</div>');
	clock.append(number);

	function clockAnimation() {
		ctx.clearRect(0,0,202,202);
		clockPanel();

		// 分针
		var rad = Math.PI - Math.PI / 50 * t;
		var x1 = 101 + Math.sin(rad) * 5;
		var y1 = 101 + Math.cos(rad) * 5;
		var x2 = 101 + Math.sin(rad) * 65;
		var y2 = 101 + Math.cos(rad) * 65;

		ctx.strokeStyle = '#F86060';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();

		// 时针
		var rad = 1.5*Math.PI - Math.PI / 600 * t;
		var x1 = 101 + Math.sin(rad) * 5;
		var y1 = 101 + Math.cos(rad) * 5;
		var x2 = 101 + Math.sin(rad) * 35;
		var y2 = 101 + Math.cos(rad) * 35;

		ctx.strokeStyle = '#F86060';
		ctx.lineWidth = 2;
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
		ctx.clearRect(0,0,202,202);
		clockPanel();

		ctx.strokeStyle = '#F86060';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(96,101);
		ctx.lineTo(66,101);
		ctx.stroke();

		ctx.strokeStyle = '#F86060';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(101,96);
		ctx.lineTo(101,36);
		ctx.stroke();
	});

	return clock;
}