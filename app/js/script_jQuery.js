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
});