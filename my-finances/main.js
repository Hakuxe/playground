const UTILS = {
	formatAmount(value) {
		value = Number(value) * 100;

		return value;
	},

	formatCurrency(value) {
		const signal = Number(value) < 0 ? "-" : "";

		value = String(value).replace(/\D/g, "");

		value = Number(value) / 100;

		value = value.toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});

		return signal + value;
	},

	formatDate(date) {
		const splitedDate = date.split("-");
		return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
	},
};


// guardando informações no local storage do browser

const STORAGE = {
	get(){
		/*
			1 - localiza no local storage a chave ("dev.finances-transactions")
			2 - converte o valor em string  para json 
		*/
		return JSON.parse(localStorage.getItem("dev.finances-transactions")) || []
	},

	//guarder no localstorage
	set(transaction){
		//sempre chave e valor
		localStorage.setItem("dev.finances-transactions", JSON.stringify(transaction))
	}
};


// metodos do modal
const MODAL = {
	modal: document.querySelector(".modal-overlay"),

	toggle() {
		MODAL.modal.classList.toggle("active");
	},
};

// metodos da transaction
const TRANSACTION = {
	all: STORAGE.get(),

	add(transaction) {
		this.all.push(transaction);
		APP.reload();
	},

	remove(index) {
		this.all.splice(index, 1);
		APP.reload();
	},

	sumIncomes() {
		let totalIncome = 0;

		this.all.forEach((transaction) => {
			if (transaction.amount > 0) {
				totalIncome += transaction.amount;
			}
		});
		return totalIncome;
	},

	sumExpenses() {
		let totalExpense = 0;

		this.all.forEach((transaction) => {
			if (transaction.amount < 0) {
				totalExpense += transaction.amount;
			}
		});
		return totalExpense;
	},

	calculateTotal() {
		let total = this.sumIncomes() + this.sumExpenses();
		return total;
	},
};

const DOM = {
	transactionContainer: document.querySelector("#data-table tbody"),

	addTransaction(transaction, index) {
		const tr = document.createElement("tr");
		tr.innerHTML = DOM.innerHtmlTransaction(transaction, index);
		tr.dataset.index = index;

		this.transactionContainer.appendChild(tr);
	},

	innerHtmlTransaction(transaction, index) {
		const { description, amount, date } = transaction;

		const cssClass = amount > 0 ? "income" : "expense";

		const htmlTransaction = `
            <td class="description">${description}</td>
            <td class="${cssClass}">${UTILS.formatCurrency(amount)}</td>
            <td class="date">${date}</td>
            <td>
                <img
					onclick ="TRANSACTION.remove(${index})"
                    src="./assets/minus.svg"
                    alt="remover registro de transação"
                />
            </td>
        `;

		return htmlTransaction;
	},

	updateBalance() {
		document.getElementById("incomeDisplay").innerHTML = UTILS.formatCurrency(
			TRANSACTION.sumIncomes()
		);

		document.getElementById("expenseDisplay").innerHTML =
			UTILS.formatCurrency(TRANSACTION.sumExpenses());
		document.getElementById("totalDisplay").innerHTML = UTILS.formatCurrency(
			TRANSACTION.calculateTotal()
		);
	},

	clearTransactions() {
		DOM.transactionContainer.innerHTML = "";
	},
};

const FORM = {
	form: document.getElementById("form"),

	description: document.querySelector("input#transaction-description"),
	amount: document.querySelector("input#amount"),
	date: document.querySelector("input#date"),

	getValues() {
		return {
			description: FORM.description.value,
			amount: FORM.amount.value,
			date: FORM.date.value,
		};
	},

	clearFields() {
		this.form.reset();
	},

	validateFields() {
		const { description, amount, date } = FORM.getValues();

		if (
			description.trim() === "" ||
			amount.trim() === "" ||
			date.trim() === ""
		) {
			throw new Error("Por favor, preencha os campos em destaque");
		}
	},

	formatValues() {
		let { description, amount, date } = FORM.getValues();

		amount = UTILS.formatAmount(amount);
		date = UTILS.formatDate(date);

		// quando o nome da chave no obj é o mesmo da variável não precisa por o : ex( description:description)
		return { description, amount, date };
	},

	submit(event) {
		event.preventDefault();

		try {
			//validando os valores passados no form
			FORM.validateFields();

			//formatando para o formato correto
			const formatedTransaction = FORM.formatValues();

			//adicionar na lista de transações
			TRANSACTION.add(formatedTransaction);

			//resetar o form
			FORM.clearFields();

			//fechar modal
			MODAL.toggle();
		} catch (error) {
			alert(error.message);
		}
	},
};


const APP = {
	init() {
		TRANSACTION.all.forEach(function (transaction, index) {
			DOM.addTransaction(transaction, index);
		});

		DOM.updateBalance();

		//setando as transações no local storage
		STORAGE.set(TRANSACTION.all);
	},
	reload() {
		DOM.clearTransactions();
		APP.init();
	},
};

APP.init();
