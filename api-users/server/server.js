/*
   # Rode o comando 
   $ npm install 

   # iniciar a aplicação, rode o comando 
   $ npm start 

*/

import express from 'express';
import cors from 'cors'
const PORT = 4000
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, console.log('rodando....'));

let users = [{
   id: 1,
   name: "Caio Augusto",
   city: "São Paulo"
 }]
 
 
 app.get('/users',(req, res) => res.json({
   users
 }))
