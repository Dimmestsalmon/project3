const express = require('express');
const server = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development']);

// Middleware to parse JSON (useful for POST/PUT requests)
server.use(express.json());

// Root route
server.get('/', (req, res) => res.send('Sasquatch is Real!'));

// GET: Fetch all events
server.get('/add-test-event', async (req, res) => {
  try {
    const events = await knex('events').select('*');
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});

// POST: Add a test event
server.post('/add-test-event', async (req, res) => {
  try {
    // Insert a new event into the database
    const [newEvent] = await knex('events')
      .insert({
        name: 'Taylor Swift',
        location: 'Orpheum',
        date: '2025-03-14',
        time: '18:00',
      })
      .returning('*'); // Returns the inserted row

    // Send success response
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding event');
  }
});

// Start the server
server.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
