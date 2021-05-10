jQuery(function() {
	@@include('check_webp_css.js')
	@@include('parallax.js')
	@@include('slick.js')
	@@include('modals-plug.js')
	

	jQuery("#slider-1").slick({
		centerMode: true,
		centerPadding: '490px',
		slidesToShow: 1,
		arrows: false,
		responsive: [
			{
				breakpoint: 1920,
				settings: {
				centerMode: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			  	}
			}
		  ]
	});
	jQuery("#slider-2").slick({
		centerMode: true,
		centerPadding: '490px',
		slidesToShow: 1,
		arrows: false,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 1920,
				settings: {
				centerMode: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			  	}
			}
		  ]
	});
	jQuery("#slider-3").slick({
		slidesToShow: 1,
		arrows: false,
		adaptiveHeight: true,
		dots: true
	});
	jQuery("#slider-4").slick({
		slidesToShow: 1,
		arrows: false,
		adaptiveHeight: true,
		dots: true
	});
	jQuery("#slider-5").slick({
		slidesToShow: 1,
		arrows: true,
		dots: true
	});
});