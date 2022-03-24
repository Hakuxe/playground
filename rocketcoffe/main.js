// jquery

const burgerMenu = $("#burgerMenu");

burgerMenu.on("click", function () {
	$("#burgerMenu").hide();
	$("#burgerMenuClose").show();
	$(".menu").show();
	$("header").addClass('menuOpen')
});


$("#burgerMenuClose").on('click', ()=>{
	$("#burgerMenu").show();
	$("#burgerMenuClose").hide();
	$(".menu").hide();
	$("header").removeClass('menuOpen')
})