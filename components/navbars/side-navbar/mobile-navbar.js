const navList = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");

const classActive = "active";


mobileMenu.addEventListener('click', ()=>{
   navList.classList.toggle(classActive);

   mobileMenu.classList.toggle(classActive);
   
})
