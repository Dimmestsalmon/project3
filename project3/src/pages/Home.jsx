import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {


  // const addTestEvent = async () => {
  //   try {
  //     const response = await fetch('http:localhost:8080/add-test-event', {
  //       method: 'POST',
  //       headers:
  //     }
  //      )
  //   }
  // }





  return (
    <div>
      <h1>Queue Buddy</h1>
      <Link to="/queue">Join A Queue</Link>
    </div>
  );
};

export default Home;
