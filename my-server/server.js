
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

server.get('/users/:id', (req, res) => {
    knex.select('*').from('users').where('id', req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send('Error fetching events'))
})

server.post('/users', (req, res) => {
    knex('users').insert(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send('Error creating user'))
})

server.delete('/users', (req, res) => {
    knex('users').where('name', req.body.name).del()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send('Error deleting user'))
})

server.patch('/users', (req, res) => {
    knex('users').where('name', req.body.name).update(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send('Error deleting user'))
})

server.get('/queue', (req, res) => {
    knex('queue')
  .join('users', 'users.id', 'queue.user_id')
  .join('events', 'events.id', 'queue.event_id')
  .select('queue.id', 'users.name AS user_name', 'events.name AS events_name' )
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send('Error fetching events'))
})

server.delete('/queue', (req, res) => {
    knex('queue')
  .join('users', 'users.id', 'queue.user_id')
  .join('events', 'events.id', 'queue.event_id')
  .select('queue.id', 'users.name AS user_name', 'events.name AS events_name' )
  .where('users.name', req.body.user_name)
  .del()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send('Error fetching events'))
})

server.delete('/users', (req, res) => {
    knex('users').where('name', req.body.name).del()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send('Error deleting user'))
})
server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))