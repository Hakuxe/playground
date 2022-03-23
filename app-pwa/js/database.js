export let allTransactions = get();

function get() {
	return JSON.parse(localStorage.getItem("pão-duro-app")) || [];
}

export function update(){
	allTransactions = get();
	

}

export function set(transaction) {
	//s//guarder no localstorage
	localStorage.setItem("pão-duro-app", JSON.stringify(transaction));
}


export function findItem(id) {
   update();
	try {
		const index = allTransactions.findIndex((item) => item.id === id);
		return allTransactions[index];
	} catch (error) {
		console.error(error);
	}
}

export function setItem(id, data) {
   update()
	try {
		const index = allTransactions.findIndex((item) => item.id === id);
		allTransactions[index] = data;
		set(allTransactions);
	} catch (error) {
		console.error(error);
	}
}


