// jquery

const burgerMenu = $("#burgerMenu");

burgerMenu.on("click", function () {
	$("#burgerMenu").hide();
	$("#burgerMenuClose").show();
});


$("#burgerMenuClose").on('click', ()=>{
   $("#burgerMenu").show();
	$("#burgerMenuClose").hide();
})