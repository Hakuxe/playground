import { addTransaction, updateTransactions } from "./transactions.js";
import { formatDate, getMonthFormated} from "./utils.js";
import { toggle, updateMode } from "./modal.js";
import { findItem } from "./database.js";

const form = document.getElementById("form-transaction");

let id = '';
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const date = document.getElementById("date");

const type = document.querySelectorAll('input[name="type"]');


export function getValues() {
	let selectedRadio = "";

	type.forEach((item) => {
		if (item.checked) {
			selectedRadio = item.value;
		}
	});

	return {
		description: description.value,
		amount: amount.value,
		date: date.value,
		type: selectedRadio,
	};
}

export function setValues(transaction) {
	
	id = transaction.id
	description.value = transaction.description;
	amount.value = transaction.amount;
	date.value = transaction.date;

	type.forEach((item) => {
		if (item.value === transaction.type) {
			item.checked =true;
		}
	});

}

function validateFields() {
	const { description, amount, date, type } = getValues();

	if (
		description.trim() === "" ||
		amount.trim() === "" ||
		date.trim() === "" ||
		type.trim() === ""
	) {
		throw new Error("Por favor, preencha os campos em destaque");
	}
}

function formatValues() {
	let { description, amount, date, type } = getValues();
	const month = { monthName: getMonthFormated(date, "long"), monthNumber: Number(getMonthFormated(date, "numeric"))}

	amount = Number(amount);
	date = formatDate(date);

	// quando o nome da chave no obj é o mesmo da variável não precisa por o : ex( description:description)
	return { description, amount, date, type, month };
}

export function clearFields() {
	form.reset();
}

function submit(event) {
	event.preventDefault();

	try {
		validateFields();

		//formatando para o formato correto
		const formatedTransaction = formatValues();

		if (event.target.action.includes("/update")) {
			// atualizar no localstorage
			updateTransactions({...formatedTransaction, id});
		} else {
			//adicionar na lista de transações
			addTransaction(formatedTransaction);
		}

		//resetar o form
		clearFields();
		toggle();
	} catch (error) {
		alert(error.message);
	}
}

export function updateForm(id) {
	// abrir o form
	updateMode();
	// buscar no lS (localStorage) os dados da transação
	const itemToUpdate = findItem(id);

	// preencher form
	setValues(itemToUpdate);
}

form.onsubmit = (event) => submit(event);
