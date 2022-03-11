//@ts-check
const FORM = {
    form: document.querySelector('#login-form'),
	loginData: { email: "", password: "" },
	inputEmail: document.getElementById("email"),
	inputPassword: document.getElementById("password"),
	showPassword: document.getElementById("show-password"),

    handleSubmit: (event) => {
        event.preventDefault();
        console.log(FORM.loginData);
    },

	/**
	 * Function handleInput
	 * @param    { Object } event   
	 * @return   { void }
	 */
	handleInput: (event) => {
		let { loginData } = FORM;
		const { name, value } = event.target;

		if (!loginData.hasOwnProperty(name)) {
			console.error("Campo inválido");
		} else {
			loginData[name] = value;
		}
	},

	toggleShowPassword: () => {
		let { inputPassword } = FORM;

		if (inputPassword.getAttribute("type") === "password") {
			inputPassword.setAttribute("type", "text");
		} else {
			inputPassword.setAttribute("type", "password");
		}
	},
};

FORM.inputPassword.addEventListener("change", FORM.handleInput);
FORM.inputEmail.addEventListener("change", FORM.handleInput);
FORM.showPassword.addEventListener("click", FORM.toggleShowPassword);

FORM.form.addEventListener('submit',FORM.handleSubmit)