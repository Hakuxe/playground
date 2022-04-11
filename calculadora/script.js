/**
 * Element selector: querySelector
 * @param {string} element - element identifier
 * @param {boolean} [all] - select all elements with identifier
 * @return {string} returns the first node that matches the identifier
 *
 * @example
 *     $('input')
 */

function $(element, all) {
	if (all) {
		return document.querySelectorAll(element);
	} else {
		return document.querySelector(element);
	}
}






const sum = (number1, number2) => {
	return Number(number1) + Number(number2);
};

const subtract = (number1, number2) => {
	return Number(number1) - Number(number2);
};

const multiply = (number1, number2) => {
	return Number(number1) - Number(number2);
};

const divide = (number1, number2) => {
   if(number2 == 0){
      return null
   }
	return Number(number1) / Number(number2);
};