 // Modal
 $("[data-modal]").on("click", function(event) {
	event.preventDefault();
	let modalID = $(this).data("modal");
	$(modalID).addClass("show");
	$("body").addClass("no-scroll");

}); 

$("[data-close]").on("click", function(event) {
	event.preventDefault();
	let modalParent = $(this).parents(".modal-plug");
	modalParent.removeClass("show");
	$("body").removeClass("no-scroll");
}); 

$(".modal-plug").on("click", function(event) {
	$(this).removeClass("show");
	$("body").removeClass("no-scroll");
});

$(".modal-plug__dialog").on("click", function(event) {
	event.stopPropagation()
});