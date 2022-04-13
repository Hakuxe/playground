import { $, divide, multiply, subtract, sum } from "./scripts/utils.js";

const inputEntry = $("#entry");
const inputCheckCalc = $("#check");
const numberButtons = $(".number", true);
const operatorButtons = $(".operator", true);
const resultButton = $("#result");

let account = [];

$(".clear").addEventListener("click", () => {
	inputEntry.value = "";
	inputCheckCalc.value = "";
	account = [];
});

function clearEntryFiled() {
	inputEntry.value = "";
}

numberButtons.forEach((button) => {
	button.addEventListener("click", () => (inputEntry.value += button.value));
});

// clicar no operador
operatorButtons.forEach((operator) => {
	operator.addEventListener("click", () => {
		// subir o que ta no input entry para o checkinput
		inputCheckCalc.value += inputEntry.value + operator.value;

		account.push(Number(inputEntry.value));
		account.push(operator.value);
		
		clearEntryFiled();
	});
});

// fazer a operação qndo clicar no igual

resultButton.addEventListener("click", () => {
	//subir o ultimo valor pro check
	inputCheckCalc.value += inputEntry.value;
	account.push(Number(inputEntry.value));

	console.log(account);
	for (let i = 0; i < account.length; i++) {
		switch (account[i]) {
			case "+":
				inputEntry.value = sum(account[i - 1], account[i + 1]);
				break;

			case "-":
				inputEntry.value = subtract(account[i - 1], account[i + 1]);
				break;

			case "*":
				inputEntry.value = multiply(account[i - 1], account[i + 1]);
				break;

			case "/":
				inputEntry.value = divide(account[i - 1], account[i + 1]);
				break;

			default:
				break;
		}
	}

	//fazer a operação
});
