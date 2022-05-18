const URL = "http://localhost:4000/users";

const getUsers = () => {
	fetch(URL)
		.then((response) => response.json()) //fetch precisa ser convertido para json antes
		.then((data) => (renderUserApi.textContent = JSON.stringify(data)))
		.catch((error) => console.error(error));
};

const getUserById = (id) => {
	fetch(`${URL}/${id}`)
		.then((response) => response.json())
		.then((data) => {
			const { name, city } = data;

			userName.textContent = name;
			userCity.textContent = city;
		})
		.catch((error) => console.error(error));
};

const addUser = (newUser) => {
	fetch(URL, {
		method: "POST",
		body: JSON.stringify(newUser),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	})
		.then((response) => response.json())
		.then((data) => alert(data))
		.catch((error) => console.error(error));
};

const updateUser = (updatedUser, id) => {
	fetch(`${URL}/${id}`, {
		method: "PUT",
		body: JSON.stringify(updatedUser),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	})
		.then((response) => response.json())
		.then((data) => alert(JSON.stringify(data)))
		.catch((error) => console.error(error));
};

const deleteUser = (id) => {
	fetch(`${URL}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	})
		.then((response) => response.json())
		.then((data) => alert(JSON.stringify(data)))
		.catch((error) => console.error(error));
};

const newUser = {
	name: "Cauan minas",
	city: "Brumadinho",
};

const updatedUser = {
	name: "Cauan Moura",
	city: "Betim",
};

getUsers();

getUserById(1);

add.addEventListener("click", () => addUser(newUser));
update.addEventListener("click", () => updateUser(updatedUser, 1));
btnDelete.addEventListener("click", () => deleteUser(1));
