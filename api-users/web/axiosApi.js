const URL = "http://localhost:4000/users";

const getUsersAxios = () => {
	axios
		.get(URL)
		.then(
			(response) =>
				(renderUserApiAxios.textContent = JSON.stringify(response.data))
		)
		.catch((error) => console.error(error));
};

const getUserByIdAxios = (id) => {
	axios.get(`${URL}/${id}`)
		.then((response) => {
			userSelected.textContent = ` trazendo usuário de id : ${id}`;
         userSelectedData.textContent = JSON.stringify(response.data);
		})
		.catch((error) => console.error(error));
};

const addUserAxios = (newUser) => {
	axios
		.post(URL, newUser)
		.then(
			(response) => (resultAdd.textContent = JSON.stringify(response.data))
		)
		.catch((error) => console.error(error));
};

const updateUserAxios = (updatedUser, id) => {
   axios.put(`${URL}/${id}`, updatedUser)
		.then((response) => {
         resulyUpdate.textContent = `id: ${id}` + JSON.stringify(response.data) ;
		})
		.catch((error) => console.error(error));
};

const deleteUserAxios = (id) => {
   axios.delete(`${URL}/${id}`)
		.then((response) => {
			userDeleted.textContent = ` deletando usuário de id : ${id}`;
         resulyDelete.textContent = JSON.stringify(response.data);
		})
		.catch((error) => console.error(error));
};







getUsersAxios();
getUserByIdAxios(4);

add.addEventListener("click", () => {
	addUserAxios({ name: "Livinho minas", city: "São paulo" });
});

update.addEventListener("click", () => {
	updateUserAxios({ name: "kevinho", city: "São paulo" }, 3);
});

btnDelete.addEventListener("click", () => {
	deleteUserAxios(1)
});
