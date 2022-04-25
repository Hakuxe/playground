/**
 * Element selector: querySelector
 * @param {string} element - element identifier
 * @param {boolean} [all] - select all elements with identifier
 * @return {string} returns the first node that matches the identifier
 *
 * @example
 *     $('input')
 */

export function $(element, all) {
	if (all) {
		return document.querySelectorAll(element);
	} else {
		return document.querySelector(element);
	}
}

/**
 * @param {number} number1
 * @param {number} number2
 * @return {number} returns the result of the operation
 *
 * @example
 *     sum(2,2);
 */
export const sum = (number1, number2) => {
	return Number(number1) + Number(number2);
};

/**
 * @param {number} number1
 * @param {number} number2
 * @return {number} returns the result of the operation
 *
 * @example
 *     subtract(2,2);
 */
export const subtract = (number1, number2) => {
	return Number(number1) - Number(number2);
};

/**
 * @param {number} number1
 * @param {number} number2
 * @return {number} returns the result of the operation
 *
 * @example
 *     multiply(2,2);
 */
export const multiply = (number1, number2) => {
	return Number(number1) * Number(number2);
};

/**
 * @param {number} number1
 * @param {number} number2 can't be 0
 * @return {number} returns the result of the operation
 *
 * @example
 *     divide(2,2);
 */
export const divide = (number1, number2) => {
	if (number2 == 0) {
		return 0;
	}
	return Number(number1) / Number(number2);
};

/**
 * @param {number} number1
 * @param {number} number2 
 * @param {operator} operator string (+,-,*,/)
 * @return {number} returns the result of the operation
 *
 * @example
 *     subtract(2,2);
 */
export const compute = (number1, number2, operator) => {
	let resultComput = 0;
	switch (operator) {
		case "+":
			resultComput = sum(number1, number2)
			break;

		case "-":
			resultComput= subtract(number1, number2)
			break;

		case "*":
			resultComput = multiply(number1, number2)
			break;

		case "/":
			resultComput = divide(number1, number2)
			break;
	}

	return resultComput;
};
