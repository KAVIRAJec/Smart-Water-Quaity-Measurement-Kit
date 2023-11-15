const express = require('express');
const cors = require('cors');
const db = require('./Node');
const moment = require('moment-timezone');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/data/:parameter', (req, res) => {
  const parameter = req.params.parameter.toLowerCase(); 
  const query = `SELECT * FROM ${parameter} ORDER BY id ASC`;
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
        const latestData =  result.length > 0 ? result[result.length - 1] : null;
        res.json(latestData);
    }   
  });
});

app.get('/api/:parameter', (req, res) => {
  const parameter = req.params.parameter.toLowerCase(); // Corrected line
  const query = `SELECT * FROM ${parameter} ORDER BY id ASC limit 5`;
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
        res.json(result);
    }   
  });
});

app.get('/api', (req, res) => {
  const { parameter, ph, turbidity, tds, orp } = req.query;
  let parameter_id = 0;
  switch (parameter.toLowerCase()) {
    case 'water':
      parameter_id = 1;
      break;
    case 'milk':
      parameter_id = 2;
      break;
    case 'honey':
      parameter_id = 3;
      break;
    case 'oil':
      parameter_id = 4;
      break;
    default:
      parameter_id = 0; // Set default value if parameter is unknown
  }
  if (parameter_id !== 0) {
    const date = moment().tz('Asia/Kolkata').format('YYYY/MM/DD HH:mm:ss'); // Get current IST time
    const query = `INSERT INTO ${parameter} (ph, turbidity, tds, orp, date, parameter_id) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [ph, turbidity, tds, orp, date, parameter_id], (err, result) => {
      if (err) {
        console.error('Error uploading data: ', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Data uploaded successfully' });
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid parameter' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});``