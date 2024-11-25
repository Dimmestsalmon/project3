
const express = require('express');
const server = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development'])
const cors = require('cors');
server.use(express.json())
server.use(cors({
    origin: 'http://localhost:5173'
}));

server.get('/', (req, res) => res.send('Sasquatch is Real!'))
server.get('/users', (req, res) => {
    knex.select('*').from('users')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send('Error fetching events'))
})

server.post('/users', (req, res) => {
    knex('users').insert(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send('Error creating user'))
})

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))