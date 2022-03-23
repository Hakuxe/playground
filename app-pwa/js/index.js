import "./modal.js";
import "./formTransaction.js";
import { formatToCurrency, $ } from "./utils.js";
import {
	loadTransactions,
	calculateLeftover,
	sumExpensesAndIncomes,
} from "./transactions.js";


// TODO: testar mais


export const updateBalance = () => {
	const balance = sumExpensesAndIncomes();

	$("#expense-balance").innerText = "- " + formatToCurrency(balance.totalExpenses);
	$("#income-balance").innerText = formatToCurrency(balance.totalIncomes);
	$("#total").innerText = formatToCurrency(calculateLeftover());
};

onload = () => {
	loadTransactions();
};

//registrando o service worker na aplicação
navigator.serviceWorker.register('./paoDuroAppServiceWorker.js');