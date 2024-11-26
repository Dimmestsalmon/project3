const express = require('express')
const router = express.Router();

const knex = require('../db/knex');


// Create new event
router.post('/add-test-event', async (req, res) => {
  try {
    return knex.insert({ id:2, name: 'Taylor Swift', location: 'Orpheum', date: '2025-03-14', time: '18:00'}).into('events');
    res.status(201).send('event added');
  } catch (error) {
    res.status(500).send('Error adding event');
  }
  });


  router.get('/', async (req, res) => {
    try {
      const events = await knex('events').select('*');
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch events.' });
    }
  });


  module.exports = router;



