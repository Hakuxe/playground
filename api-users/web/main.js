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
			const {name, city} = data;
			
			userName.textContent = name;
			userCity.textContent = city;
		})
		.catch((error) => console.error(error));
};

getUsers();

getUserById(1);