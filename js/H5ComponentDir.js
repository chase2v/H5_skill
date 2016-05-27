function H5ComponentDir(name,cfg) {
	var dir = new H5ComponentBase(name,cfg);
	var dirWidth = cfg.css.width*3;
	var dirHeight = cfg.css.height*3;
	

	
	
	function drawDir () {
		var draw = document.createElement('canvas');
		draw.width = dirWidth;
		draw.height = dirHeight;
		dir.append(draw);
		var ctx = draw.getContext('2d');

		ctx.strokeStyle = 'rgb(153, 192, 255)';
		ctx.fillStyle = 'rgb(153, 192, 255)';

		var x = 50;
		var y = 50;

		ctx.beginPath();
		ctx.arc(x,y,5,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();

		var dirNum = cfg.date.length-1;

		var name = $('<div class="dir_name">此页</div>');
		name.css({left:x/3-10,top:y/3-30});
		dir.append(name);
		
		var loopTimes = 8;
		var loop = 2;

		var drawArc = function () {
			x = 50;
			y += 40;
			ctx.beginPath();
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fill();
			ctx.stroke();
			if (loop == 1) {
				setTimeout(drawArc,25);
				loop -= 1; 
			} else if(loop == 2){
				setTimeout(drawArc,25);
				loop -= 1;
			} else{
				loopTimes = 10;
				setTimeout(drawArcHor,25);
			}
		};
		var drawArcHor = function () {
			x += 40;
			ctx.beginPath();
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fill();
			ctx.stroke();
			loopTimes--;
			if (loopTimes>1) {
				setTimeout(drawArcHor,25);
			} else if(dirNum == 0){
				var name = $('<div class="dir_name" id="'+ (cfg.date.length + 2 - dirNum) +'">' + cfg.date[dirNum] + '</div>');
				name.css({left:x/3+20,top:y/3-10});
				dir.append(name);
				$('.dir_name').on('click',function (e) {
					var page = e.currentTarget.id;
					$.fn.fullpage.moveTo(page,0);
				})
			} else if(loopTimes == 1 && dirNum != 0){
				var name = $('<div class="dir_name" id="'+ (cfg.date.length + 2 - dirNum) +'">' + cfg.date[dirNum] + '</div>');
				name.css({left:x/3+20,top:y/3-10});
				dir.append(name);
				setTimeout(drawArc,25);
				loop = 2;
				dirNum -= 1;
			}
		}
		
		setTimeout(drawArc,100);
	}



	dir.on('onLoad',function () {
		drawDir();
	});
	dir.on('onLeave',function () {
		$('.H5Component_dir').html('');
	});
	

	return dir;
}