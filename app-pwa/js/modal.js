import { $ } from "./utils.js";
import { clearFields } from "./formTransaction.js";

const modal = $(".modal-overlay");
const triggerOpen = $("#add-transaction");
const triggerClose = $("#close-modal");

export function toggle() {
	clearFields()
	$("#form-transaction").setAttribute("action", "/");
	$("#form-submit").innerText = "Adicionar";
	$("#modal-title").innerText = "Nova Movimentação"
	modal.classList.toggle("active");
}

export function updateMode(){
	$("#form-transaction").setAttribute("action", "/update")
	$("#modal-title").innerText = "Alterar movimentação"
	$("#form-submit").innerHTML = `Alterar`;

	modal.classList.toggle("active");
}


triggerOpen.onclick = () => toggle();
triggerClose.onclick = () => toggle();
