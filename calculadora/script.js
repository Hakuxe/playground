import {
	$,
	compute,
	divide,
	multiply,
	subtract,
	sum,
} from "./scripts/utils.js";

const inputEntry = $("#entry");
const inputCheckCalc = $("#check");
const numberButtons = $(".number", true);
const operatorButtons = $(".operator", true);
const resultButton = $("#result");

let result = 0;
let firstNumber = 0;
let secondNumber = 0;
let mainOperator = "";

$(".clear").addEventListener("click", () => {
	inputEntry.value = "";
	inputCheckCalc.value = "";
	firstNumber = 0;
	secondNumber = 0;
	result = 0;
});

function clearEntryFiled() {
	inputEntry.value = "";
}

function clearCheckFiled() {
	inputCheckCalc.value = "";
}

function updateCheckFildAndMainOperaor(result, operator) {
	clearCheckFiled();
	inputCheckCalc.value += result + operator;
	mainOperator = operator;
}

numberButtons.forEach((button) => {
	button.addEventListener("click", () => (inputEntry.value += button.value));
});

// clicar no operador
operatorButtons.forEach((operator) => {
	operator.addEventListener("click", () => {
		if (firstNumber === 0) {
			// subir o que ta no input entry para o checkinput
		
			updateCheckFildAndMainOperaor(inputEntry.value, operator.value);
			firstNumber = Number(inputEntry.value);

		} else {
			switch (mainOperator) {
				case "+":
					if (result != 0) firstNumber = result;

					result = sum(firstNumber, Number(inputEntry.value));
					updateCheckFildAndMainOperaor(result, operator.value);
					break;

				case "-":
					if (result != 0) firstNumber = result;

					result = subtract(firstNumber, Number(inputEntry.value));
					updateCheckFildAndMainOperaor(result, operator.value);
					break;

				case "*":
					if (result != 0) firstNumber = result;

					result = multiply(firstNumber, Number(inputEntry.value));
					updateCheckFildAndMainOperaor(result, operator.value);
					break;

				case "/":
					if (result != 0) firstNumber = result;

					result = divide(firstNumber, Number(inputEntry.value));
					updateCheckFildAndMainOperaor(result, operator.value);
					break;

				default:
					break;
			}
		}

		clearEntryFiled();
	});
});

// fazer a operação qndo clicar no igual

resultButton.addEventListener("click", () => {
	//subir o ultimo valor pro check
	inputCheckCalc.value += inputEntry.value;

	secondNumber = Number(inputEntry.value);

	if (result === 0) {
		result = compute(firstNumber, secondNumber, mainOperator);
		inputEntry.value = result;

		firstNumber = 0;
		secondNumber = 0;
	} else {
		result = compute(result, secondNumber, mainOperator);
		inputEntry.value = result;

		firstNumber = 0;
		secondNumber = 0;
	}
	console.log({ firstNumber, secondNumber, result, mainOperator });
});
