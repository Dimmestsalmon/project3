
const express = require('express');
const server = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development'])


server.get('/', (req, res) => res.send('Sasquatch is Real!'))
server.get('/users', (req, res) => {
    knex.select('*').from('users')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send('Error fetching events'))
})

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))