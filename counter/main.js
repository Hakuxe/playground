const btnDecrease = document.querySelector('#decrease');
const btnIncrease = document.querySelector('#increase');
const btnReset = document.querySelector('#reset');

let counter = 1;
const number = document.querySelector('#containerCounterNumber')



btnReset.addEventListener('click', () =>{
   counter = 0
   changeInnerHtml(counter);
   checkPositive();
})

btnDecrease.addEventListener('click', () =>{
   counter -= 1;
   changeInnerHtml(counter);
   checkPositive();
})

btnIncrease.addEventListener('click', () =>{
   counter += 1;
   changeInnerHtml(counter);
   checkPositive();
})


const changeInnerHtml = (text) =>{
   number.innerHTML = text;
}

const checkPositive = () =>{
   if(counter === 0){
      number.setAttribute('style', 'color:black;');
      return;
   }
   
   if(counter > 0){
      number.setAttribute('style', 'color:green;');
   }else{
      number.setAttribute('style', 'color:red;');
   }
   
}