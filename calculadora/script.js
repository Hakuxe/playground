import { $ } from "./scripts/utils.js";

const inputEntry = $("#entry");
const inputCheckCalc = $("#check");
const numberButtons = $(".number", true);
const operatorButtons = $(".operator", true);

$(".clear").addEventListener("click", () => {
	inputEntry.value = "";
	inputCheckCalc.value = "";
});

numberButtons.forEach((button) => {
	button.addEventListener("click", () => (inputEntry.value += button.value));
});

// clicar no operador
operatorButtons.forEach((operator) => {
	operator.addEventListener("click", () => {
		console.log("click", operator.value);
		// subir o que ta no input entry para o checkinput
		inputCheckCalc.value += inputEntry.value + operator.value;
		inputEntry.value = "";
	});
});

// fazer a operação qndo clicar no igual 
