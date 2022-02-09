//import fs from "fs-extra"; 
/*não funciona a pg fica recarregando 
    talvez tenha q criar uma api separada
*/


let database = [];
let idGem = 1;

export function saveInDataBase(data) {
	if (data) {
		let newItem = {
			id: idGem++,
			email: data,
		};

		database.push(newItem);
		console.log(database);
		//writeOnFile();
	} else {
		console.log("nenhum email enviado");
	}
}

function writeOnFile() {
	fs.writeJson("./test.json", { name: "fs-extra" }, (err) => {
		if (err) return console.error(err);
		console.log("success!");
	});
}
