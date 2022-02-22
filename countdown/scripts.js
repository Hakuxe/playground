const eventDate = new Date("Feb 24, 2022 12:37:25");
const dateParts = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function formatTwoDigits(n) {
	return (n < 10 ? "0" : "") + n;
}

const CLOCKFUNCTIONS = {
	getDays(valueInMillesecons) {
		return Math.floor(valueInMillesecons / (1000 * 60 * 60 * 24));
	},

	getHours(valueInMillesecons) {
		return Math.floor((valueInMillesecons / (1000 * 60 * 60)) % 24);
	},
	getMinutes(valueInMillesecons) {
		return Math.floor((valueInMillesecons / 1000 / 60) % 60);
	},
	getSeconds(valueInMillesecons) {
		return Math.floor((valueInMillesecons / 1000) % 60);
	},
};

const MODAL = {
	modal: document.querySelector('.modal-overlay'),
	toggle(){
		console.log("chegou aki", this.modal)
		this.modal.classList.toggle('inactive');
	},
}

function updateInnerHtmlById(elementId, content) {
	const element = document.getElementById(elementId);
	if (!element) {
		console.error(`Elemento com id: {${elementId}} não encontrado!!`);
	} else {
		element.innerHTML = content;
	}
}

function countDownTimer() {
	const currentTime = new Date();
	let { days, hours, minutes, seconds } = dateParts;

	// verificar a diferenca entre o tempo atual e event
	let timeRemaining = Number(eventDate) - currentTime;

	// fazer o calculo dos dias,horas minutos e segundos
	if (timeRemaining > 0) {
		days =    formatTwoDigits(CLOCKFUNCTIONS.getDays(timeRemaining));
		hours =   formatTwoDigits(CLOCKFUNCTIONS.getHours(timeRemaining));
		minutes = formatTwoDigits(CLOCKFUNCTIONS.getHours(timeRemaining));
		seconds = formatTwoDigits(CLOCKFUNCTIONS.getSeconds(timeRemaining));
	}

	//atualizar o html
	updateInnerHtmlById("days", days);
	updateInnerHtmlById("hours", hours);
	updateInnerHtmlById("minutes", minutes);
	updateInnerHtmlById("seconds", seconds);

	//verificar se o tempo acabou pra sair do coutdown
	if (timeRemaining < 0) {
		//termina o countdown
		//exibe algo
        return;
	}
}

// ToDo
// criar uma função que simule um relogio atualizando o html a cada segundo
// contagem regressiva

setInterval(countDownTimer, 1000);

