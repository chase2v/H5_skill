function H5ComponentPoint(name,cfg) {
	var point = new H5ComponentBase(name,cfg);

	// for (var i = 0;i<cfg.date.name.length; i++) {
	// 	var pointParent = $('<div class="H5ComponentPoint_father" id="H5ComponentPoint_father_'+i+'">');
	// 	pointParent.css({background:cfg.date.color[i]});
	// 	if (i!=0) {			
	// 		per = cfg.date.percent[i]/cfg.date.percent[0]*100+'%'; 
	// 		leftpos = (1-cfg.date.percent[i]/cfg.date.percent[0])*cfg.css.width/2;
	// 		toppos = (1-cfg.date.percent[i]/cfg.date.percent[0])*cfg.css.height/2;
	// 		pointParent.css({left:leftpos,top:toppos}); // 子圆初始位置设置
	// 		pointParent.animate({left:cfg.position.left[i-1],top:cfg.position.top[i-1]},1000); // 子圆的位移动画
	// 		pointParent.width(per).height(per);//设置子圆的大小
	// 	}
	// 	// 动画层
	// 	var point_child = $('<div class="point_child">');
	// 	point_child.css('background',cfg.date.color[i]);
	// 	pointParent.append(point_child);
	// 	pointParent.on('click',function (event) {
	// 		$('.H5ComponentPoint_father').css('box-shadow','0 0 0');
	// 		$('.point_child').removeClass('point_child_active');
	// 		$(event.currentTarget).css('box-shadow','0 0 5px');
	// 		$(event.currentTarget).find('.point_child').addClass('point_child_active');
	// 	});

	// 	pointParent.append($('<div class="point_date"><div>' + cfg.date.name[i] + '</div><div>' + cfg.date.percent[i] + '</div></div>')); // 添加名字和百分比
	// 	point.append(pointParent);		
	// }

	point.on('onLoad',function () {
		for (var i = 0;i<cfg.date.name.length; i++) {
			var pointParent = $('<div class="H5ComponentPoint_father" id="H5ComponentPoint_father_'+i+'">');
			pointParent.css({background:cfg.date.color[i]});

			// 动画层
			var point_child = $('<div class="point_child">');
			point_child.css('background',cfg.date.color[i]);
			pointParent.append(point_child);
			pointParent.on('click',function (event) {
				$('.H5ComponentPoint_father').css('box-shadow','0 0 0');
				$('.point_child').removeClass('point_child_active');
				$(event.currentTarget).css('box-shadow','0 0 5px');
				$(event.currentTarget).find('.point_child').addClass('point_child_active');
			});

			if (i!=0) {			
				per = cfg.date.percent[i]/cfg.date.percent[0]*100+'%'; 
				leftpos = (1-cfg.date.percent[i]/cfg.date.percent[0])*cfg.css.width/2;
				toppos = (1-cfg.date.percent[i]/cfg.date.percent[0])*cfg.css.height/2;
				pointParent.css({left:leftpos,top:toppos}); // 子圆初始位置设置
				pointParent.animate({left:cfg.position.left[i-1],top:cfg.position.top[i-1]},1000); // 子圆的位移动画
				pointParent.width(per).height(per);//设置子圆的大小
			} else{
				pointParent.find('.point_child').addClass('point_child_active');
				pointParent.css('box-shadow','0 0 5px');
			}			

			pointParent.append($('<div class="point_date"><div>' + cfg.date.name[i] + '</div><div>' + cfg.date.percent[i] + '</div></div>')); // 添加名字和百分比
			point.append(pointParent);		
		}
	});
	point.on('onLeave',function () {
		point.html('');
	});

	return point;
}