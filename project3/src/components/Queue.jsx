import React, { useState } from 'react';

const Queue = () => {
  // Mock data for the queue
  const [queue, setQueue] = useState([
    { id: 1, name: 'Breeann', position: 1 },
    { id: 2, name: 'Nephi', position: 2 },
    { id: 3, name: 'Nathan', position: 3 },
    { id: 4, name: 'Kelsey', position: 4 },
  ]);

  // State to hold the search input
  const [search, setSearch] = useState('');

  // Filter queue based on the search input
  const filteredQueue = queue.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="queue-container">
      <h2>Queue Status</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Display the queue */}
      <ul>
        {filteredQueue.map((person) => (
          <li key={person.id}>
            {person.name} - Position {person.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Queue;

