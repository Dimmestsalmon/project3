
const express = require('express');
const server = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development'])


server.get('/', (req, res) => res.send('Sasquatch is Real!'))

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))