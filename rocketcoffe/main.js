// jquery

const burgerMenu = $("#burgerMenu");

burgerMenu.on("click", function () {
	$("#burgerMenu").hide();
	$("#burgerMenuClose").show();
	$(".menu").removeClass("hidden");
	$("header").addClass('menuOpen')
});


$("#burgerMenuClose").on('click', ()=>{
	$("#burgerMenu").show();
	$("#burgerMenuClose").hide();
	$(".menu").addClass("hidden");
	$("header").removeClass('menuOpen')
})