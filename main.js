import Chart from 'chart.js';
const mysql = require('mysql');

const express = require('express');
const fetch = require('node-fetch');

const connection = mysql.createConnection({
  host: '127.0.0.1', // Correct the host address
  user: 'root',
  password: 'Password123!',
  database: 'jobApp',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + connection.threadId);
});

const query = 'SELECT * FROM app_data';
connection.query(query, (err, results) => {
  if (err) {
    console.error('Error executing query: ' + err.stack);
    return;
  }

  const data = results;

  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection: ' + err.stack);
      return;
    }
    console.log('Database connection closed.');
  });

  const app = express();

  app.get('/api/data', (req, res) => {
    // You need to fetch and process data from the database (as shown in step 1).
    // Then, send the data as a JSON response.
    res.json(data);
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

  // Fetch data from the API endpoint.
  fetch('http://localhost:3000//data') // Update the URL to match your server setup.
    .then((response) => response.json())
    .then((data) => {
      // Use the data to create a chart using your chosen charting library.
      const ctx = document.getElementById('homeChart').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Interviews', 'No Interviews'],
            datasets: [
            {
                label: 'Data from MySQL',
                data: [data.interviews, data.noInterview],
                backgroundColor: 'rgba(75, 192, 192, 0.2',
            },
          ],
        },
      });
    });
});
