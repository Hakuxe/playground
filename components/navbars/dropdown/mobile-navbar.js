const navList = document.querySelector(".nav-list");
const mobileMenu = document.querySelector(".mobile-menu");

mobileMenu.addEventListener("click", () => {
	navList.classList.toggle("active");
   mobileMenu.classList.toggle("active");
});
