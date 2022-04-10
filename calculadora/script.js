/**
 * Element selector: querySelector
 * @param {string} element - element identifier 
 * @return {string} returns the first node that matches the identifier
 *
 * @example
 *     $('input')
 */

function $(element){
   return( document.querySelector(element));
}

