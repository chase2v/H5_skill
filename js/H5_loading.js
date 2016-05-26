var H5_loading = function (images) {
	var id = this.id;

	if (this._images === undefined) {
		this._images = (images || []).length;
		this._loaded = 0;

		window[id] = this;

		for(x in images){
			var image = images[x];
			var img = new Image();
			img.src = image;
			img.onload = function () {
				window[id].loader();
			}
		}

		$('#loading_text').text('0%');

		return this;
	} else {
		this._loaded ++ ;
		$('#loading_text').text(((this._loaded / this._images * 100) >> 0) + '%');
		if(this._loaded < this._images){
			return this;
		}
	}
	// debugger
	window[id] = null;

	this.fullpage.fullpage({
		onLeave: function(index, nextIndex, direction){
			$(this).find('.H5Component').trigger('onLeave');
		},
		afterLoad : function(anchorLink, index){
			$(this).find('.H5Component').trigger('onLoad');
		}
	});
	this.fullpage.show();
	this.page[0].find('.H5Component').trigger('onLoad');
	// $.fn.fullpage.moveTo(8, 0);

	// return this;
}