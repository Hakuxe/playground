const UTILS = {
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
	all: [
		{
			id: 1,
			description: "Luz",
			amount: -34000,
			date: "01/02/2021",
		},
		{
			id: 2,
			description: "Internet",
			amount: -11000,
			date: "01/02/2021",
		},
		{
			id: 3,
			description: "Salário",
			amount: 250000,
			date: "01/02/2021",
		},
	],

	add(transaction){
		this.all.push(transaction);
		APP.reload();
	},

	remove(index){
		this.all.splice(index, 1);
		APP.reload();
	},


	sumIncomes() {
		let totalIncome = 0;

		this.all.forEach(transaction =>{
			if(transaction.amount > 0){
				totalIncome += transaction.amount;
			}
		});
		return (totalIncome);
	},

	sumExpenses() {
		let totalExpense = 0;

		this.all.forEach(transaction =>{
			if(transaction.amount < 0){
				totalExpense += transaction.amount;
			}
		});
		return (totalExpense);
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
		tr.innerHTML = DOM.innerHtmlTransaction(transaction);

		this.transactionContainer.appendChild(tr);
	},

	innerHtmlTransaction(transaction) {
		const { description, amount, date } = transaction;

		const cssClass = amount > 0 ? "income" : "expense";

		const htmlTransaction = `
            <td class="description">${description}</td>
            <td class="${cssClass}">${UTILS.formatCurrency(amount)}</td>
            <td class="date">${date}</td>
            <td>
                <img
                    src="./assets/minus.svg"
                    alt="remover registro de transação"
                />
            </td>
        `;

		return htmlTransaction;
	},

	updateBalance() {
		document
			.getElementById("incomeDisplay")
			.innerHTML = UTILS.formatCurrency(TRANSACTION.sumIncomes());

		document
			.getElementById("expenseDisplay")
			.innerHTML = UTILS.formatCurrency(TRANSACTION.sumExpenses());
		document
			.getElementById("totalDisplay")
			.innerHTML = UTILS.formatCurrency(TRANSACTION.calculateTotal());
	},

	clearTransactions(){
		DOM.transactionContainer.innerHTML ="";
	}
};

const FORM ={

	description: document.querySelector('input#transaction-description'),
	amount: document.querySelector('input#amount'),
	date: document.querySelector('input#date'),

	getValues(){
		return({
			description: FORM.description.value,
			amount 	: FORM.amount.value, 	
			date 	:  FORM.date.value,
		});
	},

	validateFields(){
		console.log(FORM.getValues())
		const {description, amount, date} = FORM.getValues();

		if(description.trim() ==="" || amount.trim() ==="" || date.trim()===""){
			throw new Error("Por favor, preencha os campos em destaque")
		}
	},
	
	submit(event){
		event.preventDefault();

		try {
			FORM.validateFields();
		} catch (error) {
			alert(error.message);
		}
	}
}

const APP ={
	init(){
		TRANSACTION.all.forEach(function (transaction) {
			DOM.addTransaction(transaction);
		});
		
		
		DOM.updateBalance();
	},
	reload(){	
		DOM.clearTransactions();
		APP.init();
	}
}

APP.init();

