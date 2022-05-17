import express from 'express';
const PORT = 5500
const app = express();

app.use(express.json());

app.listen(PORT, console.log('rodando....'));

let users = [{
   id: 1,
   name: "Caio Augusto",
   city: "São Paulo"
 }]
 
 
 app.get('/users',(req, res) => res.json({
   users
 }))