jQuery(function() {
	@@include('check_webp_css.js')
	@@include('parallax.js')
	@@include('slick.js')
	

	jQuery("#slider-1").slick({
		centerMode: true,
		centerPadding: '490px',
		slidesToShow: 1,
		arrows: false,
		adaptiveHeight: true
	});
	jQuery("#slider-2").slick({
		centerMode: true,
		centerPadding: '490px',
		slidesToShow: 1,
		arrows: false,
		adaptiveHeight: true
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