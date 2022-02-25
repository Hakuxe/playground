const PREPARATION_IMAGE = "./assets/birthday_girl.svg";
const CELEBRATION_IMAGE = "./assets/online_party.svg";

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

	updateElementAttributeById(elementId, content) {
		const element = document.getElementById(elementId);
		if (!element) {
			console.error(`Elemento com id: {${elementId}} não encontrado!!`);
		} else {
			element.setAttribute("src", content);
		}
	},
};

const PAGESTYLE = {
	button: document.querySelector(".primary-button"),
	title: document.querySelector(".title"),
	titleSpan: document.querySelector(".title span"),
	celebrationTitle: document.querySelector(".celebration-title"),
	message: document.querySelector(".message"),
	countDown: document.querySelector(".countdown"),

	reset() {
		let { button, title, titleSpan, message, countDown, celebrationTitle } =
			PAGESTYLE;

		title.classList.remove("mode-celebration");
		button.classList.remove("mode-celebration");

		titleSpan.classList.remove("invisible");
		message.classList.remove("invisible");
		countDown.classList.remove("invisible");
		celebrationTitle.classList.add("invisible");

		UTILS.updateElementAttributeById("image-birthday", PREPARATION_IMAGE);
	},

	changeModeForCelebration() {
		let { button, title, titleSpan, message, countDown, celebrationTitle } = PAGESTYLE;

		//trocar as cores para => --pink
		button.classList.add("mode-celebration");
		title.classList.add("mode-celebration");

		//trocar os textos
		titleSpan.classList.add("invisible");
		message.classList.add("invisible");
		countDown.classList.add("invisible");

		celebrationTitle.classList.remove("invisible");

		//trocar a img para => CELEBRATION_IMAGE
		UTILS.updateElementAttributeById("image-birthday", CELEBRATION_IMAGE);
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
	idInterval: 0,

	calculateTimeRemaining(currentDate, eventDate){
		return (eventDate - currentDate);
	},

	mountCountDownDate(valueInMillesecons) {
		let parts = {
			days: UTILS.formatTwoDigits(
				Math.floor(valueInMillesecons / (1000 * 60 * 60 * 24))
			),
			hours: UTILS.formatTwoDigits(
				Math.floor((valueInMillesecons / (1000 * 60 * 60)) % 24)
			),
			minutes: UTILS.formatTwoDigits(
				Math.floor((valueInMillesecons / 1000 / 60) % 60)
			),
			seconds: UTILS.formatTwoDigits(
				Math.floor((valueInMillesecons / 1000) % 60)
			),
		};
		return parts;
	},

	setEventDate(date) {
		//seta o event date para a data do form
		CLOCKFUNCTIONS.eventDate = new Date(date.split("-"));
	},

	isEventToday(currentDate, eventDate){
		return(
			currentDate.getDate() == eventDate.getDate() &&
			currentDate.getMonth() == eventDate.getMonth() &&
			currentDate.getFullYear() == eventDate.getFullYear()
		);
	},

	countDownTimer() {
		const currentDate = new Date();
		let dateParts = { days: 0, hours: 0, minutes: 0, seconds: 0 };

		let timeRemaining = CLOCKFUNCTIONS.calculateTimeRemaining(currentDate, CLOCKFUNCTIONS.eventDate) ;

		if (timeRemaining > 0) {
			dateParts = CLOCKFUNCTIONS.mountCountDownDate(timeRemaining);

			UTILS.updateInnerHtmlById("days", dateParts.days);
			UTILS.updateInnerHtmlById("hours", dateParts.hours);
			UTILS.updateInnerHtmlById("minutes", dateParts.minutes);
			UTILS.updateInnerHtmlById("seconds", dateParts.seconds);
		}

		if (timeRemaining < 0) {
			
			if (CLOCKFUNCTIONS.isEventToday(currentDate, CLOCKFUNCTIONS.eventDate)) {

				CLOCKFUNCTIONS.stopCountDown(CLOCKFUNCTIONS.idInterval);

				PAGESTYLE.changeModeForCelebration();

			} else {
				// caso a data já tenha passado, marca como ano que vem
				CLOCKFUNCTIONS.eventDate = new Date(
					CLOCKFUNCTIONS.eventDate.getFullYear() + 1,
					CLOCKFUNCTIONS.eventDate.getMonth(),
					CLOCKFUNCTIONS.eventDate.getDate()
				);
			}
		}
	},

	startCountDown() {
		// iniciar o timer
		return setInterval(() => {
			CLOCKFUNCTIONS.countDownTimer();
		}, 1000);
	},

	stopCountDown(idInterval) {
		clearInterval(idInterval);
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
		let { name, birthday } = this.getValues();

		CLOCKFUNCTIONS.setEventDate(birthday);

		// eleminar qualquer intevalo existente (caso troca de data)
		CLOCKFUNCTIONS.stopCountDown(CLOCKFUNCTIONS.idInterval);
		PAGESTYLE.reset();

		CLOCKFUNCTIONS.idInterval = CLOCKFUNCTIONS.startCountDown();

		//resetando o form após enviar
		this.form.reset();
		MODAL.toggle();
	},
};
