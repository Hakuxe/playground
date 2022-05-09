import { getUfs } from "./api.js";

const stateSelect = document.getElementById("state");

stateSelect.addEventListener("focus", () => {
	
	getUfs().then((data) => {
		data.map((item) => {
			const option = createOptionElement(item.sigla, item.sigla);
			stateSelect.appendChild(option);
		});
	});
});

const createOptionElement = (value, innerText) => {
	const option = document.createElement("option");
	option.setAttribute("value", value);
	option.innerText = innerText;
	return option;
};
