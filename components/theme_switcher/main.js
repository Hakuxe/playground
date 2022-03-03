const body = document.querySelector("body");
const button = document.querySelector(".switch-button");
const switchBox = document.querySelector(".switch-container");

button.addEventListener("click",()=>{
    // switchBox.classList.toggle("move-switch");
    button.classList.toggle("move-switch");
    body.classList.toggle("dark-theme");
})

