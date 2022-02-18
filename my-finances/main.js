const UTIlS ={
    formatCurrency(value){

        const signal = Number(value) < 0 ? '-': '';


        value = String(value).replace(/\D/g, '');

        value = Number(value) / 100;

       
        value = value.toLocaleString('pt-BR', {style: 'currency', currency:"BRL" });

        return (signal + value);
    }
}

// metodos do modal
const MODAL = {
	modal: document.querySelector(".modal-overlay"),

	toggle() {
		MODAL.modal.classList.toggle("active");
	},
};

// metodos da transaction
const TRANSACTION = {
	sumIncomes() {},
	sumExpenses() {},
	calculateTotal() {},
};

let transactions = [
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
		description: 'Salário',
		amount: 250000,
		date: "01/02/2021",
	},
];

const DOM = {
	transactionContainer: document.querySelector("#data-table tbody"),

	addTransaction(transaction, index) {
		const tr = document.createElement("tr");
		tr.innerHTML = DOM.innerHtmlTransaction(transaction);

		this.transactionContainer.appendChild(tr);
	},

	innerHtmlTransaction(transaction) {
		const { description, amount, date } = transaction;

        const cssClass = amount > 0? 'income':'expense'

		const htmlTransaction = `
            <td class="description">${description}</td>
            <td class="${cssClass}">${UTIlS.formatCurrency(amount)}</td>
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
};


transactions.forEach(function(transaction){
    DOM.addTransaction(transaction);
})
