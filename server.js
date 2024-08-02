const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const Item = require('./models/modelSneaker');
const Sneaker = require('./models/modelSneaker');
const cors = require("cors")



const app = express();

const port = process.env.PORT || 4000; // Cambia aquí el puerto
app.use(cors())
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'data.json');

// Helper function to read the JSON file
const readData = () => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  };
  
  // Helper function to write to the JSON file
  const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  };
  
  // Get all items
  app.get('/sneakers', (req, res) => {
    const data = readData();
    res.json(data.sneaker);
  });
  
  // Get a specific item by ID
  app.get('/sneakers/:ID', (req, res) => {
    const data = readData();
    const item = data.sneaker.find(i => i.ID === Number(req.params.ID));
    console.log(req.params)
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });

  // SE BUSCA COMO PARAMETRO EN QUERY localhost:300/sneakers?=1
  
  // Add a new item
  app.post('/sneakers', (req, res) => {
    const data = readData();
    const { ID,
        name,
        brand,
        size,
        price,
        gender,
        sport,
        stock,
        image,
        description } = req.body;
    const newSneaker = new Sneaker( ID,name,brand,size,price,gender,sport,stock,image,description);
    data.sneaker.push(newSneaker);
    writeData(data);
    res.status(201).json(newSneaker);
  });
  
  // Update an existing item by ID
  app.put('/sneakers/:id', (req, res) => {
    const data = readData();
    const index = data.sneaker.findIndex(i => i.ID === req.params.ID);
    if (index !== -1) {
      const { ID,name,brand,size,price,gender,sport,stock,image,description } = req.body;
      data.sneaker[index] = { ...data.sneaker[index], ID,name,brand,size,price,gender,sport,stock,image,description };
      writeData(data);
      res.json(data.sneaker[index]);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });
  
  // Delete an item by ID
  app.delete('/sneakers/:id', (req, res) => {
    const data = readData();
    const newData = data.sneaker.filter(i => i.ID !== req.params.ID);
    if (newData.length !== data.sneaker.length) {
      data.sneaker = newData;
      writeData(data);
      res.json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  