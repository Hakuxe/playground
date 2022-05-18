/*
   # Rode o comando 
   $ npm install 

   # iniciar a aplicação, rode o comando 
   $ npm start 

*/

import express from "express";
import cors from "cors";
const PORT = 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, console.log("rodando...."));

let users = [
	{
		id: 1,
		name: "Caio Augusto",
		city: "São Paulo",
	},
	{
		id: 2,
		name: "Henrrique Augusto",
		city: "Belo Horizonte",
	},
];

app.get("/users", (req, res) =>
	res.json({
		users,
	})
);

app.get("/users/:id", (req, res) => {
	const { id } = req.params;

	const userSelected = users.find((item) => Number(item.id) === Number(id));
	if (!userSelected) {
		return res.json("User nor found!");
	}
	res.json(userSelected);
});

app.post("/users", (req, res) => {
	// criar um id pro new user
	let lastUserId = users[users.length - 1].id;
	// inserir no array
	users.push({ id: lastUserId + 1, ...req.body });

	res.json("usuário inserido com sucesso!! ");
});

app.put("/users/:id", (req, res) => {
	const { id } = req.params;

	let userToEdit = users.find(item => Number(item.id) === Number(id));
	
	
	userToEdit.name = req.body.name;
	userToEdit.city = req.body.city;

	users[users.findIndex(item => Number(item.id) === Number(id))] = {id: userToEdit.id, ...userToEdit}
	

	res.json("User Alterado")

});
