//@ts-check
import { getCityByUf, getUfs } from "./api.js";

const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");
const btnSubmit = document.getElementById("btnSubmit");


stateSelect.addEventListener("focus", () => {
	
	getUfs().then((data) => {
		data.map((item) => {
			const option = createOptionElement(item.sigla, item.sigla);
			stateSelect.appendChild(option);
		});
	});
});

stateSelect.addEventListener("change", (event) =>{
	// @ts-ignore
	const uf = event.target.value;
	if(uf){
		// citySelect.setAttribute("disabled", )

		getCityByUf(uf).then(data =>{
			data.map(item => {
				const option = createOptionElement(item.nome, item.nome);
				citySelect.appendChild(option);
			})
		})
	}
});


btnSubmit.addEventListener("click", (event) => {
	event.preventDefault();
	
	// @ts-ignore
	alert(`Estado: ${stateSelect.value}\n Cidade: ${citySelect.value}`)
})


/**
 * @param {any} value - valor do option no select
 * @param { String } innerText - texto a ser exibido no option
 * 
 * @return { HTMLElement } - retorna um option a ser inserido num select
 */ 
const createOptionElement = (value, innerText) => {
	const option = document.createElement("option");
	option.setAttribute("value", value);
	option.innerText = innerText;
	return option;
};




