const express = require('express');
const server = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development']);
const cors = require('cors');

server.use(express.json())
server.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  })
);

// Middleware to parse JSON (useful for POST/PUT requests)
server.use(express.json());

// Root route
server.get('/', (req, res) => res.send('Sasquatch is Real!'));

// GET: Fetch all events
server.get('/events', async (req, res) => {
  try {
    const events = await knex('events').select('*');
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});

// GET: Event by id
server.get('/events/:id', async (req, res) => {
  const { id } =req.params;

  try {
    const event = await knex('events').where({ id }).first();
    if (!event) {
      return res.status(404).json({ error: 'Event not found.'});
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch event.'})
  }
});


// POST: Add a new event
server.post('/events', async (req, res) => {
  const { name, location, date, time } = req.body;


  if (!name || !location || !date || !time) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const [newEvent] = await knex('events')
      .insert({ name, location, date, time })
      .returning('*');
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add event.' });
  }
});

//PUT: update an event
server.put('/events/:id', async (req, res) => {
  const {id} = req.params;
  const { name, location, date, time } = req.body;

  if(!name || !location || !date || !time) {
     return res.status(400).json({ error: 'All fields are required.' });
  }

  try{
    const updatedCount = await knex('events').where({id}).update({
      name,
      location,
      date,
      time
    });

  if (!updatedCount) {
    return res.status(404).json({ error: 'Event does not exist.'})
  }

  const updatedEvent = await knex('events').where({id}).first();
  res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update event.' });
  }
})


//DELETE: remove an event
server.delete('/events/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const deletedCount = await knex('events').where({id}).del()

  if (!deletedCount) {
    return res.status(404).json({ error: 'Event does not exist.'})
  }
  res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete event.' });
  }
})


server.get('/users', (req, res) => {
    knex.select('*').from('users')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send('Error fetching events'))
})

server.get('/users/:id', async (req, res) => {
  const { id } = req.params;


  const user = await knex('users').where({ id }).first();
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const eventIds = await knex('queue')
    .pluck('event_id')
    .where({ user_id: id });

  res.json({ ...user, event_ids: eventIds });
});

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

