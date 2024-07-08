const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/', async (req, res) => {
  const url = req.url.slice(1); // Remove leading '/'
  
  try {
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: { ...req.headers, host: null } // Remove host header
    });
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error in proxy server:', error.message);
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`CORS proxy server running on http://localhost:${port}`);
});
