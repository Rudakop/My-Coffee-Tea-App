const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const dataFilePath = path.join(__dirname, 'data.json');

app.use(bodyParser.json());
const cors = require('cors');
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.send('Welcome to my Coffee-Tea APP');
});

app.get('/api/coffeeTeaList', (req, res) => {
  try {
    let data = [];

    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');

      if (fileContent.trim() !== '') {
        data = JSON.parse(fileContent);
      }
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/saveCoffeeTea', (req, res) => {
  try {
    const existingData = fs.existsSync(dataFilePath)
      ? JSON.parse(fs.readFileSync(dataFilePath))
      : [];

    existingData.push(req.body);

    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});