export function $(element) {
	return document.querySelector(element);
}


/**
 * @param {String} tag -  tag html 
 * @param {String} content - conteúdo da tag
 * @param {String=} elementClass - classes separadas por , (vírgula) 
 * @returns { HTMLElement }
 */
export function createElement(tag, content, elementClass) {
	let element = document.createElement(tag);
	element.innerHTML = content;

	if (elementClass) {
		const multipleClasses = elementClass.split(",");

		if (multipleClasses.length === 1) {
			element.classList.add(elementClass);
		} else {
			multipleClasses.forEach((itemClass) => {
				element.classList.add(itemClass);
			});
		}
	}

	return element;
}


/**
 * @param {Number} value - valor a ser formatado 
 * @returns { String } - valor formatado em BRL currency
 */
export function formatToCurrency(value) {
	const valueFormated = new Intl.NumberFormat(`pt-BR`, {
		currency: `BRL`,
		style: "currency",
	}).format(value);
	
	return valueFormated;
}


/**
 * @param {String} date 
 * @returns { String } - Data no formato YYYY-MM-DD
 */
export function formatDate(date) {
	const splitedDate = date.split("-");

	let newDate = new Date(splitedDate[0], splitedDate[1], splitedDate[2]);

	let day = newDate.getDate().toString().padStart(2, "0");
	let month = newDate.getMonth().toString().padStart(2, "0");
	let year = newDate.getFullYear();

	// let formatedDate = `${day}-${month}-${year}`;
	let formatedDate = `${year}-${month}-${day}`;

	return formatedDate;
}


/**
 * @param {String} date
 * @param {String} style - em qual formato mẽs deve ser retornado ("long", "numeric", "short")
 * @returns { String } - mẽs no formato requisitado
 */
export function getMonthFormated(date, style) {
	const splitedDate = date.split("-");

	let newDate = new Date(splitedDate[0], splitedDate[1] - 1, splitedDate[2]);
	let monthName = new Intl.DateTimeFormat("pt-BR", {month: style}).formatToParts(newDate);

	return monthName[0].value;
}


/**
 * @returns { String } - string with a random number
 */
export function generateId() {
	return Math.random().toString().replace("0.", "");
}


export function formatAmount(value) {
	value = Number(value) * 100;

	return Math.floor(value);
}