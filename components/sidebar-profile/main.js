const menuButton = document.getElementById('btn-open-menu');
const sidebar = document.querySelector('.sidebar');


menuButton.addEventListener('click', ()=>{
   sidebar.classList.toggle('open')
})