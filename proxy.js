import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// for local development
// allow cross-origin requests
app.use(cors());
// parse JSON request body (important)
app.use(express.json());

app.post('/api/proxy/getAdConfig', async (req, res) => {
  console.log('Received request body:', req.body); // print the request body, check if the data is correct

  // get app_id, org_id, token
  const { app_id, org_id, token } = req.body;

  // **check if missing parameters**
  if (!app_id || !org_id || !token) {
    console.error('Missing parameters:', { app_id, org_id, token });
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // **send request to the target API**
    const response = await fetch('https://msp-platform-swagger-prod.newsbreak.com/getAdConfig', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ app_id, org_id, token })
    });

    // **check if the API returns an error**
    if (!response.ok) {
      console.error(`API Error: ${response.status}`);
      return res.status(response.status).json({ error: `API returned ${response.status}` });
    }

    // **parse the API response**
    const data = await response.json();
    console.log('API response:', data);

    // **return data to the frontend**
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Error fetching data from API', details: error.message });
  }
});

app.post('/api/proxy/saveAdConfig', async (req, res) => {
  console.log('Received save request body:', req.body);

  // get parameters
  const { ad_config_settings, token } = req.body;

  // check if missing parameters
  if (!ad_config_settings || !ad_config_settings.ad_config || 
      !ad_config_settings.app_id || !ad_config_settings.org_id || !token) {
    console.error('Missing parameters:', { ad_config_settings, token });
    return res.status(400).json({ 
      code: 400, 
      message: 'Missing required parameters' 
    });
  }

  try {
    // send request to the target API
    const response = await fetch('https://msp-platform-swagger-prod.newsbreak.com/saveAdConfig', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ad_config_settings, token })
    });

    // check if the API returns an error
    if (!response.ok) {
      console.error(`API Error: ${response.status}`);
      const errorData = await response.json();
      return res.status(response.status).json({ 
        code: response.status, 
        message: errorData.message || `API returned ${response.status}` 
      });
    }

    // parse the API response
    const data = await response.json();
    console.log('API save response:', data);

    // return data to the frontend
    res.json(data);
  } catch (error) {
    console.error('Save API error:', error);
    res.status(500).json({ 
      code: 500, 
      message: `Error saving data to API: ${error.message}` 
    });
  }
});

// start the proxy server
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
