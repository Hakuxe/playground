const colorCode = document.querySelector("#colorCode");
const mainBackground = document.querySelector("#colorBg");
const changeColorButton = document.querySelector("button");

const getRandomNumber = () => {
	return Math.floor(Math.random() * hex.length);
};

const colors = [
	"#0000FF",
	"#00FF00",
	"#FF0000",
	"#FFFF00",
	"#F00FF0",
	"#E1F00C",
	"#0ECC0F",
	"#FFCC0F",
	"#FF11BB",
	"#CC2909",
];

let colorSelected = "#f1f5f8";

changeColorButton.addEventListener("click", (event) => {
	colorSelected = getRandomNumber();
	colorCode.innerHTML = colorSelected;
	mainBackground.setAttribute("style", `background-color:${colorSelected}`);
});





//  MODE HEX
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const changeHexColorButton = document.querySelector("#hexButton");

changeColorButton.addEventListener("click", (event) => {
	
   let colorHex = '#';
   for (let i = 0; i < 6; i++) {
      colorHex = colorHex.concat(hex[getRandomNumber()]);
   }

   colorCode.innerHTML = colorHex;
	mainBackground.setAttribute("style", `background-color:${colorHex}`);
});

