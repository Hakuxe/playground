import { updateBalance } from "./index.js";
import { formatToCurrency, createElement, generateId, $ } from "./utils.js";
import { set, setItem, update, allTransactions } from "./database.js";
import { updateForm } from "./formTransaction.js";

const table = $("#data-table tbody");

export function addTransaction(transaction) {
	update();

	allTransactions.push({ ...transaction, id: generateId() });
	set(allTransactions);

	appendChildInTable(
		mountHtmlTransaction(allTransactions[allTransactions.length - 1])
	);

	updateBalance();

	reloadTransactions();
}

export function removeTransaction(id) {
	const removeItem = allTransactions.findIndex((item) => item.id === id);

	allTransactions.splice(removeItem, 1);
	set(allTransactions);

	reloadTransactions();
}

export function updateTransactions(transaction) {
	setItem(transaction.id, transaction);

	reloadTransactions();
}

export function sumExpensesAndIncomes() {
	let totalIncomes = 0;
	let totalExpenses = 0;

	allTransactions.forEach((item) => {
		if (item.type === "income") {
			totalIncomes += item.amount;
		}

		if (item.type === "expense") {
			totalExpenses += item.amount;
		}
	});

	return { totalIncomes, totalExpenses };
}

export function calculateLeftover() {
	const { totalExpenses, totalIncomes } = sumExpensesAndIncomes();

	return (totalIncomes - totalExpenses).toFixed(2);
}



function appendChildInTable(element) {
	table.appendChild(element);
}

function mountHtmlTransaction(transaction) {
	let { type } = transaction;

	const isExprense = type === "expense" ? "expense" : "income";

	let tr = createElement(
		"tr",
		createTdTransacion(transaction),
		`transaction,${isExprense}`
	);

	let btnChange = tr.querySelector(".btn-change");
	btnChange.onclick = (event) =>
		updateForm(event.target.getAttribute("data-id"));

	let btnDelete = tr.querySelector(".btn-delete");
	btnDelete.onclick = (event) =>
		removeTransaction(event.target.getAttribute("data-id"));

	return tr;
}

function createTdTransacion(transaction) {
	let { id, description, amount, type, date } = transaction;

	let signal = type === "expense" ? "-" : "";

	const htmlTransaction = `
         <td>${description}</td>
         <td>${signal}${formatToCurrency(amount)}</td>
         <td class="btn-change">
            <img
					data-id="${id}"
               src="./assets/edit.svg"
               alt="remover registro de transação"
            />
         </td>
			<td class="btn-delete">
            <img
					data-id="${id}"
               src="./assets/delete.svg"
               alt="remover registro de transação"
            />
         </td>
   `;

	return htmlTransaction;
}

function reloadTransactions() {
	table.innerHTML = "";
	loadTransactions();
}

function createSeparator(bach) {
	let separatorTr = createElement("tr", "");
	const monthName = bach[0].month.monthName;
	const separator = createElement("td", `${monthName}`, "date-separator");

	separator.setAttribute("colspan", "3");
	separatorTr.appendChild(separator);

	return separatorTr;
}

function orderTransactions() {
	let countMonth = 12;

	for (let i = 12; i > 0; i--) {
		let bach = allTransactions.filter((item) => item.month.monthNumber === countMonth);

		if (bach.length > 0) {
			let separatorTr = createSeparator(bach);

			appendChildInTable(separatorTr);

			bach.forEach((item, index) => {
				let tr = mountHtmlTransaction(item, index);

				appendChildInTable(tr);
			});
		}

		countMonth--;
	}
}

export function loadTransactions() {
	update();

	// FIXME: como fazer a separação dos anos ?
	
	orderTransactions();

	/* sem ordenação
	 	allTransactions.forEach((item, index) => {
			let tr = mountHtmlTransaction(item, index);
	 		appendChildInTable(tr);
	 	});
	*/

	updateBalance();

	set(allTransactions);
}
