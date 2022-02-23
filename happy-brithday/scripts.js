// const eventDate = new Date("Feb 24, 2022 12:37:25");
// const eventDate = new Date();


const UTILS = {
	formatTwoDigits(n) {
		return (n < 10 ? "0" : "") + n;
	},

	updateInnerHtmlById(elementId, content) {
		const element = document.getElementById(elementId);
		if (!element) {
			console.error(`Elemento com id: {${elementId}} não encontrado!!`);
		} else {
			element.innerHTML = content;
		}
	},
};

const MODAL = {
	modal: document.querySelector(".modal-overlay"),
	toggle() {
		this.modal.classList.toggle("inactive");
	},
};

const CLOCKFUNCTIONS = {
	eventDate: new Date(),

	mountCountDownDate(valueInMillesecons){
		let parts ={
			days 	: UTILS.formatTwoDigits(Math.floor(valueInMillesecons / (1000 * 60 * 60 * 24))),
			hours 	: UTILS.formatTwoDigits(Math.floor((valueInMillesecons / (1000 * 60 * 60)) % 24)),
			minutes : UTILS.formatTwoDigits(Math.floor((valueInMillesecons / 1000 / 60) % 60)),
			seconds : UTILS.formatTwoDigits(Math.floor((valueInMillesecons / 1000) % 60)),
		}
		return parts;
	},
	
	setEventDate(date) {
		//seta o event date para a data do form
		console.log('date :>> ', date);
		console.log('date :>> ', date.split("-"));
		CLOCKFUNCTIONS.eventDate = new Date(date.split("-"))
		
	},
	
	startClock(){
		return setInterval(CLOCKFUNCTIONS.countDownTimer, 1000);
	},

	stopClock(inverval){
		clearInterval(inverval);
	},

	countDownTimer() {
		const currentTime = new Date();
		let   dateParts = { days:0, hours:0, minutes:0, seconds:0 } 

		// verificar a diferenca entre o tempo atual e event
		let timeRemaining = Number(CLOCKFUNCTIONS.eventDate) - currentTime;
		

		// fazer o calculo dos dias,horas minutos e segundos
		if (timeRemaining > 0) {
	
			dateParts = CLOCKFUNCTIONS.mountCountDownDate(timeRemaining);

			//atualizar o html
			UTILS.updateInnerHtmlById("days", 	 dateParts.days);
			UTILS.updateInnerHtmlById("hours", 	 dateParts.hours);
			UTILS.updateInnerHtmlById("minutes", dateParts.minutes);
			UTILS.updateInnerHtmlById("seconds", dateParts.seconds);

			
		}

		//verificar se o tempo acabou pra sair do coutdown
		if (timeRemaining < 0) {
			//exibe algo

			//atualizar o html
			UTILS.updateInnerHtmlById("days", 	 UTILS.formatTwoDigits(dateParts.days));
			UTILS.updateInnerHtmlById("hours", 	 UTILS.formatTwoDigits(dateParts.hours));
			UTILS.updateInnerHtmlById("minutes", UTILS.formatTwoDigits(dateParts.minutes));
			UTILS.updateInnerHtmlById("seconds", UTILS.formatTwoDigits(dateParts.seconds));

			
		}
		console.log('object :>> ');
	},
};





const FORM = {
	form: document.querySelector("form"),
	name: document.getElementById("name"),
	birthday: document.getElementById("birthday"),

	getValues() {
		return { name: this.name.value, birthday: this.birthday.value };
	},

	onSubmit(event) {
		event.preventDefault();

		//pegando os valores enviados no form
		let { name, birthday } =this.getValues();

		//setar o countdown para a data passada
		CLOCKFUNCTIONS.setEventDate(birthday);

		//chamar o set inverval e iniciar o clock
		 const timeControl = CLOCKFUNCTIONS.startClock();
		

		//TODO:  como parar o interval ????


		//resetando o form após enviar
		this.form.reset();
		MODAL.toggle();
	},
};


console.log('object :>> ');




