const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
  });

app.get("/status", (request, response) => {
   const status = {
      "Status": "Running"
   };
   
   response.send(status);
});
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'trading_journal',
  password: 'postgres',
  port: 5432, // default PostgreSQL port
});

app.get('/api/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM user_info');
    const data = result.rows;
    client.release();

    res.json(data);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New POST endpoint for signup
app.post('/signup', async(req, res) => {
    const { name, email, password, phoneNumber } = req.body;
  
    console.log('Received JSON payload:', { name, email, password, phoneNumber });
  
    // Here you can perform database operations, validation, etc.
    console.log(name)
    try {
        const client = await pool.connect();
        const query = 'INSERT INTO user_info(name) VALUES(?)';
        const result = await client.query(query, [req.body.name]);
        const insertedData = result.rows[0];
        client.release();
    
        res.json(insertedData);
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

    res.json({ message: 'Signup successful ' +name });
    
  });
  
