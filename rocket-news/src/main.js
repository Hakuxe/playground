import { saveInDataBase } from "./database/database.js";

const inputMail = document.getElementById("inputEmail");
const buttonSubmit = document.querySelector(".submitButton");

let typedMail;


inputMail.addEventListener("change", function handleChange(event) {
	typedMail = event.target.value;
});

buttonSubmit.addEventListener("click", (event) => {
	event.preventDefault();

	// [] - interação com bd
    saveInDataBase(typedMail);

	// alert("Obrigado!! e-mail recebido com sucesso!!");
});

// [x] - ao clicar no botão chamar um evento para o bd
